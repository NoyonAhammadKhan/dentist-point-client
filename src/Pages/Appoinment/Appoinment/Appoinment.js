import React, { useState } from 'react';
import AppoinmentBanner from '../AppoinmentBanner/AppoinmentBanner';
import AvailableAppoinmnets from '../AvailableAppoinments/AvailableAppoinmnets';

const Appoinment = () => {
    const [selectedDate, setSelectedDate]=useState(new Date());
    return (
        <div>
            <AppoinmentBanner setSelectedDate={setSelectedDate} selectedDate={selectedDate}></AppoinmentBanner>
            <AvailableAppoinmnets selectedDate={selectedDate}></AvailableAppoinmnets>
        </div>
    );
};

export default Appoinment;