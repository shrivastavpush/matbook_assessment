import Header from "../Dashboard/Header";
import SearchBar from "../Dashboard/SearchBar";
import AddWorkflowButton from "../Dashboard/AddWorkFlowButton";
import WorkflowTable from "../Dashboard/WorkFlowList";
import { useState, useEffect } from "react";

const DashboardLayout = () => {
    const [workflows, setWorkflows] = useState([
        { id: 1, name: "Workflow 1", lastEdited: "2021-01-01" },
        { id: 2, name: "Workflow 2", lastEdited: "2021-01-01" },
        { id: 3, name: "Workflow 3", lastEdited: "2021-01-01" },
        { id: 4, name: "Workflow 4", lastEdited: "2021-01-01" },
        { id: 5, name: "Workflow 5", lastEdited: "2021-01-01" }
    ]);

    const [filteredWorkflows, setFilteredWorkflows] = useState(workflows);

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

        console.log("Filtered Workflows:", filtered);
        setFilteredWorkflows(filtered);
    };

    const handleAddWorkflow = () => {
        console.log("Add Workflow");
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
