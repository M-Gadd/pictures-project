import React, { useState } from "react";
import {
  Button,
  Container,
  Col,
  Card,
  CardBody,
  CardTitle,
  Row,
  CardImg,
  CardColumns,
} from "reactstrap";

import { useProfileStreetArt } from "../../Hooks/streetArt";
import Moment from "react-moment";

import AddStreetArt from "../AddStreetArt";

export interface StreetArtProps {}

const MyUploads: React.SFC<StreetArtProps> = () => {
  const [addStreetArt, setAddStreetArt] = useState(false);
  const { streetArt } = useProfileStreetArt();

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
              <Card className=" highlightOnHover style-card-main m-2 p-3">
                <CardImg
                  top
                  width="100%"
                  src={art.PictureURL ? art.PictureURL : ""}
                  alt="Card image cap"
                />
                <CardBody className="style-card-body">
                  <CardTitle>
                    <span>
                      <Row className="p-2 m-2">
                        <Col xs={12}>
                          <span style={{ fontWeight: "bold" }}>{art.Location}</span>
                        </Col>
                      </Row>
                      <Row className="p-2 m-2">
                        <Col xs={12}>
                          <Moment fromNow>{art.CreatedAt}</Moment>
                        </Col>
                      </Row>
                      <Row className="p-2 m-2"></Row>
                    </span>
                  </CardTitle>
                </CardBody>
              </Card>
            ))}
        </CardColumns>
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
