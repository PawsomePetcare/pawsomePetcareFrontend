import React from 'react';
import ServiceBox from './ServiceBox';

const MainContent = () => {
    const services = [
        { title: "Boarding", description: "Safe and comfortable boarding for your pets.", image: "/images/boarding.jpg" },
        { title: "Veterinary", description: "Professional veterinary services.", image: "/images/veterinary.jpg" },
        { title: "Live Video", description: "Watch your pet live while you're away.", image: "/images/live-video.jpg" },
        { title: "Training", description: "Expert training for your pets.", image: "/images/training.jpg" },
        { title: "Grooming", description: "Professional grooming services.", image: "/images/grooming.jpg" },
    ];

    return (
        <main>
            <div className="services-container">
                {services.map((service, index) => (
                    <ServiceBox
                        key={index}
                        title={service.title}
                        description={service.description}
                        image={service.image}
                    />
                ))}
            </div>
        </main>
    );
};

export default MainContent;
