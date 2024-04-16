import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  // This state will hold id of idea that is being edited
  const [isEdit, setIsEdit] = useState(null);
  // Grab ideas from the localstorage at state initialization
  const [ideas, setIdeas] = useState([]);
  // Sorting method indicator stated
  const [activeSorting, setActiveSorting] = useState("Date");
  // State for deleting modal
  const [deleting, setDeleting] = useState(null);
  console.log(ideas);

  const addIdea = (newIdea, beingEdited, setNewIdea) => {
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

  useEffect(() => {
    // As I store data in localstorage in JSON (which is not supporting Date type), dates are coming in string format when data got retrieved from localstorage.
    if (localStorage.getItem("ideas")) {
      // Every time you reach for ideas to localstorage, change their dates to date type
      const ideasFromStorage = JSON.parse(localStorage.getItem("ideas"));
      const formatted = ideasFromStorage.map((idea) => ({
        ...idea,
        createdAt: new Date(idea.createdAt),
        updatedAt: new Date(idea.updatedAt),
      }));
      setIdeas(formatted);
    } else {
      setIdeas([]);
    }
  }, []);

  // useEffect(() => {
  //   console.log(ideas);
  // }, [ideas]);

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
