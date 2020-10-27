import React, { useEffect, useMemo, useState } from "react";
import firebase from "../firebase";

// StyleSheet
import "./AllergyInput.css";

// Components
import Suggestion from "./Suggestion";

function AllergyInput({ allergies, setAllergies }) {
  const allergyArray = useMemo(() => [], []);
  const [allergyValue, setAllergyValue] = useState("");
  const [matches, setMatches] = useState(
    useMemo(() => [...allergyArray], [allergyArray])
  );
  const [allergyArrayFormatted, setAllergyArrayFormatted] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("allergies")
      .orderBy("frequency", "desc")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => allergyArray.push(doc.data()));
      });

    return () => unsubscribe();
  }, [allergyArray]);

  const suggestion = (input, currentValues) => {
    const inputLength = input.length;
    const allergyNames = allergyArray.map((allergy) => allergy.name);

    // Checks if the input already contains the match, and if the input matches any allergy names stored in the firestore
    const matches = allergyNames.filter(
      (allergy) =>
        allergy.slice(0, inputLength).trim().toLowerCase() === input &&
        !currentValues.includes(allergy.trim().toLowerCase())
    );
    return matches;
  };

  const onChange = (e) => {
    const allergyInput = e.target.value;
    setAllergyArrayFormatted(allergyInput.split(",").map((allergy) => allergy.trim()));
    const allergyArrayTrimmed = allergyInput
      .split(",")
      .map((allergy) => allergy.trim().toLowerCase());
    const latestInput = allergyArrayTrimmed[allergyArrayTrimmed.length - 1];
    setMatches(suggestion(latestInput, allergyArrayTrimmed));
    setAllergyValue(allergyInput);
    setAllergies(allergyInput);
  };

  return (
    <div className="form-row">
      <label htmlFor="allergies">Allergies</label>
      <input
        type="text"
        id="allergies"
        onChange={onChange}
        value={allergyValue}
        name="allergies"
        placeholder="Your Allergies"
        autoComplete="off"
      />
      {matches.map((match, index) => (
        <Suggestion
          key={index}
          match={match}
          lastInput={allergyArrayFormatted}
          setAllergyValue={setAllergyValue}
          setMatches={setMatches}
        />
      ))}
    </div>
  );
}

export default AllergyInput;
