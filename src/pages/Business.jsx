import React, { useContext } from 'react';
import { ThemeContext } from '../App'; // Import ThemeContext
import CardComponent from '../components/Card'; // Import the CardComponent

const Business = () => {
  const { isDarkMode } = useContext(ThemeContext); // Access theme state

  // Example data for the cards
  const businessCards = [
    {
      image: 'https://via.placeholder.com/200',
      title: 'Business Name 1',
      description: 'Letter figure show as smart connectors adjusting sts, set do external temper.',
      buttonText: 'Learn More',
      onClick: () => alert('Business 1 clicked!'),
    },
    {
      image: 'https://via.placeholder.com/200',
      title: 'Business Name 2',
      description: 'Letter figure show as smart connectors adjusting sts, set do external temper.',
      buttonText: 'Learn More',
      onClick: () => alert('Business 2 clicked!'),
    },
    {
      image: 'https://via.placeholder.com/200',
      title: 'Business Name 3',
      description: 'Letter figure show as smart connectors adjusting sts, set do external temper.',
      buttonText: 'Learn More',
      onClick: () => alert('Business 3 clicked!'),
    },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      {/* Business Forum Section */}
      <div className="container mx-auto p-4 mt-8">
        {/* Start Your Business With Pro Card */}
        <div
          className={`rounded-lg shadow-lg p-8 text-center mb-8 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-800 text-white'
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">Start Your Business With Pro</h2>
          <p className="text-xl mb-6">Try now for free!</p>
          <ul className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-200'}`}>
            <li>Access to premium tools</li>
            <li>Expert business advice</li>
            <li>24/7 customer support</li>
            <li>Exclusive networking opportunities</li>
            <li>Customizable business solutions</li>
          </ul>
          <button
            className={`px-8 py-3 rounded-lg transition-colors ${
              isDarkMode
                ? 'bg-teal-600 hover:bg-teal-700 text-white'
                : 'bg-teal-500 hover:bg-teal-600 text-white'
            }`}
          >
            Try Now!
          </button>
        </div>

        {/* Explore Businesses Section */}
        <h2 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-white' : 'text-blue-900'}`}>
          Explore Businesses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Map over the businessCards array and render a CardComponent for each */}
          {businessCards.map((card, index) => (
            <CardComponent
              key={index}
              image={card.image}
              title={card.title}
              description={card.description}
              buttonText={card.buttonText}
              onClick={card.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Business;