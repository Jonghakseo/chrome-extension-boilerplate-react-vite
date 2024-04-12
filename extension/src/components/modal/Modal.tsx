import React from "react";
import { useState } from "react";

const Modal = () =>{
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="App">
      <button onClick={togglePopup}>Open Popup</button>
      {isPopupOpen && (
        <div className=''>
          <h2>Popup Window</h2>
          <p>This is the content of the popup window.</p>
          <button onClick={togglePopup}>Close</button>
        </div>
      )}
    </div>
  );
}

