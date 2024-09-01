<script setup lang="jsx">
import { Row, Col, Divider } from 'ant-design-vue';

const data = [
  { value: 73857, label: '当前收益' },
  { value: 73857, label: '观看人数' },
  { value: 73857, label: '送礼人数' },
  { value: 73857, label: '新增的签约' },
  { value: 73857, label: '新增关注' },
  { value: 73857, label: '新增点赞' },
];

</script>

<template>
  <a-card style="width: 100%; padding: 20px; margin-bottom: 1%">
    <a-row type="flex" justify="space-between" align="middle">
      <a-col
        v-for="(item, index) in data"
        :key="index"
        style="text-align: center"
      >
        <div style="font-size: 24px; font-weight: bold;">{{ item.value }}</div>
        <div style="margin-top: 10px;">{{ item.label }}</div>
        <Divider type="vertical" v-if="index < data.length - 1" />
      </a-col>
    </a-row>
  </a-card>
</template>

<style scoped>
a-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
