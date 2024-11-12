import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    const { jobs, setJobs } = useOutletContext(); // Access shared state
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        candidates: 5,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);

    const toggleForm = () => setShowForm(prev => !prev);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDescriptionChange = (e) => {
        const { value } = e.target;
        const wordCount = value.split(/\s+/).length;
        if (wordCount <= 50) {
            setFormData(prev => ({ ...prev, description: value }));
        }
    };

    const generateCandidates = () => {
        return Array.from({ length: formData.candidates }, (_, i) => ({
            id: i + 1,
            name: `Candidate ${i + 1}`,
            email: `candidate${i + 1}@example.com`,
            contact: `123-456-789${i + 1}`,
            skills: ['JavaScript', 'React', 'Node.js'],
            experience: 3 + i,
            resumeLink: `http://example.com/resume${i + 1}.pdf`,
            status: 'Under Review',
            applicationDate: new Date().toLocaleDateString(),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Restrict Job ID to be three digits
        const newId = Math.floor(Math.random() * 900) + 100; // Generates a three-digit number (100-999)
        
        const newJob = {
            id: newId,
            title: formData.title,
            description: formData.description,
            candidatesList: generateCandidates(),
        };

        const updatedJobs = [...jobs, newJob];
        setJobs(updatedJobs);
        localStorage.setItem('jobs', JSON.stringify(updatedJobs));
        setFormData({ title: '', description: '', candidates: 5 });
        setShowForm(false);
        setIsEditing(false);
    };

    const handleEdit = (job) => {
        setFormData(job);
        setShowForm(true);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        const updatedJobs = jobs.filter(job => job.id !== id);
        setJobs(updatedJobs);
        localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    };

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(' ') + '...'
            : text;
    };

    const handleCreateAssessment = (jobId) => {
        navigate(`/assessment`);
    };

    useEffect(() => {
        const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
        setJobs(storedJobs);
    }, []);

    return (
        <div className="relative mx-auto max-w-5xl p-5 overflow-y-auto h-screen">
            <div className="absolute top-5 right-5 flex gap-3">
                <button
                    className="bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-700"
                    onClick={toggleForm}
                >
                    New
                </button>
                <button
                    className="bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-700"
                    onClick={() => handleCreateAssessment()}
                >
                    Create Assessment
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Create Job</h2>
                            <button
                                onClick={() => setShowForm(false)}
                                className="text-gray-500 hover:text-gray-800"
                            >
                                X
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label className="block mb-2">
                                Job Title:
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded mt-1"
                                />
                            </label>
                            <label className="block mb-2">
                                Job Description:
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleDescriptionChange}
                                    required
                                    placeholder="Enter job description (Max 50 words)"
                                    className="w-full p-2 border rounded mt-1"
                                />
                            </label>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                            <button
                                type="submit"
                                className="w-full bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-700 mt-3"
                            >
                                {isEditing ? 'Update' : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="mt-20 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-4 cursor-pointer"
                        onClick={() => navigate(`/jobs/${job.id}`)}
                    >
                        <p><strong>Job ID:</strong> {job.id}</p>
                        <p><strong>Job Title:</strong> {job.title}</p>
                        <p><strong>Job Description:</strong> {truncateText(job.description, 50)}</p>
                        <p><strong>Total Candidates Applied:</strong> {job.candidatesList?.length || 0}</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={(e) => { e.stopPropagation(); handleEdit(job); }}
                                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(job.id); }}
                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
