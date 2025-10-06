// Sidebar.jsx
export default function Sidebar({ onAddInputNode, onDeleteNode, selectedNode, onAddActionNode }) {
  return (
    <div className="w-52 p-3 bg-neutral-100 flex flex-col space-y-3">
      <button onClick={onAddInputNode} className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" >Add Trigger Node</button>
      <button onClick={onAddActionNode} className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" >Add Action Node</button>

      <button
        onClick={onDeleteNode}
        className={`w-full p-3 rounded transition-colors ${selectedNode? "bg-red-500 hover:bg-red-600 text-white": "bg-gray-300 cursor-not-allowed text-gray-700"}`} disabled={!selectedNode}> Delete Selected Node</button>
    </div>
  );
}
