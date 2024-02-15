import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Booking.css';

const Booking = () => {
    const [volunteerSessions, setVolunteerSessions] = useState([]);

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const fetchVolunteers = async () => {
        try {
            const response = await axios.get('http://localhost:8081/volunteers');
            setVolunteerSessions(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='booking'>
            <h2 className="mt-4">Booking</h2>
            <p>This section is used for booking sessions.</p>
            <div className="table-responsive">
                {volunteerSessions.length === 0 ? (
                    <p>No volunteers available.</p>
                ) : (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Session</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Max Participants</th>
                                <th>Book</th>
                            </tr>
                        </thead>
                        <tbody>
                            {volunteerSessions.map((session) => (
                                <tr key={session.SessionID}>
                                    <td>{session.SessionName}</td>
                                    <td>{new Date(session.Date).toLocaleDateString('en-GB')}</td>
                                    <td>{session.Time}</td>
                                    <td>{session.MaxParticipants}</td>
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Booking;
