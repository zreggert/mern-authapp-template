import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';


export default function OAuth() {
  // const { loading, error } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleGoogleSignin = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginStart());
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);


      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/backend/auth_route/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        })
      });
      const data = await res.json();
      dispatch(loginSuccess(data));
      navigate('/')

    } catch (error) {
        console.log("There was an issue logging in with your Google account.")
    }
}


    return (
        <button 
          type='button' 
          onClick={handleGoogleSignin} 
          className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>
          Continue with Google
        </button>
  )
}
