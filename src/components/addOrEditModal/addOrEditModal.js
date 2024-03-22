import { useState } from "react";
import { HexColorPicker } from "react-colorful";

// styles
import "./addOrEditModal.css";

function AddOrEditModal({ open, onClose }) {
  const [color, setColor] = useState("#b32aa9");
  const [selectedNode, setSelectedNode] = useState();

  if (!open) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="modalContainer">
        <p onClick={onClose} className="closeBtn">
          X
        </p>

        <form onSubmit={onClose}>
          <h2 className="page-title">Add Node</h2>
          <label>
            <span>Node name</span>
            <input type="text" required />
          </label>

          <div className="positionContainer">
            <label className="xContainer">
              <span>Position (x)</span>
              <input type="text" required />
            </label>
            <label>
              <span>Position (y)</span>
              <input type="text" required />
            </label>
          </div>

          <label>
            <span>Node background color: {color}</span>
            <HexColorPicker color={color} onChange={setColor} />
          </label>

          <label>
            <span>Select linked nodes</span>
            <select
              value={selectedNode}
              onChange={() => setSelectedNode(selectedNode)}
            >
              <option>Node 2</option>
              <option>Node 3</option>
            </select>
          </label>

          <div className="btnContainer">
            <button className="btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddOrEditModal;
