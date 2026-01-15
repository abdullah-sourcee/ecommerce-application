'use client';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { createUser } from '@/lib/mutations';

type SignupFormData = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gender: string;
  acceptTerms: boolean;
  profileImage: any;
};

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
      gender: '',
      acceptTerms: false,
      profileImage: '',
    },
  });

  const createUserMutation = useMutation({
    mutationFn: (userData: FormData) => createUser(userData),
    onSuccess: () => {
      alert('User created');
      reset();
    },
    onError: (error: any) => {
      alert(`Error: ${error.response?.data?.error}`);
    },
  });

  const handleSignupUser = (data: SignupFormData) => {
    const profileImageFile = data.profileImage?.[0];

    const formData = new FormData();
    formData.append('name', data.name || '');
    formData.append('surname', data.surname || '');
    formData.append('email', data.email || '');
    formData.append('password', data.password || '');
    formData.append('confirmPassword', data.confirmPassword || '');
    formData.append('acceptTerms', data.acceptTerms ? 'true' : 'false');
    formData.append('dateOfBirth', data.dateOfBirth || '');
    formData.append('gender', data.gender || '');

    if (profileImageFile) {
      formData.append('profileImage', profileImageFile);
    }
    createUserMutation.mutate(formData);
  };

  return (
    <div className='flex items-center justify-center content-center flex-col'>
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit(handleSignupUser)}>
        {/* Name */}
        <div className='flex gap-8 mt-3'>
          <input
            {...register('name')}
            type='text'
            placeholder='First Name'
            className='input'
          />

          {/* Surname */}
          <input
            {...register('surname', { required: 'Surname is required' })}
            type='text'
            placeholder='Surname'
            className='input'
          />
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
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}
          </label>
          {/* <div className='validator-hint hidden'>Enter valid email address</div> */}
        </div>

        {/* Password */}
        <div className='mt-3'>
          <input
            {...register('password')}
            type='password'
            className='input validator'
            required
            placeholder='New Password'
            minLength={6}
          />
        </div>

        {/* Confirm Password */}
        <div className='mt-3'>
          <input
            {...register('confirmPassword')}
            type='password'
            placeholder='Confirm Password'
            className='input'
          />
        </div>
        {/* Date of Birth */}
        <div className='mt-3'>
          <label htmlFor=''>Date of Birth?</label>
          <input {...register('dateOfBirth')} type='date' className='input' />
        </div>

        {/* Gender */}
        <div className='mt-3 flex flex-col'>
          <label>Gender?</label>
          <div className='flex gap-3'>
            <label>Male</label>
            <input
              {...register('gender')}
              type='radio'
              value='male'
              className='radio radio-neutral'
            />
            <label>Female</label>
            <input
              {...register('gender')}
              type='radio'
              value='female'
              className='radio radio-neutral'
            />
          </div>
        </div>
        {/* Accept Terms */}
        <div className='mt-3 flex gap-3'>
          <fieldset className='fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4'>
            <legend className='fieldset-legend'>
              Accepts Terms and Conditions
            </legend>
            <label className='label'>
              <input
                type='checkbox'
                className='checkbox'
                {...register('acceptTerms')}
              />
              Agree?
            </label>
          </fieldset>
        </div>

        {/* Profile Image */}
        <div className='mt-3'>
          <input
            {...register('profileImage')}
            type='file'
            className='file-input'
          />
        </div>

        {/* Button */}
        <div className='mt-3'>
          <button type='submit' className='btn btn-wide mt-3 bg-blue-400'>
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
}
