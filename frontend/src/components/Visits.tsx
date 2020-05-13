import React from "react";
import { useVisitsForOneStreetArt } from "../Hooks/visits";
import api from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { FormText, Row, Col } from "reactstrap";

export interface VisitsProps {
  streetArtId: string;
}

const Visits: React.SFC<VisitsProps> = ({ streetArtId }) => {
  const {
    visitsForOneStreetArt,
    isLoading,
    setVisitsForOneStreetArt,
    usersVisited,
    setUsersVisited,
  } = useVisitsForOneStreetArt(streetArtId);

  const userId = api.getLocalStorageUser() ? api.getLocalStorageUser().id : "";
  let userVisited = false;
  let visitId: any;
  let numberOfVisits = 0;

  if (!isLoading) {
    numberOfVisits = visitsForOneStreetArt.length;
    visitsForOneStreetArt.map((visit: any) => {
      if (visit.userId === userId && visit.streetArtId === streetArtId) {
        userVisited = true;
        visitId = visit.id;
      }
    });
  }

  let visitParagraph;

  if (numberOfVisits === 0) {
    visitParagraph = "";
  } else if (numberOfVisits === 1) {
    if (userVisited) {
      visitParagraph = "Visited by you..";
    } else {
      visitParagraph = `Visited by ${usersVisited[0].Email}`;
    }
  } else if (numberOfVisits === 2) {
    if (userVisited) {
      visitParagraph = `Visited by you and ${usersVisited[0].Email} `;
    } else {
      visitParagraph = `Visited by ${usersVisited[0].Email} and ${usersVisited[1].Email}`;
    }
  } else if (numberOfVisits > 2) {
    if (userVisited) {
      visitParagraph = `Visited by you, ${usersVisited[0].Email} and ${
        numberOfVisits - 2
      } ${numberOfVisits - 2 === 1 ? "more person..." : "others..."} `;
    } else {
      visitParagraph = `Visited by ${usersVisited[0].Email} and others`;
    }
  } else {
    visitParagraph = `This place has been visited ${numberOfVisits}`;
  }

  const addVisit = async () => {
    let data = {
      streetArtId,
    };

    await api.createVisit(data);
    const newVisits = await api.getAllVisitsForOneStreetArt(streetArtId);
    setVisitsForOneStreetArt(newVisits.data.visits);
    setUsersVisited(newVisits.data.users);
  };

  const removeVisit = async () => {
    await api.deleteVisit(visitId);
    const newVisits = await api.getAllVisitsForOneStreetArt(streetArtId);
    setVisitsForOneStreetArt(newVisits.data.visits);
    setUsersVisited(newVisits.data.users);
  };

  const visitToggle = async () => {
    userVisited ? removeVisit() : addVisit();
  };

  return (
    <div className="style-fav">
      <div className="style-heart-outer">
        <span className="mr-4">
          {userId ? (
            <Row>
              <Col xs={12}>
                <span onClick={visitToggle}>
                  <FontAwesomeIcon
                    style={{ color: userVisited ? "red" : "" }}
                    size="2x"
                    className="mr-2 "
                    icon={faPlaneDeparture}
                  />
                </span>
                <br />
                <FormText style={{ fontWeight: "bold", color: "white" }} color="muted">
                  {numberOfVisits} Visits
                </FormText>
              </Col>
            </Row>
          ) : (
            ""
          )}
        </span>
      </div>
    </div>
  );
};

export default Visits;
