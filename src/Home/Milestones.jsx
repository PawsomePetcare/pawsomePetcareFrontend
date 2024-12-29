import React from 'react';

const Milestones = () => {
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6 col-lg-4 mb-4">
                    <div className="card text-center shadow-sm h-100">
                        <div className="card-body">
                            <div className="mb-2 mb-md-3">
                                <span className="display-4 fw-bold">1000+</span>
                            </div>
                            <h4 className="card-title mb-0">Happy Pets</h4>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 mb-4">
                    <div className="card text-center shadow-sm h-100">
                        <div className="card-body">
                            <div className="mb-2 mb-md-3">
                                <span className="display-4 fw-bold">500+</span>
                            </div>
                            <h4 className="card-title mb-0">Satisfied Owners</h4>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-4 mb-4">
                    <div className="card text-center shadow-sm h-100">
                        <div className="card-body">
                            <div className="mb-2 mb-md-3">
                                <span className="display-4 fw-bold">24/7</span>
                            </div>
                            <h4 className="card-title mb-0">Pet Care Availability</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Milestones;
