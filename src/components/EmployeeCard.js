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

import { useDispatch } from "react-redux";
import { remove } from "../features/employees/employeesSlice";

import { useNavigate } from "react-router-dom";

import "./EmployeeCard.css";

import { useState } from "react";

export default function EmployeeCard(props) {
  const { userData } = props;
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const genderIcon =
    userData.gender === "male" ? (
      <Male className="EmployeeCard-icon" />
    ) : (
      <Female className="EmployeeCard-icon" />
    );
  return (
    <>
      <Card raised>
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
          <Button
            size="small"
            onClick={() => navigate(`employee/${userData.login.uuid}`)}
          >
            View
          </Button>
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
            <Button onClick={() => dispatch(remove(userData.login.uuid))}>
              Ok
            </Button>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          </CardActions>
        </Card>
      </Modal>
    </>
  );
}
