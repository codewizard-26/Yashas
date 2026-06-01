export const selectUser = (state) => state.auth.user;

export const selectToken = (state) => state.auth.token;

export const selectRole = (state) => state.auth.role;

export const selectIsAuthenticated = (state) =>
  state.auth.isAuthenticated;