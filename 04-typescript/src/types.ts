/**
 * 待办事项接口
 */
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

/**
 * 待办事项过滤器类型
 */
export type TodoFilter = 'all' | 'active' | 'completed';

/**
 * 待办事项列表接口
 */
export interface TodoList {
  todos: Todo[];
  filter: TodoFilter;
}

/**
 * 待办事项操作接口
 */
export interface TodoActions {
  add(text: string): Todo;
  toggle(id: number): void;
  remove(id: number): void;
  clearCompleted(): void;
  setFilter(filter: TodoFilter): void;
}

/**
 * 待办事项应用接口
 */
export interface TodoApp extends TodoList, TodoActions {
  getFilteredTodos(): Todo[];
  getStats(): TodoStats;
}

/**
 * 待办事项统计接口
 */
export interface TodoStats {
  total: number;
  active: number;
  completed: number;
}