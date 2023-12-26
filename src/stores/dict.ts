import { acceptHMRUpdate, defineStore } from 'pinia'
import { getDict } from '~/api/dict'


export const useDictStore = defineStore('dict', () => {
    // 检查节次字典
    const checkSection: any = []
    async function getCheckSection(sections: any) {
        if (checkSection.length === 0) {
            checkSection.push(...(await getDict('check_section')).data)
        }
        sections.push(...checkSection)
    }

    // 检查类型字典
    const checkType: any = []
    async function getCheckType(types: any) {
        if (checkType.length === 0) {
            checkType.push(...(await getDict('check_type')).data)
        }
        types.push(...checkType)
    }

    // 检查教学楼/宿舍区字典
    const area: any = []
    async function getArea(places: any) {
        if (area.length === 0) {
            area.push(...(await getDict('area')).data)

        }
        places.push(...area)
    }

    // 楼栋字典
    const building: any = []
    async function getBuilding(buildings: any) {
        if (building.length === 0) {
            building.push(...(await getDict('building')).data)
        }
        buildings.push(...building)
    }

    // 违纪情况字典
    const violation: any = []
    async function getViolation(disciplinarySituations: any) {
        if (violation.length === 0) {
            violation.push(...(await getDict('violation_type')).data)
        }
        disciplinarySituations.push(...violation)
    }

      // 获取身份字典
      const identity: any = []
      async function getIdentity(identitys: any) {
          if (identity.length === 0) {
            identity.push(...(await getDict('checker_identity')).data)
          }
          identitys.push(...identity)
      }


    return {
        getCheckSection,
        getCheckType,
        getArea,
        getBuilding,
        getViolation,
        getIdentity
    }


})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
