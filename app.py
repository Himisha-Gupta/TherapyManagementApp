from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
import hashlib

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
url = "mongodb+srv://arth1234samepass:arth1234@cluster0.pdgx6ns.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(url)
db = client.therapy  # Database named 'therapy'

# Define collections
patients_collection = db.patients
doctors_collection = db.doctors
appointments_collection = db.appointments

# Helper function to hash passwords
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

@app.route('/',methods=['GET'])
def index():
    return jsonify({"message": "microservice is up! "}), 200

# Route to add medical history to a patient
@app.route('/addmedicalhistory', methods=['POST'])
def add_medical_history():
    data = request.json
    patient_email = data.get('email')
    history = {
        "date": datetime.now(),
        "title": data['title'],
        "description": data['description'],
        "improvement_out_of_10": data['improvement_out_of_10'],
        "doctor_email": data['doctor_email']
    }
    patients_collection.update_one(
        {"email": patient_email},
        {"$push": {"medical_history": history}}
    )
    return jsonify({"message": "Medical history added successfully"}), 200

# Route to add mood data
@app.route('/addmooddata', methods=['POST'])
def add_mood_data():
    data = request.json
    patient_email = data.get('email')
    mood_data = {
        "date": datetime.now(),
        "feeling_happy": data['feeling_happy'],
        "feeling_sad": data['feeling_sad'],
        "feeding_shaddy": data['feeding_shaddy'],
        "description": data['description']
    }
    patients_collection.update_one(
        {"email": patient_email},
        {"$push": {"medical_summary": mood_data}}
    )
    return jsonify({"message": "Mood data added successfully"}), 200

# Route to create a patient
@app.route('/createuser', methods=['POST'])
def create_user():
    print("req recieved",request.json)
    data = request.json
    patient = {
        "name_": data['name_'],
        "email": data['email'],
        "age": data['age'],
        "gender": data['gender'],
        "password": hash_password(data['password']),
        "aadhaar": data['aadhaar'],
        "medical_history": [],
        "medical_summary": []
    }
    patients_collection.insert_one(patient)
    return jsonify({"message": "User created successfully"}), 201

# Route to create a doctor
@app.route('/createdoctor', methods=['POST'])
def create_doctor():
    data = request.json
    doctor = {
        "email": data['email'],
        "password": hash_password(data['password'])
    }
    doctors_collection.insert_one(doctor)
    return jsonify({"message": "Doctor created successfully"}), 201

# Route to sign up a patient
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    if patients_collection.find_one({"email": data['email']}):
        return jsonify({"error": "User already exists"}), 400
    return create_user()

# Route to log in (for both doctors and patients)
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    print(data.get('password'))
    password = hash_password(data.get('password'))
    user = patients_collection.find_one({"email": email}) or doctors_collection.find_one({"email": email})
    if user and user['password'] == password:
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"error": "Invalid credentials"}), 401

# Route to add an appointment
@app.route('/addappointment', methods=['POST'])
def add_appointment():
    data = request.json
    appointment = {
        "patientemail": data['patientemail'],
        "appointmentdate": data['appointmentdate'],
        "slot": data['slot'],
        "status": "incomplete"
    }
    appointments_collection.insert_one(appointment)
    return jsonify({"message": "Appointment added successfully"}), 201

# Route to get all appointments
@app.route('/getappointments', methods=['GET'])
def get_appointments():
    appointments = list(appointments_collection.find({}, {"_id": 0}))  # Exclude the MongoDB ID
    return jsonify(appointments), 200

@app.route('/getappointmentsbyemail/<email>', methods=['GET'])
def get_appointments_by_email(email):
    appointments = list(appointments_collection.find({"patientemail":email}, {"_id": 0}))  # Exclude the MongoDB ID
    return jsonify(appointments), 200

# Route to update appointment status
@app.route('/appointmentstatusupdate', methods=['POST'])
def update_appointment_status():
    data = request.json
    appointment_id = data.get('_id')
    status = data.get('status')
    appointments_collection.update_one(
        {"_id": appointment_id},
        {"$set": {"status": status}}
    )
    return jsonify({"message": "Appointment status updated"}), 200

# Route to filter patients by email
@app.route('/filterpatientsbyemail/<email>', methods=['GET'])
def filter_patients_by_email(email):
    print("filtering...")
    patient = patients_collection.find_one({"email": email}, {"_id": 0, "password": 0})
    if patient:
        return jsonify(patient), 200
    return jsonify({"error": "Patient not found"}), 404

@app.route('/getallpatients', methods=['GET'])
def get_all_patients():
    patients = list(patients_collection.find({}, {"_id": 0, "password": 0}))
    return jsonify(patients), 200

# Route to get patients by doctor's email
@app.route('/getpatientsbydoctor/<doctor_email>', methods=['GET'])
def get_patients_by_doctor(doctor_email):
    patients = patients_collection.find(
        {"medical_history.doctor_email": doctor_email},
        {"_id": 0, "password": 0}
    )
    result = []
    for patient in patients:
        result.append(patient)
    return jsonify(result), 200

# Route to delete mood data
@app.route('/deletemood', methods=['DELETE'])
def delete_mood():
    data = request.json
    patient_email = data.get('email')
    mood_id = data.get('mood_id')
    patients_collection.update_one(
        {"email": patient_email},
        {"$pull": {"medical_summary": {"_id": mood_id}}}
    )
    return jsonify({"message": "Mood data deleted successfully"}), 200

# Route to view mood data by email
@app.route('/viewmooddatabyemail/<email>', methods=['GET'])
def view_mood_data_by_email(email):
    # email = request.args.get('email')
    patient = patients_collection.find_one({"email": email}, {"_id": 0, "medical_summary": 1})
    if patient:
        return jsonify(patient.get('medical_summary', [])), 200
    return jsonify({"error": "Mood data not found"}), 404

# Route to view patient history by doctor's email
@app.route('/viewpatienthystorybydoctorsemail/<doctor_email>', methods=['GET'])
def view_patient_history_by_doctor(doctor_email):
    # doctor_email = request.args.get('doctor_email')
    patients = patients_collection.find({"medical_history.doctor_email": doctor_email}, {"_id": 0, "medical_history": 1})
    patient_history = []
    for patient in patients:
        patient_history.extend(patient.get('medical_history', []))
    return jsonify(patient_history), 200

if __name__ == '__main__':
    app.run(debug=True)
