<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { getDisciplinaryDetail, getConfirm } from '../../api/attendance'
const route = useRoute()
const checkRecordId: any = route.query.checkRecordId ?? 48
const checkSection = ref('')
const checkTime = ref('')
const checkTypeName = ref('')
const violationId = ref('')
const violationName = ref('')
const violationTypeName = ref('')

function formatYearMonthDay(date :any) {
    if (!(date instanceof Date)) {
        throw new Error("传递的参数不是有效的 Date 对象");
    }

    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份是从0开始的，所以要加1
    var day = date.getDate().toString().padStart(2, '0');

    return year + "年" + month + "月" + day + "日";
}

onMounted(() => {
    // 用一下promise写法,比async麻烦很多
    getDisciplinaryDetail(checkRecordId).then((res) => {
        ({
            checkSection: checkSection.value,
            checkTime: checkTime.value,
            checkTypeName: checkTypeName.value,
            violationId: violationId.value,
            violationName: violationName.value,
            violationTypeName: violationTypeName.value
        } = res.data)
    }).then(() => {
        return getConfirm(checkRecordId)
    }).then((res)=>{
        console.log(res);
    })
})

</script>

<template>
    <div class="m-0 p-0 h-full">
        <div class="flex justify-center ">
            <div class="text-xl w-90% mt-20 py-20 shadow ">
                &nbsp;&nbsp; &nbsp; {{ violationName }}同学(学号:{{ violationId }}),你在{{ checkTime }}{{ checkTypeName }}检查中{{
                    violationTypeName }},
                请你严格遵守校规校纪,如有异议,请及时反馈.
            </div>
        </div>

        <div class="text-lg font-bold  right-bottom">
            <div>
                资安学工学工办
            </div>
            <div>
                {{ formatYearMonthDay(new Date) }}
            </div>
        </div>
    </div>
</template>


<style scoped>
.shadow {
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
}

.right-bottom {
    margin-right: 1rem;
    margin-bottom: 10rem;
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>

<route lang="yaml">
meta:
  layout: default
  title: '违纪提示'
</route>
