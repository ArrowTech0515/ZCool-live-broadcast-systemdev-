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
          <span style="font-size: 20px; font-weight: bold;">靓号活动</span>
        </div>
      </div>
    </template>

    <div style="display: flex; justify-content: center;">
      <a-col layout="vertical" style="width: 100%; max-width: 900px; white-space: nowrap;">

        <!-- Form Items Here -->
      
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
            <div style="color: darkgray; font-size: 10px; text-align: left;">
              用户端活动中心展示封面
            </div>
          </a-col>
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px; margin-right: 15px;">
            活动名称
          </div>
          <div style="width: 75%;">
            <a-input placeholder="请输入活动名称" style="text-align: center; width: 75%;" />
            <div style="color: darkgray; font-size: 10px; text-align: left; margin-top: 5px;">
              用户不可见，仅后台用户可见
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px; margin-right: 15px;">
            活动类型
          </div>
          <div style="width: 75%;">
            <a-input placeholder="请输入活动类型" style="text-align: center; width: 75%;" />
          </div>
        </div>

        <div style="display: flex; align-items: center; margin-bottom: 20px; width: 100%;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px;margin-right: 15px;">
            展示位置
          </div>
          <div style="width: 75%;">
            <a-space style="flex-grow: 1;">
              <a-checkbox value="All" @change="handleAllusers">首页右下角</a-checkbox>
              <a-checkbox value="Noble" @change="handleNobleusers">直播间右下角</a-checkbox>
              <a-checkbox value="Recharge" @change="handleRechargeusers">个人中心右下角</a-checkbox>
            </a-space>
          </div>
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 20px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px;margin-right: 15px;">
            活动时间
          </div>
          <div style="width: 75%;">
            <a-range-picker :placeholder="['开始日期', '结束日期']" style="width: 75%; text-align: center;" />
          </div>
        </div>

        <div style="display: flex; align-items: center; margin-bottom: 20px; width: 100%;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px;margin-right: 15px;">
            展示位置
          </div>
          <div style="width: 75%;">
            <a-space style="flex-grow: 1;">
              <a-checkbox value="leopard" @change="handleAllusers">豹子号</a-checkbox>
              <a-checkbox value="continuous" @change="handleNobleusers">连号</a-checkbox>
              <a-checkbox value="serial" @change="handleRechargeusers">序列号</a-checkbox>
              <a-checkbox value="interval" @change="handleRechargeusers">间隔号</a-checkbox>
            </a-space>
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: center; width: 100%; margin-bottom: 15px; white-space: nowrap;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px; margin-right: 15px; ">
            充值赠送
          </div>
          <div :flex="auto" style="width: 75%;">
            <CustomSpin v-model:nValue="spin_value1" style="flex: auto; margin-bottom: 5px; width: 75%;"></CustomSpin>
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
                <a-button type="primary" ghost style="padding: 0; width: 100px; text-align: center;">+ 选择用户</a-button>
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

        <!-- Center Aligned Save Button -->
        <a-form-item style="text-align: center; margin: 30px; white-space: nowrap;">
          <a-button type="primary" style="width: 200px;">保存</a-button>
        </a-form-item>

      </a-col>
    </div>

  </a-card>
</template>

<script setup lang="jsx">
import CustomSpin from '@/components/Form/Custom/CustomSpin.vue';

const emit = defineEmits(['back'])  // Define the 'back' event

const spin_value1 = ref(0);
const radioValue = ref('radio1'); // Initial value for the radio group
const imageUrl = ref(''); // URL for the uploaded icon
const bannerUrl = ref(''); // URL for the uploaded banner
const uploadUrl = import.meta.env.VITE_API_HOST + '/api/v1/upload/resource';
const uploadHeaders = {
  Authorization: 'Bearer ' + localStorage.getItem('token'),
};

const handleBack = () => {
  emit('back'); // Emit the back event to the parent component
};

const handleAllusers = () => {
  // Handle All users selection
};

const handleNobleusers = () => {
  // Handle Noble users selection
};

const handleRechargeusers = () => {
  // Handle Recharge users selection
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error({ content: 'You can only upload JPG/PNG file!', duration: 2 });
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error({ content: 'Image must smaller than 2MB!', duration: 2 });
  }
  return isJpgOrPng && isLt2M;
};

const handleChangeBanner = (info) => {
  if (info.file.status === 'done') {
    bannerUrl.value = URL.createObjectURL(info.file.originFileObj);
  }
};

const handleSuccess = (response, file) => {
  if (response?.status === 200) {
    file.url = response.data.link;
  } else {
    message.error({ content: '上传失败。', duration: 2 });
  }
};

const uploadData = () => {
  return { type: 1 };
};
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
</style>
