<template>
  <a-table
    rowKey="user_id"
    :pagination="false"
    :scroll="{ x: 1200, y: 800 }"
    :dataSource
    :columns="columns"
    :loading="loading"
    :row-selection="{
      selectedRowKeys: selectedRowKeys,
      onChange: selectedRowKeys = $event,
    }"
  />
  <a-pagination
    class="mt15"
    hideOnSinglePage
    v-model:current="pagination.page"
    v-model:pageSize="pagination.limit"
    size="small"
    :total="pagination.total"
  />
</template>

<script setup lang="jsx">
import dayjs from 'dayjs'
import { getUserListReq, getUserLogListReq, setUserRemarkReq, setBlackReq, setMuteReq, setUserTagsReq, userAddOrEditReq, createUserIdReq, resetPasswordReq } from '@/api/users'
import { getUserFunclubListReq } from '@/api/public'
import blockUserRule from '@/rules/blockUserRule'
import createUploadRule from '@/rules/createUploadRule'
import { getPathFromUrlArray } from '@/utils/index'

const props = defineProps({
  searchParams: {
    type: Object,
    default: () => ({}),
  },
  resetSearch: {
    type: Function,
    default: () => {},
  },
})

const pagination = reactive({
  page: 1,
  limit: 10,
  total: 0,
})

const dataSource = ref([
  {
    user_id: '001',
    merchant: {
      name: 'Merchant A',
      app_name: 'App Alpha',
      app_id: 'APP001',
    },
    nickname: 'UserAlpha',
    user_lv: 5,
    online_status: 1,
    hierarchy: [{ label: 'VIP' }, { label: 'Premium' }],
    deivces: {
      os_type: 1,
      dev_log_count: 3,
      login_ip: '192.168.1.1',
      ip_log_count: 5,
    },
    phone: '123-456-7890',
    email: 'useralpha@example.com',
    wallet: {
      balance: 100,
      diamond: 50,
      recharge: 200,
      withdrawal: 100,
    },
    is_noble: true,
    noble_title: 'Lord',
    fanclub: {
      total: 1,
      sample_data: { label: 'AlphaFanClub' },
    },
    register_time: '2024-01-01',
    last_login_time: '2024-09-09',
    remark: 'Top user',
    is_mute: false,
    in_blacklist: false,
  },
  {
    user_id: '002',
    merchant: {
      name: 'Merchant B',
      app_name: 'App Beta',
      app_id: 'APP002',
    },
    nickname: 'UserBeta',
    user_lv: 3,
    online_status: 0,
    hierarchy: [{ label: 'Standard' }],
    deivces: {
      os_type: 2,
      dev_log_count: 1,
      login_ip: '192.168.2.1',
      ip_log_count: 2,
    },
    phone: '987-654-3210',
    email: 'userbeta@example.com',
    wallet: {
      balance: 300,
      diamond: 100,
      recharge: 500,
      withdrawal: 150,
    },
    is_noble: false,
    fanclub: {
      total: 2,
      sample_data: { label: 'BetaFanClub' },
    },
    register_time: '2023-12-15',
    last_login_time: '2024-08-25',
    remark: 'Frequent buyer',
    is_mute: true,
    in_blacklist: false,
  },
  {
    user_id: '003',
    merchant: {
      name: 'Merchant C',
      app_name: 'App Gamma',
      app_id: 'APP003',
    },
    nickname: 'UserGamma',
    user_lv: 4,
    online_status: 1,
    hierarchy: [{ label: 'VIP' }],
    deivces: {
      os_type: 1,
      dev_log_count: 2,
      login_ip: '192.168.3.1',
      ip_log_count: 3,
    },
    phone: '555-555-5555',
    email: 'usergamma@example.com',
    wallet: {
      balance: 400,
      diamond: 200,
      recharge: 700,
      withdrawal: 200,
    },
    is_noble: true,
    noble_title: 'Duke',
    fanclub: {
      total: 0,
    },
    register_time: '2024-01-10',
    last_login_time: '2024-09-01',
    remark: 'High spender',
    is_mute: false,
    in_blacklist: true,
  },
])

const { loading, refresh } = useRequest(() => getUserListReq({
  ...props.searchParams,
  page: pagination.page,
  limit: pagination.limit,
}), {
  refreshDeps: true,
  onSuccess(data) {
    dataSource.value = data.items
    pagination.total = data.total_data
  },
})
const { createDialog } = useDialog()
const selectedRowKeys = ref([])

