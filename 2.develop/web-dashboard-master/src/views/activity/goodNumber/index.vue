<template>
  <a-card style="background-color: white;">

    <transition name="fade-slide" mode="out-in">

      <div v-if="!showEditPage && !showDataPage">

        <a-row :gutter="16" :type="flex" style=" align-items: center; ">
          <!-- First Column -->
          <a-row :type="flex">
            <a-col style="margin: 20px;">
                  <a-form-item label="活动名称搜索">
                    <a-input v-model="gameId" placeholder="" />
                  </a-form-item>
            </a-col>

            <a-col :flex="2" style="margin: 20px;">
                <a-form-item label="状态" >
                  <a-select v-model="status" value="all">
                    <a-select-option value="all">全部状态</a-select-option>
                    <a-select-option value="active">进行中</a-select-option>
                    <a-select-option value="enabled">已结束</a-select-option>
                  </a-select>
                </a-form-item>
            </a-col>
          </a-row>
          <a-col :span="3" style="margin: 20px;">
              <a-form-item>
                <a-button type="primary" block @click="onSearch">查询</a-button>
              </a-form-item>
          </a-col>
        </a-row>

        <!-- Your existing layout and table setup -->
        <a-table :data-source="paginatedData" :pagination="false">
          <a-table-column title="活动名称" dataIndex="activityName" key="activityName" align="center" />
          <a-table-column title="活动时间" dataIndex="activityTime" key="activityTime" align="center"/>
          <a-table-column title="活动类型" dataIndex="activityType" key="activityType" align="center" />
          <a-table-column title="活动状态" dataIndex="activityStatus" key="activityStatus" align="center" />
          <a-table-column title="更新时间" dataIndex="creationTime" key="creationTime" align="center">
          </a-table-column>
          <a-table-column title="操作账号" dataIndex="operationAccount" key="operationAccount" align="center">
          </a-table-column>
          <a-table-column title="操作" dataIndex="operate" key="operate" align="center">
          </a-table-column>

          <template #bodyCell="{ column, text }">

            <span v-if="column.dataIndex === 'operate'">
              <span style="text-decoration: underline;color: blue; margin-right: 8px; cursor: pointer;" @click="handleOperation('数据')">数据</span>
              <span style="text-decoration: underline;color: blue; cursor: pointer;" @click="handleOperation('编辑')">编辑</span>
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
      </div>

      <div v-else-if="showDataPage">
        <dataPage
          withdrawStatus="提现中"
          
          @back="onBackToMainPage1"
          @confirm="handleConfirm"
          @reject="handleReject" />
      </div>

      <div v-else>
        <editPage
          withdrawStatus="提现中"
          
          @back="onBackToMainPage2"
          @confirm="handleConfirm"
          @reject="handleReject" />
      </div>

    </transition>

  </a-card>
</template>

<script>
import editPage from './editPage.vue';
import dataPage from './dataPage.vue';

export default {
  components: {
    editPage,
    dataPage,
  },
  data() {
    return {
      showEditPage: false, // New state to manage which view to show
      showDataPage: false, // New state to manage which view to show

      currentPage: 1,
      pageSize: 5,
      totalItems: 100,

      dataSource: [
        {
          key: '1',
          activityName: '充值活动',
          activityType: '登录任务',
          activityTime: '2012-12-12  12:21——2012-12-12  12:21',
          activityStatus: '活动中',
          operationAccount: '管理员-张三',
          creationTime: '2012-12-12  12:21:21',
          operate: '数据 编辑',
        },
        {
          key: '2',
          activityName: '充值活动',
          activityType: '登录任务',
          activityTime: '2012-12-12  12:21——2012-12-12  12:21',
          activityStatus: '已结束',
          operationAccount: '管理员-张三',
          creationTime: '2012-12-12  12:21:21',
          operate: '数据 编辑',
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
      if(operation === "编辑")
        this.showEditPage = true; // Switch to the add strategy view
      else// if(operation === "数据")
      {
        console.log("handleOperation : " + operation)
        this.showDataPage = true; // Switch to the add strategy view
      }  
    },

    onBackToMainPage1() {
      this.showDataPage = false; // Switch back to the main table view
    },

    onBackToMainPage2() {
      this.showEditPage = false; // Switch back to the main table view
    },
  },
};
</script>

<style scoped>

.row {
  display: contents;
}

.cell {
  padding: 8px;
  white-space: pre-line; /* Ensure text wraps in each cell */
}

/* Add transition effects */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter, .fade-slide-leave-to /* .fade-slide-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateX(10px);
}
</style>
