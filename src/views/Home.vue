<template>
  <div class="page">
    <div class="header">
      销售管理系统
    </div>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa'}" hardline></van-divider>
    <div class="content">
      <div class="aside">
        <van-sidebar v-model="currentTag">
          <van-sidebar-item title="商品管理" />
          <van-sidebar-item title="订单管理" />
          <van-sidebar-item title="交易流水" />
        </van-sidebar>
      </div>
      <div class="main">
        <div v-if="currentTag === 0">
          <el-form label-width="80px" label-position="left">
            <el-form-item label="商品查询">
              <el-col :span="7">
                <el-input v-model="productPagination.productName" placeholder="商品名称"></el-input>
              </el-col>
              <el-col :span="7">
                <el-input v-model="productPagination.priceLowerBound" placeholder="商品单价下界"></el-input>
              </el-col>
              <el-col :span="7">
                <el-input v-model="productPagination.priceUpperBound" placeholder="商品单价上界"></el-input>
              </el-col>
              <el-col :span="3">
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
            @current-change="handleProductPageChange"
            :current-page="productPagination.currentPage"
            :page-size="productPagination.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="productPagination.total">
          </el-pagination>
        </div>
        <div v-if="currentTag === 1">
          <el-form label-width="80px" label-position="left">
            <el-form-item label="订单查询">
              <el-col :span="7">
                <el-input v-model="orderPagination.customerName" placeholder="客户姓名"></el-input>
              </el-col>
              <el-col :span="7">
                <el-date-picker
                  v-model="orderPagination.startTime"
                  type="datetime"
                  placeholder="起始时间">
                </el-date-picker>
              </el-col>
              <el-col :span="7">
                <el-date-picker
                  v-model="orderPagination.endTime"
                  type="datetime"
                  placeholder="截止时间">
                </el-date-picker>
              </el-col>
              <el-col :span="3">
                <el-button type="primary" @click="getOrderList">查询</el-button>
              </el-col>
            </el-form-item>     
          </el-form>
          <el-table current-row-key="orderId" :data="orderList" stripe highlight-current-row>
            <el-table-column prop="orderId" align="center" label="序号"></el-table-column>
            <el-table-column prop="customerName" label="顾客姓名" align="center"></el-table-column>
            <el-table-column prop="orderDate" label="订单日期" align="center"></el-table-column>
            <el-table-column prop="paymentDate" label="支付日期" align="center"></el-table-column>
            <el-table-column prop="paymentMethod" label="支付方式" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template v-slot="scope">
                  <el-button type="primary" @click="handleOrderClick(scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="订单详细信息页" v-model="showOrderDetails" center>
            <el-table :data="orderDetailInfo" stripe highlight-current-row>
              <el-table-column prop="orderDetailId" align="center" label="序号"></el-table-column>
              <el-table-column prop="orderId" label="订单ID" align="center"></el-table-column>
              <el-table-column prop="productId" label="商品ID" align="center"></el-table-column>
              <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
              <el-table-column prop="quantity" label="商品数量" align="center"></el-table-column>
              <el-table-column prop="unitPrice" label="商品单价" align="center"></el-table-column>
              <el-table-column prop="sumPrice" label="商品总价" align="center"></el-table-column>
            </el-table>
          </el-dialog>
          <el-pagination
            class="pagiantion"
            hide-on-single-page
            @current-change="handleOrderPageChange"
            :current-page="orderPagination.currentPage"
            :page-size="orderPagination.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="orderPagination.total">
          </el-pagination>
        </div>
        <div v-if="currentTag === 2">
          <el-form label-width="80px" label-position="left">
            <el-form-item label="交易流水">
              <el-col :span="7">
                <el-input v-model="transactionPagination.productName" placeholder="商品名称"></el-input>
              </el-col>
              <el-col :span="7">
                <el-date-picker
                  v-model="transactionPagination.startTime"
                  type="datetime"
                  placeholder="起始时间">
                </el-date-picker>
              </el-col>
              <el-col :span="7">
                <el-date-picker
                  v-model="transactionPagination.endTime"
                  type="datetime"
                  placeholder="截止时间">
                </el-date-picker>
              </el-col>
              <el-col :span="3">
                <el-button type="primary" @click="getTransactionList">查询</el-button>
              </el-col>
            </el-form-item>     
          </el-form>
          <el-table current-row-key="productId" :data="transactionList" stripe highlight-current-row>
            <el-table-column prop="productId" align="center" label="序号"></el-table-column>
            <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="saleQuantity" label="售出数量" align="center"></el-table-column>
            <el-table-column prop="saleAmount" label="总金额" align="center"></el-table-column>
          </el-table>
          <el-pagination
            class="pagiantion"
            hide-on-single-page
            @current-change="handleTransactionPageChange"
            :current-page="transactionPagination.currentPage"
            :page-size="transactionPagination.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="transactionPagination.total">
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
      productList:[], // 商品列表
      orderList:[{orderId:1,customerName:'hahah',orderDate:'2023-12-23',paymentDate:'11', paymentMethod:'22'}], // 销售列表
      orderDetailInfo:[{orderDetailId:1,orderId:1,productId:1,productName:'hahah',quantity:1,unitPrice:1,sumPrice:1}], // 订单详情
      showOrderDetails: false, // 是否显示订单详情
      transactionList:[], // 交易流水列表

      // 商品信息分页数据
      productPagination: {
        currentPage: 1,
        pageSize:10,
        total:0, 
        productName: "", 
        priceUpperBound: "",
        priceLowerBound: "",
      },

      // 订单信息分页数据
      orderPagination: {
        currentPage: 1,
        pageSize:10,
        total:0, 
        customerName: "", 
        startTime: "",
        endTime: "",
      },

      // 交易流水分页数据
      transactionPagination: {
        currentPage: 1,
        pageSize:10,
        total:0, 
        productName: "", 
        startTime: "",
        endTime: "",
      }
    };
  },
  mounted() {
    this.getProductList();
    this.getOrderList();
    this.getTransactionList();
  },
  methods: {
    // 获取所有商品信息
    getProductList() {
      const pageInfo = 
      {
        pageNo: this.productPagination.currentPage,
        pageSize: this.productPagination.pageSize,
        productName: this.productPagination.productName,
        priceUpperBound: this.productPagination.priceUpperBound,
        priceLowerBound: this.productPagination.priceLowerBound,
      }
      axios.get("/api/product/get", { params: pageInfo })
      .then(res => {
        console.log("Response data:", res.data);
        this.productList = res.data.data.list;
        this.productPagination.total = res.data.data.total;
      })
      .catch(err => {
        console.error("Error:", err);
      });
    },

    // 获取所有订单信息
    getOrderList() {
      const pageInfo = 
      {
        pageNo: this.orderPagination.currentPage,
        pageSize: this.orderPagination.pageSize,
        customerName: this.orderPagination.customerName,
        startTime: this.orderPagination.startTime,
        endTime: this.orderPagination.endTime,
      }
      axios.get("/api/order/get", { orderQuery: pageInfo })
      .then(res => {
        console.log("Response data:", res.data);
        this.orderList = res.data.data.list;
        this.orderPagination.total = res.data.data.total;
      })
      .catch(err => {
        console.error("Error:", err);
      });
    },

    // 处理订单点击事件
    handleOrderClick(row) {
      console.log(row);
      axios.get('/orderDetail/getById', {
        params: {
          id: row.orderId
        }
      })
      .then(response => {
        console.log(response.data);
        this.orderDetailInfo = response.data.data;
      })
      .catch(error => {
        console.error(error);
      });
      this.showOrderDetails = true;
      console.log(this.showOrderDetails);
    },

    // 处理订单信息分页
    handleOrderPageChange(page) {
      this.orderPagination.currentPage = page;
      this.getOrderList();
    },

    // 处理商品信息分页
    handleProductPageChange(page) {
      this.productPagination.currentPage = page;
      this.getProductList();
    },

    // 获取所有交易流水信息
    getTransactionList() {
      const pageInfo = 
      {
        pageNo: this.transactionPagination.currentPage,
        pageSize: this.transactionPagination.pageSize,
        productName: this.transactionPagination.productName,
        startTime: this.transactionPagination.startTime,
        endTime: this.transactionPagination.endTime,
      }
      axios.get("/api/orderDetail/getStatistics", { statisticsQuery: pageInfo })
      .then(res => {
        console.log("Response data:", res.data);
        this.transactionList = res.data.data.list;
        this.transactionPagination.total = res.data.data.total;
      })
      .catch(err => {
        console.error("Error:", err);
      });
    },

    // 处理交易流水分页
    handleTransactionPageChange(page) {
      this.transactionPagination.currentPage = page;
      this.getTransactionList();
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
