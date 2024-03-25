import { useCallback, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useReduxDispatch, useReduxSelector } from "../../store";
import { getEditMode, getGraph, getVertex } from "../../redux/app.selector";
import { setLocalStorage } from "../../utils/localStorage.util";
import { AppActions } from "../../redux/app.slice";
import { Vertex } from "../../constants/types/general";
import i18n from "../../i18n";

// styles
import "./addOrEditModal.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddOrEditModal: React.FC<Props> = (props) => {
  const { open, onClose } = props;
  const dispatch = useReduxDispatch();
  const graph = useReduxSelector(getGraph);
  const editingNode = useReduxSelector(getVertex);
  const isEditMode = useReduxSelector(getEditMode);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [color, setColor] = useState("#b32aa9");
  const [selectedNode, setSelectedNode] = useState(0);
  const [linkedNodes, setLinkedNodes] = useState<number[]>([]);
  const [graphWithoutEditingNode, setGraphWithoutEditingNode] = useState<
    Vertex[]
  >([]);

  useEffect(() => {
    if (isEditMode && editingNode) {
      setId(editingNode.id);
      setName(editingNode.name);
      setXPosition(editingNode.position.x);
      setYPosition(editingNode.position.y);
      setColor(editingNode.color);
      setLinkedNodes(editingNode.edges);
      setGraphWithoutEditingNode(
        graph.filter((item) => item.id !== editingNode.id)
      );
    } else {
      setId(Date.now());
      setName("");
      setXPosition(0);
      setYPosition(0);
      setColor("#b32aa9");
      setLinkedNodes([]);
      setGraphWithoutEditingNode(graph);
    }
  }, [editingNode, graph, isEditMode]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      const newNode = {
        id,
        name,
        position: { x: xPosition, y: yPosition },
        color,
        edges: linkedNodes,
      };
      let newGraph = graph;
      if (isEditMode) {
        newGraph = graphWithoutEditingNode;
      }
      if (!newGraph.some((item) => item.name === newNode.name)) {
        newGraph = [...newGraph, newNode];
        setLocalStorage(newGraph);
        dispatch(AppActions.setIsEditModeOn(false));
      } else {
        e.preventDefault();
        alert(i18n.home.addOrEdit.nameAlreadyExist);
      }
    },
    [
      color,
      dispatch,
      graph,
      graphWithoutEditingNode,
      id,
      isEditMode,
      linkedNodes,
      name,
      xPosition,
      yPosition,
    ]
  );

  useEffect(() => {
    if (
      selectedNode !== 0 &&
      !linkedNodes.some((item) => item === selectedNode)
    ) {
      const list = [...linkedNodes, selectedNode];
      setLinkedNodes(list);
    }
    setSelectedNode(0);
  }, [linkedNodes, selectedNode]);

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
          <h2 className="page-title">{i18n.home.addOrEdit.title}</h2>

          <label>
            <span>{i18n.home.addOrEdit.name}</span>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </label>

          <div className="positionContainer">
            <label className="xContainer">
              <span>{i18n.home.addOrEdit.positionX}</span>
              <input
                type="text"
                onChange={(e) => setXPosition(Number(e.target.value))}
                value={xPosition}
                required
              />
            </label>
            <label>
              <span>{i18n.home.addOrEdit.positionY}</span>
              <input
                type="text"
                onChange={(e) => setYPosition(Number(e.target.value))}
                value={yPosition}
                required
              />
            </label>
          </div>

          <label>
            <span>
              {i18n.home.addOrEdit.backgroundColor}
              {color}
            </span>
            <HexColorPicker color={color} onChange={setColor} />
          </label>

          <label>
            <span>{i18n.home.addOrEdit.selectNodeTitle}</span>
            <select
              value={selectedNode}
              onChange={(e) => setSelectedNode(Number(e.target.value))}
            >
              {graphWithoutEditingNode.length > 0 ? (
                <option>{i18n.home.addOrEdit.selectNode}</option>
              ) : (
                <option>{i18n.home.addOrEdit.noNodes}</option>
              )}
              {graphWithoutEditingNode.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <div className="selectedNodesContainer">
            {linkedNodes.map((id, index) => (
              <div className="selectedNodes" key={id}>
                <p className="selectedNodesText">
                  {graph.find((item) => item.id === id)?.name}
                </p>
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
            <button className="btn">{i18n.home.addOrEdit.saveButton}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrEditModal;
