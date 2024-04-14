import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Booking from "../components/Booking";

// Mock axios for API requests
jest.mock("axios");

describe("Booking Component", () => {
  test("renders booking page with session table and user table", async () => {
    const { getByText } = render(<Booking />);

    // Check if booking page title is rendered
    expect(getByText("Booking")).toBeInTheDocument();

    // Check if session table is rendered
    expect(getByText("Available Sessions")).toBeInTheDocument();

    // Check if user table is rendered
    expect(getByText("Booked Sessions")).toBeInTheDocument();
  });

  test("fetches volunteer sessions and user sessions on component mount", async () => {
    const { getByText } = render(<Booking />);

    // Check if fetchVolunteers and fetchUserSessions are called
    await waitFor(() => {
      expect(getByText("No available sessions")).toBeInTheDocument();
      expect(getByText("No sessions linked to the user")).toBeInTheDocument();
    });
  });

  // Add more test cases to cover other functionalities of the Booking component
});
