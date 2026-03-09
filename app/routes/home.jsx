import { useState } from "react";
import { Welcome } from "../welcome/welcome";

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

  console.log({ filteredState });
  // { task: 'Running', isComplete: false, id:1}

  console.log({ todoValue, todos });

  let filteredTodos = todos;

  if (filteredState === "active") {
    filteredTodos = todos.filter((todoItem) => !todoItem.isComplete);
  } else if (filteredState === "completed") {
    filteredTodos = todos.filter((todoItem) => todoItem.isComplete);
  }

  return (
    <main className="max-w-lg mx-auto">
      <h1>Todo</h1>
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
        className="border border-gray-300 p-4 rounded w-full"
      />
      <ul className="mt-8 bg-slate-800 p-4 space-y-4">
        {filteredTodos.length > 0 ? (
          filteredTodos.map((item, index) => (
            <li className="flex gap-2 items-center" key={item.id}>
              <input
                type="checkbox"
                id={`"item-${index}`}
                onChange={() => {
                  // Find the todo item that was clicked
                  let matchedItem = todos.find(
                    (todoItem) => todoItem.id === item.id
                  );
                  console.log({ matchedItem });
                  matchedItem.isComplete = !matchedItem.isComplete;

                  // Update the object in the array
                  let modifiedArray = todos.filter(
                    (todoItem) => todoItem.id !== item.id
                  );
                  console.log({ modifiedArray });

                  setTodos([...modifiedArray, matchedItem]);
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
        <span>2 items left</span>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setFilteredState("all");
              // handleFilter();
            }}
          >
            All
          </button>
          <button
            onClick={() => {
              setFilteredState("active");
              // handleFilter();
            }}
          >
            Active
          </button>
          <button
            onClick={() => {
              setFilteredState("completed");
              // handleFilter();
            }}
          >
            Completed
          </button>
        </div>

        <button>Clear completed</button>
      </div>
    </main>
  );
}
