import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const MyAppoinment = () => {
    const {user}=useContext(AuthContext);
    const url =`http://localhost:5000/bookings?email=${user?.email}`

    const {data:bookings=[],isLoading}=useQuery({
        queryKey:['bookings',user?.email],
        queryFn:async()=>{
            const res = await fetch(url,{
                headers:{
                    authorization:`Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data=await res.json();
            return data;
        }
    })
    if(isLoading){
        return <Loading></Loading>
    }
    console.log(localStorage.getItem('accessToken'))
    return (
        <div>
            <h1 className='text-3xl mb-5 text-center'>My Appoinments</h1>
            <div className="overflow-x-auto">
              <table className="table w-full">
    
            <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Treatment</th>
                <th>Date</th>
                <th>Time</th>
                <th>Payment</th>
            </tr>
            </thead>
            <tbody>
        {
         bookings &&  bookings.map((booking,i)=><tr key={booking._id}>
            {console.log(booking)}
                <th>{i+1}</th>
                <td>{booking.patient}</td>
                <td>{booking.treatment}</td>
                <td>{booking.appoinmentDate}</td>
                <td>{booking.slot}</td>
                <td>{
                        booking.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-primary btn-sm'>Pay</button></Link>
                    }
                    {
                        booking.price && booking.paid && <span className='text-primary'>paid</span>
                    }</td>
                
            </tr> )
        }
        </tbody>
        </table>
        </div>
        </div>
    );
}

export default MyAppoinment;