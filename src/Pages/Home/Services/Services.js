import React from 'react';
import fluroide from '../../../assets/images/fluoride.png';
import cavity from '../../../assets/images/cavity.png';
import whitening from '../../../assets/images/whitening.png';
import Service from './Service';


const Services = () => {
    const servicesData=[
        {
            id:1,
            name:'Fluoride Treatment',
            description:'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img:fluroide
        },
        {
            id:2,
            name:'Cavity Filling',
            description:'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img:cavity
        },
        {
            id:3,
            name:'Teeth Whitening',
            description:'Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the',
            img:whitening
        }
    ]
    return (
        <div className='mt-16'>
           <div className="text-center mb-5">
                <h3 className='text-3xl font-bold text-primary uppercase'>Our Services</h3>
                <h2 className='text-4xl'>Services We Provide</h2>
           </div>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    servicesData.map(service=><Service key={service.id} service={service}></Service>)
                }
           </div>
        </div>
    );
};

export default Services;