import React, { useState } from "react";
import Default from "../Assets/default.png";
import api from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FormText, Row, Col, Card, ModalBody, Modal, ModalHeader } from "reactstrap";
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
    setOpenComments(false);
  };

  return (
    <>
      <FormText onClick={() => setOpenComments(true)}>
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
              <AddComment streetArtId={streetArtId} callBack={forceReload} />
            </Col>
            {comments &&
              comments.map((comment: any) => (
                // <Row>
                <Col xs={10}>
                  <Card className="  m-2 p-4 " style={{ color: "black" }}>
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

                    <Row className="d-flex justify-content-center">
                      <Col className="pl-3 pb-0 pt-2" xs={12}>
                        <p>{comment.Body}</p>
                      </Col>
                    </Row>
                  </Card>
                </Col>
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
