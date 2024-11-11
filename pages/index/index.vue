<template>
  <view class="container">
    <!-- 最热图书展示区，支持左右滑动 -->
    <view class="hot-books-container">
      <view v-for="(book, index) in hotBooks" :key="index" class="hot-book-item">
        <image :src="book.image" class="hot-book-image" />
        <view class="hot-book-title">{{ book.title }}</view>
      </view>
    </view>

    <!-- 榜单切换 Tab 区 -->
    <view class="tab-container">
      <view v-for="(tab, index) in tabs" :key="index" :class="['tab-item', { 'active-tab': currentTab === index }]" @click="currentTab = index">
        {{ tab }}
      </view>
    </view>

    <!-- 榜单图书列表 -->
    <view class="books-list">
      <view v-for="(book, index) in displayedBooks" :key="index" class="book-item">
        <image :src="book.image" class="book-thumbnail" />
        <view class="book-info">
          <view class="book-rank">#{{ index + 1 }}</view>
          <view class="book-name">{{ book.title }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  setup() {
    // 最热图书的 mock 数据
    const hotBooks = ref([
      { title: '最热图书1', image: 'https://via.placeholder.com/100x150' },
      { title: '最热图书2', image: 'https://via.placeholder.com/100x150' },
      { title: '最热图书3', image: 'https://via.placeholder.com/100x150' },
      { title: '最热图书4', image: 'https://via.placeholder.com/100x150' },
      { title: '最热图书5', image: 'https://via.placeholder.com/100x150' },
      { title: '最热图书6', image: 'https://via.placeholder.com/100x150' },
    ]);

    // Tab栏及不同类型的排行榜数据
    const tabs = ref(['推荐榜', '完本榜', '口碑榜', '巅峰榜']);
    const currentTab = ref(0);

    const booksData = {
      推荐榜: [
        { title: '推荐书1', image: 'https://via.placeholder.com/100x150' },
        { title: '推荐书2', image: 'https://via.placeholder.com/100x150' },
        { title: '推荐书3', image: 'https://via.placeholder.com/100x150' },
        { title: '推荐书4', image: 'https://via.placeholder.com/100x150' },
        { title: '推荐书5', image: 'https://via.placeholder.com/100x150' },
        { title: '推荐书6', image: 'https://via.placeholder.com/100x150' },
        { title: '推荐书7', image: 'https://via.placeholder.com/100x150' },
        { title: '推荐书8', image: 'https://via.placeholder.com/100x150' },
      ],
      完本榜: [
        { title: '完本书1', image: 'https://via.placeholder.com/100x150' },
        { title: '完本书2', image: 'https://via.placeholder.com/100x150' },
        { title: '完本书3', image: 'https://via.placeholder.com/100x150' },
        { title: '完本书4', image: 'https://via.placeholder.com/100x150' },
        { title: '完本书5', image: 'https://via.placeholder.com/100x150' },
        { title: '完本书6', image: 'https://via.placeholder.com/100x150' },
        { title: '完本书7', image: 'https://via.placeholder.com/100x150' },
        { title: '完本书8', image: 'https://via.placeholder.com/100x150' },
      ],
      // 可添加其他类型数据
	  口碑榜: [
	    { title: '口碑书1', image: 'https://via.placeholder.com/100x150' },
	    { title: '完本书2', image: 'https://via.placeholder.com/100x150' },
	    { title: '完本书3', image: 'https://via.placeholder.com/100x150' },
	    { title: '完本书4', image: 'https://via.placeholder.com/100x150' },
	    { title: '完本书5', image: 'https://via.placeholder.com/100x150' },
	    { title: '完本书6', image: 'https://via.placeholder.com/100x150' },
	    { title: '完本书7', image: 'https://via.placeholder.com/100x150' },
	    { title: '完本书8', image: 'https://via.placeholder.com/100x150' },
	  ],
	  巅峰榜: [
	    { title: '巅峰书1', image: 'https://via.placeholder.com/100x150' },
	    { title: '完本书2', image: 'https://via.placeholder.com/100x150' },
	    { title: '完本书3', image: 'https://via.placeholder.com/100x150' },
	    { title: '完本书4', image: 'https://via.placeholder.com/100x150' },
	    { title: '完本书5', image: 'https://via.placeholder.com/100x150' },
	    { title: '完本书6', image: 'https://via.placeholder.com/100x150' },
	    { title: '完本书7', image: 'https://via.placeholder.com/100x150' },
	    { title: '完本书8', image: 'https://via.placeholder.com/100x150' },
	  ],
    };

    // 当前选中 Tab 的书籍数据
    const displayedBooks = computed(() => booksData[tabs.value[currentTab.value]]);

    return {
      hotBooks,
      tabs,
      currentTab,
      displayedBooks,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
}

.hot-books-container {
  overflow-x: auto; /* 使容器可以横向滚动 */
  white-space: nowrap; /* 确保图片不换行 */
  padding: 10px 0;
}

.hot-book-item {
  width: 100px;
  display: inline-block;
  margin-right: 10px;
}

.hot-book-image {
  width: 100%;
  height: 150px;
  border-radius: 8px;
}

.hot-book-title {
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
  color: #333;
}

.tab-container {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.tab-item {
  font-size: 16px;
  color: #666;
}

.active-tab {
  color: #a6acec;
  font-weight: bold;
  border-bottom: 2px solid #a6acec;
}

.books-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.book-item {
  width: 48%;
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  align-items: center;
}

.book-thumbnail {
  width: 60px;
  height: 90px;
  margin-right: 10px;
  border-radius: 4px;
}

.book-info {
  flex: 1;
}

.book-rank {
  font-size: 18px;
  color: #ff7f50;
  font-weight: bold;
}

.book-name {
  font-size: 14px;
  color: #333;
  margin-top: 4px;
}
</style>
