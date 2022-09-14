<template>
  <div>
    <!-- 三级联动的组件 ,已是全局组件，无需引入 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "./ListContainer/index.vue";
import TodayRecommend from "./TodayRecommend/index.vue";
import Rank from "./Rank/index.vue";
import Like from "./Like/index.vue";
import Floor from "./Floor/index.vue";
import Brand from "./Brand/index.vue";

import { mapState } from "vuex";

export default {
  name: "Home",

  data() {
    return {};
  },

  mounted() {
    // 获取floor组件
    this.$store.dispatch("getFloorList");
    
  },

  methods: {},
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style scoped>
</style>