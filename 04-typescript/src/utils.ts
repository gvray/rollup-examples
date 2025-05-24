import { Todo } from './types';

/**
 * 格式化日期
 * @param date 日期对象
 * @returns 格式化后的日期字符串 (YYYY-MM-DD)
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * 格式化时间
 * @param date 日期对象
 * @returns 格式化后的时间字符串 (HH:MM:SS)
 */
export function formatTime(date: Date): string {
  return date.toISOString().split('T')[1].split('.')[0];
}

/**
 * 按创建日期对待办事项进行排序
 * @param todos 待办事项列表
 * @returns 排序后的待办事项列表
 */
export function sortByDate(todos: Todo[]): Todo[] {
  return [...todos].sort((a, b) => {
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

/**
 * 生成唯一ID
 * @returns 唯一ID字符串
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * 将待办事项列表保存到本地存储
 * @param key 存储键名
 * @param todos 待办事项列表
 */
export function saveTodos(key: string, todos: Todo[]): void {
  // 将Date对象转换为ISO字符串以便序列化
  const todosForStorage = todos.map(todo => ({
    ...todo,
    createdAt: todo.createdAt.toISOString()
  }));
  
  localStorage.setItem(key, JSON.stringify(todosForStorage));
}

/**
 * 从本地存储加载待办事项列表
 * @param key 存储键名
 * @returns 待办事项列表
 */
export function loadTodos(key: string): Todo[] {
  const todosString = localStorage.getItem(key);
  if (!todosString) return [];
  
  try {
    // 将ISO字符串转换回Date对象
    const todos = JSON.parse(todosString);
    return todos.map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt)
    }));
  } catch (e) {
    console.error('Failed to parse todos from localStorage', e);
    return [];
  }
}