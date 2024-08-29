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
          <span style="font-size: 20px; font-weight: bold;">充值活动</span>
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
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width: 200px; height: 100px;" />
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
            <a-input 
              placeholder="请输入" 
              style="text-align: center; width: 75%;"
            />
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
            <a-input 
              placeholder="请输入" 
              style="text-align: center; width: 75%;"
            />
          </div>
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 20px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px;margin-right: 15px;">
            活动时间
          </div>
          <div style="width: 75%;">
            <a-range-picker 
              :placeholder="['开始日期', '结束日期']"
              style="width: 75%; text-align: center;"
            />
          </div>
        </div>
     
        <div style="display: flex; align-items: center; margin-bottom: 20px; width: 100%;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px;margin-right: 15px;">
            图标位置
          </div>
          <div style="width: 75%; ">
            <a-space style="flex-grow: 1;">
              <a-checkbox value="All" @change="handleAllusers">首页右下角</a-checkbox>
              <a-checkbox value="Noble" @change="handleNobleusers">直播间右下角</a-checkbox>
              <a-checkbox value="Recharge" @change="handleRechargeusers">个人中心右下角</a-checkbox>
            </a-space>
          </div>
        </div>

        <div style="display: flex; align-items: flex-start; width: 100%; margin-bottom: 15px; white-space: nowrap;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px;margin-right: 15px;margin-top: 10px;">
            赠送内容
          </div>

          <div :flex="auto" style="width: 75%;">

            <a-row style=" margin-bottom: 15px; ">
              <a-checkbox style="align-items: center; margin-right: 10px;" value="All" @change="handleAllusers">赠送钻石</a-checkbox>
              <CustomSpin v-model:nValue="spin_value1" style="width: 60%; margin-bottom: 5px;"></CustomSpin>
            </a-row>
            
            <a-row style="margin-bottom: 15px; ">
              <a-checkbox style="align-items: center;" value="All" @change="handleAllusers">赠送礼物</a-checkbox>
              <a-col>
                <a-button style="margin-right: 20px; " @click="addCustomSpin">添加礼物</a-button>
                <div style="color: darkgray; font-size: 10px; text-align: left; margin-top: 5px;">
                  已添加 53个礼物
                </div>
              </a-col>
              <a-form-item label="礼物有效期">
                  <a-input style="text-align: center" v-model="gameId" value="1" placeholder="" /> 天
              </a-form-item>

            </a-row>

            <a-row gutter="[16, 16]" style="width: 100%; ">
              <a-col
                v-for="(spinPair, index) in spinCards"
                :key="index"
                :span="5" 
                style="margin-bottom: 5px; display: flex; justify-content: center;">
                
                <GiftPanel 
                  :spinValue="spinPair.spinValue" 
                  :curIndex="spinPair.curIndex" 
                  @remove-custom-spin="removeCustomSpin"/>
              </a-col>
            </a-row>

          </div>
        </div>

        <div style="display: flex; align-items: center; margin-bottom: 20px; width: 100%;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px;margin-right: 15px;">
            赠送机制
          </div>
          <div style="width: 75%; display: flex; align-items: center; justify-content: space-between;">
            <a-space style="flex-grow: 1;">
              <a-checkbox value="All" @change="handleAllusers">新用户注册</a-checkbox>
              <a-checkbox value="Noble" @change="handleNobleusers">绑定手机号用户</a-checkbox>
              <a-checkbox value="Noble" @change="handleNobleusers">绑定邮箱用户</a-checkbox>
              <a-checkbox value="Noble" @change="handleNobleusers">认证用户</a-checkbox>
              <a-checkbox value="Noble" @change="handleNobleusers">首充用户</a-checkbox>
              <a-checkbox value="Noble" @change="handleNobleusers">首次消费用户</a-checkbox>
            </a-space>
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

<script>
import CustomSpin from '@/components/Form/Custom/CustomSpin.vue'
// const uploadRule = createUploadRule('主播头像', 'avatar_url')
import GiftPanel from '@/components/Form/GiftPanel.vue'

export default {
  components: {
    CustomSpin,
    GiftPanel
  },

  data() {
    return {
      parentValue: '0', // Example initial value
      radioValue: 'radio1', // Initial value for the radio group

      spin_value1: '0',

      imageUrl: '', // URL for the uploaded icon
      bannerUrl: '', // URL for the uploaded banner
      uploadUrl: import.meta.env.VITE_API_HOST + '/api/v1/upload/resource',
      uploadHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      // spinCards: [
      //   { value1: '' } // Initial CustomSpin
      // ]
      spinCards: [
      { curIndex: 0, name: 'Gift 1', icon: '🎁', spinValue: 0 },
      // { id: 2, name: 'Gift 2', icon: '🎂', spinValue: 20 },
      // { id: 3, name: 'Gift 3', icon: '🍫', spinValue: 15 },
      // { id: 4, name: 'Gift 4', icon: '💎', spinValue: 50 },
      // { id: 5, name: 'Gift 5', icon: '🧸', spinValue: 25 },
      // { id: 6, name: 'Gift 6', icon: '🎮', spinValue: 30 },
      // { id: 7, name: 'Gift 7', icon: '🏆', spinValue: 40 },
      // { id: 8, name: 'Gift 8', icon: '📱', spinValue: 35 }
    ],
      giftValidity: ''
    };
  },

  computed: {

  },

  methods: {
    addCustomSpin() {
      const newId = this.spinCards.length
      this.spinCards.push({
        curIndex: newId,
        name: `Gift ${newId}`,
        icon: '🎁', // Default icon or change as needed
        spinValue: 0 // Default value, can be modified
      })
    },
    removeCustomSpin(curIndex) {
      console.log("removeCustomSpin : " + curIndex)
      console.log("removeCustomSpin1 : " + this.spinCards[curIndex].spinValue)
      console.log("removeCustomSpin2 : " + this.spinCards[curIndex].curIndex)
      this.spinCards.splice(curIndex, 1)
      //this.spinCards = this.spinCards.filter(spinPair => spinPair.id !== id);
    },

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
        //this.$message.error('You can only upload JPG/PNG file!');
        message.error({
          content: 'You can only upload JPG/PNG file!',
          duration: 2, // Duration in seconds
        });
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        //this.$message.error('Image must smaller than 2MB!');
        message.error({
          content: 'Image must smaller than 2MB!',
          duration: 2, // Duration in seconds
        });
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
        //this.$message.error('上传失败');
        message.error({
          content: '上传失败。',
          duration: 2, // Duration in seconds
        });
      }
    },
    uploadData() {
      return { type: 1 };
    },

  },
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
