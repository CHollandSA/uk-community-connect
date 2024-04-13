import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import VolunteerOrg from "../components/VolunteerOrg";
import axios from "axios";

jest.mock("axios");

describe("VolunteerOrg Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders volunteer sessions table", async () => {
    const mockSessions = [
      {
        SessionID: 1,
        OrganizationName: "Org1",
        SessionName: "Session1",
        Date: "2024-04-10",
        Time: "10:00",
        Location: "Location1",
      },
      {
        SessionID: 2,
        OrganizationName: "Org2",
        SessionName: "Session2",
        Date: "2024-04-11",
        Time: "11:00",
        Location: "Location2",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockSessions });

    const { getByText, getByRole } = render(
      <VolunteerOrg setShowOrganizationForm={() => {}} />
    );

    // Check if "Volunteer Sessions:" heading is rendered
    expect(getByText("Volunteer Sessions:")).toBeInTheDocument();

    // Check if volunteer sessions table headers are rendered
    expect(getByText("Organization")).toBeInTheDocument();
    expect(getByText("Session")).toBeInTheDocument();
    expect(getByText("Date")).toBeInTheDocument();
    expect(getByText("Time")).toBeInTheDocument();
    expect(getByText("Location")).toBeInTheDocument();
    expect(getByText("Volunteer")).toBeInTheDocument();

    // Check if axios.get is called with the correct URL
    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith(
        "https://express-backend-plum.vercel.app/volunteersessions"
      )
    );

    // Check if volunteer session data is rendered
    expect(getByText("Org1")).toBeInTheDocument();
    expect(getByText("Session1")).toBeInTheDocument();
    expect(getByText("10/04/2024")).toBeInTheDocument();
    expect(getByText("10:00")).toBeInTheDocument();
    expect(getByText("Location1")).toBeInTheDocument();

    expect(getByText("Org2")).toBeInTheDocument();
    expect(getByText("Session2")).toBeInTheDocument();
    expect(getByText("11/04/2024")).toBeInTheDocument();
    expect(getByText("11:00")).toBeInTheDocument();
    expect(getByText("Location2")).toBeInTheDocument();
  });

  test("handles volunteer button click", async () => {
    const mockSessions = [
      {
        SessionID: 1,
        OrganizationName: "Org1",
        SessionName: "Session1",
        Date: "2024-04-10",
        Time: "10:00",
        Location: "Location1",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockSessions });

    const mockShowOrganizationForm = jest.fn();

    const { getByText } = render(
      <VolunteerOrg setShowOrganizationForm={mockShowOrganizationForm} />
    );

    // Click on the volunteer button
    fireEvent.click(getByText("Volunteer"));

    // Check if the volunteer function is called with the correct parameters
    expect(window.alert).toHaveBeenCalledWith(
      "You have kindly volunteered to help out the organization Org1 for their session: Session1"
    );
  });

  test("closes the volunteer organization form", async () => {
    const mockSessions = [
      {
        SessionID: 1,
        OrganizationName: "Org1",
        SessionName: "Session1",
        Date: "2024-04-10",
        Time: "10:00",
        Location: "Location1",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockSessions });

    const mockShowOrganizationForm = jest.fn();

    const { getByText } = render(
      <VolunteerOrg setShowOrganizationForm={mockShowOrganizationForm} />
    );

    // Click on the close button
    fireEvent.click(getByText("Close"));

    // Check if the setShowOrganizationForm function is called
    expect(mockShowOrganizationForm).toHaveBeenCalled();
  });
});
