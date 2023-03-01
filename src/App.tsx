import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Footer, Header } from "./components";
import { HomePage } from "./pages";
import { Loader } from "./components"
const CreateCardPage = React.lazy(() => import("./pages/CreateCardPage/CreateCardPage"));
const EditCardPage = React.lazy(() => import("./pages/EditCardPage/EditCardPage"));

function App(): JSX.Element {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/create"
            element={
              <Suspense fallback={<Loader />}>
                <CreateCardPage />
              </Suspense>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <Suspense fallback={<Loader />}>
                <EditCardPage />
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
