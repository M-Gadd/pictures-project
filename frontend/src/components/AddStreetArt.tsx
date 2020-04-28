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
  // const [visited, setVisited] = useState() as any;

  // const addStreetArt = () => {
  //   setModal(!modal);
  // };

  // useEffect(() => {}, [streetArt]);

  const toggle = (e: any) => {
    e.preventDefault();
    // setModal(!modal);
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
    // userAvatarUpdate(formData);
    api.uploadImageStreetArt(id, formData);
    // console.log(formData);
  };

  const submitStreetArt = async (e: any) => {
    e.preventDefault();
    let data = {
      location,
      // visited,
      authorId: api.getLocalStorageUser().id,
    };

    // submitStreetArtImage();
    await api.createStreetArt(data).then((res) => {
      // window.location.href = "/"
      // console.log("Sent", res.data.StreetArt.id),
      submitStreetArtImage(res.data.StreetArt.id);
      // setModal(!modal);
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
            {/* <Input type="file" name="file" id="exampleFile" /> */}
            <CustomInput
              type="file"
              accept="image/*"
              id="exampleCustomFileBrowser"
              onChange={(e) => handleImageChange(e)}
            />
            <FormText color="muted">Please upload a photo less than 1MBs</FormText>
          </FormGroup>

          {/* <FormGroup tag="fieldset" row>
            <legend className="col-form-label col-sm-2">Radio Buttons</legend>
            <Col xs={6}>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={(e) => setVisited(e.target.value)}
                    type="radio"
                    name="radio2"
                    value="visited"
                  />{" "}
                  Visited
                </Label>
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup check>
                <Label check>
                  <Input
                    onChange={(e) => setVisited(e.target.value)}
                    type="radio"
                    name="radio2"
                    value="not visited"
                  />{" "}
                  Not Visited
                </Label>
              </FormGroup>
            </Col>
          </FormGroup> */}

          <Button
            disabled={
              uploadedFile == null || file == null || location == null
              // || visited == null
            }
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </ModalBody>
      {/* <ModalFooter>
      <Button color="secondary" onClick={toggle}>
        Cancel
      </Button>
    </ModalFooter> */}
    </Modal>
  );
};

export default AddStreetArt;
