import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route";
import AnimatedRoutes from "./user/components/amination/AnimatedRoutes";

// import { router } from "./routes/Routes";



const App = () => {


  return (
    <RouterProvider router={router} >
      <AnimatedRoutes />
    </RouterProvider>
  );
};

export default App;
