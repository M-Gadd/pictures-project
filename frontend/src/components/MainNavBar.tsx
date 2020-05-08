//

import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Row,
  Col,
} from "reactstrap";
import api from "../api";

import { NavLink as NLink } from "react-router-dom";

const MainNavBar = (props: any) => {
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
          <Navbar
            className="mainNavBBar"
            // fixed="top"
            color="transparent"
            light
            expand="md"
          >
            {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              {/* <Nav className={api.isLoggedIn() ? "mx-auto" : "mr-auto"} navbar> */}
              <Nav className="mr-auto" navbar>
                {/* <Row className="d-flex nav-jutstified"> */}
                {/* <Col className="" xs={8}> */}
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
                <NavItem>
                  <NavLink style={{ color: "white" }} tag={NLink} to="/streetarts">
                    {" "}
                    I am staging
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                {/* </Col> */}
                {/* <Col xs={4}> */}
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
              {/* </Col> */}
              {/* </Row> */}
              {/* <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem> */}
              {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}

              {/* <NavbarText>Simple Text</NavbarText> */}
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

// import React, { useEffect } from "react";
// import api from "../api";

// export interface MainNavBarProps {}

// const MainNavBar: React.SFC<MainNavBarProps> = () => {
//   // useEffect(() => {}, [api.isLoggedIn()]);

//   const loggingout = () => {
//     api.logout().then(() => (window.location.href = "/"));
//   };

//   console.log(api.isLoggedIn());
//   return (
//     <div>
//       <button className="btn-dark" onClick={() => (window.location.href = "/")}>
//         Home
//       </button>
//       <button className="btn-dark" onClick={() => (window.location.href = "/signup")}>
//         Sign up
//       </button>
//       {api.isLoggedIn() ? (
//         <button className="btn-dark" onClick={() => loggingout()}>
//           Log out
//         </button>
//       ) : (
//         <button className="btn-dark" onClick={() => (window.location.href = "/login")}>
//           Login
//         </button>
//       )}

//       <button className="btn-dark" onClick={() => (window.location.href = "/streetart")}>
//         Profile streetArt
//       </button>
//       <button className="btn-dark" onClick={() => (window.location.href = "/users")}>
//         Users
//       </button>
//       <button className="btn-dark" onClick={() => (window.location.href = "/streetarts")}>
//         All streetArt
//       </button>
//     </div>
//   );
// };

// export default MainNavBar;
