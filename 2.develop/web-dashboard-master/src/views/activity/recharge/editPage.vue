<template>
  <a-card>
    <template #title>
      <div class="card-header">
        <a-button
          type="link"
          class="back-button"
          @click="handleBack"
        >
          <span class="back-icon">&lt;</span>
        </a-button>
        <div class="card-title">
          <span>充值活动</span>
        </div>
      </div>
    </template>

    <div class="card-content">
      <a-col layout="vertical" class="content-col">

        <div class="form-item">
          <div class="label">活动图标</div>
          <a-col :span="18">
            <a-upload
              name="banner"
              :max-count="1"
              list-type="picture-card"
              accept="image/png,image/jpeg,image/jpg"
              :action="uploadUrl"
              :headers="uploadHeaders"
              :data="uploadData"
              :before-upload="beforeUpload"
              @change="handleChangeBanner"
              @success="handleSuccessBanner"
              :show-upload-list="true"
            >
              <div class="upload-box">
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                  <PlusCircleOutlined />
                  <div class="upload-text">上传</div>
                </div>
              </div>
            </a-upload>
          </a-col>
        </div>

        <div class="form-item">
          <div class="label">活动封面</div>
          <a-col :span="18">
            <a-upload
              name="banner"
              :max-count="1"
              list-type="picture-card"
              accept="image/png,image/jpeg,image/jpg"
              :action="uploadUrl"
              :headers="uploadHeaders"
              :data="uploadData"
              :before-upload="beforeUpload"
              @change="handleChangeBanner"
              @success="handleSuccessBanner"
              :show-upload-list="true"
            >
              <div class="upload-box-large">
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                <div v-else>
                  <PlusCircleOutlined />
                  <div class="upload-text">上传</div>
                </div>
              </div>
            </a-upload>
          </a-col>
        </div>

        <div class="form-item">
          <div class="label">活动名称</div>
          <div class="input-container">
            <a-input 
              placeholder="请输入活动名称" 
              v-model:value="formData.activityName"
              class="input"
            />
            <div class="hint-text">用户不可见，仅后台用户可见</div>
          </div>
        </div>

        <div class="form-item">
          <div class="label">活动内容</div>
          <a-col type="flex" class="content-container">
            <a-row class="radio-row">
              <a-col>
                <a-radio-group v-model:value="radioContent">
                  <a-radio :value="1">跳转地址</a-radio>
                  <a-radio :value="2">富文本</a-radio>
                </a-radio-group>
              </a-col>
            </a-row>
            <a-row v-if="radioContent === 1">
              <div class="input-address">
                <a-input 
                  placeholder="请输入活动地址"
                  v-model:value="formData.activityContent"
                  style="text-align: center;"
                />
              </div>
              <a-button :flex="auto" type="default" class="link-button" @click="onContentConfig">链接设置</a-button>
            </a-row>
            <!-- For Rich Editor -->
            <a-form-item v-else>
              <!-- Ensure RichEditor takes the full width -->
              <RichEditor v-model="formData.activityContent" class="rich-editor"/>
            </a-form-item>
          </a-col>
        </div>

        <div class="form-item">
          <div class="label">活动类型</div>
          <div class="input-container">
            <a-input 
              placeholder="请输入活动类型" 
              v-model:value="formData.activityType"
              class="input"
            />
            <div class="hint-text">用户不可见，仅后台用户可见</div>
          </div>
        </div>

        <div class="form-item">
          <div class="label">展示位置</div>
          <div class="checkbox-container">
            <div class="hint-text">用户不可见，仅后台用户可见</div>
            <a-space style="flex-grow: 1;">
              <a-checkbox value="All" @change="handleAllusers">首页右下角</a-checkbox>
              <a-checkbox value="Noble" @change="handleNobleusers">直播间右下角</a-checkbox>
              <a-checkbox value="Recharge" @change="handleRechargeusers">个人中心右下角</a-checkbox>
            </a-space>
          </div>
        </div>

        <div class="form-item">
          <div class="label">活动时间</div>
          <div style="display: flex; width: 100%;">
            <a-range-picker 
              style="flex: auto;"
              :placeholder="['开始日期', '结束日期']"
              v-model:range="formData.activityTime"
              :disabled="isPermanent" 
            />
            <a-switch
              v-model:checked="isPermanent"
              checked-children="永久"
              un-checked-children="时间范围"
              style="margin-left: 20px;"
            />
          </div>
        </div>

        <div class="form-item">
          <div class="label">充值赠送</div>
          <div :flex="auto" class="custom-spin-container">
            <a-button @click="addCustomSpin" class="add-button">
              添加赠送内容
            </a-button>
            <div class="custom-spin-list">
              <div 
                v-for="(spinPair, rowIndex) in groupedCustomSpins" :key="rowIndex"
                class="spin-pair-row"
              >
                <a-card class="spin-card">
                  <a-row class="spin-row">
                    <a-col class="spin-col">
                      <CustomSpin v-model:nValue="spin_value1" class="spin-input"></CustomSpin>
                      <span class="spin-label">充值金额</span>
                    </a-col>
                    <a-col class="spin-col">
                      <CustomSpin v-model:nValue="spin_value2" class="spin-input"></CustomSpin>
                      <span class="spin-label">赠送金额</span>
                    </a-col>
                    <a-button 
                      type="link" 
                      @click="removeCustomSpin(rowIndex * 2)"
                      class="remove-button"
                    ><MinusCircleOutlined/></a-button>
                  </a-row>
                </a-card>
                <a-card v-if="spinPair.length > 1" class="spin-card">
                  <a-row class="spin-row">
                    <a-col class="spin-col">
                      <CustomSpin v-model:nValue="spin_value1" class="spin-input"></CustomSpin>
                      <span class="spin-label">充值金额</span>
                    </a-col>
                    <a-col class="spin-col">
                      <CustomSpin v-model:nValue="spin_value2" class="spin-input"></CustomSpin>
                      <span class="spin-label">赠送金额</span>
                    </a-col>
                    <a-button 
                      type="link" 
                      @click="removeCustomSpin(rowIndex * 2 + 1)"
                      class="remove-button"
                    ><MinusCircleOutlined/></a-button>
                  </a-row>
                </a-card>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-item">
          <div class="label">活动门槛</div>
          <div class="input-container">
            <a-radio-group v-model:value="radioThreshold">
              <a-radio value="radio1">无门槛</a-radio>
              <a-radio value="radio2">有门槛</a-radio>
            </a-radio-group>
          </div>
        </div>

        <!-- First Table: Rebate Level Settings -->
        <div style="margin-bottom: 24px;">
          <div class="label">赠送门槛及内容</div>
          <a-card style="margin-bottom: 1%;">
            <a-row class="mb10" justify="space-between">
              <h3 style="margin-bottom: 10px; font-size: 14px; font-weight: bold;">
                消费钻石赠送
              </h3>
              <a-button type="default" style="margin-left: 32px;" @click="addTableData">
                添加
              </a-button>
            </a-row>
            <a-table
              class="no-padding-table "
              :columns="tableColumn"
              :dataSource="tableData"
              rowKey="id"
              :pagination="false"
            />
          </a-card>

          <a-card>
            <a-row class="mb10" justify="space-between">
              <h3 style="margin-bottom: 10px; font-size: 14px; font-weight: bold;">
                余额充值赠送
              </h3>
              <a-button type="default" style="margin-left: 32px;" @click="addTableData2">
                添加
              </a-button>
            </a-row>
            <a-table
              class="no-padding-table "
              :columns="tableColumn2"
              :dataSource="tableData2"
              rowKey="id"
              :pagination="false"
            />
          </a-card>
        </div>

        <div class="form-item">
          <div class="label">赠送规则</div>
          <div class="input-container">
            <a-radio-group v-model:value="radioGiftRule">
              <a-radio value="radio1">首次充值有效</a-radio>
              <a-radio value="radio2">多次充值有效</a-radio>
            </a-radio-group>
          </div>
        </div>

        <div class="form-item">
          <div class="label">参与用户</div>
          <div class="input-container">
            <a-radio-group v-model:value="radioValue2">
              <a-radio value="radio1">全部用户</a-radio>
              <a-radio value="radio2">贵族用户</a-radio>
              <a-radio value="radio3">注册用户</a-radio>
              <a-radio value="radio4">贵族用户</a-radio>
              <a-radio value="radio5">自定义用户</a-radio>
            </a-radio-group>
            <a-button type="primary" ghost class="select-user-button">+ 选择用户</a-button>
          </div>
        </div>

        <div class="form-item">
          <div class="label">审核机制</div>
          <div class="checkbox-container">
            <a-space style="flex-grow: 1;">
              <a-checkbox value="All" @change="handleAllusers">同IP审核</a-checkbox>
              <a-checkbox value="Noble" @change="handleNobleusers">同设备审核</a-checkbox>
            </a-space>
          </div>
        </div>

        <a-form-item class="save-button-container">
          <a-button type="primary" class="save-button" @click="handleConfirm">保存</a-button>
        </a-form-item>
      </a-col>
    </div>
  </a-card>
