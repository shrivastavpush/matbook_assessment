import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlinePushPin } from "react-icons/md";

const WorkflowList = ({ workflows }) => {
    const [pinned, setPinned] = useState({});

    const togglePin = (id) => {
        setPinned((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    if (!workflows || workflows.length === 0) {
        return <p className="text-center text-gray-500">No workflows found.</p>;
    }

    const handleWorkflowClick = (id) => {
        console.log(`Workflow ${id} clicked`);
    };

    return (
        <div className="bg-white rounded-lg mx-20 p-10">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="text-left text-gray-600 border-b-2 border-orange-500">
                        <th className="p-3">Workflow Name</th>
                        <th className="p-3">ID</th>
                        <th className="p-3">Last Edited On</th>
                        <th className="p-3">Description</th>
                        <th className="p-3"></th>
                        <th className="p-3"></th>
                        <th className="p-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {workflows.map((workflow) => (
                        <tr key={workflow.id}
                            className="border-b hover:bg-gray-100 transition cursor-pointer"
                            onClick={() => handleWorkflowClick(workflow.id)}>
                            <td className="p-3 text-gray-800">{workflow.name}</td>
                            <td className="p-3 text-gray-600 font-medium">#{workflow.id}</td>
                            <td className="p-3 text-gray-600">{workflow.lastEdited}</td>
                            <td className="p-3 text-gray-500 truncate">
                                {workflow.description}
                            </td>
                            <td className="p-3 text-center">
                                <MdOutlinePushPin
                                    className={`cursor-pointer rotate-45 ${pinned[workflow.id] ? "text-yellow-500" : "text-gray-400"
                                        }`}
                                    onClick={() => togglePin(workflow.id)}
                                    size={20}
                                />
                            </td>
                            <td className="p-3">
                                <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
                                    Execute
                                </button>
                            </td>
                            <td className="p-3">
                                <button className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600">
                                    Edit
                                </button>
                            </td>
                            <td className="p-3 text-center">
                                <IoEllipsisVertical className="text-gray-600 cursor-pointer text-lg" />
                            </td>
                            <td className="p-3 text-center">
                                <MdKeyboardArrowDown className="text-gray-600 cursor-pointer text-lg" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WorkflowList;
