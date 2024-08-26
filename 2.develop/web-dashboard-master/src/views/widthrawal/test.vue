<template>
  <a-modal
    title="添加奖励"
    v-model:visible="isModalVisible"
    :footer="null"
  >
    <a-form-item label="奖励类型">
      <a-radio-group v-model:value="rewardType">
        <a-radio value="diamond">钻石奖励</a-radio>
        <a-radio value="balance">余额奖励</a-radio>
        <a-radio value="gift">礼物奖励</a-radio>
        <a-radio value="mount">坐骑奖励</a-radio>
      </a-radio-group>
    </a-form-item>

    <!-- Conditionally render the CustomSpin component if '钻石奖励' is selected -->
    <a-form-item v-if="rewardType === 'diamond'" label="奖励钻石">
      <CustomSpin v-model:value="diamondCount" style="width: 100%;" />
      <div>
        <span style="font-size: 10px; color: grey;">请输入奖励的钻石</span>
      </div>
    </a-form-item>

    <!-- Conditionally render the table if '坐骑奖励' is selected -->
    <a-form-item v-if="rewardType === 'mount'">
      <a-table :dataSource="mountOptions" :pagination="false" bordered>
        <a-table-column title="选择坐骑" dataIndex="name" key="name" align="center" />
        <a-table-column
          title="状态"
          key="status"  
          align="center"
        >
          <template #default="{ record }">
            <a-radio :checked="selectedMount === record.key" @change="onMountSelect(record.key)" />
          </template>
        </a-table-column>
      </a-table>
    </a-form-item>

    <!-- Custom Footer -->
    <div class="custom-footer">
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="handleOk">确定</a-button>
    </div>
  </a-modal>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Modal, Radio, Button, Table } from 'ant-design-vue';
import CustomSpin from '@/components/Form/Custom/CustomSpin.vue';

export default defineComponent({
  components: {
    'a-modal': Modal,
    'a-radio-group': Radio.Group,
    'a-radio': Radio,
    'a-button': Button,
    'a-table': Table,
    'a-table-column': Table.Column,
    CustomSpin,
  },
  setup() {
    const isModalVisible = ref(true);
    const rewardType = ref('diamond');
    const diamondCount = ref(0);
    const mountOptions = ref([
      { name: '绚丽机车', key: '1' },
      { name: '跑车', key: '2' },
      { name: '飞机', key: '3' },
      { name: '神兽麒麟', key: '4' },
    ]);
    const selectedMount = ref(null);

    const handleOk = () => {
      console.log('OK Clicked', rewardType.value);
      isModalVisible.value = false;
    };

    const handleCancel = () => {
      console.log('Cancel Clicked');
      isModalVisible.value = false;
    };

    const onMountSelect = (key) => {
      selectedMount.value = key;
    };

    return {
      isModalVisible,
      rewardType,
      diamondCount,
      mountOptions,
      selectedMount,
      handleOk,
      handleCancel,
      onMountSelect,
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

.custom-footer {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.custom-footer .ant-btn {
  margin: 0 8px;
}
</style>
