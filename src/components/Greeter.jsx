import { useState } from "react";
export default function Greeter(){
    const [name, setName] = useState('')
    return(
        <div className="card">
            <input placeholder="이름 입력"
            value={name}
            onChange={e => setName(e.target.value)}
            />
            <p>안녕하세요, {name || "익명"}님!</p>
        </div>
    )
    
}