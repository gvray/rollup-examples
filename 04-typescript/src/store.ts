import { Todo, TodoFilter, TodoList, TodoStats } from './types';

/**
 * 待办事项存储类
 */
export class TodoStore implements TodoList {
  /**
   * 待办事项列表
   */
  public todos: Todo[] = [];
  
  /**
   * 当前过滤器
   */
  public filter: TodoFilter = 'all';
  
  /**
   * 下一个待办事项ID
   */
  private nextId: number = 1;
  
  /**
   * 创建一个新的待办事项
   * @param text 待办事项文本
   * @returns 新创建的待办事项
   */
  public add(text: string): Todo {
    const todo: Todo = {
      id: this.nextId++,
      text,
      completed: false,
      createdAt: new Date()
    };
    
    this.todos.push(todo);
    return todo;
  }
  
  /**
   * 切换待办事项的完成状态
   * @param id 待办事项ID
   */
  public toggle(id: number): void {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }
  
  /**
   * 删除待办事项
   * @param id 待办事项ID
   */
  public remove(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
  
  /**
   * 清除所有已完成的待办事项
   */
  public clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }
  
  /**
   * 设置过滤器
   * @param filter 过滤器类型
   */
  public setFilter(filter: TodoFilter): void {
    this.filter = filter;
  }
  
  /**
   * 获取过滤后的待办事项列表
   * @returns 过滤后的待办事项列表
   */
  public getFilteredTodos(): Todo[] {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.todos.filter(todo => todo.completed);
      default:
        return this.todos;
    }
  }
  
  /**
   * 获取待办事项统计信息
   * @returns 统计信息
   */
  public getStats(): TodoStats {
    const total = this.todos.length;
    const completed = this.todos.filter(todo => todo.completed).length;
    const active = total - completed;
    
    return {
      total,
      active,
      completed
    };
  }
}