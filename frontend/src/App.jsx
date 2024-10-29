import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Tab, Tabs } from 'react-bootstrap';
import PatientList from './components/PatientList';
import CreatePatient from './components/CreatePatient';
import Appointments from './components/Appointments';
import AddMedication from './components/AddMedication';
import PatientMoodHistory from './components/PatientMoodHistory';

function App() {
  return (
    <Router>
      <Container className="mt-5">
        <h1>Doctor Dashboard</h1>
        <Tabs defaultActiveKey="patients" id="doctor-dashboard-tabs">
          <Tab eventKey="patients" title="View Patients">
            <PatientList />
          </Tab>
          <Tab eventKey="create-patient" title="Create Patient">
            <CreatePatient />
          </Tab>
          <Tab eventKey="appointments" title="Appointments">
            <Appointments />
          </Tab>
          <Tab eventKey="add-medication" title="Add Medication">
            <AddMedication />
          </Tab>
          <Tab eventKey="mood-history" title="View Mood History">
            <PatientMoodHistory />
          </Tab>
        </Tabs>
      </Container>
    </Router>
  );
}

export default App;
