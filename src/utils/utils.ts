import { Idea } from "../types";

export const getDate = (idea: Idea): Date => {
  if (idea.updatedAt > idea.createdAt) {
    return idea.updatedAt;
  }
  return idea.createdAt;
};
