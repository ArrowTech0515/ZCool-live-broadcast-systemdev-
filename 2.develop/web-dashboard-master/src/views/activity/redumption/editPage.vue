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
          <span style="font-size: 20px; font-weight: bold;">兑换活动</span>
        </div>
      </div>
    </template>

    <div style="display: flex; justify-content: center;">
      <a-col layout="vertical" style="width: 100%; max-width: 900px; white-space: nowrap;">

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px; margin-right: 15px;">
            活动图标
          </div>
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
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width: 80px; height: 80px;" />
                <div v-else>
                  <PlusCircleOutlined />
                  <div style="margin-top: 8px; font-size: 10px;">上传</div>
                </div>
              </div>
            </a-upload>
          </a-col>
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px; margin-right: 15px;">
            活动封面
          </div>
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
                <img v-if="bannerUrl" :src="bannerUrl" alt="avatar" style="width: 200px; height: 100px;" />
                <div v-else>
                  <PlusCircleOutlined />
                  <div style="margin-top: 8px; font-size: 10px;">上传</div>
                </div>
              </div>
            </a-upload>
          </a-col>
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px; margin-right: 15px;">
            活动名称
          </div>
          <div style="width: 75%;">
            <a-input 
              placeholder="请输入活动名称" 
              style="text-align: center; width: 75%;" v-model:value="formData.activityName"
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

        <div style="display: flex; align-items: center; margin-bottom: 20px; width: 100%;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px; margin-right: 15px;">
            展示位置
          </div>
          <div style="width: 75%;">
            <div style="color: darkgray; font-size: 10px; text-align: left; margin-top: 5px;">
              用户不可见，仅后台用户可见
            </div>
            <a-space style="flex-grow: 1;">
              <a-checkbox value="All" @change="handleAllusers">首页右下角</a-checkbox>
              <a-checkbox value="Noble" @change="handleNobleusers">直播间右下角</a-checkbox>
              <a-checkbox value="Recharge" @change="handleRechargeusers">个人中心右下角</a-checkbox>
            </a-space>
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

        <div style="display: flex; align-items: flex-start; width: 100%; margin-bottom: 15px; white-space: nowrap;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px;margin-right: 15px;margin-top: 10px;">
            兑换赠送
          </div>
          <div :flex="auto" style="width: 75%;">
            <a-button @click="onSelectGift" 
              style="color: grey; font-size: 10px; margin-bottom: 10px; width: 100px; text-align: center;">
              添加赠送内容
            </a-button>

            <div style="width: 120%; display: flex; flex-direction: column;">
              <div 
                v-for="(spinPair, rowIndex) in groupedCustomSpins" :key="rowIndex"
                style="display: flex; justify-content: space-between; margin-bottom: 10px;">

                <a-card class="spinCard" :bordered="true" style=" 
                      border-color: grey; display: flex; align-items: center; width: 50%;">

                  <a-row style="flex: 1; display: flex; align-items: center;">
                    <a-col style="flex: 1; display: flex; flex-direction: column; align-items: center; margin-right: 10px">
                      <span 
                        style="flex: 1; margin-bottom: 5px;
                              padding-left: 30%; padding-right: 30%; padding-top: 4%; padding-bottom: 4%; 
                              border: 1px solid lightgrey; border-radius: 5px; 
                               color: grey; ">
                            1:10</span>
                      <span style=" color: grey;text-align: center; font-size: 10px;">兑换选项</span>
                    </a-col>
                    <a-col style="flex: 1; display: flex; flex-direction: column; align-items: center;">
                      <CustomSpin v-model:nValue="spin_value1" style="flex: 1; margin-bottom: 5px;"></CustomSpin>
                      <span style=" color: grey;text-align: center; font-size: 10px;">赠送钻石</span>
                    </a-col>
                    <a-button 
                      type="link" 
                      @click="removeCustomSpin(rowIndex * 2)"
                      style="margin-left: 10px; color: grey;"><MinusCircleOutlined/></a-button>
                  </a-row>

                </a-card>

                <a-card v-if="spinPair.length > 1" class="spinCard" :bordered="true" style="
                      border-color: grey; display: flex; align-items: center; width: 49%;">

                  <a-row style="flex: 1; display: flex; align-items: center;">
                    <a-col style="flex: 1; display: flex; flex-direction: column; align-items: center; margin-right: 10px">
                      <span 
                        style="flex: 1; margin-bottom: 5px;
                              padding-left: 30%; padding-right: 30%; padding-top: 4%; padding-bottom: 4%; 
                              border: 1px solid lightgrey; border-radius: 5px; 
                               color: grey; ">
                            1:10</span>
                      <span style=" color: grey;text-align: center; font-size: 10px;">兑换选项</span>
                    </a-col>
                    <a-col style="flex: 1; display: flex; flex-direction: column; align-items: center;">
                      <CustomSpin v-model:nValue="spin_value2" style="flex: 1; margin-bottom: 5px;"></CustomSpin>
                      <span style=" color: grey;text-align: center; font-size: 10px;">赠送钻石</span>
                    </a-col>
                    <a-button 
                      type="link" 
                      @click="removeCustomSpin(rowIndex * 2 + 1)"
                      style="margin-left: 10px; color: grey;"><MinusCircleOutlined/></a-button>
                  </a-row>

                </a-card>

              </div>
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; text-align: justify; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px;margin-right: 15px;">
            赠送规则
          </div>
          <div style="width: 75%;">
            <a-row type="flex" align="middle" justify="space-between" style="width: 75%; white-space: nowrap;">
              <a-col :span="16">
                <a-radio-group v-model:value="radioValue" style="text-align: left;">
                  <a-radio value="radio1">首次充值有效</a-radio>
                  <a-radio value="radio2">多次充值有效</a-radio>
                </a-radio-group>
              </a-col>
            </a-row>
          </div>
        </div>

        <div style="display: flex; align-items: center; text-align: justify; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px;margin-right: 15px;">
            参与用户
          </div>
          <div style="width: 75%;">
            <a-row type="flex" align="middle" justify="space-between" style="width: 75%; white-space: nowrap;">
              <a-col :span="16">
                <a-radio-group v-model:value="radioValue2" style="text-align: left;">
                  <a-radio value="radio1">全部用户</a-radio>
                  <a-radio value="radio2">贵族用户</a-radio>
                  <a-radio value="radio3">注册用户</a-radio>
                  <a-radio value="radio4">贵族用户</a-radio>
                  <a-radio value="radio5">自定义用户</a-radio>
                </a-radio-group>
                <a-button type="primary" ghost style=" padding: 0%; width: 100px; text-align: center;">+ 选择用户</a-button>
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

  <SelectGiftDialog 
      :isModalVisible="isModalVisible"
      @update:is-modal-visible="val => isModalVisible = val" />
