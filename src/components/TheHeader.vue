<script setup lang="ts">
const router = useRouter()
const title = ref()
watchEffect(() => {
  title.value = router.currentRoute.value.meta.title || '默认标题'
})
</script>

<template>
  <main text="center">
    <van-nav-bar title="标题" left-text="返回" left-arrow @click-left="router.back()" />
  </main>
</template>
