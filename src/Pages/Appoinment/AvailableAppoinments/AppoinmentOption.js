import React from 'react';

const AppoinmentOption = ({appoinmentOption,setTreatment}) => {
    const {name, slots,price}=appoinmentOption
    return (
        <div>
            <div className="card shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-2xl text-secondary text-bold text-center">{name}</h2>
                <p>{slots.length >0 ? slots[0]: 'Try Another Day'}</p>
                <p>{slots.length}{slots.length > 1 ? 'spaces' :' space'} available</p>
                <p><small>Price:${price}</small></p>
                <div className="card-actions justify-center">
                <label disabled={slots.length === 0} onClick={()=>setTreatment(appoinmentOption)} htmlFor="booking-modal" className="btn btn-primary">Book Appoinment</label>
                </div>
        </div>
    </div>
        </div>
    );
};

export default AppoinmentOption;