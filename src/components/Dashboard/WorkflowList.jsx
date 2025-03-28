import { useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdArrowDownward } from "react-icons/md";
import DefaultPin from '../../assets/pin-default.svg';
import PinnedPin from '../../assets/pin-active.svg';

import SmallButton from "../SmallButton";
import WarningModal from "../Modals/WarningModal";
import Pagination from "./Pagination";

const isMobile = window.innerWidth < 768;

const WorkflowList = ({ workflows }) => {
    const [pinned, setPinned] = useState({});
    const [showExecuteModal, setShowExecuteModal] = useState(false);
    const [selectedWorkflow, setSelectedWorkflow] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    let itemsPerPage = isMobile ? 6 : 5;

    // Paginate workflows
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentWorkflows = workflows.slice(indexOfFirstItem, indexOfLastItem);

    const togglePin = (id) => {
        setPinned((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
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

    const handleConfirmExecution = () => {
        console.log(`Executing workflow: ${selectedWorkflow?.id}`);
        setShowExecuteModal(false);
        setSelectedWorkflow(null);
    };

    if (!workflows || workflows.length === 0) {
        return <p className="text-center text-gray-500">No workflows found.</p>;
    }

    return (
        <div className="bg-white rounded-lg mx-auto md:mx-20 md:p-10 p-4 shadow-xl w-[calc(100vw-16vw)]">
            {/* Scrollable Wrapper for the Table */}
            <div className="max-w-full overflow-x-auto">
                <table className="border-collapse w-full">
                    <thead>
                        <tr className="text-left text-gray-600 border-b-2 border-orange-500">
                            <th className="p-2 text-[14px] font-medium text-black">Workflow Name</th>
                            <th className="p-2 text-[14px] font-medium text-black">ID</th>
                            <th className="p-2 text-[14px] font-medium text-black">Last Edited On</th>
                            <th className="p-2 text-[14px] font-medium text-black">Description</th>
                            <th className="p-2"></th>
                            <th className="p-2"></th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentWorkflows.map((workflow) => (
                            <tr key={workflow.id} className="border-b hover:bg-gray-100 transition cursor-pointer">
                                <td className="py-5 px-2 text-gray-800 max-w-[120px] truncate">{workflow.name}</td>
                                <td className="py-5 px-2 text-gray-600 font-medium max-w-[80px] truncate">#{workflow.id}</td>
                                <td className="py-5 px-2 text-gray-600 max-w-[200px] truncate">{workflow.lastEdited}</td>
                                <td className="py-5 px-2 text-gray-500 max-w-[220px] truncate">{workflow.description}</td>
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
                                    <SmallButton label="Execute" onClick={(e) => handleExecuteWorkflow(workflow, e)} />
                                </td>
                                <td className="py-5 px-2 max-w-[50px]">
                                    <SmallButton label="Edit" onClick={() => console.log(`Editing ${workflow.id}`)} />
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
            </div>

            {/* Pagination */}
            <div className="flex justify-end mt-4">
                <Pagination
                    totalItems={workflows.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>

            {/* Execution Confirmation Modal */}
            {showExecuteModal && (
                <WarningModal
                    isOpen={showExecuteModal}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmExecution}
                    message={`Are you sure you want to execute workflow '#${selectedWorkflow?.id}-${selectedWorkflow?.name}'?`}
                />
            )}
        </div>
    );
};

export default WorkflowList;
