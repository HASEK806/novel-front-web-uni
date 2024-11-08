<script lang="ts" setup>
import { ref } from 'vue';

// 定义任务类型
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// 设置状态
const newTodo = ref<string>('');
const todos = ref<Todo[]>([]);

// 添加任务
const addTodo = () => {
  if (!newTodo.value.trim()) {
	  uni.showToast({
	    title: '请输入内容',
	    icon: 'error'
	  });
	  return;
  }
  
  todos.value.push({
    id: Date.now(),
    text: newTodo.value,
    completed: false,
  });
  newTodo.value = '';
};

// 切换任务完成状态
const toggleTodo = (id: number) => {
  const todo = todos.value.find((todo) => todo.id === id);
  if (todo) todo.completed = !todo.completed;
};

// 删除任务
const deleteTodo = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};

</script>

<template>
  <view class="container">
    <view class="input-container">
      <input
        v-model="newTodo"
        placeholder="添加一个任务"
        class="input"
      />
      <button @click="addTodo" class="add-button">添加</button>
    </view>

    <view class="todo-list">
      <view v-for="todo in todos" :key="todo.id" class="todo-item">
        <checkbox :checked="todo.completed" @change="toggleTodo(todo.id)" />
        <text :class="{ completed: todo.completed }">{{ todo.text }}</text>
        <button @click="deleteTodo(todo.id)" class="delete-button">x</button>
      </view>
    </view>
  </view>
</template>

<style scoped>
.container {
  padding: 20px;
}
.input-container {
  display: flex;
  margin-bottom: 20px;
}
.input {
  flex: 1;
  padding: 10px;
}
.add-button {
  margin-left: 10px;
}
.todo-list {
  margin-top: 20px;
}
.todo-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.completed {
  text-decoration: line-through;
}
.delete-button {
  margin-left: auto;
  color: red;
}
</style>
