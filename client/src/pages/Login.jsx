import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

function Login() {

  const [ formData, setFormData ] = useState({});
  const { loading, error } = useSelector((state) => state.user)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch('/backend/auth_route/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (data.success === false) {
        dispatch(loginFailure(data));
      } else {
        dispatch(loginSuccess(data));
        navigate('/');
      }
      
    } catch (error) {
      dispatch(loginFailure(error));
    }
    
  }
  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Login</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Email' 
          id="email" 
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange} />
        <input 
          type="password" 
          placeholder='Password' 
          id="password" 
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Login</button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Need to create an account?</p>
        <Link to='/signup'>
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error ? error.message || 'There was an issue logging into your account' : ""}</p>
    </div>
  )
}

export default Login