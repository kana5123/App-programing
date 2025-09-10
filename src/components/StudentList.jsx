import { useState } from "react";
export default function StudentList() {
    const [students, setStudents] = useState([
        {id : 1, name : "김민수", major : "AI"},
        {id : 2, name : "이영희", major : "AI"}
    ])
    const [name, setName] = useState("")
    const [major, setMajor] = useState("AI")
    return (
        <section className="card">
            <h3> 학생 명단 </h3>
            <ul>
                {students.map(s => (<li key = {s.id}>{s.name} ({s.major})<button onClick = {() => {/*삭제 */}}>삭제</button></li>))}
            </ul>
        </section>
    )
}