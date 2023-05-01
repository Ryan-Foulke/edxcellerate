import React, { useState } from 'react';


function HSDegreeProgress({ selectedPathway }) {
    const [isExpanded, setIsExpanded] = useState(false);


  const requirements = {
    ENG: 4,
    FA: 1,
    WORLD: 1,
    US: 1,
    GOV: 1,
    MATH: 4,
    SCIENCE: 3,
  };

  const calculateUnits = () => {
    const fulfilledUnits = {
      ENG: 0,
      FA: 0,
      WORLD: 0,
      US: 0,
      GOV: 0,
      MATH: 0,
      SCIENCE: 0,
    };

    for (const course of selectedPathway.courses) {
      const requirement = course.hsrequirements;
      if (fulfilledUnits.hasOwnProperty(requirement)) {
        fulfilledUnits[requirement] += 1; // Increment by 1 for each fulfilled year
      }
    }

    return fulfilledUnits;
  };

  const fulfilledUnits = calculateUnits();

  const totalYearsRequired = Object.values(requirements).reduce((a, b) => a + b);
  const totalYearsFulfilled = Object.values(fulfilledUnits).reduce((a, b) => a + b);
  const percentageFulfilled = ((totalYearsFulfilled / totalYearsRequired) * 100).toFixed(0);

  const arrow = isExpanded ? '▲' : '▼';

  


  return (
    <div>
      <h4 onClick={() => setIsExpanded(!isExpanded)}>
        HS Degree Progress: {percentageFulfilled}% {arrow}
      </h4>
      {isExpanded && (
        <table className="table table-bordered">
          <thead>
          <tr>
            <th>Requirement</th>
            <th>Years Required</th>
            <th>Years Fulfilled</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(fulfilledUnits).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{requirements[key]}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
        </table>
      )}
    </div>
  );
}

export default HSDegreeProgress;

