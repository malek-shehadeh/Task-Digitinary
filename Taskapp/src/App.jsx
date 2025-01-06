// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { TaskProvider } from "./Context/TaskProvider";
// import { FavoritesProvider } from "./Context/FavoritesContext";
// import TaskManager from "./Components/Taskmanager/TaskManager";
// import Navbar from "./Components/Navbar";
// import Form from "./Components/Form/Form";
// import AppChat from "./Components/app-chat/AppChat";
// import ReduxProvider from "./pages/ReduxFavorites/ReduxProvider";
// import ContextFavorites from "./pages/ContextFavorites/FavoritesContext";
// import EcommerceManager from "./Components/Ecommerce/EcommerceManager";
// import Welcome from "./Components/Welcome";

// const App = () => (
//   <TaskProvider>
//     <FavoritesProvider>
//       <Router>
//         <Navbar />
//         <div className="p-4">
//           <Routes>
//             <Route path="/" element={<Welcome />} />
//             <Route path="/task-manager" element={<TaskManager />} />
//             <Route path="/form" element={<Form />} />
//             <Route path="/appchat" element={<AppChat />} />
//             <Route path="/favorites/redux" element={<ReduxProvider />} />
//             <Route path="/favorites/context" element={<ContextFavorites />} />
//             <Route path="/ecommerce-manager/*" element={<EcommerceManager />} />
//           </Routes>
//         </div>
//       </Router>
//     </FavoritesProvider>
//   </TaskProvider>
// );

// export default App;
//////

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { TaskProvider } from "./Context/TaskProvider";
// import { FavoritesProvider } from "./Context/FavoritesContext";
// import { ProtectedRoute } from "./Components/ProtectedRoute";
// import TaskManager from "./Components/Taskmanager/TaskManager";
// import Navbar from "./Components/Navbar";
// import Form from "./Components/Form/Form";
// import AppChat from "./Components/app-chat/AppChat";
// import ReduxProvider from "./pages/ReduxFavorites/ReduxProvider";
// import ContextFavorites from "./pages/ContextFavorites/FavoritesContext";
// import EcommerceManager from "./Components/Ecommerce/EcommerceManager";
// import Welcome from "./Components/Welcome";

// const App = () => (
//   <TaskProvider>
//     <FavoritesProvider>
//       <Router>
//         <Navbar />
//         <div className="p-4">
//           <Routes>
//             <Route path="/" element={<Welcome />} />
//             <Route
//               path="/task-manager"
//               element={
//                 <ProtectedRoute>
//                   <TaskManager />
//                 </ProtectedRoute>
//               }
//             />
//             {/* <Route
//               path="/form"
//               element={
//                 <ProtectedRoute>
//                   <Form />
//                 </ProtectedRoute>
//               }
//             /> */}
//             <Route
//               path="/appchat"
//               element={
//                 <ProtectedRoute>
//                   <AppChat />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/favorites/redux"
//               element={
//                 <ProtectedRoute>
//                   <ReduxProvider />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/favorites/context"
//               element={
//                 <ProtectedRoute>
//                   <ContextFavorites />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="/ecommerce-manager/*" element={<EcommerceManager />} />
//             <Route path="/form" element={<Form />} />
//           </Routes>
//         </div>
//       </Router>
//     </FavoritesProvider>
//   </TaskProvider>
// );

// export default App;
//////////////////////////////////

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { TaskProvider } from "./Context/TaskProvider";
import { FavoritesProvider } from "./Context/FavoritesContext";
import TaskManager from "./Components/Taskmanager/TaskManager";
import Navbar from "./Components/Navbar";
import Form from "./Components/Form/Form";
import AppChat from "./Components/app-chat/AppChat";
import ReduxProvider from "./pages/ReduxFavorites/ReduxProvider";
import ContextFavorites from "./pages/ContextFavorites/FavoritesContext";
import EcommerceManager from "./Components/Ecommerce/EcommerceManager";
import Welcome from "./Components/Welcome";
import Login from "./Components/Ecommerce/LoginForm";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <TaskProvider>
      <FavoritesProvider>
        <Router>
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Welcome />} />

              <Route
                path="/task-manager"
                element={
                  isAuthenticated ? (
                    <TaskManager />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/appchat"
                element={
                  isAuthenticated ? (
                    <AppChat />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/favorites/redux"
                element={
                  isAuthenticated ? (
                    <ReduxProvider />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/favorites/context"
                element={
                  isAuthenticated ? (
                    <ContextFavorites />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />

              <Route
                path="/ecommerce-manager/*"
                element={<EcommerceManager />}
              />
              <Route path="/form" element={<Form />} />

              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </FavoritesProvider>
    </TaskProvider>
  );
};

export default App;
