<script setup lang="ts">
import { showFailToast, showSuccessToast } from 'vant'
import { addAttendanceRecord, getAttendanceDetail, getConfirm } from '~/api/attendance';
import { getSex, getUserName } from '~/utils/cookies';
import { useUserStore } from '~/stores/user';
const user = useUserStore()
const route = useRoute()
const checkRecordId: any = route.query.checkRecordId

const forbid = false

// 检查时间
const currentDate: any = ref()

// 检查节次
const section = ref()

// 检查地点
const checkPlace = ref()
const checkRoom = ref()

// 检查类型
const checkType = ref('')

// 课程名称
const courseName = ref('')

// 有无违纪
const isDisciplinary: any = ref('')
const isViolate: any = ref()
function judgeIsDisciplinary() {
  if (isDisciplinary.value === 1) {
    return '有'
  }
  else if (isDisciplinary.value === 0) {
    return '无'
  }
}
watchEffect(() => {
  isViolate.value = judgeIsDisciplinary()
})

// 违纪人
const disciplinaryPerson = ref('')


// 学号
const stuNo = ref('')

// 专业班级
const majorClass = ref('')

// 违纪情况
const disciplinarySituation = ref('')

// 备注
const other = ref('')

// 考勤人
const attendancePerson = ref(getUserName())

// 性别
const sex: any = getSex()
function judgeSex() {
  if (sex === '男')
    return true
  else
    return false
}
// 身份
const identity = ref('')

let checkForm: any = reactive({})

// 清空vuex
function clearForm() {
  user.showForm = reactive({
    checkTime: '',
    checkSection: '',
    checkType: '',
    courseName: '',
    checkLocation: '',
    checkRoom: '',
    isCourse: '',
    isViolate: '',
    violationId: '',
    disciplinaryPerson: '',
    majorClass: '',
    remark: '',
    violationType: '',
    checkerIdentity: '',
  })
  user.checkForm = reactive({
    checkTime: '',
    checkSection: '',
    checkType: '',
    checkLocation: '',
    checkBuilding: '',
    checkRoom: '',
    isCourse: '',
    courseName: '',
    isViolate: '',
    remark: '',
    violationId: '',
    checkerIdentity: '',
    violationType: ''
  })
}

// 学生是否确认
const confirm = ref(false)

const confirmTime = ref('')
function judgeActive() {
  if (confirm.value === true) {
    confirmTime.value = new Date(confirmTime.value).toLocaleString()
    return 1
  }
  else return 0
}

const router = useRouter()
const onModify = () => {
  router.back()
}
const onSubmit = () => {
  addAttendanceRecord(checkForm).then((res: any) => {
    if (res.code === 200) {
      clearForm()
      console.log(user.checkForm);
      showSuccessToast('提交成功')
      router.push('/attendanceRecord')
    } else {
      showFailToast({
        message: res.description
      })
    }
  })
}
onMounted(() => {
  // 如果是查看详情则请求数据
  if (checkRecordId) {
    getAttendanceDetail(checkRecordId).then((res: any) => {
      if (res.code === 200) {
        const data: any = res.data;
          ({
            checkRoom: checkRoom.value,
            checkSectionName: section.value,
            checkTime: currentDate.value,
            checkTypeName: checkType.value,
            courseName: courseName.value,
            isViolate: isDisciplinary.value,
            remark: other.value,
            violationClass: majorClass.value,
            violationId: stuNo.value,
            violationName: disciplinaryPerson.value,
            violationTypeName: disciplinarySituation.value,
            checkerIdentityName: identity.value
          } = data)
        checkPlace.value = data.checkLocationName + res.data.checkBuildingName
      } else {
        showFailToast({
          message: res.description
        })
      }
    })
    getConfirm(checkRecordId).then((res) => {
      const data = res.data
      confirm.value = data.confirm
      confirmTime.value = data.confirmTime
    })
  }

  // 新提交的数据从vuex中获取,一个展示对象,一个提交对象
  checkForm = user.checkForm;
  ({
    checkTime: currentDate.value,
    checkSection: section.value,
    checkLocation: checkPlace.value,
    checkRoom: checkRoom.value,
    checkType: checkType.value,
    courseName: courseName.value,
    isViolate: isViolate.value,
    violationType: disciplinarySituation.value,
    violationId: stuNo.value,
    remark: other.value,
    majorClass: majorClass.value,
    checkerIdentity: identity.value,
    disciplinaryPerson: disciplinaryPerson.value,
  } = user.showForm)
})

