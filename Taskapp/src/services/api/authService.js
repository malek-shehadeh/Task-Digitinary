export const authService = {
  signup: (userData, existingUsers = []) => {
    const existingUser = existingUsers.find(
      (user) => user.email === userData.email
    );
    if (existingUser) {
      throw new Error("User already exists");
    }
    return userData;
  },

  login: (credentials, existingUsers = []) => {
    const user = existingUsers.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );
    if (!user) {
      throw new Error("Invalid credentials");
    }
    return { user };
  },
};
