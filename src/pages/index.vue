<script setup lang="ts">
import {useDictStore} from '../stores/dict'
const  dict  = useDictStore();
const columnsFieldNames = { text: 'dictName', value: 'dictId', children: 'children' }

// 检查时间
const checkTime = ref()
const showTimePicker = ref(false)
const minDate = new Date(2024, 0, 1)
const maxDate = new Date(2024, 7, 1)
const onConfirmTime = ({ selectedValues }: { selectedValues: any }) => {
  checkTime.value = selectedValues.join('-');
  showTimePicker.value = false;
}

// 检查节次
const section = ref()
const showSection = ref()
const showSectionPicker = ref(false)
let sections: any = reactive([])
const onConfirmSection = ({ selectedOptions }: { selectedOptions: any }) => {
  section.value = selectedOptions[0].dictId;
  showSection.value = selectedOptions[0].dictName
  showSectionPicker.value = false;
}

// 检查地点
const checkplace = ref('')
const showCheckPlace = ref()
const showPlacePicker = ref(false)
const places: any = reactive([])
// 宿舍区楼栋
const buildings: any = reactive([])
const classRoom = ref()
const onConfirmPlace = ({ selectedOptions }: { selectedOptions: any }) => {
  checkplace.value = selectedOptions[0].dictName;
  showCheckPlace.value = selectedOptions[0].dictName
  classRoom.value = selectedOptions[1]?.dictName
  showPlacePicker.value = false;
}
function onChange(value: any) {
  if (value.selectedOptions[0].dictName.includes('区')) { //如果是宿舍区,添加儿子楼栋
    value.selectedOptions[0].children = buildings
  }
}

// 检查类型
const checkType = ref('')
const showCheckType = ref()
const showCheckTypePicker = ref(false)
const types: any = reactive([])
const onConfirmType = ({ selectedOptions }: { selectedOptions: any }) => {
  checkType.value = selectedOptions[0].dictId;
  showCheckType.value = selectedOptions[0].dictName
  showCheckTypePicker.value = false;
}

// 课程名称
const courseName = ref('')

// 有无违纪
const isViolate = ref('')
const showIsViolate = ref()
const showIsDisciplinaryPicker = ref(false)
const isDisciplinarys: any = reactive([
  { text: '有', value: '1' },
  { text: '无', value: '0' },
])
const onConfirmIsDisciplinary = ({ selectedOptions }: { selectedOptions: any }) => {
  isViolate.value = selectedOptions[0].value;
  showIsViolate.value = selectedOptions[0].text
  showIsDisciplinaryPicker.value = false;
}
const forbid = ref(false)
watchEffect(() => {
  if (isViolate.value === '1') { // 有违纪,不禁止
    forbid.value = false;
  } else if (isViolate.value === '0') {
    forbid.value = true;
  }
})

// 违纪人
const disciplinaryPerson = ref('')
watchEffect(() => {
    // if()
})
// 学号
const stuNo = ref('')

// 专业班级
const majorClass = ref('')

