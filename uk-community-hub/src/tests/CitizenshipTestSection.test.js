import React from "react";
import { render } from "@testing-library/react";
import CitizenshipTestSection from "../components/CitizenshipTestSection";

describe("CitizenshipTestSection Component", () => {
  test("renders Citizenship section with headings and paragraphs", () => {
    const { getByText } = render(<CitizenshipTestSection />);

    // Check if headings and paragraphs are rendered
    expect(getByText("Citizenship Section")).toBeInTheDocument();
    expect(getByText("Applying for Citizenship in the UK")).toBeInTheDocument();
    expect(getByText("Citizenship Test")).toBeInTheDocument();
    expect(getByText("Learning English")).toBeInTheDocument();
    expect(getByText("Local Activities and Events")).toBeInTheDocument();
    expect(getByText("Range of Activities")).toBeInTheDocument();
  });

  // Add more test cases to cover other functionalities of the CitizenshipTestSection component
});
