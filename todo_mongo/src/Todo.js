import { useEffect, useState } from "react";
import { Button } from "antd";
import 'antd/dist/antd.css';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";


const API_BASE = "http://localhost:4000";

const Todo = () => {

    const [text, setText] = useState("")
    const [todo, setTodo] = useState([])
    // const [popup, Setpopup] = useState(false)

    useEffect(() => {
        GetTodos();
    }, [])
    
    const handleEvent = (e) => {
        setText(e.target.value)
        console.log("Item ~~~>>",text);
    }

    const GetTodos = () => {
        fetch(API_BASE + "/todos")
            .then(res => res.json())
            .then(data => setTodo(data))
            .catch(err => console.error("Error : ",err));
    }

    const AddTodo = async () => {
        const data = await fetch(API_BASE + "/todo/new" , {
            method : "POST",
            headers: {
                "content-Type":"application/json"
            },
            body:JSON.stringify({
                text: text
            })
        }).then(res => res.json());
        GetTodos()
        console.log("Dataa Ins ~~>>",data)
    }

    const GetMarked = async id => {
        const data =  await fetch(API_BASE + "/todo/complete/"+ id,{
            // method:"UPDATE"
        }).then(res => res.json())
        
        console.log("Ckeck~~>>");
        setTodo(todo => todo.map(todo => {
            if (todo._id === data._id){
                console.log("Comp ~~>> ", data.complete)
                todo.complete = data.complete
            }
            return todo;
        }))
        console.log("Check 2 ~~~>>",todo);
    }

    const DeleteTodo = async id => {
        const data = await fetch(API_BASE + "/todo/delete/" + id, {
            method: "DELETE"
        }).then(res => res.json());
        setTodo(todo.filter(todo => todo._id !== data._id));
        GetTodos()
        console.log("data removed from ID : ",data._id)
    }

    return (
        <>
            <div className="Container">

            <div className="head">
            <h1>Welcome! Todo</h1>
                <h3>Your Task</h3>
            </div>

                <div className="wrap">

                    <div className="todo-inp">
                        <input placeholder="Enter Work Here..." value={text} onChange={handleEvent} />
                    </div>

                    <div className="add-btn">
                    <Button onClick={AddTodo}>Add</Button>
                    </div>

                    {todo.map(
                        todo => (
                            <div className={"box"}>
                                <div className={(todo.complete  ? "lineThrough" : "")}>{todo.text}</div>
                                <div className="delete-todo" onClick={() => {DeleteTodo(todo._id)}}><DeleteOutlined /></div>
                                <div className="tick" onClick={() => GetMarked(todo._id)}><EditOutlined/></div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    )
}

export default Todo;