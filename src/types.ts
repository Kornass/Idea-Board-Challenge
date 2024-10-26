export type Idea = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
export type NewIdeaState = {
  title: string;
  description: string;
};
export type ContextType = {
  // states
  ideas: Idea[];
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editId: string | null;
  setEditId: React.Dispatch<React.SetStateAction<string | null>>;
  activeSorting: "Alphabetically" | "Date";
  setActiveSorting: React.Dispatch<
    React.SetStateAction<"Alphabetically" | "Date">
  >;
  deletingId: string | null;
  setDeletingId: React.Dispatch<React.SetStateAction<string | null>>;
  // functions
  addIdea: (newIdea: NewIdeaState) => void;
  updateIdea: (updated: Idea | NewIdeaState, oldVersion: Idea) => void;
  deleteIdea: (id: string) => void;
  onModalClose: () => void;
};
