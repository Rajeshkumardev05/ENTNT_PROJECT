import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AssessmentPage = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]); // All jobs list
    const [selectedJobId, setSelectedJobId] = useState(''); // Currently selected job ID
    const [job, setJob] = useState(null); // Currently selected job object
    const [questions, setQuestions] = useState([]); // Store questions for the selected job
    const [questionData, setQuestionData] = useState({
        question: '',
        options: ['', '', '', ''],  // Four answer options
        correctAnswer: ''
    });
    const [editIndex, setEditIndex] = useState(null); // Track the index of the question being edited

    // Load all jobs from localStorage
    useEffect(() => {
        const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
        setJobs(storedJobs);
    }, []);

    useEffect(() => {
        if (selectedJobId) {
            const selectedJob = jobs.find(job => job.id === Number(selectedJobId));
            setJob(selectedJob);

            const storedQuestions = JSON.parse(localStorage.getItem(selectedJobId)) || [];
            setQuestions(storedQuestions);
        }
    }, [selectedJobId, jobs]);

    const handleQuestionChange = (e) => {
        const { name, value } = e.target;
        if (name === 'options') {
            const index = e.target.dataset.index;
            setQuestionData((prev) => {
                const newOptions = [...prev.options];
                newOptions[index] = value;
                return { ...prev, options: newOptions };
            });
        } else {
            setQuestionData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleAddOrUpdateQuestion = () => {
        if (editIndex !== null) {
            // Update the question if in edit mode
            const updatedQuestions = [...questions];
            updatedQuestions[editIndex] = questionData;
            setQuestions(updatedQuestions);
            localStorage.setItem(selectedJobId, JSON.stringify(updatedQuestions));
            setEditIndex(null); // Reset edit mode
        } else {
            // Add new question if not in edit mode
            const newQuestions = [...questions, questionData];
            setQuestions(newQuestions);
            localStorage.setItem(selectedJobId, JSON.stringify(newQuestions));
        }

        // Reset the question form
        setQuestionData({
            question: '',
            options: ['', '', '', ''],
            correctAnswer: ''
        });
    };

    const handleEditQuestion = (index) => {
        setQuestionData(questions[index]);
        setEditIndex(index); // Set the edit mode with the selected index
    };

    const handleDeleteQuestion = (index) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
        localStorage.setItem(selectedJobId, JSON.stringify(updatedQuestions));
    };

    const handleSaveAssessment = () => {
        alert('Assessment saved successfully');
        navigate('/');
    };

    // Check if all fields in questionData are filled
    const isFormComplete = () => {
        const { question, options, correctAnswer } = questionData;
        return (
            question.trim() !== '' &&
            options.every(option => option.trim() !== '') &&
            correctAnswer.trim() !== ''
        );
    };

    return (
        <div className="container max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">Create/Manage Assessment</h1>

            <div className="job-selection mb-6">
                <label htmlFor="jobSelect" className="block text-lg font-medium mb-2">Select Job</label>
                <select
                    id="jobSelect"
                    value={selectedJobId}
                    onChange={(e) => setSelectedJobId(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                >
                    <option value="">Select a job...</option>
                    {jobs.map((job) => (
                        <option key={job.id} value={job.id}>
                            {job.title}
                        </option>
                    ))}
                </select>
            </div>

            {selectedJobId && job && (
                <div className="assessment-container mt-6">
                    <h2 className="text-2xl font-semibold mb-4">Create/Manage Assessment for: {job.title}</h2>

                    <div className="question-form mb-6 p-6 border border-gray-200 rounded-md shadow-md w-96 mx-auto">
                        <label className="block text-lg font-medium mb-2">
                            Question:
                            <input
                                type="text"
                                name="question"
                                value={questionData.question}
                                onChange={handleQuestionChange}
                                placeholder="Enter question"
                                className="w-full p-2 mt-1 mb-3 border border-gray-300 rounded-md"
                            />
                        </label>

                        {questionData.options.map((option, index) => (
                            <div key={index} className="option-input mb-3">
                                <label className="block text-md">
                                    Option {index + 1}:
                                    <input
                                        type="text"
                                        data-index={index}
                                        value={option}
                                        onChange={handleQuestionChange}
                                        name="options"
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                    />
                                </label>
                            </div>
                        ))}

                        <label className="block text-lg font-medium mb-2">
                            Correct Answer:
                            <input
                                type="text"
                                name="correctAnswer"
                                value={questionData.correctAnswer}
                                onChange={handleQuestionChange}
                                placeholder="Enter correct answer"
                                className="w-full p-2 mt-1 mb-3 border border-gray-300 rounded-md"
                            />
                        </label>

                        <button
                            type="button"
                            onClick={handleAddOrUpdateQuestion}
                            className={`w-full p-2 rounded-md mt-3 ${
                                isFormComplete() ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={!isFormComplete()}
                        >
                            {editIndex !== null ? 'Update Question' : 'Add Question'}
                        </button>
                    </div>

                    <div className="question-list mt-8">
    <h3 className="text-xl font-semibold mb-4">Existing Questions</h3>
    {questions.length > 0 ? (
        <ul>
            {questions.map((q, index) => (
                <li key={index} className="mb-6 p-4 border border-gray-300 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                        <strong className="text-lg">Q{index + 1}: {q.question}</strong>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleEditQuestion(index)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteQuestion(index)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    <ul className="pl-4 mb-2">
                        {q.options.map((option, optIndex) => (
                            <li key={optIndex} className="text-gray-950">
                                <strong>{String.fromCharCode(65 + optIndex)}.</strong> {option}
                            </li>
                        ))}
                    </ul>
                    <p className="text-green-600 font-medium">Correct Answer: {q.correctAnswer}</p>
                </li>
            ))}
        </ul>
    ) : (
        <p className="text-gray-500">No questions added yet.</p>
    )}
</div>


                    <button
                        onClick={handleSaveAssessment}
                        className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 focus:outline-none mt-6"
                    >
                        Save Assessment
                    </button>
                </div>
            )}
        </div>
    );
};

export default AssessmentPage;
