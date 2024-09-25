// import Link from "next/link"
// import { Button } from "../ui/button"
// import { useNavigate } from "react-router-dom"
// import { logout } from "../../services/api/auth/AuthService";
// import { useEffect, useState } from "react";
// import store from "../../redux/store";

// export function Nav() {
//   const navigator = useNavigate();
//   const [auth, setAuth]=useState<boolean>(false);

//   const signUp = () =>{
//     navigator("/signup", {replace: true});
//     console.log("auth",auth);
//   }

//   useEffect(()=>{
//     setAuth( store.getState().auth.isAuthenticated);
//     console.log("auth",auth);
//   },[] )

 
  

//   const signOut = () =>{
//     logout();
//     navigator("/", {replace:true})
//   }
//   return (
//     <header className="flex h-16 items-center justify-between bg-background px-4 md:px-6">
//       <Link href="/" className="flex items-center gap-2" prefetch={false}>
//         <MountainIcon className="h-6 w-6" />
//         <span className="sr-only">Acme Inc</span>
//       </Link>
//       <div className="flex items-center gap-4">
//         <div className="text-sm text-muted-foreground">
//           GMT{" "}
//           {new Date().toLocaleString("en-US", { timeZone: "GMT", hour12: false, hour: "2-digit", minute: "2-digit" })}
//         </div>
//         <Link
//           href="/home"
//           className="inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
//           prefetch={false}
//         >
//           Explore Events
//         </Link>
//         {auth?<Button onClick={signOut} >Sign out</Button>:<Button onClick={signUp} >Log In</Button>}
//       </div>
//     </header>
//   )
// }

// function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
//     </svg>
//   )
// }



import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import store from "../redux/store";
import { Button } from "./ui/button";


export function Nav() {
  const navigator = useNavigate();
  const [auth, setAuth] = useState<boolean>(store.getState().auth.isAuthenticated);

  const signUp = () => {
    navigator("/signup", { replace: true });
  };

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setAuth(store.getState().auth.isAuthenticated);
    });
    return () => unsubscribe();
  }, []);

 

  return (
    <header className="flex h-16 items-center justify-between bg-transparent px-4 md:px-6">
      <Link to="/" className="flex items-center gap-2" >
      <svg
          className="h-8 w-8 text-white"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          <path d="M5 3v4" />
          <path d="M19 17v4" />
          <path d="M3 5h4" />
          <path d="M17 19h4" />
        </svg>
        <span className="text-2xl font-bold text-white">NexEvent</span>
      
      </Link>
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          GMT{" "}
          {new Date().toLocaleString("en-US", { timeZone: "GMT", hour12: false, hour: "2-digit", minute: "2-digit" })}
        </div>
        <Link
          to="/home"
          className="inline-flex text-black h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
        
        >
          Explore Events
        </Link>
          <Button className="bg-white text-black" onClick={signUp}>Log In</Button>
      </div>
    </header>
  );
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}