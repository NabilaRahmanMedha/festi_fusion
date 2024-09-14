import React,{useState, useEffect} from 'react';
import { CommonSection } from '../shared/CommonSection';

import '../styles/event.css';
import EventCard from './../shared/EventCard';
import SearchBar from './../shared/SearchBar';
import { Container,Row ,Col} from 'reactstrap';

import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';

const Events = () => {
  
  const [pageCount,setPageCount] = useState(0);
  const [page,setPage] = useState(0);

  const {data:events, loading, error} = useFetch(`${BASE_URL}events?page=${page}`);
  const {data:eventCount} = useFetch(`${BASE_URL}events/search/getEventCount`);


  useEffect(()=>{
    const pages=Math.ceil(eventCount/8);
    setPageCount(pages);
    window.scrollTo(0,0);
  },[page, eventCount, events]);

  return (<>
    <CommonSection title={"All Events"}/>
    <section>
      <Container>
        <Row>
          <SearchBar/>
        </Row>
      </Container>
    </section>

    <section className="pt-0">
      <Container>
        {
          loading&&<h4 className="text-center pt-5">Loading . . .</h4>
        }
        {
          error&&<h4 className="text-center pt-5">{error}</h4>
        }
        {
          !loading&&!error&&<Row>
          {
            events?.map(event=> 
            <Col lg="3" className="mb-4" key={event._id}>
              <EventCard event={event}/>
            </Col>)
          }

          <Col lg='12'>
          <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
            {[...Array(pageCount).keys()].map(number =>(
              <span key={number} onClick={() =>setPage(number)}
              className={page===number ? "active__page" : ""}
              >
                {number+1}
              </span>
            ))}
          </div>
          </Col>
        </Row>
        }
      </Container>
    </section>
     
  </>
  );
};

export default Events;