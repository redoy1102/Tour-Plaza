import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Spinner from "./components/shared/Spinner";
import MainRoutes from "./routes";

function App() {
  const [isAppReady] = useState(true);

  if (!isAppReady) return <Spinner />;

  return (
    <main className="bg-background overflow-x-hidden">
      <Toaster position="top-center" />
      <Router>
        <MainRoutes />
      </Router>
    </main>
  );
}

export default App;
