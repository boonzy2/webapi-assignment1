// Importing the module
const ticketmaster = require("./Brandon_WAD.js");

ticketmaster.setBalance(1000);

console.log("====================");

// Book Tickets
let bookingDetails = ticketmaster.bookTickets("E1", 2, "VIP", "SAVE10"); // Book 2 VIP tickets for event E1 with promo code SAVE10
if (bookingDetails.success) {
    console.log("Tickets booked successfully. Booking ID:", bookingDetails.bookingId);
    console.log("Total Price:", bookingDetails.totalPrice); // Display total price after discount
} else {
    console.log("Failed to book tickets:", bookingDetails.message);
}

// View booked tickets
ticketmaster.viewBookedTickets(); 

// Example event data
let newEventData = {
        name: "Music Festival", 
        description: "A thrilling music concert featuring top artists.",
        ticketTypes: {
            "General": { price: 50, ticketsAvailable: 100 },
            "VIP": { price: 100, ticketsAvailable: 50 }
        }
    
};

// Call the createEvent function with the event data
const creationResult = ticketmaster.createEvent(newEventData);

// Check if the event creation was successful
if (creationResult.success) {
    console.log(`Event created successfully! Event ID: ${creationResult.eventId}`);
} else {
    console.log("Failed to create event.");
}

// Search for events
ticketmaster.searchEvent("Concert");
