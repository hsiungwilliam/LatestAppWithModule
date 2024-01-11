import { createReducer, on } from "@ngrx/store";
import { addTodo, loadTodos, loadTodosFailure, loadTodosSuccess, removeTodo } from "./todos.actions";
import { Todo } from "./todo.model";

export interface TodoState {
  todos: Todo[];
  error: string;
  status: "pending" | "loading" | 'error' | 'success'
}

export const initialState: TodoState = {
  todos: [],
  error: '',
  status: 'pending',
};

export const todoReducer = createReducer(
  // Supply initial state
  initialState,
  // Add the new todo to the todos array
  on(addTodo, (state, { content }) => ({
    ...state,
    todos: [
      ...state.todos,
      {
        id: Date.now().toString(),
        content: content
      }
    ]
  })),
  // Remove the todo from the todos array
  on(removeTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
  })),
  // Trigger loading the todos
  on(loadTodos, (state) => ({
    ...state,
    status: "loading"
  })),
  // Handle successfully loaded todos
  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos: todos,
    error: null,
    status: 'success',
  })),
  // Handle todos load failure
  on(loadTodosFailure, (state, { error }) => ({
    ...state,
    todos: todos,
    error: error,
    status: 'error'
  }))
);
