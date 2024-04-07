import { RouterProvider } from "react-router-dom";

//user defined
import { Toaster } from "./components/ui/sonner";
import appRouter from "./routes/routes";
import Loader from "./screens/loader";
import useAppStore from "./store";
import { useShallow } from "zustand/react/shallow";

function App() {
  const loading = useAppStore(useShallow((state) => state.loading));
  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster position="bottom-center" richColors />

      {loading ? <Loader /> : null}
    </>
  );
}

export default App;
