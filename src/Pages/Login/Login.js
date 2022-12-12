import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';
const Login = () => {
    const {register,handleSubmit,formState:{errors}}=useForm()
    const [data,setData]=useState('');
    const {signIn}=useContext(AuthContext);
    const [loginError,setLoginError]=useState('');
    const [loginUserEmail,setLoginUserEmail]=useState('');
    const [token]=useToken(loginUserEmail)
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    if(token){
        navigate(from,{replace:true})
    }

    const handleLogin=data=>{
        setLoginError('');
        console.log(data);
        signIn(data.email,data.password)
        .then(res=>{
            const user = res.user;
            console.log(user);
            setLoginUserEmail(data.email);
            

        })
        .catch(error=>{
            console.log(error)
            setLoginError(error.message)
        })
    }
    return (
        <div className='h-[800px]  flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                  
                    <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" 
                    {...register("email",{required:"Email is Required"})}
                     className="input input-bordered w-full max-w-xs"/>
                        {errors.email && <p role="alert" className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password"
                     {...register("password",{required:"Password is required",
                    minLength:{value:6, message:'Passsword must be 6 characters or longer'}
                    })}
                      className="input input-bordered w-full max-w-xs"/>
                      {errors.password && <p role="alert" className='text-red-600'>{errors.password?.message}</p>}
                    <label className="label">
                        <span className="label-text">Forgot Password?</span>
                    </label>
                    </div>
                    
                    <input className='btn btn-accent w-full' value="login" type="submit"/>
                </form>
                <p>New to Doctors Portal <Link className='text-secondary' to="/signup">Create New Account?</Link> </p>
                <div>
                    {loginError && <p>{loginError}</p>}
                </div>
                <div className="divider">OR</div>

                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;