// 违纪情况
const disciplinarySituation = ref('')
const showDisciplinarySituation = ref()
const showDisciplinarySituationPicker = ref(false)
const disciplinarySituations: any = reactive([])
const onConfirmDisciplinarySituation = ({ selectedOptions }: { selectedOptions: any }) => {
  disciplinarySituation.value = selectedOptions[0].dictId;
  showDisciplinarySituation.value = selectedOptions[0].dictName;
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
const identitys: any = reactive([])
const onConfirmIdentity = ({ selectedValues }: { selectedValues: any }) => {
  console.log(selectedValues);
  identity.value = selectedValues[0];
  showIdentity.value = identitys[selectedValues[0]].text
  showIdentityPicker.value = false;
}

// 提交表单
const router = useRouter()
const onSubmit = () => {
  router.push('/attendanceDetail')
}
onMounted(() => {
  // 获取字典
  dict.getCheckSection(sections)
  dict.getCheckType(types)
  dict.getArea(places)
  dict.getBuilding(buildings)
  dict.getViolation(disciplinarySituations)
  dict.getIdentity(identitys)
})
</script>

<template>
  <div class="pb-26" style="background-color: rgb( 247, 248, 250);">
    <van-form class="mx-1" @submit="onSubmit">
      <div class="mt-3 mb-7 shadow border">
        <van-field v-model="checkTime" is-link readonly name="datePicker" label="检查时间 :" placeholder="请选择"
          @click="showTimePicker = true" />
        <van-field v-model="showSection" is-link readonly name="showSection" label="检查节次 :" placeholder="请选择"
          @click="showSectionPicker = true" />
        <van-row>
          <van-col span="12">
            <van-field v-model="showCheckPlace" is-link readonly name="showCheckPlace" label="检查地点 :" label-width="70px"
              placeholder="请选择" @click="showPlacePicker = true" />
          </van-col>
          <van-col span="12">
            <van-field v-model="classRoom" readonly name="classRoom" label="教室/宿舍 :" label-width="70px" />
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
        <van-field v-model="showIsViolate" is-link readonly name="showIsDisciplinary" label="有无违纪 :" placeholder="请选择"
          @click="showIsDisciplinaryPicker = true" />
        <van-row>
          <van-col span="13">
            <van-field v-model="disciplinaryPerson" label="违 纪 人 :" placeholder="请输入学号" :disabled="forbid" />
          </van-col>
          <van-col span="11">
            <van-field v-model="stuNo" label="学 号 :" label-width="40px" :disabled="forbid" />
          </van-col>
        </van-row>
        <van-field v-model="majorClass" label="专业班级 :" :disabled="forbid" />
      </div>

      <div class="mb-7 shadow border">
        <van-field v-model="showDisciplinarySituation" is-link readonly name="showDisciplinarySituation" label="违纪情况 :"
          placeholder="请选择" :disabled="forbid" @click="showDisciplinarySituationPicker = true" />
        <van-field v-model="other" label="备 注 :" placeholder="请输入需要说明的事项" :disabled="forbid" />
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
      <van-date-picker @confirm="onConfirmTime" @cancel="showTimePicker = false" :min-date="minDate"
        :max-date="maxDate" />
    </van-popup>

    <!-- 节次 -->
    <van-popup v-model:show="showSectionPicker" round position="bottom">
      <van-picker :columns="sections" @cancel="showSectionPicker = false" @confirm="onConfirmSection"
        :columns-field-names="columnsFieldNames" />
    </van-popup>

    <!-- 地点 -->
    <!-- <van-popup v-model:show="showPlacePicker" round position="bottom">
      <van-picker :columns="places" @cancel="showCheckPlace = false" @confirm="onConfirmPlace"
        :columns-field-names="columnsFieldNames" />
    </van-popup> -->

    <van-popup v-model:show="showPlacePicker" round position="bottom">
      <van-cascader v-model="checkplace" title="请选择教学楼/宿舍区" :options="places" @close="showPlacePicker = false"
        @change="onChange" @finish="onConfirmPlace" :field-names="columnsFieldNames" />
    </van-popup>

    <!-- 类型 -->
    <van-popup v-model:show="showCheckTypePicker" round position="bottom">
      <van-picker :columns="types" @cancel="showCheckType = false" @confirm="onConfirmType"
        :columns-field-names="columnsFieldNames" />
    </van-popup>

    <!-- 有无违纪 -->
    <van-popup v-model:show="showIsDisciplinaryPicker" round position="bottom">
      <van-picker :columns="isDisciplinarys" @cancel="showCheckType = false" @confirm="onConfirmIsDisciplinary" />
    </van-popup>

    <!-- 违纪情况 -->
    <van-popup v-model:show="showDisciplinarySituationPicker" round position="bottom">
      <van-picker :columns="disciplinarySituations" @cancel="showDisciplinarySituationPicker = false"
        @confirm="onConfirmDisciplinarySituation" :columns-field-names="columnsFieldNames" />
    </van-popup>

    <!-- 身份选择 -->
    <van-popup v-model:show="showIdentityPicker" round position="bottom">
      <van-picker :columns="identitys" @cancel="showIdentityPicker = false" @confirm="onConfirmIdentity"
        :columns-field-names="columnsFieldNames" />
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
