import { Handle, Position } from "reactflow";

function InputNode({ data }) {
  return (
    <div className="border bg-neutral-100 w-28 h-28 rounded-lg overflow-hidden">
      <h1 className="bg-purple-600 text-white text-left pl-2 pt-1 pb-1">Trigger</h1>
      <select onChange={(e) => data.onChange(e.target.value)} onClick={(e) => e.stopPropagation()} className="focus:outline-none pl-2">
        <option value="lizard">lizard</option>
        <option value="manug">manug</option>
      </select>

      <Handle type="source" position={Position.Right} id="out" style={{ background: "#00f" }}/>

      <Handle type="target" position={Position.Left} id="in" style={{ background: "#f00" }} />
    </div>
  );
}

export default InputNode;