</template>

<script setup lang="jsx">
import { message } from 'ant-design-vue'
import CustomSpin from '@/components/Form/Custom/CustomSpin.vue'
import contentConfigRule from '../contentConfigRule'
import ModalForm from '@/components/Form/ModalForm/ModalForm.vue'
import EditableCell from '@/components/Form/EditableCell.vue';
import EditableNumCell from '@/components/Form/EditableNumCell.vue';

const props = defineProps({
  formData: {
      type: Object,
      default: () => ({
        activityName: '',
        activityType: '',
        activityContent: '',
        activityTime: [null, null],
      }),
    },
})
// Define emits
const emit = defineEmits(['back'])  // Define the 'back' event

const { createDialog } = useDialog()

const radioContent = ref(1) // Initial value for the radio group
const radioThreshold = ref('radio1') // Initial value for the radio group
const radioGiftRule = ref('radio1') // Initial value for the radio group
const radioValue2 = ref('radio1') // Initial value for the radio group
const spin_value1 = ref(0)
const spin_value2 = ref(0)

const isPermanent = ref(false)

const imageUrl = ref('') // URL for the uploaded icon
const bannerUrl = ref('') // URL for the uploaded banner
const uploadUrl = import.meta.env.VITE_API_HOST + '/api/v1/upload/resource'
const uploadHeaders = {
  Authorization: 'Bearer ' + localStorage.getItem('token'),
}

