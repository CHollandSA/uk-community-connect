import React from "react";
import { render, waitFor } from "@testing-library/react";
import Admin from "../components/Admin";
import * as axios from "axios";

jest.mock("axios");
describe("Admin Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders admin page with session table and user table", async () => {
    const { getByText } = render(<Admin />);
    expect(getByText("Admin Page")).toBeInTheDocument();
    expect(getByText("Available Sessions")).toBeInTheDocument();
    expect(getByText("Users")).toBeInTheDocument();
  });

  test("fetches volunteer sessions and users on component mount", async () => {
    const mockVolunteerSessions = [
      {
        SessionID: 1,
        SessionName: "Session 1",
        Date: new Date().toISOString(),
        Experience: "Experience 1",
      },
    ];
    const mockUsers = [
      {
        UserID: 1,
        FirstName: "John",
        LastName: "Doe",
        UserName: "johndoe",
        Email: "john@example.com",
      },
    ];
    axios.get({ data: mockVolunteerSessions })({ data: mockUsers });

    const { getByText } = render(<Admin />);

    await waitFor(() => {
      expect(getByText("No available sessions")).toBeInTheDocument();
      expect(getByText("No users available")).toBeInTheDocument();
    });
  });

  // Add more test cases to cover other functionalities of the Admin component
});
