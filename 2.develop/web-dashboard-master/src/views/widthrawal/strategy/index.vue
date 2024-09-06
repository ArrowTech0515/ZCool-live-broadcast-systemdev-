<template>
  <a-card style="background-color: white;">
    <transition name="fade-slide" mode="out-in">
      <div v-if="!showAddStrategy">
        <a-row :gutter="16" type="flex" justify="end">
          <!-- First Column -->

          <a-col :flex="1">
            <a-form-item label="策略ID">
              <a-input v-model="gameId" placeholder="" />
            </a-form-item>
          </a-col>

          <a-col :flex="1">
            <a-form-item label="策略名称">
              <a-input v-model="gameId" placeholder="" />
            </a-form-item>
          </a-col>

          <a-col :flex="1">
            <a-form-item label="提现">
              <a-select v-model="status" value="blockchain">
                <a-select-option value="blockchain">区块链提现</a-select-option>
                <a-select-option value="yes">是</a-select-option>
                <a-select-option value="no">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :flex="1">
            <a-form-item label="状态">
              <a-select v-model="status" value="all">
                <a-select-option value="all">全部状态</a-select-option>
                <a-select-option value="enabled">启用</a-select-option>
                <a-select-option value="disabled">关闭</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :flex="auto">
            <a-form-item label="时间">
              <a-range-picker :placeholder="['开始日期', '结束日期']">
                <!-- options here -->
              </a-range-picker>
            </a-form-item>
          </a-col>

          <a-col :span="2">
            <a-form-item>
              <a-button type="primary" block @click="onSearch">查询</a-button>
            </a-form-item>
          </a-col>

          <a-col :flex="auto">
            <a-form-item>
              <a-button type="primary" block @click="onAddStrategy" style="background-color: darkgreen;">
                添加提现策略
              </a-button>
            </a-form-item>
          </a-col>

          <a-col :flex="auto">
            <a-form-item>
              <a-button type="primary" block @click="exportCSV">导出CSV</a-button>
            </a-form-item>
          </a-col>
        </a-row>

        <!-- Your existing layout and table setup -->
        <a-table :data-source="paginatedData" :pagination="false">
          <!-- Table columns -->
          <a-table-column title="策略ID" dataIndex="strategyID" key="strategyID" align="center" />
          <a-table-column title="策略名称" dataIndex="strategyName" key="strategyName" align="center" />
          <a-table-column title="最低提现金额" dataIndex="minAmount" key="minAmount" align="center" />
          <a-table-column title="最高提现金额" dataIndex="maxAmount" key="maxAmount" align="center" />
          <a-table-column title="每日免费提现次数" dataIndex="freePerDay" key="freePerDay" align="center" />
          <a-table-column title="每日限制提现次数" dataIndex="limitPerDay" key="limitPerDay" align="center" />
          <a-table-column title="手续费比例" dataIndex="feeRatio" key="feeRatio" align="center" />
          <a-table-column title="区块链提现" dataIndex="blockchain" key="blockchain" align="center" />
          <a-table-column title="自动打款" dataIndex="automatic" key="automatic" align="center" />
          <a-table-column title="策略用户" dataIndex="strategyUser" key="strategyUser" align="center" />
          <a-table-column title="更新时间" dataIndex="updateTime" key="updateTime" align="center" />
          <a-table-column title="状态" dataIndex="status" key="status" align="center" />
          <a-table-column title="操作账号" dataIndex="operationAccount" key="operationAccount" align="center" />
          <a-table-column title="操作" dataIndex="operation" key="operation" align="center" />

          <template #bodyCell="{ column, text }">
            <span v-if="column.dataIndex === 'strategyUser' || column.dataIndex === 'operation'">
              <span style="text-decoration: underline; color: blue; cursor: pointer;" @click="handleOperation(text)">
                {{ text }}
              </span>
            </span>

            <span v-else-if="column.dataIndex === 'status'">
              <span v-if="text === '启用'" style="text-decoration: underline; color: blue; cursor: pointer;" @click="handleOperation(text)">
                {{ text }}
              </span>
              <span v-else style="text-decoration: underline; color: red; cursor: pointer;" @click="handleOperation(text)">
                {{ text }}
              </span>
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

      <div v-else>
        <AddStrategy @back="onBackToMainPage" />
      </div>
    </transition>
  </a-card>
</template>

<script>
import AddStrategy from './add.vue';

export default {
  components: {
    AddStrategy,
  },
  data() {
    return {
      showAddStrategy: false, // New state to manage which view to show
      currentPage: 1,
      pageSize: 5,
      totalItems: 100,
      dataSource: [
        {
          key: '1',
          strategyID: '1',
          strategyName: '贵族用户提现',
          minAmount: '100',
          maxAmount: '10000',
          freePerDay: '6',
          limitPerDay: '9',
          feeRatio: '10%',
          blockchain: '是',
          automatic: '0-0',
          strategyUser: '查看',
          updateTime: '2012-12-12  12:21:21',
          status: '启用',
          operationAccount: '管理员 - 张三',
          operation: '编辑',
        },
        {
          key: '2',
          strategyID: '2',
          strategyName: '贵族用户提现',
          minAmount: '100',
          maxAmount: '10000',
          freePerDay: '6',
          limitPerDay: '9',
          feeRatio: '10%',
          blockchain: '是',
          automatic: '0-0',
          strategyUser: '查看',
          updateTime: '2012-12-12  12:21:21',
          status: '关闭',
          operationAccount: '管理员 - 张三',
          operation: '编辑',
        },
        {
          key: '3',
          strategyID: '3',
          strategyName: '贵族用户提现',
          minAmount: '100',
          maxAmount: '10000',
          freePerDay: '6',
          limitPerDay: '9',
          feeRatio: '10%',
          blockchain: '是',
          automatic: '0-0',
          strategyUser: '查看',
          updateTime: '2012-12-12  12:21:21',
          status: '启用',
          operationAccount: '管理员 - 张三',
          operation: '编辑',
        },
        {
          key: '4',
          strategyID: '4',
          strategyName: '贵族用户提现',
          minAmount: '100',
          maxAmount: '10000',
          freePerDay: '6',
          limitPerDay: '9',
          feeRatio: '10%',
          blockchain: '是',
          automatic: '0-0',
          strategyUser: '查看',
          updateTime: '2012-12-12  12:21:21',
          status: '关闭',
          operationAccount: '管理员 - 张三',
          operation: '编辑',
        },
        {
          key: '5',
          strategyID: '5',
          strategyName: '贵族用户提现',
          minAmount: '100',
          maxAmount: '10000',
          freePerDay: '6',
          limitPerDay: '9',
          feeRatio: '10%',
          blockchain: '是',
          automatic: '0-0',
          strategyUser: '查看',
          updateTime: '2012-12-12  12:21:21',
          status: '启用',
          operationAccount: '管理员 - 张三',
          operation: '编辑',
        },
        // other rows
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
    exportCSV() {

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
      this.$message.success(`${operation} 操作执行成功`);
    },
    onAddStrategy() {
      this.showAddStrategy = true; // Switch to the add strategy view
    },
    onBackToMainPage() {
      this.showAddStrategy = false; // Switch back to the main table view
    },
  },
};
</script>

<style scoped>
.expanded-row-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-left: 40px; /* Add margin to the whole sub-row */
}

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
