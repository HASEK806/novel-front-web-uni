<template>
  <view class="container">
    <!-- 搜索框 -->
    <view class="search-container">
      <!-- 左侧选择书名/作者/id -->
	  <view class="picker">
		  <uni-data-select
			mode="selector"
			:localdata="searchTypes"
			v-model="searchType"
			:clear="false"
			/>
	  </view>

      <!-- 输入框 -->
      <uni-easyinput 
		v-model="searchQuery" 
		placeholder="请输入内容"  
		@focus="showHistory = true"/>
	  
      <!-- 搜索按钮 -->
      <uni-icons 
		class="search-btn"
		type="search"  
		size="20" 
		color="#c7c9ce"
		@click="handleSearch"/>
	  
	  <!-- 历史记录 -->
	  <view
		class="history-container"
		v-if="showHistory && history.length > 0" >
	    <view 
			class="history-item"
			v-for="(item, index) in history" 
			:key="index" 
			@click="selectHistory(item)">
	      {{ item }}
	    </view>
	    <view 
			class="clear-history" 
			@click="clearHistory">
			清除历史记录
		</view>
	  </view>
    </view>

    <!-- 搜索结果 -->
    <view class="books-list">
      <view 
		class="book-item"
		v-if="books.length !== 0" 
		v-for="(book, index) in books" 
		:key="index">
        <image :src="book.image" class="book-image" />
        <view class="book-details">
          <view class="book-title">{{ book.title }}</view>
          <view class="book-author">作者: {{ book.author }}</view>
          <view class="book-favorite">
            <uni-icons 
				:type="book.favorite ? 'star-filled' : 'star'" 
				size="20" 
				color="#FFD700"
				@click="toggleFavorite(index)"/>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  
  setup() {
    const searchTypes = [
        { value: 0, text: "书名" },
        { value: 1, text: "作者" },
        { value: 2, text: "ID" },
    ]
    const searchType = ref(0);
    const searchQuery = ref('');
    const history = ref<string[]>([]);
    const showHistory = ref(false);
    const books = ref<any[]>([]);

    const mockData = [
      { title: '书籍A', author: '作者A', image: 'https://via.placeholder.com/150', favorite: true },
      { title: '书籍B', author: '作者B', image: 'https://via.placeholder.com/150', favorite: false },
      { title: '书籍C', author: '作者C', image: 'https://via.placeholder.com/150', favorite: true },
	  { title: '书籍A', author: '作者A', image: 'https://via.placeholder.com/150', favorite: true },
	  { title: '书籍B', author: '作者B', image: 'https://via.placeholder.com/150', favorite: false },
	  { title: '书籍C', author: '作者C', image: 'https://via.placeholder.com/150', favorite: true },
	  { title: '书籍A', author: '作者A', image: 'https://via.placeholder.com/150', favorite: true },
	  { title: '书籍B', author: '作者B', image: 'https://via.placeholder.com/150', favorite: false },
	  { title: '书籍C', author: '作者C', image: 'https://via.placeholder.com/150', favorite: true },
	  { title: '书籍A', author: '作者A', image: 'https://via.placeholder.com/150', favorite: true },
	  { title: '书籍B', author: '作者B', image: 'https://via.placeholder.com/150', favorite: false },
	  { title: '书籍C', author: '作者C', image: 'https://via.placeholder.com/150', favorite: true },
    ];
	
	// 切换收藏状态
	const toggleFavorite = (index: number) => {
	  books.value[index].favorite = !books.value[index].favorite;
	};

    const handleSearch = () => {
      if (searchQuery.value.trim() === '') {
		  uni.showToast({
		    title: '请输入内容',
		    icon: 'error'
		  });
		  return;
	  };
	  
	  
	  
      if (!history.value.includes(searchQuery.value)) {
        history.value.unshift(searchQuery.value);
      }
      if (history.value.length > 7) {
        history.value.pop();
      }

      books.value = mockData.filter(book => {
        if (searchType.value === 0) {
          return book.title.includes(searchQuery.value);
        } else if (searchType.value === 1) {
          return book.author.includes(searchQuery.value);
        } else {
          return book.title.includes(searchQuery.value) || book.author.includes(searchQuery.value);
        }
      });
	  
	  if (books.value.length === 0) {
	  		  uni.showToast({
	  		    title: '暂无数据',
	  		    icon: 'error'
	  		  });
	  };

      showHistory.value = false;
    };

    const clearSearch = () => {
      searchQuery.value = '';
    };

    const selectHistory = (item: string) => {
      searchQuery.value = item;
      showHistory.value = false;
    };

    const clearHistory = () => {
      history.value = [];
    };

    return {
      searchTypes,
      searchType,
      searchQuery,
      history,
      showHistory,
      books,
      handleSearch,
      clearSearch,
      selectHistory,
      clearHistory,
	  toggleFavorite,
    };
  }
});
</script>

<style>
	:deep(.uni-select) {
	  border: none !important;
	  border-bottom: none !important;
	}
	
	:deep(.is-input-border) {
	  border: none !important;
	}
</style>

<style lang="scss" scoped>
.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 50px;
  background-color: #fff;
  z-index: 2; /* 保证搜索框不被遮挡 */
  border-bottom: 1px solid #ddd;
  border-radius: 8px;
}

.picker {
  width: 65px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
}

.clear-btn {
  position: absolute;
  right: 60px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  cursor: pointer;
}

.search-btn {
  padding: 5px 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.history-container {
  position: absolute;
  top: 100%;
  left: 70px;
  width: 70%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 999;
}

.history-item {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #f3f3f3;
}

.clear-history {
  padding: 10px;
  text-align: center;
  color: #a6acec;
}

.books-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin-top: 10px;
}

.books-none {
	text-align: center;
	padding-top: 20px;
	color: #999999;
}

.book-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.book-image {
  width: 80px;
  height: 100px;
  margin-right: 10px;
}

.book-details {
  flex: 1;
}

.book-title {
  font-size: 16px;
  font-weight: bold;
}

.book-author {
  color: #888;
}

.book-favorite {
  margin-top: 10px;
}
</style>
