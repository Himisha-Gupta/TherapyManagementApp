from pymongo import MongoClient
from datetime import datetime

# MongoDB connection
url = "mongodb+srv://arth1234samepass:arth1234@cluster0.pdgx6ns.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(url)
db = client.therapy  # Database named 'therapy'

# Collections
patients_collection = db.patients

# Medical summary data to add
medical_summary_data = [
    {
        "date": datetime(2024, 10, 1),
        "description": "Low mood, very little energy and poor sleep.",
        "feeling_sad": 8,
        "feeling_happy": 2,
        "energy_level": 3,
        "sleep_quality": 4,
        "stress_level": 7
    },
    {
        "date": datetime(2024, 10, 2),
        "description": "Frequent worry, mild insomnia, and variable mood.",
        "feeling_sad": 5,
        "feeling_happy": 4,
        "energy_level": 6,
        "sleep_quality": 5,
        "stress_level": 8
    },
    {
        "date": datetime(2024, 10, 3),
        "description": "High energy in the morning, very low in the evening.",
        "feeling_sad": 5,
        "feeling_happy": 6,
        "energy_level": 7,
        "sleep_quality": 6,
        "stress_level": 6
    },
    {
        "date": datetime(2024, 10, 4),
        "description": "Persistent fatigue, low happiness levels, high stress.",
        "feeling_sad": 7,
        "feeling_happy": 3,
        "energy_level": 3,
        "sleep_quality": 5,
        "stress_level": 8
    },
    {
        "date": datetime(2024, 10, 5),
        "description": "Difficulty sleeping, feeling tired during the day.",
        "feeling_sad": 4,
        "feeling_happy": 5,
        "energy_level": 4,
        "sleep_quality": 3,
        "stress_level": 6
    },
    {
        "date": datetime(2024, 10, 6),
        "description": "Frequent nightmares, feeling tense and on edge.",
        "feeling_sad": 6,
        "feeling_happy": 4,
        "energy_level": 5,
        "sleep_quality": 4,
        "stress_level": 9
    }
]

# Update the document
patients_collection.update_one(
    {"email": "chavi@gmail.com"},
    {"$push": {"medical_summary": {"$each": medical_summary_data}}}
)

print("Medical summary data added successfully.")
