<template>
  <div class="menu-list">
    <!-- {{ $route }}
    {{ $router }} -->
    <!-- 默认选中
    默认展开 -->
    <a-menu
      :default-selected-keys="[defaultSelectKey]"
      :default-open-keys="[defaultOpenKey]"
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
          <a-icon :type="route.meta.icon" />
          <span>{{ route.meta.title }}</span>
        </span>
        <!-- <a-menu-item
          v-for="child in (route.children || []).filter(r => !r.meta.hidden)"
          :key="child.name"
          >
          <router-link :to="{name:child.name}">
            <a-icon :type="child.meta.icon" />
            {{ child.meta.title }}
          </router-link>
          </a-menu-item
        > -->
        <template v-for="child in route.children">
          <a-menu-item v-if="!child.meta.hidden"  :key="child.name">
            <router-link :to="{name: child.name}">
              <a-icon :type="child.meta.icon" />
              {{child.meta.title}}
            </router-link>
          </a-menu-item>
        </template>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  computed: {
    defaultSelectKey: {
      get() {
        return this.$router.currentRoute.matched[1]
          ? this.$router.currentRoute.matched[1].name
          : '';
      },
    },
    defaultOpenKey: {
      get() {
        return this.$router.currentRoute.matched[0].name;
      },
    },
  },
  watch: {
    $route() {

    },
  },
  created() {
    console.log('this.$router', this.$router);
    // window.$router = this.$router;
  },
};
</script>
