import React, { useState } from "react";
import "./styles/main.scss";
import TabBar from "./components/TabBar";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import MovieDetail from "./pages/MovieDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewModeSwitch from "./components/ViewModeSwitch";

function App() {
  const [tab, setTab] = useState<"now_playing" | "top_rated">("now_playing");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ padding: "16px" }}>
              <TabBar
                tab={tab}
                onChange={(t) => {
                  setTab(t);
                  setSearch("");
                }}
              />
              <SearchBar onSearch={handleSearch} />
              <ViewModeSwitch mode={viewMode} onChange={setViewMode} />
              <MovieList type={tab} search={search} viewMode={viewMode} />
            </div>
          }
        />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
