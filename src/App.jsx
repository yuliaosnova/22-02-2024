import { Route, Routes } from "react-router-dom";
import TripAppPage from "./pages/TripAppPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TripAppPage />} />
        <Route path="*" element={<TripAppPage />} />
      </Routes>
    </>
  );
}

export default App;
