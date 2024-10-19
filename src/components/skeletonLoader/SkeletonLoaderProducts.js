import React from 'react';
import './SkeletonLoader.scss'; 

const SkeletonLoader = () => {
    return (
        <div className="skeleton-container">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="skeleton-card">
                    <div className="skeleton-img"></div>
                    <div className="skeleton-text skeleton-price"></div>
                    <div className="skeleton-text skeleton-title"></div>
                    <div className="skeleton-button"></div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
