"use client";
import React from 'react'

const SelectInput = ({className,errors,index,label,register}) => {
  return (
          <div className='flex flex-col gap-1 md:my-0 my-2'>
             <label className="block font-medium">Grade</label>
        <select {...register} className={className}>
            <option value="">Select Grade</option>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="F">F</option>
        </select>
       {errors?.courses?.[index]?.[label] && (
                <p className="text-sm text-red-500">
                  {errors?.courses[index]?.[label]?.message}
                </p>
              )}
               </div>
  )
}

export default SelectInput