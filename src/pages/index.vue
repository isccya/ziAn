<script setup lang="ts">
// 检查时间
const currentDate = ref()
const showTimePicker = ref(false)
const onConfirmTime = ({ selectedValues }: { selectedValues: any }) => {
  currentDate.value = selectedValues.join('/');
  showTimePicker.value = false;
}

// 检查节次
const section = ref()
const showSection = ref()
const showSectionPicker = ref(false)
const sections : any = reactive([
      { text: '早间', value: '0' },
      { text: '一节', value: '1' },
      { text: '二节', value: '2' },
      { text: '三节', value: '3' },
      { text: '四节', value: '4' },
    ])
const onConfirmSection = ({ selectedValues }: { selectedValues: any }) => {
  console.log(selectedValues);
  section.value = selectedValues[0];
  showSection.value = sections[selectedValues[0]].text
  showSectionPicker.value = false;
}

// 检查地点
const checkplace = ref('')
const showCheckPlace = ref()
const showPlacePicker = ref(false)
const places : any = reactive([
      { text: '一教楼', value: '0' },
      { text: '二教楼', value: '1' },
      { text: '一区', value: '2' },
    ])
const onConfirmPlace = ({ selectedValues }: { selectedValues: any }) => {
  console.log(selectedValues);
  checkplace.value = selectedValues[0];
  showCheckPlace.value = places[selectedValues[0]].text
  showPlacePicker.value = false;
}

// 教室
const classRoom = ref()

// 检查类型
const checkType = ref('')
const showCheckType = ref()
const showCheckTypePicker = ref(false)
const types : any = reactive([
      { text: '早签', value: '0' },
      { text: '早自习', value: '1' },
      { text: '课堂考勤', value: '2' },
    ])
const onConfirmType = ({ selectedValues }: { selectedValues: any }) => {
  console.log(selectedValues);
  checkType.value = selectedValues[0];
  showCheckType.value = types[selectedValues[0]].text
  showCheckTypePicker.value = false;
}

// 课程名称
const courseName = ref('')

// 有无违纪
const isDisciplinary = ref('')
const showIsDisciplinary = ref()
const showIsDisciplinaryPicker = ref(false)
const isDisciplinarys : any = reactive([
      { text: '有', value: '0' },
      { text: '无', value: '1' },
    ])
const onConfirmIsDisciplinary = ({ selectedValues }: { selectedValues: any }) => {
  console.log(selectedValues);
  isDisciplinary.value = selectedValues[0];
  showIsDisciplinary.value = isDisciplinarys[selectedValues[0]].text
  showIsDisciplinaryPicker.value = false;
}
const forbid = ref(false)
watchEffect(()=>{
  if(isDisciplinary.value === '1'){
    forbid.value = true;
  }else{
    forbid.value = false;
  }
})

// 违纪人
const disciplinaryPerson = ref('')

// 学号
const stuNo = ref('')

// 专业班级
const majorClass = ref('')

// 违纪情况
const disciplinarySituation = ref('')
const showDisciplinarySituation = ref()
const showDisciplinarySituationPicker = ref(false)
const disciplinarySituations : any = reactive([
      { text: '缺勤', value: '0' },
      { text: '迟到', value: '1' },
      { text: '早退', value: '2' },
    ])
const onConfirmDisciplinarySituation = ({ selectedValues }: { selectedValues: any }) => {
  console.log(selectedValues);
  disciplinarySituation.value = selectedValues[0];
  showDisciplinarySituation.value = disciplinarySituations[selectedValues[0]].text
  showDisciplinarySituationPicker.value = false;
}



// 备注
const other = ref('')

// 考勤人
const attendancePerson = ref('')

// 身份
const identity = ref('')
const showIdentity = ref()
const showIdentityPicker = ref(false)
const identitys : any = reactive([
      { text: '辅导员', value: '0' },
      { text: '班主任', value: '1' },
      { text: '助班', value: '2' },
    ])
const onConfirmIdentity = ({ selectedValues }: { selectedValues: any }) => {
  console.log(selectedValues);
  identity.value = selectedValues[0];
  showIdentity.value = identitys[selectedValues[0]].text
  showIdentityPicker.value = false;
}

// 提交表单
const router = useRouter()
const onSubmit = ()=>{
  router.push('/attendanceDetail')
}
</script>

