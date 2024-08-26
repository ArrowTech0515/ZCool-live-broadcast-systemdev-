<template>
  <a-modal
    title="添加奖励"
    v-model:visible="isModalVisible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form-item label="角色类型">
      <a-radio-group v-model="rewardType">
        <a-radio value="diamond">钻石奖励</a-radio>
        <a-radio value="balance">余额奖励</a-radio>
        <a-radio value="gift">礼物奖励</a-radio>
        <a-radio value="mount">坐骑奖励</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item label="奖励钻石">
      <CustomSpin
        v-model:nValue="diamondCount"
        style="width: 100%;"
      />
      <div>
        <span style="font-size: 10px; color: grey;">请输入奖励的钻石</span>
      </div>
    </a-form-item>
  </a-modal>
</template>

<script>
import { Modal, Radio } from 'ant-design-vue';

export default defineComponent({
  components: {
    'a-modal': Modal,
    'a-radio-group': Radio.Group,
    'a-radio': Radio,
  },
  setup() {
    const isModalVisible = ref(true);
    const rewardType = ref('diamond');
    const diamondCount = ref(0);

    console.log("test : diamondCount = " + diamondCount.value)

    const handleOk = () => {
      console.log('OK Clicked');
      isModalVisible.value = false;
    };

    const handleCancel = () => {
      console.log('Cancel Clicked');
      isModalVisible.value = false;
    };

    return {
      isModalVisible,
      rewardType,
      diamondCount,
      handleOk,
      handleCancel,
    };
  },
});
</script>

<style scoped>
.ant-modal-header {
  text-align: center;
}

.ant-modal-title {
  font-weight: bold;
  color: #FFD700; /* Yellow color */
}

.ant-radio-group {
  display: flex;
  justify-content: space-around;
}

.ant-input-number-group-wrapper {
  width: 100%;
}

.ant-modal-footer {
  display: flex;
  justify-content: center;
}

.ant-btn {
  margin: 0 8px;
}
</style>
