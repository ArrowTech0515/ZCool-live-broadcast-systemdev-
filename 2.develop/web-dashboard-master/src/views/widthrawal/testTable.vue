<template>
  <a-card>
    <a-table :dataSource="dataSource" :columns="columns" bordered pagination="false" />
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '扫描项',
          dataIndex: 'scanItem',
          key: 'scanItem',
        },
        {
          title: '评级',
          dataIndex: 'rating',
          key: 'rating',
          scopedSlots: { customRender: 'rating' },
        },
        {
          title: '评分',
          dataIndex: 'score',
          key: 'score',
          scopedSlots: { customRender: 'score' },
        },
        {
          title: '说明',
          dataIndex: 'description',
          key: 'description',
        },
      ],
      dataSource: [
        {
          key: '1',
          scanItem: '用户绑定的手机号注册多少账号',
          rating: '二级',
          score: -15,
          description: '同手机, 8',
        },
        {
          key: '2',
          scanItem: '用户绑定的银行卡有多少张',
          rating: '一级',
          score: -10,
          description: '6',
        },
        {
          key: '3',
          scanItem: '绑定银行卡名字与昵称是否一致',
          rating: '是',
          score: 0,
          description: '杜程龙x1',
        },
        {
          key: '4',
          scanItem: '注册/登录、手机号绑定、银行卡绑定的全渠道账号登录地是否一致',
          rating: '是',
          score: 0,
          description: '是',
        },
        {
          key: '5',
          scanItem: '绑定此手机号的其他账号被拉黑数量',
          rating: '0',
          score: 0,
          description: '1',
        },
        {
          key: '6',
          scanItem: '绑定此银行卡的其他账号被拉黑数量',
          rating: '0',
          score: 0,
          description: '0',
        },
      ],
    };
  },
};
</script>

<style scoped>
.a-table-thead > tr > th {
  background-color: #f5f7fa;
}

.a-table {
  width: 100%;
}
</style>
