<template>
    <v-container v-if="plantInfoData" :style="{ maxWidth: maxW }">
        <v-carousel color="#FFF" cycle height="400" v-if="plantImages" class="mb-3" :show-arrows="!showArrow">
            <v-carousel-item v-for="(item, i) in plantImages" :src="item" :key="i" cover></v-carousel-item>
        </v-carousel>
        
        <v-row v-for="(item, i) in plantInfos" :key="i" justify-start>
            <v-col cols="4" class="font-weight-bold">{{ item.name }}</v-col>
            <v-col cols="8">{{ item.value }}</v-col>
        </v-row>
    </v-container>
    <v-sheet v-else>
        get plant info ...
    </v-sheet>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import { getPlantInfo } from '../apis/PlantInfo'

const { thresholds, mobile } = useDisplay()
const showArrow = computed(()=>{
    return mobile.value
})
const route = useRoute()
// 指定最大宽度
const maxW = computed(() => {
    return thresholds.value.md + 'px'
})

const plantInfoData = ref(null)
const plantImages = ref(null)

onMounted(async () => {
    const plantInfo = await getPlantInfo(route.params.id)
    plantInfoData.value = plantInfo
})

const plantInfos = computed(() => {
    if (!plantInfoData.value) {
        return []
    }

    plantImages.value = [
        `/api/image/${route.params.id}-1.png?height=400`,
        `/api/image/${route.params.id}-2.png?height=400`,
        `/api/image/${route.params.id}-3.png?height=400`,
        `/api/image/${route.params.id}-4.png?height=400`,
    ]

    const plant = plantInfoData.value;
    return [
        { name: "乔木编号", value: plant.id },
        { name: "中文名称", value: plant.cnName },
        { name: "拉丁学名", value: plant.latinName },
        { name: "俗名土名", value: plant.commonName },
        { name: "经度", value: plant.longitude },
        { name: "纬度", value: plant.latitude },
        { name: "城区", value: plant.district },
        { name: "街道乡镇", value: plant.streetTown },
        { name: "社区", value: plant.community },
        { name: "道路名", value: plant.roadName },
        { name: "路段起始位置", value: plant.roadStart },
        { name: "路段截至位置", value: plant.roadEnd },
        { name: "绿地类型", value: plant.greenSpaceType },
        { name: "位于道路方向", value: plant.locatedInRoadDirection },
        { name: "树龄", value: plant.age },
        { name: "树龄确定方法", value: plant.ageDeterminationMethod },
        { name: "胸径", value: plant.chestDiameters },
        { name: "树高 (单位: 米)", value: plant.height },
        { name: "冠幅 (东西) (单位: 米)", value: plant.crownSpreadEW },
        { name: "冠幅 (南北) (单位: 米)", value: plant.crownSpreadSN },
        { name: "树穴（树池）形状", value: plant.poolShape },
        { name: "圆形树穴", value: plant.circleCave },
        { name: "方形树穴长 (单位: 厘米)", value: plant.squareLength },
        { name: "方形树穴宽 (单位: 厘米)", value: plant.squareWidth },
        { name: "病虫危害", value: plant.pestAndPathogenDamage },
        { name: "土壤", value: plant.soil },
        { name: "地面状况", value: plant.groundCondition },
        { name: "生长势", value: plant.growth },
        { name: "根茎叶状况", value: plant.rootStemLeafCondition },
        { name: "倾斜度", value: plant.tilt },
        { name: "胸径以下分株数", value: plant.dividedPlants },
        { name: "历史养护情况", value: plant.conservationStatus },
        { name: "影响树木生长的外部因素", value: plant.externalFactorsAffectingGrowth },
        { name: "对外部环境的安全隐患", value: plant.externalSecurityRisks },
        { name: "现状保护措施", value: plant.protectionMeasures },
        { name: "备注", value: plant.remarks },
    ];
})

</script>

<style scoped></style>