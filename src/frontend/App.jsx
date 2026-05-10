import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ChecklistPage from "./pages/ChecklistPage";
import NotesPage from "./pages/NotesPage";
import PublicTripPage from "./pages/PublicTripPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ChecklistPage />} />
        <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="/notes" element={<NotesPage />} />
      </Route>
      <Route path="/public/:tripId" element={<PublicTripPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
