import { RootState } from "../store";

export const getEditMode = (state: RootState) => state.general.app.isEditModeOn;

export const getDeleteMode = (state: RootState) =>
  state.general.app.isDeleteModeOn;

export const getGraph = (state: RootState) => state.general.app.graph;
