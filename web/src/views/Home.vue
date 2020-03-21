<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide>
        <img class="w-100" src="../assets/images/69a1f1f20de3d7643e5d83d5ae7db353.png" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/67d519d72697d6f7c636349979eb05dc.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/f930c7abba819cf3bab25b077585c59e.jpeg" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end swiper -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-gray-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        收起
      </div>
    </div>
    <!-- end of icons -->
    <m-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link tag="div" :to="`/articles/${item._id}`" class="py-2 fs-lg d-flex" v-for="(item,i) in category.newsList" :key="i">
          <span class="text-info">[{{item.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{item.title}}</span>
          <span class="text-gray-1 fs-sm">{{item.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <div class="p-2" style="width:20%" v-for="(hero,i) in category.heroList" :key="i">
            <img class="w-100" :src="hero.avator" />
            <div class="text-center">{{hero.name}}</div>
          </div>
        </div>
      </template>
    </m-list-card>
    <m-card title="精彩视频" icon="menu1"></m-card>
    <m-card title="英雄列表" icon="menu1"></m-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "carrousel",
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      },
      newsCats: [],
      heroCats: []
    };
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
  methods: {
    async fetchNewsCats() {
      //  获取 news 列表
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    }
  },
};
</script>
<style lang="scss">
@import "../assets/scss/_variables.scss";
.pagination-home {
  .swiper-pagination-bullet {
    background: map-get($colors, "white");
    opacity: 1;
    border-radius: 0.1538rem;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "bule-1");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
