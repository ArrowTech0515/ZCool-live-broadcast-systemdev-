
export default function (fApi: Ref<Api>) {

  return [
    {
      type: 'select',
      field: 'member_account',
      title: '会员账号',
      props: {
        placeholder: '请选择',
      },
      effect: {
        required: true,
      }
    },
    {
      type: 'input',
      field: 'member_group',
      title: '会员分组',
      props: {
        placeholder: '请输入会员分组',
      },
      effect: {
        required: true,
      }
    },
    {
      type: 'select',
      field: 'order_number',
      title: '订单号',
      props: {
        placeholder: '请选择订单号',
      },
      effect: {
        required: true,
      }
    },
    {
      type: 'input',
      field: 'inc_dec_amount',
      title: '增减金额',
      props: {
        placeholder: '请输入增减金额',
      },
      effect: {
        required: true,
      }
    },
    {
      type: 'input',
      field: 'points',
      title: '积分',
      props: {
        placeholder: '请输入积分',
      },
      effect: {
        required: true,
      }
    },
    {
      type: 'input',
      field: 'remark',
      title: '备注',
      props: {
        placeholder: '请输入',
        type: 'textarea',
      },
    },
    {
      type: 'rangePicker',
      field: 'query_time',
      title: '查询区间',
      props: {
        format: 'YYYY-MM-DD',
        valueFormat: 'X',
        placeholder: ['开始日期', '结束日期'], // Placeholder for the rangePicker
      },
    },
    {
      type: 'input',
      field: 'remark2',
      title: '备注',
      props: {
        placeholder: '请输入',
        type: 'textarea',
      },
    },
  ]
}
