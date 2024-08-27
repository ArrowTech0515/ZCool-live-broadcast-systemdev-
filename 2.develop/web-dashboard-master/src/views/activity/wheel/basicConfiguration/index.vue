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
      <a-table-column title="转盘名称" dataIndex="name" key="name" align="center"/>
      <a-table-column title="提现金额" dataIndex="withdrawal" key="withdrawal" align="center" />
      <a-table-column title="活动有效期" dataIndex="validityPeriod" key="validityPeriod" align="center" />
      <a-table-column title="推广人数" dataIndex="nPromoters" key="nPromoters" align="center"/>
      <a-table-column title="下级充值人数" dataIndex="nSubordinate" key="nSubordinate" align="center"/>
      <a-table-column title="下级充值总金额" dataIndex="totalSubordinate" key="totalSubordinate" align="center"/>
      <a-table-column title="设备数限制" dataIndex="nDevicelimit" key="nDevicelimit" align="center"/>
      <a-table-column title="操作" dataIndex="operate" key="operate" align="center"/>

      <template #bodyCell="{ column, text }">
        <span v-if="column.dataIndex === 'operate'">
          <span style="text-decoration: underline;color: green; cursor: pointer;" @click="handleOperation('编辑')">编辑</span>
        </span>
        <!-- Default rendering for other columns -->
        <span v-else>{{ text }}</span>
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
    @update:is-modal-visible="val => isModalVisible = val" />

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

      dataSource: [
        {
          key: '1',
          sorting: '1',
          name: '1000元挡位',
          withdrawal: '1000',
          validityPeriod: '3天',
          nPromoters: '2000',
          nSubordinate: '100',
          totalSubordinate: '50000',
          nDevicelimit: '1',
          operate: '编辑'
        },
        {
          key: '1',
          sorting: '2',
          name: '3000元挡位',
          withdrawal: '2000',
          validityPeriod: '7天',
          nPromoters: '4000',
          nSubordinate: '200',
          totalSubordinate: '100000',
          nDevicelimit: '1',
          operate: '编辑'
        },
        {
          key: '1',
          sorting: '3',
          name: '5000元挡位',
          withdrawal: '5000',
          validityPeriod: '15天',
          nPromoters: '10000',
          nSubordinate: '500',
          totalSubordinate: '150000',
          nDevicelimit: '1',
          operate: '编辑'
        },

      ],
    };
  },
  
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.dataSource.slice(start, end);
    },
  },
  methods: {
  
    onAdd() {
      // Implement search logic

    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    handleSizeChange(current, size) {
      this.pageSize = size;
      this.currentPage = 1; // Reset to the first page when page size changes
    },

    handleOperation(operation) {
      // Add logic for handling the operation (e.g., audit, lock)
      if(operation === "编辑")
      {  
        console.log("handleOperation : " + this.isModalVisible.value)
        this.isModalVisible  = true
      }
    },

    handleBack() {
      // Handle the back action here
      // For example, navigate to the previous page:
      this.$emit('back'); // Emit the back event to the parent component
    },
  },
};
</script>

<style scoped>

</style>
