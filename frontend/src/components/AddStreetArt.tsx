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
  Button,
} from "reactstrap";
import React from "react";

export interface AddStreetArtProps {
  addStreetArt: boolean;
  setAddStreetArt: any;
}

const AddStreetArt: React.SFC<AddStreetArtProps> = ({
  addStreetArt,
  setAddStreetArt,
}) => {
  const [file, setFile] = useState() as any;
  const [uploadedFile, setUploadedFile] = useState() as any;
  const [location, setLocation] = useState() as any;

  const toggle = (e: any) => {
    e.preventDefault();
    setAddStreetArt(false);
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

    // submitStreetArtImage();
    await api.createStreetArt(data).then((res) => {
      submitStreetArtImage(res.data.StreetArt.id);

      setAddStreetArt(false);
    });
  };
  return (
    <Modal isOpen={addStreetArt} toggle={toggle} className="">
      <ModalHeader toggle={toggle}>Add Street Art</ModalHeader>
      <ModalBody>
        <Form onSubmit={submitStreetArt}>
          <FormGroup>
            <Label for="exampleEmail">location</Label>
            <Input
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              name="location"
              id="location"
              placeholder="London...."
            />
          </FormGroup>

          <FormGroup>
            <Label for="exampleFile">Image</Label>
            <CustomInput
              type="file"
              accept="image/*"
              id="exampleCustomFileBrowser"
              onChange={(e) => handleImageChange(e)}
            />
            <FormText color="muted">Please upload a photo less than 1MBs</FormText>
          </FormGroup>

          <Button
            disabled={uploadedFile == null || file == null || location == null}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddStreetArt;
