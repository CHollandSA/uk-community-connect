import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Organization from "../components/Organization";

jest.mock("axios");

describe("Organization Component", () => {
  test("renders organization section with session table", async () => {
    const volunteerSessions = [
      {
        SessionID: 1,
        SessionName: "Test Session",
        Date: "2024-04-03",
      },
    ];
    axios.get.mockResolvedValue({ data: volunteerSessions });

    const { getByText } = render(<Organization />);

    // Check if organization section and session table are rendered
    expect(getByText("Organization Section")).toBeInTheDocument();
    expect(getByText("Your Sessions")).toBeInTheDocument();
    expect(getByText("Test Session")).toBeInTheDocument();
  });

  test("handles add session form submission", async () => {
    axios.post.mockResolvedValue();
    axios.get.mockResolvedValue({ data: [] });

    const { getByLabelText, getByText } = render(<Organization />);

    // Fill in the form fields
    fireEvent.change(getByLabelText("Session Name:"), {
      target: { value: "New Session" },
    });
    fireEvent.change(getByLabelText("Location:"), {
      target: { value: "New Location" },
    });
    fireEvent.change(getByLabelText("Date:"), {
      target: { value: "2024-04-03" },
    });
    fireEvent.change(getByLabelText("Time:"), { target: { value: "10:00" } });
    fireEvent.change(getByLabelText("Duration:"), { target: { value: "1" } });
    fireEvent.change(getByLabelText("Max Participants:"), {
      target: { value: "10" },
    });
    fireEvent.change(getByLabelText("Experience:"), {
      target: { value: "New Experience" },
    });

    // Submit the form
    fireEvent.click(getByText("Confirm"));

    // Check if axios.post is called with the correct arguments
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "https://express-backend-plum.vercel.app/volunteers",
        {
          sessionName: "New Session",
          location: "New Location",
          date: "2024-04-03",
          time: "10:00",
          duration: "1",
          maxParticipants: "10",
          experience: "New Experience",
          host: "Organization",
        },
        { headers: { "user-id": null } }
      );
    });
  });

  test("handles delete session button click", async () => {
    axios.delete.mockResolvedValue();
    axios.get.mockResolvedValue({ data: [] });

    const { getByText } = render(<Organization />);

    // Click the delete button
    fireEvent.click(getByText("Delete"));

    // Check if axios.delete is called with the correct arguments
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        "https://express-backend-plum.vercel.app/volunteers/undefined"
      );
    });
  });
});
