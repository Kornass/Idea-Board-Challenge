import { Idea } from "../types";

export const obtainLatest = (idea: Idea): Date => {
  if (idea.updatedAt > idea.createdAt) {
    return idea.updatedAt;
  }
  return idea.createdAt;
};
