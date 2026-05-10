import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChecklistPage from "./pages/ChecklistPage";
import NotesPage from "./pages/NotesPage";
import PublicTripPage from "./pages/PublicTripPage";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/public/:tripId" element={<PublicTripPage />} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<div>Welcome to Traveloop Hackathon. Select a trip to begin.</div>} />
                <Route path="/checklist/:tripId" element={<ChecklistPage />} />
                <Route path="/notes/:tripId" element={<NotesPage />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
