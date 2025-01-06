import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  users: [],
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Helper function to generate token
const generateToken = () => Math.random().toString(36).substring(2);

// Signup thunk
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { getState, rejectWithValue }) => {
    try {
      // Get current users from state
      const currentState = getState();
      const existingUsers = currentState.auth?.users || [];

      // Check if email already exists
      const userExists = existingUsers.some(
        (user) => user.email === userData.email
      );

      if (userExists) {
        return rejectWithValue({
          email: "User with this email already exists",
        });
      }

      // Create new user
      const newUser = {
        ...userData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };

      return newUser;
    } catch (error) {
      return rejectWithValue({
        submit: error.message || "Signup failed",
      });
    }
  }
);

// Login thunk
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { getState, rejectWithValue }) => {
    try {
      const { users } = getState().auth;

      // Check if email exists
      const userWithEmail = users.find((u) => u.email === credentials.email);

      if (!userWithEmail) {
        return rejectWithValue({
          email: "No account found with this email",
        });
      }

      // Verify password
      if (userWithEmail.password !== credentials.password) {
        return rejectWithValue({
          password: "Incorrect password",
        });
      }

      // Generate token and return user data
      const token = generateToken();
      return {
        user: userWithEmail,
        access_token: token,
      };
    } catch (error) {
      return rejectWithValue({
        submit: error.message || "Login failed",
      });
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearAuthState: (state) => {
      return initialState;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup cases
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        if (!Array.isArray(state.users)) {
          state.users = [];
        }
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login cases
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
        state.isAuthenticated = false;
      });
  },
});

// Export actions
export const { logout, clearError, clearAuthState, updateUser } =
  authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

// Export reducer
export default authSlice.reducer;
