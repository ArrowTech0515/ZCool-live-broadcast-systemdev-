<template>
    <a-card style="width: 300px; border-radius: 16px;">
      <a-row justify="center" align="middle" style="margin-bottom: 16px;">
        <h3 style="font-size: 24px; margin: 0;">您的奖金</h3>
      </a-row>
      <a-row justify="center" align="middle" style="margin-bottom: 8px;">
        <h1 style="font-size: 40px; font-weight: bold; margin: 0;">¥ 998.88</h1>
      </a-row>
      <a-row justify="center" align="middle" style="margin-bottom: 8px;">
        <span>离1000元提现仅差1.12元</span>
      </a-row>
      <a-progress percent="99.88" show-info="false" style="margin-bottom: 16px;" />
      <a-row gutter="[16, 16]">
        <a-col span="8">
          <a-button block>随机金额</a-button>
        </a-col>
        <a-col span="8">
          <a-button block>0.18元</a-button>
        </a-col>
        <a-col span="8">
          <a-button block>随机金额</a-button>
        </a-col>
        <a-col span="8">
          <a-button block>谢谢参与</a-button>
        </a-col>
        <a-col span="8">
          <a-button block>抽奖(剩余1次)</a-button>
        </a-col>
        <a-col span="8">
          <a-button block>0.28元</a-button>
        </a-col>
        <a-col span="8">
          <a-button block type="primary">立即提现</a-button>
        </a-col>
        <a-col span="8">
          <a-button block>随机金额</a-button>
        </a-col>
        <a-col span="8">
          <a-button block>神秘奖金</a-button>
        </a-col>
      </a-row>
      <a-row justify="center" align="middle" style="margin-top: 16px;">
        <a-button type="link">邀请好友获得助力</a-button>
      </a-row>
      <a-row justify="center" align="middle" style="margin-top: 8px;">
        <span>2天21:36:55后奖金失效</span>
      </a-row>
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
  