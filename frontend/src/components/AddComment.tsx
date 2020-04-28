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
  Row,
} from "reactstrap";
import React from "react";
import { useCommentsForOneStreetArt } from "../Hooks/comments";

export interface AddCommentProps {
  streetArtId: string;
  callBack: any;
}

const AddComment: React.SFC<AddCommentProps> = ({ streetArtId, callBack }) => {
  const [comment, setComment] = useState() as any;

  // const toggle = (e: any) => {
  //   e.preventDefault();
  // setAddStreetArt(false);
  // };

  const submitComment = async (e: any) => {
    e.preventDefault();
    let data = {
      body: comment,
      streetArtId,
    };

    await api.createComment(data);
    setComment("");
    // setComment(null);
    callBack();
    // .then((res) => {
    // setAddStreetArt(false);
    // });
  };
  return (
    <span onKeyDown={(e) => (e.keyCode === 13 ? submitComment(e) : "")}>
      {/* <Modal isOpen={addStreetArt} toggle={toggle} className="">
        <ModalHeader toggle={toggle}>Add Street Art</ModalHeader>
      
        <ModalBody> */}
      {/* <Form> */}
      {/* <FormGroup> */}
      <Row>
        <Col xs={10}>
          <Input
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            type="text"
            name="comment"
            id="location"
            placeholder="Add Comment..."
          />
        </Col>
        <Col className="pl-0 pt-1" xs={2}>
          <Button
            onClick={(e) => submitComment(e)}
            size="sm"
            disabled={comment == null || comment == ""}
            type="submit"
          >
            Submit
          </Button>
        </Col>
      </Row>
      {/* </FormGroup> */}
      {/* </Form> */}
      {/* </ModalBody> */}
      {/* <ModalFooter>
        <Button color="secondary" onClick={toggle}>
        Cancel
        </Button>
      </ModalFooter> */}
      {/* // </Modal> */}
    </span>
  );
};

export default AddComment;
