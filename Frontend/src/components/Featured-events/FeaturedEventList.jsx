import React from "react";
import EventCard from "../../shared/EventCard";
import { Col } from "reactstrap";

import useFetch from "../../hooks/useFetch.js";
import { BASE_URL }  from "../../utils/config.js";


const FeaturedEventList = () => {

  const {data: featuredEvents, loading, error} = useFetch(
    `${BASE_URL}events/search/getFeaturedEvent`);

  return (
  <>
    {
      loading && <h4>Loading . . .</h4>
    }
    {
      error && <h4>{error}</h4>
    }
    {!loading && 
      !error && 
      featuredEvents?.map(event => (
      <Col lg="3" md="6" sm="6" className="mb-4" key={event._id}>
        <EventCard event={event}/>
      </Col>
    ))}
  </>
  );
};

export default FeaturedEventList;