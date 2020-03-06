<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex jc-center">
      <img src="../assets/logo.png" height="35" />
      <div class="pl-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-gray-1 fs-xxs pt-1">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary pt-3 pb-2">
      <div class="nav d-flex text-white jc-around pb-1">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
</style>