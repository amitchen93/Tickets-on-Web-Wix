import axios from 'axios';  // pck for calling to server to get info
import { APIRootPath } from '@fed-exam/config';

// interface
export type Ticket = {
    id: string,
    title: any;
    content: string;
    creationTime: number;
    userEmail: string;
    labels?: string[];
}

// interface - // some contract of function that holds type ApiClient - JUST DECLERATION!
// I added new func decleration - getSortedTickets :
export type ApiClient = {  
    getTickets: () => Promise<Ticket[]>,    // Promise - a-sync: "split" the running of program (call to server and do something else meanwhile)
    getSortedTickets: (sortMethod: any) => Promise<Ticket[]>
}

// arrow function that return object from type ApiClient
export const createApiClient = (): ApiClient => {
    return {   // return an object
        getTickets: () => {
            return axios.get(APIRootPath).then((res) => res.data);
            // axios.get(APIRootPath) will run  
            // .then - example of Promise (do something when we get it)
            // res - response of the server 
            // return array of tickets

        },
        
        // I added new func - ask another url from the server:
        getSortedTickets: (sortMethod: any) => {
            return axios.get(`${APIRootPath}/${sortMethod}`).then((res) => res.data);
            // "then" - when we get the result from the server (when Promise will return)
            
        }
    }
}
