<template>
  <a-card bordered style="width: 230px; padding: 0%;">
    <!-- Header -->
    <div
      style="display: flex; justify-content: space-between; align-items: center;
      border-bottom: 1px solid #d9d9d9; padding-bottom: 10px;"
    >
      <a-checkbox />
      <span>房间号：3232423</span>
      <Dropdown placement="bottomRight" :overlay="menu" trigger="click">
        <MenuOutlined style="font-size: 16px; cursor: pointer" />
      </Dropdown>
    </div>

    <!-- Body -->
    <div
      style="position: relative; margin-top: 16px; height: 230px; "
    >
      <!-- Time Text (Top Left) -->
      <div
        style="position: absolute; top: 0px; left: 0px; font-size: 22px; font-weight: bold;"
      >
        13:21
      </div>
      <!-- Password Button (Top Right) -->
      <div v-if="spanText!==''" >
        <EnvelopeText
          style="position: absolute; top: 0px; right: 0px;" :spanText="spanText" 
        >
        </EnvelopeText>
      </div>
      <!-- Live Stream Area -->
      <div
        style="display: flex; justify-content: center; align-items: center; 
        height: 100%; font-size: 20px;"
      >
        直播画面
      </div>
    </div>

    <!-- Footer -->
    <div
      style="text-align: center; border-top: 1px solid #d9d9d9; padding-top: 8px; "
    >
      桃之夭夭
    </div>
  </a-card>
</template>

<script lang="jsx" setup>
import { defineComponent } from "vue"
import { defineProps } from 'vue'

import { MenuOutlined } from '@ant-design/icons-vue'

import { Menu, Dropdown } from 'ant-design-vue'
import EnvelopeText from './EnvelopeText.vue'

// Define the props the component will accept
defineProps({
  spanText: {
    type: String,
    required: true,
  },
})

defineComponent({
  components: {
    MenuOutlined, Dropdown, EnvelopeText
  }
})

const menu = (
  <Menu>
    <Menu.Item>
      <span style="font-size: 12px; padding: 10px;">主播来源: 平台</span>
    </Menu.Item>
    <Menu.Item>
      <span style="font-size: 12px; padding: 10px;">展示商户: 29位商户</span>
    </Menu.Item>
    <Menu.Item>
      <span style="font-size: 12px; padding: 10px;">所属工会: XXXX工会</span>
    </Menu.Item>
  </Menu>
)

</script>
