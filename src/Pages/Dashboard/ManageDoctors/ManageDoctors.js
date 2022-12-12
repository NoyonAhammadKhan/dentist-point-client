import { useQuery } from '@tanstack/react-query';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {
    const [deletingDoctor,setDeletingDoctor]=useState(null);
    const closeModal=()=>{
      setDeletingDoctor(null);
    }
   
    const {data: doctors=[],isLoading,refetch}=useQuery({
        queryKey:['doctors'],
        queryFn:async()=>{
            try{
                const res =await fetch('http://localhost:5000/doctors',{
                    headers:{
                        authorization:`Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            }
            catch(e){

            }
        }
    })
    const handleDeleteDoctor=doctor=>{
      fetch(`http://localhost:5000/doctors/${doctor._id}`,{
        method:'DELETE',
        headers:{
          authorization:`Bearer ${localStorage.getItem('accessToken')}`
        }
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.deletedCount > 0){
          refetch();
          toast.success(`Doctor ${doctor.name} deleted successfully`)
        }
       
      })
    }
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <h1>manage doctor:{doctors?.length}</h1>
            <div className="overflow-x-auto">
  <table className="table w-full">

    <thead>
      <tr>
        <th></th>
        <th>Avatar</th>
        <th>Name</th>
        <th>Email</th>
        <th>Speciality</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    
      {
        doctors.map((doctor,i)=><tr key={doctor._id}>
            <th>{i+1}</th>
            <td>

            <div className="avatar">
            <div className="w-24 rounded-full">
                <img src={doctor.image} alt='' />
            </div>
            </div>
            </td>
            <td>{doctor.name}</td>
            <td>{doctor.email}</td>
            <td>{doctor.speciality}</td>
            <td><label onClick={()=>setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-sm">Delete</label>
            </td>
       
            
          </tr>)
      }
     
    
    </tbody>
  </table>
  
</div>  {
    
    deletingDoctor && <ConfirmationModal
    title={`Are you sure you want to delete?`}
    message={`If you delete ${deletingDoctor.name}. It cannot be undone`}
    closeModal={closeModal}
    successAction={handleDeleteDoctor}
    modalData={deletingDoctor}
    successButtonName={`Delete`}
    ></ConfirmationModal>
    
}
        </div>
    );
};

export default ManageDoctors;