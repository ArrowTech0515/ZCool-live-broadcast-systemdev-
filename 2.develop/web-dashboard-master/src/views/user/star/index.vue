<template>
  <a-card style="background-color: white;">
    <!-- Inline Layout with Texts, Select, and Buttons -->
    <a-row align="middle" style="margin-bottom: 16px;">
      <!-- Centered Text elements and Select -->
      
      <!-- Buttons on the right -->
      <a-col :span="4">
        <a-form-item label="用户状态" :label-col="{ span: 24 }">
          <a-button 
          type="primary" 
          style="margin-right: 8px; color: #52c41a; background-color:rgb(227,249,233);">
            <CheckCircleFilled  style="color: #52c41a;"/> 正常</a-button>
        </a-form-item>
      </a-col>

      <a-col :span="4">
        <a-form-item label="游戏ID" :label-col="{ span: 24 }">
          <span class="custom-span">{{ gameId }}</span>
        </a-form-item>
      </a-col>

      <a-col :span="4">
        <a-form-item label="游戏昵称" :label-col="{ span: 24 }">
          <span class="custom-span">{{ nickname }}</span>
        </a-form-item>
      </a-col>

      <a-col :span="4">
        <a-form-item label="最近登录时间" :label-col="{ span: 24 }">
          <span class="custom-span">{{ lastLogintime }}</span>
        </a-form-item>
      </a-col>

      <a-col :span="4">
        <a-form-item label="最近登录IP" :label-col="{ span: 24 }">
          <span class="custom-span">{{ lastIP }}</span>
        </a-form-item>
      </a-col>

      <!-- Guage -->
      <a-col :span="4">
        <div class="gauge-container">
          <a-progress
            type="dashboard"
            :percent="gaugeValue"
            :gap-degree="30"
            :stroke-width="12"
            :width="200"
            :format="() => ''"
            stroke-color="#1890ff"
          />
          <div class="gauge-labels">
            <span v-for="n in 11" :key="n" class="gauge-number" :style="getLabelStyle(n)">
              {{ (n - 1) * 10 }}
            </span>
          </div>
          <div class="gauge-graduations">
            <span v-for="n in 101" :key="n" class="gauge-tick" :style="getTickStyle(n)"></span>
          </div>
          <div class="gauge-center-circle"></div>
          <div class="gauge-center-text">
            <div>综合评分</div>
            <div class="gauge-score">{{ gaugeValue }}分</div>
          </div>
          <div class="gauge-pointer" :style="pointerStyle"></div>
        </div>
      </a-col>

    </a-row>
   </a-card>
   <a-card style="background-color: white;">
    <!-- Table -->
    <a-table 
      :columns="columns" 
      :data-source="paginatedData"
      :expandable="{ expandedRowRender }"
      :pagination="false">
      
      <!-- Scoped Slot for Custom Column Rendering -->
      <template #bodyCell="{ column, text }">
        <!-- Render Multiline Text for '游戏ID' Column with Color Styling -->
        <span v-if="column.dataIndex === 'gameId'">
          <div v-for="(line, index) in text.split('\n')" :key="index">
            <span>{{ line.split(':')[0] }}:</span>
            <span :style="{ color: 'blue' }">{{ line.split(':')[1] }}</span>
          </div>
        </span>

        <!-- Render '状态' Column with Color Styling -->
        <span v-else-if="column.dataIndex === 'status'">
          <span :style="{ color: text === '已通过' ? 'blue' : text === '失败' ? 'red' : '' }">
            {{ text }}
          </span>
        </span>
        <span v-else-if="column.dataIndex === 'transfer'">
          <span :style="{ color: text === '已通过' ? 'blue' : text === '失败' ? 'red' : '' }">
            {{ text }}
          </span>
        </span>
        <!-- Default Rendering for Other Columns -->
        <span v-else>{{ text }}</span>
      </template>

      <!-- Expanded Row Render Template -->
      <template #expandedRowRender="{ record }">
        <div class="expanded-row-content">
          <div class="row">
            <div class="cell">支付渠道: {{ record.expandedData.channel }}</div>
            <div class="cell">实名: {{ record.expandedData.realName }}</div>
            <div class="cell">账号/卡号: {{ record.expandedData.accountNumber }}</div>
          </div>
          <div class="row">
            <div class="cell">手续费: {{ record.expandedData.fee }}</div>
            <div class="cell">实际到账金额: {{ record.expandedData.actualArrival }}</div>
            <div class="cell">转账订单号: {{ record.expandedData.transferOrder }}</div>
          </div>
          <div class="row">
            <div class="cell">拒绝理由: {{ record.expandedData.refuseReason }}</div>
            <div class="cell">请求银行信息: {{ record.expandedData.bankInfo }}</div>
            <div class="cell">用户显示结果: {{ record.expandedData.userDisplayResult }}</div>
          </div>
        </div>
      </template>
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
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      totalItems: 100, // total number of data items

      gameId: '18800001234',
      nickname: '爱玩比特币',
      lastLogintime: '2024-07-01 09:58:09',
      lastIP: '192.125.1.27',

      gaugeValue: 74,


      columns: [
        { title: '订单号', dataIndex: 'orderNumber', align: 'center' },
        { title: '发起时间', dataIndex: 'startTime', align: 'center' },
        { title: '到账时间', dataIndex: 'arrivalTime', align: 'center' },
        { title: '游戏ID', dataIndex: 'gameId', align: 'center' },
        { title: '用户昵称', dataIndex: 'userName', align: 'center' },
        { title: '提现金额', dataIndex: 'withdrawAmount', align: 'center' },
        { title: '实际到账', dataIndex: 'actualArrival', align: 'center' },
        { title: '通道', dataIndex: 'channel', align: 'center' },
        { title: '状态', dataIndex: 'status', align: 'center' },
        { title: '转账', dataIndex: 'transfer', align: 'center' },
        { title: '操作类型', dataIndex: 'operationType', align: 'center' },
      ],
      data: [
        {
          key: 1,
          orderNumber: 'CA88982520842',
          startTime: '07-10 17:08:40',
          arrivalTime: '07-10 17:52:40',
          gameId: 'APP: 3515409\n游戏: 7878797',
          userName: '比特币_09',
          withdrawAmount: 505,
          actualArrival: 501,
          channel: '银行卡-中国银行',
          status: '已通过',
          transfer: '失败',
          operationType: 'API/大额转账支付',
          expandedData: {
            channel: '银行卡-中国银行',
            realName: '张三',
            accountNumber: '6172898736510092',
            fee: 5,
            actualArrival: 501,
            transferOrder: '-',
            refuseReason: '-',
            bankInfo: '支付信息核实失败',
            userDisplayResult: '-',
          },
        },
        // Add more data as needed
      ],
    };
  },
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.data.slice(start, end);
    },
    // gauge
    pointerStyle() {
      const angle = (this.value / 100) * 240 - 120; // Map value to the angle
      return {
        transform: `rotate(${angle}deg)`,
      };
    },
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    },
    handleSizeChange(current, size) {
      this.pageSize = size;
      this.currentPage = 1; // Reset to the first page when page size changes
    },

    getLabelStyle(n) {
      const angle = (n - 1) * 24 - 120; // Map position to the angle
      const rad = (angle * Math.PI) / 180;
      const radius = 90; // Radius of the labels
      return {
        left: `${100 + radius * Math.cos(rad)}px`,
        top: `${100 + radius * Math.sin(rad)}px`,
      };
    },
    getTickStyle(n) {
      const angle = (n - 1) * 2.4 - 120; // Map position to the angle
      const rad = (angle * Math.PI) / 180;
      const outerRadius = 95; // Outer radius for tick end
      const innerRadius = outerRadius - (n % 10 === 1 ? 10 : 5); // Length varies for major/minor ticks

      return {
        left: `${100 + innerRadius * Math.cos(rad)}px`,
        top: `${100 + innerRadius * Math.sin(rad)}px`,
        width: `${outerRadius - innerRadius}px`,
        height: '2px', // Horizontal tick
        transform: `rotate(${angle}deg) translateX(-50%)`,
      };
    },
  },
};
</script>

<style scoped>
.expanded-row-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-left: 40px;
}

.row {
  display: contents;
}

.cell {
  padding: 8px;
  white-space: pre-line;
}

.custom-span {
  display: block;
  margin-top: 4px;
  font-size: 14px;
}


.gauge-container {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.gauge-labels {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.gauge-number {
  position: absolute;
  font-size: 12px;
  transform: translate(-50%, -50%);
}

.gauge-graduations {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.gauge-tick {
  position: absolute;
  background-color: #000;
  transform-origin: left center;
}

.gauge-center-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 14px;
  background-color: transparent; /* Make the background transparent */
  border: 2px solid #1890ff; /* Add a border to create a ring */
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.gauge-center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 16px;
  z-index: 2;
}

.gauge-score {
  font-size: 24px;
  font-weight: bold;
}

.gauge-pointer {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 50%;
  background-color: #1890ff;
  transform-origin: bottom center;
  transform: rotate(-120deg);
  z-index: 0;
}
</style>
