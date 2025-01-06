// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";
// import { signup, resetLoading } from "../../Reducers/authSlice";
// import { FormField, Button } from "../../ui/index";

// const SignupForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { error } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(resetLoading());
//   }, [dispatch]);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const validateForm = () => {
//     const errors = {};
//     if (formData.password !== formData.confirmPassword) {
//       errors.confirmPassword = "Passwords do not match";
//     }
//     if (formData.password.length < 6) {
//       errors.password = "Password must be at least 6 characters";
//     }
//     if (!formData.email.includes("@gmail")) {
//       errors.email = "Please enter a valid email '@gmail'";
//     }
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     if (formErrors[name]) {
//       setFormErrors((prev) => ({
//         ...prev,
//         [name]: null,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       setIsSubmitting(true);
//       const { confirmPassword: _, ...signupData } = formData;

//       await dispatch(signup(signupData)).unwrap();
//       navigate("/ecommerce-manager/login");
//     } catch (err) {
//       setFormErrors((prev) => ({
//         ...prev,
//         submit: err.message || "Signup failed",
//       }));
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         {formErrors.submit && (
//           <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
//             {formErrors.submit}
//           </div>
//         )}

//         <FormField
//           label="Name"
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           disabled={isSubmitting}
//           placeholder="Enter your name"
//           error={formErrors.name}
//         />
//         <FormField
//           label="Email"
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           disabled={isSubmitting}
//           placeholder="Enter your email"
//           error={formErrors.email || error?.email}
//         />
//         <FormField
//           label="Password"
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           disabled={isSubmitting}
//           placeholder="Enter your password"
//           error={formErrors.password}
//         />
//         <FormField
//           label="Confirm Password"
//           type="password"
//           name="confirmPassword"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           required
//           disabled={isSubmitting}
//           placeholder="Confirm your password"
//           error={formErrors.confirmPassword}
//         />
//         <Button
//           type="submit"
//           variant="primary"
//           disabled={isSubmitting}
//           className="w-full mt-4"
//         >
//           {isSubmitting ? "Creating Account..." : "Sign Up"}
//         </Button>
//       </form>

//       <div className="mt-4 text-center">
//         <p className="text-gray-600">
//           Already have an account?{" "}
//           <Link
//             to="/login"
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
/////////

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../../Reducers/authSlice";
import { FormField, Button } from "../../ui/index";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let errors = {};

    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (!formData.email.includes("@gmail"))
      errors.email = "Please enter a valid email '@gmail'";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const { confirmPassword: _, ...signupData } = formData;
      await dispatch(signup(signupData)).unwrap();
      navigate("/ecommerce-manager/login");
    } catch (err) {
      setFormErrors({ submit: err.message || "Signup failed" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: null }));
  };

  const formFields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password",
    },
  ];

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

      <form onSubmit={handleSubmit}>
        {formErrors.submit && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
            {formErrors.submit}
          </div>
        )}

        {formFields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            value={formData[field.name]}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            error={
              formErrors[field.name] ||
              (field.name === "email" ? error?.email : null)
            }
          />
        ))}

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
