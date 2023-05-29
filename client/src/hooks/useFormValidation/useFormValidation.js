import { useState } from "react";

// Custom hook for form validation
const useFormValidation = (options) => {

  const [data, setData] = useState((options?.initialState || {}));
  const [errors, setErrors] = useState({});

  // Event handler for handling form input change
  const handleChange = (key) => (e) => {
      setData({
        ...data,
        [key]: e.target.value,
      });
    };

  // Event handler for form submission
  async function handleSubmit(e) {
    e.preventDefault();

    const validations = options?.validations
    if (validations) {
      let valid = true;
      const foundErrors = {};

      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];

        // validation for required field
        if (validation?.required?.value && !value) {
          valid = false;
          foundErrors[key] = validation?.required?.message;
        }
        // validation for field requiring a pattern
        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          foundErrors[key] = pattern.message;
        }
        // custom validation for a field
        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          foundErrors[key] = custom.message;
        }
      }

      if (!valid){
        setErrors(foundErrors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }
  }

  // Return the form validation functions and state as an object for external use
  return {
    data,
    errors,
    handleChange,
    handleSubmit,
    setErrors,
  };
}

export default useFormValidation;