import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../Reducers/authSlice";
import { FormField } from "../../ui/FormField";
import { Button } from "../../ui/index";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: " ",
    password: " ",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const validate = {
    email: (value) => {
      if (!value) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Please enter a valid email address";
      if (!value.includes("@")) return "Please use a Email address";
      if (!value.endsWith(".com") && !value.endsWith(".net")) {
        return "Email must end with .com or .net";
      }
      return "";
    },
    password: (value) => {
      const minLength = value.length >= 8;
      const hasNumber = /\d/.test(value);
      const hasSpecial = /[!@#$%^&*]/.test(value);
      const hasUpperCase = /[A-Z]/.test(value);

      if (!value) return "Password is required";

      const errors = [];
      if (!minLength) errors.push("Password must be at least 8 characters");
      if (!hasNumber) errors.push("Must include at least one number");
      if (!hasSpecial)
        errors.push("Must include at least one special character");
      if (!hasUpperCase)
        errors.push("Must include at least one uppercase letter");

      return errors.length > 0 ? errors[0] : "";
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (!touched[name]) {
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));
    }

    const validationError = validate[name](value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: validationError || "",
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const isFormValid = () => {
    return Object.keys(validate).every(
      (field) => !validate[field](formData[field])
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      email: true,
      password: true,
    });

    const validationErrors = {};
    Object.keys(validate).forEach((key) => {
      const error = validate[key](formData[key]);
      if (error) validationErrors[key] = error;
    });

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      await dispatch(login(formData)).unwrap();
      navigate("/ecommerce-manager");
    } catch (err) {
      if (err.email || err.password) {
        setFormErrors(err);
      } else {
        setFormErrors({
          submit: "An error occurred. Please try again.",
        });
      }
    }
  };

  const formFields = [
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email",
      helperText: "Must be a valid Email address",
      error: touched.email ? formErrors.email : "",
      value: formData.email,
      onChange: handleChange,
      onBlur: handleBlur,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      helperText: "Min 8 chars, 1 number, 1 special char, 1 uppercase",
      error: touched.password ? formErrors.password : "",
      value: formData.password,
      onChange: handleChange,
      onBlur: handleBlur,
    },
  ];

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      {formErrors.submit && (
        <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
          {formErrors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields.map((field) => (
          <FormField key={field.name} {...field} required />
        ))}

        <Button
          type="submit"
          variant="teal"
          disabled={!isFormValid() || loading}
          className="w-full mt-4"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/ecommerce-manager/signup"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
