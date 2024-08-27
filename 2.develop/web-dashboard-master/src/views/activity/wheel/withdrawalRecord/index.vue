<template>
  <a-card style="background-color: white;">
    <a-row :gutter="16"  type="flex" >

      <!-- First Column -->
      <a-col :flex="auto">
        <a-form-item label="时间">
          <a-range-picker :placeholder="['开始日期', '结束日期']">
            <!-- options here -->
          </a-range-picker>
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item label="提现人ID">
          <a-input v-model="withdrawerID" placeholder="" />
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item label="提现人昵称">
          <a-input v-model="withdrawPosition" placeholder="" />
        </a-form-item>
      </a-col>
      
      <!-- Separator -->
      <a-col>
        <a-divider type="vertical" :style="{ height: '80%', margin: 'auto 0' }" />
      </a-col>

      <!-- Second Column -->
      <a-col  :span="3">
        <a-form-item>
          <a-button type="primary" block @click="onSearch">
            <SearchOutlined /> 查询</a-button>
        </a-form-item>
      </a-col>

      <a-col :span="3">
        <a-form-item>
          <a-button block @click="onReset">
            <ReloadOutlined /> 重置</a-button>
        </a-form-item>
      </a-col>
    </a-row>

    <!-- Your existing layout and table setup -->
    <a-table :data-source="paginatedData" :pagination="false">
      <a-table-column title="排序" dataIndex="sorting" key="sorting" align="center" />
      <a-table-column title="提现人ID" dataIndex="withdrawerID" key="withdrawerID" align="center" />
      <a-table-column title="昵称" dataIndex="nickname" key="nickname" align="center" />
      <a-table-column title="提现挡位" dataIndex="withdrawPosition" key="withdrawPosition" align="center" />
      <a-table-column title="提现类型" dataIndex="withdrawType" key="withdrawType" align="center" />
      <a-table-column title="提现金额" dataIndex="withdrawAmount" key="withdrawAmount" align="center" />
      <a-table-column title="提现时间" dataIndex="withdrawTime" key="withdrawTime" align="center" />

    </a-table>

    <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 16px;">
      <span style="margin-right: 8px;">共 {{ totalItems }}条</span>
      <a-pagination
        v-model:current="currentPage"
        :total="totalItems"
        :page-size="pageSize"
        show-size-changer
        :page-size-options="['5', '10', '15', '50', '100']"
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
      pageSize: 15,
      totalItems: 100,

      merchantId: '',
      withdrawerID: '',
      withdrawType: '',
      withdrawPosition: '',
      status: '',

      dataSource: [
        {
          key: '1',
          sorting: '1',
          withdrawerID: '300001',
          nickname: '张张',
          withdrawPosition: '1000元挡位',
          withdrawType: '提现',
          withdrawAmount: '1000元',
          withdrawTime: '2024.05.25 10:00:00',
        },
        {
          key: '2',
          sorting: '2',
          withdrawerID: '300002',
          nickname: '丽丽',
          withdrawPosition: '1000元挡位',
          withdrawType: '提现',
          withdrawAmount: '1000元',
          withdrawTime: '2024.05.25 10:00:00',
        },
        {
          key: '3',
          sorting: '3',
          withdrawerID: '300003',
          nickname: '徐徐',
          withdrawPosition: '1000元挡位',
          withdrawType: '提现',
          withdrawAmount: '1000元',
          withdrawTime: '2024.05.25 10:00:00',
        },
        
        // Add more data objects here
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
      this.withdrawerID = '';
      this.withdrawType = '';
      this.withdrawPosition = '';
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
  },
};
</script>

<style scoped>
.expanded-row-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-left: 40px;  /* Add margin to the whole sub-row */
}

.row {
  display: contents;
}

.cell {
  padding: 8px;
  white-space: pre-line; /* Ensure text wraps in each cell */
}
</style>
