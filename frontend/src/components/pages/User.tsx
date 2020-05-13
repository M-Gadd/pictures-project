import React from "react";
import { useUser } from "../../Hooks/users";
import Default from "../../Assets/default.png";
import { FormText, Button, Row, Col } from "reactstrap";
import api from "../../api";
import EditUser from "../EditUser";

export interface UserProps {}

const User: React.SFC<UserProps> = () => {
  const { user, isLoading } = useUser() as any;

  if (!isLoading) {
    console.log("User: ", user);
  }

  return (
    <div>
      <img
        // style={{ width: "90vw", height: "60vh" }}
        className="img_style_post"
        src={user.PictureURL ? user.PictureURL : Default}
        alt="no one"
      />
      <Row className="mt-3">
        <Col>
          <span style={{ color: "white" }}>
            <h6>
              {user.FirstName} {user.LastName}
            </h6>
          </span>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <span style={{ color: "white" }}>
            <h6>{user.Email}</h6>
          </span>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>{user.id === api.getLocalStorageUser().id && <EditUser user={user} />}</Col>
      </Row>
      <style>{`
         .img_style_post {
          border-radius: 50%; 
          height: 200px; 
          width: 200px; 
      `}</style>
    </div>
  );
};

export default User;
