import React, { useState } from "react";
import * as Yup from "yup";
import { ClockState } from "../pages/ClockPage";
import "./timeForm.css";
interface TimeFormProps {
  setTime: (time: ClockState) => void;
}
type TimeVerrors = {
  hours: string | undefined;
  minutes: string | undefined;
};
const TimeForm: React.FC<TimeFormProps> = ({ setTime }) => {
  const [formValues, setFormValues] = useState<ClockState>({
    hours: 0,
    minutes: 0,
  });
  const [formErrors, setFormErrors] = useState<TimeVerrors>({
    hours: "",
    minutes: "",
  });

  const validationSchema = Yup.object().shape({
    hours: Yup.number()
      .required("hours is required")
      .positive("hours must be positiv number")
      .integer("hours must be integer")
      .max(23, "hours must be in range (0-23)"),
    minutes: Yup.number()
      .required("minutes is required")
      .positive("minutes must be positive number")
      .integer("minutes must be integer")
      .max(59, "minutes must be in range (0-59)"),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: parseInt(event.target.value),
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormErrors({ hours: undefined, minutes: undefined });
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      console.log("Form submitted successfully!", formValues);
      const { hours, minutes } = formValues;
      setTime({ hours, minutes });
    } catch (err) {
      const errors: TimeVerrors = { hours: undefined, minutes: undefined };
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          if (error.path) {
            errors[error.path as keyof TimeVerrors] = error.message;
          }
        });
        setFormErrors(errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="submitForm">
      <div className="input-container">
        <label>Hours:</label>
        <input
          type="number"
          name={Object.keys(formValues)[0]}
          value={formValues.hours}
          onChange={handleChange}
        />
      </div>
      {formErrors.hours && <p className="input-error">{formErrors.hours}</p>}

      <div className="input-container">
        <label>Minutes:</label>
        <input
          type="number"
          name={Object.keys(formValues)[1]}
          value={formValues.minutes}
          onChange={handleChange}
        />
      </div>
      {formErrors.minutes && (
        <p className="input-error">{formErrors.minutes}</p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default TimeForm;
