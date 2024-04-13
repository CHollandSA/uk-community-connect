import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import VolunteerOrg from "../components/VolunteerOrg";
import axios from "axios";

jest.mock("axios");

describe("VolunteerOrg Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
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
