import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  CardActions,
  Button,
  Modal,
} from "@mui/material";
import {
  Male,
  Female,
  HomeOutlined,
  PhoneIphoneOutlined,
  EmailOutlined,
} from "@mui/icons-material";

import { remove } from "../features/employees/employeesSlice";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Employee() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector((state) => state.employees.value);
  const [modalOpen, setModalOpen] = useState(false);

  const userData = employees.find((_) => _.login.uuid === params.uuid);

  const genderIcon =
    userData.gender === "male" ? (
      <Male className="EmployeeCard-icon" />
    ) : (
      <Female className="EmployeeCard-icon" />
    );

  return (
    <>
      <Card raised>
        <Button sx={{ marginTop: 2 }} onClick={() => navigate("/")}>
          &#9204; Back
        </Button>
        <CardHeader
          avatar={
            <Avatar alt="profile portrait" src={userData.picture.medium} />
          }
          title={
            <>
              {userData.name.first} {userData.name.last} {genderIcon}
            </>
          }
          subheader={userData.location.timezone.offset}
        ></CardHeader>
        <CardContent>
          <div style={{ lineHeight: "2em" }}>
            <HomeOutlined className="EmployeeCard-icon" />
            {userData.location.street.number} {userData.location.street.name}
            <br />
            <PhoneIphoneOutlined className="EmployeeCard-icon" />{" "}
            {userData.phone}
            <br />
            <EmailOutlined className="EmployeeCard-icon" /> {userData.email}
          </div>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Edit</Button> */}
          <Button size="small" onClick={() => setModalOpen(true)}>
            Delete
          </Button>
        </CardActions>
      </Card>

      <Modal
        open={modalOpen}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Card sx={{ width: 400 }}>
          <CardContent>
            <h3>Are you sure you want to delete the user?</h3>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => {
                dispatch(remove(userData.login.uuid));
                navigate("/");
              }}
            >
              Ok
            </Button>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          </CardActions>
        </Card>
      </Modal>
    </>
  );
}
