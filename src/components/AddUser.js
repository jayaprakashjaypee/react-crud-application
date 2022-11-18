import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from 'yup';

import '../css/Adduser.css';



const formValidation =  yup.object({

  FirstName: yup.string().required("You Forgot To Write First Name😱"),
  LastName: yup.string().required("You Forgot To Write Last Name😱"),
  Email: yup.string().required("You Forgot To Write Email 🥺🥺"),
  Password : yup.string().required("You Forgot To put Password🥺")
            .min(8,"Minimum length Should Be 8 😤")
            .max(20,"Maximum length is 20 😅"),

  CPassword: yup.string().required("You Forgot To Confirm your Password🥺")
            .min(8,"Minimum length Should Be 8 😤")
            .max(20,"Maximum length is 20 😅")
            .oneOf([yup.ref('Password'), null], 'Passwords must match'),
});


 
export function AddUser() 
{

      const history = useHistory();
      const [message ,setMessage] = useState([]);

      const [allusers, setAllusers] =useState();
      
  

    const {handleSubmit , handleChange , handleBlur, values, errors, touched} = useFormik ({

    initialValues : {FirstName:"", LastName:"", Email:"", Password:"", CPassword:""},
    // validate : formValidation,
    validationSchema: formValidation,
    onSubmit : (values) =>{
                            console.log("OnSubmit",values);
                            registration(values);
                            
                          }
    
    });

    
    useEffect( async ()=>{ 

      // localStorage.setItem('allusers',alllUsersData);
      setAllusers(JSON.parse(localStorage.getItem('allusers') ))
      setMessage(``);
    },[]);

    //whenever userlist updates update localStorage
    useEffect( async ()=>{ 

    localStorage.setItem('allusers',JSON.stringify(allusers) );
    
    },[allusers]);

    

const registration = async (values) =>{


              console.log("Registering..",values);
              const NewUser = {
                                firstName:values.FirstName,
                                lastName:values.LastName,
                                email:values.Email,
                                password:values.Password

                              }
              setAllusers([...allusers ,NewUser ])
              setMessage(`User Added Succesfully 😁`);
              

};

    console.log("allUsers",allusers)   
        


  return (

    <div className=" addUserForm container   text-center">
      <div className="my-3 pt-3">
        <i className="bi bi-person-circle "></i>
        <h2 className="adduser-title"> ADD USER</h2>
      </div>


      <form onSubmit={handleSubmit} >

        <div className="form-group mt-4">
          <label>First Name :</label>
          <input 
                type="text"    
                value={values.FirstName} 
                onChange={handleChange} 
                onBlur={handleBlur}
                name="FirstName"     
                placeholder="First Name" 
                required />
        </div>
        <div className="text-danger px-5 position-absolute">
            <div >
                {errors.FirstName && touched.FirstName && errors.FirstName}
            </div>
        </div>

        <div className="form-group mt-4">
          <label>Last Name :</label>
          <input 
                type="text" 
                value={values.LastName} 
                onChange={handleChange} 
                onBlur={handleBlur}
                name="LastName" 
                placeholder="Last Name" 
                required />
        </div>
        <div className="text-danger px-5 position-absolute">
            <div >
                {errors.LastName && touched.LastName && errors.LastName }
            </div>
        </div>
        
        <div className="form-group mt-4">
          <label>Email :</label>
          <input 
                type="Email" 
              
                value={values.Email} 
                onChange={handleChange} 
                onBlur={handleBlur}
                name="Email" 
                placeholder="sample@gmail.com" 
                required />
        </div>

        <div className="text-danger px-5 position-absolute">
            <div >
                { errors.Email && touched.Email && errors.Email }
            </div>
        </div>

        <div className="form-group mt-4">
          <label>Password :</label>
          <input 
                type="password" 
                value={values.Password} 
                onChange={handleChange} 
                onBlur={handleBlur}
                name="Password" 
                autoComplete="new-password"
                placeholder="******" 
                required />
        </div>
      
        <div className="text-danger px-5 position-absolute">
            <div >
                {errors.Password && touched.Password && errors.Password }
            </div>
        </div>

        <div className="form-group mt-4">
          <label> Confirm Password :</label>
          <input 
                type="password" 
                value={values.CPassword} 
                onChange={handleChange} 
                onBlur={handleBlur}
                name="CPassword" 
                autoComplete="new-password"
                placeholder="******" 
                required />
        </div>

        <div className="text-danger px-5 position-absolute">
            <div >
                { errors.CPassword && touched.CPassword&& errors.CPassword }
            </div>
        </div>

      
       <div className="text-success mt-4 text-center ">
                {message} 
        </div>
        <button className=" btn mt-3 px-4 add-btn " type="submit" name="submit" >ADD USER</button>
    
        



      </form>

    </div>


  );

}
