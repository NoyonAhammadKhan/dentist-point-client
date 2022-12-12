import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_stripe_publishable_key);


const Payment = () => {
    
    const booking = useLoaderData();
    const navigation = useNavigation();
    
    const { treatment, price, appoinmentDate, slot } = booking;
    if(navigation.state==="loading"){
        return <Loading></Loading>
    }
    return (
        <div>
            <h3 className="text-3xl">Payment for {treatment}</h3>
            <p className='text-xl'>Please pay <strong>${price}</strong> form your appoinment on {appoinmentDate} at {slot}</p>
            <div className='w-96 my-6'>
            <Elements stripe={stripePromise}>
              <CheckoutForm
              booking={booking}
              />
            </Elements>
            </div>
        </div>
    );
};

export default Payment;