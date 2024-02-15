import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import VolunteerInfo from '../components/VolunteerInfo';
import CitizenshipTestSection from '../components/CitizenshipTestSection';
import Extra from '../components/Extra';
import Footer from '../components/Footer';
import Booking from '../components/Booking';
import '../components/App.css';

const Home = () => {
  return (
    <div  style={{ backgroundImage: 'url(/images/011-subtle-light-patterns.jpg)', fontFamily: 'Arial' }}>
      <Header />
      <HeroSection />
      <CitizenshipTestSection />
      <VolunteerInfo />
      <Booking />
      <Extra />
      <Footer/>
    </div>
  );
};

export default Home;
