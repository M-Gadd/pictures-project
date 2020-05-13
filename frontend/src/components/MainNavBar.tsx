import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Col } from "reactstrap";
import api from "../api";

import { NavLink as NLink } from "react-router-dom";

const MainNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const loggingout = () => {
    api.logout().then(() => (window.location.href = "/"));
    console.log("Loggging out");
  };

  return (
    <NavLink className="d-flex justify-content-center">
      <Col xs={api.isLoggedIn() ? 6 : 12}>
        <div>
          <Navbar className="mainNavBBar" color="transparent" light expand="md">
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink style={{ color: "white" }} tag={NLink} to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={{ color: "white" }} tag={NLink} to="/streetart">
                    My uploads
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={{ color: "white" }} tag={NLink} to="/users">
                    Users
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={{ color: "white" }} tag={NLink} to="/streetarts">
                    {" "}
                    Street Art
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                {!api.isLoggedIn() && (
                  <NavItem>
                    <NavLink style={{ color: "white" }} tag={NLink} to="/signup">
                      Signup
                    </NavLink>
                  </NavItem>
                )}
                {api.isLoggedIn() && (
                  <NavItem>
                    <NavLink
                      tag={NLink}
                      style={{ color: "white" }}
                      to="#"
                      onClick={() => loggingout()}
                    >
                      Logout
                    </NavLink>
                  </NavItem>
                )}
                {!api.isLoggedIn() && (
                  <NavItem>
                    <NavLink style={{ color: "white" }} tag={NLink} to="/login">
                      Login
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
            </Collapse>
          </Navbar>
          <style>{`
            .mainNavBBar{
              color: white
            }

            .custom-toggler .navbar-toggler-icon {
             color: white
            }
          `}</style>
        </div>
      </Col>
    </NavLink>
  );
};

export default MainNavBar;
