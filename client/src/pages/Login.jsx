import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {

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
      const res = await fetch('/backend/auth_route/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setLoading(false);
      if (data.success == false) {
        setError(true);
      }
      setError(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(true);
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
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Need to create an account?</p>
        <Link to='/signup'>
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'There was an issue logging into your account'}</p>
    </div>
  )
}

export default Login