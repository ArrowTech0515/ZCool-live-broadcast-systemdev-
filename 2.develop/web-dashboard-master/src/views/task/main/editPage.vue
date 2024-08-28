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
          <div v-if="operationType === '添加'">
            <span style="font-size: 20px; font-weight: bold;">添加任务</span>
          </div>
          <div v-else>
            <span style="font-size: 20px; font-weight: bold;">编辑任务</span>
          </div>
        </div>
      </div>
    </template>

    <div style="display: flex; justify-content: center;">
      <a-col layout="vertical" style="width: 100%; max-width: 800px; white-space: nowrap;">

        <!-- Form Items Here -->
        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 20px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px; margin-right: 15px;">
            任务名称
          </div>
          <div style="width: 75%;">
            <div v-if="operationType === '添加'">
              <a-input 
                placeholder="请输入" 
                style="text-align: center; width: 75%;"
              />
            </div>
            <div v-else>
              <a-select v-model="taskList" value="all" style="width: 75%;">
                <a-select-option value="all">请选择任务</a-select-option>
                <a-select-option value="bindPhone">绑定手机号</a-select-option>
                <a-select-option value="bindEmail">绑定邮箱号</a-select-option>
                <a-select-option value="setAccountPassword">设置账号密码</a-select-option>
                <a-select-option value="loginApp">登录APP</a-select-option>
                <a-select-option value="shareLiveRoom">分享一次直播间</a-select-option>
                <a-select-option value="watch10LiveRooms">观看10个直播间</a-select-option>
                <a-select-option value="watch30LiveRooms">观看30个直播间</a-select-option>
                <a-select-option value="watch10Minutes">观看直播10分钟</a-select-option>
                <a-select-option value="watch30Minutes">观看直播30分钟</a-select-option>
                <a-select-option value="watch2Hours">观看直播2小时</a-select-option>
                <a-select-option value="send5Barrage">直播间弹幕发言5次</a-select-option>
                <a-select-option value="buyNoble">购买贵族</a-select-option>
                <a-select-option value="firstRecharge">首次充值</a-select-option>
                <a-select-option value="recharge100Yuan">充值100元</a-select-option>
                <a-select-option value="recharge1000Yuan">充值1000元</a-select-option>
                <a-select-option value="postBarrage">发布1条弹幕</a-select-option>
                <a-select-option value="exchangeDiamonds">兑换钻石</a-select-option>
                <a-select-option value="firstSpendDiamonds">首次消费钻石</a-select-option>
                <a-select-option value="spend10000Diamonds">消费钻石10000钻石</a-select-option>
                <a-select-option value="followStreamer">关注主播</a-select-option>
                <a-select-option value="joinStreamerFanClub">加入任意主播粉丝团</a-select-option>
              </a-select>
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; text-align: justify; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px;margin-right: 15px;">
            循环机制
          </div>
          <div style="width: 75%;">
            <a-row type="flex" align="middle" justify="space-between" style="width: 75%; white-space: nowrap;">
              <!-- Radio Group on the left -->
              <a-col :span="16">
                <a-radio-group v-model="radioValueCycle" style="text-align: left;">
                  <a-radio value="radio1" style="margin-right: 75px;">每日循环任务</a-radio>
                  <a-radio value="radio2">一次性任务</a-radio>
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
              <!-- Radio Group on the left -->
              <a-col :span="16">
                <a-radio-group v-model="radioValueUserType" style="text-align: left;">
                  <a-radio value="radio1">全部用户</a-radio>
                  <a-radio value="radio2">贵族用户</a-radio>
                  <a-radio value="radio3">新注册用户</a-radio>
                  <a-radio value="radio5">自定义用户</a-radio>
                </a-radio-group>
                <a-button type="primary" ghost style=" padding: 0%; width: 100px; text-align: center;">+ 选择用户</a-button>
              </a-col>
            </a-row>
          </div>
        </div>

        <div style="display: flex; align-items: flex-start; width: 100%; margin-bottom: 15px; white-space: nowrap;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px;margin-right: 15px;margin-top: 10px;">
            任务奖励
          </div>
          <div :flex="auto" style="width: 75%;">
            <a-row style="margin-bottom: 10px;">
              <a-radio-group
                  v-model="radioValueTaskType"
                  style="display: flex; align-items: center; justify-content: space-between;  width: 70%;">
                <a-radio value="radio1" style="margin-right: 10px;">钻石奖励</a-radio>
                <a-radio value="radio2" style="margin-right: 10px;">礼物奖励</a-radio>
                <!-- Conditionally displayed button -->
                <div v-if="operationType === '编辑'" style="margin-right: 10px;">
                    <a-button @click="onSelectGift">选择礼物</a-button>
                </div>
                <a-radio value="radio3">余额奖励</a-radio>
              </a-radio-group>
            </a-row>

            <div v-if="operationType === '编辑'">
              <a-row gutter="[16, 16]" style="width: 100%; ">
                <a-col
                  v-for="(spinPair, index) in spinCards"
                  :key="index"
                  :span="5" 
                  style="margin-bottom: 5px; display: flex; justify-content: center;">
                  
                  <GiftPanel 
                    :spinValue="spinPair.spinValue" 
                    :curIndex="spinPair.curIndex" 
                    :name="spinPair.name"
                    :icon="spinPair.icon"
                    @remove-custom-spin="removeCustomSpin"/>
                </a-col>
              </a-row>
            </div>
            <div v-else>
              <CustomSpin v-model:nValue="spin_value1" style="width: 60%; margin-bottom: 5px;"></CustomSpin>
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 20px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px;margin-right: 15px;">
            任务次数
          </div>
          <div style="width: 75%;">
            <a-row >
              <CustomSpin v-model:nValue="spin_value1" style="width: 60%;"></CustomSpin>
            </a-row>
          </div>
        </div>

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 20px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px;margin-right: 15px;">
            活动时间
          </div>
          <a-row type="flex" style="width: 75%;" align="middle">
            <a-col :span="10">
              <a-radio-group v-model="radioValueActivityTime">
                <a-radio value="radio1">永久有效</a-radio>
                <a-radio value="radio2">自定义时间</a-radio>
              </a-radio-group>
            </a-col>
            <a-col :span="8">
              <a-range-picker 
                :placeholder="['开始日期', '结束日期']"
              />
            </a-col>
          </a-row>
        </div>

        <!-- Center Aligned Save Button -->
        <a-form-item style="text-align: center; margin: 30px; white-space: nowrap;">
          <a-button style="width: 120px; margin-right: 30px;" @click="handleCancel">取消</a-button>
          <a-button style="width: 120px;" type="primary" @click="handleSave">确定</a-button>
        </a-form-item>

      </a-col>
    </div>

  </a-card>
  
  <SelectGiftDialog 
        :isModalVisible="isModalVisible"
      @update:is-modal-visible="val => isModalVisible = val" />

