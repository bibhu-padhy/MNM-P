import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NhostClient, NhostReactProvider } from "@nhost/react";
import "./App.css";
import Home from "./Home";
import Auth from "./Auth";
import ProtectedRoute from "./common/components/ProtectedRoute";

const nhost = new NhostClient({
  subdomain: import.meta.env.VITE_NHOST_SUBDOMAIN,
  region: import.meta.env.VITE_NHOST_REGION,
});

function App() {
  return (
    <NhostReactProvider nhost={nhost}>
      <div className="container mx-auto h-screen">
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </BrowserRouter>
      </div>
    </NhostReactProvider>
  );
}

export default App;
