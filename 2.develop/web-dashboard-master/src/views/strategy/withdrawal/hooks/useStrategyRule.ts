import { type Api } from '@form-create/ant-design-vue'
import { px2remTransformer } from 'ant-design-vue'

export default function (formValue: any, fApi: Ref<Api>) {

  return [
    {
      type: 'input',
      field: 'strategy_name',
      title: '策略名称',
      value: formValue.value.strategy_name,

      // Add custom labelWidth
      labelCol: { style: { width: '300px' } },  // Set the label width explicitly
      props: {
        placeholder: '请输入策略名称',
      }
    },
    {
      type: 'input',
      field: 'min_withdrawal_amount',
      title: '最低提现金额',
      value: formValue.value.min_withdrawal_amount,
      props: {
        placeholder: '请输入最低提现金额',
        type: 'number',
      }
    },
    {
      type: 'input',
      field: 'max_withdrawal_amount',
      title: '最高提现金额',
      value: formValue.value.max_withdrawal_amount,
      props: {
        placeholder: '请输入最高提现金额',
        type: 'number',
      }
    },
    {
      type: 'input',
      field: 'free_withdrawals_per_day',
      title: '每日免费提现次数',
      value: formValue.value.free_withdrawals_per_day,
      props: {
        placeholder: '请输入每日免费提现次数',
        type: 'number',
      }
    },
    {
      type: 'input',
      field: 'max_withdrawals_per_day',
      title: '每日限制提现次数',
      value: formValue.value.max_withdrawals_per_day,
      props: {
        placeholder: '请输入每日限制提现次数',
        type: 'number',
      }
    },
    {
      type: 'input',
      field: 'fee_rate',
      title: '手续费比例%',
      value: formValue.value.fee_rate,
      props: {
        placeholder: '请输入手续费比例',
        type: 'number',
      }
    },
    {
      type: 'input',
      field: 'withdrawal_rate',
      title: '提现汇率',
      value: formValue.value.withdrawal_rate,
      props: {
        placeholder: '请输入提现汇率',
        type: 'number',
      }
    },
    {
      type: 'switch',
      field: 'strategy_status',
      title: '策略状态',
      value: formValue.value.strategy_status,
    },
  ]
}
