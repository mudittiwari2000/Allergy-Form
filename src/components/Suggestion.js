import React from "react";

// StyleSheets
import "./Suggestion.css";

function Suggestion({ match, lastInput, setAllergyValue }) {
  const onClick = (e) => {
    let changedValue = '';
    const exceptLast = lastInput.slice(0, lastInput.length - 1);
    const text = e.target.textContent;
    exceptLast.push(text);
    exceptLast.forEach((allergy) => {
      changedValue += `${allergy}, `;
    });
    setAllergyValue(changedValue);
    console.log(exceptLast, changedValue);
  };

  return (
    <div className="Suggestion" onClick={onClick}>
      <span>{match}</span>
    </div>
  );
}

export default Suggestion;