const customSpins = ref([{ value1: '', value2: '' }])

const groupedCustomSpins = computed(() => {
  return customSpins.value.reduce((result, value, index) => {
    if (index % 2 === 0) {
      result.push([value])
    } else {
      result[result.length - 1].push(value)
    }
    return result
  }, [])
})

const addCustomSpin = () => {
  customSpins.value.push({ value1: '', value2: '' })
}

const removeCustomSpin = (index) => {
  customSpins.value.splice(index, 1)
}

const handleConfirm = () => {
  emit('back') // Emit the back event to the parent component
}

const handleBack = () => {
  // Emit the back event to the parent component
  emit('back')
}

const handleAllusers = () => {
  // Handle All users selection
}

const handleNobleusers = () => {
  // Handle Noble users selection
}

const handleRechargeusers = () => {
  // Handle Recharge users selection
}

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error({
      content: 'You can only upload JPG/PNG file!',
      duration: 2,
    })
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error({
      content: 'Image must smaller than 2MB!',
      duration: 2,
    })
  }
  return isJpgOrPng && isLt2M
}

const handleChangeBanner = (info) => {
  if (info.file.status === 'done') {
    bannerUrl.value = URL.createObjectURL(info.file.originFileObj)
  }
}

const handleSuccessBanner = (response, file) => {
  if (response?.status === 200) {
    file.url = response.data.link
  } else {
    message.error({
      content: '上传失败。',
      duration: 2,
    })
  }
}

const uploadData = () => {
  return { type: 1 }
}

