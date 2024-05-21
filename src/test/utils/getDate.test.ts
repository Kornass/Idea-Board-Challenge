import { describe, it, expect } from "vitest";
import { getDate } from "../../utils/utils";
import { Idea } from "../../types";

describe("getDate function", () => {
  it("Should return createdAt when idea is created", () => {
    // Arrange
    const idea: Idea = {
      id: "1",
      title: "Title",
      description: "description",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // Act
    const result = getDate(idea);
    // Assert
    expect(result).toEqual(idea.createdAt);
  });
  it("Should return updatedAt if updatedAt further in the future than createdAt", () => {
    const idea: Idea = {
      id: "1",
      title: "Title",
      description: "description",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2023-05-01"),
    };
    const result = getDate(idea);
    expect(result).toEqual(idea.updatedAt);
  });
  it("Should return createdAt if updatedAt is not further in the future than createdAt", () => {
    const idea: Idea = {
      id: "1",
      title: "Title",
      description: "description",
      createdAt: new Date("2023-05-01"),
      updatedAt: new Date("2023-01-01"),
    };
    const result = getDate(idea);
    expect(result).toEqual(idea.createdAt);
  });
});
