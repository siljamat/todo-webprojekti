import React, { useState, useEffect } from 'react';

/**
 * Component that displays the current date and time in the format "dd.mm.yyyy hh:mm:ss".
 * @component
 */
const D = () => {
    /**
     * State variable that holds the current date and time as a string in the format "dd.mm.yyyy hh:mm:ss".
     * @type {string}
     */
    const [Ctime, setCtime] = useState('');

    /**
     * Effect hook that sets up an interval to update the current time every second.
     * @type {function}
     */
    useEffect(() => {
        const intervalId = setInterval(() => {
            let time = new Date().toLocaleTimeString('en-GB', { hour12: false });
            let date = new Date().toLocaleDateString('en-GB');
            setCtime(`${date} ${time}`);
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <p>{Ctime}</p>
        </>
    );
};

export default D;