async function onContentConfig() {
  const formValue = ref({
    original_address: props.formData.activityContent,
    current_address: '应用程序://网页?popRoot=0',
    target: 0, // 0内, 1外
    back_means_exit: 0, // 0否, 1是
  })

  const formModalProps = {
    rule: contentConfigRule, // Restored rule here
    option: {
      global: {
        '*': {
          wrap: {
            labelCol: { span: 5 },
          },
        },
      },
    },
  }

  createDialog({
    title: '链接地址',
    width: 500,
    footer: null,
    component: () => (
      <div>
        <ModalForm v-model={formValue.value} {...formModalProps}/>
        <div style="display: flex; justify-content: space-between; margin-bottom: 40px; margin-left: 90px;">
          <a-button type="primary" onClick={() => onInternalJump(formValue.value)}>内跳</a-button>
          <a-button type="primary" onClick={onExternalJump}>外跳</a-button>
        </div>
      </div>
    ),
    onConfirm(status) {
      if (status) {
        // Handle confirmation logic
      }
    },
  })
}

const onInternalJump = (formData) => {}

const onExternalJump = () => {}

  // Table processing part
  // Rebate Level Data
const tableData = reactive([
  { id: 1, diamond_consumption_threshold: 200, gift_diamonds: 1, gift_balance: 1, gift_nobles: '国王(25天)', gift_mounts: '跑车(23天)'}
])

