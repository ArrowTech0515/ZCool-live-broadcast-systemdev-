
export default function (fApi: Ref<Api>) {

  return [
    {
      type: 'input',
      field: 'group_name',
      title: '分组名称',
      props: {
        placeholder: '请输入分组名称',
      },
      effect: {
        required: true,
      },
    },
    // {
    //   type: 'input',
    //   field: 'member_count',
    //   title: '会员人数',
    //   props: {
    //     placeholder: '请输入分组名称',
    //   },
    //   effect: {
    //     required: true,
    //   },
    // },
    {
      type: 'select',
      field: 'group_members',
      title: '分组会员',
      options: [
        {label: 'KUY097', value: 1},
        {label: 'KUY100', value: 2},
      ],
      props: {
        mode: 'multiple',  // Enable multi-select
        //options: Object.keys(ENUM.discount_status).map(key => ({ label: ENUM.discount_status[key], value: parseInt(key) })),
        placeholder: '请选择分组会员',
      },
      effect: {
        required: true,
      },
    },
    {
      type: 'select',
      field: 'recharge_strategy',
      title: '充值策略',
      props: {
        placeholder: '请选择充值策略',
      },
      effect: {
        required: true,
      },
    },
    {
      type: 'select',
      field: 'withdrawal_strategy',
      title: '提现策略',
      props: {
        placeholder: '请选择提现策略',
      },
      effect: {
        required: true,
      },
    },
    {
      type: 'select',
      field: 'rebate_strategy',
      title: '返水策略',
      props: {
        placeholder: '请选择返水策略',
      },
      effect: {
        required: true,
      },
    },
    {
      type: 'input',
      field: 'max_cashback_amount',
      title: '最高返现金额',
      props: {
        placeholder: '请输入最高返现金额',
      },
      effect: {
        required: true,
      },
    },
    {
      type: 'input',
      field: 'remarks',
      title: '备注',
      props: {
        placeholder: '请输入备注',
      },
    },
  ]
}
