import {useEffect, useState} from "react";
import Todo from "Frontend/generated/com/example/application/Todo";
import {Topbar} from "Frontend/components/placeholder/Topbar.js";
import {TodoEndpoint} from "Frontend/generated/endpoints";
import {TextField} from "@hilla/react-components/TextField.js";
import {Button} from "@hilla/react-components/Button.js";
import {Checkbox} from "@hilla/react-components/Checkbox.js";

export function HomeView() {
    const [todos, setTodo] = useState<Todo[]>([]);
    const [task, setTask] = useState('');


    useEffect(() => {
        TodoEndpoint.findAll().then(setTodo);
        },
        []);

    async function addTodo() {
        const saved = await TodoEndpoint.add(task);
        if(saved) {
            setTodo([...todos, saved]);
            setTask('');
        }
    }

    async function updateTodo(todo: Todo, done: boolean) {
        const saved = await TodoEndpoint.update({
           ...todo, done
        });
        if(saved) {
            setTodo(todos.map(existing => existing.id == saved.id ? saved : existing));
        }
    }

    return (
        <div>
            <Topbar/>
            <h1>Hello</h1>
            <div className ="flex gap-s">

                <TextField value={task} onChange={e=>setTask(e.target.value)}/>
                <Button theme="primary" onClick={addTodo}>Add</Button>
            </div>
            {todos.map(todo => (
                <div key={todo.id}>
                    <Checkbox checked={todo.done} onCheckedChanged={e=> updateTodo(todo, e.detail.value)}/>
                    <span>{todo.task}</span>
                </div>
            ))}
        </div>
    );
}