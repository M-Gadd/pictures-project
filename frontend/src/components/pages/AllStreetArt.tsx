import React, { useState } from "react";
import {
  Container,
  Input,
  Col,
  Card,
  CardTitle,
  Row,
  CardImg,
  CardColumns,
} from "reactstrap";

import api from "../../api";

import Moment from "react-moment";
import DefaultProfile from "../../Assets/default.png";
import DefaultImage from "../../Assets/empty.jpg";
import Visits from "../Visits";
import { useAllStreetArt } from "../../Hooks/streetArt";
import Likes from "../Likes";
import Comments from "../comments";

import SearchStreetArt from "../SearchStreetArt";
import EditStreetArt from "../EditStreetArt";

export interface StreetArtProps {}

const AllStreetArt: React.SFC<StreetArtProps> = () => {
  const [, setAddStreetArt] = useState(false);
  const [searchStreet, setSearchStreet] = useState("");
  const [searchsend, setSearchSend] = useState("");
  const { streetArts } = useAllStreetArt();

  const userId = api.getLocalStorageUser() ? api.getLocalStorageUser().id : "";

  return (
    <>
      {searchsend && <SearchStreetArt searchString={searchsend} />}

      {!searchsend && (
        <Row className="d-flex justify-content-center">
          <Col xs={8}>
            <Container>
              <Input
                type="text"
                onKeyDown={(e) =>
                  e.keyCode === 13
                    ? (setSearchSend(searchStreet), setSearchStreet(""))
                    : ""
                }
                placeholder="search city..."
                name="search city..."
                value={searchStreet}
                className=" mb-4"
                onChange={(e) => {
                  e.persist();
                  setSearchStreet(e.target.value);
                }}
              />

              <CardColumns>
                {streetArts &&
                  streetArts.map((art: any) => (
                    <Card
                      inverse
                      style={{ backgroundColor: "#333", borderColor: "#333" }}
                      className=" highlightOnHover style-card-main m-2 p-3 text-center"
                    >
                      <CardTitle className="mb-2">
                        <span style={{ float: "left" }} className="mr-2 mb-3">
                          <img
                            className="img_style_post"
                            src={art.UserPhoto ? art.UserPhoto : DefaultProfile}
                            alt="no one"
                          />
                        </span>
                        <span
                          className="mt-1 pt-1 d-flex justify-content-center "
                          style={{ float: "right" }}
                        >
                          <Moment className="pr-2" fromNow>
                            {art.CreatedAt}
                          </Moment>

                          {art.authorId === userId && (
                            <EditStreetArt setAddStreetArt={setAddStreetArt} art={art} />
                          )}
                        </span>
                      </CardTitle>
                      <CardImg
                        top
                        width="100%"
                        src={art.PictureURL ? art.PictureURL : DefaultImage}
                        alt="Card image cap"
                      />

                      <Row className="mt-3">
                        <Col className="text-center" xs={12}>
                          <span style={{ fontWeight: "bold" }}>{art.Location}</span>
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={4}>
                          <Visits streetArtId={art.id} />
                        </Col>
                        <Col xs={4}>
                          <Likes streetArtId={art.id} />
                        </Col>
                        <Col className="pl-0 pt-4" xs={4}>
                          <Comments streetArtId={art.id} />
                        </Col>
                      </Row>
                    </Card>
                  ))}
              </CardColumns>
              <style>{`
        .highlightOnHover:hover,
        .highlightOnHover:focus {
          cursor: pointer;
          transform: translateY(-10px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease-out;
        }

        .img_style_post {
          border-radius: 50%; 
          height: 40px; 
          width: 40px; 
        }
      `}</style>
            </Container>
          </Col>
        </Row>
      )}
    </>
  );
};

export default AllStreetArt;
