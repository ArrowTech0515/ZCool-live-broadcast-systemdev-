export default [
  {
    type: 'input',
    field: 'original_address',
    title: '原地址',
    value: '链接地址',
    props: {
      disabled: true,
    },
  },
  {
    type: 'input',
    field: 'current_address',
    title: '当前地址',
    value: '应用程序://网页?popRoot=0',
    props: {
      disabled: true,
    },
  },
  {
    type: 'input',
    field: 'target',
    title: '目标',
    value: '0',
    props: {
      disabled: true,
      type: 'number',
    },
  },
  {
    type: 'input',
    field: 'title',
    title: '标题',
    effect: {
      required: true,
    },
    props: {
      placeholder: '填写活动标题，不填为无APP标题栏',
    }
  },
  {
    type: 'input',
    field: 'link_address',
    title: '链接地址',
    effect: {
      required: true,
    },
    props: {
      placeholder: '输入您需要跳转链接',
    }
  },
  {
    type: 'input',
    field: 'back_means_exit',
    title: '回退即退出',
    value: '0',
    effect: {
      required: true,      
    },
    props: {
      type: 'number',
    }
  },
]
