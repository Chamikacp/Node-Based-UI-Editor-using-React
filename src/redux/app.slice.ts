import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vertex } from "../constants/types/types";

export interface AppState {
  isEditModeOn: boolean;
  isDeleteModeOn: boolean;
  graph: Vertex[];
}

const initialState: AppState = {
  isEditModeOn: false,
  isDeleteModeOn: false,
  graph: [],
};

const AppSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setIsEditModeOn: (state, action: PayloadAction<boolean>) => {
      state.isEditModeOn = action.payload;
    },
    setIsDeleteModeOn: (state, action: PayloadAction<boolean>) => {
      state.isDeleteModeOn = action.payload;
    },
    setGraph: (state, action: PayloadAction<Vertex[]>) => {
      state.graph = action.payload;
    },
  },
});

export const AppActions = {
  ...AppSlice.actions,
};
export default AppSlice.reducer;
