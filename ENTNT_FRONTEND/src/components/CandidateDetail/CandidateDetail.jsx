import React from 'react';
import { useParams, useOutletContext } from 'react-router-dom';

export default function CandidateDetail() {
    const { id, candidateId } = useParams();
    const { jobs } = useOutletContext();
    const job = jobs.find((job) => job.id === parseInt(id));
    const candidate = job ? job.candidatesList.find(c => c.id === parseInt(candidateId)) : null;

    if (!candidate) {
        return <p className="text-red-500 font-bold">Candidate not found</p>;
    }

    const handleStatusChange = (newStatus) => {
        // Update the candidate's status
        candidate.status = newStatus;
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="bg-blue-200 p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Candidate Profile</h2>
                <p className="text-lg font-semibold text-gray-700"><strong>Name:</strong> {candidate.name}</p>
                <p className="text-lg text-gray-600"><strong>Email:</strong> {candidate.email}</p>
                <p className="text-lg text-gray-600"><strong>Contact:</strong> {candidate.contact}</p>
                <p className="text-lg text-gray-600"><strong>Skills:</strong> {candidate.skills.join(', ')}</p>
                <p className="text-lg text-gray-600"><strong>Experience:</strong> {candidate.experience} years</p>

                <div className="mt-4">
                    <strong>Resume:</strong>
                    <a href={candidate.resumeLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Download Resume
                    </a>
                </div>

                <div className="mt-4">
                    <strong>Status:</strong> {candidate.status}
                    <div className="mt-2">
                        <button
                            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                            onClick={() => handleStatusChange('Accepted')}
                        >
                            Accept
                        </button>
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 ml-2"
                            onClick={() => handleStatusChange('Rejected')}
                        >
                            Reject
                        </button>
                        <button
                            className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 ml-2"
                            onClick={() => handleStatusChange('Under Review')}
                        >
                            Under Review
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
