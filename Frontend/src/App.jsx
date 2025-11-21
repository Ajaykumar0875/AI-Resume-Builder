import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import Dashboard from "./pages/Dashboard"
import ResumeBuilder from "./pages/ResumeBuilder"
import Preview from "./pages/Preview"
import Login from "./pages/Login"
import { Toaster, toast } from "sonner"
import { useDispatch } from "react-redux"
import { login, setLoading } from "./app/features/authSlice"
import { useEffect } from "react"
import api from "./configs/api";

const App = () => {
  
  const dispatch = useDispatch();

  const getUserData = async()=>{
    const token = localStorage.getItem("token");
       try{
           if(token){
               const {data} = await api.get('/api/users/data',{
                   headers:{
                       Authorization: token
                   }
               });


               if(data.user){
                  dispatch(login({user: data.user, token}));
                  toast.success("Welcome back, " + (data.user.name || "User") + "!");
               } else {
                  toast.error("User data not found. Please login again.");
               }
               dispatch(setLoading(false))
           }
           else{
            dispatch(setLoading(false));
            toast.info("Please login to continue.");
           }
       }
       catch(error){
          dispatch(setLoading(false));
          toast.error("Error fetching user data. Please login again.");
          console.log("Error fetching user data:", error);

       }
  }


  useEffect(()=>{
    getUserData();
  },[])

  return (
    <>
      <Routes>
        <Route path = '/' element = {<Home />}/>
        <Route path = '/api' element = {<Layout />}>
           <Route index element={<Dashboard/>}/>
           <Route path = 'builder/:resumeId' element={<ResumeBuilder/>}/>
        </Route>


        <Route path = 'view/:resumeId' element = {<Preview />}/>
        <Route path = 'login' element = {<Login />}/>


      </Routes>
      <Toaster richColors position="top-right" />

    </>
  )
}
export default App