import React from 'react'
import Login from './Login';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' id="username" className='bg-slate-100 p-3 rounded-lg' />
        <input type="text" placeholder='Email' id="email" className='bg-slate-100 p-3 rounded-lg' />
        <input type="password" placeholder='Password' id="password" className='bg-slate-100 p-3 rounded-lg' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/login'>
          <span className='text-blue-500'>Login</span>
        </Link>
      </div>
    </div>
  )
}

export default Signup