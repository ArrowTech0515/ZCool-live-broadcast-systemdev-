<template>
  <a-card>
    <template #title>
      <div style="display: flex; align-items: center; white-space: nowrap;">
        <a-button
          type="link"
          style="font-size: 18px; margin-right: 8px;"
          @click="handleBack"
        >
          <span style="font-size: 20px; font-weight: bold; margin-left: 8px;">&lt;</span>
        </a-button>
        <div style="flex-grow: 1; text-align: center;">
          <span style="font-size: 20px; font-weight: bold;">签到活动</span>
        </div>
      </div>
    </template>

    <div style="display: flex; justify-content: center;">
      <a-col layout="vertical" style="width: 100%; max-width: 900px; white-space: nowrap;">

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px; margin-right: 15px;">
            活动名称
          </div>
          <div style="width: 75%;">
            <a-input 
              placeholder="请输入活动名称" 
              style="text-align: center; width: 75%;"
            />
            <div style="color: darkgray; font-size: 10px; text-align: left; margin-top: 5px;">
              用户不可见，仅后台用户可见
            </div>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 20px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px; margin-right: 15px;">
            活动内容
          </div>
          <a-col type="flex" style="width: 75%; white-space: nowrap;">
            <a-row style="margin-bottom: 10px;">
              <!-- Radio Group on the left -->
              <a-col>
                <a-radio-group v-model:value="radioContent" style="text-align: left;">
                  <a-radio value="radio1">跳转地址</a-radio>
                  <a-radio value="radio2">富文本</a-radio>
                </a-radio-group>
              </a-col>
            </a-row>
            <a-row >
              <div style="width: 60%;">
                <a-input 
                  placeholder="请输入活动地址" 
                  style="text-align: center;" v-model:value="formData.activityContent"
                />
              </div>
              <a-button :flex="auto" type="default" style="margin-left: 10px;" @click="onContentConfig">链接设置</a-button>
            </a-row>
          </a-col>
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px; margin-right: 15px;">
            活动类型
          </div>
          <div style="width: 75%;">
            <a-input 
              placeholder="请输入活动类型" 
              style="text-align: center; width: 75%;"
            />
            <div style="color: darkgray; font-size: 10px; text-align: left; margin-top: 5px;">
              用户不可见，仅后台用户可见
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 20px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px; margin-right: 15px;">
            活动时间
          </div>
          <div style="width: 75%;">
            <a-range-picker 
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

        <div style="display: flex; align-items: flex-start; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; font-weight: bold; text-align: right; margin-top: 5px;padding-right: 10px; margin-right: 15px;">
            签到天数
          </div>
          <div style="width: 75%;">
            <div style="color: darkgray; font-size: 10px; text-align: left; margin-top: 5px;">
              默认签到配置为7天，需要设置当前签到奖励
            </div>
            <a-card 
              :bordered="true" 
              style="width: 75%; ">
              <a-table :dataSource="dataSource" :pagination="false">
                <a-table-column 
                  title="签到天数" dataIndex="col_1" key="col_1" align="center"></a-table-column>
                <a-table-column title="签到奖励" dataIndex="col_2" key="col_2" align="center"></a-table-column>

                <template #bodyCell="{ column, text }">
                  <span v-if="column.dataIndex === 'col_2'">
                    <span style="text-decoration: underline;color: #1890ff; cursor: pointer;" @click="handleOperation(text)">{{ text }}</span>
                  </span>
                  <span v-else>{{ text }}</span>
                </template>
              </a-table>
            </a-card>
          </div>
        </div>

        <div style="display: flex; align-items: center; text-align: justify; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px;margin-right: 15px;">
            参与用户
          </div>
          <div style="width: 75%;">
            <a-row type="flex" align="middle" justify="space-between" style="width: 75%; white-space: nowrap;">
              <a-col :span="16">
                <a-radio-group v-model:value="radioValue" style="text-align: left;">
                  <a-radio value="radio1">全部用户</a-radio>
                  <a-radio value="radio2">贵族用户</a-radio>
                  <a-radio value="radio3">注册用户</a-radio>
                  <a-radio value="radio4">贵族用户</a-radio>
                  <a-radio value="radio5">自定义用户</a-radio>
                </a-radio-group>
                <a-button type="primary" ghost style="padding: 0%; width: 100px; text-align: center;">+ 选择用户</a-button>
              </a-col>
            </a-row>
          </div>
        </div>

        <div style="display: flex; align-items: center; margin-bottom: 15px; width: 100%;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px;margin-right: 15px;">
            审核机制
          </div>
          <div style="width: 75%; display: flex; align-items: center; justify-content: space-between;">
            <a-space style="flex-grow: 1;">
              <a-checkbox value="All" @change="handleAllusers">同IP审核</a-checkbox>
              <a-checkbox value="Noble" @change="handleNobleusers">同设备审核</a-checkbox>
            </a-space>
          </div>
        </div>

        <a-form-item style="text-align: center; margin: 30px; white-space: nowrap;">
          <a-button type="primary" style="width: 200px;" @click="handleConfirm">保存</a-button>
        </a-form-item>

      </a-col>
    </div>

  </a-card>

  <AddRewardDialog 
        :isModalVisible="isModalVisible"
        @update:is-modal-visible="val => isModalVisible = val" />

  <a-modal
    v-model:open="isModalVisible1"
    :title="null"
    @cancel="handleCancel"
    :footer="null"
  >
    <div style="margin-top: 30px;">
      <div v-for="w in withdrawals" :key="w.gift_item">
        <div style="border: 1px solid #d9d9d9; padding: 8px; margin-bottom: 8px; border-radius: 4px;">
          <div v-if="w.count > 1">{{ w.gift_item }} * {{ w.count }}</div>
          <div v-else>{{ w.gift_item }}</div>
        </div>
        
      </div>
    </div>
  </a-modal>

