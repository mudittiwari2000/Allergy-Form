import React, { useEffect, useMemo, useState, useRef } from "react";
import firebase from "../firebase";
import checkMatch from "../utils/checkMatch";

// Components
import Suggestion from "./Suggestion";

function AllergyInput({ allergies, setAllergies }) {
  const allergyArray = useMemo(() => [], []);
  const [allergyValue, setAllergyValue] = useState("");
  const [matches, setMatches] = useState(
    useMemo(() => [...allergyArray], [allergyArray])
  );
  const [allergyArrayFormatted, setAllergyArrayFormatted] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const allergyRef = useRef("");

  useEffect(() => {

    // Making the connection to firebase firestore to read data from the allergies collection
    const unsubscribe = firebase
      .firestore()
      .collection("allergies")
      .orderBy("frequency", "desc")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => allergyArray.push(doc.data()));
      });

    // closing the connection when the AllergyInput component gets unmounted
    return () => unsubscribe();
  }, [allergyArray]);

  const onChange = () => {
    const allergyInput = allergyRef.current.value;
    setAllergyArrayFormatted(
      allergyInput.split(",").map((allergy) => allergy.trim())
    );
    setMatches(checkMatch(allergyInput, allergyArray));
    setAllergyValue(allergyInput);
    setAllergies(allergyInput);
  };

  return (
    <div className="form-row form-allergies">
      <label htmlFor="allergies">Allergies<span className="asterisk">*</span></label>
      <input
        ref={allergyRef}
        type="text"
        id="allergies"
        onChange={onChange}
        onFocus={() => setVisibility(true)}
        value={allergyValue}
        name="allergies"
        placeholder="Your Allergies"
        autoComplete="off"
        required="true"
      />
      <Suggestion
        matches={matches}
        lastInput={allergyArrayFormatted}
        setAllergyValue={setAllergyValue}
        setMatches={setMatches}
        allergyRef={allergyRef}
        allergyArray={allergyArray}
        visibility={visibility}
        setVisibility={setVisibility}
      />
    </div>
  );
}

export default AllergyInput;
