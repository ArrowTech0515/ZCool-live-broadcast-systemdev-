<template>
  <a-card bordered class="custom-card" :style="{background: 'rgb(242,242,242)'}">
    <a-row :gutter="16"  type="flex" >
      <span :span="4" class="label" :style="{marginLeft:'20px',marginRight:'20px', writingMode: 'vertical-rl', textAlign: 'center' }">基础数据</span>
      
      <!-- Separator -->
      <a-col :flex="auto">
        <a-divider type="vertical" :style="{background: 'gray', height: '100%', margin: 'auto 10' }" />
      </a-col>
      
      <!-- First Column -->
      <a-col :span="8" class="first-column" :style="{ marginLeft:'25px' }">
        <a-row class="row">
          <a-col :span="10" class="label">收款货币:</a-col>
          <a-col :span="14" class="value">印尼盾</a-col>
        </a-row>

        <a-row class="row">
          <a-col :span="10" class="label">提现金额:</a-col>
          <a-col :span="14" class="value">1000</a-col>
        </a-row>

        <a-row class="row">
          <a-col :span="10" class="label">预计到账金额:</a-col>
          <a-col :span="14" class="value">1000000（印尼盾）</a-col>
        </a-row>

        <a-row class="row">
          <a-col :span="10" class="label">提现银行:</a-col>
          <a-col :span="14" class="value">印尼国家发展银行</a-col>
        </a-row>

        <a-row class="row">
          <a-col :span="10" class="label">收款姓名:</a-col>
          <a-col :span="14" class="value">张三</a-col>
        </a-row>

        <a-row class="row">
          <a-col :span="10" class="label">申请时间:</a-col>
          <a-col :span="14" class="value">2022-12-12 12:21:21</a-col>
        </a-row>
      </a-col>

      <!-- Detail Button Column -->
      <a-col :flex="auto" class="button-column"
            :style="{ marginRight:'25px' }">
        <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
          <span> </span>
          <span> </span>
          <span> </span>
          <a-button style="font-size: 9px" type="link" size="small" @click="copyText(line)">详情</a-button>
          <a-button style="font-size: 9px;" type="link" size="small" @click="copyText(line)">复制</a-button>
        </div>
      </a-col>

      <!-- Second Column -->
      <a-col :span="8" class="second-column" :style="{ marginLeft:'25px' }">
        <a-row class="row">
          <a-col :span="10" class="label">房间号:</a-col>
          <a-col :span="14" class="value copy" @click="copyText('500001')">500001</a-col>
        </a-row>

        <a-row class="row">
          <a-col :span="10" class="label">登录IP:</a-col>
          <a-col :span="14" class="value">123.321.213.231</a-col>
        </a-row>

        <a-row class="row">
          <a-col :span="10" class="label">最近登录时间:</a-col>
          <a-col :span="14" class="value">2022-12-12 12:21:21</a-col>
        </a-row>
      </a-col>

      <!-- Buttons Column -->
      <a-col :flex="auto" class="button-column">
        <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center; height: 100%;">
          <a-button style="font-size: 9px;" type="link" size="small" @click="copyText(line)">复制</a-button>
          <a-button style="font-size: 9px;" type="link" size="small" @click="copyText(line)">详情</a-button>
        </div>
      </a-col>


    </a-row>
  </a-card>
</template>

<script>
</script>

  