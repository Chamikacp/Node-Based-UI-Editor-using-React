import { Vertex } from "../constants/types/general.types";

export const setLocalStorage = (vertices: Vertex[]): void => {
  localStorage.setItem("graph", JSON.stringify(vertices));
};

export const getLocalStorage = () => {
  return localStorage.getItem("graph");
};
