import React from 'react';
import{Routes, Route, Navigate} from 'react-router-dom' 

import Home from '../pages/Home';
import Events from '../pages/Events';
import EventsDetails from '../pages/EventsDetails';
import Register from '../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import Login from '../pages/Login';
import ThankYou from '../pages/ThankYou';
import AdminDashboard from '../pages/AdminDashboard';
import UserManagement from '../pages/UserManagement';
import EventManagement from '../pages/EventManagement';
import AdminLayout from '../components/AdminLayout/AdminLayout';



const Routers = () => {
  return (
    <Routes>
        <Route path='/'element={<Navigate to='/home'/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/events' element={<Events/>}/>
        <Route path='/events/:id' element={<EventsDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/thank-you' element={<ThankYou/>}/>
        <Route path='/events/search' element={<SearchResultList/>}/>

        <Route path='/admin' element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path='/admin/users' element={<AdminLayout><UserManagement /></AdminLayout>} />
        <Route path='/admin/events' element={<AdminLayout><EventManagement /></AdminLayout>} />
    
    </Routes>
  );
};

export default Routers;