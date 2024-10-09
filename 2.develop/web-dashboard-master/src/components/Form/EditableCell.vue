<template>
    <a-input 
        class="main-style"
        :value="modelValue" 
        placeholder="请添加"/>
</template>

<script setup>

defineProps({
    modelValue: {
        type: String,
        default: '',
    }
})

</script>

<style>
.main-style {
    text-align: center;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
}
</style>