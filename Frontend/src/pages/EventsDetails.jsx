import React from 'react';
import '../styles/event-details.css';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import eventData from '../assets/data/events';
import calculateAvgRating from '../utils/avgRating';

const EventsDetails = () => {
  const { id } = useParams();

  // this is static data; later we will call our API and load our data from the database
  const event = eventData.find(event => event.id === id);

  // destructure properties from event object
  const { photo, title, desc, price, address, reviews, city, distance, maxGroupSize } = event;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="event__content">
                <img src={photo} alt='' />

                <div className="event__info">
                  <h2>{title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="event__rating d-flex align-items-center justify-content-between">
                      <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i>
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? (
                        "Not rated"
                      ) : (
                        <span>({reviews?.length})</span>
                      )}
                    </span>

                    <span>
                    <i class="ri-map-pin-user-fill"></i> {address}
                    </span>
                  </div>
                  <div className="event__extra-details">
                    <span><i class="ri-map-pin-2-line"></i>{city}</span>
                    <span><i class="ri-currency-line"></i>${price}/per person</span>
                    <span><i class="ri-group-fill"></i>{maxGroupSize}</span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>

                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default EventsDetails;
