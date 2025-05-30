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
        .oneOf(['A','A-','B+','B','B-','C+','C','F'],"Invalid grade")
        .required("Grade is required!")
        
    })
  )  
})

export default Courses_Schema