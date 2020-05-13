import React from "react";
import api from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FormText, Row, Col } from "reactstrap";
import { useLikesForOneStreetArt } from "../Hooks/likes";

export interface LikesProps {
  streetArtId: string;
}

const Likes: React.SFC<LikesProps> = ({ streetArtId }) => {
  const {
    likesForOneStreetArt,
    isLoading,
    setLikesForOneStreetArt,
    usersLiked,
    setUsersLiked,
  } = useLikesForOneStreetArt(streetArtId);

  const userId = api.getLocalStorageUser() ? api.getLocalStorageUser().id : "";
  let userLiked = false;
  let likeId: any;
  let numberOfLikes = 0;

  if (!isLoading) {
    numberOfLikes = likesForOneStreetArt ? likesForOneStreetArt.length : 0;
    likesForOneStreetArt &&
      likesForOneStreetArt.map((like: any) => {
        if (like.userId === userId && like.streetArtId === streetArtId) {
          userLiked = true;
          likeId = like.id;
        }
      });
  }

  let likeParagraph;

  if (numberOfLikes === 0) {
    likeParagraph = "";
  } else if (numberOfLikes === 1) {
    if (userLiked) {
      likeParagraph = "Liked by you..";
    } else {
      likeParagraph = `Liked by ${usersLiked[0].Email}`;
    }
  } else if (numberOfLikes === 2) {
    if (userLiked) {
      likeParagraph = `Liked by you and ${usersLiked[0].Email} `;
    } else {
      likeParagraph = `Liked by ${usersLiked[0].Email} and ${usersLiked[1].Email}`;
    }
  } else if (numberOfLikes > 2) {
    if (userLiked) {
      likeParagraph = `Liked by you, ${usersLiked[0].Email} and ${
        numberOfLikes - 2
      } others... `;
    } else {
      likeParagraph = `Liked by ${usersLiked[0].Email} and others`;
    }
  } else {
    likeParagraph = `This place has been Liked ${numberOfLikes}`;
  }

  const addLike = async () => {
    let data = {
      streetArtId,
    };

    await api.createLike(data);
    const newVisits = await api.getAllLikesForOneStreetArt(streetArtId);
    setLikesForOneStreetArt(newVisits.data.likes);
    setUsersLiked(newVisits.data.users);
  };

  const removeLike = async () => {
    await api.deleteLike(likeId);
    const newVisits = await api.getAllLikesForOneStreetArt(streetArtId);
    setLikesForOneStreetArt(newVisits.data.likes);
    setUsersLiked(newVisits.data.users);
  };

  const visitToggle = async () => {
    userLiked ? removeLike() : addLike();
  };

  return (
    <div className="style-fav">
      <div className="style-heart-outer">
        <span className="mr-4">
          {userId ? (
            <Row>
              <Col xs={12}>
                <span onClick={visitToggle}>
                  <FontAwesomeIcon
                    style={{ color: userLiked ? "red" : "" }}
                    size="2x"
                    className="mr-2 "
                    icon={faHeart}
                  />
                </span>
                <br />

                <FormText style={{ fontWeight: "bold" }} color="muted">
                  {numberOfLikes} Likes
                </FormText>
              </Col>
            </Row>
          ) : (
            ""
          )}
        </span>
      </div>
    </div>
  );
};

export default Likes;
