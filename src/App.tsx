import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";
import AppRoutes from "./Routes/routes";

function App() {
  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  );
}

export default App;
