import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ManagedForm } from "./components/ManagedForm/ManagedForm";
import { FormListing } from "./components/FormListing/FormListing";
import Header from "./components/Header/Header";
import "./styles/App.css";

import { ToastContainer } from "react-toastify";
import { FormPreview } from "./components/FormPreview/FormPreview";

function App() {
  return (
    <>
      <main>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<FormListing />} />
            <Route path="/forms" element={<FormListing />} />
            <Route
              path="/generate"
              element={<ManagedForm managedForm={undefined} />}
            />
            <Route path="/preview/:id" Component={FormPreview} />
            <Route path="/preview" Component={FormPreview} />

            <Route path="/profile" element={<></>} />
          </Routes>
        </Router>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
