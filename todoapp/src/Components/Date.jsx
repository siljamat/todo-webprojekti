import React from 'react'; // Importing React library to use React components
import { useState } from 'react'; // Importing the useState hook from the React library

const D = () => {

    const[Ctime , setCtime] = useState() // Declaring and initializing a state variable "Ctime" and its setter function "setCtime"

    let date = new Date().toLocaleDateString() // Initializing a "date" variable with the current date in string format

    const tTime = () => { // Defining a function "tTime"

        let time = new Date().toLocaleTimeString(); // Initializing a "time" variable with the current time in string format
        setCtime(time); // Updating the state variable "Ctime" with the value of "time"

    }

    setInterval(tTime , 1000); // Setting up a timer to call the "tTime" function every 1 second

    return (
        <>
            <p>{date}  {Ctime}</p> // Displaying the current date and time stored in the state variable "Ctime"
        </>
    );
};

export default D; // Exporting the component "D" as the default export of this module
