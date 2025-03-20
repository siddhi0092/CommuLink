import React from 'react';
import CardComponent from '../components/Card'; // Import the CardComponent

const Business = () => {
    // Example data for the cards
    const businessCards = [
        {
            image: "https://via.placeholder.com/200",
            title: "Business Name 1",
            description: "Letter figure show as smart connectors adjusting sts, set do external temper",
            buttonText: "Learn More",
            onClick: () => alert("Business 1 clicked!")
        },
        {
            image: "https://via.placeholder.com/200",
            title: "Business Name 2",
            description: "Letter figure show as smart connectors adjusting sts, set do external temper",
            buttonText: "Learn More",
            onClick: () => alert("Business 2 clicked!")
        },
        {
            image: "https://via.placeholder.com/200",
            title: "Business Name 3",
            description: "Letter figure show as smart connectors adjusting sts, set do external temper",
            buttonText: "Learn More",
            onClick: () => alert("Business 3 clicked!")
        }
    ];

    return (
        <div className="bg-gray-100 min-h-screen">

            {/* Business Forum Section */}
            <div className="container mx-auto p-4 mt-8">
                {/* Start Your Business With Pro Card */}
                <div className="bg-blue-800 text-white rounded-lg shadow-lg p-8 text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">Start Your Business With Pro</h2>
                    <p className="text-xl mb-6">try now for free!</p>
                    <ul className="text-gray-300 mb-6">
                        <li>Last item</li>
                        <li>Last item</li>
                        <li>Last item</li>
                        <li>Last item</li>
                        <li>Last item</li>
                    </ul>
                    <button className="bg-teal-500 text-white px-8 py-3 rounded-lg hover:bg-teal-600 transition duration-300">
                        Try Now!
                    </button>
                </div>

                {/* Explore Businesses Section */}
                <h2 className="text-3xl font-bold text-blue-900 mb-8">Explore Businesses</h2>
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