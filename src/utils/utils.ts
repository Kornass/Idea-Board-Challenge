interface Idea {
  createdAt: Date;
  updatedAt: Date | string; // is string only when idea is not updated (empty string)
}

export const obtainLatest = (idea: Idea) => {
  if (!idea.updatedAt) return idea.createdAt;
  if (idea.updatedAt > idea.createdAt) {
    return idea.updatedAt;
  }
  return idea.createdAt;
};
