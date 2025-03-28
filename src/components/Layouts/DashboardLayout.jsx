import React, { useContext, useState, useMemo, useCallback } from "react";
import Header from "../Dashboard/Header";
import SearchBar from "../Dashboard/SearchBar";
import AddWorkflowButton from "../Dashboard/AddWorkFlowButton";
import WorkflowList from "../Dashboard/WorkflowList";
import { WorkDataContext } from "../../context/WorkDataContext";
import WorkflowEditor from "../../pages/Canvas";

const DashboardLayout = () => {
    const { workflows } = useContext(WorkDataContext);
    const [showEditor, setShowEditor] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredWorkflows = useMemo(() => {
        const lowercasedQuery = searchTerm.toLowerCase();
        return workflows.filter(
            (workflow) =>
                workflow.name.toLowerCase().includes(lowercasedQuery) ||
                workflow.id.toString().includes(lowercasedQuery)
        );
    }, [searchTerm, workflows]);

    const handleSearch = useCallback((query) => {
        setSearchTerm(query);
    }, []);

    const handleAddWorkflow = useCallback(() => {
        setShowEditor(true);
    }, []);

    return (
        <div className="bg-[#fdfbf6] min-h-screen py-6 px-4 sm:px-6 container mx-auto">
            <Header />

            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 sm:px-20 py-4 gap-4">
                <SearchBar onSearch={handleSearch} />
                <AddWorkflowButton onClick={handleAddWorkflow} aria-label="Add new workflow" />
            </div>

            <WorkflowList workflows={filteredWorkflows} />

            {showEditor && <WorkflowEditor onClose={() => setShowEditor(false)} />}
        </div>
    );
};

export default DashboardLayout;
