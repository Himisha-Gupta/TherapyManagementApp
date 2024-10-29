// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import MoodData from './components/MoodData';
import Medication from './components/Medication';
import Appointments from './components/Appointments';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <h1>Welcome, {user}</h1>
          <MoodData email={user} />
          <Medication email={user} />
          <Appointments email={user} />
        </>
      )}
    </div>
  );
};

export default App;
