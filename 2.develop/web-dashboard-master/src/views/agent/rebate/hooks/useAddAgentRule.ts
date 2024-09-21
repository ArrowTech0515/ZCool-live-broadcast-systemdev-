export default function (fApi: Ref<Api>) {
  const commonLabelCol = { span: 10 }; // Consistent label column width
  const wrapperCol = { span: 14 }; // Adjust wrapper to align the content properly

  return [
    {
      type: 'group', // First row wrapped in a group
      children: [
        {
          type: 'a-row',
          children: [
            {
              type: 'a-col',
              props: { span: 12 }, // Set to half the row
              children: [
                {
                  type: 'input',
                  field: 'agentAccount',
                  title: '代理帐号', // Changed the label for clarity
                  props: {
                    placeholder: '请输入代理帐号',
                    value: 'tiktok999',
                  },
                  effect: {
                    required: true,
                  },
                  wrap: {
                    labelCol: commonLabelCol,
                    wrapperCol: wrapperCol,
                  },
                },
              ],
            },
            {
              type: 'a-col',
              props: { span: 12 }, // Empty col to keep the space consistent
              children: [], // No children means it's an empty space
            },
          ],
        },
      ],
    },
    {
      type: 'group', // Second row
      children: [
        {
          type: 'a-row',
          children: [
            {
              type: 'a-col',
              props: { span: 12 },
              children: [
                {
                  type: 'select',
                  field: 'rebateSetting',
                  title: '返點設置',
                  value: '一般代理模式A', // Example default value
                  props: {
                    placeholder: '请选择返點設置',
                  },
                  options: [
                    { label: '一般代理模式A', value: '一般代理模式A' },
                    { label: '一般代理模式B', value: '一般代理模式B' },
                    { label: '平行代理模式', value: '平行代理模式' },
                    { label: '全民代理模式', value: '全民代理模式' },
                  ],
                  wrap: {
                    labelCol: commonLabelCol,
                    wrapperCol: wrapperCol,
                  },
                },
              ],
            },
            {
              type: 'a-col',
              props: { span: 12 },
              children: [
                {
                  type: 'input',
                  field: 'superiorAgent',
                  title: '上级代理',
                  props: {
                    placeholder: '请输入上级代理',
                    value: 'john', // Example default value
                  },
                  wrap: {
                    labelCol: commonLabelCol,
                    wrapperCol: wrapperCol,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'group', // Third row wrapped in a group
      children: [
        {
          type: 'a-row',
          children: [
            {
              type: 'a-col',
              props: { span: 12 }, // Keep it half the row
              children: [
                {
                  type: 'switch',
                  field: 'yes_no',
                  title: '是否结算',
                  value: false, // Example value
                  wrap: {
                    labelCol: commonLabelCol,
                    wrapperCol: wrapperCol,
                  },
                },
              ],
            },
            {
              type: 'a-col',
              props: { span: 12 }, // Empty column for consistent layout
              children: [],
            },
          ],
        },
      ],
    },
  ];
}
