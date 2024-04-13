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
});
