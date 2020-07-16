import React from "react";
import { create } from "react-test-renderer";
import MainNavBar from "../components/MainNavBar";
import { BrowserRouter as Router } from "react-router-dom";

import Login from "../components/pages/Login";
import Signup from "../components/pages/Signup";
import User from "../components/pages/User";
import Users from "../components/pages/Users";

describe("MainNavBar component", () => {
  test("Matches the snapshot", () => {
    const wrapper = create(
      <Router>
        <MainNavBar />
      </Router>,
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});

describe("Login component", () => {
  test("Matches the snapshot", () => {
    const wrapper = create(<Login />);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});

describe("Signup component", () => {
  test("Matches the snapshot", () => {
    const wrapper = create(<Signup />);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
// describe("Users component", () => {
//   const data = [
//     {
//       id: "312212",
//       FirstName: "string",
//       LastName: "string",
//       PictureURL: "string",
//       CreatedAt: Date.now(),
//     },
//     {
//       id: "dasdada",
//       FirstName: "string",
//       LastName: "string",
//       PictureURL: "string",
//       CreatedAt: Date.now(),
//     },
//     {
//       id: "d232323",
//       FirstName: "string",
//       LastName: "string",
//       PictureURL: "string",
//       CreatedAt: Date.now(),
//     },
//     {
//       id: "4323213",
//       FirstName: "string",
//       LastName: "string",
//       PictureURL: "string",
//       CreatedAt: Date.now(),
//     },
//   ];
//   test("Matches the snapshot", () => {
//     const wrapper = create(<User />);
//     expect(wrapper.toJSON()).toMatchSnapshot();
//   });
// });
