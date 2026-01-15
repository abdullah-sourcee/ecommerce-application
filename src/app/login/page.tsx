'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { loginUser } from '@/lib/mutations';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginUserMutation = useMutation({
    mutationFn: (userData: LoginFormData) => loginUser(userData),
    onSuccess: (data) => {
      alert(`Success: ${data.message}`);
      reset();
    },
    onError: (error: any) => {
      console.log("error fromlogin is::",error?.response?.data?.message);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    },
  });

  // const handleLoginUser = async (e) => {
  //   e.preventDefault();
  //   const userData = {
  //     email: watch().email || '',
  //     password: watch().password || '',
  //   };

  //   loginUserMutation.mutate(userData);
  // };
  const handleLoginUser = (data: LoginFormData) => {
    loginUserMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handleLoginUser)}>
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
            minLength={6}
          />
        </div>
        {/* Login Button */}

        <div className='mt-3'>
          <button
            disabled={isSubmitting}
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
