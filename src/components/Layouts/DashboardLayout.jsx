import React, { useContext, useState, useEffect } from "react";
import Header from "../Dashboard/Header";
import SearchBar from "../Dashboard/SearchBar";
import AddWorkflowButton from "../Dashboard/AddWorkFlowButton";
import WorkflowTable from "../Dashboard/WorkFlowList";
import { WorkDataContext } from "../../context/WorkDataContext";

const DashboardLayout = () => {
    const { workflows, mockAddWorkflow } = useContext(WorkDataContext);

    const [filteredWorkflows, setFilteredWorkflows] = useState([]);

    useEffect(() => {
        setFilteredWorkflows(workflows);
    }, [workflows]);

    const handleSearch = (searchTerm) => {
        const lowercasedQuery = searchTerm.toLowerCase();
        const filtered = workflows.filter(
            (workflow) =>
                workflow.name.toLowerCase().includes(lowercasedQuery) ||
                workflow.id.toString().includes(lowercasedQuery)
        );
        setFilteredWorkflows(filtered);
    };

    const handleAddWorkflow = () => {
        const newWorkflow = {
            id: Math.max(0, ...workflows.map((w) => w.id)) + 1,
            name: `Workflow ${workflows.length + 1}`,
            lastEdited: new Date().toISOString().split("T")[0],
            description: `Description for Workflow ${workflows.length + 1}`,
        };
        mockAddWorkflow(newWorkflow);
    };

    return (
        <div className="bg-[#fdfbf6] min-h-screen py-6 px-6 container mx-auto">
            <Header />

            <div className="container mx-auto flex justify-between items-center px-20 py-4">
                <SearchBar onSearch={handleSearch} />
                <AddWorkflowButton onClick={handleAddWorkflow} />
            </div>

            <WorkflowTable workflows={filteredWorkflows} />
        </div>
    );
};

export default DashboardLayout;