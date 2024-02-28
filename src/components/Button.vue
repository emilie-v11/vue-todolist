<script setup>
const { color, textBtn, type } = defineProps({
  color: String,
  textBtn: String,
  type: String,
})
</script>

<template>
  <button :type="type" class="btn" :style="{ backgroundColor: color }">
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
  margin: 5px 0;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
