'use client';

import { createUser } from '@/lib/mutations';
import { useMutation } from '@tanstack/react-query';
import { Sunrise } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const createUserMutation = useMutation({
    mutationFn: (userData) => createUser(userData),
    onSuccess: () => {
      alert('User created');
    },
    onError: (error) => {
      alert(`Error: ${error.response.data.message}`);
    },
  });

  // const onSubmit = async (data) => {
  //   console.log('Form submitted', data);
  // };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    // Get the file from the form
    const profileImageFile = watch().profileImage?.[0];

    // Create FormData for multipart/form-data
    const formData = new FormData();

    // Append all form fields
    formData.append('name', watch().firstName || '');
    formData.append('surname', watch().surname || '');
    formData.append('email', watch().email || '');
    formData.append('password', watch().password || '');
    formData.append('confirmPassword', watch().confirmPassword || '');
    formData.append('acceptTerms', watch().acceptTerms ? 'true' : 'false');
    formData.append('dateOfBirth', watch().dateOfBirth || '');
    formData.append('gender', watch().gender || '');

    // Append the file if it exists
    if (profileImageFile) {
      formData.append('profileImage', profileImageFile);
    }

    createUserMutation.mutate(formData);
  };

  // console.log(watch());

  return (
    <div className='flex items-center justify-center content-center flex-col'>
      <h1>Signup Page</h1>
      <form method='post'>
        {/* Name */}
        <div className='flex gap-8 mt-3'>
          <input
            {...register('firstName', { required: 'Name is required' })}
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
              {...register('email')}
            />
          </label>
          <div className='validator-hint hidden'>Enter valid email address</div>
        </div>

        {/* Password */}
        <div className='mt-3'>
          <input
            {...register('password')}
            type='password'
            className='input validator'
            required
            placeholder='New Password'
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
          {/* <label>Accept Terms?</label>
          <input type='checkbox' {...register('acceptTerms')} /> */}
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
          <button
            onClick={handleCreateUser}
            type='submit'
            className='btn btn-wide mt-3 bg-blue-400'
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}