const columns = [
  {
    title: '商户信息',
    dataIndex: 'merchant',
    customRender: ({ record }) =>
      <div>
        <p>{record.merchant.name}</p>
        <p>应用名称：{record.merchant.app_name}</p>
        <p>APPID：{record.merchant.app_id}</p>
      </div>
  },
  {
    title: '用户信息',
    dataIndex: 'user_id',
    customRender: ({ record }) =>
      <div>
        <p>
          {record.nickname}
          <Clipboard text={record.nickname} />
        </p>

        {/* <p>
          靓号：{record.is_vanity_num ? '是' : '否'}
        </p> */}
        <p>ID：{record.user_id}
          <Clipboard text={record.user_id} />
        </p>
        <p>
          等级：{record.user_lv}
          <a-tag color="green" v-if={record.online_status === 1}>在线</a-tag>
          <a-tag color="red" v-else>离线</a-tag>
        </p>
      </div>
  },
  {
    title: '层级信息',
    dataIndex: 'hierarchy',
    customRender: ({ record }) =>
      <>
        <p class="dialog_item_list" v-for={(item, index) in record.hierarchy} key={index}>{item.label}</p>
      </>
  },
  {
    title: '设备信息',
    dataIndex: 'deivces',
    customRender: ({ record }) =>
      <div>
        <p>
          设备：{record.deivces.os_type === 1 ? 'iOS' : 'Android'}
          <a-button type="link" size="small" onClick={() => openDeviceLogModal('device', record.user_id)}>({record.deivces.dev_log_count})</a-button>
        </p>
        <p>
          IP：{record.deivces.login_ip}
          <a-button type="link" size="small" onClick={() => openDeviceLogModal('ip', record.user_id)}>({record.deivces.ip_log_count})</a-button>
        </p>
      </div>
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    customRender: ({ record }) =>
      <div>
        <p>手机号：{record.phone}</p>
        <p>邮箱：{record.email}</p>
      </div>
  },
  {
    title: '钱包信息',
    dataIndex: 'wallet',
    customRender: ({ record }) =>
      <div>
        <p>余额：{record.wallet.balance}</p>
        <p>钻石：{record.wallet.diamond}</p>
        <p>充值：{record.wallet.recharge}</p>
        <p>提现：{record.wallet.withdrawal}</p>
      </div>
  },
  {
    title: '权益信息',
    dataIndex: 'noble_title',
    customRender: ({ record }) =>
      <div>
        <p v-if={record.is_noble}>
          { record.noble_title }：
        </p>
        <p>
          粉丝团：
          <span v-if={record.fanclub?.total === 1}>
            {record.fanclub?.sample_data?.label}
          </span>
          <a-button
            v-else-if={record.fanclub?.total > 1}
            type="link"
            size="small"
            onClick={() => openFunclubModal(record.user_id)}
          >
            {record.fanclub?.total || 0}个粉丝团
          </a-button>
          <span v-else-if={record.fanclub?.total === 0}>无</span>
        </p>
      </div>
  },
  {
    title: '注册事件/最近登录',
    dataIndex: 'register_time',
    customRender: ({ record }) =>
      <div>
        <p>注册时间：{record.register_time}</p>
        <p>最近登录：{record.last_login_time}</p>
      </div>
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '操作',
    fixed: 'right',
    width: 120,
    dataIndex: 'action',
    customRender: ({ record }) =>
      <a-dropdown-button size="small" onClick={() => editItem(record)}>
      编辑
      <template v-slot:overlay>
        <a-menu onClick={e => handleMenuClick(record, e)}>
          <a-menu-item key="禁言" disabled={record.is_mute}>
            {record.is_mute ? '已禁言' : '禁言'}
          </a-menu-item>
          <a-menu-item key="拉黑" disabled={record.in_blacklist}>
            { record.in_blacklist ? '已拉黑' : '拉黑' }
          </a-menu-item>
          <a-menu-item key="标签">
            标签
          </a-menu-item>
          <a-menu-item key="备注">
            备注
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>
  },
]

function handleMenuClick(userItem, { key }) {
  if (key === '备注') {
    editRemark(userItem)
  } else if (key === '拉黑') {
    blockUser(userItem)
  } else if (key === '禁言') {
    muteUser(userItem)
  } else if (key === '标签') {
    setTags(userItem)
  }
}

