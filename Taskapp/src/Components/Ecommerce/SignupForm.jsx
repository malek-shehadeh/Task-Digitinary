// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";
// import { signup } from "../../Reducers/authSlice";
// import { FormField, Button } from "../../ui/index";

// const SignupForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [formErrors, setFormErrors] = useState({});

//   const validateForm = () => {
//     const errors = {};
//     if (formData.password !== formData.confirmPassword) {
//       errors.confirmPassword = "Passwords do not match";
//     }
//     if (formData.password.length < 6) {
//       errors.password = "Password must be at least 6 characters";
//     }
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       const { confirmPassword, ...signupData } = formData;
//       await dispatch(signup(signupData)).unwrap();
//       navigate("/login");
//     } catch (err) {
//       console.error("Signup failed:", err);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <FormField
//           label="Name"
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           placeholder="Enter your name"
//           error={error?.name}
//         />
//         <FormField
//           label="Email"
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           placeholder="Enter your email"
//           error={error?.email}
//         />
//         <FormField
//           label="Password"
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           placeholder="Enter your password"
//           error={formErrors.password || error?.password}
//         />
//         <FormField
//           label="Confirm Password"
//           type="password"
//           name="confirmPassword"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           required
//           placeholder="Confirm your password"
//           error={formErrors.confirmPassword}
//         />
//         <Button
//           type="submit"
//           variant="primary"
//           disabled={loading}
//           className="w-full mt-4"
//         >
//           {loading ? "Creating Account..." : "Sign Up"}
//         </Button>
//       </form>

//       {/* Login link */}
//       <div className="mt-4 text-center">
//         <p className="text-gray-600">
//           Already have an account?{" "}
//           <Link
//             to="/ecommerce-manager/login"
//             className="text-blue-600 hover:text-blue-800 font-medium"
//           >
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;
////////////////////////////
// src/Components/auth/SignupForm.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signup, resetLoading } from "../../Reducers/authSlice";
import { FormField, Button } from "../../ui/index";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // Reset loading state when component mounts or unmounts
  useEffect(() => {
    dispatch(resetLoading());
    return () => {
      dispatch(resetLoading());
    };
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!formData.email.includes("@")) {
      errors.email = "Please enter a valid email";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const { confirmPassword, ...signupData } = formData;
      await dispatch(signup(signupData)).unwrap();
      navigate("/ecommerce-manager/login");
    } catch (err) {
      setFormErrors((prev) => ({
        ...prev,
        submit: err.message || "Signup failed",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {formErrors.submit && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
            {formErrors.submit}
          </div>
        )}

        <FormField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          placeholder="Enter your name"
          error={formErrors.name}
        />
        <FormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          placeholder="Enter your email"
          error={formErrors.email || error?.email}
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          placeholder="Enter your password"
          error={formErrors.password}
        />
        <FormField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          placeholder="Confirm your password"
          error={formErrors.confirmPassword}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full mt-4"
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
