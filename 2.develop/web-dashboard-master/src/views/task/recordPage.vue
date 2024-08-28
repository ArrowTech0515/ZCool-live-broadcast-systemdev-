<template>
  <a-card style="background-color: white;">
    <a-row :gutter="16" :type="flex" style=" justify-content: flex-end; align-items: center; ">
    <!-- First Column -->
    <!-- <a-row :type="flex"> -->
      <a-col :flex="1">
        <a-form-item label="用户账号">
          <a-input v-model="userAccount" placeholder="" />
        </a-form-item>
      </a-col>
      
      <a-col :flex="1">
        <a-form-item label="任务名称">
          <a-input v-model="logID" placeholder="" />
        </a-form-item>
      </a-col>

      <a-col :flex="auto">
        <a-form-item label="日期" >
          <a-range-picker 
            :placeholder="['开始日期', '结束日期']"
          />
        </a-form-item>
      </a-col>

    <!-- </a-row> -->

      <a-col :span="3">
        <a-form-item>
          <a-button type="primary" block @click="onSearch">查询</a-button>
        </a-form-item>
      </a-col>
    
      <a-col :span="3">
        <a-form-item>
          <a-button block @click="onReset">重置</a-button>
        </a-form-item>
      </a-col>
    </a-row>

    <!-- Your existing layout and table setup -->
    <a-table :data-source="paginatedData" :pagination="false">
      <a-table-column title="全选" dataIndex="selectAll" key="selectAll" align="center" />
      <a-table-column title="日志标识" dataIndex="logID" key="logID" align="center" />
      <a-table-column title="用户标识" dataIndex="userID" key="userID" align="center"/>
      <a-table-column title="用户账号" dataIndex="nickName" key="nickName" align="center" />
      <a-table-column title="任务名称" dataIndex="taskName" key="taskName" align="center" />
      <a-table-column title="奖励游戏币" dataIndex="rewardGameCoins" key="rewardGameCoins" align="center" />
      <a-table-column title="完成时间" dataIndex="completeTime" key="completeTime" align="center"/>
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
  
</template>

<script>

export default {

  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      totalItems: 100,

      dataSource: [
        {
          key: '1',
          selectAll: '4234324',
          logID: '1',
          userID: '100004',
          nickName: '企鹅飞飞',
          taskName: '打码限时',
          rewardGameCoins: '1',
          completeTime: '2024-08-20 18:07:30',
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
  
    onSearch() {
      // Implement search logic
    },
    onReset() {
      this.merchantId = '';
      this.gameId = '';
      this.platform = '';
      this.nBetting = '';
      this.status = '';
      // Implement reset logic
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
      // if(operation === "提现明细")
      //   this.showReviewPage = true; // Switch to the add strategy view
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
