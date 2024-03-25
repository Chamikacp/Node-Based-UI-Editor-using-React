import React, { useCallback, useState } from "react";
import { DraggableData, Rnd } from "react-rnd";
import { useReduxDispatch, useReduxSelector } from "../../store";
import {
  getAddLinkMode,
  getDeleteMode,
  getEditMode,
  getGraph,
} from "../../redux/app.selector";
import { Vertex } from "../../constants/types/general.types";
import { setLocalStorage } from "../../utils/localStorage.util";
import { AppActions } from "../../redux/app.slice";
import Arrow from "../arrow/arrow";
import i18n from "../../i18n";

// styles
import "./graphView.css";

const GraphView: React.FC = () => {
  const dispatch = useReduxDispatch();
  const graph = useReduxSelector(getGraph);
  const isDeleteMode = useReduxSelector(getDeleteMode);
  const isEditMode = useReduxSelector(getEditMode);
  const isAddLinkMode = useReduxSelector(getAddLinkMode);
  const [isFirstNodeSelected, setIsFirstNodeSelected] = useState(false);
  const [firstNode, setFirstNode] = useState<Vertex>();
  const [isLinkAdded, setIsLinkAdded] = useState(false);

  const handleEdit = useCallback(
    (selectedNode: Vertex) => {
      dispatch(AppActions.setVertex(selectedNode));
      dispatch(AppActions.setIsAddModalOpen(true));
    },
    [dispatch]
  );

  const handleAddLink = useCallback(
    (selectedNode: Vertex) => {
      if (!isFirstNodeSelected) {
        setIsFirstNodeSelected(true);
        setFirstNode(selectedNode);
      } else if (firstNode?.id !== selectedNode.id) {
        let vertices = graph.map((vertex) => {
          if (vertex.id === firstNode?.id) {
            if (vertex.edges.some((item) => item === selectedNode.id)) {
              setIsLinkAdded(false);
              alert(i18n.home.graphView.linkAlreadyExist);
            } else {
              setIsLinkAdded(true);
              return {
                ...vertex,
                edges: [...vertex.edges, selectedNode.id],
              };
            }
          }
          return vertex;
        });
        dispatch(AppActions.setGraph(vertices));
        if (isLinkAdded) {
          setLocalStorage(vertices);
          dispatch(AppActions.setIsAddLinkModeOn(false));
        }
      } else {
        alert(i18n.home.graphView.selectDifferentNode);
      }
    },
    [dispatch, firstNode?.id, graph, isFirstNodeSelected, isLinkAdded]
  );

  const handleDelete = useCallback(
    (selectedNode: Vertex) => {
      const result = window.confirm(i18n.home.graphView.deleteAlertTitle);
      if (result) {
        let vertices = graph.filter((item) => item.id !== selectedNode.id);

        vertices = vertices.map((vertex) => ({
          ...vertex,
          edges: vertex.edges.filter((edge) => edge !== selectedNode.id),
        }));
        dispatch(AppActions.setGraph(vertices));
        setLocalStorage(vertices);
      }
      dispatch(AppActions.setIsDeleteModeOn(false));
    },
    [dispatch, graph]
  );

  const onClickItem = useCallback(
    (selectedNode: Vertex) => {
      if (isDeleteMode) {
        handleDelete(selectedNode);
      } else if (isEditMode) {
        handleEdit(selectedNode);
      } else if (isAddLinkMode) {
        handleAddLink(selectedNode);
      }
    },
    [
      handleAddLink,
      handleDelete,
      handleEdit,
      isAddLinkMode,
      isDeleteMode,
      isEditMode,
    ]
  );

  const onDragStop = useCallback(
    (data: DraggableData, id: number) => {
      let vertices = graph.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            position: { x: data.x, y: data.y },
          };
        }
        return item;
      });
      dispatch(AppActions.setGraph(vertices));
      setLocalStorage(vertices);
    },
    [dispatch, graph]
  );

  return (
    <>
      {graph.map((vertex) => (
        <>
          <Rnd
            className="rnd-custom"
            key={vertex.id}
            style={{ backgroundColor: vertex.color }}
            default={{
              x: vertex.position.x,
              y: vertex.position.y,
              width: "auto",
              height: "auto",
            }}
            bounds="parent"
            enableResizing={false}
            onDragStop={(e, data) => onDragStop(data, vertex.id)}
          >
            <div
              className="nodeItemTextContainer"
              onClick={() => onClickItem(vertex)}
            >
              {vertex.name}
            </div>
          </Rnd>
          {vertex.edges.map((edge) => (
            <Arrow
              key={edge}
              x1={vertex.position.x}
              y1={vertex.position.y}
              x2={graph.find((item) => item.id === edge)?.position.x ?? 0}
              y2={graph.find((item) => item.id === edge)?.position.y ?? 0}
            />
          ))}
        </>
      ))}
    </>
  );
};

export default React.memo(GraphView);
