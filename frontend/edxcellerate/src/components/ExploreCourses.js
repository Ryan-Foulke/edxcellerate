import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExploreCourses.css';
import { useNavigate } from 'react-router-dom';

function ExploreCourses() {
    
  const [courses, setCourses] = useState([]);
  const [stateFilter, setStateFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [requirementsFilter, setRequirementsFilter] = useState('');

  const [stateOptions, setStateOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [requirementsOptions, setRequirementsOptions] = useState([]);

  const [selectedPathway, setSelectedPathway] = useState('');

  const navigate = useNavigate();

  const [pathways, setPathways] = useState([]);

    const fetchPathways = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/pathways/');
        setPathways(response.data);
    } catch (error) {
        console.error('Error fetching pathways:', error);
    }
    };

    useEffect(() => {
    fetchPathways();
    }, []);

    const addCourseToPathway = async (pathwayId, courseId) => {
        try {
          await axios.post(`http://localhost:8000/api/pathways/${pathwayId}/courses/add/${courseId}/`);
          alert('Course added to the selected pathway');
        } catch (error) {
          console.error('Error adding course to pathway:', error);
        }
      };
    
      



  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/courses/');
      setCourses(response.data);
      populateFilterOptions(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
  

  const filteredCourses = courses.filter(course =>
    (stateFilter === '' || course.hsrequirements === stateFilter) &&
    (subjectFilter === '' || course.mode === subjectFilter) &&
    (requirementsFilter === '' || course.aarequirements === requirementsFilter)
  );

  const populateFilterOptions = (courses) => {
    const uniqueStates = [...new Set(courses.map(course => course.hsrequirements))];
    const uniqueSubjects = [...new Set(courses.map(course => course.mode))];
    const uniqueRequirements = [...new Set(courses.map(course => course.aarequirements))];
    
    setStateOptions(uniqueStates);
    setSubjectOptions(uniqueSubjects);
    setRequirementsOptions(uniqueRequirements);
  };

  const handleAddCourseToPathway = (event, courseId) => {
    const pathwayId = event.target.value;
    if (pathwayId) {
      addCourseToPathway(pathwayId, courseId);

      navigate(`/my-pathways?selectedPathway=${pathwayId}`);

    }
  };

  

  
  useEffect(() => {
    fetchCourses().then(() => {
    });
  }, []);

  

  return (
    <div className="container mb-4">
    <div className="container mb-4">
    <div className="row pt-4">
      <div className="row" >
        <div className="col">
          <div className="form-group">
            <select
              className="form-control"
              value={requirementsFilter}
              onChange={e => setRequirementsFilter(e.target.value)}
            >
              <option value="">All AA Requirements</option>
              {requirementsOptions.map(requirement => (
                <option key={requirement} value={requirement}>
                  {requirement}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <select
              className="form-control"
              value={stateFilter}
              onChange={e => setStateFilter(e.target.value)}
            >
              <option value="">All High School Requirements</option>
              {stateOptions.map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col">
          <div className="form-group">
            <select
              className="form-control"
              value={subjectFilter}
              onChange={e => setSubjectFilter(e.target.value)}
            >
              <option value="">All Teaching Modes</option>
              {subjectOptions.map(subject => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        </div>
        </div>
      </div>
    </div>
      <table className="table table-bordered">
      <thead>
        <tr>
          <th>Title</th>
          <th>Subject</th>
          <th>Requirements</th>
          <th>State</th>
          <th>Description</th>
          <th>Add to Pathway</th>
        </tr>
      </thead>
      <tbody>
        {filteredCourses.map(course => (
          <tr key={course.id}>
            <td>{course.title}</td>
            <td>{course.subject}</td>
            <td>{course.requirements}</td>
            <td>{course.state}</td>
            <td>{course.description}</td>
            
            <td>
                <select onChange={(event) => handleAddCourseToPathway(event, course.id)}>
                  <option value="">Select a pathway</option>
                  {pathways.map((pathway) => (
                    <option key={pathway.id} value={pathway.id}>
                      {pathway.name}
                    </option>
                  ))}
                </select>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default ExploreCourses;
