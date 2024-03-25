import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vertex } from "../constants/types/general";

export interface AppState {
  isEditModeOn: boolean;
  isAddLinkModeOn: boolean;
  isDeleteModeOn: boolean;
  isAddModalOpen: boolean;
  graph: Vertex[];
  vertex?: Vertex;
}

const initialState: AppState = {
  isEditModeOn: false,
  isAddLinkModeOn: false,
  isDeleteModeOn: false,
  isAddModalOpen: false,
  graph: [],
  vertex: undefined,
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
  },
});

export const AppActions = {
  ...AppSlice.actions,
};
export default AppSlice.reducer;
