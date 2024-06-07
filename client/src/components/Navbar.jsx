// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='bg-slate-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
                <h1 className='font-bold'>Auth App</h1>
            </Link>
            <ul className='flex gap-4'>
                <Link to='/'>
                    <li className='font-bold'>Home</li>
                </Link>
                <Link to='/about'>
                    <li className='font-bold'>About</li>
                </Link>
                <Link to='/login'>
                    <li className='font-bold'>Login</li>
                </Link>
                <Link to='/signup'>
                    <li className='font-bold'>Sign Up</li>
                </Link>
            </ul>
        </div>
    </div>
  )
}