</script>

<template>
  <div class="pb-26">
    <div class="h-10 border bg-blue-500/80 flex items-center">
      <div>
        <van-icon name="notes-o" size="24" /> <span class="text-xl">考勤信息</span>
      </div>
    </div>

    <div class="shadow flex items-center text-xl h-30">
      <van-image round width="6rem" height="6rem" src="../../../public/female.png" v-if="!judgeSex()" />
      <van-image round width="6rem" height="6rem" src="../../../public/male.png" v-if="judgeSex()" />
      <div class="pl-3">
        <div>考勤人:{{ attendancePerson }}</div>
        <div>身 &nbsp; 份 :{{ identity }}</div>
      </div>
    </div>

    <div>
      <div class="mt-3 shadow">
        <van-field v-model="currentDate" readonly label="检查时间 :" />
        <van-field v-model="section" readonly name="showSection" label="检查节次 :" />
        <van-row>
          <van-col span="12">
            <van-field v-model="checkPlace" readonly name="showCheckPlace" label="检查地点 :" label-width="70px" />
          </van-col>
          <van-col span="12">
            <van-field v-model="checkRoom" readonly name="classRoom" label="教室/宿舍 :" label-width="70px" />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="12">
            <van-field v-model="checkType" readonly name="showCheckType" label="检查类型 :" label-width="70px" />
          </van-col>
          <van-col span="12">
            <van-field v-model="courseName" readonly label="课程名称 :" label-width="70px" label-align="left" />
          </van-col>
        </van-row>
      </div>

      <div class=" shadow">
        <van-field v-model="isViolate" readonly name="showIsDisciplinary" label="有无违纪 :" />
        <van-row>
          <van-col span="13">
            <van-field v-model="disciplinaryPerson" readonly label="违 纪 人 :" :disabled="forbid" />
          </van-col>
          <van-col span="11">
            <van-field v-model="stuNo" label="学 号 :" readonly label-width="40px" :disabled="forbid" />
          </van-col>
        </van-row>
        <van-field v-model="majorClass" label="专业班级 :" readonly :disabled="forbid" />
      </div>
      <div class=" shadow">
        <van-field v-model="disciplinarySituation" readonly name="showDisciplinarySituation" label="违纪情况 :"
          :disabled="forbid" />
        <van-field v-model="other" label="备 注 :" readonly :disabled="forbid" />
      </div>
      <div class="mb-7 shadow">
        <van-field v-model="attendancePerson" readonly label="考勤人 :" />
      </div>

      <div class="m-3 flex justify-center" v-if="!checkRecordId">
        <div class="w-30 mr-6">
          <van-button block type="primary" native-type="submit" @click="onModify">
            修改
          </van-button>
        </div>
        <div class="w-30 ">
          <van-button block type="primary" native-type="submit" @click="onSubmit">
            确认
          </van-button>
        </div>
      </div>

      <div class=" mx-2 shadow" v-if="checkRecordId && isDisciplinary">
        <van-steps direction="vertical" :active="judgeActive()">
          <van-step>
            <!-- <div class="text-green-500">
            <van-tag mark type="success" size="large">已查阅</van-tag> 2023-11-12 12:30:33
          </div> -->
            <div class="flex justify-around">
              <div class="text-lg">暂未查阅 </div>
            </div>
          </van-step>
          <van-step v-if="confirm">
            <div class="flex justify-around text-lg">
              <div>已查阅 </div>
              <div> {{ confirmTime }}</div>
            </div>
          </van-step>
        </van-steps>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow {
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
}
</style>

<route lang="yaml">
meta:
  layout: home
  title: '考勤详情'
</route>
