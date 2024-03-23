import { useCallback, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

// styles
import "./addOrEditModal.css";
import { useReduxSelector } from "../../store";
import { getGraph } from "../../redux/app.selector";
import { Vertex } from "../../constants/types/types";

function AddOrEditModal({
  open,
  onClose,
}: Readonly<{
  open: boolean;
  onClose: () => void;
}>) {
  const graph = useReduxSelector(getGraph);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [color, setColor] = useState("#b32aa9");
  const [selectedNode, setSelectedNode] = useState("");
  const [linkedNodes, setLinkedNodes] = useState<Vertex[]>([]);

  useEffect(() => {
    setId(graph.length + 1);
    console.log(JSON.stringify(graph));
  }, [graph, graph.length, selectedNode]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      const newNode = {
        id,
        name,
        position: { x: xPosition, y: yPosition },
        color,
        edges: linkedNodes,
      };
      if (!graph.some((item) => item.name === newNode.name)) {
        const newGraph = [...graph, newNode];
        localStorage.setItem("graph", JSON.stringify(newGraph));
      }
    },
    [color, graph, id, linkedNodes, name, xPosition, yPosition]
  );

  useEffect(() => {
    const node = graph.find((item) => item.name === selectedNode);
    if (node && !linkedNodes.some((item) => item.name === selectedNode)) {
      const list = [...linkedNodes, node];
      setLinkedNodes(list);
    }
    setSelectedNode("");
  }, [graph, linkedNodes, selectedNode]);

  const onRemoveLink = useCallback(
    (indexToRemove: number) => {
      const list = linkedNodes.filter((item, index) => index !== indexToRemove);
      setLinkedNodes(list);
    },
    [linkedNodes]
  );

  if (!open) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="modalContainer">
        <p onClick={onClose} className="closeBtn">
          X
        </p>

        <form onSubmit={handleSubmit}>
          <h2 className="page-title">Add Node</h2>

          <label>
            <span>Node name</span>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </label>

          <div className="positionContainer">
            <label className="xContainer">
              <span>Position (x)</span>
              <input
                type="text"
                onChange={(e) => setXPosition(Number(e.target.value))}
                value={xPosition}
                required
              />
            </label>
            <label>
              <span>Position (y)</span>
              <input
                type="text"
                onChange={(e) => setYPosition(Number(e.target.value))}
                value={yPosition}
                required
              />
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
              onChange={(e) => setSelectedNode(e.target.value)}
            >
              {graph.length > 0 ? (
                <option>Select a node</option>
              ) : (
                <option>No nodes to select</option>
              )}
              {graph.map((item) => (
                <option value={item.name} selected key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <div className="selectedNodesContainer">
            {linkedNodes.map((item, index) => (
              <div className="selectedNodes" key={item.id}>
                <p className="selectedNodesText">{item.name}</p>
                <p
                  className="selectedNodesRemove"
                  onClick={() => onRemoveLink(index)}
                >
                  X
                </p>
              </div>
            ))}
          </div>

          <div className="btnContainer">
            <button className="btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddOrEditModal;
