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
          <a-col :span="10" class="label">主播昵称:</a-col>
          <a-col :span="14" class="value">大小事</a-col>
        </a-row>

        <a-row class="row">
          <a-col :span="10" class="label">登录设备号:</a-col>
          <a-col :span="14" class="value">FHJ-32424</a-col>
        </a-row>

        <a-row class="row">
          <a-col :span="10" class="label">注册时间:</a-col>
          <a-col :span="14" class="value">2022-12-12 12:21:21</a-col>
        </a-row>
      </a-col>

      <!-- Detail Button Column -->
      <a-col :flex="auto" class="button-column"
            :style="{ marginRight:'25px' }">
        <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
          <a-button style="font-size: 9px" type="link" size="small" @click="copyText(line)">详情</a-button>
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

  