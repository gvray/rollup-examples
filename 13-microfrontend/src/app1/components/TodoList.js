// 待办事项列表组件
export class TodoList {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('app1-todos') || '[]');
    this.container = document.createElement('div');
    this.container.className = 'todo-container';
  }
  
  // 保存待办事项到本地存储
  saveTodos() {
    localStorage.setItem('app1-todos', JSON.stringify(this.todos));
  }
  
  // 添加新待办事项
  addTodo(text) {
    if (!text.trim()) return;
    
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date()
    };
    
    this.todos.push(newTodo);
    this.saveTodos();
    this.renderTodoList();
  }
  
  // 删除待办事项
  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
    this.renderTodoList();
  }
  
  // 切换待办事项完成状态
  toggleTodo(id) {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.saveTodos();
    this.renderTodoList();
  }
  
  // 渲染待办事项列表
  renderTodoList() {
    const todoList = this.container.querySelector('.todo-list');
    if (todoList) {
      todoList.innerHTML = '';
      
      if (this.todos.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'empty-message';
        emptyMessage.textContent = '暂无待办事项，请添加新的任务。';
        todoList.appendChild(emptyMessage);
      } else {
        this.todos.forEach(todo => {
          const todoItem = document.createElement('div');
          todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
          todoItem.dataset.id = todo.id;
          
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = todo.completed;
          checkbox.addEventListener('change', () => this.toggleTodo(todo.id));
          
          const todoText = document.createElement('span');
          todoText.className = 'todo-text';
          todoText.textContent = todo.text;
          
          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'delete-btn';
          deleteBtn.textContent = '删除';
          deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));
          
          todoItem.appendChild(checkbox);
          todoItem.appendChild(todoText);
          todoItem.appendChild(deleteBtn);
          todoList.appendChild(todoItem);
        });
      }
    }
  }
  
  // 渲染组件
  render() {
    // 创建表单
    const form = document.createElement('form');
    form.className = 'todo-form';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = '添加新的待办事项...';
    input.className = 'todo-input';
    
    const addBtn = document.createElement('button');
    addBtn.type = 'submit';
    addBtn.className = 'add-btn';
    addBtn.textContent = '添加';
    
    form.appendChild(input);
    form.appendChild(addBtn);
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTodo(input.value);
      input.value = '';
    });
    
    // 创建待办事项列表
    const todoList = document.createElement('div');
    todoList.className = 'todo-list';
    
    // 添加到容器
    this.container.appendChild(form);
    this.container.appendChild(todoList);
    
    // 初始渲染
    this.renderTodoList();
    
    return this.container;
  }
}