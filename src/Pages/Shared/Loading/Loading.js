import React from 'react';

const Loading = () => {
    return (
        <div>
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full" role="status">
             <span className="visually-hidden"></span>
        </div>
        </div>
    );
};

export default Loading;