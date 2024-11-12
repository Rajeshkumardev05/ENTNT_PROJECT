import React from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';

export default function JobDescription() {
    const { id } = useParams();
    const { jobs } = useOutletContext();
    const navigate = useNavigate();
    const job = jobs.find((job) => job.id === parseInt(id));

    if (!job) {
        return <p className="text-red-500 font-bold">Job not found</p>;
    }

    const handleCandidateClick = (candidateId) => {
        navigate(`/jobs/${id}/candidates/${candidateId}`);
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="bg-green-200 border-slate-500 p-6 rounded-lg shadow-lg mb-8 w-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Job Title: {job.title}</h2>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">Job Description: {job.description}</h3>
            </div>

            <div className="bg-light bg-pink-200 inline-block rounded-lg">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Candidates:</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {job.candidatesList.map((candidate) => (
                    <div
                        key={candidate.id}
                        className="bg-gray-300 border border-red-500 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
                        onClick={() => handleCandidateClick(candidate.id)}
                    >
                        <p className="text-sm font-semibold text-gray-700">
                            <strong>Name:</strong> {candidate.name}
                        </p>
                        <p className="text-sm text-blue-600 hover:underline">
                            <strong>Resume:</strong>
                            <a href={candidate.resumeLink} target="_blank" rel="noopener noreferrer">
                                Download
                            </a>
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Application Date:</strong> {candidate.applicationDate}
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                            <strong>Status:</strong> {candidate.status}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
