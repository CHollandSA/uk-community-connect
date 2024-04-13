import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Header from "../components/Header";

jest.mock("axios");

describe("Header Component", () => {
  it("renders logo and title correctly", () => {
    const { getByAltText, getByText } = render(<Header />);
    expect(getByAltText("UKCC")).toBeInTheDocument();
    expect(getByText("UK Community Connect")).toBeInTheDocument();
  });

  it("displays login and sign-up buttons when user is not logged in", () => {
    const { getByText } = render(<Header />);
    expect(getByText("Login")).toBeInTheDocument();
    expect(getByText("Sign Up")).toBeInTheDocument();
  });

  it("hides login and sign-up buttons when user is logged in", () => {
    localStorage.setItem("username", "testuser");
    const { queryByText } = render(<Header />);
    expect(queryByText("Login")).toBeNull();
    expect(queryByText("Sign Up")).toBeNull();
    localStorage.clear(); // Clean up local storage after test
  });

  it("opens login form when login button is clicked", () => {
    const { getByText, getByTestId } = render(<Header />);
    fireEvent.click(getByText("Login"));
    expect(getByTestId("login-form")).toBeInTheDocument();
  });

  it("opens sign-up form when sign-up button is clicked", () => {
    const { getByText, getByTestId } = render(<Header />);
    fireEvent.click(getByText("Sign Up"));
    expect(getByTestId("signup-form")).toBeInTheDocument();
  });
});
