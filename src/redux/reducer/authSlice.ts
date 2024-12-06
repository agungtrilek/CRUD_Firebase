import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface User {
  email: string;
}
interface AuthState {
  user: User | null;
  role: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  role: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; role: string }>) => {
      state.role = action.payload.role;
      state.user = { email: action.payload.email };
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
