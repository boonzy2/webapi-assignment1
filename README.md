# Event Ticket Booking System

### This respository contains a simulated event booking system that allows users to book tickets for various events, view booked tickets, cancel bookings, apply discounts or promo codes, and search for events based on specific criteria. This is a simple ticket booking system implemented in JavaScript. It allows users to book tickets for various events, cancel bookings, view booked tickets, create new events, and search for existing events based on criteria.

## Set up of Node Module and Installation

- Clone respository to your computer and open with vscode
- Open the terminal in Visual Studio Code and navigate to the directory where the repository is located

## How to Use

### Remember to import the module
Before inputting the codes required, remember to import the module

```
// Importing the module
const ticketmaster = require("./Brandon_WAD.js");
```

### Setting User Balance
Before booking tickets, you need to set the user's balance using the `setBalance(amount)` function.

```javascript
e.g.  ticketmaster.setBalance(1000);
```


## Features

- *Book Tickets*: Allows users to book tickets for events based on availability.

- *View Booked Tickets*: Enables users to view previously booked tickets.

- *Cancel Booking*: Provides functionality to cancel a booked ticket.

- *Create Event*: Create a new event for tickets to be booked

- *Search Event*: Enables users to search for events based on specific criteria.

## Usage
### These are the lines you need to call the functions and use the ticket booking system

```
// Set user balance
ticketmaster.setBalance(1000);

// Book tickets
// Note: For book tickets you can choose the event id, number of pax, ticket type, and apply promo code for discounts
let bookingDetails = ticketmaster.bookTickets("E1", 2, "VIP", "SAVE10");

// Cancel a booking
ticketmaster.cancelBooking("B1234");

// View booked tickets
ticketmaster.viewBookedTickets();

// Create a new event
// Note: All of the particulars need to be filled or event will not be created
let newEventData = {
    name: "Music Festival", 
    description: "A thrilling music concert featuring top artists.",
    ticketTypes: {
        "General": { price: 50, ticketsAvailable: 100 },
        "VIP": { price: 100, ticketsAvailable: 50 }
    }
};

ticketmaster.createEvent(newEventData);

// Search for events
ticketmaster.searchEvent("Concert");

```


### Running of Node module
Remember to open the terminal in open integrated terminal view

```
nodemon app.js //can replace the file name with how you wish to name your file
```






