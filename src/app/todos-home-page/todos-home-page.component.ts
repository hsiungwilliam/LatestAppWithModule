import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from '../state/todos/todo.model';
import { addTodo, loadTodos, removeTodo } from '../state/todos/todos.actions';

@Component({
  selector: 'todo-home-page',
  templateUrl: 'todo-home-page.component.html',
  styleUrls: ['todo-home-page.component.scss']
})
export class TodoHomePageComponent implements OnInit {
  public allTodos$ = this.store.select(selectAllTodos);
  public todo = '';

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadTodos());
  }

  public addTodo(): void {
    this.store.dispatch(addTodo({ content: this.todo }));
    this.todo = '';
  }

  public removeTodo(todo: Todo): void {
    this.store.dispatch(removeTodo({ id: todo.id }));
  }
}
