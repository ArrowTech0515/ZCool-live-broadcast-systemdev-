<template>
  <a-card>
    <template #title>
      <div style="display: flex; align-items: center; white-space: nowrap;">
        <a-button
          type="link"
          style="font-size: 18px; margin-right: 8px;"
          @click="emit('emit_back')"
        >
          <span style="font-size: 20px; font-weight: bold; margin-left: 8px;">&lt;</span>
        </a-button>
        <div style="flex-grow: 1; text-align: center;">
          <span style="font-size: 20px; font-weight: bold;">编辑</span>
        </div>
      </div>
    </template>

    <div style="display: flex; justify-content: center;">
      <a-col layout="vertical" style="width: 100%; max-width: 500px;">
        <!-- Form Item: 直播封面 -->
        <a-form-item label="直播封面" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-textarea v-model:value="form.cover" placeholder="封面信息，如URL或描述" class="centered-input" />
        </a-form-item>

        <!-- Form Item: 直播状态 -->
        <a-form-item label="直播状态" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-select v-model:value="form.status" placeholder="请选择直播状态" class="centered-input">
            <a-select-option value="直播中">直播中</a-select-option>
            <a-select-option value="已结束">已结束</a-select-option>
          </a-select>
        </a-form-item>

        <!-- Form Item: 开赛时间 -->
        <a-form-item label="开赛时间" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-date-picker
            v-model:value="form.startTime"
            show-time
            :disabled-date="disabledDate"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="X"
            placeholder="开赛时间"
            class="centered-input"
          />
        </a-form-item>

        <!-- Form Item: 赛事标题 -->
        <a-form-item label="赛事标题" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-input v-model:value="form.title" placeholder="请输入赛事标题" class="centered-input" />
        </a-form-item>

        <!-- Form Item: 赛事 -->
        <a-form-item label="赛事" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-input v-model:value="form.event" placeholder="请输入赛事名称" class="centered-input" />
        </a-form-item>

        <!-- Form Item: 主队 -->
        <a-form-item label="主队" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-input v-model:value="form.homeTeam" placeholder="请输入主队名称" class="centered-input" />
        </a-form-item>

        <!-- Form Item: 客队 -->
        <a-form-item label="客队" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-input v-model:value="form.awayTeam" placeholder="请输入客队名称" class="centered-input" />
        </a-form-item>

        <!-- Form Item: 比分 -->
        <a-form-item label="比分" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-input v-model:value="form.score" placeholder="请输入比分" class="centered-input" />
        </a-form-item>

        <!-- Form Item: 直播方式 -->
        <a-form-item label="直播方式" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-input v-model:value="form.liveMethod" placeholder="请输入直播方式" class="centered-input" />
        </a-form-item>

        <!-- Form Item: 直播地址 -->
        <a-form-item label="直播地址" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-input v-model:value="form.liveAddress" placeholder="请输入直播地址" class="centered-input" />
        </a-form-item>

        <!-- Form Item: 权重值 -->
        <a-form-item label="权重值" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <CustomSpin v-model:nValue="form.weight" class="centered-input" />
        </a-form-item>

        <!-- Form Item: 展示状态 -->
        <a-form-item label="展示状态" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-radio-group v-model:value="form.displayStatus" >
            <a-radio value="上架">上架</a-radio>
            <a-radio value="下架" >下架</a-radio>
          </a-radio-group>
        </a-form-item>

        <!-- Center Aligned Save Button -->
        <a-row style="justify-content: center; margin-left: 50px;" >
         <a-button type="primary" style="width: 200px;" @click="handleSave">保存</a-button>
        </a-row>
      </a-col>
    </div>

  </a-card>
</template>

<script lang="jsx" setup>
import CustomSpin from '@/components/Form/Custom/CustomSpin.vue'
import dayjs from 'dayjs'
import { reactive } from 'vue'

const emit = defineEmits(['emit_back'])

const form = reactive({
  cover: '封面',
  status: '直播中',
  startTime: '',
  title: '09:21 欧洲杯 国际米兰 VS 皇家马德里',
  event: '欧洲杯',
  homeTeam: '皇家马德里',
  awayTeam: '主队那',
  score: '',
  liveMethod: '',
  liveAddress: '',
  weight: 0,
  displayStatus: '上架',
})

const disabledDate = (current) => {
  return current && current < dayjs().endOf('day')
}

const handleSave = () => {
  console.log('Form Data:', form)
}
</script>

<style scoped>
.centered-input {
  width: 100%;
  text-align: center;
}
</style>
