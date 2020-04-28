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
  CardDeck,
  CardColumns,
} from "reactstrap";

import api from "../../api";

import Moment from "react-moment";
import DefaultProfile from "../../Assets/default.png";
import DefaultImage from "../../Assets/empty.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Visits from "../Visits";
// import AddStreetArt from "./AddStreetArt";
import { useAllStreetArt } from "../../Hooks/streetArt";
import Likes from "../Likes";
import AddComment from "../AddComment";
import Comments from "../comments";

import { faEllipsisV, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
// import MyDropDown from "../UI/Dropdown";
import { useSearchStreetArt } from "../../Hooks/search";
import SearchStreetArt from "../SearchStreetArt";
import EditStreetArt from "../EditStreetArt";
import MyAutoSearch from "../AutoComplete";
import GoogleMaps from "../GoogleMapsAutoComplete";

export interface StreetArtProps {}

const AllStreetArt: React.SFC<StreetArtProps> = () => {
  const [addStreetArt, setAddStreetArt] = useState(false);

  const [isFlipped, setIsFlipped] = useState(false);
  const [searchStreet, setSearchStreet] = useState("");
  const [searchsend, setSearchSend] = useState("");
  const [openComments, setOpenComments] = useState(false);
  const { streetArts, isLoading } = useAllStreetArt();

  const userId = api.getLocalStorageUser() ? api.getLocalStorageUser().id : "";

  console.log("JUNK", streetArts);
  console.log("searchStreet: ", searchStreet);

  return (
    <>
      {searchsend && <SearchStreetArt searchString={searchsend} />}

      {!searchsend && (
        <Row className="d-flex justify-content-center">
          <Col xs={8}>
            <Container>
              {/* <h4>welcome from Street Art</h4> */}
              {/* <Row>
        <Button style={{ float: "left" }} onClick={() => setAddStreetArt(true)}>
          Add Street Art
        </Button>
      </Row> */}

              {/* <AddStreetArt addStreetArt={addStreetArt} setAddStreetArt={setAddStreetArt} /> */}

              {/* <Container> */}
              {/* <Row> */}
              {/* <span> */}
              <GoogleMaps />
              <MyAutoSearch />

              <Input
                type="text"
                onKeyDown={(e) =>
                  e.keyCode === 13
                    ? (setSearchSend(searchStreet), setSearchStreet(""))
                    : ""
                }
                // bsSize="lg"
                placeholder="search city..."
                name="search city..."
                value={searchStreet}
                className=" mb-4"
                onChange={
                  (e) => {
                    e.persist();
                    setSearchStreet(e.target.value);
                  }
                  // innerRef={register({ required: true, min: 3, maxLength: 12 })}
                }
              />

              {/* <MyDropDown /> */}
              {/* </span> */}

              <CardColumns>
                {streetArts &&
                  streetArts.map((art: any) => (
                    // <Col className="d-flex align-items-stretch" xs={4}>
                    // <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">

                    // </ReactCardFlip>
                    // <FlipCard art={art} />
                    <Card
                      inverse
                      style={{ backgroundColor: "#333", borderColor: "#333" }}
                      // onClick={() => getOneUser(user.id)}
                      // onClick={() => api.createVisit()}
                      // style={{ width: "300px", height: "400px" }}
                      className=" highlightOnHover style-card-main m-2 p-3 text-center"
                    >
                      <CardTitle className="mb-2">
                        <span style={{ float: "left" }} className="mr-2 mb-3">
                          <img
                            className="img_style_post"
                            src={
                              art.author.PictureURL
                                ? art.author.PictureURL
                                : DefaultProfile
                            }
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
                          {/* <span style={{ display: "inline" }}> */}
                          {/* <span className="pr-2">
                            <MyDropDown />
                          </span> */}
                          {/* </span> */}
                          {art.authorId === userId && (
                            <EditStreetArt
                              // editStreetArt={editStreetArt}
                              setAddStreetArt={setAddStreetArt}
                              art={art}
                            />
                          )}
                          {/* <span>
                            <FontAwesomeIcon
                              onClick={() => {
                                setEditStreetArt(true);
                                // <MyDropDown />;
                              }}
                              // size="2x"
                              // className="pl-1"
                              icon={faEdit}
                            ></FontAwesomeIcon>
                          </span> */}
                        </span>
                      </CardTitle>
                      <CardImg
                        top
                        width="100%"
                        // height="60%"
                        src={art.PictureURL ? art.PictureURL : DefaultImage}
                        alt="Card image cap"
                      />
                      {/* <CardBody>
                            <CardTitle> */}
                      <Row className="mt-3">
                        <Col className="text-center" xs={12}>
                          <span style={{ fontWeight: "bold" }}>{art.Location}</span>
                        </Col>
                      </Row>
                      {/* </CardTitle> */}
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
                      {/* </CardBody> */}
                      {/* <CardImgOverlay></CardImgOverlay> */}

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
              {/* </Row> */}
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
              {/* </Container> */}
            </Container>
          </Col>
        </Row>
      )}
    </>
  );
};

export default AllStreetArt;

// const FlipComponent = ({ s, card, image }) => {
//   const [isFlipped, changeFlip] = useState(false);
//   const handleClick = useCallback((event) => {
//     event.preventDefault();
//     changeFlip(!isFlipped);
//   });
//   return (
//     <ReactCardFlip
//       isFlipped={isFlipped}
//       flipSpeedFrontToBack={1.0}
//       flipSpeedBackToFront={1.0}
//       flipDirection="vertical"
//     >
//       <div key="front" style={card} onClick={handleClick}>
//         <div className={styles.ImageContainer}>
//           <img style={image} src={s.src} alt={s.alt} />
//         </div>
//       </div>

//       <div key="back" style={card} onClick={handleClick}>
//         <div className={styles.TextContainer}>
//           <p>
//             <div className={styles.name}>
//               {s.firstname}
//               {s.lastname}
//             </div>
//             <div className={styles.position}>{s.position}</div>
//           </p>
//         </div>
//       </div>
//     </ReactCardFlip>
//   );
// };
