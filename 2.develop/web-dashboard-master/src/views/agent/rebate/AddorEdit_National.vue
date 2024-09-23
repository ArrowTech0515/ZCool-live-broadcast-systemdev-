<template>
  <a-card class="container-card">
    <a-row>
      <a-col class="column-center">
        <!-- Display Mode -->
        <div class="title">{{(!bCreate ? '编辑' : '新增') + modeDisplay}} </div>

        <a-form-item label="名称" :label-col="{ span: 4 }">
          <a-input v-model:value= "modeName" placeholder="请输入名称" style="width: 80%;" />
        </a-form-item>

        <span class="description-text">
          此代理模式下，结算方式为周结，每周一凌晨4点统计上一周返点并派发
        </span>

        <!-- Add New Performance Range Button -->
        <div style="margin-left: 24px; margin-bottom: 20px;">
          <a-button type="primary" @click="addRebateRange">新增业绩区间</a-button>
        </div>

        <!-- Updated Table: Rebate Plan Settings -->
        <div class="section">
          <a-table
            :columns="rebateColumns"
            :dataSource="rebateData"
            rowKey="id"
            :pagination="false"
            bordered
            :scroll="{ x: 'max-content' }"
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
import useAddNationalRule from './hooks/useAddNationalRule'

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

// Rebate Level Data aligned with the image structure
const rebateData = reactive([
  { id: 1, performanceRange: '1', effectivePeople: 1, lottery: '', sports: '', electronic: '', chess: '', fishing: '', vision: '', save: '', fixedFee: '', proportionalFee: '' },
  { id: 2, performanceRange: '10', effectivePeople: 2, lottery: '', sports: '', electronic: '', chess: '', fishing: '', vision: '', save: '', fixedFee: '', proportionalFee: '' },
  { id: 3, performanceRange: '100', effectivePeople: 4, lottery: '', sports: '', electronic: '', chess: '', fishing: '', vision: '', save: '', fixedFee: '', proportionalFee: '' },
  { id: 4, performanceRange: '1000', effectivePeople: 8, lottery: '', sports: '', electronic: '', chess: '', fishing: '', vision: '', save: '', fixedFee: '', proportionalFee: '' },
  { id: 5, performanceRange: '10000', effectivePeople: 16, lottery: '', sports: '', electronic: '', chess: '', fishing: '', vision: '', save: '', fixedFee: '', proportionalFee: '' },
])

const rebateColumns = [
  { title: '业绩区间', dataIndex: 'performanceRange', key: 'performanceRange',
  align: 'center',
   },
  { title: '有效人数', dataIndex: 'effectivePeople', key: 'effectivePeople',
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
  { title: '固定手续费', dataIndex: 'fixedFee', key: 'fixedFee', editable: true,
  align: 'center',
   },
  { title: '比例手续费', dataIndex: 'proportionalFee', key: 'proportionalFee', editable: true,
  align: 'center',
   },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    align: 'center',
    width: '80px',
    customRender: ({ index }) => {
      return (
        <a onClick={() => removeRebateRange(index)} style="text-decoration: underline; color: red; cursor: pointer;">
          删除
        </a>
      )
    },
  },
]

// Function to remove a rebate range row
const removeRebateRange = (index) => {

  // We have to add API function

  rebateData.splice(index, 1)
}

// Emit the 'emit_back' event on confirmation
const onConfirm = () => {
  emit('emit_back')
}

// Emit function for the cancel button
const emitBack = () => {
  emit('emit_back')
}


async function addRebateRange() {

  const fApi = ref(null)
  const formValue = ref({ // Initialize formValue with rowData if editing
    performanceRange: '',
    effectivePeople: '',
    lottery: '',
    sports: '',
    electronic: '',
    chess: '',
    fishing: '',
    vision: '',
    save: '',
    fixedFee: '',
    proportionalFee: '',
  })

  const formModalProps = {
   // request: data => merchantAddOrEditReq(isCreate ? null : merch_id, data),
    // getData(data) {
    //   return {
    //     ...data,
    //     // 如果是修改商户，body 里 merch_id 传 null，merch_id 放到 url path中。反之，创建用户，merch_id 放到 body 中
    //     //merch_id: isCreate ? data.merch_id : undefined,
    //   }
    // },
    // option: {
    //   global: {
    //     '*': {
    //       wrap: {
    //         labelCol: { span: 6 },
    //       },
    //     },
    //   },
    // },
    rule: useAddNationalRule(fApi),
  }
      
  createDialog({
    title: '新增业绩区间',
    width: 500,
    component:
      <ModalForm
        v-fApi:value={fApi.value}
        v-model={formValue.value}
        {...formModalProps}
      />
    ,
    onConfirm() {
        // pagination.page = 1
        // pagination.total = 0
        // props.resetSearch()
    },
  })
}

// defineExpose({
//   onAddorEdit,
// })
</script>

<style scoped>
.container-card {
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
  overflow-x: auto; /* Enable horizontal scrolling */
}

.description-text {
  color: grey;
  margin-bottom: 16px;
  text-align: center;
}

.button-group {
  text-align: center;
  margin-top: 20px;
}

.ant-form-item-label > label {
  font-weight: bold !important;
}
</style>

