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
          <span style="font-size: 20px; font-weight: bold;">活动编辑</span>
        </div>
      </div>
    </template>

    <div style="display: flex; justify-content: center;">
      <a-col layout="vertical" style="width: 100%; max-width: 900px; white-space: nowrap;">

        <!-- Form Items Here -->

        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px; margin-right: 15px;">
            活动名称
          </div>
          <div style="width: 75%;">
            <a-input 
              placeholder="" 
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
              placeholder="" 
              style="text-align: center; width: 75%;"
            />
            <div style="color: darkgray; font-size: 10px; text-align: left; margin-top: 5px;">
              用户不可见，仅后台用户可见
            </div>
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
    
        <div style="display: flex; align-items: center; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px; margin-right: 15px;">
            签到天数
          </div>
          <a-card 
            :bordered="true"
            style="width: 75%; background-color: rgb(242, 242, 242); border-color: lightgrey; display: flex; align-items: center; width: 49%;">
            <a-table :dataSource="dataSource" :pagination="false">
              <a-table-column 
                title="签到天数" dataIndex="col_1" key="col_1" align="center"></a-table-column>
              <a-table-column title="签到奖励" dataIndex="col_2" key="col_2" align="center"></a-table-column>

              <template #bodyCell="{ column, text }">
                <span v-if="column.dataIndex === 'col_2'">
                  <span style="text-decoration: underline;color: blue; cursor: pointer;" @click="handleOperation('col_2')">{{ text }}</span>
                </span>
                <!-- Default rendering for other columns -->
                <span v-else>{{ text }}</span>
              </template>

            </a-table>
          </a-card>
        </div>

        <div style="display: flex; align-items: center; text-align: justify; width: 100%; margin-bottom: 15px;">
          <div style="flex: 1; font-weight: bold; text-align: right; padding-right: 10px;margin-right: 15px;">
            参与用户
          </div>
          <div style="width: 75%;">
            <a-row type="flex" align="middle" justify="space-between" style="width: 75%; white-space: nowrap;">
              <!-- Radio Group on the left -->
              <a-col :span="16">
                <a-radio-group v-model="radioValue" style="text-align: left;">
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

        <!-- Center Aligned Save Button -->
        <a-form-item style="text-align: center; margin: 30px; white-space: nowrap;">
          <a-button type="primary" style="width: 200px;">保存</a-button>
        </a-form-item>

      </a-col>
    </div>

  </a-card>
</template>

<script>

export default {

  data() {
    return {
      parentValue: '0', // Example initial value
      radioValue: 'radio1', // Initial value for the radio group

      dataSource: [
        {
          key: '1',
          col_1: '1',
          col_2: 'XXXX礼物'
        },
        {
          key: '2',
          col_1: '2',
          col_2: '342钻石'
        },
        {
          key: '3',
          col_1: '3',
          col_2: '添加奖励'
        },
        {
          key: '4',
          col_1: '4',
          col_2: '添加奖励'
        },
        {
          key: '5',
          col_1: '5',
          col_2: '添加奖励'
        },
        {
          key: '6',
          col_1: '6',
          col_2: '添加奖励'
        },
        {
          key: '7',
          col_1: '7',
          col_2: '添加奖励'
        },
        
      ],
    };
  },

  computed: {

  },

  methods: {

    handleBack() {
      // Handle the back action here
      // For example, navigate to the previous page:
      this.$emit('back'); // Emit the back event to the parent component
    },
    handleOperation(operation) {
      // Add logic for handling the operation (e.g., audit, lock)
      if(operation === "col_2")
        this.showEditPage = true; // Switch to the add strategy view
      else
      {
        console.log("handleOperation : " + operation)
        this.showDataPage = true; // Switch to the add strategy view
      }  
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
  },
};
</script>

<style scoped>

</style>
