import React from "react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../../Reducers/authSlice";
import { FormField, Button } from "../../ui/index";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = {
    name: (value) => {
      if (!value) return "Name is required";
      if (value.length < 3) return "Name must be at least 3 characters";
      if (!/^[a-zA-Z\s]*$/.test(value)) return "Name can only contain letters";
      return "";
    },
    email: (value) => {
      if (!value) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Please enter a valid email address";
      if (!value.includes("@")) return "Please use a Gmail address";

      if (!value.endsWith(".com") && !value.endsWith(".net")) {
        return "Email must end with .com or .net";
      }

      return "";
    },

    password: (value) => {
      if (!value) return "Password is required";
      if (value.length < 8) return "Password must be at least 8 characters";
      if (!/\d/.test(value)) return "Password must include at least one number";
      if (!/[!@#$%^&*]/.test(value))
        return "Password must include at least one special character";
      if (!/[A-Z]/.test(value))
        return "Password must include at least one uppercase letter";
      return "";
    },
    confirmPassword: (value) => {
      if (!value) return "Please confirm your password";
      if (value !== formData.password) return "Passwords do not match";
      return "";
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validate[name]?.(value) || "";
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const isFormValid = () => {
    return Object.keys(validate).every(
      (field) => !validate[field](formData[field])
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    Object.keys(validate).forEach((key) => {
      const error = validate[key](formData[key]);
      if (error) errors[key] = error;
    });

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      setIsSubmitting(true);
      const { confirmPassword: _, ...signupData } = formData;
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

  const formFields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter your name",
      helperText: "Minimum 3 characters, letters only",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      helperText: "Must be a valid Gmail address",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      helperText: "Min 8 chars, 1 number, 1 special char, 1 uppercase",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password",
      helperText: "Must match the password above",
    },
  ];

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            error={formErrors[field.name]}
            helperText={field.helperText}
          />
        ))}

        <Button
          type="submit"
          variant="primary"
          disabled={!isFormValid() || isSubmitting}
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
