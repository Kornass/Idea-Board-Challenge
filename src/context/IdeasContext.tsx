// Native imports
import * as React from "react";
import { createContext, useState, useEffect } from "react";
// Packages
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
// Types
import { Idea, NewIdeaState } from "../types";
import { ContextType } from "../types";

export const IdeasContext = createContext<ContextType | null>(null);

export const IdeasContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // This state will hold id of idea that is being edited
  const [editId, setEditId] = useState<string | null>(null);
  // Grab ideas from the localstorage at state initialization
  const [ideas, setIdeas] = useState<Idea[]>([]);
  // Sorting method indicator stated
  const [activeSorting, setActiveSorting] = useState<"Alphabetically" | "Date">(
    "Date"
  );
  // State for deleting modal
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const updateIdea = (updated: Idea | NewIdeaState, oldVersion: Idea) => {
    const updatedIdea = { ...oldVersion, ...updated, updatedAt: new Date() };
    setIdeas((prevState) => {
      return prevState.map((idea) => {
        if (idea.id === editId) return updatedIdea;
        return idea;
      });
    });
    setEditId(null);
    setModalOpen(false);
    toast.success("Idea updated successfully!");
  };

  const addIdea = (newIdea: NewIdeaState) => {
    setIdeas((prevState) => [
      ...prevState,
      {
        ...newIdea,
        updatedAt: new Date(),
        createdAt: new Date(),
        id: uuidv4(),
      },
    ]);
    setModalOpen(false);
    toast.success("Idea added successfully!");
  };

  const deleteIdea = (id: string) => {
    setIdeas((prevState) => prevState.filter((idea: Idea) => idea.id !== id));
    setDeletingId(null);
    toast.info("Idea deleted successfully!");
  };

  const onModalClose = () => {
    setEditId(null);
    setModalOpen((prev) => !prev);
  };

  useEffect(() => {
    // As I store data in localstorage in JSON (which is not supporting Date type), dates are coming in string format when data got retrieved from localstorage.
    if (localStorage.getItem("ideas")) {
      // Every time you reach for ideas to localstorage, change their dates to date type
      const ideasFromStorage: Idea[] = JSON.parse(
        localStorage.getItem("ideas") as string
      );
      const formatted = ideasFromStorage.map((idea: Idea) => ({
        ...idea,
        updatedAt: new Date(idea.updatedAt),
        createdAt: new Date(idea.createdAt),
      }));
      setIdeas(formatted);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ideas", JSON.stringify(ideas));
  }, [ideas]);

  // useEffect(() => {
  //   console.log(ideas);
  // }, [ideas]);

  return (
    <IdeasContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        addIdea,
        updateIdea,
        ideas,
        deleteIdea,
        editId,
        setEditId,
        activeSorting,
        setActiveSorting,
        onModalClose,
        deletingId,
        setDeletingId,
      }}
    >
      {children}
    </IdeasContext.Provider>
  );
};
