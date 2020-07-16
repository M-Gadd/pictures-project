import React from "react";
import { shallow, mount, render } from "enzyme";
import User from "../components/pages/User";
import Signup from "../components/pages/Signup";
import { act } from "react-dom/test-utils";

describe("<Signup />", () => {
  it("renders without crashing", () => {
    expect(() => {
      shallow(<Signup />);
    }).not.toThrow(Error);
  });

  it("has a form", () => {
    const wrapper = mount(<Signup />);
    expect(wrapper.find("form")).toExist();
  });

  it("has 6 inputs ", () => {
    const wrapper = mount(<Signup />);
    expect(wrapper.find("input")).toHaveLength(6);
  });
  it("has submit ", () => {
    const wrapper = mount(<Signup />);
    expect(wrapper.find("input").last()).toHaveValue("Signup");
    expect(wrapper.find("input").last().getDOMNode().getAttribute("type")).toEqual(
      "submit",
    );
  });
  it("simulates submit", () => {
    const wrapper = mount(<Signup />);
    const signupBtn = wrapper.find("input").last();
    // expect(signupBtn).toHaveBeenCalledTimes(0);
    // expect(wrapper.find("input").last().simulate("click"));
    act(() => {
      signupBtn.simulate("click");
    });
    expect(wrapper.find("input").last());
  });
});
