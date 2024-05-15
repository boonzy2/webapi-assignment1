// Simulated database or data store for events and bookings
let eventsData = {
    "E1": { name: "Concert", ticketsAvailable: 100 },
    "E2": { name: "Sports Game", ticketsAvailable: 200 }
};

let bookingsData = {}; // Object to store booking details
let bookedTickets = []; // Array to store booked ticket IDs

module.exports = {

    //1. Book Tickets - Function to book tickets for an event
     // Function to book tickets for an event
     bookTickets(eventId, numTickets) {
        // Check if the event exists
        if (eventsData[eventId]) {
            // Check if there are enough tickets available
            if (eventsData[eventId].ticketsAvailable >= numTickets) {
                // Update tickets available for the event
                eventsData[eventId].ticketsAvailable -= numTickets;
    
                // Generate booking ID
                let bookingId = `B${Math.floor(Math.random() * 10000)}`;
    
                // Store booking details
                bookingsData[bookingId] = {
                    eventId: eventId,
                    numTickets: numTickets
                };
    
                // Return booking details along with booking ID
                return {
                    bookingId: bookingId, // Return the generated booking ID
                    event: eventsData[eventId],
                    ticketsBooked: numTickets,
                    success: true // Indicate success of booking
                };
            } else {
                return {
                    message: "Not enough tickets available for this event.",
                    success: false // Indicate failure of booking
                };
            }
        } else {
            return {
                message: "Event not found.",
                success: false // Indicate failure of booking
            };
        }
    },
    
        
    

  //2. Cancel Booking - Function to cancel a booked ticket
    // Function to cancel a booked ticket
cancelBooking(bookingId) {
    // Check if the booking exists
    if (bookingsData[bookingId]) {
        let eventId = bookingsData[bookingId].eventId;
        let numTickets = bookingsData[bookingId].numTickets;

        // Increment tickets available for the event
        eventsData[eventId].ticketsAvailable += numTickets;

        // Remove booking from bookingsData
        delete bookingsData[bookingId];

        // Remove booking ID from bookedTickets array
        let index = bookedTickets.indexOf(bookingId);
        if (index !== -1) {
            bookedTickets.splice(index, 1);
        }

        console.log(`Cancelled booking ${bookingId} for ${numTickets} ticket(s) for event ${eventId}`);
    } else {
        console.log("Booking not found.");
    }
},


    //3. View Booked tickets - Check if there are booked tickets
    viewBookedTickets() {
        if (Object.keys(bookingsData).length === 0) {
            console.log("No tickets have been booked yet.");
        } else {
            console.log("Viewing booked tickets:");
            // Loop through bookingsData and display booked tickets
            for (let bookingId in bookingsData) {
                console.log(`Booking ID: ${bookingId}, Event ID: ${bookingsData[bookingId].eventId}, Number of Tickets: ${bookingsData[bookingId].numTickets}`);
            }
        }
    },



    //4. Apply Discounts/Promo Code - apply discounts or promo codes to ticket purchases
     applyDiscount(promoCode) {
        // Example: Apply 10% discount for promo code "SAVE10"
        if (promoCode === "SAVE10") {
            console.log("Discount applied: 10%");
            // You can add more promo code logic here
        } else {
            console.log("Invalid promo code");
        }
    },


   //5. Search Event - Function to search for events based on given criteria
   searchEvent(criteria) {
    // Logic to search for events based on the provided criteria
    console.log(`Searching for events based on: ${criteria}`);
    // Example logic: Search events by name
    let foundEvents = Object.values(eventsData).filter(event => event.name.toLowerCase().includes(criteria.toLowerCase()));
    if (foundEvents.length === 0) {
        console.log("No events found matching the criteria.");
    } else {
        console.log("Found events:");
        foundEvents.forEach(event => console.log(`Event ID: ${event.id}, Name: ${event.name}, Tickets Available: ${event.ticketsAvailable}`));
    }
    }

    //6 Update event particulars
};
