import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Signup from "../components/Signup";

describe("Signup Component", () => {
  test("renders signup form", () => {
    const { getByLabelText, getByText } = render(<Signup />);

    // Check if signup form elements are rendered
    expect(getByLabelText("Name")).toBeInTheDocument();
    expect(getByLabelText("Surname")).toBeInTheDocument();
    expect(getByLabelText("Username")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByLabelText("Repeat Password")).toBeInTheDocument();
    expect(
      getByLabelText("Are you signing up as part of an organization?")
    ).toBeInTheDocument();
    expect(getByText("Signup")).toBeInTheDocument();
    expect(getByText("Close")).toBeInTheDocument();
  });

  test("handles signup form submission", async () => {
    const handleSignUp = jest.fn().mockResolvedValue(true);
    const setShowSignUp = jest.fn();
    const { getByLabelText, getByText } = render(
      <Signup handleSignUp={handleSignUp} setShowSignUp={setShowSignUp} />
    );

    // Fill in the form fields
    fireEvent.change(getByLabelText("Name"), { target: { value: "John" } });
    fireEvent.change(getByLabelText("Surname"), { target: { value: "Doe" } });
    fireEvent.change(getByLabelText("Username"), {
      target: { value: "johndoe" },
    });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(getByLabelText("Repeat Password"), {
      target: { value: "password" },
    });
    fireEvent.click(
      getByLabelText("Are you signing up as part of an organization?")
    );

    // Submit the form
    fireEvent.click(getByText("Signup"));

    // Check if handleSignUp is called with the correct arguments
    await waitFor(() => {
      expect(handleSignUp).toHaveBeenCalledWith(
        "John",
        "Doe",
        "johndoe",
        "john@example.com",
        "password",
        true,
        ""
      );
    });

    // Check if setShowSignUp is called after successful signup
    expect(setShowSignUp).toHaveBeenCalledWith(false);
  });

  test("displays error message for missing fields", async () => {
    const handleSignUp = jest.fn();
    const setShowSignUp = jest.fn();
    const { getByText } = render(
      <Signup handleSignUp={handleSignUp} setShowSignUp={setShowSignUp} />
    );

    // Submit the form without filling in any fields
    fireEvent.click(getByText("Signup"));

    // Check if error message is displayed for missing fields
    await waitFor(() => {
      expect(getByText("Error: All fields are required")).toBeInTheDocument();
    });

    // Check if handleSignUp is not called
    expect(handleSignUp).not.toHaveBeenCalled();
    expect(setShowSignUp).not.toHaveBeenCalled();
  });

  // Additional tests can be added to cover other scenarios like password mismatch, organization signup, etc.
});
