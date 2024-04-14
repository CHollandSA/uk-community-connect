import React from "react";
import { render, fireEvent } from "@testing-library/react";
import HeroSection from "../components/HeroSection";

describe("HeroSection Component", () => {
  test("renders Hero section with headings, paragraphs, and button", () => {
    const { getByText, getByAltText } = render(<HeroSection />);

    // Check if headings, paragraphs, and button are rendered
    expect(getByText("Information")).toBeInTheDocument();
    expect(getByText("Click for more/less info")).toBeInTheDocument();
    expect(getByAltText("UK")).toBeInTheDocument();
    expect(getByText('The "UK Community Connect" project')).toBeInTheDocument();
  });

  test("expands/collapses additional information when button is clicked", () => {
    const { getByText, queryByText } = render(<HeroSection />);

    // Check if additional information is initially hidden
    expect(queryByText("Purpose of the Website:")).toBeNull();
    expect(queryByText("Explore Resources:")).toBeNull();

    // Click the button to show additional information
    fireEvent.click(getByText("Click for more/less info"));

    // Check if additional information is now visible
    expect(getByText("Purpose of the Website:")).toBeInTheDocument();
    expect(getByText("Explore Resources:")).toBeInTheDocument();

    // Click the button again to hide additional information
    fireEvent.click(getByText("Click for more/less info"));

    // Check if additional information is now hidden again
    expect(queryByText("Purpose of the Website:")).toBeNull();
    expect(queryByText("Explore Resources:")).toBeNull();
  });

  // Add more test cases to cover other functionalities of the HeroSection component
});
