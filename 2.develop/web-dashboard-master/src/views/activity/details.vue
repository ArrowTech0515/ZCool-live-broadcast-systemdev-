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
          <span style="font-size: 20px; font-weight: bold;">添加策略</span>
        </div>
      </div>
    </template>

    <div style="display: flex; justify-content: center;">
      <a-col layout="vertical" style="width: 100%; max-width: 600px; white-space: nowrap;">

        <!-- Form Items Here -->
      
        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; text-align: right; padding-right: 10px; margin-right: 15px;">
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
                  <PlusOutlined />
                  <div style="margin-top: 8px; font-size: 10px;">上传</div>
                </div>
              </div>
            </a-upload>
          </a-col>
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; text-align: right; padding-right: 10px; margin-right: 15px;">
            活动封面
          </div>
          <a-col :span="18">
            <a-upload
              name="avatar"
              :max-count="1"
              list-type="picture-card"
              :show-upload-list="true"
              action="import.meta.env.VITE_API_HOST + '/api/v1/upload/resource'"
              :data="uploadData"
              accept="image/png,image/jpeg,image/jpg"
              :before-upload="beforeUpload"
              @change="handleChange"
              @success="handleSuccess"
            >
              <div class="upload-box-large">
                <img v-if="bannerUrl" :src="bannerUrl" alt="banner" style="width: 200px; height: 100px;" />
                <div v-else>
                  <PlusOutlined />
                  <div style="margin-top: 8px;  font-size: 10px;">上传</div>
                </div>
              </div>
            </a-upload>
          </a-col>
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; text-align: right; padding-right: 10px; margin-right: 15px;">
            策略名称
          </div>
          <a-input 
            placeholder="请输入策略名称" 
            style="text-align: center; width: 75%;"
          />
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; text-align: right; padding-right: 10px; margin-right: 15px;">
            最低提现金额
          </div>
          <div style="width: 75%;">
            <CustomSpin
                v-model:nValue="parentValue"
                style="text-align: right; width: 100%;">
            </CustomSpin>
            <div style="color: darkgray; font-size: 12px; text-align: left; margin-top: 5px;">
              低于当前提现金额时，用户无法发起提现
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; text-align: right; padding-right: 10px;margin-right: 15px;">
            最高提现金额
          </div>
            <div style="width: 75%;">
            <CustomSpin
                v-model:nValue="parentValue"
                style="text-align: right; width: 100%;">
            </CustomSpin>
            <div style="color: darkgray; font-size: 12px; text-align: left; margin-top: 5px;">
              高于当前提现金额时，用户无法发起提现
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; text-align: right; padding-right: 10px;margin-right: 15px;">
            每日免费提现次数
          </div>
          <div style="width: 75%;">
            <CustomSpin
                v-model:nValue="parentValue"
                style="text-align: right; width: 100%;">
            </CustomSpin>
            <div style="color: darkgray; font-size: 12px; text-align: left; margin-top: 5px;">
              设置次数内用户可免费提现，不收取手续费
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; text-align: right; padding-right: 10px;margin-right: 15px;">
            每日限制提现次数
          </div>
          <div style="width: 75%;">
            <CustomSpin
                v-model:nValue="parentValue"
                style="text-align: right; width: 100%;">
            </CustomSpin>
            <div style="color: darkgray; font-size: 12px; text-align: left; margin-top: 5px;">
              用户每日最大提现次数，超过则无法提现（＜免费提现次数时，超额的免费次数不可用）
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; text-align: right; padding-right: 10px;margin-right: 15px;">
            手续费比例
          </div>
          <div style="width: 75%;">
            <CustomSpin
                v-model:nValue="parentValue"
                style="text-align: right; width: 100%;">
            </CustomSpin>
            <div style="color: darkgray; font-size: 12px; text-align: left; margin-top: 5px;">
              每日免费次数用完时，继续提现将按照当前比例扣除对应的手续费
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; text-align: justify; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; text-align: right; padding-right: 10px;margin-right: 15px;">
            区块链提现
          </div>
          <div style="width: 75%;">
            <a-row type="flex" align="middle" justify="space-between" style="width: 75%; white-space: nowrap;">
              <!-- Radio Group on the left -->
              <a-col :span="16">
                <a-radio-group v-model="radioValue" style="text-align: left;">
                  <a-radio value="radio1">是</a-radio>
                  <a-radio value="radio2">否</a-radio>
                </a-radio-group>
              </a-col>

              <!-- Span on the right -->
              <a-col :span="8" style="text-align: right;">
                <span
                  style="text-decoration: underline; color: #1890ff; cursor: pointer;"
                  @click="handleOperation(text)"
                >
                  区块链汇率
                </span>
              </a-col>
            </a-row>
            <div style="color: darkgray; font-size: 12px; text-align: left; margin-top: 5px;">
              设置允许区块链提现时，用户端增加虚拟币提现类型
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; margin-bottom: 15px; width: 100%;">
          <div style="flex: 1; text-align: right; padding-right: 10px;margin-right: 15px;">
            策略用户
          </div>
          <div style="width: 75%; display: flex; align-items: center; justify-content: space-between;">
            <a-space style="flex-grow: 1;">
              <a-checkbox value="All" @change="handleAllusers">全部用户</a-checkbox>
              <a-checkbox value="Noble" @change="handleNobleusers">贵族用户</a-checkbox>
              <a-checkbox value="Recharge" @change="handleRechargeusers">充值用户</a-checkbox>
              <a-checkbox value="Custom" @change="handleCustomusers">自定义用户</a-checkbox>
            </a-space>
            <a-input placeholder="选择用户" style="padding: 0%; width: 100px; text-align: center;" />
          </div>
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px; white-space: nowrap;">
          <div style="flex: 1; text-align: right; padding-right: 10px;margin-right: 15px;">
            自动打款机制
          </div>
          <div style="width: 75%;">
            <div style="width: 75%; display: flex; justify-content: space-between;">
              <CustomSpin v-model:nValue="parentValue" style="flex: 1; margin-right: 10px;"></CustomSpin>
              <CustomSpin v-model:nValue="parentValue" style="flex: 1;"></CustomSpin>
            </div>
            <div style="color: darkgray; font-size: 12px; text-align: left; margin-top: 5px;">
              每日免费次数用完时，继续提现将按照当前比例扣除对应的手续费
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px; white-space: nowrap;">
          <div style="flex: 1; text-align: right; padding-right: 10px;margin-right: 15px;">
            策略状态
          </div>
          <div style="text-align: left; width: 75%;">
            <a-switch checked-children="启用" un-checked-children="关闭" />
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

