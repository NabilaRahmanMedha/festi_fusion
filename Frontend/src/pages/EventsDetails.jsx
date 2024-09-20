import React,{useEffect, useRef, useState, useContext} from 'react';
import '../styles/event-details.css';
import { Container, Row, Col, Form, ListGroup, ListGroupItemHeading } from 'reactstrap';
import { useParams } from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking';
import useFetch from '../hooks/useFetch';
import {BASE_URL} from '../utils/config';

import {AuthContext} from '../context/AuthContext';


const EventsDetails = () => {
  const { id } = useParams();

  const reviewMsgRef = useRef('');
  const [eventRating, setEventRating]=useState(null);
  const {user} = useContext(AuthContext);

  const {data:event, loading, error}=useFetch(`${BASE_URL}events/${id}`);

  // destructure properties from event object
  const { photo, title, desc, price, address, reviews, city, budget, maxGroupSize } = event;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  // format date
  const options = {day: "numeric", month: "long", year: "numeric"};

  //submit request to the server

  const submitHandler = async e=>{
    e.preventDefault();
    const reviewText =reviewMsgRef.current.value;

    
    try{
      if(!user || user === undefined || user === null){
        alert('Please Sign-In');
      }  

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating:eventRating,
      };

      const res = await fetch(`${BASE_URL}review/${id}`,{
        method: 'post',
        headers: {
          'content-type':'application/json',
        },
        credentials: 'include',
        body:JSON.stringify(reviewObj),
      });

      const result = await res.json();

      if(!res.ok){
        return alert(result.message);
      }

      alert(result.message);
      
    } catch(err){
      alert(err.message);
    }
  
  };

  useEffect(()=>{
    window.scrollTo(0,0);
  },[event]);

  return (
    <>
      <section>
        <Container>
          {
            loading&&<h4 className="text-center pt-5">Loading . . .</h4>
          }
          {
            error&&<h4 className="text-center pt-5">{error}</h4>
          }
          {
            !loading&&!error&&<Row>
            <Col lg="8">
              <div className="event__content">
                <img src={photo} alt='' />

                <div className="event__info">
                  <h2>{title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="event__rating d-flex align-items-center gap-1">
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
                    <span><i class="ri-currency-line"></i>${budget} total</span>
                    <span><i class="ri-group-fill"></i>{maxGroupSize} people</span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>
                {/* =====================event reviews section ================== */}
                <div className="event__reviews mt-4">
                  <h4>Reviews({reviews?.length} reviews)</h4>

                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4
                    rating__group">
                       <span onClick={()=> setEventRating(1)}>
                        1 <i class="ri-star-s-fill"></i></span>
                       <span onClick={()=> setEventRating(2)}>
                        2 <i class="ri-star-s-fill"></i></span>
                       <span onClick={()=> setEventRating(3)}>
                        3 <i class="ri-star-s-fill"></i></span>
                       <span onClick={()=> setEventRating(4)}>
                        4 <i class="ri-star-s-fill"></i></span>
                       <span onClick={()=> setEventRating(5)}>
                        5 <i class="ri-star-s-fill"></i></span>
                    </div>
                    <div className="review__input">
                      <input type="text" ref={reviewMsgRef} placeholder="Share your thoughts"
                      required
                      />
                      <button 
                      className="btn primary__btn text-white"
                        type="submit"
                        >
                          Submit
                      </button>
                    </div>
                  </Form>

                  <ListGroup className="user__reviews">
                    {
                      reviews?.map(review => (
                        <div className="review__item">
                          <img src={avatar} alt=""/>

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {
                                    new Date(review.createdAt).toLocaleDateString(
                                      "en-US",
                                      options
                                    )}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating}<i class="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))
                    }
                  </ListGroup>
                </div>
                {/* =====================event reviews section end ================== */}
              </div>
            </Col>

            <Col lg='4'>
              <Booking event={event} avgRating={avgRating}/>
            </Col>
          </Row>
          }
        </Container>
      </section>
      
    </>
  );
};

export default EventsDetails;
