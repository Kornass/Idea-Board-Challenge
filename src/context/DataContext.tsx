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

  const updateIdea = (updated, oldVersion) => {
    updated = { ...oldVersion, ...updated, updatedAt: new Date() };
    setIdeas((prevState) => {
      return prevState.map((idea) => {
        if (idea.id === isEdit) return updated;
        return idea;
      });
    });
    setIsEdit(null);
    toast.success("Idea updated successfully!");
    setModalOpen(false);
  };

  const addIdea = (newIdea) => {
    newIdea = {
      ...newIdea,
      createdAt: new Date(),
      updatedAt: "",
      id: uuidv4(),
    };
    toast.success("Idea added successfully!");
    setIdeas((prevState) => [...prevState, newIdea]);
    setModalOpen(false);
  };

  const deleteIdea = (id) => {
    setIdeas((prevState) => prevState.filter((idea) => idea.id !== id));
    setDeleting(null);
    toast.info("Idea deleted successfully!");
  };

  const onModalClose = () => {
    setIsEdit(null);
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

  useEffect(() => {
    if (ideas.length) {
      localStorage.setItem("ideas", JSON.stringify(ideas));
    }
  }, [ideas]);

  // useEffect(() => {
  //   console.log(ideas);
  // }, [ideas]);

  return (
    <DataContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        addIdea,
        updateIdea,
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
