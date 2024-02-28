<script setup>
const { color, textBtn, type } = defineProps({
  color: String,
  textBtn: String,
  type: String,
})
const emit = defineEmits(['btn-click'])
</script>

<template>
  <button :type="type" class="btn" @click="emit('btn-click')" :style="{ backgroundColor: color }">
    {{ textBtn }}
  </button>
</template>

<style scoped>
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:active {
  transform: scale(0.98);
}
</style>
