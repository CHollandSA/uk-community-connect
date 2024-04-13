import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import VolunteerSignUp from "../components/VolunteerSignUp";

describe("VolunteerSignUp Component", () => {
  test("handles form close button click", () => {
    const setShowForm = jest.fn();

    const { getByText } = render(<VolunteerSignUp setShowForm={setShowForm} />);

    // Click on the close button
    fireEvent.click(getByText("Close"));

    // Check if setShowForm function is called when the close button is clicked
    expect(setShowForm).toHaveBeenCalled();
  });
});
