import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";
import AppRoutes from "./Routes/routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </>
  );
}

export default App;
