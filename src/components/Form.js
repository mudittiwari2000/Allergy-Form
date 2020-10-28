import React, { useState } from "react";
import firebase from "../firebase";

// StyleSheets
import "./Form.css";

// Components
import AllergyInput from "./AllergyInput";

function Form() {
  const db = firebase.firestore();

  // For name Input field
  const [name, setName] = useState("");
  // For dateofbirth Input field
  const [date, setDate] = useState("");
  // For gender Input field
  const [gender, setGender] = useState("");
  // For allergies Input field, to be passed into AllergyInput component
  const [allergies, setAllergies] = useState("");

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
        console.log("data submitted Successfully");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form-row form-name">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="Your Name"
          autoComplete="off"
        />
      </div>
      <div className="form-row form-dob">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          id="date"
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
