import { useState } from "react"

export default function Title (props) {
    return (
       <div className="card">
        <h1 className="card"> 자기소개 컴포넌트 </h1>
        <ul>
            <li>이름 : {props.name}</li>
            <li>전공 : {props.dep}</li>
            <li>학번 : {props.number}</li>
        </ul>
        
       </div> 
    )
}



export function Counter() {

    const [like_count, setCount] = useState(0);

    const handleInc = () => {
    setCount(like_count+1)
    }

return (
    <div>
        <p>좋아요 개수: {like_count} </p>
        <button onClick={handleInc}> 좋아요 </button> 
    </div>
)}