</template>

<script>
import CustomSpin from '@/components/Form/Custom/CustomSpin.vue'
// const uploadRule = createUploadRule('主播头像', 'avatar_url')
import GiftPanel from './GiftPanel.vue'
import SelectGiftDialog from './selectGiftDialog.vue'


export default {
  components: {
    CustomSpin,
    GiftPanel,
    SelectGiftDialog
  },
  props: {
    operationType: {
      type: String,
      default: '新增',
    },
  },
  data() {
    return {
      isModalVisible : false,

      radioValueTaskType: 'radio1',  // For Task Type Radio Group
      radioValueCycle: 'radio1',     // For Cycle Mechanism Radio Group
      radioValueUserType: 'radio1',  // For Participant User Type Radio Group
      radioValueActivityTime: 'radio1',  // For Activity Time Radio Group

      parentValue: '0', // Example initial value

      spin_value1: '0',

      spinCards: [
      { curIndex: 0, name: '礼物', icon: '🎁', spinValue: 0 },
      { curIndex: 1, name: '礼物', icon: '🎂', spinValue: 20 },
      { curIndex: 2, name: '礼物', icon: '🍫', spinValue: 15 },
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

    handleSave() {
    //  emit('save', props.formData)
      this.handleBack()
    },

    handleCancel() {
    //  updateVisible(false)
      this.handleBack()
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
    onSelectGift() {
      //this.editItem()
      console.log("handleOperation : " + this.isModalVisible.value)
      this.isModalVisible  = true
    }
  },
};
</script>

<style scoped>
</style>
