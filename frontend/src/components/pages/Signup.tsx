import React, { useEffect, useState } from "react";
import api from "../../api";
import {
  Button,
  FormGroup,
  CustomInput,
  Form,
  Input,
  Container,
  Row,
  Col,
  FormText,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export interface SignupProps {}

const Signup: React.SFC<SignupProps> = () => {
  const [file, setFile] = useState() as any;
  const [uploadedFile, setUploadedFile] = useState() as any;
  const { register, handleSubmit, errors } = useForm();

  const history = useHistory();

  const onSubmit = async (data: any) => {
    await api.signup(data).then((res) => {
      if (uploadedFile) {
        submitUserAvatar(res.user.id);
      }
    });
    // history.push("/");
    window.location.href = "/";
  };

  const handleImageChange = (e: any) => {
    e.preventDefault();
    let reader = new FileReader();
    let thefile = e.target.files[0];

    reader.onloadend = () => {
      setFile(thefile);
      setUploadedFile(reader.result);
    };
    reader.readAsDataURL(thefile);
  };

  const submitUserAvatar = (id: string) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    api.uploadImageUser(id, formData);
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col xs={5}>
          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder="First name"
              name="FirstName"
              className="mt-3"
              innerRef={register({ required: true, maxLength: 80 })}
            />
            <Input
              type="text"
              placeholder="Last name"
              name="LastName"
              className="mt-3"
              innerRef={register({ required: true, maxLength: 100 })}
            />
            <Input
              type="text"
              placeholder="Email"
              name="Email"
              className="mt-3"
              innerRef={register({
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalid email address",
                },
              })}
            />
            {errors.email && errors.email.message}
            <Input
              type="password"
              placeholder="Password"
              name="Password"
              className="mt-3"
              innerRef={register({ required: true, min: 6, maxLength: 12 })}
            />

            <CustomInput
              type="file"
              accept="image/*"
              id="exampleCustomFileBrowser"
              className="mt-3"
              onChange={(e) => handleImageChange(e)}
            />
            {/* <Button
              className="style_photo_button"
              color="primary"
              type="submit"
              disabled={uploadedFile == null || file == null}
            >
              Update Photo
            </Button> */}
            <FormText color="muted">Please upload a photo less than 1MBs</FormText>

            <input
              style={{ borderRadius: "9%" }}
              className="mt-3 p-2"
              // disabled={}
              type="submit"
              value="Signup"
            />
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
