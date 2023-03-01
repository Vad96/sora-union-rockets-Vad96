import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import { Loader } from "./components"

function App(): JSX.Element {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route
            path="/create"
            element={
              <Suspense fallback={<Loader />}>
                <div>Create</div>
              </Suspense>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <Suspense fallback={<Loader />}>
                <div>Edit</div>
              </Suspense>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
