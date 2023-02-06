import React, { useEffect, useState } from "react";
import { Formik, ErrorMessage } from "formik";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { GridActionsCellItem } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function Adduser() {
    const initialvalue = {
        username:"",
        password:"ab@123456",
        email_id:null,
        user_role:null,
        designation:null,
        division:null,
        section_office:null,
        location:null,
        mobile:null,
        active:1,
        created_by:23,
        division_id:1
    }
    const [userData,setUserdata]=useState(initialvalue);
    const [values, setValues] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const UserRole = [{name:"admin"},{name:"staff"}]

    const handleSubmit = async(values) => {
         if(id){
            values.id = id;
            await axios.put("https://fugk2m8ox2.execute-api.ap-south-1.amazonaws.com/dev/api/users",values)
            .then((response) => {
                navigate("/userlist");
             })
         }
         else{
         await axios.post("https://fugk2m8ox2.execute-api.ap-south-1.amazonaws.com/dev/api/users",values)
         .then((response) => {
            if(response.data.status == "success" && response.data.groundwater_data_id){
              navigate("/userlist");
            }
         })
        }

        
    }

    const handleChange = (value) => {
        console.log("changed")
    }
    const userDataSchema =Yup.object().shape({
        username: Yup.string()
          .min(2, "Too Short!")
          .required("Username is required"),
        
        user_role: Yup.string().required("Select the User Role"),

        mobile: Yup.string().required("Mobile Number is required"),

      });
      const userList = async() => {
        await axios.get("https://fugk2m8ox2.execute-api.ap-south-1.amazonaws.com/dev/api/lookups?type=user")
            .then((response) => {
                let a =response.data.find(data => data.id == id);
                setValues(a.active==1 ? true : false)
                setUserdata({...userData,...a})
            })
    }

    useEffect(() => {
      if(id){
        userList();
      }
    },[])
    
  return (
    <>
     <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto", margin: "0px 100px" }}>
            <p style={{ float: "left", fontSize: "22px", fontWeight: 500 }} className="fw-bolder">Add User</p>
            <div className="action-btn">
                          <Button
                            className="btn-fill pull-right update-profile"
                            type="submit"
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              navigate("/userlist");
                            }}
                          >
                            Back
                          </Button>
                          </div>
            <br />
            <br />
            <br />
            <Formik
              initialValues={userData}
              onSubmit={handleSubmit}
              validationSchema={userDataSchema}
              enableReinitialize
            >
              {(formik) => {
                const { errors, touched } = formik;
                return (

                  <form className="row g-3" onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit(e);
                  }} noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={6} className="p-1">
                          <TextField variant="standard" sx={{ width: 350 }} value={formik.values.username ? formik.values.username : ""}
                          onChange={formik.handleChange} type="text" id="username" name="username" label="Username*" className="form-control" autoComplete="off" />
                          <ErrorMessage
                            name="username"
                            component="span"
                            className="error"
                          />{" "}
                        </Grid>
                        <Grid item xs={6} className="p-1">
                          <TextField variant="standard" sx={{ width: 350 }} value={formik.values.email_id ? formik.values.email_id : ""}
                          onChange={formik.handleChange} type="text" id="email_id" name="email_id" label="Email*" className="form-control" autoComplete="off" />
                          <ErrorMessage
                            name="email_id"
                            component="span"
                            className="error"
                          />{" "}
                        </Grid>
                        <Grid item xs={6} className="p-1">
                          <TextField variant="standard" sx={{ width: 350 }} id="user_role"
                            select onChange={
                             (e) => {
                              handleChange(e.target.value);
                              formik.setFieldValue("user_role", e.target.value);
                            }}
                            name="user_role" value={ formik.values.user_role }
                            label="User Role*" className={
                              errors.user_role && touched.user_role
                                ? "form-control input-error mt-1"
                                : "form-control"
                            } autoComplete="off">
                            <MenuItem value="">Choose User Role</MenuItem>

                            {UserRole.map((role, index) => <MenuItem value={role.name} key={index}>{role.name}</MenuItem>)}
                            </TextField>
                          <ErrorMessage
                            name="user_role"
                            component="span"
                            className="error"
                          />{" "}

                        </Grid>
                        <Grid item xs={6} className="p-1">
                          <TextField variant="standard" sx={{ width: 350 }} value={formik.values.designation ? formik.values.designation : ""}
                          onChange={formik.handleChange} type="text" id="designation" name="designation" label="Designation*" className="form-control" autoComplete="off" />
                          <ErrorMessage
                            name="designation"
                            component="span"
                            className="error"
                          />{" "}
                        </Grid>
                        <Grid item xs={6} className="p-1">
                          <TextField variant="standard" sx={{ width: 350 }} value={formik.values.division ? formik.values.division : ""}
                          onChange={formik.handleChange} type="text" id="division" name="division" label="Division*" className="form-control" autoComplete="off" />
                          <ErrorMessage
                            name="division"
                            component="span"
                            className="error"
                          />{" "}
                        </Grid>
                        <Grid item xs={6} className="p-1">
                          <TextField variant="standard" sx={{ width: 350 }} value={formik.values.section_office ? formik.values.section_office : ""}
                          onChange={formik.handleChange} type="text" id="section_office" name="section_office" label="Section_office*" className="form-control" autoComplete="off" />
                          <ErrorMessage
                            name="section_office"
                            component="span"
                            className="error"
                          />{" "}
                        </Grid>
                        <Grid item xs={6} className="p-1">
                          <TextField variant="standard" sx={{ width: 350 }} value={formik.values.location ? formik.values.location : ""}
                          onChange={formik.handleChange} type="text" id="location" name="location" label="Location*" className="form-control" autoComplete="off" />
                          <ErrorMessage
                            name="location"
                            component="span"
                            className="error"
                          />{" "}
                        </Grid>
                        <Grid item xs={6} className="p-1">
                          <TextField variant="standard" sx={{ width: 350 }} value={formik.values.mobile ? formik.values.mobile : ""}
                          onChange={formik.handleChange} type="text" id="mobile" name="mobile" label="Mobile number*" className="form-control" autoComplete="off" />
                          <ErrorMessage
                            name="mobile"
                            component="span"
                            className="error"
                          />{" "}
                        </Grid>
                        <br/>
                        <br/>
                        <FormGroup>
                          <FormControlLabel name = "active" control={<Switch checked={formik.values.active == 1 ? true : false} />} 
                          onClick={(e) => { 
                              setValues(e.target.checked);
                              formik.setFieldValue("active",e.target.checked ? 1 : 0)
                           }} 
                          label={formik.values.active == 1 ? "Active" : "inActive"} />
                        </FormGroup>
                        <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <Grid item xs={12} className="p-1">
                        <div className="action-btn">
                          <Button
                            className="btn-fill pull-right"
                            type="submit"
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                              navigate("/userlist");
                            }}
                          >
                            cancel
                          </Button>&nbsp;&nbsp;

                          <Button
                            className="btn-fill pull-right update-profile"
                            type="submit"
                            variant="contained"
                            color="secondary"
                          >
                            submit
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                     </form>
                );
              }}
            </Formik>
            </CardContent>
            </Box>
          </Card >  
    </>
  )
}

export default Adduser