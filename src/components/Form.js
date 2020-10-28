import React, { useState, useMemo, useEffect } from "react";
import firebase from "../firebase";

// StyleSheets
import "./Form.css";

// Components
import AllergyInput from "./AllergyInput";

function Form({ CompletionMessage, setCompletionMessage }) {
  const db = firebase.firestore();

  // For name Input field
  const [name, setName] = useState("");
  // For dateofbirth Input field
  const [date, setDate] = useState("");
  // For gender Input field
  const [gender, setGender] = useState("Prefer not to say");
  // For allergies Input field, to be passed into AllergyInput component
  const [allergies, setAllergies] = useState(useMemo(() => [], []));

  useEffect(() => {
  }, [allergies]);

  function onSubmit(e) {
    e.preventDefault();
    db.collection("userData")
      .add({
        name,
        dateofbirth: date,
        gender,
        allergies: allergies,
      })
      .then(() => {
        setCompletionMessage(() => true);
        console.log("Data Submitted Successfully");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form-row form-name">
        <label htmlFor="name">
          Name<span className="asterisk">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="Your Name"
          autoComplete="off"
          required={true}
        />
      </div>
      <div className="form-row form-dob">
        <label htmlFor="date">
          Date<span className="asterisk">*</span>
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          id="date"
          required={true}
        />
      </div>
      <div className="form-row form-gender">
        <label htmlFor="gender-select">Gender</label>
        <div className="select-custom">
          <select
            name="gender"
            id="gender-select"
            value={gender}
            onChange={(e) => setGender(e.currentTarget.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
          <span className="custom-arrow"></span>
        </div>
      </div>
      <AllergyInput allergies={allergies} setAllergies={setAllergies} />

      <input type="submit" value="Submit" className="submit-button" />
    </form>
  );
}

export default Form;
