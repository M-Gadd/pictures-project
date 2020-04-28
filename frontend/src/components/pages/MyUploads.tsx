import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  FormGroup,
  Form,
  Input,
  Label,
  FormText,
  Col,
  CustomInput,
  Card,
  CardBody,
  CardTitle,
  Row,
  CardImg,
  CardFooter,
  CardColumns,
} from "reactstrap";
// import api from "../../api";
import { useProfileStreetArt } from "../../Hooks/streetArt";
import Moment from "react-moment";
// import Default from "../Assets/default.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Visits from "./Visits";
import AddStreetArt from "../AddStreetArt";

export interface StreetArtProps {}

const MyUploads: React.SFC<StreetArtProps> = () => {
  const [addStreetArt, setAddStreetArt] = useState(false);
  const { streetArt, isLoading } = useProfileStreetArt();

  console.log(streetArt);

  return (
    <Container>
      <Row className="d-flex justify-content-center mb-4">
        <Button style={{ float: "left" }} onClick={() => setAddStreetArt(true)}>
          Add Street Art
        </Button>
      </Row>

      <AddStreetArt addStreetArt={addStreetArt} setAddStreetArt={setAddStreetArt} />

      <Container>
        {/* <Row> */}
        <CardColumns>
          {streetArt &&
            streetArt.map((art: any) => (
              // <Col className="d-flex align-items-stretch" xs={4}>
              <Card
                // onClick={() => getOneUser(user.id)}
                // onClick={() => api.createVisit()}
                // style={{ width: "300px", height: "400px" }}
                className=" highlightOnHover style-card-main m-2 p-3"
              >
                <CardImg
                  top
                  width="100%"
                  // height="60%"
                  src={art.PictureURL ? art.PictureURL : ""}
                  alt="Card image cap"
                />
                <CardBody className="style-card-body">
                  <CardTitle>
                    <span>
                      {/* <span style={{ float: "left" }} className="mr-2">
                          <img
                            className="img_style_post"
                            src={art.PictureURL ? art.PictureURL : Default}
                            alt="no one"
                          />
                        </span> */}
                      <Row className="p-2 m-2">
                        <Col xs={12}>
                          <span style={{ fontWeight: "bold" }}>{art.Location}</span>
                        </Col>
                      </Row>
                      <Row className="p-2 m-2">
                        <Col xs={12}>
                          {/* <span style={{ float: "right" }}> */}
                          <Moment fromNow>{art.CreatedAt}</Moment>
                          {/* </span> */}
                        </Col>
                      </Row>
                      <Row className="p-2 m-2">
                        {/* <Col xs={12}> */}
                        {/* <span className="mt-3" style={{ float: "right" }}> */}
                        {/* <Visits streetArtId={art.id} /> */}
                        {/* </span> */}
                        {/* </Col> */}
                      </Row>
                    </span>
                    {/* <h6>
                          <FontAwesomeIcon
                            style={{ color: art.Visited === "visited" ? "red" : "" }}
                            // onClick={() => handleVisits(art.id)}
                            // size="4x"
                            className="mr-2 "
                            icon={faStar}
                          />
                          {art.Visited}{" "}
                        </h6> */}
                  </CardTitle>
                  {/* <CardFooter>{art.Visited}</CardFooter> */}
                  {/* <CardTitle>{post.title}</CardTitle>
                  <CardText>{post.content}</CardText> */}
                  {/* <div className="style-fav">
                    <>
                      <Likes postID={post.id} />
                      <Comments postID={post.id} />
                    </>
                    {authID === post.author_id ? (
                      <div className="ml-auto">
                        <span style={{ marginRight: "20px" }}>
                          <EditPost post={post} />
                        </span>
                        <span>
                          <DeletePost postID={post.id} />
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div> */}
                </CardBody>
              </Card>
              // </Col>
            ))}
        </CardColumns>
        {/* </Row> */}
        <style>{`
        .highlightOnHover:hover,
        .highlightOnHover:focus {
          cursor: pointer;
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease-out;
        }

        .img_style_post {
          border-radius: 50%; 
          height: 30px; 
          width: 30px; 
        }
      `}</style>
      </Container>
    </Container>
  );
};

export default MyUploads;
