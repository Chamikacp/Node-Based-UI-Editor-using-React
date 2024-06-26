import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vertex } from "../constants/types/general.types";

export interface AppState {
  isEditModeOn: boolean;
  isAddLinkModeOn: boolean;
  isDeleteModeOn: boolean;
  isAddModalOpen: boolean;
  graph: Vertex[];
  vertex?: Vertex;
  isFirstNodeSelected: boolean;
  firstNode?: Vertex;
}

const initialState: AppState = {
  isEditModeOn: false,
  isAddLinkModeOn: false,
  isDeleteModeOn: false,
  isAddModalOpen: false,
  graph: [],
  vertex: undefined,
  isFirstNodeSelected: false,
  firstNode: undefined,
};

const AppSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setIsEditModeOn: (state, action: PayloadAction<boolean>) => {
      state.isEditModeOn = action.payload;
    },
    setIsAddLinkModeOn: (state, action: PayloadAction<boolean>) => {
      state.isAddLinkModeOn = action.payload;
    },
    setIsDeleteModeOn: (state, action: PayloadAction<boolean>) => {
      state.isDeleteModeOn = action.payload;
    },
    setIsAddModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAddModalOpen = action.payload;
    },
    setGraph: (state, action: PayloadAction<Vertex[]>) => {
      state.graph = action.payload;
    },
    setVertex: (state, action: PayloadAction<Vertex>) => {
      state.vertex = action.payload;
    },
    setIsFirstNodeSelected: (state, action: PayloadAction<boolean>) => {
      state.isFirstNodeSelected = action.payload;
    },
    setFirstNode: (state, action: PayloadAction<Vertex | undefined>) => {
      state.firstNode = action.payload;
    },
  },
});

export const AppActions = {
  ...AppSlice.actions,
};
export default AppSlice.reducer;
