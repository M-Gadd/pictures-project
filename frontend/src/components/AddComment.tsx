import { useState } from "react";
import api from "../api";
import { Input, Col, Button, Row } from "reactstrap";
import React from "react";

export interface AddCommentProps {
  streetArtId: string;
  callBack: any;
}

const AddComment: React.SFC<AddCommentProps> = ({ streetArtId, callBack }) => {
  const [comment, setComment] = useState() as any;

  const submitComment = async (e: any) => {
    e.preventDefault();
    let data = {
      body: comment,
      streetArtId,
    };

    await api.createComment(data);
    setComment("");
    callBack();
  };
  return (
    <span onKeyDown={(e) => (e.keyCode === 13 ? submitComment(e) : "")}>
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
            disabled={comment === null || comment === ""}
            type="submit"
          >
            Submit
          </Button>
        </Col>
      </Row>
    </span>
  );
};

export default AddComment;
