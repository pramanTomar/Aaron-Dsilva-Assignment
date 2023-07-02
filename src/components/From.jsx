import { Box, Button, Chip, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";

// In order to validate form using yup
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  gender: yup.boolean().required("required"),
  country: yup.string().required("required")
});


const hobbiesList = [
  'Listening Music',
  'E-Sports',
  'Sketching',
  'Travelling',
  'Badminton',
  'Volleyball',
  'Basketball',
  'Acting'
];

const initialValueRegister = {
    firstName: "",
    lastName: "",
    gender: "",
    country: ""
}


const Form = () => {

  const [hobbies, setHobbies] = useState([]);

  const handleFormSubmit = async (values, onSubmitProps) => {
    // Displaying Form Values
    window.alert(
      `Name: ${values.firstName} ${values.lastName} \nGender: ${values.gender} \nCountry: ${values.country} \nHobbies: ${hobbies}`
    );
    onSubmitProps.resetForm();
  }

  const handleChangeForHobbie = (event) => {
    const {
      target: { value },
    } = event;
    setHobbies(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
      <Box display='flex' flexDirection='column' alignItems='center' maxWidth='2000px' margin='auto'>
      <Box width="100%"  p="1rem 6%" textAlign="center" >
        <Typography fontWeight="bold" fontSize="36px" color="primary">
          Register From 
        </Typography>
      </Box>

      <Box width="75%">
        <Box width='100%' p="2rem" m="0rem auto" borderRadius="1.5rem" >
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={ initialValueRegister }
            validationSchema={registerSchema}
          >
            {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit
            }) => (
            <form onSubmit={handleSubmit}>
                <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                    "& > div": { gridColumn: "span 4" },
                }}
                >
                  <TextField label="First Name" onBlur={handleBlur} onChange={handleChange} value={values.firstName} name="firstName"
                      error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                      }
                      helperText={touched.firstName && errors.firstName}
                      sx={{ gridColumn: "span 2" }}
                  />

                  <TextField label="Last Name" onBlur={handleBlur} onChange={handleChange} value={values.lastName} name="lastName"
                      error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                      }
                      helperText={touched.lastName && errors.lastName}
                      sx={{ gridColumn: "span 2" }}
                  />

                  <FormControl name="gender">
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                      row
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>


                  <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                      id='country'
                      name='country'
                      value={values.country}
                      label="Country"
                      onChange={handleChange}
                    >
                      <MenuItem value="India">India</MenuItem>
                      <MenuItem value="Sweden">UK</MenuItem>
                      <MenuItem value="USA">USA</MenuItem>
                      <MenuItem value="Russia">Russia</MenuItem>
                    </Select>
                  </FormControl>


                  <FormControl fullWidth>
                    <InputLabel>Hobbies</InputLabel>
                    <Select
                      labelId="hobbies"
                      id="hobbies"
                      multiple
                      value={hobbies}
                      onChange={handleChangeForHobbie}
                      input={<OutlinedInput id="hobbies" label="hobbie" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      {hobbiesList.map((hobbie) => (
                        <MenuItem
                          key={hobbie}
                          value={hobbie}
                        >
                          {hobbie}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.hobbies && <p>{errors.hobbies.message}</p>}
                  </FormControl>
                </Box>
    
                {/* Submit Button */}
                <Box>
                  <Button fullWidth type="submit"
                      sx={{
                      m: "2rem 0",
                      p: "1rem",
                      backgroundColor: "cadetblue",
                      color: 'white',
                      "&:hover": {
                        color: "black"
                      }
                      }}
                  >
                      Submit
                  </Button>
                </Box>
            </form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
    </>
  )
}

export default Form;