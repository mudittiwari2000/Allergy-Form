import React, { useState } from "react";

import "./App.css";
import Form from "./components/Form";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaugh } from "@fortawesome/free-solid-svg-icons";

function App() {
  // For the Form Completion message div to render
  const [completionMessage, setCompletionMessage] = useState(false);

  const stylesHidden = {
    opacity: 0,
    height: 0,
    width: 0,
    transition: "all 250ms ease-out",
  };

  const stylesVisible = {
    opacity: 1,
    height: "100%",
    width: "100%",
    transition: "all 250ms ease-out",
  };

  return (
    <div className="App">
      <div id="bg"></div>
      <h1 className="title">Allergy Form</h1>
      <Form
        completionMessage={completionMessage}
        setCompletionMessage={setCompletionMessage}
      />
      <div
        className="success-message"
        style={completionMessage ? stylesVisible : stylesHidden}
      >
        <h5 className="success-message__success">
          <FontAwesomeIcon icon={faLaugh} />
          Your form has been filled succesfully!
        </h5>
        <h3 className="success-message__thanks">
          Thank you for your precious time :)
        </h3>
      </div>
    </div>
  );
}

export default App;
