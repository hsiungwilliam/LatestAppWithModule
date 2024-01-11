import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ofType, createEffect } from "@ngrx/effects";
import { AppState } from "../app.state";
import { catchError, from, map, switchMap, of, withLatestFrom } from "rxjs";
import { loadTodos, loadTodosSuccess, loadTodosFailure, addTodo, removeTodo } from "./todos.actions";
import { TodoService } from "./todos.service";


@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private todoService: TodoService
  ) {}

  // Run this code when a loadTodos action is dispatched
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        // Call the getTodos method, convert it to an observable
        from(this.todoService.getTodos()).pipe(
          // Take the returned value and return a new success action contain
          map((todos) => loadTodosSuccess({ todos: todos})),
          // Or... if it erros return a new failure action containing the
          catchError((error) => of(loadTodosFailure({ error })))
        ))
    )
  );

  // Run this code with addTodo or removeTodo action is dispatched
  saveTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo, removeTodo),
      withLatestFrom(this.store.select(selectAllTodos)),
      switchMap(([action, todos]) => from(this.todoService.saveTodos(todos)))
    ),
    // Most effects dispatch another action, but this one is just a "fire"
    { dispatch: false }
  );

}

