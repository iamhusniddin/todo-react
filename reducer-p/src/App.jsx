import { Checkbox, message } from "antd";
import { Input, list } from "postcss";
import { useReducer } from "react";
import "./App.css";

function App() {
  // const counterFunc = (state, action)=>{
  //   switch (action.type) {
  //     case "INCREMENT":
  //       return  state + 1;
  //     case "DECREMENT" :
  //       return state - 1;
  //     case "ZERO":
  //       return state * 0
  //   }

  //   //yoki

  //   // if (action.type === "INCREMENT") return state + 1;
  //   // if (action.type === "DECREMENT") return state - 1;
  //   // if(action.type === "ZERO") return state*0
  // }

  // const [state, dispatch] = useReducer(counterFunc, 0)

  const todoReducer = (state, action) => {
    switch (action.type) {
      case "GET_INPUT-VALUE":
        return {
          ...state,
          inputValue: action.val,
        };
      case "ADD_TODO":
        return {
          inputValue: "",
          list: [{ title: state.inputValue, id: Date.now() }, ...state.list],
        };

      case "DELETE_TODO":
        return {
          ...state,
          list: state.list.filter((todo) => todo.id !== action.payLoadID),
        };

      case "EDIT_TODO":
        return {
          ...state,
          selectedID: action.payLoadID,
          editedVal: action.editVal,
        };
      case "GET_EDIT-VALUE":
        return {
          ...state,
          editedVal: action.val,
        };
      case "SAVE_TODO":
        return {
          ...state,
          selectedID: "",
          list: state.list.map((todo) =>
            todo.id === action.payLoadID
              ? { ...todo, title: action.editVal }
              : todo
          ),
        };
    }
  };

  const [state, dispatch] = useReducer(todoReducer, {
    inputValue: "",
    list: [],
    selectedID: "",
    editedVal: "",
  });

  return (
    // <div className='flex gap-5'>
    //   <button className='text-[20px]' onClick={()=> dispatch({type: "INCREMENT"})}>+</button>
    //   <h1 className='text-[20px]'>{state}</h1>
    //   <button className='text-[20px]' onClick={()=> dispatch({type: "DECREMENT"})}>-</button>
    //   <button className='text-[20px]' onClick={()=> dispatch({type:"ZERO"})}>zero</button>
    // </div>

    <div className="w-full mx-auto max-w-[700px]">
      <div className="flex flex-col p-4 bg-slate-100 rounded-md mt-5">
        <div className="flex justify-between items-center">
          <input
            value={state.inputValue}
            onChange={(e) => {
              dispatch({ type: "GET_INPUT-VALUE", val: e.target.value });
            }}
            className="w-[85%] border rounded-md p-2"
            type="text"
            placeholder="Enter text"
          />
          <button
            disabled={state.inputValue.length < 1}
            onClick={(e) => dispatch({ type: "ADD_TODO" })}
            className="border py-2 px-5 bg-blue-300 rounded-md text-[18px] hover:bg-blue-700 hover:text-white"
          >
            Add
          </button>
        </div>
        <div className="flex flex-col my-4">
          {state.list.length > 0
            ? state.list.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between bg-slate-300 p-2 rounded-md my-2"
                >
                  <div className="w-full mr-5">
                    {state.selectedID === todo.id ? (
                      <input
                        value={state.editedVal}
                        onChange={(e) => {
                          dispatch({
                            type: "GET_EDIT-VALUE",
                            val: e.target.value,
                          });
                        }}
                        type="text"
                        defaultValue={todo.title}
                        className="w-full "
                      />
                    ) : (
                      <h1 className="text-[22px] font-bold">{todo.title}</h1>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <button
                      onClick={() => {
                        dispatch({ type: "DELETE_TODO", payLoadID: todo.id });
                        message.success(
                          `${todo.title} is deleted  successfuly`
                        );
                      }}
                      className="border p-2 rounded-md bg-red-400 hover:bg-red-700 hover:text-white"
                    >
                      Delete
                    </button>
                    {state.selectedID === todo.id ? (
                      <button
                        onClick={() =>{
                          dispatch({
                            type: "SAVE_TODO",
                            payLoadID: todo.id,
                            editVal: state.editedVal,
                          });
                          state.editedVal.length > 1 && 
                          dispatch({
                            type: "SAVE_TODO",
                            payLoadID: todo.id,
                            editVal: todo.title,
                          })
                        }
                          
                        }
                        className="w-[60px] border p-2 rounded-md bg-green-400 hover:bg-green-700 hover:text-white"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          dispatch({
                            type: "EDIT_TODO",
                            payLoadID: todo.id,
                            editVal: todo.title,
                          })
                        }
                        className="w-[60px] border p-2 rounded-md bg-green-400 hover:bg-green-700 hover:text-white"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              ))
            : "No todos"}
        </div>
      </div>
    </div>
  );
}

export default App;
