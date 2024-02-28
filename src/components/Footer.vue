<script setup>
const { content} = defineProps({
  content: String
})
</script>

<template>
  <footer>
    <p>{{ content }}</p>
  </footer>
</template>

<style scoped>
footer {
  margin-top: 30px;
  text-align: left;
  font-size: small;
}
</style>
