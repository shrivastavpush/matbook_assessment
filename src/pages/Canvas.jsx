import React, { useCallback, useState } from "react";
import { ReactFlow, Background, Controls, useEdgesState, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomNode from "../components/CustomNode";
import SaveIcon from "../assets/save-btn.svg";
import SaveWorkflowModal from "../components/Modals/SaveModal";

const initialNodes = [
    {
        id: "1",
        type: "custom",
        position: { x: 250, y: 50 },
        data: { label: "Start" },
    },
    {
        id: "2",
        type: "custom",
        position: { x: 250, y: 400 },
        data: { label: "End" },
    },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2", type: 'smoothstep' }];

const nodeTypes = { custom: CustomNode };

const WorkflowEditor = ({ onClose }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodeId, setNodeId] = useState(3);
    const [workflowName, setWorkflowName] = useState("Untitled");
    const [showSaveModal, setShowSaveModal] = useState(false);

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) => [...eds, { ...params, id: `e${params.source}-${params.target}`, type: 'smoothstep' }]),
        [setEdges]
    );

    const handleAddNode = () => {
        // Calculate the vertical gap between Start and End
        const startNode = nodes.find(n => n.id === "1");
        const endNode = nodes.find(n => n.id === "2");
        const verticalGap = endNode.position.y - startNode.position.y;

        // Calculate new node position
        const existingNodes = nodes.filter(n => n.id !== "1" && n.id !== "2");
        const newY = startNode.position.y + (verticalGap / (existingNodes.length + 2));

        const newNode = {
            id: `${nodeId}`,
            type: "custom",
            position: { x: 250, y: newY },
            data: { label: "API Call" },
        };

        // Rearrange existing nodes
        const updatedNodes = nodes.map(node => {
            if (node.id === "1" || node.id === "2") return node;
            const index = existingNodes.findIndex(n => n.id === node.id) + 1;
            return {
                ...node,
                position: {
                    ...node.position,
                    y: startNode.position.y + (verticalGap * (index + 1) / (existingNodes.length + 2))
                }
            };
        });

        setNodes([...updatedNodes, newNode]);
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
                    <span className="text-black font-bold">{workflowName}</span>
                    <button className="text-gray-600 hover:text-gray-800 cursor-pointer " onClick={() => setShowSaveModal(true)}>
                        <img src={SaveIcon} alt="Save" />
                    </button>
                </div>
            </div>

            {/* Add Process Button */}
            <div className="absolute bottom-4 right-4 z-10">
                <button
                    onClick={handleAddNode}
                    className="bg-[#849E4C] text-white w-12 h-12 rounded-full hover:bg-[#6d833e] shadow-lg flex items-center justify-center text-2xl"
                >
                    +
                </button>
            </div>

            {/* Flow Canvas */}
            <div className="h-full ">
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
                    fitView
                >
                    <Controls aria-label="Controls" orientation="horizontal" position="bottom-right" />
                    <Background variant="dots" gap={20} size={2} color="#F2E3C3" />
                </ReactFlow>
            </div>

            <SaveWorkflowModal
                isOpen={showSaveModal}
                onClose={() => setShowSaveModal(false)}
                onSave={handleWorkflowSave}
            />
        </div>
    );
};

export default WorkflowEditor;
