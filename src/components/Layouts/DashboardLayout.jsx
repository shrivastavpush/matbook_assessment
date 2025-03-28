import React, { useContext, useState, useEffect } from "react";
import Header from "../Dashboard/Header";
import SearchBar from "../Dashboard/SearchBar";
import AddWorkflowButton from "../Dashboard/AddWorkFlowButton";
import WorkflowList from "../Dashboard/WorkflowList";
import { WorkDataContext } from "../../context/WorkDataContext";
import WorkflowEditor from "../WorkFLow/Canvas";

const DashboardLayout = () => {
    const { workflows } = useContext(WorkDataContext);

    const [showEditor, setShowEditor] = useState(false);

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
        setShowEditor(true);
    };

    return (
        <div className="bg-[#fdfbf6] min-h-screen py-6 px-6 container mx-auto">
            <Header />

            <div className="container mx-auto flex justify-between items-center px-20 py-4">
                <SearchBar onSearch={handleSearch} />
                <AddWorkflowButton onClick={handleAddWorkflow} />
            </div>

            <WorkflowList workflows={filteredWorkflows} />

            {showEditor && <WorkflowEditor onClose={() => setShowEditor(false)} />}
        </div>
    );
};

export default DashboardLayout;