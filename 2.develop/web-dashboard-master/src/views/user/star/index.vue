<template>
  <a-card class="mb10">
    <!-- Inline Layout with Texts, Select, and Buttons -->
    <a-row align="middle" type="flex" >
      <!-- Centered Text elements and Select -->
      
      <!-- Buttons on the left -->
      <a-col :flex="auto" style="margin-left: 5%">
        <a-form-item label="用户状态" :label-col="{ span: 24 }">
          <a-button 
            type="primary" 
            style="color: rgb(0, 180, 42); background-color: rgba(0, 200, 0, 0.2);">
            <CheckCircleFilled  style="color: rgb(0, 180, 42);"/>正常</a-button>
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item label="游戏ID" :label-col="{ span: 24 }">
          <span class="custom-span">{{ gameId }}</span>
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item label="游戏昵称" :label-col="{ span: 24 }">
          <span class="custom-span">{{ nickname }}</span>
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item label="最近登录时间" :label-col="{ span: 24 }">
          <span class="custom-span">{{ lastLogintime }}</span>
        </a-form-item>
      </a-col>

      <a-col :flex="1">
        <a-form-item label="最近登录IP" :label-col="{ span: 24 }">
          <span class="custom-span">{{ lastIP }}</span>
        </a-form-item>
      </a-col>

      <!-- Gauge -->
      <a-col :span="3" style="margin-right: 2%; margin-bottom: 8px;">
        <Gauge :gaugeValue />
      </a-col>
    </a-row>

  </a-card>
  <a-card style="">
    <!-- Tables in one card -->
    <a-row type="flex">
      
      <div :span="2" class="report-container">
        <div class="flow-line" type="flex">
          <div class="circle">
            <CheckCircleFilled  style="color: rgb(0, 180, 42);"/>
          </div>
          <div class="dashed-line"></div>
          <div class="circle">
            <CheckCircleFilled  style="color: rgb(0, 180, 42);"/>
          </div>
          <div class="dashed-line"></div>
          <div >
            <CheckCircleFilled  style="color: rgb(0, 180, 42);"/>
          </div>
        </div>   
      </div>

      <a-col  :flex="1">
        <span style="color: transparent;">基本信息</span>

        <!-- First Table -->
        <a-table 
          :columns="columns" 
          :data-source="data"
          :rowClassName="rowClassName"
          :pagination="false"
          class="first-table" >
          
          <!-- Scoped Slot for Custom Column Rendering -->
          <template #bodyCell="{ column, text }">
            <span v-if="column.dataIndex === 'evaluation'">
              <span v-if="text === '-'" :style="{ color: 'grey' }">
                {{ text }}
              </span>
              <span v-else :style="{ color: text === '二级' || text === '一级' ? 'red' : text === '是' ? 'blue' : '' }">
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

        <span style="color: transparent;">概況信息</span>

        <!-- Second Table -->
        <a-table 
          :columns="secondColumns" 
          :data-source="secondData"
          :rowClassName="rowClassName"
          :pagination="false"
          class="second-table" >
          
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

        <span style="color: transparent;">星级扫描完成</span>

      </a-col>
    </a-row>
  </a-card>
</template>


<script setup lang="jsx">
import { CheckCircleFilled } from '@ant-design/icons-vue'

const gameId = ref('18800001234')
const nickname = ref('爱玩比特币')
const lastLogintime = ref('2024-07-01 09:58:09')
const lastIP = ref('192.125.1.27')

const gaugeValue = ref(22)

const columns = ref([
  { title: '', dataIndex: 'item', align: 'center', width: '300px' }, //扫描项
  { title: '评价', dataIndex: 'evaluation', align: 'center', width: '100px' },
  { title: '评分', dataIndex: 'score', align: 'center', width: '100px' },
  { title: '', dataIndex: 'description', align: 'left', width: '200px' }, //说明
])

