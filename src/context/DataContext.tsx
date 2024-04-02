import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  // This state will hold id of idea that is being edited
  const [isEdit, setIsEdit] = useState(null);
  // Grab ideas from the localstorage at state initialization
  const [ideas, setIdeas] = useState(
    JSON.parse(localStorage.getItem("ideas")) || []
  );

  // Sorting method indicator stated
  const [activeSorting, setActiveSorting] = useState("Date");
  // State for deleting modal
  const [deleting, setDeleting] = useState(null);

  const addIdea = (e, newIdea, beingEdited, setNewIdea) => {
    e.preventDefault();
    // Variable to store new version of ideas
    let newIdeas;
    if (beingEdited) {
      // Updating existing one
      newIdea = { ...beingEdited, ...newIdea, updatedAt: new Date() };
      newIdeas = [...ideas];
      const idx = newIdeas.findIndex((idea) => idea.id === isEdit);
      newIdeas[idx] = newIdea;
      setIsEdit(null);
      toast.success("Idea updated successfully!");
    } else {
      // reassigning newIdea to add all required fields
      newIdea = {
        ...newIdea,
        createdAt: new Date(),
        updatedAt: "",
        id: uuidv4(),
      };
      newIdeas = [...ideas, newIdea];
      toast.success("Idea added successfully!");
    }
    setIdeas(newIdeas);
    localStorage.setItem("ideas", JSON.stringify(newIdeas));
    setModalOpen(false);
    // resetting new Idea to keep the structure
    setNewIdea({
      title: "",
      description: "",
    });
  };

  const deleteIdea = (id) => {
    const idx = ideas.findIndex((idea) => idea.id === id);
    const temp = [...ideas];
    temp.splice(idx, 1);
    setIdeas(temp);
    localStorage.setItem("ideas", JSON.stringify(temp));
    setDeleting(null);
    toast.info("Idea deleted successfully!");
  };

  const onModalClose = (setLocalState) => {
    setIsEdit(null);
    setLocalState({
      title: "",
      description: "",
    });
    setModalOpen((prev) => !prev);
  };

  return (
    <DataContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        addIdea,
        ideas,
        deleteIdea,
        isEdit,
        setIsEdit,
        activeSorting,
        setActiveSorting,
        onModalClose,
        deleting,
        setDeleting,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
