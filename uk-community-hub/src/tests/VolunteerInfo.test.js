import React from "react";
import { render, fireEvent } from "@testing-library/react";
import VolunteerInfo from "../components/VolunteerInfo";

describe("VolunteerInfo Component", () => {
  test("renders volunteer info section", () => {
    const { getByText, getByRole } = render(<VolunteerInfo />);

    // Check if volunteer info elements are rendered
    expect(getByText("Volunteer Services")).toBeInTheDocument();
    expect(getByText("Offer a Volunteer Session")).toBeInTheDocument();
    expect(getByText("Volunteer with an Organization")).toBeInTheDocument();
    expect(getByRole("img", { name: "Info" })).toBeInTheDocument();
  });

  test("displays popover with information on how to volunteer", () => {
    const { getByText, getByRole } = render(<VolunteerInfo />);

    // Click on the info icon to trigger the popover
    fireEvent.click(getByRole("img", { name: "Info" }));

    // Check if popover content is displayed
    expect(getByText("Information on how to volunteer")).toBeInTheDocument();
    expect(
      getByText(
        "Volunteer Services Section provides users with the opportunity to offer their services to the system."
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        "Alternatively, users can volunteer with organizations by following these steps:"
      )
    ).toBeInTheDocument();
  });

  test('shows individual volunteer form when "Offer a Volunteer Session" button is clicked', () => {
    const { getByText } = render(<VolunteerInfo />);

    // Click on the "Offer a Volunteer Session" button
    fireEvent.click(getByText("Offer a Volunteer Session"));

    // Check if individual volunteer form is displayed
    expect(getByText("Offer Volunteer Session")).toBeInTheDocument();
  });

  test('shows organization volunteer form when "Volunteer with an Organization" button is clicked', () => {
    const { getByText } = render(<VolunteerInfo />);

    // Click on the "Volunteer with an Organization" button
    fireEvent.click(getByText("Volunteer with an Organization"));

    // Check if organization volunteer form is displayed
    expect(getByText("Volunteer with Organization")).toBeInTheDocument();
  });
});
