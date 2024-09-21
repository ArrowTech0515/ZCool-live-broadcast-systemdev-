<template>
  <a-card style="min-height: 700px; padding: 20px; display: flex; justify-content: center; align-items: center;">
    <a-row>
      <a-col  style="display: flex; flex-direction: column; max-width: 800px; margin: 0 auto;">
        <!-- First line of text -->
        <a-form-item label="名称" :label-col="{ span: 4 }">
          <a-input v-model="name" placeholder="请输入名称" style="width: 300px; " />
        </a-form-item>
        
        <span style="margin-left: 16px;">- 上级代理获得返点 = 下级有效总投注 ÷ (代理返点 – 下级返点) × 100%</span>
        <span style="margin-left: 16px; margin-bottom: 16px;">- 代理返点 = 最低赔率 ÷ 1.8 × (1.8 + 0.02 ÷ 当前返点)</span>
        
        <!-- Base Settings Section -->
        <a-col style="margin-bottom: 10px; display: flex; flex-direction: column;">
          <span style="margin-bottom: 10px; font-size: 16px; font-weight: bold;">基础设置</span>
          <a-form-item label="最低赔率" :label-col="{ span: 6 }">
            <a-input v-model="baseSettings.lowestOdds" placeholder="请输入最低赔率" style="width: 300px; " />
          </a-form-item>
          <a-form-item label="基准赔率" :label-col="{ span: 6 }">
            <a-input v-model="baseSettings.standardOdds" placeholder="请输入基准赔率" style="width: 300px; " />
          </a-form-item>
          <a-form-item label="返点影响系数" :label-col="{ span: 6 }">
            <a-input v-model="baseSettings.rebateInfluence" placeholder="请输入返点影响系数" style="width: 300px;" />
          </a-form-item>
        </a-col>
        
        <!-- First Table: Rebate Level Settings -->
        <div style="margin-bottom: 10px;">
          <h3 style="margin-bottom: 16px; font-size: 16px; font-weight: bold;">返点等级设置</h3>
          <a-table
            :columns="rebateColumns"
            :dataSource="rebateData"
            rowKey="id"
            :pagination="false"
            bordered
            style="margin-bottom: 10px;"
          />
          <a-button type="primary" @click="addRebateLevel">新增等级</a-button>
        </div>

        <!-- Second line of text -->
        <a-form-item label="适用游戏类型" :label-col="{ span: 6 }" style="margin-bottom: 10px;">
          <div>
            <a-checkbox v-model:checked="gameTypes.lottery" style="margin-right: 8px;">彩票(默认)</a-checkbox>
            <a-checkbox v-model:checked="gameTypes.sports" style="margin-right: 8px;">体育</a-checkbox>
            <a-checkbox v-model:checked="gameTypes.live" style="margin-right: 8px;">真人</a-checkbox>
            <a-checkbox v-model:checked="gameTypes.electronic">电子游戏</a-checkbox>
          </div>
        </a-form-item>
        
        <!-- Second Table: Agent Tier Settings -->
        <div style="margin-bottom: 10px;">
          <h3 style="margin-bottom: 16px; font-size: 16px; font-weight: bold;">代理层级设置</h3>
          <a-table
            :columns="tierColumns"
            :dataSource="tierData"
            rowKey="id"
            :pagination="false"
            bordered
            style="margin-bottom: 16px;"
          />
          <a-button type="primary" @click="addAgentTier">新增层级</a-button>
        </div>

        <!-- Settlement Period Radio Buttons -->
        <a-form-item label="结算周期" :label-col="{ span: 6 }" style="margin-bottom: 10px;">
          <a-radio-group v-model:value="settlementPeriod">
            <a-radio value="monthly" style="margin-right: 8px;">每月</a-radio>
            <a-radio value="weekly">每周</a-radio>
          </a-radio-group>
        </a-form-item>

        <!-- Save Buttons -->
        <div style="text-align: center; margin-top: 20px;">
          <a-button type="default" style="margin-right: 16px;" @click="emitBack">取消</a-button>
          <a-button type="primary" @click="onConfirm">确定</a-button>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="jsx" setup>
import { reactive, ref, defineEmits } from 'vue';

// Define the emit function
const emit = defineEmits(['emit_back']);

const name = ref('');

const baseSettings = reactive({
  lowestOdds: '',
  standardOdds: '',
  rebateInfluence: ''
});

// Rebate Level Data
const rebateData = reactive([
  { id: 1, level: 1, rebate: 3, odds: 1.2 }
]);

const rebateColumns = [
  { title: '返点等级', dataIndex: 'level', key: 'level' },
  { title: '返点%', dataIndex: 'rebate', key: 'rebate' },
  { title: '对应赔率', dataIndex: 'odds', key: 'odds' },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    customRender: ({ index }) => {
      return (
        <a onClick={() => removeRebateLevel(index)} style="color: red; cursor: pointer;">
          删除
        </a>
      );
    }
  }
];

const addRebateLevel = () => {
  rebateData.push({ id: rebateData.length + 1, level: rebateData.length + 1, rebate: '', odds: '' });
};

const removeRebateLevel = (index) => {
  rebateData.splice(index, 1);
};

// Agent Tier Data
const tierData = reactive([
  { id: 1, level: 1, name: '第一层代理', rebate: 0.1 },
  { id: 2, level: 2, name: '第二层代理', rebate: 0.05 }
]);

const tierColumns = [
  { title: '层级', dataIndex: 'level', key: 'level' },
  { title: '层级名称', dataIndex: 'name', key: 'name' },
  { title: '默认返点%', dataIndex: 'rebate', key: 'rebate' },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    customRender: ({ index }) => {
      return (
        <a onClick={() => removeTierLevel(index)} style="color: red; cursor: pointer;">
          删除
        </a>
      );
    }
  }
];

const addAgentTier = () => {
  tierData.push({ id: tierData.length + 1, level: tierData.length + 1, name: '', rebate: '' });
};

const removeTierLevel = (index) => {
  tierData.splice(index, 1);
};

// Game Types Checkboxes
const gameTypes = reactive({
  lottery: true,
  sports: false,
  live: false,
  electronic: false,
});

// Settlement Period Radios
const settlementPeriod = ref('monthly');

// Emit the 'emit_back' event on confirmation
const onConfirm = () => {
  emit('emit_back');
};

// Emit function for the cancel button
const emitBack = () => {
  emit('emit_back');
};
</script>

<style scoped>
a-card {
  max-width: 800px;
  margin: 0 auto;
}
</style>
