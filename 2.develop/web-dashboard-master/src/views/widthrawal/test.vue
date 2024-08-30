<template>
  <div>
    <!-- 2xN Grid Layout -->
    <a-row :gutter="[16, 16]">
      <a-col v-for="(item, index) in paginatedItems" :key="index" :span="24 / columnsPerRow">
        <a-card :title="'Card title ' + item.title" :bordered="false">
          {{ item.content }}
        </a-card>
      </a-col>
    </a-row>

    <!-- Pagination Controls -->
    <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 16px;">
      <span style="margin-right: 8px;">共 {{ totalItems }} 条</span>
      <a-pagination
        v-model:current="currentPage"
        :total="totalItems"
        :page-size="pageSize"
        show-size-changer
        :page-size-options="['4', '6', '8', '10']"
        :simple="false"
        size="small"
        @change="handlePageChange"
        @show-size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Row, Col, Card, Pagination } from 'ant-design-vue';

const items = ref([
  { title: '1', content: 'Content of card 1' },
  { title: '2', content: 'Content of card 2' },
  { title: '3', content: 'Content of card 3' },
  { title: '4', content: 'Content of card 4' },
  { title: '5', content: 'Content of card 5' },
  { title: '6', content: 'Content of card 6' },
  { title: '7', content: 'Content of card 7' },
  { title: '8', content: 'Content of card 8' },
  { title: '9', content: 'Content of card 9' },
  { title: '10', content: 'Content of card 10' },
]);

const currentPage = ref(1);
const pageSize = ref(4); // Default to 4 items per page
const totalItems = computed(() => items.value.length);

// Number of columns per row
const columnsPerRow = computed(() => Math.ceil(pageSize.value / 2));

// Handle page change
const handlePageChange = (page) => {
  currentPage.value = page;
};

// Handle page size change
const handleSizeChange = (current, size) => {
  pageSize.value = size;
  currentPage.value = 1; // Reset to the first page when page size changes
};

// Computed property for paginated data
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return items.value.slice(start, end);
});
</script>
