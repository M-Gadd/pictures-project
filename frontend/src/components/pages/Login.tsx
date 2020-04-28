import React from "react";
import { useForm } from "react-hook-form";
import api from "../../api";
import { Input, Row, Col, Container } from "reactstrap";

export interface LoginProps {}

const Login: React.SFC<LoginProps> = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: any) => {
    api.login(data).then(() => (window.location.href = "/"));
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col xs={5}>
          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="Email"
              name="Email"
              className="= mt-5"
              innerRef={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            <Input
              type="password"
              // bsSize="lg"
              placeholder="Password"
              name="Password"
              className=" mt-5"
              innerRef={register({ required: true, min: 3, maxLength: 12 })}
            />

            <input
              style={{ borderRadius: "9%" }}
              className="mt-4 p-2"
              type="submit"
              value="Login"
            />
            <style>{`
  .myInput:focus {
    outline: none;
  }
  `}</style>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
