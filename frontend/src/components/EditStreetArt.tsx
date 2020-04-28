import { useState } from "react";
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

export interface AddStreetArtProps {
  // editStreetArt: boolean;
  setAddStreetArt: any;
  art: any;
}

const EditStreetArt: React.SFC<AddStreetArtProps> = ({ setAddStreetArt, art }) => {
  const [file, setFile] = useState() as any;
  const [uploadedFile, setUploadedFile] = useState() as any;
  const [location, setLocation] = useState() as any;
  const [editStreetArt, setEditStreetArt] = useState(false);
  const userId = api.getLocalStorageUser() ? api.getLocalStorageUser().id : "";

  const toggle = (e: any) => {
    e.preventDefault();
    setEditStreetArt(false);
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

  const submitStreetArtImage = (id: any) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    api.uploadImageStreetArt(id, formData);
  };

  const submitStreetArt = async (e: any) => {
    e.preventDefault();
    let data = {
      location,
      authorId: api.getLocalStorageUser().id,
    };

    await api.createStreetArt(data).then((res) => {
      submitStreetArtImage(res.data.StreetArt.id);
      setEditStreetArt(false);
    });
  };
  return (
    <>
      <span>
        <FontAwesomeIcon
          onClick={() => {
            setEditStreetArt(true);
            // <MyDropDown />;
          }}
          // size="2x"
          // className="pl-1"
          icon={faEdit}
        ></FontAwesomeIcon>
      </span>

      <Modal isOpen={editStreetArt} toggle={toggle} className="">
        <ModalHeader toggle={toggle}>Edit Street Art</ModalHeader>
        <ModalBody>
          <Form onSubmit={submitStreetArt}>
            <FormGroup>
              <Label for="exampleEmail">location</Label>
              <Input
                onChange={(e) => setLocation(e.target.value)}
                type="text"
                name="location"
                id="location"
                value={art.Location}
                // placeholder="London...."
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleFile">Image</Label>
              {/* <Input type="file" name="file" id="exampleFile" /> */}
              <CustomInput
                type="file"
                accept="image/*"
                // value={art.PictureURL}
                id="exampleCustomFileBrowser"
                onChange={(e) => handleImageChange(e)}
              />
              <FormText color="muted">Please upload a photo less than 1MBs</FormText>
            </FormGroup>
            <span>
              <span style={{ float: "left" }}>
                <Button
                  disabled={
                    uploadedFile == null || file == null || location == null
                    // || visited == null
                  }
                  type="submit"
                >
                  Update
                </Button>
              </span>
              {art.authorId === userId && (
                <span style={{ float: "right" }}>
                  <Button
                    onClick={() => {
                      api.deleteStreetArt(art.id);
                      setAddStreetArt(true);
                    }}
                    color="danger"
                    type="submit"
                  >
                    Delete
                  </Button>
                </span>
              )}
            </span>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default EditStreetArt;
