import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  CardActions,
  Button,
} from "@mui/material";
import {
  Male,
  Female,
  HomeOutlined,
  PhoneIphoneOutlined,
  EmailOutlined,
} from "@mui/icons-material";

import "./EmployeeCard.css";

export default function EmployeeCard(props) {
  const { userData } = props;
  const genderIcon =
    userData.gender === "male" ? (
      <Male className="EmployeeCard-icon" />
    ) : (
      <Female className="EmployeeCard-icon" />
    );
  return (
    <Card raised>
      <CardHeader
        avatar={<Avatar alt="profile portrait" src={userData.picture.medium} />}
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
          <PhoneIphoneOutlined className="EmployeeCard-icon" /> {userData.phone}
          <br />
          <EmailOutlined className="EmployeeCard-icon" /> {userData.email}
        </div>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
