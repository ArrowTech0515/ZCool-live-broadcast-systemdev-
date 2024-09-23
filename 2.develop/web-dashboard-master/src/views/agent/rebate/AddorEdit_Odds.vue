<template>
  <a-card style="min-height: 700px; padding: 20px; display: flex; justify-content: center; align-items: center;">
    <a-row>
      <a-col  style="display: flex; flex-direction: column; max-width: 900px; margin: 0 auto;">
        <!-- First line of text -->
        <div class="title">{{(!bCreate ? '编辑' : '新增') + modeDisplay}} </div>

        <a-form-item label="名称" :label-col="{ span: 4 }">
          <a-input v-model:value= "modeName" placeholder="请输入名称" style="width: 80%;" />
        </a-form-item>
        
        <span style="margin-left: 16px; color: grey;">- 上级代理获得返点 = 下级有效总投注 ÷ (代理返点 – 下级返点) × 100%</span>
        <span style="margin-left: 16px; margin-bottom: 16px; color: grey;">- 代理返点 = 最低赔率 ÷ 1.8 × (1.8 + 0.02 ÷ 当前返点)</span>
        
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
        <div style="margin-bottom: 24px;">
          <h3 style="margin-bottom: 10px; font-size: 16px; font-weight: bold;">返点等级设置</h3>
          <a-table
            :columns="rebateColumns"
            :dataSource="rebateData"
            rowKey="id"
            :pagination="false"
            bordered
            style="margin-bottom: 8px; margin-left: 16px;"
          />
          <a-button type="primary" style="margin-left: 32px;" @click="addRebateLevel">新增等级</a-button>
        </div>

        <!-- Second line of text -->
        <a-row style="margin-bottom: 24px;">
          <h3 style="margin-right: 16px; font-size: 16px; font-weight: bold;">适用游戏类型</h3>
          <div>
            <a-checkbox v-model:checked="gameTypes.lottery" style="margin-right: 8px;">彩票(默认)</a-checkbox>
            <a-checkbox v-model:checked="gameTypes.sports" style="margin-right: 8px;">体育</a-checkbox>
            <a-checkbox v-model:checked="gameTypes.live" style="margin-right: 8px;">真人</a-checkbox>
            <a-checkbox v-model:checked="gameTypes.electronic">电子游戏</a-checkbox>
          </div>
        </a-row>
        
        <!-- Second Table: Agent Tier Settings -->
        <div style="margin-bottom: 24px;">
          <h3 style="margin-bottom: 10px; font-size: 16px; font-weight: bold;">代理层级设置</h3>
          <a-table
            :columns="tierColumns"
            :dataSource="tierData"
            rowKey="id"
            :pagination="false"
            bordered
            style="margin-bottom: 8px; margin-left: 16px;"
          />
          <a-button type="primary" style="margin-left: 32px;" @click="addAgentTier">新增层级</a-button>
        </div>

        <!-- Settlement Period Radio Buttons -->
        <a-row style="margin-bottom: 10px;">
          <h3 style="margin-right: 16px; font-size: 16px; font-weight: bold;">结算周期</h3>
          <a-radio-group v-model:value="settlementPeriod">
            <a-radio value="monthly" style="margin-right: 20px;">每月</a-radio>
            <a-radio value="weekly">每周</a-radio>
          </a-radio-group>
        </a-row>

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
import useAddRebateLevelRule from './hooks/useAddRebateLevelRule'
import useAddAgentTierRule from './hooks/useAddAgentTierRule'

// Define the emit function
const emit = defineEmits(['emit_back'])

const props = defineProps({
  mode: {
    type: Number,
    default: 2,
  },
  item: {
    type: Object,
    default: () => ({}),
  },
})

const { createDialog } = useDialog()

// Computed property to reactively display the mode value from ENUM
const modeDisplay = computed(() => ENUM.agent_rebate_mode[props.mode])
const modeName = computed(() => props.item !== null ? props.item.modeName : '')
const bCreate = computed(() => props.item === null)

const baseSettings = reactive({
  lowestOdds: '',
  standardOdds: '',
  rebateInfluence: ''
})

// Rebate Level Data
const rebateData = reactive([
  { id: 1, level: 1, rebate: 3, odds: 1.2 }
])

