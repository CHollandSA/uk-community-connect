import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import VolunteerSignUp from "../components/VolunteerSignUp";

describe("VolunteerSignUp Component", () => {
  test("renders form fields and handles form submission", async () => {
    const setShowForm = jest.fn();
    const mockSessionName = "Test Session";
    const mockLocation = "Test Location";
    const mockDate = "2024-04-10";
    const mockTime = "10:00";
    const mockDuration = "1 hour";
    const mockMaxParticipants = "10";
    const mockExperience = "Test Experience";

    const { getByLabelText, getByText } = render(
      <VolunteerSignUp setShowForm={setShowForm} />
    );

    // Fill out form fields
    fireEvent.change(getByLabelText("Session Name:"), {
      target: { value: mockSessionName },
    });
    fireEvent.change(getByLabelText("Location:"), {
      target: { value: mockLocation },
    });
    fireEvent.change(getByLabelText("Date:"), { target: { value: mockDate } });
    fireEvent.change(getByLabelText("Time:"), { target: { value: mockTime } });
    fireEvent.change(getByLabelText("Duration:"), {
      target: { value: mockDuration },
    });
    fireEvent.change(getByLabelText("Max Participants:"), {
      target: { value: mockMaxParticipants },
    });
    fireEvent.change(getByLabelText("Experience:"), {
      target: { value: mockExperience },
    });

    // Click on the submit button
    fireEvent.click(getByText("Submit"));

    // Check if setShowForm function is called after successful form submission
    await waitFor(() => expect(setShowForm).toHaveBeenCalledWith(false));
  });

  test("handles form close button click", () => {
    const setShowForm = jest.fn();

    const { getByText } = render(<VolunteerSignUp setShowForm={setShowForm} />);

    // Click on the close button
    fireEvent.click(getByText("Close"));

    // Check if setShowForm function is called when the close button is clicked
    expect(setShowForm).toHaveBeenCalled();
  });
});
