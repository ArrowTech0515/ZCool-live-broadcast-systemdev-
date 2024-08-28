<template>
  <a-card style="background-color: white;">

    <transition name="fade-slide" mode="out-in">

      <div v-if="!showEditPage && !showDataPage">

        <a-row :gutter="16" :type="flex" style=" justify-content: flex-end; align-items: center; ">
          <!-- First Column -->
          <!-- <a-row :type="flex"> -->
            <a-col :flex="1">
              <a-form-item label="任务ID">
                <a-input v-model="gameId" placeholder="" />
              </a-form-item>
            </a-col>
            
            <a-col :flex="1">
              <a-form-item label="名称搜索">
                <a-input v-model="gameId" placeholder="" />
              </a-form-item>
            </a-col>

            <a-col :flex="1">
              <a-form-item label="任务" >
                <a-select v-model="status" value="all">
                  <a-select-option value="all">全部机制</a-select-option>
                  <a-select-option value="active">每日循环任务</a-select-option>
                  <a-select-option value="enabled"> 一次性任务</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :flex="1">
              <a-form-item label="状态" >
                <a-select v-model="status" value="all">
                  <a-select-option value="all">全部状态</a-select-option>
                  <a-select-option value="active">进行中</a-select-option>
                  <a-select-option value="enabled">已结束</a-select-option>
                </a-select>
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

          <a-col :span="2">
              <a-form-item>
                <a-button type="primary" block @click="onSearch">查询</a-button>
              </a-form-item>
          </a-col>
          
          <a-col :span="2">
              <a-form-item>
                <a-button type="primary" block @click="onAdd">添加任务</a-button>
              </a-form-item>
          </a-col>

        </a-row>

        <!-- Your existing layout and table setup -->
        <a-table :data-source="paginatedData" :pagination="false">
          <a-table-column title="任务ID" dataIndex="taskID" key="taskID" align="center" />
          <a-table-column title="任务名称" dataIndex="taskName" key="taskName" align="center" />
          <a-table-column title="循环机制" dataIndex="circular" key="circular" align="center"/>
          <a-table-column title="参与用户" dataIndex="participating" key="participating" align="center" />
          <a-table-column title="任务奖励" dataIndex="taskReward" key="taskReward" align="center" />
          <a-table-column title="任务状态" dataIndex="taskStatus" key="taskStatus" align="center"/>
          <a-table-column title="任务次数" dataIndex="taskTimes" key="taskTimes" align="center"/>
          <a-table-column title="任务时间" dataIndex="taskTime" key="taskTime" align="center"/>
          <a-table-column title="更新时间" dataIndex="updateTime" key="updateTime" align="center"/>
          <a-table-column title="操作账号" dataIndex="operationAccount" key="operationAccount" align="center"/>
          <a-table-column title="操作" dataIndex="operate" key="operate" align="center"/>

          <template #bodyCell="{ column, text }">

            <span v-if="column.dataIndex === 'operate'">
              <span style="text-decoration: underline;color: green; margin-right: 8px; cursor: pointer;" @click="handleOperation('数据')">数据</span>
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
          taskID: '1',
          taskName: '登录任务',
          circular: '每日循环任务',
          participating: '全部用户',
          taskReward: '10钻石',
          taskStatus: '进行中',
          taskTimes: '1',
          taskTime: '永久有效',
          updateTime: '2012-12-12  12:21:21',
          operationAccount: '管理员-张三',
          operate: '数据 编辑',
        },
        {
          key: '2',
          taskID: '2',
          taskName: '打赏礼物',
          circular: '一次性任务',
          participating: '新用户',
          taskReward: '改名卡',
          taskStatus: '已结束',
          taskTimes: '2',
          taskTime: '2012-12-12  12:21——2012-12-12  12:2',
          updateTime: '2012-12-12  12:21:21',
          operationAccount: '管理员-张三',
          operate: '数据 编辑',
        },
        {
          key: '3',
          taskID: '3',
          taskName: '观看时长',
          circular: '每日循环任务',
          participating: '新用户',
          taskReward: '10钻石',
          taskStatus: '进行中',
          taskTimes: '1',
          taskTime: '永久有效',
          updateTime: '2012-12-12  12:21:21',
          operationAccount: '管理员-张三',
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
      else if(operation === "数据")
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
