<template>
  <div class="product-list">
        <!-- 搜索 -->
        <search-box @submit="searchSubmit" :data="categoryList"/>
        <!-- 表格 -->
        <ProductTable :data="tableData" />
    </div>
</template>
<script>
import searchBox from '@/components/search.vue';
import ProductTable from '@/components/productTable.vue';
import categoryApi from '@/api/category';
import api from '@/api/product';

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
    ProductTable,
  },
  async created() {
    await categoryApi.list().then((res) => {
      this.categoryList = res.data;
      console.log(
        "categoryApi", this.categoryList
      )
      // res.data.forEach((item) => {
      //   this.categoryObj[item.id] = item;
      // });
    });
    this.getTableData()
  },
  methods: {
    searchSubmit(form) {
      console.log('searchSubmit', form);
      this.searchForm = form;
    },
    getTableData() {
      api
        .list({
          // page: this.page.current,
          // size: this.page.pageSize,
          ...this.searchForm,
        })
        .then((res) => {
          console.log(res);
          // this.page.total = res.total;
          this.tableData = res.data.map((item) => ({
            ...item,
            // categoryName: this.categoryObj[item.category].name,
          }));
        });
    },
  },
};
</script>
