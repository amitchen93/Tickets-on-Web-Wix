import React from 'react';
import '../index.css';

// dumb component without state (stateless)
const Spinner = () => {
    return (
        <>
            <div className="loader" />  {/* this is the actual spinner */}
            <h4 style={{ textAlign: 'center' }}>Loading...</h4>
        </>
    );
}

export default Spinner;
