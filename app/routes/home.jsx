import { useState } from "react";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  let [todoValue, setTodoValue] = useState("");
  let [todos, setTodos] = useState([]);

  let [filteredState, setFilteredState] = useState("all");

  // { task: 'Running', isComplete: false, id:1}

  let filteredTodos = todos;

  if (filteredState === "active") {
    filteredTodos = todos.filter((todoItem) => !todoItem.isComplete);
  } else if (filteredState === "completed") {
    filteredTodos = todos.filter((todoItem) => todoItem.isComplete);
  }

  let itemsLeft = todos.filter((item) => !item.isComplete);

  return (
    <main className="max-w-lg mx-auto py-20">
      <h1 className="font-bold uppercase text-4xl">Todo</h1>
      <input
        type="text"
        value={todoValue}
        onChange={(e) => {
          console.log({ e });
          setTodoValue(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            // Wrong
            // todos.push(todoValue);
            setTodos([
              ...todos,
              { task: todoValue, isComplete: false, id: todos.length },
            ]);
            setTodoValue("");
          }
        }}
        placeholder="Enter todo item"
        className="border border-gray-300 p-4 rounded-lg w-full mt-8"
      />
      <ul className="mt-8 bg-slate-800 p-6 divide-y divide-gray-600 rounded-lg">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((item, index) => (
            <li className="flex gap-2 items-center py-3" key={item.id}>
              <input
                type="checkbox"
                id={`"item-${index}`}
                defaultChecked={item.isComplete}
                onChange={() => {
                  // Replace the todo list with a new todo list that has the isComplete value for the matched todo item changed

                  let newArray = todos.map((todoItem) => {
                    if (todoItem.id === item.id) {
                      return {
                        ...todoItem,
                        isComplete: !todoItem.isComplete,
                      };
                    } else {
                      return todoItem;
                    }
                  });

                  setTodos(newArray);
                }}
              />
              <label
                htmlFor={`"item-${index}`}
                className={`${item.isComplete ? "line-through text-gray-500" : ""}`}
              >
                {item.task}
              </label>
            </li>
          ))
        ) : (
          <li>No items yet</li>
        )}
      </ul>

      {/* Filters */}
      <div className="flex justify-between items-center mt-4 text-gray-300">
        <span>
          {itemsLeft.length} {itemsLeft.length === 1 ? "item" : "items"} left
        </span>
        <div className="flex gap-2">
          <Filter
            text="All"
            filteredState={filteredState}
            setFilteredState={setFilteredState}
          />
          <Filter
            text="Active"
            filteredState={filteredState}
            setFilteredState={setFilteredState}
          />

          <Filter
            text="Completed"
            filteredState={filteredState}
            setFilteredState={setFilteredState}
          />
        </div>

        <button
          onClick={() => {
            let newArray = todos.filter((item) => !item.isComplete);
            setTodos(newArray);
          }}
          className="active:scale-[.97] transition ease-in-out duration-300"
        >
          Clear completed
        </button>
      </div>
    </main>
  );
}

function Filter({ text, filteredState, setFilteredState }) {
  return (
    <button
      onClick={() => {
        setFilteredState(`${text.toLowerCase()}`);
      }}
      className={`${text.toLowerCase() === filteredState ? "text-blue-500" : ""} active:scale-[.97] transition ease-in-out duration-300`}
    >
      {text}
    </button>
  );
}
