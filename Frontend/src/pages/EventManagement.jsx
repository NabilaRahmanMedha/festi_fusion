import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'reactstrap';
import "../styles/eventManagment.css";

const EventManagement = () => {
  const [events, setEvents] = useState([]);

  // Fetch events from the server
  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://festi-fusion-backend.vercel.app/api/v1/booking');
      setEvents(response.data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Delete event from the server and update the state
  const deleteEvent = async (eventId) => {
    try {
      console.log(`Attempting to delete event with ID: ${eventId}`);
      await axios.delete(`https://festi-fusion-backend.vercel.app/api/v1/booking/${eventId}`);
      console.log(`Event with ID: ${eventId} deleted successfully`);
      
      // Update state after successful deletion
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <section>
      <Container className="mt-5">
        <h1 className="text-center mb-5 eventsHeader">Event Management</h1>
        <Row>
          {events.length > 0 ? (
            events.map((event) => (
              <Col lg="4" md="6" sm="12" key={event._id} className="mb-4">
                <Card className="event-card p-3 shadow-sm">
                  <h5 className="event-name">{event.eventName}</h5>
                  <p className="event-detail"><strong>Booked by:</strong> {event.fullName}</p>
                  <p className="event-detail"><strong>Email:</strong> {event.userEmail}</p>
                  <p className="event-detail"><strong>Guests:</strong> {event.guestSize}</p>
                  <p className="event-detail"><strong>Date:</strong> {new Date(event.bookAt).toLocaleDateString()}</p>
                  <p className="event-detail"><strong>Phone:</strong> {event.phone}</p>
                  <Button 
                    className="btn primary__btn"
                    onClick={() => deleteEvent(event._id)} // Call delete function on button click
                  >
                    Delete
                  </Button>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-center">No events found.</p>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default EventManagement;
