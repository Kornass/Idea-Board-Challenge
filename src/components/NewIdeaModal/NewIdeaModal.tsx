import React from "react";
import Modal from "react-modal";
import { IdeasContext } from "../../context/IdeasContext.tsx";
import { useContext, useState, useEffect } from "react";
import "./modal.css";
import { Idea } from "../../types";
import { ContextType } from "../../types.ts";

Modal.setAppElement("#root");

function NewIdeaModal() {
  const { modalOpen, addIdea, editId, ideas, onModalClose, updateIdea } =
    useContext(IdeasContext) as ContextType;

  const beingEdited = editId && ideas.find((idea: Idea) => idea.id === editId);

  const [newIdea, setNewIdea] = useState({
    title: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewIdea((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (beingEdited) {
      setNewIdea({
        title: beingEdited?.title || "",
        description: beingEdited?.description || "",
      });
    }
  }, [beingEdited]);

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
              (beingEdited &&
                beingEdited?.title === newIdea.title &&
                beingEdited?.description === newIdea.description) ||
              Object.values(newIdea).every((val) => val === "")
            }
            type="submit"
          >
            {editId ? "Update idea" : "Add idea"}
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
