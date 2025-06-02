"use client";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Courses_Schema from "@/Validations/Course_Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import BUtton from "@/Components/ui/BUtton";
import Input from "@/Components/ui/Input";
import SelectInput from "@/Components/ui/SelectInput";

const page = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(Courses_Schema),
    defaultValues: {
      courses: [{ course: "", credit: "", grade: "" }],
    },
    mode: "onSubmit", //only validate on submit
    shouldFocusError: false, //don't auto focus on first error field
  });

  //fields => array , remove => function , append => function

  const { fields, remove, append } = useFieldArray({
    control,
    name: "courses",
  });

  const HandleGapSubmit = (data) => {
    console.log(data, "data");
    CalculateGPA(data);
  };

  const [Gpa, SetGPA] = useState(null);

  const CalculateGPA = (data) => {
    //find sum of all credit hours
    const CourseArr = Object.values(data).flat();

    const total_crd = CourseArr.reduce((acc, item) => acc + item.credit, 0);

    let total_gradePoints = 0;

    CourseArr.forEach((course) => {
      let gradePoint = 0;

      switch (course.grade.toUpperCase()) {
        case "A":
          gradePoint = 4;
          break;
        case "A-":
          gradePoint = 3.67;
          break;
        case "B+":
          gradePoint = 3.33;
          break;
        case "B":
          gradePoint = 3;
          break;
        case "B-":
          gradePoint = 2.67;
          break;
        case "C+":
          gradePoint = 2.33;
          break;
        case "C":
          gradePoint = 2;
          break;
        case "F":
        default:
          gradePoint = 0;
      }

      const credit = parseFloat(course.credit);
      total_gradePoints = total_gradePoints + credit * gradePoint;
    });

    const GPA = total_crd > 0 ? (total_gradePoints / total_crd).toFixed(2) : 0;
    SetGPA(GPA);
  };

  return (
    <div className="w-full h-screen ">
      <form
        onSubmit={handleSubmit(HandleGapSubmit)}
        className="max-w-2xl mx-auto mt-10 p-4 border rounded-lg space-y-4"
      >
        <h2 className="text-xl font-bold text-center">GPA Calculator</h2>

        {fields.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-4 gap-x-2 items-end border p-3 rounded"
          >
            {/* course name  */}
            <div className="flex flex-col gap-1">
              <label className="block font-medium">Course Name</label>
              {
                <Input
                placeholder="eg: Mathematics"
                className="w-full p-2 border rounded"
                register={register(`courses.${index}.course`)}
                errors={errors}
                index={index}
                label="course"
                />
              }
            </div>

            {/* credits  */}
            <div className="flex flex-col gap-1">
              <label className="block font-medium">Credits</label>
              {
                <Input
                placeholder="e.g: 3"
                className="w-full p-2 rounded border"
                errors={errors}
                index={index}
                label = "credit"
                register = {register(`courses.${index}.credit`)}
                />
              }
            </div>

            {/* grade  */}
             {
                 <SelectInput
                 errors={errors}
                 index={index}
                 register={register(`courses.${index}.grade`)}
                 className="w-full p-2 rounded border bg-white"
                />
             }

            {/* remove  */}
            <div className="flex justify-end gap-2">

              {
                <BUtton
                OnRemove={()=>remove(index)}
                className = "bg-red-500 text-white px-3 py-2 rounded cursor-pointer"
                text="remove"
                />
              }
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center">
          {
            <BUtton
            type="button"
            onAdd = {()=>append({ course: "", credit: "", grade: "" })}
            className = "bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
            text="Add Course"
            />
          }

          {Gpa !== null && (
            <p className="text-lg font-semibold text-green-600">
              <span className="hidden md:inline">GPA : </span>
              <span className="md:hidden">{Gpa}</span>
              <span className="hidden md:inline">{Gpa}</span>
            </p>
          )}

          {
            <BUtton
            type="submit"
            className = "bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
            text = "Calculate Gpa"
            />
          }
        </div>
      </form>
    </div>
  );
};

export default page;
