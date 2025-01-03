import React, { useState } from "react";
import { FormField, Select, Button, Checkbox } from "../../ui/index";

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    country: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = {
    fullName: (value) => {
      if (value && value.length < 3)
        return "Full name must be at least 3 characters";
      return "";
    },
    email: (value) => {
      if (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value))
          return "Please enter a valid email address";
      }
      return "";
    },
    password: (value) => {
      if (value) {
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/\d/.test(value))
          return "Password must include at least one number";
        if (!/[!@#$%^&*]/.test(value))
          return "Password must include at least one special character";
      }
      return "";
    },
    phone: (value) => {
      if (value) {
        if (!/^\d+$/.test(value)) return "Please enter numbers only";
        if (value.length !== 10)
          return "Please enter a valid 10-digit phone number";
      }
      return "";
    },
    age: (value) => {
      if (value) {
        const age = parseInt(value);
        if (isNaN(age) || age < 18 || age > 65)
          return "Age must be between 18 and 65";
      }
      return "";
    },
    country: (value) => {
      if (value && !value.trim()) return "Please select a country";
      return "";
    },
    agreeToTerms: (value) => {
      if (!value) return "You must agree to the terms";
      return "";
    },
  };

  const handleChange = (name, value) => {
    if (name === "phone") {
      value = value.replace(/\D/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validate[name]?.(value) || "";
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const isFormValid = () => {
    return Object.keys(validate).every(
      (field) => !validate[field](formData[field])
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
    }
  };

  const countries = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "jo", label: "Jordan" },
    { value: "sy", label: "Syria" },
    { value: "kw", label: "Kuwait" },
  ];

  if (isSubmitted) {
    return (
      <div className="text-center p-6 bg-green-50 rounded-lg">
        <h2 className="text-2xl font-bold text-green-600 mb-2">Success!</h2>
        <p className="text-green-600">Form submitted successfully.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 mt-6 pt-6">
      <FormField
        label="Full Name"
        value={formData.fullName}
        onChange={(e) => handleChange("fullName", e.target.value)}
        error={errors.fullName}
        helperText="Enter at least 3 characters"
      />

      <FormField
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={errors.email}
        helperText="example@email.com"
      />

      <FormField
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
        error={errors.password}
        helperText="Minimum 8 characters, 1 number, 1 special character"
      />

      <FormField
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        error={errors.phone}
        helperText="Enter 10 digits only"
      />

      <FormField
        label="Age"
        type="number"
        value={formData.age}
        onChange={(e) => handleChange("age", e.target.value)}
        error={errors.age}
        min="18"
        max="65"
        helperText="Must be between 18 and 65"
      />

      <Select
        label="Country"
        options={countries}
        value={formData.country}
        onChange={(e) => handleChange("country", e.target.value)}
        error={errors.country}
      />

      <Checkbox
        label="I agree to the terms and conditions"
        checked={formData.agreeToTerms}
        onChange={(e) => handleChange("agreeToTerms", e.target.checked)}
        error={errors.agreeToTerms}
      />

      <Button type="submit" disabled={!isFormValid()} className="w-full">
        Submit
      </Button>
    </form>
  );
};

export default Form;
