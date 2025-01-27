import React, { useEffect, useState } from "react";
import CountryCode from "../../../data/countrycode.json";
// import { apiConnector } from "../../services/apiconnector"
// import { contactusEndpoint } from "../../services/apis"
import { useForm } from "react-hook-form";

function RightSideForm() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      setLoading(true);
      // const res = await apiConnector(
      //     "POST",
      //     contactusEndpoint.CONTACT_US_API,
      //     data
      // )
      // console.log("Email Res - ", res)
      setLoading(false);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        phonenumber: "",
        message: "",
      });
    }
  });
  return (
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      <div>
        <h1 className="text-3xl w-[70%] text-white">
          Got a Idea? We’ve got the skills. Let’s team up
        </h1>

        <p>Tall us more about yourself and what you’re got in mind.</p>
      </div>

      <form
        className="flex flex-col gap-7"
        onSubmit={handleSubmit(submitContactForm)}
      >
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="firstname" className="lable-style">
              First Name
            </label>

            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="form-style p-1 bg-richblack-700 rounded text-white"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your name.
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="lastname" className="lable-style">
              Last Name
            </label>

            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter last name"
              className="form-style p-1 bg-richblack-700 rounded text-white"
              {...register("lastname")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="lable-style">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
            className="form-style p-1 bg-richblack-700 rounded text-white"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your Email address.
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phonenumber" className="lable-style">
            Phone Number
          </label>

          <div className="flex gap-5">
            <div className="flex w-[81px] flex-col gap-2">
              <select
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter first name"
                className="form-style p-1 bg-richblack-700 rounded text-white"
                {...register("countrycode", { required: true })}
              >
                {CountryCode.map((ele, i) => {
                  return (
                    <option key={i} value={ele.code}>
                      {ele.code} -{ele.country}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex w-[calc(100%-90px)] flex-col gap-2">
              <input
                type="text"
                name="phonenumber"
                id="phonenumber"
                placeholder="Phone Number"
                className="form-style p-1 bg-richblack-700 rounded text-white"
                {...register("phoneNo", {
                  required: {
                    value: true,
                    message: "Please enter your Phone Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Phone Number" },
                  minLength: { value: 10, message: "Invalid Phone Number" },
                })}
              />
            </div>
          </div>
          {errors.phoneNo && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.phoneNo.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="lable-style">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="7"
            placeholder="Enter your message here"
            className="form-style p-1 bg-richblack-700 rounded text-white"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your Message.
            </span>
          )}
        </div>

        <div className="flex items-center justify-center">
            <button type='submit'
                className=' w-[45%] rounded-md bg-yellow-50 text-center p-1 text-[16px] font-bold text-black'>
                Send Message
            </button>
        </div>
      </form>
    </div>
  );
}

export default RightSideForm;
