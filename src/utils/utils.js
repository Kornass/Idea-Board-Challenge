export const obtainLatest = (idea) => {
  // Date coming in this format: Fri Mar 22 2024 40:00:00 GMT+0100
  const dateCreate = new Date(idea.createdAt);
  const dateUpdate = new Date(idea.updatedAt);
  // if there is no update date - Date constructor is returning 'invalid date' when putting "" as an argument
  return dateUpdate !== "Invalid Date" && dateUpdate > dateCreate
    ? dateUpdate
    : dateCreate;
};
