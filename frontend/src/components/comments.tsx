import React, { useState, useEffect } from "react";
import { useVisits, useVisitsForOneStreetArt } from "../Hooks/visits";
import Default from "../Assets/default.png";
import api from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faBus,
  faRoute,
  faPlane,
  faPlaneArrival,
  faPlaneDeparture,
  faHeart,
  faCross,
  faPlus,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  FormText,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  ModalBody,
  Modal,
  ModalHeader,
} from "reactstrap";
import { useCommentsForOneStreetArt } from "../Hooks/comments";
import Moment from "react-moment";
import AddComment from "./AddComment";

export interface LikesProps {
  streetArtId: string;
}

const Comments: React.SFC<LikesProps> = ({ streetArtId }) => {
  const { comments, isLoading, setComments } = useCommentsForOneStreetArt(streetArtId);
  const [openComments, setOpenComments] = useState(false);

  const userId = api.getLocalStorageUser() ? api.getLocalStorageUser().id : "";
  let userLiked = false;
  let likeId: any;
  let numberOfComments = 0;

  const forceReload = async () => {
    const newComments = await api.getAllCommentsForOneStreetArt(streetArtId);
    setComments(newComments.data.comments);
  };

  // if (visits) {
  //   visits.map((visit: any) => {
  //     if (visit.userId === userId && visit.streetArtId == streetArtId) {
  //       userLiked = true;
  //       likeId = visit.id;
  //     }
  //   });
  // }
  if (!isLoading) {
    numberOfComments = comments ? comments.length : 0;
    // comments &&
    //   comments.map((like: any) => {
    //     if (like.userId === userId && like.streetArtId == streetArtId) {
    //       userLiked = true;
    //       likeId = like.id;
    //     }
    //   });
  }

  // let likeParagraph;

  // if (numberOfComments === 0) {
  //   likeParagraph = "";
  // } else if (numberOfComments === 1) {
  //   if (userLiked) {
  //     likeParagraph = "Liked by you..";
  //   } else {
  //     likeParagraph = `Liked by ${usersLiked[0].Email}`;
  //   }
  // } else if (numberOfComments === 2) {
  //   if (userLiked) {
  //     likeParagraph = `Liked by you and ${usersLiked[0].Email} `;
  //   } else {
  //     likeParagraph = `Liked by ${usersLiked[0].Email} and ${usersLiked[1].Email}`;
  //   }
  // } else if (numberOfComments > 2) {
  //   if (userLiked) {
  //     likeParagraph = `Liked by you, ${usersLiked[0].Email} and ${
  //       numberOfComments - 2
  //     } others... `;
  //   } else {
  //     likeParagraph = `Liked by ${usersLiked[0].Email} and others`;
  //   }
  // } else {
  //   likeParagraph = `This place has been Liked ${numberOfComments}`;
  // }

  // console.log("userLiked", userLiked);

  // const addComment = async () => {
  //   let data = {
  //     streetArtId,
  //   };

  //   await api.createComment(data);
  //   const newVisits = await api.getAllCommentsForOneStreetArt(streetArtId);
  //   setComments(newVisits.data.comments);
  //   // setUsersLiked(newVisits.data.users);
  // };

  const removeComment = async (commentId: string) => {
    await api.deleteComment(commentId);
    const newComments = await api.getAllCommentsForOneStreetArt(streetArtId);
    setComments(newComments.data.comments);
    // setUsersLiked(newVisits.data.users);
  };

  // const visitToggle = async (e: any) => {
  //   userLiked ? removeLike() : addLike();
  // };

  const toggle = (e: any) => {
    e.preventDefault();
    // setModal(!modal);
    setOpenComments(false);
  };

  return (
    <>
      {/* <h5>Comments</h5> */}
      <FormText onClick={() => setOpenComments(true)}>
        {/* {visitParagraph} */}
        <h5 style={{ color: "white" }}>{numberOfComments}</h5>
        Comments
      </FormText>
      <Modal
        fade
        style={{ backgroundColor: "#333", borderColor: "#333" }}
        isOpen={openComments}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Comments</ModalHeader>
        <ModalBody>
          <Row className="d-flex justify-content-center" style={{ padding: "0px" }}>
            <Col className="text-center" xs={12}>
              {/* <span className="mt-3" style={{ float: "right" }}> */}
              <AddComment streetArtId={streetArtId} callBack={forceReload} />
              {/* </span> */}
            </Col>
            {comments &&
              comments.map((comment: any) => (
                // <Row>
                <Col xs={10}>
                  {/* <Card
                onClick={() => getOneUser(user.id)}
                className="p-3 m-3 highlightOnHover"
              > */}
                  {/* <img src="" alt="holder" /> */}
                  {/* <h6>{user.Email}</h6>
                <p>{user.CreatedAt}</p>
              </Card> */}

                  <Card
                    // color="black"
                    // onClick={() => getOneUser(user.id)}
                    className="  m-2 p-4 "
                    style={{ color: "black" }}
                  >
                    <Row className="p-1">
                      <Col xs={2}>
                        <img
                          style={{ float: "left" }}
                          className="img_style_post"
                          src={
                            comment.author.PictureURL
                              ? comment.author.PictureURL
                              : Default
                          }
                          alt="no one"
                        />
                      </Col>
                      <Col className="pt-2 text-center" xs={8}>
                        <span>
                          <FormText color="muted">
                            <Moment fromNow>{comment.CreatedAt}</Moment>
                          </FormText>
                        </span>
                      </Col>
                      <Col className="pt-2" xs={2}>
                        {comment.authorId === userId && (
                          <FontAwesomeIcon
                            onClick={() => removeComment(comment.id)}
                            icon={faTrash}
                          />
                        )}
                      </Col>
                    </Row>
                    {/* <hr /> */}
                    <Row className="d-flex justify-content-center">
                      <Col className="pl-3 pb-0 pt-2" xs={12}>
                        <p>{comment.Body}</p>
                      </Col>
                    </Row>
                    {/* <CardBody className="style-card-body"> */}
                    {/* <CardTitle> */}

                    {/* <FormText color="muted">{comment.author.Email}</FormText> */}

                    {/* </CardTitle> */}
                    {/* </CardBody> */}
                  </Card>
                </Col>
                // </Row>
              ))}
          </Row>
        </ModalBody>
      </Modal>
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
          height: 20px; 
          width: 20px; 
        }

        .modal-body{
          background-color: black;
        }
        `}</style>
    </>
  );
};

export default Comments;
