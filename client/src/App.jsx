// App.js or wherever you define your routes
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import PatientDetails from './components/PatientsDetails';
import AddAppointment from './components/AddAppointment';
import Login from './components/Login'; // Assume you have a Login component

const App = () => {
  // const [user, setUser] = useState(null);

  return (
    <div>
    {/* Render Login only if user is not logged in */}
    {/* {!user ? <Login setUser={setUser} /> : <Dashboard />} */}
    <Navbar />
    
      <Routes>
        <Route path="/dashboard" element={<PatientDetails/>} />
        <Route path="/book-appointments" element={<AddAppointment/>} />
        <Route path="/login" element={<Login/>} />
        {/* Add other routes as needed */}
        </Routes>
 
    </div>
  );
};

export default App;
