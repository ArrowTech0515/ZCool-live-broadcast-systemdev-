import { h } from 'vue'; // Make sure you import 'h' if not already done

export default function (item: any, fApi: Ref<Api>) {
  const commonLabelCol = { span: 6 };
  const wrapperCol = { span: 18 };

  return [
    // Base Settings Section
    {
      type: 'input',
      field: 'lowestOdds',
      title: '最低赔率',
      props: {
        placeholder: '请输入最低赔率',
      },
      wrap: {
        labelCol: commonLabelCol,
        wrapperCol: wrapperCol,
      },
    },
    {
      type: 'input',
      field: 'standardOdds',
      title: '基准赔率',
      props: {
        placeholder: '请输入基准赔率',
      },
      wrap: {
        labelCol: commonLabelCol,
        wrapperCol: wrapperCol,
      },
    },
    {
      type: 'input',
      field: 'rebateBaseRate',
      title: '返点影响系数',
      props: {
        placeholder: '请输入返点影响系数',
      },
      wrap: {
        labelCol: commonLabelCol,
        wrapperCol: wrapperCol,
      },
    },
    // Rebate Level Settings Table
    {
      type: 'title',
      field: 'rebateTitle',
      content: '返点等级设置',
    },
    {
      type: 'table',
      field: 'rebateTable',
      columns: [
        { title: '返点等级', dataIndex: 'rebateLevel', width: '25%' },
        { title: '返点', dataIndex: 'rebateValue', width: '25%' },
        { title: '对应赔率', dataIndex: 'correspondingOdds', width: '25%' },
        {
          title: '操作',
          dataIndex: 'action',
          width: '25%',
          customRender: () => 
            h(
              'span',
              {
                style: { color: 'red', cursor: 'pointer' },
              },
              '删除'
            ),
        },
      ],
      data: [
        {
          rebateLevel: '1',
          rebateValue: '3',
          correspondingOdds: '1.2',
        },
      ],
    },
    {
      type: 'button',
      field: 'addLevelBtn',
      title: '',
      props: {
        type: 'primary',
        text: '新增等级',
      },
    },
    // Applicable Game Types Section
    {
      type: 'title',
      field: 'gameTypeTitle',
      content: '适用游戏类型',
    },
    {
      type: 'checkbox-group',
      field: 'gameTypes',
      options: [
        { label: '彩票(默认)', value: 'lottery', checked: true },
        { label: '体育', value: 'sports' },
        { label: '真人', value: 'live' },
        { label: '电子游戏', value: 'electronic' },
      ],
    },
    // Agent Tier Settings Table
    {
      type: 'title',
      field: 'agentTierTitle',
      content: '代理层级设置',
    },
    {
      type: 'table',
      field: 'agentTierTable',
      columns: [
        { title: '层级', dataIndex: 'level', width: '25%' },
        { title: '层级名称', dataIndex: 'levelName', width: '25%' },
        { title: '默认返点%', dataIndex: 'defaultRebate', width: '25%' },
        {
          title: '操作',
          dataIndex: 'action',
          width: '25%',
          customRender: () => 
            h(
              'span',
              {
                style: { color: 'red', cursor: 'pointer' },
              },
              '删除'
            ),
        },
      ],
      data: [
        {
          level: '1',
          levelName: '第一层代理',
          defaultRebate: '0.1',
        },
        {
          level: '2',
          levelName: '第二层代理',
          defaultRebate: '0.05',
        },
      ],
    },
    {
      type: 'button',
      field: 'addAgentTierBtn',
      title: '',
      props: {
        type: 'primary',
        text: '新增层级',
      },
    },
    // Settlement Period Section
    {
      type: 'title',
      field: 'settlementPeriodTitle',
      content: '结算周期',
    },
    {
      type: 'radio-group',
      field: 'settlementPeriod',
      options: [
        { label: '每月', value: 'monthly' },
        { label: '每周', value: 'weekly' },
      ],
    },
  ];
}
