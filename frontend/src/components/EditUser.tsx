import { useState, useEffect } from "react";
import api from "../api";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  FormText,
  Col,
  Button,
} from "reactstrap";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export interface AddStreetArtProps {
  // editStreetArt: boolean;
  // setAddStreetArt: any;
  user: any;
  // setUser: any;
}

const EditUser: React.SFC<AddStreetArtProps> = ({ user }) => {
  const { register, handleSubmit, errors } = useForm();
  const [file, setFile] = useState() as any;
  const [uploadedFile, setUploadedFile] = useState() as any;
  const [editUser, setEditUser] = useState(false);
  const [firstName, setFirstName] = useState(user.FirstName);
  const [lastName, setLastName] = useState(user.LastName);
  const [email, setEmail] = useState(user.Email);

  // const userId = api.getLocalStorageUser() ? api.getLocalStorageUser().id : "";
  const history = useHistory();

  // useEffect(() => {}, [editUser]);

  const toggle = (e: any) => {
    e.preventDefault();
    setEditUser(false);
  };

  const onSubmit = async (data: any) => {
    console.log("DATA", data);
    await api.updateUser(user.id, data).then((res) => {
      if (uploadedFile) {
        submitUserAvatar(user.id);
      }
      // setUser(res.data.user);
      setEditUser(false);
    });
    // window.location.reload();
    history.go(0);
    // history.push(`/user`, { id: user.id });
    // window.location.href = `/user/${user.id}`;
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
    <>
      <span>
        <Button
          onClick={() => {
            setEditUser(true);
          }}
          color="danger"
        >
          Edit
        </Button>
      </span>

      <Modal isOpen={editUser} toggle={toggle} className="">
        <ModalHeader toggle={toggle}>Edit Profile</ModalHeader>
        <ModalBody style={{ backgroundColor: "black" }}>
          <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              // placeholder="First name"
              onChange={(e) => setFirstName(e.target.value)}
              name="FirstName"
              className="mt-3"
              value={firstName}
              innerRef={register({ required: true, maxLength: 80 })}
            />
            <Input
              type="text"
              // placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
              name="LastName"
              className="mt-3"
              value={lastName}
              innerRef={register({ required: true, maxLength: 100 })}
            />
            <Input
              type="text"
              // placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              name="Email"
              className="mt-3"
              value={email}
              innerRef={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
            {/* <Input
              type="password"
              placeholder="Password"
              name="Password"
              className="mt-3"
              innerRef={register({ required: true, min: 6, maxLength: 12 })}
            /> */}

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
              value="update"
            />
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default EditUser;
