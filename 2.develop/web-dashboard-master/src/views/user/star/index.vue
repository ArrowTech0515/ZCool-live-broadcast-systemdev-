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

      <!-- Gauge -->
      <a-col :span="4">
        
      </a-col>
    </a-row>

  </a-card>
  <a-card style="background-color: white;">
    <!-- Tables in one card -->
    <a-row>
      
      <div class="report-container">
        <div class="flow-line">
          <div class="circle">
            <CheckCircleFilled  style="color: #52c41a;"/>
          </div>
          <div class="dashed-line"></div>
          <div class="circle">
            <CheckCircleFilled  style="color: #52c41a;"/>
          </div>
          <div class="dashed-line"></div>
          <div >
            <CheckCircleFilled  style="color: #52c41a;"/>
          </div>
        </div>   
      </div>
      
      <a-col>
        <!-- First Table -->
        <a-table 
          :columns="columns" 
          :data-source="data"
          :rowClassName="rowClassName"
          bordered>
          
          <!-- Scoped Slot for Custom Column Rendering -->
          <template #bodyCell="{ column, text }">
            <span v-if="column.dataIndex === 'evaluation'">
              <span :style="{ color: text === '二级' || text === '一级' ? 'red' : text === '是' ? 'blue' : '' }">
                {{ text }}
              </span>
            </span>
            <span v-else-if="column.dataIndex === 'score'">
              <span :style="{ color: text < 0 ? 'red' : text === 0 ? 'blue' : '' }">
                {{ text }}
              </span>
            </span>
            <span v-else>{{ text }}</span>
          </template>
        </a-table>

        <!-- Second Table -->
        <a-table 
          :columns="secondColumns" 
          :data-source="secondData"
          :rowClassName="rowClassName"
          bordered style="margin-top: 24px;">
          
          <!-- Scoped Slot for Custom Column Rendering -->
          <template #bodyCell="{ column, text }">
            <span v-if="column.dataIndex === 'evaluation'">
              <span :style="{ color: text === '参考项' ? 'blue' : '' }">
                {{ text }}
              </span>
            </span>
            <span v-else-if="column.dataIndex === 'score'">
              <span :style="{ color: text === 0 ? 'blue' : '' }">
                {{ text }}
              </span>
            </span>
            <span v-else>{{ text }}</span>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
export default {
  name: 'SummaryReport',

  data() {
    return {
      gameId: '18800001234',
      nickname: '爱玩比特币',
      lastLogintime: '2024-07-01 09:58:09',
      lastIP: '192.125.1.27',

      gaugeValue: 74,

      columns: [
        { title: '扫描项', dataIndex: 'item', align: 'center' },
        { title: '评价', dataIndex: 'evaluation', align: 'center' },
        { title: '评分', dataIndex: 'score', align: 'center' },
        { title: '说明', dataIndex: 'description', align: 'center' },
      ],
      data: [
        { key: 1, item: '用户绑定的手机号注册多少账户', evaluation: '二级', score: -15, description: '同手机, 8' },
        { key: 2, item: '用户绑定的银行卡有多少账户', evaluation: '一级', score: -10, description: '6' },
        { key: 3, item: '绑定银行卡名称与波币实名一致', evaluation: '是', score: 0, description: '杜程龙x1' },
        { key: 4, item: '注册/登录，手机绑定，银行卡绑定的全渠道账号登录地区是否一致', evaluation: '是', score: 0, description: '是' },
        { key: 5, item: '绑定此手机号的其他账户被拉黑数量', evaluation: '-', score: 0, description: '1' },
        { key: 6, item: '绑定此银行卡的其他账户被拉黑数量', evaluation: '-', score: 0, description: '0' },
        // Additional rows...
      ],

      secondColumns: [
        { title: '扫描项', dataIndex: 'item', align: 'center' },
        { title: '评价', dataIndex: 'evaluation', align: 'center' },
        { title: '评分', dataIndex: 'score', align: 'center' },
        { title: '说明', dataIndex: 'description', align: 'center' },
      ],
      secondData: [
        { key: 1, item: '累计消耗钻石', evaluation: '参考项', score: 0, description: '0' },
        { key: 2, item: '近7日游戏损益', evaluation: '参考项', score: 0, description: '¥1399 2899999982' },
        { key: 3, item: '近7日总充值次数', evaluation: '参考项', score: 0, description: '172次1675500' },
        { key: 4, item: '近7日有效下注金额', evaluation: '参考项', score: 0, description: '¥4298032.4¥4298032.4' },
        { key: 5, item: '近7天提现次数', evaluation: '参考项', score: 0, description: '19次1483777' },
        { key: 6, item: '团队总人数', evaluation: '参考项', score: 0, description: '2' },
        { key: 7, item: '已注册天数', evaluation: '参考项', score: 0, description: '38天' },
        { key: 8, item: '领取活动次数', evaluation: '参考项', score: 0, description: '20次' },
        // Additional rows...
      ],
    };
  },
  computed: {
    // gauge
    
  },
  methods: {

    rowClassName(record, index) {
      return index % 2 === 0 ? 'even-row' : 'odd-row'; // Alternating row colors
    },
  },
};
</script>

<style scoped>
/* Table Header Styling */
:deep(.ant-table-thead) > tr > th {
  background-color: rgb(227,249,233); /* Light background for the header */
  text-align: center;
}
/* Remove Vertical Grid Lines */
:deep( .ant-table-tbody) > tr > td,
:deep( .ant-table-thead) > tr > th {
  border-right: none !important; /* Remove right border to eliminate vertical grid lines */
}

/* Table Row Styling */
.ant-table-tbody > tr > td {
  text-align: center; /* Center alignment */
  padding: 8px; /* Padding for cells */
  vertical-align: middle; /* Vertical alignment */
}

.ant-table-tbody > tr:nth-child(odd) > td {
  background-color: #fafafa; /* Light background for alternating rows */
}

/* Red and Blue Text */
.ant-table-tbody > tr > td span[style*="red"] {
  color: red; /* Red text for specific conditions */
}

.ant-table-tbody > tr > td span[style*="blue"] {
  color: blue; /* Blue text for specific conditions */
}

/* Row Alternating Background Colors */
.even-row {
  background-color: #f9f9f9; /* Light gray background for even rows */
}

.odd-row {
  background-color: #ffffff; /* White background for odd rows */
}

/* Gauge Styles */

.report-container {
  display: flex;
}

.flow-line {
  position: relative;
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
}

.dashed-line {
  width: 2px;
  background-color: transparent;
  height: 100%;
  border-left: 2px dashed #52c41a;
}
</style>
