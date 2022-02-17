<template>
  <div class="product-list">
        <!-- 搜索 -->
        <search-box @submit="searchSubmit" :data="categoryList"/>
    </div>
</template>
<script>
import searchBox from '@/components/search.vue';
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryList: [],
      categoryObj: {},
    };
  },
  components: {
    searchBox,
  },
  async created() {
    await categoryApi.list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
  },
  methods: {
    searchSubmit(form) {
      console.log("searchSubmit", form)
      this.searchForm = form;
    },
  },
};
</script>
