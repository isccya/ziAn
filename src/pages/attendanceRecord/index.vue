<script setup lang="ts">
import {showSuccessToast } from 'vant'

const router = useRouter()
function jumpTo(){
  router.push('/attendanceDetail')
}


const checkTime = ref('2023-12-02')
const checkType = ref('课堂')
const isDisciplinary = ref(true)
// 违纪人
const disciplinaryPerson = ref('qqq')

// 学号
const stuNo = ref('2105030305')

// 专业班级
const majorClass = ref('环境8班')

// 下拉刷新
const loading = ref(false)
const onRefresh = () => {
      setTimeout(() => {
        loading.value = false
        showSuccessToast('刷新成功');
      }, 1000);
    };
</script>

<template>
  <van-pull-refresh v-model="loading" @refresh="onRefresh">
    <div class="h-100% ">
      <div v-for="items in [1, 2, 3, 4, 5]" class="shadow mx-1 mt-6 py-1 flex" @click="jumpTo">
        <van-image round width="6rem" height="6rem" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        <div class="ml-5">
          <div>检查类型 : {{ checkType }}</div>
          <div v-if="isDisciplinary">
            <div class=" text-red-500 font-bold">有违纪</div>
            <div>{{ disciplinaryPerson }} {{ stuNo }} {{ majorClass }}</div>
          </div>
          <div v-else class="text-green-500 font-bold">
            无违纪
          </div>
          <div>
            {{ checkTime }}
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <van-divider>暂无更多记录</van-divider>
    </div>
  </van-pull-refresh>
</template>


<style scoped>
.shadow {
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
}
</style>

<route lang="yaml">
meta:
  layout: default
  title: '考勤记录'
</route>
