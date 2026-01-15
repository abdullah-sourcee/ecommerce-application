import React from 'react';

type Props = {
  label: string;
  options: string[];
  id: string;
  register: any;
};

const CustomDropdown = ({ label, options, id, register }: Props) => {
  return (
    <div className='flex flex-col items-center'>
      <label htmlFor={id} className='mb-2 font-medium'>
        {label}:
      </label>
      <select
        id={id}
        {...register}
        className='w-full max-w-xs select select-bordered'
      >
        {options.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;
