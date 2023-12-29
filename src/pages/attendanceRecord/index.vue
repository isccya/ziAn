<script setup lang="ts">
import { showSuccessToast } from 'vant'
import { getAttendanceRecord } from '../../api/attendance'
const router = useRouter()
function jumpTo(checkRecordId: number) {
  router.push({
    path: `/attendanceDetail`,
    query: {
      checkRecordId,
    }
  })
}

const checkList: any = reactive([])

// 下拉刷新
const fresh = ref(false)
const loading = ref(true)
const onRefresh = () => {
    queryAttendanceRecord().then(()=>{
      fresh.value = false
      showSuccessToast('刷新成功');
    })
};

function queryAttendanceRecord() {
  return new Promise<void>((resolve, reject) => {
    getAttendanceRecord().then((res: any) => {
      checkList.length = 0
      checkList.push(...res.data)
      loading.value = false
      resolve()
    }).catch((error) => {
      console.log(error);
    })
  })
}
onMounted(() => {
  queryAttendanceRecord()
})

</script>

<template>
  <van-pull-refresh v-model="fresh" @refresh="onRefresh">
    <div class="flex justify-center mt-10" v-if="loading">
      <van-loading type="spinner" />
    </div>
    <div class="h-100% ">
      <div v-for="items in checkList" class="shadow mx-1 mt-6 py-1 flex" @click="jumpTo(items.checkRecordId)">
        <van-image round width="6rem" height="6rem" src="../../../public/female.png" v-if="false" />
        <van-image round width="6rem" height="6rem" src="../../../public/male.png" v-if="true" />
        <div class="ml-5">
          <div>检查类型 : {{ items.checkTypeName }}</div>
          <div v-if="items.isViolate">
            <div class=" text-red-500 font-bold">有违纪</div>
            <div class="w-60 flex justify-between">
              <div>{{ items.violationName }}</div>
              <div>{{ items.violationId }}</div>
              <div>{{ items.violationClass }}</div>
            </div>
          </div>
          <div v-else class="text-green-500 font-bold">
            无违纪
          </div>
          <div>
            {{ items.checkTime }}
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
