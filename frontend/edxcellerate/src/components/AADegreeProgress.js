import React, { useState } from 'react';



function AADegreeProgress({ selectedPathway }) {
    const [isExpanded, setIsExpanded] = useState(false);  

  const requirements = {
    ENG: 6,
    FA: 3,
    HUM: 3,
    MATH: 3,
    SCIENCE: 6,
    'SOC SCI': 3,
    'US/NEV': 3,
  };

  const calculateUnits = () => {
    const fulfilledUnits = {
      ENG: 0,
      FA: 0,
      HUM: 0,
      MATH: 0,
      SCIENCE: 0,
      'SOC SCI': 0,
      'US/NEV': 0,
    };

    for (const course of selectedPathway.courses) {
      const requirement = course.aarequirements;
      if (fulfilledUnits.hasOwnProperty(requirement)) {
        fulfilledUnits[requirement] += course.units;
      }
    }

    return fulfilledUnits;
  };

  const fulfilledUnits = calculateUnits();

  const totalUnitsRequired = Object.values(requirements).reduce((a, b) => a + b);
  const totalUnitsFulfilled = Object.values(fulfilledUnits).reduce((a, b) => a + b);
  const percentageFulfilled = ((totalUnitsFulfilled / totalUnitsRequired) * 100).toFixed(0);

  const arrow = isExpanded ? '▲' : '▼';


  return (
    <div>
      <h4 onClick={() => setIsExpanded(!isExpanded)}>
        AA Degree Progress: {percentageFulfilled}% {arrow}
      </h4>
      {isExpanded && (
        <table className="table table-bordered">
          <thead>
          <tr>
            <th>Requirement</th>
            <th>Units Required</th>
            <th>Units Fulfilled</th>
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

export default AADegreeProgress;

