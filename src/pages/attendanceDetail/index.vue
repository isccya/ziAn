<script setup lang="ts">
import { showSuccessToast } from 'vant'
// 检查时间
const currentDate = ref()

// 检查节次
const section = ref()

// 检查地点
const checkPlace = ref()

// 检查教室
const classRoom = ref()

// 检查类型
const checkType = ref('')

// 课程名称
const courseName = ref('')

// 有无违纪
const isDisciplinary = ref('')

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
const attendancePerson = ref('')

// 身份
const identity = ref('')

const router = useRouter()
const onModify = () => {
  router.back()
}
const onSubmit = () => {
  showSuccessToast('提交成功')
  router.push('/')
}
</script>

<template>
  <div class="pb-26">
    <div class="h-10 border bg-blue-500/80 flex items-center">
      <div>
        <van-icon name="notes-o" size="24" /> <span class="text-xl">考勤信息</span>
      </div>
    </div>

    <div class="shadow flex items-center text-xl">
      <van-image round width="6rem" height="6rem" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
      <div class="pl-3">
        <div>考勤人:ccccc</div>
        <div>身 &nbsp; 份 :xxxxx</div>
      </div>
    </div>

    <div>
      <div class="mt-3 shadow">
        <van-field v-model="currentDate" readonly name="datePicker" label="检查时间 :" />
        <van-field v-model="section" readonly name="showSection" label="检查节次 :" />
        <van-row>
          <van-col span="12">
            <van-field v-model="checkPlace" readonly name="showCheckPlace" label="检查地点 :" label-width="70px" />
          </van-col>
          <van-col span="12">
            <van-field v-model="classRoom" readonly name="classRoom" label="教室/宿舍 :" label-width="70px" />
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
        <van-field v-model="isDisciplinary" readonly name="showIsDisciplinary" label="有无违纪 :" />
        <van-row>
          <van-col span="13">
            <van-field v-model="disciplinaryPerson" readonly label="违 纪 人 :" placeholder="请输入学号" :disabled="forbid" />
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
        <van-field v-model="identity"  readonly name="showIdentity" label="身 份 :"/>
      </div>

      <div class="m-3 flex justify-center">
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
