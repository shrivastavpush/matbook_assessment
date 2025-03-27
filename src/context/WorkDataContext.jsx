import React, { useState, useEffect, createContext } from 'react'
import { generateUniqueWorkflows } from '../utils/RandomWorkDataGenerator';

export const WorkDataContext = createContext();

export const WorkDataProvider = ({ children }) => {
    const [workflows, setWorkflows] = useState([]);

    useEffect(() => {
        const initialWorkflows = generateUniqueWorkflows(50);
        setWorkflows(initialWorkflows);
    }, []);

    useEffect(() => {
        const storedWorkflows = localStorage.getItem("mockWorkflows");
        let initialWorkflows;

        if (storedWorkflows) {
            initialWorkflows = JSON.parse(storedWorkflows);
        } else {
            initialWorkflows = generateUniqueWorkflows(50);
            localStorage.setItem("mockWorkflows", JSON.stringify(initialWorkflows));
        }
        setWorkflows(initialWorkflows);
        // setFilteredWorkflows(initialWorkflows);
    }, []);

    // Mock API functions using localStorage
    const mockAddWorkflow = (newWorkflow) => {
        const storedWorkflows = localStorage.getItem("mockWorkflows");
        let currentWorkflows = storedWorkflows ? JSON.parse(storedWorkflows) : [];

        // Basic validation for unique ID and Name.
        const isDuplicate = currentWorkflows.some(
            (wf) => wf.id === newWorkflow.id || wf.name === newWorkflow.name
        );
        if (isDuplicate) {
            console.error("Duplicate ID or Name");
            return;
        }
        currentWorkflows.push(newWorkflow);
        localStorage.setItem("mockWorkflows", JSON.stringify(currentWorkflows));
        setWorkflows([...currentWorkflows]);
        // setFilteredWorkflows([...currentWorkflows]);
        return newWorkflow;
    };

    const mockDeleteWorkflow = (id) => {
        const storedWorkflows = localStorage.getItem("mockWorkflows");
        let currentWorkflows = storedWorkflows ? JSON.parse(storedWorkflows) : [];
        const updatedWorkflows = currentWorkflows.filter((wf) => wf.id !== id);
        localStorage.setItem("mockWorkflows", JSON.stringify(updatedWorkflows));
        setWorkflows(updatedWorkflows);
        // setFilteredWorkflows(updatedWorkflows);
    };

    const mockUpdateWorkflow = (id, updatedWorkflow) => {
        const storedWorkflows = localStorage.getItem("mockWorkflows");
        let currentWorkflows = storedWorkflows ? JSON.parse(storedWorkflows) : [];

        const workflowIndex = currentWorkflows.findIndex((wf) => wf.id === id);
        if (workflowIndex !== -1) {
            const isDuplicateName = currentWorkflows.some(
                (wf, index) => index !== workflowIndex && wf.name === updatedWorkflow.name
            );
            if (isDuplicateName) {
                console.error("Duplicate Name");
                return;
            }
            currentWorkflows[workflowIndex] = {
                ...currentWorkflows[workflowIndex],
                ...updatedWorkflow,
            };
            localStorage.setItem("mockWorkflows", JSON.stringify(currentWorkflows));
            setWorkflows([...currentWorkflows]);
            // setFilteredWorkflows([...currentWorkflows]);
            return { ...currentWorkflows[workflowIndex], ...updatedWorkflow };
        }
        return null;
    };

    const mockGetAllWorkflows = () => {
        const storedWorkflows = localStorage.getItem("mockWorkflows");
        return storedWorkflows ? JSON.parse(storedWorkflows) : [];
    };

    return (
        <WorkDataContext.Provider value={{ workflows, mockAddWorkflow, mockDeleteWorkflow, mockUpdateWorkflow, mockGetAllWorkflows }}>
            {children}
        </WorkDataContext.Provider>
    )
}

export default WorkDataContext