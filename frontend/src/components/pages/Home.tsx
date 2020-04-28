import React from "react";
import { Row, Col, FormText } from "reactstrap";
import MyCarousel from "../Carousel";

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  return (
    <>
      <Row className="d-flex justify-content-center">
        <Col xs={11}>
          <Row>
            <Col className="p-5 d-flex align-content-center" xs={6}>
              <FormText color="white" className="p-5 ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
                laboriosam distinctio vel iste? Quasi nesciunt repellendus laboriosam,
                quae voluptatibus ducimus cum, sint quam odit unde ex minus molestias
                dicta nemo?
              </FormText>
            </Col>
            <Col className="p-5" xs={6}>
              {/* <img src={Img1} alt="noone" /> */}
              <MyCarousel />
            </Col>
          </Row>
          <Row>
            <Col className="p-5" xs={6}>
              <MyCarousel />
              {/* <img src={img2} alt="" /> */}
            </Col>
            <Col className="p-5 d-flex align-content-center" xs={6}>
              <FormText color="white" className="p-5 ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
                laboriosam distinctio vel iste? Quasi nesciunt repellendus laboriosam,
                quae voluptatibus ducimus cum, sint quam odit unde ex minus molestias
                dicta nemo?
              </FormText>
            </Col>
          </Row>
          <Row>
            <Col className="p-5 d-flex align-content-center" xs={6}>
              <FormText color="white" className="p-5 ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
                laboriosam distinctio vel iste? Quasi nesciunt repellendus laboriosam,
                quae voluptatibus ducimus cum, sint quam odit unde ex minus molestias
                dicta nemo?
              </FormText>
            </Col>
            <Col className="p-5" xs={6}>
              <MyCarousel />
              {/* <img src={img3} alt="" /> */}
            </Col>
          </Row>
          <Row>
            <Col className="p-5" xs={6}>
              <MyCarousel />
              {/* <img src={img4} alt="" /> */}
            </Col>
            <Col className="p-5 d-flex align-content-center" xs={6}>
              <FormText color="white" className="p-5 ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
                laboriosam distinctio vel iste? Quasi nesciunt repellendus laboriosam,
                quae voluptatibus ducimus cum, sint quam odit unde ex minus molestias
                dicta nemo?
              </FormText>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Home;
