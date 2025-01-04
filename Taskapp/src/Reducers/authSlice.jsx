// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { authService } from "../../src/services/api/authService";

// export const signup = createAsyncThunk(
//   "auth/signup",
//   async (userData, { rejectWithValue }) => {
//     try {
//       return await authService.signup(userData);
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const login = createAsyncThunk(
//   "auth/login",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       return await authService.login(credentials);
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const initialState = {
//   user: JSON.parse(localStorage.getItem("currentUser")),
//   token: localStorage.getItem("token"),
//   loading: false,
//   error: null,
//   isAuthenticated: !!localStorage.getItem("token"),
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       authService.logout();
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Signup
//       .addCase(signup.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signup.fulfilled, (state, action) => {
//         state.loading = false;
//       })
//       .addCase(signup.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Login
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.access_token;
//         state.isAuthenticated = true;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout, clearError } = authSlice.actions;
// export default authSlice.reducer;
///////////////////

// src/Reducers/authSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services/api/authService";

const initialState = {
  users: [],
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { getState, rejectWithValue }) => {
    try {
      const currentState = getState();
      const existingUsers = currentState.auth?.users || [];

      const userExists = existingUsers.some(
        (user) => user.email === userData.email
      );
      if (userExists) {
        throw new Error("User with this email already exists");
      }

      const newUser = {
        ...userData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };

      return newUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { getState, rejectWithValue }) => {
    try {
      const { users } = getState().auth;
      const user = users.find(
        (u) =>
          u.email === credentials.email && u.password === credentials.password
      );

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const token = Math.random().toString(36).substring(2);
      return { user, access_token: token };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.users) {
          state.users = [];
        }
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { logout, clearError, resetLoading } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
