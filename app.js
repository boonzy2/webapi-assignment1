let ticketmaster = require("./Brandon_WAD.js");

// Book Tickets
let bookingDetails = ticketmaster.bookTickets("E1", 2); // Book 2 tickets for event E1
if (bookingDetails.success) {
    console.log("Tickets booked successfully. Booking ID:", bookingDetails.bookingId);
} else {
    console.log("Failed to book tickets:", bookingDetails.message);
}

// Cancel Booking using the returned booking ID
ticketmaster.cancelBooking(bookingDetails.bookingId);


//3
// ticketmaster.viewBookedTickets(); 

//4
// ticketmaster.applyDiscount("SAVE10"); 

//5
// ticketmaster.searchEvent("C"); 
