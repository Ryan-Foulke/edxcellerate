import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AADegreeProgress from './AADegreeProgress';
import HSDegreeProgress from './HSDegreeProgress';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';


function MyPathways() {
  const [pathways, setPathways] = useState([]);
  const [selectedPathway, setSelectedPathway] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const location = useLocation();

  const getSelectedPathwayId = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('selectedPathway');
  };

  useEffect(() => {
    fetchPathways();
  }, [location]);
  
  

  const fetchPathways = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/pathways/');
      setPathways(response.data);
  
      const selectedPathwayId = getSelectedPathwayId();
      if (selectedPathwayId) {
        const pathway = response.data.find(pathway => pathway.id === parseInt(selectedPathwayId));
        setSelectedPathway(pathway);
        if (pathway) {
          try {
            const courseResponse = await axios.get(`http://localhost:8000/api/pathways/${selectedPathwayId}/courses/`);
            setSelectedCourses(courseResponse.data);
          } catch (error) {
            console.error('Error fetching courses for selected pathway:', error);
          }
        } else {
          setSelectedCourses([]);
        }
      }
    } catch (error) {
      console.error('Error fetching pathways:', error);
    }
  };
  

  const removeCourseFromPathway = async (courseId) => {
    if (!selectedPathway) {
      alert('Please select a pathway first.');
      return;
    }
  
    try {
      await axios.post(`http://localhost:8000/api/pathways/${selectedPathway.id}/courses/remove/${courseId}/`);
      alert('Course removed from the selected pathway successfully.');
      const updatedCourses = selectedCourses.filter(course => course.id !== courseId);
      setSelectedCourses(updatedCourses);
    } catch (error) {
      console.error('Error removing course from pathway:', error);
      alert('Error removing course from pathway.');
    }
  };
  

  const handlePathwayChange = async (e) => {
    const selectedPathwayId = e.target.value;
    const pathway = pathways.find((pathway) => pathway.id === parseInt(selectedPathwayId));
    setSelectedPathway(pathway);
    if (pathway) {
      try {
        const response = await axios.get(`http://localhost:8000/api/pathways/${selectedPathwayId}/courses/`); // Replace this with the correct API endpoint
        setSelectedCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses for selected pathway:', error);
      }
    } else {
      setSelectedCourses([]);
    }
  };

  return (
    <div className="container mt-4">
      <h1>My Pathways</h1>
      <div className="d-flex">
        <Link to="/new-pathway">
          <button className="btn btn-primary">Create New Pathway</button>
        </Link>
        <div className="ml-2">
          <select className="custom-select" onChange={handlePathwayChange}>
            <option value="">Select a pathway</option>
            {pathways.map((pathway) => (
              <option key={pathway.id} value={pathway.id}>
                {pathway.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {selectedPathway && (
        <div>
          <div className="row mt-4">
            <div className="col-md-6">
              <AADegreeProgress selectedPathway={{ ...selectedPathway, courses: selectedCourses }} />
            </div>
            <div className="col-md-6">
              <HSDegreeProgress selectedPathway={{ ...selectedPathway, courses: selectedCourses }} />
            </div>
          </div>

          <h3 className="mt-4">Courses in {selectedPathway.name} pathway</h3>
          <div className="row">
            {selectedCourses.map((course) => (
              <div className="col-md-4 mb-4" key={course.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">Subject: {course.subject}</p>
                    <p className="card-text">AA Requirements: {course.aarequirements}</p>
                    <p className="card-text">State: {course.state}</p>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeCourseFromPathway(course.id)}
                    >
                      Remove from pathway
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPathways;
