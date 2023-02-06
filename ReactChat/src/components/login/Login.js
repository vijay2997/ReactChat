import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { ParentContext } from '../../App';

function Login() {
    const initialValues = { email: "", password: ""};
    const { auth, setAuth } = useContext(ParentContext);
    const [value] = useState(initialValues);
    const [submit,setSubmit] = useState(true);
    const navigate = useNavigate();

    const SignInSchema = Yup.object().shape({
        email: Yup.string().email().required("Email is required"),
    
        password: Yup.string()
          .required("Password is required")
          .min(4, "Password is too short - should be 4 chars minimum"),
      });

      const handleSubmit = (values) => {
        localStorage.setItem("email",values.email);
        setAuth(true);
        navigate("/dashboard");
      }

      function onChange(value) {
        setSubmit(false);
      }
      
  return (
    <>     
   <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
     <Formik
       initialValues={value}
       validationSchema={SignInSchema}
       onSubmit={handleSubmit}
       enableReinitialize
     >
       {(formik) => {
         const { errors, touched, isValid, dirty } = formik;
         return (
           <Grid container spacing={0} >
             <Grid item xs={12} style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} >
               <Card >
                 <Box sx={{ display: "flex", flexDirection: "column" }}>
                   <CardHeader>Login </CardHeader>
                   <CardContent sx={{ flex: "1 0 auto" }}>
                     <form onSubmit={(e) => {
                       e.preventDefault();
                       formik.handleSubmit(e);
                     }} noValidate>
                       <h3>Log in to your account</h3>

                       <TextField
                         inputProps={{ "data-testid": "email" }}
                         sx={{ width: 350 }}
                         id="email"
                         variant="standard"
                         name="email"
                         label="Email*"
                         autoComplete="off"
                         value={formik.values.email}
                         onChange={formik.handleChange}
                         className={
                           errors.email && touched.email
                             ? "input-error form-control mt-1"
                             : "mb-3"
                         }
                         error={touched.email && Boolean(errors.email)}
                       />
                       <br/>
                       <ErrorMessage
                         name="email"
                         component="span"
                         className="error"
                       />{" "}<br />
                       <div className="rel">
                       <TextField
                         inputProps={{ "data-testid": "password" }}
                         sx={{ width: 350 }}
                         id="password"
                         variant="standard"
                         name="password"
                         label="Password*"
                         value={formik.values.password}
                         onChange={formik.handleChange}
                         autoComplete = "off"
                         className={
                           errors.password && touched.password
                             ? "input-error form-control mt-1"
                             : "mb-3"
                         }
                         error={touched.password && Boolean(errors.password)}
                       />
                        </div>
                       <ErrorMessage
                         name="password"
                         component="span"
                         className="error"
                       /><br />
                        
                        <ReCAPTCHA
                          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                          onChange={onChange}
                        />
                     <div className="flex mt15">
                       <Button color="primary" variant="contained" data-testid="submitButton" style={{ width: "350" }} type="submit" 
                       className=" btn btn-primary"
                         //disabled={submit}
                         >
                         Login
                       </Button>
                       </div>
                       </form>
                   </CardContent>
                 </Box>
               </Card>
             </Grid>
           </Grid>
         );
       }}
     </Formik>
   </div>
   </>
  )
}

export default Login