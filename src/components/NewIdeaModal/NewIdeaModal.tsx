import Modal from "react-modal";
import { DataContext } from "../../context/DataContext";
import { useContext, useState, useEffect } from "react";
import "./modal.css";

Modal.setAppElement("#root");

function NewIdeaModal() {
  const { modalOpen, addIdea, isEdit, ideas, onModalClose } =
    useContext(DataContext);

  const [newIdea, setNewIdea] = useState({
    title: "",
    description: "",
  });

  // Obtaining and extracting element that is being edited based on isEdit and ideas state (fully dependend on other state values so can be static variable)
  const beingEdited = isEdit && ideas.find((idea) => idea.id === isEdit);

  const handleChange = (e) => {
    setNewIdea((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // As newIdea state is initialized on first render. Modal is rendering initially with new idea without data and beingedited being empty ass well. That's why i decided to watch beingEdited changes and update the idea state value once we pick idea to edit
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
        onModalClose(setNewIdea);
      }}
      contentLabel="New idea"
      overlayClassName="myoverlay"
      className="myModal"
    >
      <div className="modal">
        {/* This function adds and updates idea depending on if element is being edited */}
        <form onSubmit={(e) => addIdea(e, newIdea, beingEdited, setNewIdea)}>
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
        <button className="close" onClick={() => onModalClose(setNewIdea)}>
          X
        </button>
      </div>
    </Modal>
  );
}

export default NewIdeaModal;
