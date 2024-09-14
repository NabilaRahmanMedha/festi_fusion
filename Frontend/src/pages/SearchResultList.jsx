import React, {useState} from 'react';

import CommonSection from './../shared/CommonSection';
import { Container, Row, Col } from 'reactstrap';

import { useLocation } from 'react-router-dom';
import EventCard from './../shared/EventCard';

const SearchResultList = () => {

  const location = useLocation();

  const [data] = useState(location.state);

  return(
    <>
      <CommonSection title = {"Event Search Result"} />
      <section>
        <Container>
          <Row>
            { data.length === 0 ?(
              <h4 className="text-center">
                No Event Found</h4>
                ):(
                  data?.map(event =>(
                    <Col lg="3" className="md-4" key={event._id}>
                      <EventCard event={event}/>
                    </Col>
                  ))
                )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SearchResultList;