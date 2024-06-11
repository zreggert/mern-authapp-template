import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut
} from '../redux/user/userSlice.js'


export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [ image, setImage ]  = useState(undefined);
  const [ imagePercent, setImaginePercent ] = useState(0);
  const [ imageError, setImageError ] = useState(false);
  const [ formData, setFormData ] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [ updateSuccess, setUpdateSuccess ] = useState(false);
  

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImaginePercent(Math.round(progress));
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({...formData, profilePicture: downloadURL}));
      }
    )
  };
  const handleUpdate = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/backend/user_route/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data  = await res.json()
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error))
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/backend/user_route/delete/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error))
    }
  };

  const handleSignout = async () => {
    try {
      await fetch(`/backend/auth_route/signout`, {
        method: 'GET',
        credentials: 'include'
      })
      dispatch(signOut());
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(event) => setImage(event.target.files[0])} />
        <img 
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="'text-red-700">Error uploading image</span>) 
            : (imagePercent > 0 && imagePercent < 100 ) ? (
              <span className="text-slate-700">{`Uploading: ${imagePercent}%`}</span>) 
              : (imagePercent === 100) ? (
                <span className="text-green-700">Image uploaded successfully</span>) : ("")            
          }
        </p>
        <input defaultValue={currentUser.username} type="text" id="username" placeholder="Username" className="bg-slate-100 rounded-lg p-3" onChange={handleUpdate} />
        <input defaultValue={currentUser.email} type="email" id="email" placeholder="Email" className="bg-slate-100 rounded-lg p-3" onChange={handleUpdate}/>
        <input type="password" id="password" placeholder="Password" className="bg-slate-100 rounded-lg p-3" onChange={handleUpdate} />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? 'Loading...' : 'Update'}</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDelete}>Delete Account</span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignout}>Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong"}</p>
      <p className="text-green-700 mt-5">{updateSuccess && "User has been updated successfully!"}</p>
    </div>
  )
}
