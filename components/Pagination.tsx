import * as React from 'react';

// dumb component without state (stateless)
const Pagination = (props: any) => {
    const pageNumbers: number[] = [];  // empty list of numbers

    // push numbers to the pageNumbers (first iteration 1...8,9)
    for (let i: number = 1; i < Math.ceil(props.totalTickets / props.ticketsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='pagination'>
            <h4>Current page: {props.currentPage}</h4>  {/* props: we get the currentPage from outside (APP)*/}
            <nav>   {/* nav -> navigation */}
                <ul>
                    {pageNumbers.map(pageNum => (  // run on array (pageNumbers) and for each page-num, we create list item
                        <li
                            key={pageNum}
                            onClick={() => props.paginate(pageNum)}>
                            <a >
                                {pageNum}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
