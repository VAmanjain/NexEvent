import { createBrowserRouter } from "react-router-dom";
import Landing from "../components/Landing";
import AuthForm from "../components/AuthForm";
import Protected from "./Protected";
import NavRoot from "../components/NavRoot";
import Events from "../components/Events";
import Unprotected from "./Unprotected";
import Profile from "../components/Profile";
import EventsPages from "../components/EventsPages";
import CreateEvent from "../components/CreateEvent";
import Setting from "../components/Setting";
import EventSetting from "../components/EventSetting";
import Discover from "../components/Discover";

const Router = createBrowserRouter([
  {
    element: <NavRoot />,
    children: [
      {
        element: <Protected allowedRole="" />,
        children: [
          {
            path: "/home",
            element: <Events />,
          },
          {
            path: "/profile/:id",
            element: <Profile />,
          },
          {
            path: "/event/:id",
            element: <EventsPages />,
          },
          {
            path: "/setting/:id",
            element: <Setting />,
          },
          {
            path: "event/:id/setting/",
            element: <EventSetting />,
          },
          {
            path: "/create-event",
            element: <CreateEvent />,
          },
          {
            path: "/discover",
            element: <Discover />,
          },
        ],
      },
      {
        element: <Unprotected allowedRole="" />,
        children: [
          { path: "/", element: <Landing /> },
          {
            path: "/signup",
            element: <AuthForm />,
          },
        ],
      },
    ],
  },
]);

export default Router;