import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; // Import the Header component
import ExploreCourses from './components/ExploreCourses';
import MyPathways from './components/MyPathways';
import NewPathway from './components/NewPathway';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={<ExploreCourses />} />
          <Route path="/explore-courses" element={<ExploreCourses />} />
          <Route path="/my-pathways" element={<MyPathways />} />
          <Route path="/new-pathway" element={<NewPathway />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
