import { format } from 'date-fns';
// import { sl } from 'date-fns/locale';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import toast, {} from 'react-hot-toast'
const BookingModal = ({treatment,selectedDate,setTreatment,refetch}) => {
    const {name:treatmentName,slots,price}=treatment;
    const date=format(selectedDate, 'PP');
    const {user}=useContext(AuthContext)

    const handleBooking=(event)=>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const slot=form.slot.value;
        const phone = form.phone.value;
        const booking={
            appoinmentDate:date,
            treatment:treatmentName,
            patient:name,
            slot,
            email,
            phone,
            price
        }

        fetch('http://localhost:5000/bookings',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(booking)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.acknowledged){
                setTreatment(null);
                toast.success('Booking Confirmation');
                refetch()
            }
        })
        console.log(booking);
        
    }
    return (
       <>
       <input type="checkbox" id="booking-modal" className="modal-toggle" />
        <div className="modal">
        <div className="modal-box relative">
            <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 className="text-lg font-bold">{treatmentName}</h3>
            <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                <input type="text" className="input w-full input-border" value={date} disabled/>
                <select name='slot' className="select select-bordered w-full">
                    <option>Select Your Slot</option>
                    {
                        slots.map((slot,i)=><option key={i} value={slot}>{slot}</option>)
                    }
                
                </select>
                <input name="name" type="text" defaultValue={user?.displayName} placeholder="Your Name" className="input w-full input-border" disabled/>
                <input name='email' defaultValue={user?.email} type="text" placeholder="Email Address" className="input w-full input-border" disabled/>
                <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-border" />
                
                <input type="submit" value="Submit" className='w-full max-w-xs btn btn-accent' />
            </form>
        </div>
        </div> 
       </>
    );
};

export default BookingModal;