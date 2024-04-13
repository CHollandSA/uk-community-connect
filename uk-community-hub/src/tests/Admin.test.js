import React from "react";
import { render, waitFor } from "@testing-library/react";
import Admin from "../components/Admin";

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
});
