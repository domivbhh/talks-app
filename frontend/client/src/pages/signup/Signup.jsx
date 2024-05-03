import React, { useState } from 'react'
import { Link } from "react-router-dom";
import GenderCheckbox from './GenderCheckbox'
import useSignup from '../../hooks/useSignup';

const Signup = () => {
	const[inputs,setInputs]=useState({
		fullname:'',
		username:'',
		password:'',
		confirmPassword:'',
		gender:''
	})

  const{loading,signup}=useSignup()

	const handleSubmit=async (e)=>{
		e.preventDefault()
     await signup(inputs)
	}



  const handleCheckBox=(gender)=>{
    setInputs({...inputs,gender})

  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <span className="text-blue-400 text-4xl font-semibold">Talks</span>

        <h1 className="text-1xl font-semibold text-center text-gray-300 mt-5">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="full name"
              className="w-full input input-bordered  h-10"
              value={inputs.fullname}
              onChange={(e) => {
                setInputs({ ...inputs, fullname: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="username"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) => {
                setInputs({ ...inputs, username: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) => {
                setInputs({ ...inputs, password: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) => {
                setInputs({ ...inputs, confirmPassword: e.target.value });
              }}
            />
          </div>

          <GenderCheckbox
            onCheckBoxChange={handleCheckBox}
            selectedGender={inputs.gender}
          />

          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
            href="#"
          >
            Already have an account?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Signup"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup
