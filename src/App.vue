<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useTheme } from 'vuetify'

const theme = useTheme()

// 根据系统设置切换深色模式
function setThemeWithSystem() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme.global.name.value = 'dark'
  }
  else {
    theme.global.name.value = 'light'
  }
}

onMounted(() => {
  setThemeWithSystem()
  window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener('change', () => {
      setThemeWithSystem()
    })
})

</script>

<template>
  <v-app>
    <RouterView></RouterView>
  </v-app>
</template>