</template>

<script setup lang="jsx">
import { ref, computed } from 'vue'
import SelectGiftDialog from './selectGiftDialog.vue'
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

const isModalVisible = ref(false);
const radioContent = ref('radio1') // Initial value for the radio group
const radioValue = ref('radio1');
const radioValue2 = ref('radio1');
const isPermanent = ref(false)

const spin_value1 = ref(0);
const spin_value2 = ref(0);
const imageUrl = ref('');
const bannerUrl = ref('');
const uploadUrl = import.meta.env.VITE_API_HOST + '/api/v1/upload/resource';
const uploadHeaders = {
  Authorization: 'Bearer ' + localStorage.getItem('token'),
};
const customSpins = ref([{ value1: '', value2: '' }]);

const groupedCustomSpins = computed(() => {
  return customSpins.value.reduce((result, value, index) => {
    if (index % 2 === 0) {
      result.push([value]);
    } else {
      result[result.length - 1].push(value);
    }
    return result;
  }, []);
});

const handleConfirm = () => {
  emit('back'); // Emit the back event to the parent component
};

function handleBack() {
  // Handle the back action here
  emit('back')
}

function handleChangeBanner(info) {
  if (info.file.status === 'done') {
    bannerUrl.value = URL.createObjectURL(info.file.originFileObj);
  }
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;
  return isJpgOrPng && isLt2M;
}

function onSelectGift() {
  isModalVisible.value = true;
}

function removeCustomSpin(index) {
  customSpins.value.splice(index, 1);
}

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
.upload-box {
  width: 80px;
  height: 80px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.upload-box-large {
  width: 400px;
  height: 80px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

/* Additional styles... */
</style>
