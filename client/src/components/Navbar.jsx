import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const { currentUser } = useSelector((state) => state.user)
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
                <Link to='/profile'>
                    {currentUser ? (
                        <img src={currentUser.profilePicture} alt="profile" className='h-7 w-7 rounded-full object-cover' />
                    ) : (
                        <li className='font-bold'>Login</li>
                    )} 
                </Link>
            </ul>
        </div>
    </div>
  )
}
