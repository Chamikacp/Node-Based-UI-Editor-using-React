import { RootState } from "../store";

export const getEditMode = (state: RootState) => state.general.app.isEditModeOn;

export const getAddLinkMode = (state: RootState) =>
  state.general.app.isAddLinkModeOn;

export const getDeleteMode = (state: RootState) =>
  state.general.app.isDeleteModeOn;

export const getAddModalStatus = (state: RootState) =>
  state.general.app.isAddModalOpen;

export const getGraph = (state: RootState) => state.general.app.graph;

export const getVertex = (state: RootState) => state.general.app.vertex;
