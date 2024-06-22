import React,{useRef} from 'react';
import './search-bar.css'
import { Col, Form, FormGroup } from 'reactstrap';

const SearchBar = () => {

    const locationRef =useRef('');
    const budgetRef =useRef(0);
    const maxGroupSizeRef =useRef(0);

    const searchHandler = ()=>{
        const location= locationRef.current.value
        const budget= budgetRef.current.value
        const maxGroupSize= maxGroupSizeRef.current.value

        if(location=='' || budget==''||maxGroupSize==''){
            return alert("All fields are required!!");
        }

    };




  return <Col lg='12'>
    <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
            <FormGroup className="d-flex gap-3 form__group form__group-fast">
                <span><i class="ri-map-pin-line"></i></span>
                <div>
                    <h6>Location</h6>
                    <input type="text" placeholder="Event location?" ref=
                    {locationRef}/>
                </div>
            </FormGroup>

            <FormGroup className="d-flex gap-3 form__group form__group-fast">
                <span><i class="ri-currency-line"></i></span>
                <div>
                    <h6>Budget</h6>
                    <input type="number" placeholder="Maximum Budget?/BDT " ref=
                    {budgetRef} />
                </div>
            </FormGroup>

            <FormGroup className="d-flex gap-3 form__group form__group-last">
                <span><i class="ri-group-line"></i></span>
                <div>
                    <h6>Max People</h6>
                    <input type="number" placeholder="0" ref=
                    {maxGroupSizeRef} />
                </div>
            </FormGroup>
            <span className="search__icon" type="submit" onClick={searchHandler}>
            <i class="ri-search-line"></i>
            </span>

        </Form>
    </div>
  </Col>
};

export default SearchBar;