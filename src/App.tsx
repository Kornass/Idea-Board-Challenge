import "./App.css";
import Header from "./components/Header/Header.tsx";
import Cards from "./components/Cards/Cards.tsx";
import NewIdeaModal from "./components/NewIdeaModal/NewIdeaModal.tsx";
import DeleteModal from "./components/DeleteModal/DeleteModal.tsx";
import SortingSwitch from "./components/SortingSwitch/SortingSwitch.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header />
      <SortingSwitch />
      <Cards />
      <NewIdeaModal />
      <DeleteModal />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}

export default App;