<template>
  <div class="pb-26" style="background-color: rgb( 247, 248, 250);">
    <van-form class="mx-1" @submit="onSubmit">
      <div class="mt-3 mb-7 shadow border">
        <van-field v-model="currentDate" is-link readonly name="datePicker" label="检查时间 :" placeholder="请选择"
          @click="showTimePicker = true" />
        <van-field v-model="showSection" is-link readonly name="showSection" label="检查节次 :" placeholder="请选择"
          @click="showSectionPicker = true" />
        <van-row>
          <van-col span="12">
            <van-field v-model="showCheckPlace" is-link readonly name="showCheckPlace" label="检查地点 :" label-width="70px"
              placeholder="请选择" @click="showPlacePicker = true" />
          </van-col>
          <van-col span="12">
            <van-field v-model="classRoom" is-link readonly name="classRoom" label="教室/宿舍 :" label-width="70px"
              placeholder="请选择" @click="showTimePicker = true" />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="12">
            <van-field v-model="showCheckType" is-link readonly name="showCheckType" label="检查类型 :" label-width="70px"
              placeholder="请选择" @click="showCheckTypePicker = true" />
          </van-col>
          <van-col span="12">
            <van-field v-model="courseName" label="课程名称 :" label-width="70px" placeholder="请输入" label-align="left" />
          </van-col>
        </van-row>
      </div>

      <div class="mb-7 shadow border">
        <van-field v-model="showIsDisciplinary" is-link readonly name="showIsDisciplinary" label="有无违纪 :" placeholder="请选择"
          @click="showIsDisciplinaryPicker = true" />
        <van-row>
          <van-col span="13">
            <van-field v-model="disciplinaryPerson" label="违 纪 人 :" placeholder="请输入学号" :disabled="forbid"/>
          </van-col>
          <van-col span="11">
            <van-field v-model="stuNo" label="学 号 :" label-width="40px" :disabled="forbid"/>
          </van-col>
        </van-row>
        <van-field v-model="majorClass" label="专业班级 :" :disabled="forbid"/>
      </div>

      <div class="mb-7 shadow border">
        <van-field v-model="showDisciplinarySituation" is-link readonly name="showDisciplinarySituation" label="违纪情况 :" placeholder="请选择" :disabled="forbid"
          @click="showDisciplinarySituationPicker = true" />
        <van-field v-model="other" label="备 注 :" placeholder="请输入需要说明的事项" :disabled="forbid"/>
      </div>

      <div class="mb-7 shadow border">
        <van-field v-model="attendancePerson" label="考勤人 :" />
        <van-field v-model="showIdentity" is-link readonly name="showIdentity" label="身 份 :" placeholder="请选择"
        @click="showIdentityPicker = true" />
      </div>


      <div class="m-3">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

    <!-- 时间 -->
    <van-popup v-model:show="showTimePicker" position="bottom">
      <van-date-picker @confirm="onConfirmTime" @cancel="showTimePicker = false" />
    </van-popup>

    <!-- 节次 -->
    <van-popup v-model:show="showSectionPicker" round position="bottom">
      <van-picker :columns="sections" @cancel="showSectionPicker = false" @confirm="onConfirmSection" />
    </van-popup>

    <!-- 地点 -->
    <van-popup v-model:show="showPlacePicker" round position="bottom">
      <van-picker :columns="places" @cancel="showCheckPlace = false" @confirm="onConfirmPlace" />
    </van-popup>

    <!-- 类型 -->
    <van-popup v-model:show="showCheckTypePicker" round position="bottom">
      <van-picker :columns="types" @cancel="showCheckType = false" @confirm="onConfirmType" />
    </van-popup>
    
     <!-- 有无违纪 -->
     <van-popup v-model:show="showIsDisciplinaryPicker" round position="bottom">
      <van-picker :columns="isDisciplinarys" @cancel="showCheckType = false" @confirm="onConfirmIsDisciplinary" />
    </van-popup>

     <!-- 有无违纪 -->
     <van-popup v-model:show="showDisciplinarySituationPicker" round position="bottom">
      <van-picker :columns="disciplinarySituations" @cancel="showDisciplinarySituationPicker = false" @confirm="onConfirmDisciplinarySituation" />
    </van-popup>
    
    <!-- 有无违纪 -->
    <van-popup v-model:show="showIdentityPicker" round position="bottom">
      <van-picker :columns="identitys" @cancel="showIdentityPicker = false" @confirm="onConfirmIdentity" />
    </van-popup>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
  title: '我要考勤'
</route>

<style scoped>
.shadow {
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
}
</style>
