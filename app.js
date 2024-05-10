let ticketmaster = require("./Brandon_WAD.js");

console.log("Beginning of Boonzy Ticket Master");

// Beginning of calling of functions
// Call the function to book tickets - 1
let bookingResult = ticketmaster.bookTickets("E1", 4);
console.log(bookingResult); // Display the result of booking

//2
ticketmaster.viewBookedTickets(); 

//3
ticketmaster.cancelBooking("E2", 4);

//4
ticketmaster.applyDiscount("SAVE10"); 

//5
ticketmaster.searchEvent("C"); 
