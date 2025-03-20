import React, { useEffect } from 'react';
import Main from './Main';
import ApexCharts from 'apexcharts'; // Import ApexCharts
import { TypeAnimation } from 'react-type-animation'; // Import TypeAnimation
import CardComponent from '../components/Card'; // Import the reusable Card component
import Profile from './Profile';

const Home = () => {
  // Initialize the chart
  useEffect(() => {
    const options = {
      series: [{
        name: 'Activity',
        data: [31, 40, 28, 51, 42, 109, 100]
      }],
      chart: {
        height: 350,
        type: 'area',
        foreColor: '#fff', // Text color
        toolbar: { show: true }, // Show toolbar
        background: '#1e1e1e' // Background color
      },
      stroke: { 
        curve: 'smooth', // Smooth curve
        colors: ['#00E396'] // Line color
      },
      fill: { 
        type: 'gradient', 
        gradient: { 
          shadeIntensity: 1, 
          opacityFrom: 0.7, 
          opacityTo: 0.3 
        } 
      },
      xaxis: { 
        type: 'datetime', 
        categories: [
          "2018-09-19T00:00:00.000Z", 
          "2018-09-19T01:30:00.000Z", 
          "2018-09-19T02:30:00.000Z", 
          "2018-09-19T03:30:00.000Z", 
          "2018-09-19T04:30:00.000Z", 
          "2018-09-19T05:30:00.000Z", 
          "2018-09-19T06:30:00.000Z"
        ] 
      },
      tooltip: { 
        theme: 'dark', // Tooltip theme
        x: { format: 'dd/MM/yy HH:mm' } // Date format
      }
    };

    // Create the chart
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    // Cleanup on component unmount
    return () => {
      chart.destroy();
    };
  }, []); // Empty dependency array ensures this runs only once

  // Data for cards
  const profileCard = {
    image: 'person-circle.svg',
    title: 'Hi! User',
    description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    buttonText: 'Your Profile',
    to:'/Profile',
  };

  const premiumCard = {
    image: 'https://via.placeholder.com/400x200',
    title: 'Boost your career with Premium',
    description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    buttonText: 'Try Now!',
    onClick: () => alert('Premium Clicked!'),
  };

  const blogCards = [
    {
      image: 'https://via.placeholder.com/400x200',
      title: 'Blog Title 1',
      description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      buttonText: 'Read More',
      onClick: () => alert('Blog 1 Clicked!'),
    },
    // Add more blog cards here
  ];

  const eventCard = {
    image: 'https://via.placeholder.com/600x300',
    title: 'Upcoming Events',
    description: 'Check out the latest events happening in your community.',
    buttonText: 'View All Events',
    onClick: () => alert('Events Clicked!'),
  };

  const suggestionCard = {
    image: 'https://via.placeholder.com/600x300',
    title: 'Suggestions',
    description: 'Discover personalized suggestions tailored for you.',
    buttonText: 'Explore Suggestions',
    onClick: () => alert('Suggestions Clicked!'),
  };

  return (
    <Main>
      {/* Typing Animation */}
      <div className="main-title text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          Connecting communities,
          <br />
          <TypeAnimation
            sequence={[
              'One Link at a time.', // Typing effect starts here
              1000, // Pause for 1 second
              '', // Clear text
              500, // Pause before restarting
            ]}
            repeat={Infinity} // Loop indefinitely
            speed={50} // Typing speed
            style={{ display: 'inline-block' }} // Ensure it's inline
          />
        </h1>
      </div>

      {/* Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <div className="h-full">
            <CardComponent {...profileCard} />
          </div>
          {/* Premium Card */}
          <div className="h-full">
            <CardComponent {...premiumCard} />
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">Blogs and Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogCards.map((card, index) => (
              <div key={index}>
                <CardComponent {...card} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ApexCharts Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-white mb-8">Your Activity of the Month</h2>
          <div id="chart" className="bg-white rounded-lg shadow-lg p-4">
            {/* Chart will render here */}
          </div>
        </div>
      </section>

      {/* Events and Suggestions */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <CardComponent {...eventCard} />
          </div>
          <div>
            <CardComponent {...suggestionCard} />
          </div>
        </div>
      </section>
    </Main>
  );
};

export default Home;