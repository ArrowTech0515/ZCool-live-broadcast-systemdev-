
export default function (fApi: Ref<Api>) {

  return [
    {
      type: 'input',
      field: 'group_name',
      title: '分组名称',
      effect: {
        required: true,
      },
    },
    {
      type: 'input',
      field: 'member_count',
      title: '会员人数',
      effect: {
        required: true,
      },
    },
    {
      type: 'select',
      field: 'recharge_strategy',
      title: '充值策略',
      effect: {
        required: true,
      },
    },
    {
      type: 'select',
      field: 'withdrawal_strategy',
      title: '提现策略',
      effect: {
        required: true,
      },
    },
    {
      type: 'select',
      field: 'rebate_strategy',
      title: '返水策略',
      effect: {
        required: true,
      },
    },
    {
      type: 'input',
      field: 'max_cashback_amount',
      title: '最高返现金额',
      effect: {
        required: true,
      },
    },
    {
      type: 'input',
      field: 'remarks',
      title: '备注',
      effect: {
        required: true,
      },
    },
  ]
}
