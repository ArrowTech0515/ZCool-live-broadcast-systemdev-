<template>
  <a-card style="background-color: white;">
    <!-- Inline Layout with Texts, Select, and Buttons -->
    <a-row align="middle" type="flex" style="margin-bottom: 16px;">
      <!-- Centered Text elements and Select -->
      
      <!-- Buttons on the left -->
      <a-col :flex="auto" style="margin-left: 5%">
        <a-form-item label="用户状态" :label-col="{ span: 24 }">
          <a-button 
            type="primary" 
            style="color: rgb(0, 180, 42); background-color:rgb(227,249,233); ">
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
      <a-col :span="3">
        <div class="gauge-container">
          <a-progress
            type="dashboard"
            :percent="gaugeValue"
            :gap-degree="70"
            :stroke-width="7"
            :format="() => ''"
            stroke-color="#1890ff"
          />
          <div class="gauge-labels">
            <span v-for="n in 11" :key="n" class="gauge-number" :style="getLabelStyle(n)">
              {{ (n - 1) * 10 }}
            </span>
          </div>
          <div class="gauge-graduations">
            <span v-for="n in 51" :key="n" class="gauge-tick" :style="getTickStyle((n - 1) * 2)"></span>
          </div>
          <!-- <div class="gauge-center-circle" :style="centerStyle"></div> -->
          <div class="gauge-center-text" :style="centerStyle">
            <div>综合评分</div>
            <div class="gauge-score">{{ gaugeValue }}分</div>
          </div>
          <div class="gauge-pointer_div">
            <span class="gauge-pointer_span" :style="pointerStyle"></span>
          </div>
        </div>
      </a-col>
    </a-row>

  </a-card>
  <a-card style="background-color: white;">
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
        <!-- <span>基本信息</span> -->

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

        <!-- <span>概況信息</span> -->

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

        <!-- <span>星级扫描完成</span> -->

      </a-col>
    </a-row>
  </a-card>
</template>


<script setup lang="jsx">
import { ref, computed } from 'vue';
import { CheckCircleFilled } from '@ant-design/icons-vue';

const gameId = ref('18800001234');
const nickname = ref('爱玩比特币');
const lastLogintime = ref('2024-07-01 09:58:09');
const lastIP = ref('192.125.1.27');

const gaugeValue = ref(74);
const center = ref('60%');

const columns = ref([
  { title: '扫描项', dataIndex: 'item', align: 'center' },
  { title: '评价', dataIndex: 'evaluation', align: 'center' },
  { title: '评分', dataIndex: 'score', align: 'center' },
  { title: '说明', dataIndex: 'description', align: 'center' },
]);

const data = ref([
  { key: 1, item: '用户绑定的手机号注册多少账户', evaluation: '二级', score: -15, description: '同手机, 8' },
  { key: 2, item: '用户绑定的银行卡有多少账户', evaluation: '一级', score: -10, description: '6' },
  { key: 3, item: '绑定银行卡名称与波币实名一致', evaluation: '是', score: 0, description: '杜程龙x1' },
  { key: 4, item: '注册/登录，手机绑定，银行卡绑定的全渠道账号登录地区是否一致', evaluation: '是', score: 0, description: '是' },
  { key: 5, item: '绑定此手机号的其他账户被拉黑数量', evaluation: '-', score: 0, description: '1' },
  { key: 6, item: '绑定此银行卡的其他账户被拉黑数量', evaluation: '-', score: 0, description: '0' },
  { key: 7, item: '', evaluation: '', score: '', description: '' },
]);

const secondColumns = ref([
  { title: '扫描项', dataIndex: 'item', align: 'center' },
  { title: '评价', dataIndex: 'evaluation', align: 'center' },
  { title: '评分', dataIndex: 'score', align: 'center' },
  { title: '说明', dataIndex: 'description', align: 'center' },
]);

const secondData = ref([
  { key: 1, item: '累计消耗钻石', evaluation: '参考项', score: 0, description: '0' },
  { key: 2, item: '近7日游戏损益', evaluation: '', score: 0, description: '¥1399 2899999982' },
  { key: 3, item: '近7日总充值次数', evaluation: '参考项', score: 0, description: '172次1675500' },
  { key: 4, item: '近7日有效下注金额', evaluation: '参考项', score: 0, description: '¥4298032.4' },
  { key: 5, item: '近7天提现次数', evaluation: '参考项', score: 0, description: '19次1483777' },
  { key: 6, item: '团队总人数', evaluation: '参考项', score: 0, description: '2' },
  { key: 7, item: '已注册天数', evaluation: '参考项', score: 0, description: '38天' },
  { key: 8, item: '领取活动次数', evaluation: '参考项', score: 0, description: '20次' },
]);

const centerStyle = computed(() => ({
  top: center.value,
  left: center.value,
  transform: 'translate(-50%, -50%)',
}));

const pointerStyle = computed(() => {
  const angle = gaugeValue.value * 270 / 100 - 135;
  return {
    transform: `rotate(${angle}deg)`,
    transformOrigin: 'bottom center',
    position: 'absolute',
    width: '3px',
    height: '45px',
    backgroundColor: '#1890ff',
    top: `calc(${center.value} - 45px)`,
    left: center.value,
  };
});

function getLabelStyle(n) {
  const angle = (n - 1) * 270 / 10 + 135;
  const rad = (angle * Math.PI) / 180;
  const radius = 40;
  return {
    left: `calc(${center.value} + ${radius * Math.cos(rad)}px)`,
    top: `calc(${center.value} + ${radius * Math.sin(rad)}px)`,
  };
}

function getTickStyle(n) {
  const angle = n * 270 / 100 + 135;
  const rad = (angle * Math.PI) / 180;
  const outerRadius = 50;
  const innerRadius = outerRadius - (n % 10 === 0 ? 2 : 1);
  
  return {
    left: `calc(${center.value} + ${innerRadius * Math.cos(rad)}px)`,
    top: `calc(${center.value} + ${innerRadius * Math.sin(rad)}px)`,
    width: `${outerRadius - innerRadius}px`,
    height: '1px',
    transform: `rotate(${angle}deg) translateX(-50%)`,
  };
}

function rowClassName(record, index) {
  return index % 2 === 0 ? 'even-row' : 'odd-row';
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
  background-color:rgb(227,249,233); /* Light background for the header */
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
/* Gauge Styles */
.gauge-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.progress-wrapper {
  width: 100px; /* Reduce the size of a-progress */
  height: 100px; /* Maintain aspect ratio */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  font-size: 6px;
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

.gauge-center-text {
  position: absolute;
  text-align: center;
  font-size: 10px;
  z-index: 2;
}

.gauge-score {
  font-size: 16px;
  font-weight: bold;
}

.gauge-pointer_div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
}

.gauge-pointer_span {
  position: absolute;
  transform-origin: bottom center;
  width: 2px;
  height: 45px;
  background-color: #1890ff;
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
  border-left: 2px dashed rgb(0, 180, 42);;
}
</style>
