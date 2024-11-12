import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Layout from './Layout.jsx';
import JobDescription from './components/JobDescription/JobDescription.jsx';
import CandidateDetail from './components/CandidateDetail/CandidateDetail.jsx';
import AssessmentPage from './components/AssessmentPage/AssessmentPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      {/* Add additional routes here */}
      <Route path='/jobs/:id' element = {<JobDescription />} />
      <Route path='/jobs/:id/candidates/:candidateId' element={<CandidateDetail />} />
      <Route path="/assessment" element={<AssessmentPage />} />

    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
