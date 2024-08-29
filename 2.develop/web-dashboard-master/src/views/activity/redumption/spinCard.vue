<template>
    
    <a-card
             :bordered="true" style="background-color: rgb(242, 242, 242); 
                      border-color: lightgrey; display: flex; align-items: center; width: 49%;">

                  <a-row style="flex: 1; display: flex; align-items: center;">
                    <a-col style="flex: 1; display: flex; flex-direction: column; align-items: center; margin-right: 10px">
                      <CustomSpin v-model:nValue="spin_value1" style="flex: 1; margin-bottom: 5px;"></CustomSpin>
                      <span style="text-align: center; font-size: 10px;">充值金额</span>
                    </a-col>
                    <a-col style="flex: 1; display: flex; flex-direction: column; align-items: center;">
                      <CustomSpin v-model:nValue="spin_value2" style="flex: 1; margin-bottom: 5px;"></CustomSpin>
                      <span style="text-align: center; font-size: 10px;">赠送金额</span>
                    </a-col>
                    <a-button 
                      type="link" 
                      @click="removeCustomSpin(rowIndex * 2)"
                      style="margin-left: 10px; color: grey;"><MinusCircleOutlined/></a-button>
                  </a-row>

                </a-card>
</template>