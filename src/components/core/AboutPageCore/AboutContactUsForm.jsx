import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import CountryCode from "../../../data/countrycode.json"
import apiConnector from "../../../ServicesAPI/apiConnector"

function AboutContactUsForm () {

    const [loading, setLoading] = useState(false)
    const  {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessfull}
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("Logging Data", data)
        try{

            setLoading(true)
            // const responce = await apiConnector("PORT", contactusEndpoint.CONTACT_US_API, data)
            const responce = {status: "OK"}
            console.log("Logging responce", responce)
            setLoading(false)
        }catch(error){

            console.log("Error", error.message)
            setLoading(false)

        }
    }

    useEffect( () => {
        if(isSubmitSuccessfull) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset, isSubmitSuccessfull] );

    return (
        <div>
            <form onSubmit={handleSubmit(submitContactForm)}>

                <div className='flex flex-col gap-8'>

                    {/* First Name And Last Name */}
                    <div className='flex gap-5'>

                        {/* First Name */}
                        <div className='flex flex-col justify-center w-[45%]'>
                            <label htmlFor='firstname'>First Name</label>
                            <input  
                                type='text'
                                name='firstname'
                                id='firstname'
                                placeholder='Enter first name'
                                className='text-white w-[100%] rounded p-1 bg-richblack-700'
                                {...register("firstname", {required:true})}
                            />
                            {
                                errors.firstname && (
                                    <span>
                                        Please enter Your name
                                    </span>
                                )
                            }
                        </div>

                        {/* Last Name */}
                        <div className='flex flex-col w-[45%]'>
                            <label htmlFor='lastname'>Last Name</label>
                            <input  
                                type='text'
                                name='lastname'
                                id='lastname'
                                placeholder='Enter last name'
                                className='text-white w-[100%] rounded p-1 bg-richblack-700'
                                {...register("lastname")}
                            />
                        </div>

                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email">Enter Your Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Your Email"
                            className='text-white p-1 rounded bg-richblack-700'
                            {...register("email", {register:true})}
                        />

                        {
                            errors.email && (
                                <span>
                                    Please Enter Your Email Address
                                </span>
                            )
                        }
                    </div>

                    {/* phoneNo */}
                    <div className='flex flex-col'>

                        <label htmlFor='phonenumber'>Phone Number</label>

                        <div className='flex flex-row gap-1'>
                            {/* dropdown */}
                        
                                <select
                                    name='dropdown'
                                    id="dropdown"
                                    className='bg-richblack-700 text-white w-[11.5%] rounded'
                                    {...register("countrycode", {required:true})}
                                >
                                    {
                                        CountryCode.map( (element , index) => {
                                            return (
                                                <option key={index} value={element.code}>
                                                    {element.code} -{element.country}
                                                </option>
                                            )
                                        } )
                                    }
                                </select>
                                
                                <input
                                    type='text'
                                    name='phonenumber'
                                    id='phonenumber'
                                    placeholder='Phone Number'
                                    className='text-white w-[100%] p-1 rounded bg-richblack-700'
                                    {...register("phoneNo",  
                                    {
                                        required:{value:true, message:"Please enter Phone Number"},
                                        maxLength: {value:10, message:"Invalid Phone Number"},
                                        minLength:{value:8, message:"Invalid Phone Number"} })}
                                />
                        
                        </div>
                        {
                            errors.phoneNo && (
                                <span>
                                    {errors.phoneNo.message}
                                </span>
                            )
                        }

                    </div>

                    {/* Message Box */}
                    <div className="flex flex-col">
                        <label htmlFor="message">Message</label>
                        <textarea
                            type="text"
                            name="message"
                            id="message"
                            placeholder="Enter Your Message Here"
                            cols="30"
                            rows="7"
                            className='text-white bg-richblack-700 rounded'
                            {...register("message", {required:true})}
                        />
                        {
                            errors.message && (
                                <span>
                                    Please Enter Your Message
                                </span>
                            )
                        }
                    </div>

                    {/* Button Send Message */}
                    <div className="flex items-center justify-center">
                        <button type='submit'
                            className=' w-[45%] rounded-md bg-yellow-50 text-center p-1 text-[16px] font-bold text-black'>
                            Send Message
                        </button>
                    </div>

                </div>

            </form>
        </div>
  )
}


export default AboutContactUsForm;