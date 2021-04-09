import React from 'react';
import TextSize from './components/TextSize';
import Pagination from './components/Pagination';
import Sort from './components/Sort';
import Spinner from './components/Spinner';
import './App.scss';
import { createApiClient, Ticket } from './api';

// interface
export type AppState = {
	tickets?: Ticket[],
	search: string,
	// add more atributes to AppState interface
	fontSize: string,
	scroll: string,   // option to be scrolled down and up
	currentPage: number,
	ticketsPerPage: number
}

const api = createApiClient();  
// returns api = object that call to the server (getTickets) that returns array of tickets

class App extends React.PureComponent<{}, AppState> {  //React.PureComponent is "updated" React.Component
	// initialized
	state: AppState = {
		search: '',    // search box in web
		fontSize: 'normal',  // the fontSize start with normal size 
		
		// add more atributes to AppState implementation
		scroll: 'hidden',  // can't scroll by default
		currentPage: 1,  // for pagination - we start at 1
		ticketsPerPage: 20
	}

	searchDebounce: any = null;
	  // returns a function that can be called any number of times
	  // (possibly in quick successions) but will only invoke the callback after waiting for x ms from the last call

	  // func that set the state that intilized ticket and wait for respone from getTickets()
	  // (when we component go to the screen (lyfe-cycle) call to server)
	async componentDidMount() { // part of first lyfe cycle
		this.setState({
			tickets: await api.getTickets()
		});
	}

	sortTickets = async (e: any) => { 
		// call to server with the parameter e.target.id
		this.setState({
			tickets: await api.getSortedTickets(e.target.id)  // the server know how to sort with id (date,title.email)
		});
	}

	// change the fontsize from 'normal' to the request by e.target.id 
	fontSizeHandler = (e: any) => {
		this.setState({
			fontSize: e.target.id   // change the fontSize by event (fontSize=is field of AppState interface)
		});
	}

	// change the currentPage to some page ("4") and jump!
	paginateHandler = (pageNumber: any) => this.setState({
		currentPage: pageNumber
	});


	// return list of each individual ticket
	renderTickets = (tickets: Ticket[]) => {

		const filteredTickets = tickets
			.filter((t) => (t.title.toLowerCase() + t.content.toLowerCase()).includes(this.state.search.toLowerCase()));

		// calc for pagination
		const indexOfLastTicket: number = this.state.currentPage * this.state.ticketsPerPage;
		const indexOfFirstTicket: number = indexOfLastTicket - this.state.ticketsPerPage;
		const currentTickets: Ticket[] = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

		// ul - unordered list 
		// li - element in list
		return (
			<>
				<ul className='tickets'>
					{currentTickets.map((ticket, i) => (
						<li key={ticket.id}
							className='ticket'
							style={{  // style the ticket (can be scorll for example, or declare 'normal fontSize')
								 fontSize: `${this.state.fontSize}`,   // fontSize: 'normal'
								 overflow: `${this.state.scroll}` }}>  {/* // scroll: 'hidden'    */}

							<button className='buttons' onClick={() => {
								if (this.state.scroll === 'hidden') {
									this.setState({
										scroll: 'auto'   // the ability to be scrolled
									});
								} else if (this.state.scroll === 'auto') {
									this.setState({
										scroll: 'hidden'
									});
								}
							}}> Read More</button>

						

							<button className='buttons' onClick={() => {
								const newTitle = prompt("Please enter a new title");
								if (newTitle) {
									// run on the tickets array that I do a render on and set new title on the title "i":
									currentTickets[i].title = newTitle; 
									// ticket.title = newTitle;    (also work)
									this.setState({    // make the act in the DOM (web)
										tickets: [...tickets]
										// "split" the original array and start it again
										// arr = [0,1,2]
										// const x = [1,2,3, ...arr]  will get:
										// [1,2,3,0,1,2]
									});
								}
							}}>Rename Title</button>
							<h5 className='title' >{ticket.title}</h5>
							<p>{ticket.content}</p>
							<footer>
								<div className='meta-data'>By {ticket.userEmail} | {new Date(ticket.creationTime).toLocaleString()}</div>
							</footer>
						</li>))}
				</ul>
				<Pagination
					totalTickets={filteredTickets.length}
					ticketsPerPage={this.state.ticketsPerPage}
					currentPage={this.state.currentPage}
					paginate={this.paginateHandler} />
			</>
		);
	}

	onSearch = async (val: string, newPage?: number) => {

		clearTimeout(this.searchDebounce);

		this.searchDebounce = setTimeout(async () => {
			this.setState({
				search: val
			});
		}, 300);
	}

	render() {  // the method in the class that "projects" all into the DOM
		const { tickets } = this.state;
		const { ticketsPerPage } = this.state;

		return (
			<main>
				<TextSize fontSizeHandler={this.fontSizeHandler} />   {/* call fontSizeHandler that changed by click */ }
				<h1>Tickets List</h1>
				<header>
					<input type="search" placeholder="Search..." onChange={(e) => this.onSearch(e.target.value)} />
				</header>
				{tickets && <Sort sortTickets={this.sortTickets} />}    {/* the sorting process is in server.index.ts */} 
				{tickets && <div className='results'>Showing {ticketsPerPage} results</div>}
				{tickets ? this.renderTickets(tickets) : <Spinner />}

				{/* {tickets ? <Spinner/> : null } */}
				  {/* example to self touch with Spinner */}

			</main >
		);
	}
}

export default App;