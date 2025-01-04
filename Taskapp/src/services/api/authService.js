// // src/services/api/authService.js
// export const authService = {
//   // Save user data to local storage
//   signup: (userData) => {
//     const users = JSON.parse(localStorage.getItem("users") || "[]");
//     const existingUser = users.find((user) => user.email === userData.email);

//     if (existingUser) {
//       throw new Error("User already exists");
//     }

//     users.push(userData);
//     localStorage.setItem("users", JSON.stringify(users));
//     return userData;
//   },

//   // Verify login credentials
//   login: (credentials) => {
//     const users = JSON.parse(localStorage.getItem("users") || "[]");
//     const user = users.find(
//       (u) =>
//         u.email === credentials.email && u.password === credentials.password
//     );

//     if (!user) {
//       throw new Error("Invalid credentials");
//     }

//     // Create and store authentication token
//     const token = Math.random().toString(36).substring(2);
//     localStorage.setItem("token", token);
//     localStorage.setItem("currentUser", JSON.stringify(user));

//     return {
//       user,
//       access_token: token,
//     };
//   },

//   logout: () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("currentUser");
//   },

//   getCurrentUser: () => {
//     return JSON.parse(localStorage.getItem("currentUser"));
//   },
// };
/////////////////
// src/services/api/authService.js

export const authService = {
  signup: (userData, existingUsers = []) => {
    // Check if user already exists
    const existingUser = existingUsers.find(
      (user) => user.email === userData.email
    );

    if (existingUser) {
      throw new Error("User already exists");
    }

    return userData;
  },

  login: (credentials, existingUsers = []) => {
    // Find user in the existing users array
    const user = existingUsers.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Generate token
    const token = Math.random().toString(36).substring(2);

    return {
      user,
      access_token: token,
    };
  },
};
