// Importing the module
const ticketmaster = require("./Brandon_WAD.js");

ticketmaster.setBalance(1000);

console.log("====================");
// Call initializeSeatsForEvents function
ticketmaster.initializeSeatsForEvents();

// Book Tickets
let bookingDetails = ticketmaster.bookTickets("E3", 2, "VIP", "SAVE10"); // Book 2 VIP tickets for event E1 with promo code SAVE10
if (bookingDetails.success) {
    console.log("Tickets booked successfully. Booking ID:", bookingDetails.bookingId);
    console.log("Total Price:", bookingDetails.totalPrice); // Display total price after discount
} else {
    console.log("Failed to book tickets:", bookingDetails.message);
}

// Cancel a booking
ticketmaster.cancelBooking("B1");

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
