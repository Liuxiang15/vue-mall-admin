<template>
  <div class="menu-list">
    <!-- {{ $route }}
    {{ $router }} -->
    <!-- 默认选中
    默认展开 -->
    <a-menu
      :default-selected-keys="[
        $router.currentRoute.matched[1] ? $router.currentRoute.matched[1].name : ''
      ]"
      :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inline-collapsed="$store.state.collapsed"
    >
      <!-- 加filter解决v-for与v-if混合使用的问题 -->
      <!-- 当然也可以将v-for写在template上，然后对子元素a-sub-menu加v-if="!route.meta.hidden" -->
      <a-sub-menu
        v-for="route in $store.state.routes.filter(r => !r.meta.hidden)"
        :key="route.name"
      >
        <span slot="title">
          <a-icon type="mail" />
          <span>{{ route.meta.title }}</span>
        </span>
        <a-menu-item
          v-for="child in (route.children || []).filter(r => !r.meta.hidden)"
          :key="child.name"
          >{{ child.meta.title }}</a-menu-item
        >
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  created() {
    console.log('this.$router', this.$router);
    // window.$router = this.$router;
  },
};
</script>