const rebateColumns = [
  { title: '返点等级', dataIndex: 'level', key: 'level',
  align: 'center',
   },
  { title: '返点%', dataIndex: 'rebate', key: 'rebate',
  align: 'center',
   },
  { title: '对应赔率', dataIndex: 'odds', key: 'odds',
  align: 'center',
   },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    customRender: ({ index }) => {
      return (
        <a onClick={() => removeRebateLevel(index)} style="text-decoration: underline; color: red; cursor: pointer;">
          删除
        </a>
      )
    }
  }
]

async function addRebateLevel() {
  //rebateData.push({ id: rebateData.length + 1, level: rebateData.length + 1, rebate: '', odds: '' })

  const fApi = ref(null)
  const formValue = ref({ // Initialize formValue with rowData if editing
    level: '',
    rebate: '',
    odds: '',
  })

  const formModalProps = {
    // request: data => merchantAddOrEditReq(isCreate ? null : merch_id, data),
    // getData(data) {
    //   return {
    //     ...data,
    //     // 如果是修改商户，body 里 merch_id 传 null，merch_id 放到 url path中。反之，创建用户，merch_id 放到 body 中
    //     merch_id: isCreate ? data.merch_id : undefined,
    //   }
    // },
    rule: useAddRebateLevelRule(fApi),
  }
      
  createDialog({
    title: '新增等级',
    width: 500,
    component:
      <ModalForm
        v-fApi:value={fApi.value}
        v-model={formValue.value}
        {...formModalProps}
      />
    ,
    onConfirm() {
      // if (isCreate) {
      //   pagination.page = 1
      //   pagination.total = 0
      //   props.resetSearch()
      // } else {
      //   refresh()
      // }
    },
  })
}

const removeRebateLevel = (index) => {

  // We have to add API function
  rebateData.splice(index, 1)
}

// Agent Tier Data
const tierData = reactive([
  { id: 1, level: 1, name: '第一层代理', rebate: 0.1 },
  { id: 2, level: 2, name: '第二层代理', rebate: 0.05 }
])

const tierColumns = [
  { title: '层级', dataIndex: 'level', key: 'level',
  align: 'center',
   },
  { title: '层级名称', dataIndex: 'name', key: 'name',
  align: 'center',
   },
  { title: '默认返点%', dataIndex: 'rebate', key: 'rebate',
  align: 'center',
   },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    customRender: ({ index }) => {
      return (
        <a onClick={() => removeTierLevel(index)} style="text-decoration: underline; color: red; cursor: pointer;">
          删除
        </a>
      )
    }
  }
]

async function addAgentTier() {
//  tierData.push({ id: tierData.length + 1, level: tierData.length + 1, name: '', rebate: '' })

  const fApi = ref(null)
  const formValue = ref({ // Initialize formValue with rowData if editing
    level: '',
    name: '',
    rebate: '',
  })

  const formModalProps = {
    // request: data => merchantAddOrEditReq(isCreate ? null : merch_id, data),
    // getData(data) {
    //   return {
    //     ...data,
    //     // 如果是修改商户，body 里 merch_id 传 null，merch_id 放到 url path中。反之，创建用户，merch_id 放到 body 中
    //     merch_id: isCreate ? data.merch_id : undefined,
    //   }
    // },
    rule: useAddAgentTierRule(fApi),
  }
      
  createDialog({
    title: '新增等级',
    width: 500,
    component:
      <ModalForm
        v-fApi:value={fApi.value}
        v-model={formValue.value}
        {...formModalProps}
      />
    ,
    onConfirm() {
      // if (isCreate) {
      //   pagination.page = 1
      //   pagination.total = 0
      //   props.resetSearch()
      // } else {
      //   refresh()
      // }
    },
  })
}


const removeTierLevel = (index) => {
  tierData.splice(index, 1)
}

// Game Types Checkboxes
const gameTypes = reactive({
  lottery: true,
  sports: false,
  live: false,
  electronic: false,
})

// Settlement Period Radios
const settlementPeriod = ref('monthly')

// Emit the 'emit_back' event on confirmation
const onConfirm = () => {
  emit('emit_back')
}

// Emit function for the cancel button
const emitBack = () => {
  emit('emit_back')
}
</script>

<style scoped>
a-card {
  max-width: 800px;
  margin: 0 auto;
}
.ant-form-item-label > label {
  font-weight: bold;
}

.title {
  margin-bottom: 20px;
  font-size: large;
  font-weight: bold;
  text-align: center;
}
</style>
