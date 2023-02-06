import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Delete from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const Userlist = () => {
    const [user,setUser] = useState([]);
    const [values, setValues] = useState(false);
    const navigate = useNavigate();

    const toggle = (e) => (
      <>
        <div>
          <FormGroup>
            <FormControlLabel control={<Switch checked={e.row.active == 1 ? true : false} />} 
            label={e.row.active == 1 ? "Active" : "inActive"} />
          </FormGroup>
        </div>
  
      </>
    );

    const userColumns = [
        {
          headerName: "Username",
          field: "username",
          editable: false,
        },
        {
            headerName: "Email",
            field: "email_id",
            editable: false,
          },
        {
          headerName: "Userrole",
          field: "user_role",
          editable: false,
        },
        {
            headerName: "Designation",
            field: "designation",
            editable: false,
          },
          {
            headerName: "Division",
            field: "division",
            editable: false,
          },
          {
            headerName: "Section Office",
            field: "section_office",
            editable: false,
          },
          {
            headerName: "Location",
            field: "location",
            editable: false,
          },
          {
            headerName: "Mobile",
            field: "mobile",
            editable: false,
          },
          {
            headerName: "Active",
            field: "Active",
            editable: false,
            renderCell: toggle,
          },
          {

            headerName: "Actions.",
            field: "action",
            width: 130,
           renderCell: (row) => (row.id ? (
            <>
             <Tooltip title="Edit">
             <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
               onClick={() => navigate(`/user/edit/${row.id}`)}
               color="primary"
            />
            </Tooltip>
            </>
          ) : null),
          },
      ];
    const userList = async() => {
        await axios.get("https://fugk2m8ox2.execute-api.ap-south-1.amazonaws.com/dev/api/lookups?type=user")
            .then((response) => {
              console.log("response--->",response);
                setUser(response.data);
            })
    }
    useEffect(()=>{
        userList();
    },[]);
    return(
        <>
        <Button variant="contained" data-testid="assignProject" onClick={() => { navigate("/adduser"); }}>Add User</Button>
        <div style={{ height: 550, width: "100%" }}>
        <DataGrid columnBuffer={9} columns={userColumns} rows={user}/>
        </div>
        </>
    );

}

export default Userlist