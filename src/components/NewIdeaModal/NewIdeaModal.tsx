import React from "react";
import Modal from "react-modal";
import { DataContext } from "../../context/DataContext";
import { useContext, useState, useEffect } from "react";
import "./modal.css";
import { Idea } from "../../types";
import { ContextType } from "../../types.ts";
import { NewIdeaState } from "../../types";

Modal.setAppElement("#root");

function NewIdeaModal() {
  const { modalOpen, addIdea, isEdit, ideas, onModalClose, updateIdea } =
    useContext(DataContext) as ContextType;

  // Obtaining and extracting element that is being edited based on isEdit and ideas state (fully dependend on other state values so can be static variable)
  const beingEdited = isEdit && ideas.find((idea: Idea) => idea.id === isEdit);

  const [newIdea, setNewIdea] = useState<NewIdeaState>({
    title: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewIdea((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Update the state of newIdea (that controlls inputs) to the data of element that is being edited. Why this approach? It's because modal is getting initially rendered in App.tsx on initial app render. When opened it presents data of this initial render. So whenever for editing is picked I update the state to include certain idea data to fill up controlled by this state inputs and perform editing.
  useEffect(() => {
    if (beingEdited) {
      setNewIdea({
        title: beingEdited?.title || "",
        description: beingEdited?.description || "",
      });
    }
  }, [beingEdited]);

  // Checking if some editing occured. if not - keep button disabled
  const ifEdited = () => {
    if (beingEdited) {
      if (
        beingEdited.title === newIdea.title &&
        beingEdited.description === newIdea.description
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={() => {
        setNewIdea({
          title: "",
          description: "",
        });
        onModalClose();
      }}
      contentLabel="New idea"
      overlayClassName="myoverlay"
      className="myModal"
    >
      <div className="modal">
        {/* This function adds and updates idea depending on if element is being edited */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setNewIdea({
              title: "",
              description: "",
            });
            beingEdited ? updateIdea(newIdea, beingEdited) : addIdea(newIdea);
          }}
        >
          <div className="field">
            <label>Title:</label>
            <input
              required
              type="text"
              name="title"
              onChange={handleChange}
              maxLength={50}
              value={newIdea.title}
            />
            <span className="count">{`${newIdea.title.length} / 50`}</span>
          </div>
          <div className="field">
            <label>Description:</label>
            <textarea
              required
              rows={3}
              name="description"
              onChange={handleChange}
              maxLength={140}
              value={newIdea.description}
            ></textarea>
            <span className="count">{`${newIdea.description.length} / 140`}</span>
          </div>
          <button
            disabled={
              ifEdited() || Object.values(newIdea).every((val) => val === "")
            }
            type="submit"
          >
            {isEdit ? "Update idea" : "Add idea"}
          </button>
        </form>
        <button className="close" onClick={() => onModalClose()}>
          X
        </button>
      </div>
    </Modal>
  );
}

export default NewIdeaModal;
