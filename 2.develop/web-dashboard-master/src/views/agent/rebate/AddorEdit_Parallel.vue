<template>
  <a-card class="container-card">
    <a-row>
      <a-col class="column-center">
        <!-- Display Mode -->
        <div class="title">{{(!bCreate ? '编辑' : '新增') + modeDisplay}} </div>

        <a-form-item label="名称" :label-col="{ span: 4 }">
          <a-input v-model:value= "modeName" placeholder="请输入名称" style="width: 80%;" />
        </a-form-item>

        <div class="description-text">
          <span>平行代理下所有代理的彩票赔率都一样，根据下级的打码进行分成，最多影响5层，10分钟派发一次.</span>
        </div>

        <!-- Relation Level -->
        <a-form-item label="关系层数" :label-col="{ span: 4 }" :wrapper-col="{ span: 3 }">
          <a-select v-model:value="selectedRelationLevel" value="5">
            <a-select-option v-for="value in relationOptions" :key="value" :value="value">
              {{ value }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <!-- Updated Table: Rebate Plan Settings -->
        <div class="section">
          <a-table
            :columns="rebateColumns"
            :dataSource="rebateData"
            rowKey="id"
            :pagination="false"
            bordered
          />
        </div>

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
import { reactive, ref, computed, defineEmits, defineProps } from 'vue'

// Define the emit function
const emit = defineEmits(['emit_back']);
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

// Computed property to reactively display the mode value from ENUM
const modeDisplay = computed(() => ENUM.agent_rebate_mode[props.mode])
const modeName = computed(() => props.item !== null ? props.item.modeName : '')
const bCreate = computed(() => props.item === null)

// Rebate Level Data aligned with the image structure
const rebateData = reactive([
  { id: 1, plan: 'A', lottery: '', sports: '', electronic: '', chess: '', fishing: '', vision: '', save: '' },
  { id: 2, plan: 'B', lottery: '', sports: '', electronic: '', chess: '', fishing: '', vision: '', save: '' },
  { id: 3, plan: 'C', lottery: '', sports: '', electronic: '', chess: '', fishing: '', vision: '', save: '' },
  { id: 4, plan: 'D', lottery: '', sports: '', electronic: '', chess: '', fishing: '', vision: '', save: '' },
  { id: 5, plan: 'E', lottery: '', sports: '', electronic: '', chess: '', fishing: '', vision: '', save: '' },
])

const rebateColumns = [
  { title: '返点方案', dataIndex: 'plan', key: 'plan',
  align: 'center',
   },
  { title: '彩票', dataIndex: 'lottery', key: 'lottery', editable: true,
  align: 'center',
   },
  { title: '体育', dataIndex: 'sports', key: 'sports', editable: true,
  align: 'center',
   },
  { title: '电子', dataIndex: 'electronic', key: 'electronic', editable: true,
  align: 'center',
   },
  { title: '棋牌', dataIndex: 'chess', key: 'chess', editable: true,
  align: 'center',
   },
  { title: '捕鱼', dataIndex: 'fishing', key: 'fishing', editable: true,
  align: 'center',
   },
  { title: '视讯', dataIndex: 'vision', key: 'vision', editable: true,
  align: 'center',
   },
  { title: '存款', dataIndex: 'save', key: 'save', editable: true,
  align: 'center',
   },
]

// Select options for '关系层数' from 1 to 10
const relationOptions = Array.from({ length: 5 }, (_, index) => index + 1)
const selectedRelationLevel = ref(5) // Default selected value

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
.container-card {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.column-center {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.title {
  margin-bottom: 20px;
  font-size: large;
  font-weight: bold;
  text-align: center;
}

.section {
  margin-bottom: 24px;
}

.description-text {
  color: grey;
  margin-bottom: 16px;
}

.button-group {
  text-align: center;
  margin-top: 20px;
}

.ant-form-item-label > label {
  font-weight: bold !important;
}
</style>

