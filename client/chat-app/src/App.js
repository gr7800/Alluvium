import { ToastContainer } from "react-toastify";
import AllRoutes from "./AllRoutes/AllRoutes";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer position="bottom-left" />
      <AllRoutes />
    </div>
  );
}

export default App;
