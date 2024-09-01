<template>
  <a-card bordered style="width: 230px; padding: 0%;">
    <!-- Header -->
    <div
      style="display: flex; justify-content: space-between; align-items: center;
      border-bottom: 1px solid #d9d9d9; padding-bottom: 10px;"
    >
      <a-checkbox />
      <span>房间号：3232423</span>
      <MenuOutlined style="font-size: 16px; color: black;" />
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
      <a-button
        type="primary"
        shape="round"
        style="position: absolute; top: 8px; right: 8px;"
      >
        密码
      </a-button>
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

<script lang="jsx">
import { defineComponent } from "vue"
import { MenuOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    MenuOutlined,
  }
})
</script>
