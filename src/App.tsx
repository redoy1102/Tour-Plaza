import "./App.css";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Spinner from "./components/shared/Spinner";
import AppRoutes from "./routes";

function App() {
  const [isAppReady] = useState(true);

  if (!isAppReady) return <Spinner />;

  return (
    <main className="bg-background overflow-x-hidden">
      <Toaster position="top-center" />
      <AppRoutes />
    </main>
  );
}

export default App;
