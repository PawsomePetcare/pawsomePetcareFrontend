import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'react-feather';

const SocialConnections = () => {
    const socialLinks = [
        { Icon: Facebook, url: 'https://www.facebook.com', name: 'Facebook' },
        { Icon: Twitter, url: 'https://www.twitter.com', name: 'Twitter' },
        { Icon: Linkedin, url: 'https://www.linkedin.com', name: 'LinkedIn' },
        { Icon: Instagram, url: 'https://www.instagram.com', name: 'Instagram' }
    ];

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">For social connections</h2>
            <div className="row justify-content-center">
                {socialLinks.map(({ Icon, url, name }, index) => (
                    <div className="col-6 col-md-1 mb-4" key={index}>
                        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-light shadow-sm w-100">
                            <Icon size={18} className="me-2" />
                            {/* {name} */}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SocialConnections;
