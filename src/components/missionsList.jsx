/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMissions, selectMappedMissions, selectMissionsStatus } from '../redux/missions/missionsSlice';
import './MissionsList.css'; // Import your stylesheet

function MissionsList() {
  const dispatch = useDispatch();
  const mappedMissions = useSelector(selectMappedMissions);
  const missionsStatus = useSelector(selectMissionsStatus);

  useEffect(() => {
    if (missionsStatus === 'idle') {
      dispatch(getMissions());
    }
  }, [dispatch, missionsStatus]);

  if (missionsStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (missionsStatus === 'failed') {
    return <div>Error loading missions data.</div>;
  }

  return (
    <div>
      <table className="missions-table">
        <thead>
          <tr>
            <th>Mission</th>
            <th className="wider-column">Description</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {mappedMissions.map((mission, index) => (
            <tr key={mission.mission_id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
              <td className="bold-text">{mission.mission_name}</td>
              <td>{mission.description}</td>
              <td>{mission.status === 'a member' ? 'A Member' : 'Not a Member'}</td>
              <td className="joinContainer"><button type="button" className="joinMission">Join Mission</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MissionsList;
