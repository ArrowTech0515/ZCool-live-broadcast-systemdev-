<template>
  <a-spin :spinning="spinning">
    <a-card title="主播详情">
      <div class="flex_box">
        <form-create
          class="flex1 mr30"
          v-model:api="fApi"
          v-model="formValue"
          :option="formCreateOptions"
          :rule
        >
        </form-create>

        <a-form
          layout="vertical"
          class="anchor_info flex1 align_self_start"
        >
          <a-form-item label="主播封面：">
            <img
              :src="anchorDetail.cover_image"
              alt=""
              width="300"
              height="80"
            />
          </a-form-item>
          <a-form-item label="直播视频：">
            <video
              width="300"
              height="80"
            >
              <source
                :src="anchorDetail.cover_video"
                type="video/mp4"
              >
            </video>
          </a-form-item>
          <a-form-item label="个人简介：">
            <a-textarea
              :value="anchorDetail.anchor_intro"
              disabled
            />
          </a-form-item>
          <span>
          </span>
          <a-form-item
            label="直播时间："
            v-if="anchorDetail.live_time_conf"
          >
            <div
              class="flex_box c666"
              style="width: 240px;"
              v-for="item in anchorDetail.live_time_conf"
              :key="item.label"
            >
              <span>{{ item.label }}</span>
              <span v-if="item.time_range">{{ item.time_range[0] }}-{{ item.time_range[1] }}</span>
              <span v-else>休息</span>
            </div>
          </a-form-item>
        </a-form>
      </div>
      <div class="hr"></div>
      <h3 class="mb20">工会信息</h3>
      <a-form style="width: 600px">
        <a-form-item label="所属公会">
          <a-input
            v-model:value="guildInfo.guild_name"
            disabled
          />
        </a-form-item>

        <a-form-item label="转会记录">
          <table border>
            <tr style="background: #eee;">
              <td>所属公会</td>
              <td>分成比例</td>
              <td>转会时间</td>
              <td>操作账号</td>
            </tr>

            <tr
              v-for="item in guildInfo.history"
              :key="item.guild_id"
            >
              <td>{{ item.guild_name }}</td>
              <td>{{ item.ps_ratio }}%</td>
              <td>{{ item.trans_time }}</td>
              <td>{{ item.oper_info?.name }}</td>
            </tr>
          </table>
        </a-form-item>
      </a-form>
      <div class="tc">
        <a-button
          @click="submit"
          style="width: 240px;"
          size="large"
          type="primary"
        >保存</a-button>
      </div>
    </a-card>
  </a-spin>
</template>

<script setup lang="jsx">
import { getAnchorDetailReq, getAnchorGuildReq, anchorAddOrEditReq } from '@/api/anchor'
import { getPathFromUrlArray } from '@/utils';
import useAnchorRule from '@/views/anchor/list/hooks/useAnchorRule'

const route = useRoute()
const anchor_id = route.query.anchor_id

// TODO: 重置主播账号的密码

const spinning = ref(false)
const anchorDetail = ref({})
const formValue = ref({
  avatar_url: '',
  nickname: '',
  phone: '',
  email: '',
  guild_id: '',
  ps_ratio: '',
  hourly_rate: '',
  hourly_rate_ulimit: '',
  password: '',
  merch_id: [],
})
const fApi = ref(null)
const anchorRule = useAnchorRule(true, false, fApi)

const rule = ref([
  ...anchorRule,
  {
    type: 'input',
    field: 'room_code',
    title: '房间号',
    value: '',
  },
  {
    type: 'input',
    field: 'deivce_code',
    title: '绑定设备号',
    value: '',
  },
])
const formCreateOptions = {
  submitBtn: false,
  resetBtn: false,
}

onMounted(async () => {
  spinning.value = true
  const res = await getAnchorDetailReq(anchor_id)
  formValue.value = {
    avatar_url: res.avatar_url,
    nickname: res.nickname,
    phone: res.phone,
    email: res.email,
    guild_id: res.guild_id,
    ps_ratio: res.ps_ratio,
    hourly_rate: res.hourly_rate,
    hourly_rate_ulimit: res.hourly_rate_ulimit,
    merch_id: res.merch_id,
  }
  anchorDetail.value = res
  spinning.value = false
})

const guildInfo = reactive({
  guild_id: '',
  guild_name: '',
  history: [],
})

// 改为 watch ，否则会触发两次
watch(() => formValue.value.guild_id, () => {
  if (formValue.value.guild_id) {
    getAnchorGuildReq(formValue.value.guild_id).then(res => {
      guildInfo.guild_id = res.guild_id
      guildInfo.guild_name = res.guild_name
      guildInfo.history = res.history
    })
  }
})

function submit() {
  fApi.value.submit(async formData => {
    spinning.value = true
    const { avatar_url, ...rest } = formData
    const data = {
      ...rest,
      avatar_url: getPathFromUrlArray(avatar_url),
    }
    anchorAddOrEditReq(anchor_id, data).then(() => {
      spinning.value = false
    }).catch(() => {
      spinning.value = false
    })
  })
}

</script>

<style lang="sass" scoped>
.hr
  height: 1px
  background-color: #e8e8e8
  margin: 20px 0

table
  width: 600px
  border: 1px solid #e8e8e8
  border-collapse: collapse

  td
    padding: 5px
    text-align: center
</style>
