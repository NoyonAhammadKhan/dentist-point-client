import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const {register,handleSubmit,formState:{errors}}=useForm();
    const {createUser, updateUser}=useContext(AuthContext);
    const [signupError, setSignUpError]=useState('');
    const [createdUserEmail,setCreatedUserEmail]=useState('');
    const navigate=useNavigate();
    const [token]=useToken(createdUserEmail);

    if(token){
        navigate('/')
    }


    const handleSignUp=(data)=>{
        console.log(data);
        setSignUpError('');
        createUser(data.email,data.password)
        .then(result=>{
            const user = result.user;
            console.log(user);
            toast('User Created Successfully')
            const userInfo = {
                displayName:data.name
            }
            updateUser(userInfo)
            .then(()=>{
                saveUser(data.name, data.email)
            })
            .catch(error=>console.log(error))
        })
        .catch(err=>{
            console.log(err)
            setSignUpError(err.message)
        })
    }

    const saveUser=(name,email)=>{
        const user={name,email};
        fetch('http://localhost:5000/users',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log('saveuser',data)
           setCreatedUserEmail(email);

        })        
    }

    
    return (
        <div className='h-[800px]  flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>SignUp</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
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
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password"
                     {...register("password",
                     {required:'Password is required',
                     minLength:{value:6, message:"Password must be longer than 6 character"},
                     pattern:{value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,message:'PassWord must have uppercase number and special characters'}
                    })}
                      className="input input-bordered w-full max-w-xs"/>
                    {errors.password && <p>{errors.password?.message}</p>}
                    <label className="label">
                       <span className="label-text">Forgot Password?</span>
                    </label>
                    </div>
                    <input className='btn btn-accent w-full mt-4' value="SignUp" type="submit"/>
                    {signupError && <p className='text-red-600'>{signupError}</p>}
                </form>
                <p>Already have an acount?<Link className='text-secondary' to="/login">Please Login</Link> </p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default SignUp;