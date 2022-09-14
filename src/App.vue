<template>
  <div >
    <h1 v-upper="msg"></h1>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
export default {
  name: "App",

  data() {
    return {
      msg:'ABC'
    };
  },

  mounted() {
    // 通知vuex发请求，获取数据，存储在仓库中
    this.$store.dispatch("categoryList");
    
  },

  methods: {},
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
</style>