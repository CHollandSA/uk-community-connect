import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Login from "../components/Login";

describe("Login Component", () => {
  test("renders login form with username and password fields", () => {
    const { getByLabelText } = render(<Login />);

    // Check if username and password fields are rendered
    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
  });

  test("updates username and password state when input values change", () => {
    const { getByLabelText } = render(<Login />);
    const usernameInput = getByLabelText("Username");
    const passwordInput = getByLabelText("Password");

    // Simulate typing into the username and password inputs
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    // Check if username and password state are updated
    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("testpassword");
  });

  test("calls handleLogin prop with username and password when form is submitted", () => {
    const handleLoginMock = jest.fn();
    const setShowLoginMock = jest.fn();
    const { getByText, getByLabelText } = render(
      <Login handleLogin={handleLoginMock} setShowLogin={setShowLoginMock} />
    );

    // Set input values
    const usernameInput = getByLabelText("Username");
    const passwordInput = getByLabelText("Password");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    // Submit the form
    fireEvent.click(getByText("Login"));

    // Check if handleLogin is called with correct arguments
    expect(handleLoginMock).toHaveBeenCalledWith("testuser", "testpassword");
    // Check if setShowLogin is called with false
    expect(setShowLoginMock).toHaveBeenCalledWith(false);
  });

  test("closes login form when Close button is clicked", () => {
    const setShowLoginMock = jest.fn();
    const { getByText } = render(<Login setShowLogin={setShowLoginMock} />);

    // Click the Close button
    fireEvent.click(getByText("Close"));

    // Check if setShowLogin is called with false
    expect(setShowLoginMock).toHaveBeenCalledWith(false);
  });
});
