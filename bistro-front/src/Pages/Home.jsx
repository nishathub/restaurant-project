import React from 'react';

const Home = () => {
    return (
        <div>
            <h2 className='text-4xl text-center'>Home</h2>
            <div>
                <button className="btn btn-outline">Default</button>
                <button className="btn btn-outline btn-primary">Primary</button>
                <button className="btn btn-outline btn-secondary">Secondary</button>
                <button className="btn btn-outline btn-accent">Accent</button>
            </div>
        </div>
    );
};

export default Home;