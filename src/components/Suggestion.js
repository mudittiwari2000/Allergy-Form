import React from "react";
import checkMatch from "../utils/checkMatch";

// StyleSheets
import "./Suggestion.css";

function Suggestion({
  matches,
  lastInput,
  allergies,
  allergyRef,
  allergyArray,
  setAllergyValue,
  visibility,
  setMatches,
  setAllergies,
  setVisibility,
}) {

  const exceptLast = lastInput.slice(0, lastInput.length - 1);

  const matchDivs = matches.map((match, index) => (
    <div key={index} className="Suggestion__item">
      {match}
    </div>
  ));

  async function forceCheckMatch() {
    await setMatches(checkMatch(allergyRef.current.value, allergyArray));
    await allergyRef.current.focus();
    await setVisibility(true);
  }

  async function forceSetAllergies() {
    await setAllergies(() => (exceptLast));
  }

  const onClick = (e) => {
    let changedValue = "";
    const text = e.target.textContent;
    exceptLast.push(text);
    exceptLast.forEach((allergy) => {
      changedValue += `${allergy}, `;
    });
    setAllergyValue(changedValue);
    setTimeout(forceCheckMatch, 100);
    setTimeout(forceSetAllergies, 150);
  };

  return (
    <div
      className="Suggestion"
      onClick={onClick}
      style={{ display: visibility ? "flex" : "None" }}
    >
      {matchDivs}
    </div>
  );
}

export default Suggestion;
