import React, { useState } from 'react'

const Login = () => {

  const [state, setState] = useState('sign up');
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [name, setName] = useState('');

  // onSubmit handler
  const onSubmitHandler = (event) => {
    event.preventDefault();
  }
  return (
    <form className='flex flex-col items-center min-h-[80vh]'>
      <div className='flex flex-col m-auto gap-3 items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'sign up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'sign up' ? 'sign up' : 'login'} to book appointment</p>
        {
          state === 'sign up' &&
          <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-400 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} />
          </div>
        }
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-400 rounded w-full p-2 mt-1' type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-400 rounded w-full p-2 mt-1' type="text" onChange={(e) => setPassWord(e.target.value)} value={password} />
        </div>
        <button className='bg-primary w-full text-white py-2 rounded-md text-base'>{state === 'sign up' ? 'Create Account' : 'Login'}</button>
        {
          state === 'sign up' ?
            <p>Already have an account? <span onClick={() => setState('login')} className='text-primary underline cursor-pointer'>Login here</span></p>
            :
            <p>Create a new account: <span onClick={() => setState('sign up')} className='text-primary underline cursor-pointer'>click here</span> </p>
        }
      </div>
    </form>
  )
}

export default Login