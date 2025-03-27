import Header from "../Dashboard/Header";
import SearchBar from "../Dashboard/SearchBar";
import AddWorkflowButton from "../Dashboard/AddWorkFlowButton";

const DashboardLayout = () => {
    const handleSearch = (searchTerm) => {
        console.log(searchTerm);
    };

    const handleAddWorkflow = () => {
        console.log("Add Workflow");
    };

    return (
        <div className="bg-stone-50 min-h-screen py-6 px-12 container mx-auto">
            <Header />

            <div className="container mx-auto flex justify-between items-center px-20 py-4">
                <SearchBar onSearch={handleSearch} />
                <AddWorkflowButton onClick={handleAddWorkflow} />
            </div>

            {/* Workflow Table */}
            <div className="bg-white shadow-md rounded-lg p-4">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2">Workflow Name</th>
                            <th className="p-2">ID</th>
                            <th className="p-2">Last Edited On</th>
                            <th className="p-2">Description</th>
                            <th className="p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {workflows.map((workflow, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-2">{workflow.name}</td>
                                <td className="p-2">{workflow.id}</td>
                                <td className="p-2">
                                    {workflow.editedBy} | {workflow.editedOn}
                                </td>
                                <td className="p-2">{workflow.description}</td>
                                <td className="p-2 flex items-center justify-center gap-2">
                                    <FaStar className="text-gray-500 cursor-pointer" />
                                    <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                                        Execute
                                    </button>
                                    <button className="border px-3 py-1 rounded">Edit</button>
                                    <FaEllipsisV className="text-gray-500 cursor-pointer" />
                                </td>
                            </tr>
                        ))}
                    </tbody> */}
                </table>

                {/* Pagination */}
                {/* <div className="flex justify-center items-center mt-4 gap-2">
                    <button disabled className="px-2 py-1 border rounded">◄</button>
                    {[1, 2, 3, "...", 15].map((num, index) => (
                        <button
                            key={index}
                            className={`px-3 py-1 border rounded ${num === currentPage ? "bg-orange-400 text-white" : ""}`}
                            onClick={() => typeof num === "number" && setCurrentPage(num)}
                        >
                            {num}
                        </button>
                    ))}
                    <button className="px-2 py-1 border rounded">►</button>
                </div> */}
            </div>
        </div>
    );
};

export default DashboardLayout;
