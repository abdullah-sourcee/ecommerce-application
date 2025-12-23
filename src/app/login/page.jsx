'use client';

import { loginUser } from '@/lib/mutations';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { CloudCog } from 'lucide-react';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const loginUserMutation = useMutation({
    mutationFn: (userData) => loginUser(userData),
    onSuccess: () => {
      alert('User successfully login');
    },
    onError: (error) => {
      alert(`Error: ${error.response.data.message}`);
    },
  });

  const handleLoginUser = async (e) => {
    e.preventDefault();
    const userData = {
      email: watch().email || '',
      password: watch().password || '',
    };

    loginUserMutation.mutate(userData);
  };
  // console.log(watch);

  return (
    <form>
      <div className='flex items-center justify-center content-center flex-col'>
        <div>
          <h1>Login Page</h1>
        </div>
        {/* Email */}
        <div className='mt-3'>
          <label className='input validator'>
            <svg
              className='h-[1em] opacity-50'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              <g
                strokeLinejoin='round'
                strokeLinecap='round'
                strokeWidth='2.5'
                fill='none'
                stroke='currentColor'
              >
                <rect width='20' height='16' x='2' y='4' rx='2'></rect>
                <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'></path>
              </g>
            </svg>
            <input
              type='email'
              placeholder='mail@site.com'
              required
              {...register('email')}
            />
          </label>
          <div className='validator-hint hidden'>Enter valid email address</div>
        </div>

        {/* password */}
        <div className='mt-3'>
          {/* <input type='password' placeholder='Password Here' /> */}
          <input
            {...register('password')}
            type='password'
            className='input validator'
            required
            placeholder='Password'
            minLength='6'
            // pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
            // title='Must be more than 8 characters, including number, lowercase letter, uppercase letter'
          />
          {/* <p className='validator-hint'>
          Must be more than 8 characters, including
          <br />
          At least one number
          <br />
          At least one lowercase letter
          <br />
          At least one uppercase letter
        </p> */}
        </div>
        {/* Login Button */}

        <div className='mt-3'>
          <button
          disabled={isSubmitting}
            onClick={handleLoginUser}
            type='submit'
            className='btn btn-wide mt-3 bg-blue-400'
          >
            Login{' '}
          </button>
        </div>
      </div>
    </form>
  );
}
