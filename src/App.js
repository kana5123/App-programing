import Header from "./components/Header";
import Footer from "./components/Footer";
import ProfileCard from "./components/ProfileCard";
import LikeToggle from "./components/LikeToggle";
import Counter from "./components/Counter";
import StudentList from "./components/StudentList";
import Greeter from "./components/Greeter";
export default function App() {
  return(
    <div className= "container">
      <Header />
      <ProfileCard
name = "강이의"
major= "제주대학교 인공지능학과"
interests={["자연어처리", "농구", "음악"]}
    />
    <Counter />
    <LikeToggle />
    <Greeter />
    <StudentList />
    <Footer />
  </div>
  )
}