const data = ref([
  { key: 1, item: '用户绑定的手机号注册多少账户', evaluation: '二级', score: -15, description: '同手机, 8' },
  { key: 2, item: '用户绑定的银行卡有多少账户', evaluation: '一级', score: -10, description: '6' },
  { key: 3, item: '绑定银行卡名称与波币实名一致', evaluation: '是', score: 0, description: '杜程龙x1' },
  { key: 4, item: '注册/登录，手机绑定，银行卡绑定的全渠道账号登录地区是否一致', evaluation: '是', score: 0, description: '是' },
  { key: 5, item: '绑定此手机号的其他账户被拉黑数量', evaluation: '-', score: 0, description: '1' },
  { key: 6, item: '绑定此银行卡的其他账户被拉黑数量', evaluation: '-', score: 0, description: '0' },
  { key: 7, item: '', evaluation: '', score: '', description: '' },
])

const secondColumns = ref([
  { title: '', dataIndex: 'item', align: 'center', width: '300px' },
  { title: '评价', dataIndex: 'evaluation', align: 'center', width: '100px' },
  { title: '评分', dataIndex: 'score', align: 'center', width: '100px' },
  { title: '', dataIndex: 'description', align: 'left', width: '200px' },
])

const secondData = ref([
  { key: 1, item: '累计消耗钻石', evaluation: '参考项', score: 0, description: '0' },
  { key: 2, item: '近7日游戏损益', evaluation: '', score: 0, description: '¥1399 2899999982' },
  { key: 3, item: '近7日总充值次数', evaluation: '参考项', score: 0, description: '172次1675500' },
  { key: 4, item: '近7日有效下注金额', evaluation: '参考项', score: 0, description: '¥4298032.4¥4298032.4' },
  { key: 5, item: '近7天提现次数', evaluation: '参考项', score: 0, description: '19次1483777' },
  { key: 6, item: '团队总人数', evaluation: '参考项', score: 0, description: '2' },
  { key: 7, item: '已注册天数', evaluation: '参考项', score: 0, description: '38天' },
  { key: 8, item: '领取活动次数', evaluation: '参考项', score: 0, description: '20次' },
])

function rowClassName(record, index) {
  return index % 2 === 0 ? 'even-row' : 'odd-row'
}
</script>

<style scoped>

/* Remove the bottom border of the last row */
.first-table :deep(.ant-table-tbody > tr:last-child > td) {
  border-bottom: none !important;  /* Remove the bottom border of the last row */
}

/* First Table Styling */
.first-table :deep(.ant-table-tbody > tr > td) {
  height: 12px; /* Specific row height for the first table */
  line-height: 12px;
}

/* Second Table Styling */
.second-table :deep(.ant-table-tbody > tr > td) {
  height: 10px; /* Different row height for the second table */
  line-height: 10px;
}
.first-table {
  margin-bottom: 30px;
}
/* Table Header Styling */
:deep(.ant-table-thead) > tr > th {
 /* background-color:rgb(227,249,233);  Light background for the header */
  text-align: center;
  height: 11px; /* Set a smaller fixed height for rows */
  line-height: 11px; /* Set line height equal to row height for vertical centering */
}

/* Remove Vertical Grid Lines */
:deep(.ant-table-thead) > tr > th, 
:deep(.ant-table-tbody > tr > td) {
  border-right: none !important; /* Remove right border to eliminate vertical grid lines */
  border-left: none !important; /* Remove right border to eliminate vertical grid lines */
}

/* Table Row Styling */
:deep(.ant-table-tbody > tr > td) {
  text-align: center; /* Center alignment */
  vertical-align: middle; /* Vertical alignment */
}

/* Red and Blue Text */
.ant-table-tbody > tr > td span[style*="red"] {
  color: red; /* Red text for specific conditions */
}

.ant-table-tbody > tr > td span[style*="blue"] {
  color: blue; /* Blue text for specific conditions */
}

/* Parent Container Layout */
.a-row {
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center; /* Center the content vertically */
  height: 100%; /* Ensure the parent takes up full height */
}

/* Ensure Table Autofits the Parent */
.ant-table-wrapper {
  width: 100%;
}

:deep(.ant-table) {
  width: 100%;
}

/* custom component Styles */

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
  border-left: 2px dashed rgb(0, 180, 42);
}

.custom-span {
  font-weight: bold;
}
</style>
