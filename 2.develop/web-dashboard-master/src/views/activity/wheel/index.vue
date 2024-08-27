<template>
  <a-card style="width: 350px; border-radius: 0px;">
    <a-card style="width: 300px; border: 1px solid grey; border-radius: 16px; margin: auto;">
      <!-- Row with centered "您的奖金" and right-aligned "记录" -->
      <a-row align="middle" >
        <!-- Centered "您的奖金" -->
        <h3 style="font-size: 13px; text-align: center; width: 100%;">您的奖金</h3>
        <!-- Right-aligned "记录" with border -->
        <h3 style="font-size: 13px; border: 1px solid gray; position: absolute; right: 0; top: 0; margin-top: 10%; ">记录</h3>
      </a-row>

      <a-row justify="center" align="bottom">
        <h1 style="font-size: 14px; margin-bottom: 4%; margin-right: 2%;">¥</h1>
        <h1 style="font-size: 40px; font-weight: bold; margin: 0;">998.88</h1>
      </a-row>
      
      <a-row justify="center" align="middle" style="margin-bottom: 8px;">
        <span>离1000元提现仅差1.12元</span>
      </a-row>
      <a-progress percent="99.88" show-info="false" style="margin-bottom: 16px;" />

      <!-- 3x3 Grid Layout -->
      <a-row gutter="6">
        <a-col span="8">
          <div style="margin-bottom: 7%; font-size: 13px; border: 1px solid gray; height: 80px; display: flex; justify-content: center; align-items: center;">
            <span>随机金额</span>
          </div>
        </a-col>
        <a-col span="8">
          <div style="margin-bottom: 7%; font-size: 13px; border: 1px solid gray; height: 80px; display: flex; justify-content: center; align-items: center;">
            <span>0.18元</span>
          </div>
        </a-col>
        <a-col span="8">
          <div style="margin-bottom: 7%; font-size: 13px; border: 1px solid gray; height: 80px; display: flex; justify-content: center; align-items: center;">
            <span>随机金额</span>
          </div>
        </a-col>
        <a-col span="8">
          <div style="margin-bottom: 7%; font-size: 13px; border: 1px solid gray; height: 80px; display: flex; justify-content: center; align-items: center;">
            <span>谢谢参与</span>
          </div>
        </a-col>
        <a-col span="8">
          <a-row style="margin-bottom: 7%; font-size: 13px; border: 1px solid gray; height: 80px; display: flex; justify-content: center; align-items: center;">
            <span>抽奖</span>
            <span>(剩余1次)</span>
          </a-row>
        </a-col>
        <a-col span="8">
          <div style="margin-bottom: 7%; font-size: 13px; border: 1px solid gray; height: 80px; display: flex; justify-content: center; align-items: center;">
            <span>0.28元</span>
          </div>
        </a-col>
        <a-col span="8">
          <div style="margin-bottom: 7%; font-size: 13px; border: 1px solid gray; height: 80px; display: flex; justify-content: center; align-items: center;">
            <span>立即提现</span>
          </div>
        </a-col>
        <a-col span="8">
          <div style="margin-bottom: 7%; font-size: 13px; border: 1px solid gray; height: 80px; display: flex; justify-content: center; align-items: center;">
            <span>随机金额</span>
          </div>
        </a-col>
        <a-col span="8">
          <div style="margin-bottom: 7%; font-size: 13px; border: 1px solid gray; height: 80px; display: flex; justify-content: center; align-items: center;">
            <span>神秘奖金</span>
          </div>
        </a-col>
      </a-row>

      <a-row justify="center" align="middle" style="margin-top: 10px;">
        <a-button type="primary" ghost block style="font-size: 13px; height: 40px;">邀请好友获得助力</a-button>
      </a-row>
      <a-row justify="center" align="middle" style="margin-top: 8px;">
        <span style="color: grey; font-size: 13px;">2天21:36:55后奖金失效</span>
      </a-row>

    </a-card>
    
    <!-- 'X' button -->
    <div style="position: absolute; bottom: 0px; left: 50%; transform: translateX(-50%); z-index: 2;">
      <a-button shape="circle" style="background: #f5222d; color: white; border: none;">X</a-button>
    </div>

  </a-card>
</template>

<script>
export default {
  name: "BonusCard",
};
</script>

<style scoped>
h3 {
  font-size: 18px;
  color: #333;
}
</style>
