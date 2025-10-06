import { useCallback, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType
} from "reactflow";
import "reactflow/dist/style.css";

import InputNode from "../nodes/TriggerNode";
import ActionNode from "../nodes/ActionNode";
import Sidebar from "./Sidebar";
import { useCanvasActions } from "./useCanvasActions";

const initialNodes = [];
const initialEdges = [];
const nodeTypes = { inputnode: InputNode, actionnode: ActionNode };

export default function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeCount, setNodeCount] = useState(initialNodes.length);
  const [selectedNode, setSelectedNode] = useState(null);

  const { addInputNode, deleteSelectedNode, addActionNode } = useCanvasActions({setNodes, setEdges, nodeCount, setNodeCount, selectedNode, setSelectedNode, MarkerType,});

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            markerEnd: { type: MarkerType.ArrowClosed }, // ✅ add arrow
          },
          eds
        )
      ),
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => setSelectedNode(node), []);

  return (
    <div className="flex h-screen">
      <Sidebar
        onAddInputNode={addInputNode}
        onAddActionNode={addActionNode}
        onDeleteNode={deleteSelectedNode}
        selectedNode={selectedNode}
      />

      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
