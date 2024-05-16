module.exports = {
  // Data stores for events and bookings
eventsData: {
    "E1": { 
        name: "Concert", 
        description: "A thrilling music concert featuring top artists.",
        ticketTypes: {
            "General": { price: 50, ticketsAvailable: 100, seats: [] },
            "VIP": { price: 100, ticketsAvailable: 50, seats: [] }
        }
    },
    "E2": { 
        name: "Sports Game", 
        description: "Exciting sports game with teams competing for victory.",
        ticketTypes: {
            "Standard": { price: 30, ticketsAvailable: 200, seats: [] }
        }
    },
    "E3": { 
        name: "Kids Concert", 
        description: "A thrilling music concert featuring top kid artists.",
        ticketTypes: {
            "General": { price: 50, ticketsAvailable: 120, seats: [] },
            "VIP": { price: 100, ticketsAvailable: 20, seats: [] }
        }
    },
},


  // Initialize available seats for each event
  initializeSeatsForEvents() {
    Object.values(this.eventsData).forEach(event => {
        Object.values(event.ticketTypes).forEach(ticketType => {
            ticketType.seats = this.initializeSeats(ticketType.ticketsAvailable);
        });
    });
},



    bookingsData: {}, // Object to store booking details

    // User balance
    balance: 0,

    // Set User Balance
    setBalance(amount) {
        this.balance = amount;
    },

    
    assignSeats(eventId, ticketType, numTickets) {
        let seats = [];
        let availableSeats = this.eventsData[eventId].ticketTypes[ticketType].seats; // Get available seats directly
        
        console.log("Available seats before assignment:", availableSeats);
    
        // Check if there are available seats
        if (availableSeats.length > 0) {
            // Loop to assign seats for the requested number of tickets
            for (let i = 0; i < numTickets; i++) {
                // Find the index of an available seat
                let seatIndex = availableSeats.findIndex(seat => seat !== null);
                
                // Check if there's an available seat
                if (seatIndex !== -1) {
                    seats.push(availableSeats[seatIndex]); // Push the assigned seat into the seats array
                    availableSeats[seatIndex] = null; // Mark the seat as assigned
                } else {
                    console.log("Not enough available seats.");
                    break; // Exit the loop if there are no more available seats
                }
            }
        } else {
            console.log("No available seats.");
        }
    
        console.log("Assigned seats:", seats);
    
        return seats; // Return the assigned seats
    },
    
    
    
    
    
    
    

    bookTickets(eventId, numTickets, ticketType = "General", promoCode = null) {
        if (this.eventsData[eventId]) {
            if (this.eventsData[eventId].ticketTypes[ticketType] && this.eventsData[eventId].ticketTypes[ticketType].ticketsAvailable >= numTickets) {
                let ticketPrice = this.eventsData[eventId].ticketTypes[ticketType].price;
                let totalPrice = numTickets * ticketPrice;
    
                // Apply discount if promo code is provided
                if (promoCode === "SAVE10") {
                    totalPrice *= 0.9; // Apply 10% discount
                }
    
                // Check if balance is sufficient
                if (this.balance >= totalPrice) {
                    // Deduct amount from balance
                    this.balance -= totalPrice;
    
                    this.eventsData[eventId].ticketTypes[ticketType].ticketsAvailable -= numTickets;
    
                    // Assign seat numbers
                    let seats = this.assignSeats(eventId, ticketType, numTickets);
    
                    // Increment the last used booking ID
                    this.lastBookingId = this.lastBookingId ? this.lastBookingId + 1 : 1;
    
                    // Generate the booking ID
                    let bookingId = `B${this.lastBookingId}`;
    
                    this.bookingsData[bookingId] = {
                        eventId: eventId,
                        numTickets: numTickets,
                        ticketType: ticketType,
                        totalPrice: totalPrice,
                        seats: seats // Assign seat numbers
                    };
    
                    console.log(`Successfully booked ${numTickets} ticket(s) for event ${this.eventsData[eventId].name}. Remaining balance: ${this.balance}`);
                    console.log(`Assigned seat(s): ${seats.join(', ')}`); // Display assigned seat numbers separately
    
                    return {
                        bookingId: bookingId,
                        event: this.eventsData[eventId],
                        ticketsBooked: numTickets,
                        ticketPrice: ticketPrice,
                        totalPrice: totalPrice,
                        remainingBalance: this.balance,
                        seats: seats,
                        success: true
                    };
                } else {
                    return {
                        message: "Not enough money in the balance.",
                        success: false
                    };
                }
            } else {
                return {
                    message: "Invalid ticket type or not enough tickets available for this type.",
                    success: false
                };
            }
        } else {
            return {
                message: "Event not found.",
                success: false
            };
        }
    },
    
    

    // Cancel Booking - Function to cancel a booked ticket
    cancelBooking(bookingId) {
        if (this.bookingsData[bookingId]) {
            let eventId = this.bookingsData[bookingId].eventId;
            let numTickets = this.bookingsData[bookingId].numTickets;

            this.eventsData[eventId].ticketTypes[this.bookingsData[bookingId].ticketType].ticketsAvailable += numTickets;

            // Return seats to available seats pool
            let returnedSeats = this.bookingsData[bookingId].seats.filter(seat => seat !== null);
            this.eventsData[eventId].ticketTypes[this.bookingsData[bookingId].ticketType].seats = this.eventsData[eventId].ticketTypes[this.bookingsData[bookingId].ticketType].seats.concat(returnedSeats);

            delete this.bookingsData[bookingId];

            console.log(`Cancelled booking ${bookingId} for ${numTickets} ticket(s) for event ${eventId}`);
        } else {
            console.log("Booking not found.");
        }
    },

    // View Booked tickets - Check if there are booked tickets
    viewBookedTickets() {
        if (Object.keys(this.bookingsData).length === 0) {
            console.log("No tickets have been booked yet.");
        } else {
            console.log("Viewing booked tickets:");
            for (let bookingId in this.bookingsData) {
                let booking = this.bookingsData[bookingId];
                let eventName = this.eventsData[booking.eventId].name;
                console.log(`Booking ID: ${bookingId}, Event Name: ${eventName}, Number of Tickets: ${booking.numTickets}, Assigned Seats: ${booking.seats.join(', ')}`);
            }
        }
    },

    // Create Event - Function to create a new event and add it to the database
    createEvent(eventData) {
        if (!eventData.name || !eventData.description || !eventData.ticketTypes) {
            return {
                message: "Name, description, and ticket types are required to create an event.",
                success: false
            };
        }
    
        let eventId = `E${Object.keys(this.eventsData).length + 1}`; // Generate unique event ID
        this.eventsData[eventId] = eventData;
    
        // Initialize available seats for each ticket type
        Object.values(this.eventsData[eventId].ticketTypes).forEach(ticketType => {
            ticketType.seats = this.initializeSeats(ticketType.ticketsAvailable);
        });
    
        console.log(`Event ${eventId}, ${eventData.name} created successfully.`);
        return {
            eventId: eventId,
            success: true
        };
    },
    initializeSeats(numSeats) {
        let seats = [];
        for (let i = 1; i <= numSeats; i++) {
            seats.push(`Seat ${i}`);
        }
        return seats;
    },
    

    // Search Event - Function to search for events
    searchEvent(criteria) {
        console.log(`Searching for events based on: ${criteria}`);
        let foundEvents = Object.values(this.eventsData).filter(event => event.name.toLowerCase().includes(criteria.toLowerCase()));
        if (foundEvents.length === 0) {
            console.log("No events found matching the criteria.");
        } else {
            console.log("Found events:");
            foundEvents.forEach(event => {
                console.log(`Event ID: ${event.id}, Name: ${event.name}, Description: ${event.description}`);
                console.log("Ticket Types:");
                Object.entries(event.ticketTypes).forEach(([type, details]) => {
                    console.log(`- Type: ${type}, Price: ${details.price}, Tickets Available: ${details.ticketsAvailable}`);
                });
            });
        }
    }
};
