export type Idea = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date | string;
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
  isEdit: string | null;
  setIsEdit: React.Dispatch<React.SetStateAction<string | null>>;
  activeSorting: string;
  setActiveSorting: React.Dispatch<React.SetStateAction<string>>;
  deleting: string | null;
  setDeleting: React.Dispatch<React.SetStateAction<string | null>>;
  // functions
  addIdea: (newIdea: NewIdeaState) => void;
  updateIdea: (updated: Idea | NewIdeaState, oldVersion: Idea) => void;
  deleteIdea: (id: string) => void;
  onModalClose: () => void;
};
