import { configureStore } from "@reduxjs/toolkit";
import crudReducer from "../reducer/crudslice";
import authReducer from "../reducer/authSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    crud: crudReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