<script>
import CustomSpin from '@/components/Form/Custom/CustomSpin.vue';
// const uploadRule = createUploadRule('主播头像', 'avatar_url')

export default {
  components: {
    CustomSpin,
  },
  // uploadRule,

  data() {
    return {
      parentValue: '0', // Example initial value
      radioValue: 'radio1', // Initial value for the radio group

      imageUrl: '', // URL for the uploaded icon
      bannerUrl: '', // URL for the uploaded banner
      uploadUrl: import.meta.env.VITE_API_HOST + '/api/v1/upload/resource',
      uploadHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },

    };
  },

  methods: {
    handleBack() {
      // Handle the back action here
      // For example, navigate to the previous page:
      this.$emit('back'); // Emit the back event to the parent component
    },
    handleOperation(text) {
      // Handle the operation related to "区块链汇率"
      console.log(text);
    },
    handleAllusers() {
      // Handle All users selection
    },
    handleNobleusers() {
      // Handle Noble users selection
    },
    handleRechargeusers() {
      // Handle Recharge users selection
    },
    handleCustomusers() {
      // Handle Custom users selection
    },

    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    handleChange(info) {
      if (info.file.status === 'done') {
        this.imageUrl = URL.createObjectURL(info.file.originFileObj);
      }
    },
    handleChangeBanner(info) {
      if (info.file.status === 'done') {
        this.bannerUrl = URL.createObjectURL(info.file.originFileObj);
      }
    },
    handleSuccess(response, file) {
      if (response?.status === 200) {
        file.url = response.data.link;
      } else {
        this.$message.error('上传失败');
      }
    },
    uploadData() {
      return { type: 1 };
    },

  },
};
</script>

<style>
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
  width: 300px;
  height: 80px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

</style>
