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
        }
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
        let availableSeats = this.eventsData[eventId].ticketTypes[ticketType].seats;
        
        for (let i = 0; i < numTickets; i++) {
            let assignedSeat = null;
            if (availableSeats.length > 0) {
                let seatIndex = Math.floor(Math.random() * availableSeats.length);
                assignedSeat = availableSeats.splice(seatIndex, 1)[0];
            }
            seats.push(assignedSeat);
        }
        return seats;
    },
    


    

// Book Tickets - Function to book tickets for an event
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

                let bookingId = `B${Math.floor(Math.random() * 10000)}`;

                this.bookingsData[bookingId] = {
                    eventId: eventId,
                    numTickets: numTickets,
                    ticketType: ticketType,
                    totalPrice: totalPrice, // Store total price in booking details
                    seats: seats
                };

                // Convert seat numbers array to a string for display
                let assignedSeatsStr = seats.map(seat => seat !== null ? seat : "N/A").join(", ");

                console.log(`Successfully booked ${numTickets} ticket(s) for event ${this.eventsData[eventId].name}. Assigned seat(s): ${assignedSeatsStr}. Remaining balance: ${this.balance}`);

                return {
                    bookingId: bookingId,
                    event: this.eventsData[eventId],
                    ticketsBooked: numTickets,
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
                console.log(`Booking ID: ${bookingId}, Event ID: ${this.bookingsData[bookingId].eventId}, Number of Tickets: ${this.bookingsData[bookingId].numTickets}`);
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
        console.log(`Event ${eventId} created successfully.`);
        return {
            eventId: eventId,
            success: true
        };
    },

    // Search Event - Function to search for events based on given criteria
    searchEvent(criteria) {
        console.log(`Searching for events based on: ${criteria}`);
        let foundEvents = Object.values(this.eventsData).filter(event => event.name.toLowerCase().includes(criteria.toLowerCase()));
        if (foundEvents.length === 0) {
            console.log("No events found matching the criteria.");
        } else {
            console.log("Found events:");
            foundEvents.forEach(event => console.log(`Event ID: ${event.id}, Name: ${event.name}, Description: ${event.description}, Tickets Available: ${event.ticketsAvailable}`));
        }
    }
};
