import React from "react";
import { useSearchStreetArt } from "../Hooks/search";
import { upperCaseWords } from "luthier";
import { Row, Col, Container, CardColumns, Card, CardTitle, CardImg } from "reactstrap";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Visits from "./Visits";
import Likes from "./Likes";
import Comments from "./comments";
import DefaultProfile from "../Assets/default.png";
import DefaultImage from "../Assets/empty.jpg";

export interface SearchStreetArtProps {
  searchString: string;
}

const SearchStreetArt: React.SFC<SearchStreetArtProps> = ({ searchString }) => {
  const { searchStreetArt, isLoading } = useSearchStreetArt(upperCaseWords(searchString));
  // console.log("From Component: ", searchStreetArt);
  return (
    <Row className="d-flex justify-content-center">
      <Col xs={8}>
        <Container>
          <CardColumns>
            {searchStreetArt &&
              searchStreetArt.map((art: any) => (
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
                          art.author.PictureURL ? art.author.PictureURL : DefaultProfile
                        }
                        alt="no one"
                      />
                    </span>
                    <span className="mt-1 pt-1 " style={{ float: "right" }}>
                      <Moment className="pr-2" fromNow>
                        {art.CreatedAt}
                      </Moment>
                      <FontAwesomeIcon
                        onClick={() => {
                          // <MyDropDown />;
                        }}
                        // size="2x"
                        // className="pl-1"
                        icon={faEllipsisV}
                      ></FontAwesomeIcon>
                    </span>
                  </CardTitle>
                  <CardImg
                    top
                    width="100%"
                    // height="60%"
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
  );
};

export default SearchStreetArt;
