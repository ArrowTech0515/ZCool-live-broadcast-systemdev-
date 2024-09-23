export default function (fApi: Ref<Api>) {
  const commonLabelCol = { span: 4 }
  const wrapperCol = { span: 12 }

  return [
    {
      type: 'input',
      field: 'performanceRange',
      title: '业绩区间',
      props: {
        placeholder: '请输入业绩区间',
      },
      wrap: {
        labelCol: commonLabelCol,
      },
    },
    {
      type: 'input',
      field: 'effectivePeople',
      title: '有效人数',
      props: {
        placeholder: '请输入有效人数',
      },
      wrap: {
        labelCol: commonLabelCol,
      },
    },
    {
      type: 'input',
      field: 'lottery',
      title: '彩票',
      props: {
        placeholder: '请输入彩票',
      },
      wrap: {
        labelCol: commonLabelCol,
      },
    },
    {
      type: 'input',
      field: 'sports',
      title: '体育',
      props: {
        placeholder: '请输入体育',
      },
      wrap: {
        labelCol: commonLabelCol,
      },
    },
    {
      type: 'input',
      field: 'electronic',
      title: '电子',
      props: {
        placeholder: '请输入电子',
      },
      wrap: {
        labelCol: commonLabelCol,
      },
    },
    {
      type: 'input',
      field: 'chess',
      title: '棋牌',
      props: {
        placeholder: '请输入棋牌',
      },
      wrap: {
        labelCol: commonLabelCol,
      },
    },
    {
      type: 'input',
      field: 'fishing',
      title: '捕鱼',
      props: {
        placeholder: '请输入捕鱼',
      },
      wrap: {
        labelCol: commonLabelCol,
      },
    },
    {
      type: 'input',
      field: 'vision',
      title: '视讯',
      props: {
        placeholder: '请输入视讯',
      },
      wrap: {
        labelCol: commonLabelCol,
      },
    },
    {
      type: 'input',
      field: 'save',
      title: '存款',
      props: {
        placeholder: '请输入存款',
      },
      wrap: {
        labelCol: commonLabelCol,
      },
    },
    {
      type: 'input',
      field: 'fixedFee',
      title: '固定手续费',
      props: {
        placeholder: '请输入固定手续费',
      },
      wrap: {
        labelCol: commonLabelCol,
      },
    },
    {
      type: 'input',
      field: 'proportionalFee',
      title: '比例手续费',
      props: {
        placeholder: '请输入比例手续费',
      },
      wrap: {
        labelCol: commonLabelCol,
      },
    },
  ]
}
