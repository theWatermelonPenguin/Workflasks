// useCanvasActions.js
import { useCallback } from "react";

export function useCanvasActions({ setNodes, setEdges, nodeCount, setNodeCount, selectedNode, setSelectedNode }) {
  // update node data value
  const updateNodeValue = useCallback(
    (nodeId, value) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: { ...node.data, value, onChange: node.data.onChange },
              }
            : node
        )
      );
    },
    [setNodes]
  );

  // add a new input node
  const addInputNode = useCallback(() => {
    const newNodeId = `${nodeCount + 1}`;
    const newNode = {
      id: newNodeId,
      type: "inputnode",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: `Node ${newNodeId}`,
        value: "",
        onChange: (val) => updateNodeValue(newNodeId, val),
      },
    };
    setNodes((nds) => nds.concat(newNode));
    setNodeCount(nodeCount + 1);
  }, [nodeCount, setNodeCount, setNodes, updateNodeValue]);

  // add an action node
  const addActionNode = useCallback(() => {
    const newNodeId = `${nodeCount + 1}`;
    const newNode = {
      id: newNodeId,
      type: "actionnode", // <- make sure your React Flow knows this type
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: `Action Node ${newNodeId}`,
        value: "",
        onChange: (val) => updateNodeValue(newNodeId, val),
      },
    };
    setNodes((nds) => nds.concat(newNode));
    setNodeCount(nodeCount + 1);
  }, [nodeCount, setNodeCount, setNodes, updateNodeValue]);

  // delete selected node
  const deleteSelectedNode = useCallback(() => {
    if (!selectedNode) return; 

    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
    setEdges((eds) =>
      eds.filter(
        (edge) =>
          edge.source !== selectedNode.id && edge.target !== selectedNode.id
      )
    );
    setSelectedNode(null);
  }, [selectedNode, setNodes, setEdges, setSelectedNode]);

  return { addInputNode, addActionNode, deleteSelectedNode, updateNodeValue };
}
