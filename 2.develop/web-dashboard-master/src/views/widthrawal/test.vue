<template>
  <a-card style="width: 100%;">
    <div class="toolbar">
      <!-- Font Size -->
      <a-select v-model="fontSize" style="width: 100px" placeholder="Font Size">
        <a-select-option v-for="size in fontSizes" :key="size" :value="size">{{ size }}</a-select-option>
      </a-select>

      <!-- Bold, Italic, Underline -->
      <a-button-group>
        <a-button :type="isBold ? 'primary' : 'default'" @click="toggleBold"><bold-outlined /></a-button>
        <a-button :type="isItalic ? 'primary' : 'default'" @click="toggleItalic"><italic-outlined /></a-button>
        <a-button :type="isUnderline ? 'primary' : 'default'" @click="toggleUnderline"><underline-outlined /></a-button>
      </a-button-group>

      <!-- Text Alignment -->
      <a-button-group>
        <a-button :type="textAlign === 'left' ? 'primary' : 'default'" @click="setTextAlign('left')"><align-left-outlined /></a-button>
        <a-button :type="textAlign === 'center' ? 'primary' : 'default'" @click="setTextAlign('center')"><align-center-outlined /></a-button>
        <a-button :type="textAlign === 'right' ? 'primary' : 'default'" @click="setTextAlign('right')"><align-right-outlined /></a-button>
      </a-button-group>
    </div>

    <!-- Editable Text Area -->
    <div
      ref="editor"
      contenteditable="true"
      class="editor"
      :style="editorStyle"
      @input="onInput"
    >
      Start writing your content here...
    </div>
  </a-card>
</template>

<script setup>
import { ref } from 'vue';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
} from '@ant-design/icons-vue';

const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'];
const fontSize = ref('16px');
const isBold = ref(false);
const isItalic = ref(false);
const isUnderline = ref(false);
const textAlign = ref('left');

const onInput = () => {
  const editor = document.querySelector('.editor');
  console.log(editor.innerHTML); // You can handle the content here
};

const toggleBold = () => {
  isBold.value = !isBold.value;
};
const toggleItalic = () => {
  isItalic.value = !isItalic.value;
};
const toggleUnderline = () => {
  isUnderline.value = !isUnderline.value;
};
const setTextAlign = (align) => {
  textAlign.value = align;
};

const editorStyle = computed(() => ({
  fontSize: fontSize.value,
  fontWeight: isBold.value ? 'bold' : 'normal',
  fontStyle: isItalic.value ? 'italic' : 'normal',
  textDecoration: isUnderline.value ? 'underline' : 'none',
  textAlign: textAlign.value,
}));
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.editor {
  min-height: 300px;
  border: 1px solid #d9d9d9;
  padding: 10px;
  outline: none;
}
</style>
