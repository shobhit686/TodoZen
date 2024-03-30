import { useState, useEffect } from 'react'
import Navbar from "./components/Navbar"
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(todoString) 
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleEdit = (id) => {
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-4 bg-violet-100 min-h-[80vh]">
        <div className="addTodos">
          <h2 className='text-lg font-bold'>Add Todo</h2>
          <input onChange={handleChange} value={todo} type='text' className='w-1/2' />
          <button onClick={handleAdd} className='cursor-pointer bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'>Save</button>
        </div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5 font-bold'>No todos to display</div>}
          {todos.map(item => {
            return <div key={item.id} className="todo flex w-1/4 my-2 justify-between">
              <div className= "flex gap-5">
                <input name={item.id} onChange={handleCheckbox} type='checkbox' value={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons">
                <button onClick={()=> handleEdit(item.id)} className="cursor-pointer bg-violet-800 mx-1 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="cursor-pointer bg-violet-800 mx-1 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white">Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
