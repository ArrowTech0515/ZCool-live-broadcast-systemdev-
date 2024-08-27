<template>
  <a-card style="background-color: white;">

    <a-row :gutter="16" style="display: flex; justify-content: flex-end; align-items: center;">
    <!-- First Column -->
      <a-col :span="3" :flex="end" style="align-items: end;">
          <a-form-item>
            <a-button type="primary" block @click="onAdd">新增</a-button>
          </a-form-item>
      </a-col>
    </a-row>

    <!-- Your existing layout and table setup -->
    <a-table :data-source="paginatedData" :pagination="false">
      <a-table-column title="排序" dataIndex="sorting" key="sorting" align="center" />
      <a-table-column title="奖励名称" dataIndex="name" key="name" align="center"/>
      <a-table-column title="数量" dataIndex="quantity" key="quantity" align="center" />
      <a-table-column title="操作" dataIndex="operate" key="operate" align="center"/>

      <template #bodyCell="{ column, record }">
        <span v-if="column.dataIndex === 'operate'">
          <span style="text-decoration: underline;color: green; cursor: pointer;" @click="handleOperation(record)">编辑</span>
        </span>
        <span v-else>{{ record[column.dataIndex] }}</span>
      </template>

    </a-table>

    <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 16px;">
      <span style="margin-right: 8px;">共 {{ totalItems }}条</span>
      <a-pagination
        v-model:current="currentPage"
        :total="totalItems"
        :page-size="pageSize"
        show-size-changer
        :page-size-options="['5', '10', '20', '50', '100']"
        :simple="false"
        size="small"
        @change="handlePageChange"
        @show-size-change="handleSizeChange"
      />
    </div>
  </a-card>

  <AddorEditDialog 
    :isModalVisible="isModalVisible"
    :formData="selectedRow"
    :operationType="operationType"
    @update:is-modal-visible="val => isModalVisible = val"
    @save="handleSave"
  />

</template>

<script>
import AddorEditDialog from './AddorEditDialog.vue'

export default {
  components: {
    AddorEditDialog,
  },

  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      totalItems: 100,
      isModalVisible : false,
      selectedRow: null,
      operationType: '新增', // Default operation type

      dataSource: [
        {
          key: '1',
          sorting: '1',
          name: '金币',
          quantity: '100',
          operate: '编辑'
        },
        {
          key: '2',
          sorting: '2',
          name: '幸运值',
          quantity: '100',
          operate: '编辑'
        },
        {
          key: '3',
          sorting: '3',
          name: '能量',
          quantity: '100',
          operate: '编辑'
        },
        {
          key: '4',
          sorting: '4',
          name: '钻石',
          quantity: '100',
          operate: '编辑'
        },
        {
          key: '5',
          sorting: '5',
          name: '积分',
          quantity: '100',
          operate: '编辑'
        },
        {
          key: '6',
          sorting: '6',
          name: '魅力',
          quantity: '100',
          operate: '编辑'
        },

      ],
    }
  },
  
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.dataSource.slice(start, end)
    },
  },
  methods: {
  
    onAdd() {
      // Implement search logic
      this.selectedRow = {
        key: String(this.dataSource.length + 1), // Generate a new key
        sorting: '',
        name: '',
        quantity: '',
      }
      this.operationType = '新增'
      this.isModalVisible = true
    },
    handlePageChange(page) {
      this.currentPage = page
    },
    handleSizeChange(current, size) {
      this.pageSize = size
      this.currentPage = 1 // Reset to the first page when page size changes
    },

    handleOperation(record) {
      // Add logic for handling the operation (e.g., audit, lock)
      // if(operation === "编辑")
      {  
        this.selectedRow = { ...record } // Deep copy the selected row data
        this.operationType = '编辑'
        this.isModalVisible = true
      }
    },

    handleSave(updatedData) {
      // Implement save logic here (e.g., update the row in the dataSource)
      if (this.operationType === '新增') {
        this.dataSource.push({
          ...updatedData,
          key: String(this.dataSource.length + 1) // Generate a new key
        })
      } else if (this.operationType === '编辑') {
        const index = this.dataSource.findIndex(item => item.key === updatedData.key)
        console.log("handleSave : index = " + index)
        
        if (index !== -1) {
          this.dataSource.splice(index, 1, updatedData)
        }
      }
      this.totalItems = this.dataSource.length // Update totalItems if needed
      this.isModalVisible = false // Close the dialog
    },
  },
}
</script>

<style scoped>

</style>
