# Event Ticket Booking System

### This respository contains a simulated event booking system that allows users to book tickets for various events, view booked tickets, cancel bookings, apply discounts or promo codes, and search for events based on specific criteria.

## Features

1.*Book Tickets*: Allows users to book tickets for events based on availability.

2.*View Booked Tickets*: Enables users to view previously booked tickets.

3.*Cancel Booking*: Provides functionality to cancel a booked ticket.

4.*Apply Discounts/Promo Code*: Allows users to apply discounts or promo codes to ticket purchases.

5.*Search Event*: Enables users to search for events based on specific criteria.

## Usage
### These are the lines you need to call the functions and use the ticket booking system

```
1. Book Tickets: To book tickets for an event, use the 'bookTickets' function by providing the event ID and the number of tickets to book
Example:
### bookTickets("",);

2. View Booked Tickets:To view booked tickets, use the 'viewBookedTickets' function.
Example:
### viewBookedTickets();

3. Cancel Booking:To cancel a booked ticket, use the 'cancelBooking' function by providing the event ID and the number of tickets to cancel.Example:
### cancelBooking("", );

4. Apply Discounts/Promo Code:To apply discounts or promo codes, use the 'applyDiscount' function by providing the promo code.
Example:
### applyDiscount("");

5. Search Event:To search for events based on specific criteria, use the 'searchEvent' function by providing the search criteria.
Example:
### searchEvent("");
```

# Ticket Booking System

This is a simple ticket booking system implemented in JavaScript. It allows users to book tickets for various events, cancel bookings, view booked tickets, create new events, and search for existing events based on criteria.

## How to Use

### Setting User Balance
Before booking tickets, you need to set the user's balance using the `setBalance(amount)` function.

```javascript
ticketmaster.setBalance(1000);



