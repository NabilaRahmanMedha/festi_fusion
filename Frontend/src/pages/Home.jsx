import React from 'react';
import '../styles/home.css'

import { Container, Row,Col, CardSubtitle} from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import worldImg from '../assets/images/world.png'
import experienceImg from '../assets/images/experience.png';

import Subtitle from './../shared/Subtitle';
import SearchBar from '../shared/SearchBar';

import ServiceList from '../services/ServiceList';
import FeaturedEventList from '../components/Featured-events/FeaturedEventList';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimonials from '../components/Testimonial/Testimonials';
import Newsletter from '../shared/Newsletter';



const Home = () => {
  return <>

  {/* ============ hero section start =========== */}
  <section>
    <Container>
      <Row>
        <Col lg='6'>
        <div className="hero__content">
            <div className="hero__subtitle d-flex align-items-center">
              <Subtitle subtitle={"let's Make Memories"} />
              
            </div>
            <h1>Its time to Celebrate! The best <span
            className="highlight">Event Organizers</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quis deleniti,
               aperiam odio quae aspernatur quaerat temporibus adipisci incidunt eaque quidem 
               veritatis quasi quia velit provident veniam non vero repudiandae!</p>

        </div>
        </Col>

        <Col lg='2'>
         <div className="hero__img-box">
          <img src={heroImg} alt="" />
         </div>
        </Col>

        <Col lg='2'>
         <div className="hero__img-box mt-4">
          <video src={heroVideo} alt="" controls/>
         </div>
        </Col>

        <Col lg='2'>
         <div className="hero__img-box mt-5">
          <img src={heroImg02} alt="" />
         </div>
        </Col>

        <SearchBar/>

      </Row>
    </Container>
  </section>
  {/* ============ hero section end =========== */}

  <section>
    <Container>
      <Row>
        <Col lg='3'>
        <h5 className="services__subtitle">What we serve</h5>  
        <h2 className="services__title">We offer our best services</h2>
        </Col>

        <ServiceList/>

      </Row>
    </Container>
  </section>

  {/* ============features event section start ============*/}
  <section>
    <Container>
      <Row>
        <Col lg='12' className="mb-5">
        <Subtitle subtitle={'Explore'}/>
        <h2 className="featured__event-title">Our Featured Events</h2>
        </Col>

        <FeaturedEventList />

      </Row>
    </Container>
  </section>
  

  {/* ============features event section end ============*/}

  {/* ============experience section start============*/}

    <section>
      <Container>
        <Row>
          <Col lg="6">
            <div className="experience__content">
              <Subtitle subtitle={'Experience'} />
              <h2>
                With our all experience <br /> we will serve you
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipistic elit.
                <br />
                quas aliquam, hic tempora inventore suscipit unde.
              </p>
            </div>
            <div className="counter__wrapper d-flex align-items-center gap-5">
              <div className="counter__box">
                <span>12k+</span>
                <h6>Successful events</h6>
              </div>
              <div className="counter__box">
                <span>2k+</span>
                <h6>Regular client</h6>
              </div>
              <div className="counter__box">
                <span>5</span>
                <h6>Years experience</h6>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <img src={experienceImg} alt="" />
          </Col>
        </Row>
      </Container>
    </section>

{/* ============experience section end============*/}

{/* ============gallery section start============*/}
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <Subtitle subtitle={'Gallery'}/>
            <h2 className="gallery__title">Visit our clients event gallery</h2>
          </Col>
          <Col lg='12'>
            <MasonryImagesGallery/>
          </Col>
        </Row>
      </Container>
    </section>

{/* ============gallery section end============*/}

{/* ============testimonial section start============*/}

    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <Subtitle subtitle={'Fans Love'}/>
            <h2 className='testimonial__title'>What our fans say about us</h2>
          </Col>
          <Col lg='12'>
          <Testimonials/>
          </Col>
        </Row>
      </Container>
    </section>

{/* ============testimonial section end============*/}
<Newsletter/>
  </>
};

export default Home;