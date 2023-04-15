import React, { useState, useEffect } from 'react';

const D = () => {
    const [Ctime, setCtime] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            let time = new Date().toLocaleTimeString('en-GB', { hour12: false });
            let date = new Date().toLocaleDateString('en-GB');
            setCtime(`${date} ${time}`);
        }, 1000);
        return () => clearInterval(intervalId); // Clear the interval when the component unmounts
    }, []); // Only run the effect once when the component mounts

    return (
        <>
            <p>{Ctime}</p>
        </>
    );
};

export default D;
