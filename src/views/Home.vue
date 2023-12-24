<template>
  <div class="page">
    <div class="header">
      销售管理系统
    </div>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa'}" hardline></van-divider>
    <div class="content">
      <div class="aside">
        <van-sidebar v-model="currentTag">
          <van-sidebar-item title="商品信息" />
          <van-sidebar-item title="订单信息" />
          <van-sidebar-item title="交易流水" />
        </van-sidebar>
      </div>
      <div class="main">
        <div v-if="currentTag === 0">
          <el-form label-width="80px" label-position="left">
            <el-form-item label="商品查询">
              <el-col :span="6">
                <el-input v-model="pagination.productName" placeholder="商品名称"></el-input>
              </el-col>
              <el-col :span="6">
                <el-input v-model="pagination.priceLowerBound" placeholder="商品单价下界"></el-input>
              </el-col>
              <el-col :span="6">
                <el-input v-model="pagination.priceUpperBound" placeholder="商品单价上界"></el-input>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" @click="getProductList">查询</el-button>
              </el-col>
            </el-form-item>     
          </el-form>
          <el-table current-row-key="productId" :data="productList" stripe highlight-current-row>
            <el-table-column prop="productId" align="center" label="序号"></el-table-column>
            <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="unitPrice" label="商品单价" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template v-slot="scope">
                <el-button type="primary" @click="console.log(scope.row)">编辑</el-button>
                <el-button type="danger" @click="console.log(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
          class="pagiantion"
          hide-on-single-page
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pagination.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <van-divider style="color: rgb(5, 6, 6)" hardline></van-divider>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Home',
  data() {
    return {
      currentTag: 0,
      productList:[
        {productId:1,productName:'苹果',unitPrice:5},
        {productId:2,productName:'香蕉',unitPrice:3},
        {productId:3,productName:'橘子',unitPrice:4},
        {productId:4,productName:'梨',unitPrice:2},
        {productId:5,productName:'西瓜',unitPrice:1},
        {productId:6,productName:'葡萄',unitPrice:6},
        {productId:7,productName:'草莓',unitPrice:7},
        {productId:8,productName:'樱桃',unitPrice:8},
        {productId:9,productName:'芒果',unitPrice:9},
        {productId:10,productName:'榴莲',unitPrice:10},
      ],

      // 分页数据
      pagination: {
        currentPage: 1,
        pageSize:10,
        total:20, 
        productName: "", 
        priceUpperBound: "",
        priceLowerBound: "",
      }
    };
  },
  mounted() {
    this.getProductList();
  },
  methods: {
    // 获取所有商品信息
    getProductList() {
      const pageInfo = 
      {
        pageNo: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        productName: this.pagination.productName,
        priceUpperBound: this.pagination.priceUpperBound,
        priceLowerBound: this.pagination.priceLowerBound,
      }
      axios.get("/api/product/get", { params: pageInfo })
      .then(res => {
        console.log("Response data:", res.data);
        this.productList = res.data.data.list;
        this.pagination.total = res.data.data.total;
      })
      .catch(err => {
        console.error("Error:", err);
      });
      // const loginInfo = {
      //   account: '15870104851',
      //   password: '1234',
      // }
      // axios.post('/api/user/user/login', {
      //   account: '15870104851',
      //   password: '1234',
      // })
      // .then((res) => {
      //   console.log("Response data:", res.data);
      // })
      // .catch((err) => {
      //   console.error("Error:", err);
      // });
    },

    // 分页
    handleCurrentChange(page) {
      console.log(`当前页: ${page}`);
      this.pagination.currentPage = page;
      this.getProductList();
    }
  }
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0 20px 5vh 20px;
}

.header {
  flex: 0 0 4vh;
  font-size: 4vh;
  font-weight: bold;
  text-align: center;
  line-height: 4vh;
  padding-top: 3vh;
}

.content {
  flex: 1; /* 中间部分占据剩余的空间 */
  display: flex;
}

.aside {
  flex: 0 0 10vw;
}

.main {
  flex: 1; /* 右侧占据剩余空间 */
}
</style>