// 添加/编辑用户
const uploadRule = createUploadRule('用户头像', 'avatar_url')
async function editItem(userItem = {}) {
  const formValue = ref({
    user_id: userItem.user_id,
    avatar_url: userItem.avatar_url,
    nickname: userItem.nickname,
    phone: userItem.phone,
    email: userItem.email,
    password: userItem.password,
  })

  const isCreate = !userItem.user_id
  if (!userItem.user_id) {
    // user_id 需要生成
    const [err, { user_id } = {}] = await to(createUserIdReq())
    if (err) {
      console.log(err)
      return
    }
    formValue.value.user_id = user_id
  }
  const formModalProps = {
    request: data => userAddOrEditReq(isCreate ? null : userItem.user_id, data),
    getData(data) {
      const { avatar_url, ...rest } = data
      return {
        ...rest,
        avatar_url: getPathFromUrlArray(avatar_url),
        // 如果是修改用户，body 里 user_id 传 null，user_id 放到 url path中。反之，创建用户，user_id 放到 body 中
        user_id: isCreate ? data.user_id : undefined,
      }
    },
    rule: [
      uploadRule,
      {
        type: 'input',
        field: 'nickname',
        title: '用户昵称',
        value: '',
        validate: [{ type: 'string', max: 10, message: '昵称为2-6个中文汉字', pattern: '^[\u4e00-\u9fa5]{2,6}$' }],
      },
      {
        type: 'input',
        field: 'user_id',
        title: '用户ID',
        value: '',
        props: {
          disabled: true
        }
      },
      {
        type: 'input',
        field: 'phone',
        title: '手机号',
        value: '',
        validate: [{ type: 'string', message: '请输入正确的手机号' }],
        props: {
          type: 'tel'
        },
      },
      {
        type: 'input',
        field: 'email',
        title: '邮箱',
        value: '',
        validate: [{ type: 'email', message: '请输入正确的邮箱' }],
        props: {
          type: 'email'
        },
      },
      {
        type: 'input',
        field: 'password',
        title: '密码',
        value: '',
        validate: [{ type: 'pattern', required: true, pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,16}$', message: '请输入 8~16位数字和字母组合密码' }],
        props: {
          type: 'password',
          placeholder: '请输入 8~16 位数字和字母组合密码',
        },
      },
    ],
  }

  const resetPasswordBtnLoading = ref(false)
  createDialog({
    title: isCreate ? '添加用户' : '编辑用户',
    width: 500,
    component:
      <ModalForm
        v-model={formValue.value}
        {...formModalProps}
      >
        <template v-slot:footer>
          <div class='flex_end mt-20'>
            <a-button loading={resetPasswordBtnLoading.value} onClick={() => resetPassword(userItem.user_id, resetPasswordBtnLoading)} type='link' v-if={!isCreate}>重置密码</a-button>
          </div>
        </template>
      </ModalForm>
    ,
    onConfirm() {
      if (isCreate) {
        pagination.page = 1
        pagination.total = 0
        props.resetSearch()
      } else {
        refresh()
      }
    },
  })
}

function resetPassword(user_id, resetPasswordBtnLoading) {
  resetPasswordBtnLoading.value = true
  resetPasswordReq(user_id).then(() => {
    resetPasswordBtnLoading.value = false
  }).catch(err => {
    console.log(err)
    resetPasswordBtnLoading.value = false
  })
}

// 设置用户标签
function setTags(userItem) {
  const formValue = ref({
    user_id: userItem.user_id,
    tags: userItem.tags,
  })

  const formModalProps = {
    request: setUserTagsReq,
    getData(data) {
      const { user_id, ...params } = data
      return {
        ...params,
        user_ids: [user_id],
      }
    },

    rule: [
      {
        type: 'input',
        field: 'user_id',
        value: userItem.user_id,
        hidden: true,
      },
      {
        type: 'checkbox',
        field: 'tags',
        title: '',
        value: [],
        options: [],
        effect: {
          required: true,
          fetch: {
            action: '/api/v1/users/tags/' + userItem.user_id,
            to: 'options',
            method: 'get',
            parse: res => res.items.map(row => ({
              label: row.label,
              value: row.id
            })),
          }
        }
      },
    ],
  }

  createDialog({
    title: '用户标签',
    width: 500,
    component:
      <ModalForm
        v-model={formValue.value}
        {...formModalProps}
      />,
    onConfirm(status) {
      if (status) {
        const current = dataSource.value.find(item => item.user_id === userItem.user_id)
        if (current) {
          current.tags = formValue.value.tags
        }
      }
    },
  })
}

// 禁言
function muteUser(userItem) {
  const formValue = ref({
    user_id: userItem.user_id,
    mute_type: '',
    mute_end_time: '',
    reason: '',
  })

  const formModalProps = {
    request: setMuteReq,
    getData(data) {
      const { user_id, ...params } = data
      return {
        ...params,
        user_ids: [user_id],
      }
    },

    rule: [
      {
        type: 'input',
        field: 'user_id',
        value: userItem.user_id,
        hidden: true,
      },
      {
        type: 'radio',
        field: 'mute_type',
        title: '禁言时效',
        value: '',
        options: Object.keys(ENUM.mute_type).map(key => ({ label: ENUM.mute_type[key], value: parseInt(key) })),
        effect: {
          required: true,
        },
        control: [
          {
            handle: val => val === 3,
            append: 'mute_type',
            rule: [
              {
                type: 'datePicker',
                field: 'mute_end_time',
                title: '禁言时间',
                value: '',
                effect: {
                  required: true,
                },
                props: {
                  placeholder: '请选择时间',
                  showTime: { defaultValue: dayjs('00:00:00', 'HH:mm:ss') },
                  disabledDate: (current) => {
                    return current && current < dayjs().endOf('day')
                  },
                  format: 'YYYY-MM-DD HH:mm:ss',
                  valueFormat: 'X',
                }
              }
            ]
          }
        ]
      },
      {
        type: 'input',
        field: 'reason',
        title: '理由',
        value: '',
        props: {
          type: 'textarea'
        },
        effect: {
          required: true,
        },
      },
    ],
  }

  createDialog({
    title: '禁言',
    width: 500,
    component:
      <ModalForm
        v-model={formValue.value}
        {...formModalProps}
      />,
    onConfirm(status) {
      if (status) {
        const current = dataSource.value.find(item => item.user_id === userItem.user_id)
        if (current) {
          current.is_mute = true
        }
      }
    },
  })
}

// 拉黑
function blockUser(userItem) {
  const formValue = ref({
    user_id: userItem.user_id,
    block_type: '',
    ageing_type: '',
    end_time: '',
    reason: '',
  })

  const formModalProps = {
    request: setBlackReq,
    getData(data) {
      const { user_id, ...params } = data
      return {
        ...params,
        user_ids: [user_id],
      }
    },

    rule: [
      {
        type: 'input',
        field: 'user_id',
        value: userItem.user_id,
        hidden: true,
      },
      ...blockUserRule,
    ],
  }

  createDialog({
    title: '拉黑',
    width: 500,
    component:
      <ModalForm
        v-model={formValue.value}
        {...formModalProps}
      />,
    onConfirm(status) {
      if (status) {
        const current = dataSource.value.find(item => item.user_id === userItem.user_id)
        if (current) {
          current.in_blacklist = true
        }
      }
    },
  })
}

// 修改备注
async function editRemark(userItem) {
  const request = remark => setUserRemarkReq(userItem.user_id, { remark })
  createDialog({
    width: 500,
    title: '备注',
    component: <Prompt defaultValue={userItem.remark} label="备注" textarea request={request} />,
    onConfirm(value) {
      if (value) {
        const current = dataSource.value.find(item => item.user_id === userItem.user_id)
        if (current) {
          current.remark = value
        }
      }
    },
  })
}

/**
 * 查看设备日志
 * type: device | ip
 */
async function openDeviceLogModal(type, user_id) {
  loading.value = true
  const [err, data] = await to(getUserLogListReq(user_id, { limit: 100, page: 1 }))
  if (err) {
    console.log(err)
    loading.value = false
    return
  }
  loading.value = false
  createDialog({
    width: 500,
    footer: null,
    component: () =>
      <div>
        <div class="dialog_item_list" v-for={(item, index) in data} key={index}>
          <span v-if={type === 'device'}>
            {ENUM.log_type[item.log_type]}设备：{item.dev_model} | {item.log_time}
          </span>
          <span v-else>
            {ENUM.log_type[item.log_type]}IP：{item.ip || '--'}
          </span>
        </div>
      </div>
    ,
  })
}

// 查看粉丝团
async function openFunclubModal(user_id) {
  loading.value = true
  const [err, data] = await to(getUserFunclubListReq(user_id, { limit: 100, page: 1 }))
  if (err) {
    console.log(err)
    loading.value = false
    return
  }
  loading.value = false
  createDialog({
    width: 500,
    footer: null,
    component: () =>
      <div>
        <div class="dialog_item_list" v-for={(item, index) in data} key={index}>
          {item.label} | {item.lv_name}
        </div>
      </div>
    ,
  })
}

defineExpose({
  editItem,
})
</script>
