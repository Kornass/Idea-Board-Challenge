type Idea = {
  createdAt: Date;
  updatedAt: Date | string; // is string only when idea is not updated (empty string)
};

export const obtainLatest = (idea: Idea): Date => {
  if (!idea.updatedAt) return idea.createdAt;
  if (idea.updatedAt instanceof Date) {
    return idea.updatedAt;
  }
  return idea.createdAt;
};
