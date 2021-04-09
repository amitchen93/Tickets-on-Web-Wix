import React, { useState } from 'react'

const Sort = (props: any) => {
    const [isDisabled, setIsDisabled] = useState({
        date: false,
        title: false,
        email: false
    });

    return (
        <div>
            <h3>Sort by</h3>
            <button  // for date
                className='buttons'
                disabled={isDisabled.date}
                id='date'
                onClick={(e) => {
                    props.sortTickets(e);
                    setIsDisabled({
                        date: true,
                        title: false,
                        email: false
                    });
                }}>Date</button>
            <button  // for title
                className='buttons'
                disabled={isDisabled.title}
                id='title'
                onClick={(e) => {
                    props.sortTickets(e);
                    setIsDisabled({
                        date: false,
                        title: true,
                        email: false
                    });
                }}>Title</button>
            <button  // // for email
                className='buttons'
                disabled={isDisabled.email}
                id='email'
                onClick={(e) => {
                    props.sortTickets(e);
                    setIsDisabled({
                        date: false,
                        title: false,
                        email: true
                    });
                }}>Email</button>
        </div>
    )
}

export default Sort;
