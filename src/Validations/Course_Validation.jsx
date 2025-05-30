import * as yup from "yup"

const Courses_Schema = yup.object().shape({
  courses : yup.array().of(
    yup.object().shape({
        course : yup.string().required("Course Name required!"),

        credit : yup.number()
        .typeError("Credit must be a number!")
        .positive("Credit must be greater than 0")
        .required("credit hours are required!"),

        grade : yup.string()
        .required("Grade is required!")
        .matches(/^[ABCDF]$/,"Enter grade A, B, C, D or F")
    })
  )  
})

export default Courses_Schema