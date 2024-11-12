import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function Layout() {
    const [jobs, setJobs] = useState([]);
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
            <Outlet context={{ jobs, setJobs }} />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
