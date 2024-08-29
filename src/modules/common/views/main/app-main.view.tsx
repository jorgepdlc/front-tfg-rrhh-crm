import React from 'react'
import styles from './app-main.module.css'

export function AppMainView() {
    return (
        <div data-testid="app-main-view" className={styles.container}>
            {/* Home Section */}
            <section
                id="home"
                className="text-white border bg-slate-800 p-8 m-4 rounded-lg shadow-lg"
            >
                <h1 className="text-4xl font-extrabold mb-4">
                    Candidate and Job Management Application
                </h1>
                <p className="text-lg mb-3">
                    A comprehensive platform with event scheduling functionality
                    tailored for Human Resources.
                </p>
            </section>

            {/* About Section */}
            <section
                id="about"
                className="p-8 m-4 bg-white rounded-lg shadow-lg"
            >
                <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
                    About the Project
                </h2>
                <p className="text-lg text-gray-700">
                    This system is designed to store and manage detailed
                    information about candidates and job positions within a
                    company. It allows users to view and manage candidate data,
                    assign candidates to available positions, and
                    schedule/manage meetings, interviews, and other related
                    events. Accessible through a responsive web interface, it
                    ensures usability across various devices.
                </p>
            </section>

            {/* Features Section */}
            <section
                id="features"
                className="bg-gray-100 p-8 m-4 rounded-lg shadow-lg"
            >
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
                    Functional Characteristics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">
                            Candidate Management
                        </h3>
                        <p className="text-gray-700 mb-4">
                            Manage the personal and professional details of
                            candidates efficiently.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">
                            Job Position Management
                        </h3>
                        <p className="text-gray-700 mb-4">
                            Create, modify, and delete job positions, and assign
                            candidates to these roles.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">
                            Event Scheduling
                        </h3>
                        <p className="text-gray-700 mb-4">
                            Schedule and manage meetings, interviews, and other
                            recruitment-related events.
                        </p>
                    </div>
                </div>
            </section>

            {/* Tech and Knowledge Section */}
            <section
                id="tech-knowledge"
                className="p-8 m-4 bg-gray-100 rounded-lg shadow-lg"
            >
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
                    Tech and Knowledge Overview
                </h2>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Tech Section */}
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold mb-4">
                            Development and Deployment Environments
                        </h3>
                        <p className="text-lg mb-4">
                            The application utilizes the following technologies:
                        </p>
                        <ul className="list-none space-y-4">
                            <li className="text-xl">
                                <span className="font-semibold">Database:</span>{' '}
                                PostgreSQL
                            </li>
                            <li className="text-xl">
                                <span className="font-semibold">Backend:</span>{' '}
                                Java with SpringBoot
                            </li>
                            <li className="text-xl">
                                <span className="font-semibold">Frontend:</span>{' '}
                                React and Next.js
                            </li>
                        </ul>
                    </div>
                    {/* Knowledge Section */}
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold mb-4">
                            Knowledge Areas
                        </h3>
                        <ul className="list-disc list-inside space-y-4">
                            <li className="text-xl text-gray-700">
                                <span className="font-semibold">
                                    Computer Architecture and Technology
                                </span>
                            </li>
                            <li className="text-xl text-gray-700">
                                <span className="font-semibold">
                                    Systems Engineering and Automation
                                </span>
                            </li>
                            <li className="text-xl text-gray-700">
                                <span className="font-semibold">
                                    Programming Languages and Systems
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer id="contact" className="p-8 bg-black text-white">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold mb-2">
                            TFG in collaboration with AXPE Consulting S.L.
                        </h3>
                        <p>Email: jprietodlc@usal.es</p>
                    </div>
                </div>
                <p className="mt-4 text-center">
                    © 2024 Jorge Prieto de la Cruz. All Rights Reserved.
                </p>
            </footer>
        </div>
    )
}
