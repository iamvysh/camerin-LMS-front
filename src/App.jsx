import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import RegisterForm from "./pages/SigninPage";
import LoginPage from "./pages/LoginPage";
import TeacherDashBoard from "./pages/teachersPages/TeacherDashBoard"
import StudentDashBoard from "./pages/studentPages/studentDashBoard";
import LibrarianLogin from "./pages/librarianPages.jsx/LibrarianLogin";
import LibrarianDashboard from "./pages/librarianPages.jsx/LibrarianDashboard"
import ViewAssignment from "./pages/teachersPages/ViewAssignment";
import ViewSeminar from "./pages/teachersPages/ViewSeminar";
import AddMarkCard from "./pages/teachersPages/AddMark";




function App() {

  return (
    <div>
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<RegisterForm/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/teacherdashboard" element={<TeacherDashBoard/>} />
        <Route path="/studentdashboard" element={<StudentDashBoard/>} />
        <Route path="/librarylogin" element={<LibrarianLogin/>} />
        <Route path='/librariandashboard' element={<LibrarianDashboard/>} />
        <Route path="/assignment/:id" element={<ViewAssignment/>} />
        <Route path="/seminar/:id" element={<ViewSeminar/>} />
        <Route path="/addmark/:id" element={<AddMarkCard/>} />
        {/* <Route path="/viewmark"  */}
    </Routes>
</div>
  )
}

export default App
