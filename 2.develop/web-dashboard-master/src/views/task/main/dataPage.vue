<template>
  <a-card style="background-color: white;">
    <template #title>
      <div style="display: flex; align-items: center; white-space: nowrap;">
        <a-button
          type="link"
          style="font-size: 18px; margin-right: 8px;"
          @click="handleBack"
        >
          <span style="font-size: 20px; font-weight: bold; margin-left: 8px;">&lt;</span>
        </a-button>
        <div style="flex-grow: 1; text-align: center;">
          <span style="font-size: 20px; font-weight: bold;">任务数据</span>
        </div>
      </div>
    </template>

    <a-row :gutter="16" :type="flex" style=" justify-content: flex-end; align-items: center; ">
    <!-- First Column -->
    <!-- <a-row :type="flex"> -->
      <a-col :flex="1">
        <a-form-item label="任务ID">
          <a-input v-model="gameId" placeholder="" />
        </a-form-item>
      </a-col>
      
      <a-col :flex="1">
        <a-form-item label="用户ID">
          <a-input v-model="gameId" placeholder="" />
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item label="用户昵称">
          <a-input v-model="gameId" placeholder="" />
        </a-form-item>
      </a-col>

      <a-col :flex="auto">
        <a-form-item label="时间" >
          <a-range-picker 
            :placeholder="['开始时间', '结束时间']"
          />
        </a-form-item>
      </a-col>

    <!-- </a-row> -->

      <a-col :span="3">
        <a-form-item>
          <a-button type="primary" block @click="onSearch">查询</a-button>
        </a-form-item>
      </a-col>
    
    </a-row>

    <!-- Your existing layout and table setup -->
    <a-table :data-source="paginatedData" :pagination="false">
      <a-table-column title="任务ID" dataIndex="taskID" key="taskID" align="center" />
      <a-table-column title="任务名称" dataIndex="taskName" key="taskName" align="center" />
      <a-table-column title="用户ID" dataIndex="userID" key="userID" align="center"/>
      <a-table-column title="用户昵称" dataIndex="nickName" key="nickName" align="center" />
      <a-table-column title="任务奖励" dataIndex="taskReward" key="taskReward" align="center" />
      <a-table-column title="领取时间" dataIndex="receiptTime" key="receiptTime" align="center"/>
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
          taskID: '4234324',
          taskName: 'XXX任务',
          userID: '232312',
          nickName: '大大',
          taskReward: '10钻石',
          receiptTime: '2012-12-12  12:21:21',
        },
        {
          key: '2',
          taskID: '4234324',
          taskName: 'XXX任务',
          userID: '232312',
          nickName: '发生发顺丰',
          taskReward: '10钻石',
          receiptTime: '2012-12-12  12:21:21',
        },
        {
          key: '3',
          taskID: '4234324',
          taskName: 'XXX任务',
          userID: '232312',
          nickName: '大大',
          taskReward: '10钻石',
          receiptTime: '2012-12-12  12:21:21',
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