// Editable columns for the first table
const tableColumn = [
  { 
    title: '消费钻石门槛', dataIndex: 'diamond_consumption_threshold', key: 'diamond_consumption_threshold', align: 'center', 
    customRender: ({ record }) => {
      return <EditableNumCell modelValue={record.diamond_consumption_threshold}/>
    }
  },
  { 
    title: '赠送钻石', dataIndex: 'gift_diamonds', key: 'gift_diamonds', align: 'center', 
    customRender: ({ record }) => {
      return <EditableNumCell modelValue={record.gift_diamonds}/>
    }
  },
  { 
    title: '赠送余额', dataIndex: 'gift_balance', key: 'gift_balance', align: 'center',
    customRender: ({ record }) => {
      return <EditableNumCell modelValue={record.gift_balance}/>
    }
  },
  { 
    title: '赠送贵族', dataIndex: 'gift_nobles', key: 'gift_nobles', align: 'center',
    customRender: ({ record }) => {
      return <EditableCell modelValue={record.gift_nobles}/>
    }
  },
  { 
    title: '赠送坐骑', dataIndex: 'gift_mounts', key: 'gift_mounts', align: 'center',
    customRender: ({ record }) => {
      return <EditableCell modelValue={record.gift_mounts}/>
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    customRender: ({ index }) => {
      return (
        <a onClick={() => removeTableData(index)} style="text-decoration: underline; color: red; cursor: pointer;">
          删除
        </a>
      )
    }
  }
]

async function addTableData() {
  tableData.push({ 
    id: tableData.length + 1, 
    // diamond_consumption_threshold: 22, 
    // gift_diamonds: 11, 
    // gift_balance: 22 
  })

  // const fApi = ref(null)
  // const formValue = ref({ // Initialize formValue with rowData if editing
  //   diamond_consumption_threshold: '',
  //   gift_diamonds: '',
  //   gift_balance: '',
  // })

  // const formModalProps = {
  //   // request: data => merchantAddOrEditReq(isCreate ? null : merch_id, data),
  //   // getData(data) {
  //   //   return {
  //   //     ...data,
  //   //     // 如果是修改商户，body 里 merch_id 传 null，merch_id 放到 url path中。反之，创建用户，merch_id 放到 body 中
  //   //     merch_id: isCreate ? data.merch_id : undefined,
  //   //   }
  //   // },
  //   rule: useAddRebateLevelRule(fApi),
  // }
      
  // createDialog({
  //   title: '新增等级',
  //   width: 500,
  //   component:
  //     <ModalForm
  //       v-fApi:value={fApi.value}
  //       v-model={formValue.value}
  //       {...formModalProps}
  //     />
  //   ,
  //   onConfirm() {
  //     rebateData.push({ id: rebateData.length + 1, diamond_consumption_threshold: formValue.value.diamond_consumption_threshold, gift_diamonds: formValue.value.gift_diamonds, gift_balance: formValue.value.gift_balance })
  //   },
  // })
}

const removeTableData = (index) => {
  // We have to add API function
  tableData.splice(index, 1)
}  // Rebate Level Data
const tableData2 = reactive([
  { id: 1, balance_recharge_gift: 200, gift_diamonds: 1, gift_balance: 1, gift_nobles: '国王(25天)', gift_mounts: '跑车(23天)'}
])

const tableColumn2 = [
  { 
    title: '余额充值赠送', dataIndex: 'balance_recharge_gift', key: 'balance_recharge_gift', align: 'center',
    customRender: ({ record }) => {
      return <EditableNumCell modelValue={record.balance_recharge_gift}/>
    }
  },
  { 
    title: '赠送钻石', dataIndex: 'gift_diamonds', key: 'gift_diamonds', align: 'center',
    customRender: ({ record }) => {
      return <EditableNumCell modelValue={record.gift_diamonds}/>
    }
  },
  { 
    title: '赠送余额', dataIndex: 'gift_balance', key: 'gift_balance', align: 'center',
    customRender: ({ record }) => {
      return <EditableNumCell modelValue={record.gift_balance}/>
    }
  },
  { 
    title: '赠送贵族', dataIndex: 'gift_nobles', key: 'gift_nobles', align: 'center',
    customRender: ({ record }) => {
      return <EditableCell modelValue={record.gift_nobles}/>
    }
  },
  { 
    title: '赠送坐骑', dataIndex: 'gift_mounts', key: 'gift_mounts', align: 'center',
    customRender: ({ record }) => {
      return <EditableCell modelValue={record.gift_mounts}/>
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    customRender: ({ index }) => {
      return (
        <a onClick={() => removeTableData2(index)} style="text-decoration: underline; color: red; cursor: pointer;">
          删除
        </a>
      )
    }
  }
]

async function addTableData2() {

  tableData2.push({ 
    id: tableData2.length + 1, 
    // balance_recharge_gift: 22, 
    // gift_diamonds: 11, 
    // gift_balance: 22 
  })
}

const removeTableData2 = (index) => {
  // We have to add API function
  tableData2.splice(index, 1)
}

</script>

<style scoped>

/* Apply padding removal only to the table body cells, except the last column */
:deep(.no-padding-table .ant-table-tbody > tr > td ) {
  padding: 0 1px !important; /* Adjust padding for body cells, excluding the last column */
}

/* Keep the header padding intact */
:deep(.no-padding-table .ant-table-thead > tr > th.ant-table-cell) {
  padding: 8px; /* Use the default or custom padding for header cells */
}


.card-header {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.back-button {
  font-size: 18px;
  margin-right: 8px;
}

.back-icon {
  font-size: 20px;
  font-weight: bold;
  margin-left: 8px;
}

.card-title {
  flex-grow: 1;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.card-content {
  display: flex;
  justify-content: center;
}

.content-col {
  width: 100%;
  max-width: 800px;
  white-space: nowrap;
}

.form-item {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}

.label {
  flex: 1;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  padding-right: 10px;
  margin-right: 15px;
}

.input-container {
  width: 100%;
}

.input {
  text-align: center;
  width: 100%;
}

.hint-text {
  color: darkgray;
  font-size: 10px;
  text-align: left;
  margin-top: 5px;
}

.content-container {
  width: 100%;
  white-space: nowrap;
}

.radio-row {
  margin-bottom: 10px;
}

.input-address {
  flex: 1;
}

.link-button {
  margin-left: 10px;
}

.upload-box,
.upload-box-large {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
}

.upload-box {
  width: 80px;
  height: 80px;
}

.upload-box-large {
  width: 200px;
  height: 100px;
}

.upload-text {
  margin-top: 8px;
  font-size: 10px;
}

.checkbox-container {
  width: 100%;
}

.custom-spin-container {
  width: 100%;
}

.add-button {
  color: grey;
  font-size: 10px;
  margin-bottom: 10px;
  width: 100px;
  text-align: center;
}

.custom-spin-list {
  width: 120%;
  display: flex;
  flex-direction: column;
}

.spin-pair-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.spin-card {
  border-color: grey;
  display: flex;
  align-items: center;
  width: 50%;
}

.spin-row {
  flex: 1;
  display: flex;
  align-items: center;
}

.spin-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
}

.spin-input {
  flex: 1;
  margin-bottom: 5px;
}

.spin-label {
  text-align: center;
  color: gray;
  font-size: 10px;
}

.remove-button {
  margin-left: 10px;
  color: grey;
}

.save-button-container {
  text-align: center;
  margin: 30px;
}

.save-button {
  width: 200px;
}

</style>
