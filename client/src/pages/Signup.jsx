import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

function Signup() {

  const [ formData, setFormData ] = useState({});
  const [ error, setError ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('/backend/auth_route/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data)
      setLoading(false);
      if (data.success == false) {
        setError(true);
      } else {
        setError(false);
        navigate('/login');
      }
      
    } catch (error) {
      setLoading(false);
      setError(true);
    }
    
  }
  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Username' 
          id="username" 
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange} />
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
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/login'>
          <span className='text-blue-500'>Login</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'There was an issue signing up'}</p>
    </div>
  )
}

export default Signup