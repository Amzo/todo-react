function ToDoItem({todo, toggleTodo, deleteTodo}) {
    return ( <>
    <div key={"todo_item_" + todo.id} className="container-fluid list-group-item">
        <div className="d-flex">    
            <label className="d-flex gap-3 flex-grow-1">
                <input className="form-check-input" type="checkbox" value="" checked={todo.checked} style={ {fontSize:  "1.375em"}  } onChange={() => toggleTodo(todo.id)}/>
                <span className="pt-1 form-checked-content">  
                        <strong className={todo.checked ? "strike" : ""}>{todo.title}</strong>
                    </span>
            </label>
            
            <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>
                X
            </button>
        </div>
    </div>
    </> );
}

export default ToDoItem;