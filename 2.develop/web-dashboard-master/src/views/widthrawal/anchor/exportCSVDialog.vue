<template>
  <a-modal
    title="导出CSV"
    v-model:visible="isModalVisible"
    maskClosable="false"
    keyboard="false"
    :footer="null"
    style="align-items: center"
    @update:visible="updateVisible"
  >
    <a-form-item label="导出对象">
      <a-row>
        <a-radio-group v-model:value="rewardType" style="align-items: center;">
          <a-radio value="diamond">全部</a-radio>
          <a-radio value="balance">自定义主播</a-radio>
        </a-radio-group>
        <a-input placeholder="请选择主播" style="text-align: center; width:150px;"></a-input>
      </a-row>
    </a-form-item>
    <a-form-item label="提现类型">
      <a-row>
        <a-radio-group v-model:value="rewardType" style="align-items: center;">
          <a-radio value="doing">提现中</a-radio>
          <a-radio value="failed">提现失败</a-radio>
          <a-radio value="success">提现成功</a-radio>
        </a-radio-group>
      </a-row>
    </a-form-item>
    <a-form-item label="导出时间">
      <a-row>
        <a-radio-group v-model:value="rewardType" style="align-items: center;">
          <a-radio value="diamond">全部时间</a-radio>
          <a-radio value="balance">自定义时间</a-radio>
        </a-radio-group>
        <a-range-picker 
              :placeholder="['开始日期', '结束日期']"
              style="width:200px; text-align: center;"
            />
      </a-row>
    </a-form-item>

    <!-- Custom Footer -->
    <div class="custom-footer">
      <a-button style="width: 120px; margin-right: 30px;" @click="handleCancel">取消</a-button>
      <a-button style="width: 120px;" type="primary" @click="handleOk">确定</a-button>
    </div>
  </a-modal>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Modal, Radio, Button, Table } from 'ant-design-vue';

export default defineComponent({
  components: {
    'a-modal': Modal,
    'a-radio-group': Radio.Group,
    'a-radio': Radio,
    'a-button': Button,
  },
  props: {
    isModalVisible: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:isModalVisible'],

  setup(props, { emit }) {
    const updateVisible = (visible) => {
      if (typeof visible === 'boolean') {
        emit('update:isModalVisible', visible);
      } else {
        console.error('Invalid value for isModalVisible:', visible);
      }
    }
    
    const rewardType = ref('diamond');
    const diamondCount = ref(0);
    const balanceCount = ref(0);
    const mountOptions = ref([
      { name: '绚丽机车', key: '1' },
      { name: '跑车', key: '2' },
      { name: '飞机', key: '3' },
      { name: '神兽麒麟', key: '4' },
    ]);
    const giftOptions = ref([
      { name: '鲜花', value: 1, key: '1' },
      { name: '灯牌', value: 1, key: '2' },
      { name: '爱心', value: 1, key: '3' },
      { name: '城堡', value: 10000, key: '4' },
      { name: '蓝色妖姬', value: 666, key: '5' },
    ]);

    const selectedMount = ref(null);
    const selectedGifts = ref([]);

    const handleOk = () => {
      console.log('OK Clicked', rewardType.value);
      updateVisible(false);
    };

    const handleCancel = () => {
      console.log('Cancel Clicked');
      updateVisible(false);
    };

    const onMountSelect = (key) => {
      selectedMount.value = key;
    };

    const onGiftSelect = (key) => {
      if (selectedGifts.value.includes(key)) {
        selectedGifts.value = selectedGifts.value.filter(k => k !== key);
      } else {
        selectedGifts.value.push(key);
      }
    };

    return {
      updateVisible,
      rewardType,
      diamondCount,
      balanceCount,
      mountOptions,
      giftOptions,
      selectedMount,
      selectedGifts,
      handleOk,
      handleCancel,
      onMountSelect,
      onGiftSelect,
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
