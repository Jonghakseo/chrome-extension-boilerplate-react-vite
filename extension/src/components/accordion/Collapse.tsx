import React, { useState } from 'react';

const Collapse: React.FC = () => {
    const dummyData = [
        {
            name: "FaceBook",
            value: "*********"
        },
        {
            name: "Instagram",
            value: "**********"
        },
        {
            name: "Github",
            value: "************"
        },
        {
            name: "MetaMask",
            value: "*********"
        }
    ]
    
    const [secrets, setSecrets] = useState(dummyData)
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
      };

    return (
        <>
            {secrets.map((secret, index) => (
                <div className="collapse collapse-arrow bg-base-200 my-0.5	" key={index}>
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        {secret.name}
                    </div>
                    
                    <div className="collapse-content">
                    <div className='bg-yellow-800 w-full flex justify-center gap-20'>
                        
                        <div className="border border-white py-2 px-5">
                         {secret.value}
                        </div>
                        
                        <div>
                        <button onClick = {togglePopup} className="btn btn-primary">Edit</button >

                        
                        <button onClick = {togglePopup} className="btn btn-primary">Delete</button>
                    
                        </div>
                        

                    </div>
                    {isPopupOpen && (
                        <div className=''>
                        <h2>Popup Window</h2>
                        <p>This is the content of the popup window.</p>
                        <button onClick={togglePopup}>Close</button>
                        </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    )
};

export default Collapse;
