import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import { success } from 'daisyui/src/colors/colorNames';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';



const AddDoctor = () => {
    const {register,handleSubmit,formState:{errors}}=useForm();
    const imagehostkey=process.env.REACT_APP_imgbb_key;
    console.log('image host key',imagehostkey)
    const{data:specialties=[], isLoading}=useQuery({
        queryKey:['speciality'],
        queryFn:async()=>{
            const res =await fetch('http://127.0.0.1:5000/appoinmentSpeciality');
            const data =await res.json();
            return data;
        }
    })
    const navigate=useNavigate();
    const handleAddDoctor=(data)=>{
        
        const image=data.image[0];
        const formData=new FormData();
        formData.append('image',image);
        const url=`https://api.imgbb.com/1/upload?&key=${imagehostkey}` 
        fetch(url,{
            method:'POST',
            body:formData
        })  
        .then(res=>res.json())
        .then(imgData=>{
            console.log(imgData)
            if(imgData.success){
                console.log(imgData.data.url)
                const doctor={
                    name:data.name,
                    email:data.email,
                    speciality:data.speciality,
                    image:imgData.data.url
                }
                //save doctor info to the db
                fetch(`http://localhost:5000/doctors`,{
                    method:'POST',
                    headers:{
                        'content-type':'application/json',
                        authorization:`bearer ${localStorage.getItem('accessToken')}`
                    },
                    body:JSON.stringify(doctor)
                })
                .then(res=>res.json())
                .then(result=>{
                    console.log(result)
                    toast.success(`${data.name} is added successfully`);
                    navigate('/dashboard/managedoctors')
                })
            }
        })
    }
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='w-96 p-7'>
            <h1 className='text-4xl'>Add a doctor</h1>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" {...register("name",{required:'Name is required'})} className="input input-bordered w-full max-w-xs"/>
                    {errors.name && <p>{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" 
                    {...register("email",{required:"email is required"})}
                     className="input input-bordered w-full max-w-xs"/>
                     {errors.email && <p>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                    
                    <label className="label">
                       <span className="label-text">Speciality</span><br/>
                    <select {...register('speciality')} className="select input-border w-full max-w-xs">
                   
                    {
                        specialties.map(speciality=><option key={speciality._id} value={speciality.name}>{speciality.name}</option>
                        )
                    }
                    </select>
                    </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file" {...register("image",{required:'Photo is required'})} className="input input-bordered w-full max-w-xs"/>
                    {errors.img && <p>{errors.img?.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-4' value="Add  Doctor" type="submit"/>
                   
                </form>
        </div>
    );
};

export default AddDoctor;