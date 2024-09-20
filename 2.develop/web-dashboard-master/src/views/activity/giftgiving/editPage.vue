<template>
  <a-card>
    <template #title>
      <div class="card-title">
        <a-button type="link" class="back-button" @click="handleBack">
          <span class="back-icon">&lt;</span>
        </a-button>
        <div class="title-text">送礼活动</div>
      </div>
    </template>

    <div class="form-container">
      <a-col layout="vertical" class="form-column">
        <!-- Form Items Here -->

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
                <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="image" />
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
              <div class="upload-box">
                <img v-if="bannerUrl" :src="bannerUrl" alt="avatar" class="image" />
                <div v-else>
                  <PlusCircleOutlined />
                  <div class="upload-text">上传</div>
                </div>
              </div>
            </a-upload>
            <div class="note">用户端活动中心展示封面</div>
          </a-col>
        </div>

        <div class="form-item">
          <div class="label">活动名称</div>
          <div class="input-container">
            <a-input placeholder="请输入活动名称" class="input-field" />
            <div class="note">用户不可见，仅后台用户可见</div>
          </div>
        </div>

        <div class="form-item">
          <div class="label">活动类型</div>
          <div class="input-container">
            <a-input placeholder="请输入活动类型" class="input-field" />
          </div>
        </div>

        <div class="form-item">
          <div class="label">活动时间</div>
          <div class="input-container">
            <a-range-picker :placeholder="['开始日期', '结束日期']" class="input-field" />
          </div>
        </div>

        <div class="form-item">
          <div class="label">图标位置</div>
          <div class="checkbox-group">
            <a-checkbox value="All" @change="handleAllusers">首页右下角</a-checkbox>
            <a-checkbox value="Noble" @change="handleNobleusers">直播间右下角</a-checkbox>
            <a-checkbox value="Recharge" @change="handleRechargeusers">个人中心右下角</a-checkbox>
          </div>
        </div>

        <div class="form-item">
          <div class="label">赠送内容</div>
          <div class="input-container">
            <a-row class="gift-row">
              <a-checkbox value="All" @change="handleAllusers">赠送钻石</a-checkbox>
              <CustomSpin v-model:nValue="spin_value1" class="spin-control" />
            </a-row>

            <a-row class="gift-row">
              <a-checkbox value="All" @change="handleAllusers">赠送礼物</a-checkbox>
              <a-col>
                <a-button class="add-gift-button" @click="addCustomSpin">添加礼物</a-button>
                <div class="note">已添加 53个礼物</div>
              </a-col>
              <a-form-item label="礼物有效期">
                <a-input class="input-field" v-model="gameId" value="1" /> 天
              </a-form-item>
            </a-row>

            <a-row gutter="[16, 16]" class="gift-card-row">
              <a-col v-for="(spinPair, index) in spinCards" :key="index" :span="5" class="gift-card">
                <GiftPanel 
                  :spinValue="spinPair.spinValue" 
                  :curIndex="spinPair.curIndex" 
                  @remove-custom-spin="removeCustomSpin"/>
              </a-col>
            </a-row>
          </div>
        </div>

        <div class="form-item">
          <div class="label">赠送机制</div>
          <div class="checkbox-group">
            <a-checkbox value="All" @change="handleAllusers">新用户注册</a-checkbox>
            <a-checkbox value="Noble" @change="handleNobleusers">绑定手机号用户</a-checkbox>
            <a-checkbox value="Noble" @change="handleNobleusers">绑定邮箱用户</a-checkbox>
            <a-checkbox value="Noble" @change="handleNobleusers">认证用户</a-checkbox>
            <a-checkbox value="Noble" @change="handleNobleusers">首充用户</a-checkbox>
            <a-checkbox value="Noble" @change="handleNobleusers">首次消费用户</a-checkbox>
          </div>
        </div>

        <div class="form-item">
          <div class="label">审核机制</div>
          <div class="checkbox-group">
            <a-checkbox value="All" @change="handleAllusers">同IP审核</a-checkbox>
            <a-checkbox value="Noble" @change="handleNobleusers">同设备审核</a-checkbox>
          </div>
        </div>

        <!-- Center Aligned Save Button -->
        <a-form-item class="save-button">
          <a-button type="primary" class="save-btn">保存</a-button>
        </a-form-item>
      </a-col>
    </div>
  </a-card>
</template>

<script setup lang="jsx">
import { ref } from 'vue';
import CustomSpin from '@/components/Form/Custom/CustomSpin.vue';
import GiftPanel from '@/components/Form/GiftPanel.vue';

const emit = defineEmits(['back'])  // Define the 'back' event

const spin_value1 = ref(0);
const imageUrl = ref('');
const bannerUrl = ref('');
const uploadUrl = `${import.meta.env.VITE_API_HOST}/api/v1/upload/resource`;
const uploadHeaders = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};
const spinCards = ref([
  { curIndex: 0, name: 'Gift 1', icon: '🎁', spinValue: 0 },
]);

const addCustomSpin = () => {
  const newId = spinCards.value.length;
  spinCards.value.push({
    curIndex: newId,
    name: `Gift ${newId}`,
    icon: '🎁',
    spinValue: 0,
  });
};

const removeCustomSpin = (curIndex) => {
  spinCards.value.splice(curIndex, 1);
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

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error({
      content: 'You can only upload JPG/PNG file!',
      duration: 2,
    });
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error({
      content: 'Image must smaller than 2MB!',
      duration: 2,
    });
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
    message.error({
      content: '上传失败。',
      duration: 2,
    });
  }
};

const uploadData = () => {
  return { type: 1 };
};
</script>

<style scoped>
.card-title {
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

.title-text {
  flex-grow: 1;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.form-container {
  display: flex;
  justify-content: center;
}

.form-column {
  width: 100%;
  max-width: 900px;
}

.form-item {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}

.label {
  flex: 1;
  font-weight: bold;
  text-align: right;
  padding-right: 10px;
  margin-right: 15px;
}

.input-container {
  width: 75%;
}

.input-field {
  text-align: center;
  width: 75%;
}

.checkbox-group {
  width: 75%;
}

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

.image {
  width: 100%;
  height: auto;
}

.upload-text {
  margin-top: 8px;
  font-size: 10px;
}

.note {
  color: darkgray;
  font-size: 10px;
  text-align: left;
  margin-top: 5px;
}

.gift-row {
  margin-bottom: 15px;
}

.spin-control {
  width: 60%;
  margin-bottom: 5px;
}

.add-gift-button {
  margin-right: 20px;
}

.save-button {
  text-align: center;
  margin: 30px;
}

.save-btn {
  width: 200px;
}
</style>
