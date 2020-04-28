import React, { useState, useEffect } from "react";
import { useVisits, useVisitsForOneStreetArt } from "../Hooks/visits";
import api from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faBus,
  faRoute,
  faPlane,
  faPlaneArrival,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import { FormText, Row, Col } from "reactstrap";

export interface VisitsProps {
  streetArtId: string;
}

const Visits: React.SFC<VisitsProps> = ({ streetArtId }) => {
  // const { visits, isLoading, setVisits } = useVisits();

  const {
    visitsForOneStreetArt,
    isLoading,
    setVisitsForOneStreetArt,
    usersVisited,
    setUsersVisited,
  } = useVisitsForOneStreetArt(streetArtId);

  const userId = api.getLocalStorageUser() ? api.getLocalStorageUser().id : "";
  let userVisited = false;
  let visitId: any;
  let numberOfVisits = 0;

  // console.log("********", visitsForOneStreetArt);
  // console.log("VISITS ", visits);

  // if (visits) {
  //   visits.map((visit: any) => {
  //     if (visit.userId === userId && visit.streetArtId == streetArtId) {
  //       userVisited = true;
  //       visitId = visit.id;
  //     }
  //   });
  // }
  if (!isLoading) {
    numberOfVisits = visitsForOneStreetArt.length;
    visitsForOneStreetArt.map((visit: any) => {
      if (visit.userId === userId && visit.streetArtId == streetArtId) {
        userVisited = true;
        visitId = visit.id;
      }
    });
  }

  let visitParagraph;

  if (numberOfVisits === 0) {
    visitParagraph = "";
  } else if (numberOfVisits === 1) {
    if (userVisited) {
      visitParagraph = "Visited by you..";
    } else {
      visitParagraph = `Visited by ${usersVisited[0].Email}`;
    }
  } else if (numberOfVisits === 2) {
    if (userVisited) {
      visitParagraph = `Visited by you and ${usersVisited[0].Email} `;
    } else {
      visitParagraph = `Visited by ${usersVisited[0].Email} and ${usersVisited[1].Email}`;
    }
  } else if (numberOfVisits > 2) {
    if (userVisited) {
      visitParagraph = `Visited by you, ${usersVisited[0].Email} and ${
        numberOfVisits - 2
      } ${numberOfVisits - 2 === 1 ? "more person..." : "others..."} `;
    } else {
      visitParagraph = `Visited by ${usersVisited[0].Email} and others`;
    }
  } else {
    visitParagraph = `This place has been visited ${numberOfVisits}`;
  }

  const addVisit = async () => {
    let data = {
      streetArtId,
    };

    await api.createVisit(data);
    const newVisits = await api.getAllVisitsForOneStreetArt(streetArtId);
    setVisitsForOneStreetArt(newVisits.data.visits);
    setUsersVisited(newVisits.data.users);
  };

  const removeVisit = async () => {
    await api.deleteVisit(visitId);
    const newVisits = await api.getAllVisitsForOneStreetArt(streetArtId);
    setVisitsForOneStreetArt(newVisits.data.visits);
    setUsersVisited(newVisits.data.users);
  };

  const visitToggle = async (e: any) => {
    userVisited ? removeVisit() : addVisit();
  };

  // useEffect(() => {}, [visits]);

  return (
    <div className="style-fav">
      <div className="style-heart-outer">
        <span className="mr-4">
          {
            userId ? (
              <Row>
                <Col xs={12}>
                  <span onClick={visitToggle}>
                    <FontAwesomeIcon
                      style={{ color: userVisited ? "red" : "" }}
                      // onClick={() => handleVisits(art.id)}
                      size="2x"
                      className="mr-2 "
                      icon={faPlaneDeparture}
                    />

                    {/* <span className="ml-2">{postLike}</span> */}
                  </span>
                  <br />
                  {/* </Col> */}
                  {/* <Col xs={9}> */}
                  <FormText style={{ fontWeight: "bold", color: "white" }} color="muted">
                    {/* {visitParagraph} */}
                    {numberOfVisits} Visits
                  </FormText>
                </Col>
              </Row>
            ) : (
              ""
            )
            // : (
            //   <span onClick={noAuth}>
            //     <FaRegHeart className="style-heart" />
            //     <span className="ml-2">{postLike}</span>
            //   </span>
            // )
          }
        </span>
      </div>
    </div>
  );
};

export default Visits;

// import React, { useEffect } from "react";

// import { FaRegHeart, FaHeart } from "react-icons/fa";

// import "../posts/Posts.css";
// import {
//   createLike,
//   deleteLike,
//   fetchLikes,
// } from "../../store/modules/likes/actions/likesAction";
// import { history } from "../../history";
// import api from "../api";

// const Likes = ({ postID }) => {
//   // const dispatch = useDispatch();

//   // const currentState = useSelector((state) => state);

//   // const postLikes = currentState.LikesState;

//   // const authID = currentState.Auth.currentUser ? currentState.Auth.currentUser.id : "";

//   let postLike = 0;
//   let likeID = null;
//   let authLiked = false;

//   if (postLikes) {
//     // eslint-disable-next-line array-callback-return
//     postLikes.likeItems.map((eachItem) => {
//       if (eachItem.postID === postID) {
//         postLike = eachItem.likes.length;

//         // eslint-disable-next-line array-callback-return
//         eachItem.likes.map((eachLike) => {
//           if (eachLike.user_id === authID) {
//             authLiked = true;
//             likeID = eachLike.id;
//           }
//         });
//       }
//     });
//   }

//   // const getPostLikes = (id) => dispatch(fetchLikes(id));
//   // const addLike = (id) => dispatch(createLike(id));
//   // const removeLike = (details) => dispatch(deleteLike(details));

//   useEffect(() => {
//     getPostLikes(postID);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const unLike = (e) => {
//     e.preventDefault();
//     let id = likeID;
//     api.deleteVisit({ id, postID });
//   };

//   const saveLike = (e) => {
//     e.preventDefault();
//     addLike(postID);
//   };

//   const likeToggle = (e) => {
//     e.preventDefault();
//     authLiked ? unLike(e) : saveLike(e);
//   };
//   const noAuth = (e) => {
//     e.preventDefault();
//     history.push("/login");
//   };

//   return (
//     <div className="style-fav">
//       <div className="style-heart-outer">
//         <span className="mr-4">
//           {authID ? (
//             <span onClick={likeToggle}>
//               {authLiked ? (
//                 <FaHeart className="style-auth" />
//               ) : (
//                 <FaRegHeart className="style-heart" />
//               )}
//               <span className="ml-2">{postLike}</span>
//             </span>
//           ) : (
//             <span onClick={noAuth}>
//               <FaRegHeart className="style-heart" />
//               <span className="ml-2">{postLike}</span>
//             </span>
//           )}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Likes;
