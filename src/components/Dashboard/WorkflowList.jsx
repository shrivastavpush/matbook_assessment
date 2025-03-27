import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import DefaultPin from '../../assets/pin-default.svg'
import PinnedPin from '../../assets/pin-active.svg'

import SmallButton from "../SmallButton";
import WarningModal from "../Modals/WarningModal";

const WorkflowList = ({ workflows }) => {
    const [pinned, setPinned] = useState({});
    const [showExecuteModal, setShowExecuteModal] = useState(false);
    const [selectedWorkflow, setSelectedWorkflow] = useState("null");

    const togglePin = (id) => {
        setPinned((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    if (!workflows || workflows.length === 0) {
        return <p className="text-center text-gray-500">No workflows found.</p>;
    }

    const handleWorkflowClick = (id, e) => {
        e.stopPropagation();
        console.log(`Workflow ${id} clicked`);
    };

    const handleExecuteWorkflow = (workflow, e) => {
        e.stopPropagation();
        setSelectedWorkflow(workflow);
        setShowExecuteModal(true);
    };

    const handleCloseModal = () => {
        setShowExecuteModal(false);
        setSelectedWorkflow(null);
    };

    const handleEditWorkflow = (workflow, e) => {
        e.stopPropagation();
        console.log(`Workflow ${workflow.id} edited`);
    };

    const handleConfirmExecution = () => {
        console.log(`Executing workflow: ${selectedWorkflow?.id}`);
        setShowExecuteModal(false);
        setSelectedWorkflow(null);
    };

    return (
        <div className="bg-white rounded-lg mx-20 p-10 shadow-xl">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="text-left text-gray-600 border-b-2 border-orange-500 ">
                        <th className="p-2 text-[14px] font-medium text-black">Workflow Name</th>
                        <th className="p-2 text-[14px] font-medium text-black">ID</th>
                        <th className="py-2 pr-6 text-[14px] font-medium text-black">Last Edited On</th>
                        <th className="p-2 text-[14px] font-medium text-black">Description</th>
                        <th className="p-2"></th>
                        <th className="p-2"></th>
                        <th className="p-2"></th>
                    </tr>
                </thead>

                <tbody>
                    {workflows.map((workflow) => (
                        <tr key={`workflow-${workflow.id}`}
                            className="border-b hover:bg-gray-100 transition cursor-pointer"
                            onClick={(e) => handleWorkflowClick(workflow.id, e)}>
                            <td className="py-5 px-2 text-gray-800 max-w-[120px] truncate">{workflow.name}</td>
                            <td className="py-5 px-2 text-gray-600 font-medium max-w-[80px] truncate">#{workflow.id}</td>
                            <td className="py-5 px-2  pr-6 text-gray-600 max-w-[200px] truncate">{workflow.lastEdited}</td>
                            <td className="py-5 px-2 text-gray-500 max-w-[220px] truncate">
                                {workflow.description}
                            </td>
                            <td className="py-5 px-2 text-center">
                                <img
                                    src={pinned[workflow.id] ? PinnedPin : DefaultPin}
                                    alt="Pin"
                                    className="cursor-pointer"
                                    onClick={() => togglePin(workflow.id)}
                                    width={15}
                                    height={15}
                                />
                            </td>
                            <td className="py-5 px-2 max-w-[70px]">
                                <SmallButton
                                    label="Execute"
                                    onClick={(e) => handleExecuteWorkflow(workflow, e)}
                                />
                            </td>
                            <td className="py-5 px-2 max-w-[50px]">
                                <SmallButton
                                    label="Edit"
                                    onClick={(e) => handleEditWorkflow(workflow, e)}
                                />
                            </td>
                            <td className="py-5 px-2 max-w-[40px]">
                                <IoEllipsisVertical className="text-[#221F20] cursor-pointer text-lg" />
                            </td>
                            <td className="py-5 px-2 max-w-[40px]">
                                <MdArrowDownward className="text-[#221F20] cursor-pointer text-lg" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showExecuteModal && <WarningModal
                isOpen={showExecuteModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmExecution}
                message={`Are you sure you want to execute the process '#${selectedWorkflow?.id}-${selectedWorkflow?.name} '?`}
            />}
        </div>
    );
};

export default WorkflowList;