</template>

<script setup lang="jsx">
import { ref } from 'vue'
import AddRewardDialog from './addRewardDialog.vue'
import contentConfigRule from '../contentConfigRule'

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

const emit = defineEmits(['back'])  // Define the 'back' event

const { createDialog } = useDialog()

const isModalVisible1 = ref(0); // 0:hide, 1:device, 2:IP

const isModalVisible = ref(false);
const radioValue = ref('radio1');
const radioContent = ref('radio1') // Initial value for the radio group
const isPermanent = ref(false)

const dataSource = ref([
  { key: '1', col_1: '1', col_2: 'XXXX礼物' },
  { key: '2', col_1: '2', col_2: '342钻石' },
  { key: '3', col_1: '3', col_2: '添加奖励' },
  { key: '4', col_1: '4', col_2: '添加奖励' },
  { key: '5', col_1: '5', col_2: '添加奖励' },
  { key: '6', col_1: '6', col_2: '添加奖励' },
  { key: '7', col_1: '7', col_2: '添加奖励' },
]);

const withdrawals = ref([
  { gift_item: 'XX礼物', count: 2 },
  { gift_item: '232432钻石', count: 1 },
])

const handleConfirm = () => {
  emit('back'); // Emit the back event to the parent component
};

const handleBack = () => {
  // Handle the back action here
  emit('back')
};

const handleOperation = (operation) => {
  if (operation === "添加奖励") {
    isModalVisible.value = true;
  }
  else
  {
    isModalVisible1.value = 1
  }
};

const handleAllusers = () => {
  // Handle All users selection
};

const handleNobleusers = () => {
  // Handle Noble users selection
};

async function onContentConfig() {
  const formValue = ref({
    original_address : props.formData.activityContent,
    current_address : '应用程序://网页?popRoot=0',
    target : 0, // 0内, 1外
    back_means_exit: 0, // 0否, 1是
  })

  const formModalProps = {
    // request: setAnchorBlackReq,
    // getData(data) {
    //   const { anchor_id, ...params } = data
    //   return {
    //     ...params,
    //     anchor_ids: [anchor_id],
    //   }
    // },
    option: {
      global: {
        '*': {
          wrap: {
            labelCol: { span: 5 },
          },
        },
      },
    },
    rule: contentConfigRule,
  }

  createDialog({
    title: '链接地址',
    width: 500,
    footer: null,
    component: () => (
      <div>
        <ModalForm v-model={formValue.value} {...formModalProps} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', marginLeft: '90px'}}>
          <a-button type="primary" onClick={() => onInternalJump(formValue.value)}>
            内跳
          </a-button>
          <a-button type="primary" onClick={onExternalJump}>
            外跳
          </a-button>
        </div>
      </div>
    ),
    onConfirm(status) {
      if (status) {
        // const current = dataSource.value.find(item => item.anchor_id === userItem.anchor_id)
        // if (current) {
        //   current.acct_status = 2
        // }
      }
    },
  })
}

const onInternalJump = (formData) => {
}

const onExternalJump = () => {
}

</script>

<style scoped>
/* Add any necessary styles here */
</style>
