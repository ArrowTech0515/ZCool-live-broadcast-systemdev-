<script setup lang="jsx">

const emit = defineEmits(['emit_mute', 'emit_blacklist', 'emit_withdraw', 'emit_out'])
const fApi = ref({})

const charmValue = 348458;
const onlineUsers = 345223;

const messages = [
  { id: 1, user: '东方幻梦', content: '加入了直播间', type: 'notification' },
  { id: 2, user: '东方幻梦', content: '加入了直播间', type: 'notification' },
  { id: 3, user: '冬至的诗', content: '我是用户说的话，能看到吗？', type: 'message' },
  { id: 4, user: '冬至的诗', content: '我是用户说的话，能看到吗？', type: 'message' },
  { id: 5, user: '冬至的诗', content: '我是用户说的话，能看到吗？', type: 'message' },
  { id: 6, user: '冬至的诗', content: '来了', type: 'message' },
  { id: 7, user: '冬至的诗', content: '我是用户说的话，能看到吗？', type: 'message' },
  { id: 8, user: '冬至的诗', content: '我是用户说的话，能看到吗？', type: 'message' },
  { id: 9, user: '冬至的诗', content: '我是用户说的话，能看到吗？', type: 'message' },
  { id: 10, user: '冬至的诗', content: '我是用户说的话，能看到吗？', type: 'message' },
  { id: 11, user: '冬至的诗', content: '我是用户说的话，能看到吗？', type: 'message' },
  { id: 12, user: '冬至的诗', content: '我是用户说的话，能看到吗？', type: 'message' },
];

const selectedMessageId = ref(null);

const handleRowClick = (id) => {
  selectedMessageId.value = selectedMessageId.value === id ? null : id;
};
</script>

<template>
  <a-card style="width: 100%; margin: 1%;">
    <a-row 
      justify="space-between" align="middle"
      style="padding-bottom: 20px;padding-top: 20px; margin-bottom: 20px; border-bottom: 1px solid lightgray">
      <span style="font-weight: bold; ">魅力值: {{ charmValue }}</span>
      <span style="font-weight: bold; ">在线人数: {{ onlineUsers }}</span>
    </a-row>

    <div style="max-height: 400px; overflow-y: auto;"> <!-- Scrollable container -->
      <a-row
        v-for="message in messages"
        :key="message.id"
        align="middle"
        style="margin-bottom: 10px; margin-top: 10px; position: relative; padding: 0px; cursor: pointer;"
      >
        <a-card
          style="background-color: #c0c0c0; display: flex; align-items: center; 
          padding-right: 1px; padding-left: 1px;" bodyStyle="padding: 0;"
          @click="handleRowClick(message.id)"
        >
          <a-row flex="auto" style="align-items: center; padding-top: 2%; padding-bottom: 2%; width: 100%;">
            <a-avatar icon="user" size="small" style="margin-right: 5px;" />
            <span style="color: #1890ff; font-weight: bold; font-size: 10px;">{{ message.user }}:</span>
            <span 
                :style="{ marginLeft: '5px', fontSize: '10px', 
                        color: message.type === 'notification' ? '#1890ff' : 'rgb(252,252,252)' }">
                {{ message.content }}
            </span>
          </a-row>
        </a-card>

        <a-col
          v-if="selectedMessageId === message.id"
          style="position: absolute; right: 0; top: 50%; transform: translateY(-50%); display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px; padding: 1px; background-color: white;"
        >
          <a-button 
                size="small" type="primary" style="background-color: #60c0f0; font-size: 12px;"
                @click="emit('emit_mute')">禁言</a-button>
          <a-button 
                size="small" type="primary" style="background-color: green; font-size: 12px;"
                @click="emit('emit_withdraw')">撤回</a-button>
          <a-button 
                size="small" type="primary" style="background-color: #cc6600; font-size: 12px;"
                @click="emit('emit_blacklist')">拉黑</a-button>
          <a-button 
                size="small" type="primary" style="background-color: blue; font-size: 12px;"
                @click="emit('emit_out')">踢出房间</a-button>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>
