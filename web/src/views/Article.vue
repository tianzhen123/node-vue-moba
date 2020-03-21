<template>
  <div class="page-articles" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-Back text-blue"></div>
      <div class="flex-1 text-blue pl-2">{{model.title}}</div>
      <div class="text-gray" fs-xs>2020-2-2</div>
    </div>
    <div v-html="model.body" class="px-2 body"></div>
    <div class="px-3 py-2 border-top">
      <div class="d-flex ai-center">
        <i class="iconfont icon-menu1"></i>
        <span class="text-blue fs-lg ml-1">相关咨询</span>
      </div>
      <div class="pt-2">
        <router-link
          class="py-2"
          tag="div"
          :to="`/articles/${item._id}`"
          v-for="(item) in model.related"
          :key="item._id"
        >{{item.title}}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      model: null
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$http.get(`/article/${this.id}`);
      this.model = res.data;
    }
  },
  watch: {
      id(){
          this.getData()
      }
  },
};
</script>
<style lang="scss">
.page-articles {
  .icon-Back {
    font-size: 1.6923rem;
  }
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>