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
          <span style="font-size: 20px; font-weight: bold;">送礼活动数据</span>
        </div>
      </div>
    </template>

      <a-row :gutter="16" style=" align-items: center; ">
        <!-- First Column -->
        <a-row >
          <a-col style="margin: 20px;">
                <a-form-item label="用户ID">
                  <a-input v-model="gameId" placeholder="" />
                </a-form-item>
          </a-col>
          <a-col style="margin: 20px;">
                <a-form-item label="用户昵称">
                  <a-input v-model="gameId" placeholder="" />
                </a-form-item>
          </a-col>

          <a-col style="margin: 20px;">
            <a-range-picker :placeholder="['开始时间', '结束时间']">
            <!-- options here -->
            </a-range-picker>
          </a-col>
        </a-row>
        <a-col :span="3">
            <a-form-item>
              <a-button type="primary" block @click="onSearch">查询</a-button>
            </a-form-item>
        </a-col>

      </a-row>

      <!-- Your existing layout and table setup -->
      <a-table :data-source="paginatedData" :pagination="false">
        <a-table-column title="用户ID" dataIndex="activityName" key="activityName" align="center" />
        <a-table-column title="用户昵称" dataIndex="activityCover" key="activityCover" align="center"/>
        <a-table-column title="赠送机制" dataIndex="activityTime" key="activityTime" align="center" />
        <a-table-column title="赠送类型" dataIndex="activityStatus" key="activityStatus" align="center" />
        <a-table-column title="赠送时间" dataIndex="operationAccount" key="operationAccount" align="center">
        </a-table-column>

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
          activityName: '232312',
          activityCover: '大大',
          activityTime: '新注册用户',
          activityStatus: '3242钻石 | XXX 礼物*3  |  XXX礼物*1',
          operationAccount: '2012-12-12  12:21',
        },
        {
          key: '2',
          activityName: '232312',
          activityCover: '发生发顺丰',
          activityTime: '首充用户',
          activityStatus: '3242钻石',
          operationAccount: '2012-12-12  12:21',
        },
        {
          key: '3',
          activityName: '232312',
          activityCover: '大大',
          activityTime: '绑定手机号用户',
          activityStatus: '3242钻石 | XXX 礼物*3  |  XXX礼物*1',
          operationAccount: '2012-12-12  12:21',
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
      if(operation === "提现明细")
        this.showReviewPage = true; // Switch to the add strategy view
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
