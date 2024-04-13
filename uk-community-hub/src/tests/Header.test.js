import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Header from "../components/Header";

describe("Header Component", () => {
  it("renders logo and title correctly", () => {
    const { getByAltText, getByText } = render(<Header />);
    expect(getByAltText("UKCC")).toBeInTheDocument();
    expect(getByText("UK Community Connect")).toBeInTheDocument();
  });

  it("hides login and sign-up buttons when user is logged in", () => {
    localStorage.setItem("username", "testuser");
    const { queryByText } = render(<Header />);
    expect(queryByText("Login")).toBeNull();
    expect(queryByText("Sign Up")).toBeNull();
    localStorage.clear(); // Clean up local storage after test
  });
});
