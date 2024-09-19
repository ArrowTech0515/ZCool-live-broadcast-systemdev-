<template>
  <a-card style=" margin-bottom: 1%;">
    <a-row :gutter="16" type="flex">
      <!-- First Column -->
      <a-col :flex="1">
        <a-form-item label="商户">
          <a-select v-model:value="merchant_id" placeholder="请选择商户">
            <!-- options here -->
          </a-select>
        </a-form-item>

        <a-form-item label="渠道">
          <a-input v-model:value="channel" placeholder="请输入渠道" />
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item label="游戏名">
          <a-input v-model:value="game_name" placeholder="请输入游戏名" />
        </a-form-item>

        <a-form-item label="状态">
          <a-select v-model:value="status" placeholder="请选择状态">
            <!-- options here -->
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :flex="auto">
        <a-form-item label="时间">
          <a-range-picker v-model:value="time" :placeholder="['开始日期', '结束日期']" />
        </a-form-item>
      </a-col>
      
      <!-- Separator -->
      <a-col>
        <a-divider type="vertical" :style="{ height: '80%', margin: 'auto 0' }" />
      </a-col>

      <!-- Second Column -->
      <a-col :span="2">
        <a-form-item>
          <a-button type="primary" block @click="onSearch">
            <SearchOutlined /> 查询
          </a-button>
        </a-form-item>

        <a-form-item>
          <a-button block @click="onReset">
            <ReloadOutlined /> 重置
          </a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-card>

  <!-- Table setup -->
  <a-table :data-source="paginatedData" :pagination="false">
    <a-table-column title="游戏平台" dataIndex="game_platform" key="game_platform" align="center" />
    <a-table-column title="游戏名称" dataIndex="game_name" key="game_name" align="center" />
    <a-table-column title="注单量" dataIndex="bet_quantity" key="bet_quantity" align="center" />
    <a-table-column title="投注额" dataIndex="bet_amount" key="bet_amount" align="center" />
    <a-table-column title="有效投注额" dataIndex="effective_bet_amount" key="effective_bet_amount" align="center" />
    <a-table-column title="游戏损益" dataIndex="game_profit_loss" key="game_profit_loss" align="center" />
    <a-table-column title="杀率" dataIndex="kill_rate" key="kill_rate" align="center" />
    <a-table-column title="主播分红" dataIndex="anchor_dividend" key="anchor_dividend" align="center" />
    <a-table-column title="费率" dataIndex="rate" key="rate" align="center" />
  </a-table>

  <!-- Pagination -->
  <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 16px;">
    <span style="margin-right: 8px;">共 {{ totalItems }}条</span>
    <a-pagination
      v-model:current="currentPage"
      :total="totalItems"
      :page-size="pageSize"
      show-size-changer
      :page-size-options="['5', '10', '20', '50', '100']"
      size="small"
      @change="handlePageChange"
      @show-size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue';

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      totalItems: 100,

      merchant_id: null,
      channel: '',
      game_name: '',
      status: null,
      time: [],

      dataSource: [
        {
          key: '1',
          game_platform: '棋牌',
          game_name: '21',
          bet_quantity: '100',
          bet_amount: '500',
          effective_bet_amount: '450',
          game_profit_loss: '50',
          kill_rate: '5%',
          anchor_dividend: '10%',
          rate: '2%',
        },
        {
          key: '1',
          game_platform: '棋牌',
          game_name: '21',
          bet_quantity: '100',
          bet_amount: '500',
          effective_bet_amount: '450',
          game_profit_loss: '50',
          kill_rate: '5%',
          anchor_dividend: '10%',
          rate: '2%',
        },
        {
          key: '1',
          game_platform: '棋牌',
          game_name: '21',
          bet_quantity: '100',
          bet_amount: '500',
          effective_bet_amount: '450',
          game_profit_loss: '50',
          kill_rate: '5%',
          anchor_dividend: '10%',
          rate: '2%',
        },
        {
          key: '1',
          game_platform: '棋牌',
          game_name: '21',
          bet_quantity: '100',
          bet_amount: '500',
          effective_bet_amount: '450',
          game_profit_loss: '50',
          kill_rate: '5%',
          anchor_dividend: '10%',
          rate: '2%',
        },
        {
          key: '1',
          game_platform: '棋牌',
          game_name: '21',
          bet_quantity: '100',
          bet_amount: '500',
          effective_bet_amount: '450',
          game_profit_loss: '50',
          kill_rate: '5%',
          anchor_dividend: '10%',
          rate: '2%',
        },
        {
          key: '1',
          game_platform: '棋牌',
          game_name: '21',
          bet_quantity: '100',
          bet_amount: '500',
          effective_bet_amount: '450',
          game_profit_loss: '50',
          kill_rate: '5%',
          anchor_dividend: '10%',
          rate: '2%',
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
      // Implement search logic here
    },
    onReset() {
      this.merchant_id = null;
      this.channel = '';
      this.game_name = '';
      this.status = null;
      this.time = [];
      // Implement reset logic here
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    handleSizeChange(current, size) {
      this.pageSize = size;
      this.currentPage = 1; // Reset to the first page when page size changes
    },
  },
  components: {
    SearchOutlined,
    ReloadOutlined,
  }
};
</script>

<style scoped>
/* Your custom styles here */
</style>
