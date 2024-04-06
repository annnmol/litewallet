import {
  RouterProvider
} from "react-router-dom";

//user defined
import { Toaster } from "./components/ui/sonner";
import appRouter from "./routes/routes";

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
