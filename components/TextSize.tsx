import React, { useState } from 'react';

const TextSize = (props: any) => { // any -> // any type of arguments can get in the component

    // the initialzed object (with state) -> return array with value and set
    const [isDisabled, setIsDisabled] = useState({
        small: false,
        medium: true,
        large: false
    });

    return (
        <>  {/* I want to return 3 element in one component without any "div" tag, so I puy empth tag */}
            <button
                className='buttons'
                disabled={isDisabled.small}
                id='small'
                onClick={(e) => {  // e is some event (the click)
                    props.fontSizeHandler(e);  // change the state in App (string that represent the font size) with event
                    setIsDisabled({  // set the inner-state of text size in this specificlly btn
                        small: true,
                        medium: false,
                        large: false
                    });
                }}>Small</button>

            <button
                className='buttons'
                disabled={isDisabled.medium}
                id='medium'
                onClick={(e) => {
                    props.fontSizeHandler(e);
                    setIsDisabled({
                        small: false,
                        medium: true,
                        large: false
                    });
                }}>Normal</button>

            <button
                className='buttons'
                disabled={isDisabled.large}
                id='large'
                onClick={(e) => {
                    props.fontSizeHandler(e);
                    setIsDisabled({
                        small: false,
                        medium: false,
                        large: true
                    });
                }}>Large</button>
        </>
    );
};

export default TextSize;
