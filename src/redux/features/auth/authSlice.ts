import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TAuth = {
  user: null | TUser;
  token: null | object;
};
export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

const initialState: TAuth = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
