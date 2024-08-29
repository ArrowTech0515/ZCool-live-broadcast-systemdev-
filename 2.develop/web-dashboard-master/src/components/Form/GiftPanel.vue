<template>
  <div 
      class="spinCard"  
      style="border: 1px solid lightgray; height: 140px; width: 120px;
              border-radius: 5px; color: darkgray; 
              display: flex; flex-direction: column;">

      <a-row
          style="align-items: center; width: 100%; border: 1px solid darkgray; border-radius: 5px; color: darkgray;">
          <div style="margin-left: 16px; color: darkgray; flex: 1; text-align: center;">
              <span style="font-size: 10px;">{{ name }}</span>
          </div>
          <div style="display: flex; align-items: center; white-space: nowrap;">
              <a-button 
                  type="link" 
                  @click="handleRemoveSpin"
                  style="padding: 0%; color: grey;"><MinusCircleOutlined/>
              </a-button>
          </div>
      </a-row>

      <div style="flex-grow: 1; display: flex; align-items: center; justify-content: center;">
        <a-image 
          :src="imageUrl"
          alt="Gift Image" class="gift-image"/>
      </div>
      <CustomSpin v-model:nValue="this.spinValue" style="margin-top: auto;"></CustomSpin>
  </div>
</template>

<script>
//https://aliyuncdn.antdv.com/logo.png
export default {
name: 'GiftPanel',
props: {
  spinValue: {
    type: Number,
    required: true
  },
  curIndex: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
},
emits: ['removeCustomSpin'],
methods: {
  handleRemoveSpin() {
      console.log("handleRemoveSpin : " + this.curIndex)
    this.$emit('removeCustomSpin', this.curIndex)
  }
}
}
</script>

<style scoped>
.gift-image {
  width: 50px; /* Adjust size as needed */
  height: 50px;
}
/* Other styles */
</style>