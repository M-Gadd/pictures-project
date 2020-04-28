import { useUsers } from "../../Hooks/users";
import React from "react";
import Moment from "react-moment";
import { Row, Col, Card, Container, CardBody, CardTitle } from "reactstrap";
import { useHistory } from "react-router-dom";
import Default from "../../Assets/default.png";

export interface UsersProps {}

const Users: React.SFC<UsersProps> = () => {
  const { users, isLoading } = useUsers();
  const history = useHistory();

  if (!isLoading) {
    console.log(users);
  }

  const getOneUser = (id: string) => {
    history.push("/user", { id: id });
  };
  return (
    <Container>
      <Row>
        {users &&
          users.map((user: any) => (
            <Col key={user.id} xs={4}>
              <Card
                onClick={() => getOneUser(user.id)}
                className=" highlightOnHover style-card-main m-2"
              >
                <CardBody className="style-card-body">
                  <CardTitle>
                    <span>
                      <span style={{ float: "left" }} className="mr-2">
                        <img
                          className="img_style_post"
                          src={user.PictureURL ? user.PictureURL : Default}
                          alt="no one"
                        />
                      </span>
                      <span style={{ fontWeight: "bold" }}>{user.Email}</span>
                    </span>
                    <span style={{ float: "right" }}>
                      <Moment fromNow>{user.CreatedAt}</Moment>
                    </span>
                  </CardTitle>
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
            </Col>
          ))}
      </Row>
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
  );
};

export default Users;
