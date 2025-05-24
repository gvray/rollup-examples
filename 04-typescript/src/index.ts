import { TodoApp, TodoFilter, Todo, TodoStats } from './types';
import { TodoStore } from './store';
import { formatDate, formatTime, sortByDate, saveTodos, loadTodos } from './utils';

/**
 * 待办事项应用类
 * 实现TodoApp接口，提供完整的待办事项管理功能
 */
export class TodoAppImpl implements TodoApp {
  private store: TodoStore;
  private readonly storageKey: string = 'todo-app-typescript';
  
  /**
   * 构造函数
   * @param initialTodos 初始待办事项列表
   */
  constructor(initialTodos: Todo[] = []) {
    this.store = new TodoStore();
    
    // 尝试从本地存储加载
    const savedTodos = loadTodos(this.storageKey);
    
    // 使用保存的数据或初始数据
    if (savedTodos.length > 0) {
      savedTodos.forEach(todo => this.store.todos.push(todo));
      this.store.nextId = Math.max(...savedTodos.map(todo => todo.id)) + 1;
    } else if (initialTodos.length > 0) {
      initialTodos.forEach(todo => this.store.todos.push(todo));
      this.store.nextId = Math.max(...initialTodos.map(todo => todo.id)) + 1;
    }
  }
  
  /**
   * 获取所有待办事项
   */
  get todos(): Todo[] {
    return this.store.todos;
  }
  
  /**
   * 获取当前过滤器
   */
  get filter(): TodoFilter {
    return this.store.filter;
  }
  
  /**
   * 添加新的待办事项
   * @param text 待办事项文本
   * @returns 新创建的待办事项
   */
  public add(text: string): Todo {
    const todo = this.store.add(text);
    this.saveToStorage();
    return todo;
  }
  
  /**
   * 切换待办事项的完成状态
   * @param id 待办事项ID
   */
  public toggle(id: number): void {
    this.store.toggle(id);
    this.saveToStorage();
  }
  
  /**
   * 删除待办事项
   * @param id 待办事项ID
   */
  public remove(id: number): void {
    this.store.remove(id);
    this.saveToStorage();
  }
  
  /**
   * 清除所有已完成的待办事项
   */
  public clearCompleted(): void {
    this.store.clearCompleted();
    this.saveToStorage();
  }
  
  /**
   * 设置过滤器
   * @param filter 过滤器类型
   */
  public setFilter(filter: TodoFilter): void {
    this.store.setFilter(filter);
  }
  
  /**
   * 获取过滤后的待办事项列表
   * @returns 过滤后的待办事项列表
   */
  public getFilteredTodos(): Todo[] {
    return sortByDate(this.store.getFilteredTodos());
  }
  
  /**
   * 获取待办事项统计信息
   * @returns 统计信息
   */
  public getStats(): TodoStats {
    return this.store.getStats();
  }
  
  /**
   * 格式化待办事项的创建时间
   * @param todo 待办事项
   * @returns 格式化后的时间字符串
   */
  public formatCreatedAt(todo: Todo): string {
    return `${formatDate(todo.createdAt)} ${formatTime(todo.createdAt)}`;
  }
  
  /**
   * 将待办事项保存到本地存储
   */
  private saveToStorage(): void {
    saveTodos(this.storageKey, this.store.todos);
  }
}

// 导出类型和工具函数
export * from './types';
export * from './utils';

// 默认导出TodoApp实现
export default TodoAppImpl;