<template>
  <view>
    <block v-for="book in books" :key="book.id">
      <image :src="book.cover_image" />
      <text>{{ book.title }}</text>
      <text>{{ book.author }}</text>
    </block>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getBooks, Book } from '@/config/api';  // 引入api.ts中的接口

export default defineComponent({
  name: 'IndexPage',
  data() {
    return {
      books: [] as Book[],  // 定义书籍数据类型
    };
  },
  async created() {
    try {
      const response = await getBooks();  // 调用接口获取数据
      console.log('222', response)

      this.books = response;
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  },
});
</script>

<style scoped>
/* 页面样式 */
</style>
