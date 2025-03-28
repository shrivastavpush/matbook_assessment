import React, { useCallback, useState } from "react";
import { ReactFlow, Background, Controls, useEdgesState, useNodesState, } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomNode from "./CustomNode";
import SaveIcon from "../../assets/save-btn.svg";
import SaveWorkflowModal from "../Modals/SaveModal";

const initialNodes = [
    {
        id: "1",
        type: "custom",
        position: { x: 250, y: 100 },
        data: { label: "Start" },
        style: { background: "#4CAF50", color: "white" },
    },
    {
        id: "2",
        type: "custom",
        position: { x: 250, y: 300 },
        data: { label: "End" },
        style: { background: "#f44336", color: "white" },
    },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const nodeTypes = { custom: CustomNode };

const WorkflowEditor = ({ onClose }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodeId, setNodeId] = useState(3);
    const [workflowName, setWorkflowName] = useState("Untitled");
    const [showSaveModal, setShowSaveModal] = useState(false);

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) => [...eds, { ...params, id: `e${params.source}-${params.target}` }]),
        [setEdges]
    );

    const handleAddNode = () => {
        const newY = 100 + Math.random() * 200;
        const newNode = {
            id: `${nodeId}`,
            type: "custom",
            position: { x: 250, y: newY },
            data: { label: `Process ${nodeId}` },
        };
        setNodes((nds) => [...nds, newNode]);
        setNodeId((prev) => prev + 1);
    };

    const handleDeleteNode = (id) => {
        if (id === "1" || id === "2") return;
        setNodes((nds) => nds.filter((node) => node.id !== id));
        setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    };

    const handleSave = () => {
        setShowSaveModal(true);
    };

    const handleWorkflowSave = ({ name, description }) => {
        console.log("Saved Workflow:", { name, description, nodes, edges });
        setWorkflowName(name);
        setShowSaveModal(false);
    };

    return (
        <div className="fixed inset-0 bg-[#fdfbf6] z-50">
            <div className="absolute top-10 left-10 right-0 rounded-sm bg-white shadow-md z-10 px-4 py-2 w-fit">
                <div className="flex items-center gap-5">
                    <button
                        onClick={onClose}
                        className="flex items-center text-[#221F20] font-bold underline cursor-pointer"
                    >
                        &lt;- Go Back
                    </button>
                    <span className="text-blacks font-bold">{workflowName}</span>
                    <button className="text-gray-600 hover:text-gray-800" onClick={handleSave}>
                        <img src={SaveIcon} alt="Save" />
                    </button>
                </div>
            </div>

            {/* Add Process Button */}
            <div className="absolute bottom-4 right-4 z-10">
                <button
                    onClick={handleAddNode}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 shadow-lg"
                >
                    +
                </button>
            </div>

            {/* Flow Canvas */}
            <div className="h-full">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    deleteKeyCode={["Backspace", "Delete"]}
                    onNodeClick={(_, node) => {
                        if (node.id !== "1" && node.id !== "2") {
                            handleDeleteNode(node.id);
                        }
                    }}
                >
                    <Controls />
                    <Background variant="dots" gap={20} size={2} color="#F2E3C3" />
                </ReactFlow>
            </div>

            {/* Save Workflow Modal */}
            <SaveWorkflowModal
                isOpen={showSaveModal}
                onClose={() => setShowSaveModal(false)}
                onSave={handleWorkflowSave}
            />
        </div>
    );
};

export default WorkflowEditor;
