<template>
  <a-card style="background-color: white;">
    <transition name="fade-slide" mode="out-in">
      <div v-if="!showReviewPage">
        <a-row :gutter="16"  type="flex"  justify="end">
        <!-- First Column -->

          <a-col :flex="auto">
                <a-form-item label="提现订单号">
                  <a-input v-model="gameId" placeholder="" />
                </a-form-item>
          </a-col>

          <a-col :flex="1">
                <a-form-item label="主播昵称">
                  <a-input v-model="gameId" placeholder="" />
                </a-form-item>
          </a-col>

          <a-col :flex="1">
            <a-form-item label="房间号">
              <a-input v-model="nBetting" placeholder="" />
            </a-form-item>
          </a-col>
          
          <a-col :flex="1">
              <a-form-item label="状态">
                <a-select v-model="status" value="all">
                  <a-select-option value="all">全部</a-select-option>
                  <a-select-option value="processing">提现中</a-select-option>
                  <a-select-option value="success">提现成功</a-select-option>
                  <a-select-option value="failed">提现失败</a-select-option>
                </a-select>
              </a-form-item>
          </a-col>

          <a-col :flex="1">
            <a-form-item label="时间">
                <a-range-picker :placeholder="['开始日期', '结束日期']">
                  <!-- options here -->
                </a-range-picker>
            </a-form-item>
          </a-col>

          <a-col :span="2">
              <a-form-item>
                <a-button type="primary" block @click="onSearch">查询</a-button>
              </a-form-item>
          </a-col>

          <a-col :flex="auto">
              <a-form-item>
                <a-button type="primary" block @click="onReset">提现设置</a-button>
              </a-form-item>
          </a-col>
          
          <a-col :flex="auto">
              <a-form-item>
                <a-button type="primary" block @click="onReset">导出CSV</a-button>
              </a-form-item>
          </a-col>

        </a-row>

        <!-- Your existing layout and table setup -->
        <a-table :data-source="paginatedData" :pagination="false">
          <a-table-column title="提现订单号" dataIndex="wOrderID" key="wOrderID" align="center" />
          <a-table-column title="主播昵称" dataIndex="nickName" key="nickName" align="center" />
          <a-table-column title="房间号" dataIndex="roomID" key="roomID" align="center" />
          <a-table-column title="所属工会" dataIndex="union" key="union" align="center" />
          <a-table-column title="提现信息" dataIndex="wInfo" key="wInfo" align="center" />
          <a-table-column title="收款信息" dataIndex="rInfo" key="rInfo" align="center">
          </a-table-column>
          <a-table-column title="时间" dataIndex="time" key="time" align="center">
          </a-table-column>
          <a-table-column title="提现状态" dataIndex="wStatus" key="wStatus" align="center">
          </a-table-column>
          <a-table-column title="操作账号" dataIndex="account" key="account" align="center">
          </a-table-column>
          <a-table-column title="操作" dataIndex="operate" key="operate" align="center">
          </a-table-column>

          <template #bodyCell="{ column, text }">

            <!-- Wrap wOrderID text by 9 characters -->
            <span v-if="column.dataIndex === 'wOrderID'">
              <div v-for="(line, index) in chunkText(text, 9)" :key="index" style="text-align: left;">
                {{ line }}
              </div>
            </span>

            <!-- add copy link text -->
            <span v-else-if="column.dataIndex === 'rInfo'">
              <div v-for="(line, index) in text.split('\n')" :key="index" style="display: flex; justify-content: space-between;">
                <span style="text-align: left;">{{ line }}</span>
                <a-button style="font-size: 9px" type="link" size="small" @click="copyText(line)">复制</a-button>
              </div>
            </span>

            <!-- Left align specific columns: wInfo, rInfo, time -->
            <span v-else-if="['wInfo', 'time'].includes(column.dataIndex)">
              <div v-for="(line, index) in text.split('\n')" :key="index" style="text-align: left;">
                {{ line }}
              </div>
            </span>

            <span v-else-if="column.dataIndex === 'wStatus'">
              <span v-if="text === '提现中'" style="color: blue;">{{ text }}</span>
              <span v-else-if="text === '提现成功'" style="color: green;">{{ text }}</span>
              <span v-else style="color: red;">{{ text }}</span>
            </span>

            <span v-else-if="column.dataIndex === 'operate'">
              <span v-if="text === '已锁定'" style="text-decoration: underline;color: blue;">
                <span style="text-decoration: underline;color: blue; cursor: pointer;" @click="handleOperation(text)">
                  {{ text }}
                </span>
              </span>
              <span v-else-if="text === '提现明细'" style="text-decoration: underline;color: green;">
                <span style="text-decoration: underline;color: green; cursor: pointer;" @click="handleOperation(text)">
                  {{ text }}
                </span>
              </span>
              <span v-else-if="text === '已拒绝'" style="text-decoration: underline;color: red;">
                <span style="text-decoration: underline;color: red;  cursor: pointer;" @click="handleOperation(text)">
                  {{ text }}
                </span>
              </span>
              <span v-else>
                <span style="text-decoration: underline;color: green; margin-right: 8px; cursor: pointer;" @click="handleOperation('审核')">审核</span>
                <span style="text-decoration: underline;color: blue; cursor: pointer;" @click="handleOperation('锁定')">锁定</span>
              </span>
            </span>

            <!-- Default rendering for other columns -->
            <span v-else>{{ text }}</span>
          </template>


        </a-table>

        <div style="display: flex; align-items: center; justify-content: flex-end; margin-top: 16px;">
          <span style="margin-right: 8px;">共 {{ totalItems }}条</span>
          <a-pagination
            v-model:current="currentPage"
            :total="totalItems"
            :page-size="pageSize"
            show-size-changer
            :page-size-options="['5', '10', '20', '50', '100']"
            :simple="false"
            size="small"
            @change="handlePageChange"
            @show-size-change="handleSizeChange"
          />
        </div>
      </div>

    <div v-else>
      
      <review-page
        :basicData="basicData"
        :currentWithdraw="currentWithdraw"
        :historyWithdraw="historyWithdraw"
        :paymentInfo="paymentInfo"
        withdrawStatus="提现中"
        
        @back="onBackToMainPage"
        @confirm="handleConfirm"
        @reject="handleReject" />
    </div>

    </transition>
  </a-card>
</template>

<script>

import { message } from 'ant-design-vue';
import reviewPage from '../review/index.vue';

export default {
  components: {
    reviewPage,
  },
  data() {
    return {
      showReviewPage: false, // New state to manage which view to show

      currentPage: 1,
      pageSize: 5,
      totalItems: 100,

      dataSource: [
        {
          key: '1',
          wOrderID: '230721092345500001',
          nickName: '桃之夭夭',
          roomID: '32423',
          union: '蒂萨传媒',
          wInfo: '收款货币：印尼盾\n手续费：10%\n提现金额：1000',
          rInfo: '提现银行：中国建设银行\n银行卡号：3423423432\n姓名：张三',
          time: '申请时间：2012-12-12  12:21:21\n操作时间：',
          wStatus: '提现中',
          account: '',
          operate: '审核   锁定',
        },
        {
          key: '2',
          wOrderID: '230721092345500001',
          nickName: '桃之夭夭',
          roomID: '32423',
          union: '蒂萨传媒',
          wInfo: '收款货币：USTD\n手续费：10%\n提现金额：1000',
          rInfo: '提现银行：中国建设银行\n银行卡号：3423423432\n姓名：张三',
          time: '申请时间：2012-12-12  12:21:21\n操作时间：2012-12-12  12:21:21',
          wStatus: '提现成功',
          account: '管理员 - 张三',
          operate: '提现明细',
        },
        {
          key: '3',
          wOrderID: '230721092345500001',
          nickName: '桃之夭夭',
          roomID: '32423',
          union: '蒂萨传媒',
          wInfo: '收款货币：印尼盾\n手续费：10%\n提现金额：1000',
          rInfo: '提现银行：中国建设银行\n银行卡号：3423423432\n姓名：云南建设银行',
          time: '申请时间：2012-12-12  12:21:21\n操作时间：',
          wStatus: '提现失败',
          account: '管理员 - 张三',
          operate: '已拒绝',
        },
        {
          key: '4',
          wOrderID: '230721092345500001',
          nickName: '桃之夭夭',
          roomID: '32423',
          union: '蒂萨传媒',
          wInfo: '收款货币：印尼盾\n手续费：10%\n提现金额：1000',
          rInfo: '提现银行：中国建设银行\n银行卡号：3423423432\n姓名：云南建设银行',
          time: '申请时间：2012-12-12  12:21:21\n操作时间：',
          wStatus: '提现中',
          account: '管理员 - 张三',
          operate: '已锁定',
        },
        {
          key: '5',
          wOrderID: '230721092345500001',
          nickName: '桃之夭夭',
          roomID: '32423',
          union: '蒂萨传媒',
          wInfo: '收款货币：印尼盾\n手续费：10%\n提现金额：1000',
          rInfo: '提现银行：中国建设银行\n银行卡号：3423423432\n姓名：云南建设银行',
          time: '申请时间：2012-12-12  12:21:21\n操作时间：',
          wStatus: '提现成功',
          account: '管理员 - 张三',
          operate: '提现明细',
        },
        
      ],

      // props for review page
      basicData: {
        nickname: '大小事',
        deviceId: 'FHJ-32424',
        registrationTime: '2022-12-12 12:21:21',
        roomId: '500001',
        loginIP: '123.321.213.231',
        lastLoginTime: '2022-12-12 12:21:21'
      },
      currentWithdraw: {
        currency: 'USDT-HJDSH32',
        amount: 1000,
        address: 'XXXX地址',
        orderId: '42384242348234',
        fee: 24,
        network: 'XXXXXXXX网络',
        expectedAmount: 1000000,
        applicationTime: '2022-12-12 12:21:21'
      },
      historyWithdraw: {
        count: 5,
        totalAmount: 10000,
        totalInRMB: 10000
      },
      paymentInfo: {
        currency: '',
        address: '',
        network: ''
      },
    };
  },
  
  computed: {
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.dataSource.slice(start, end);
    },
  },
  methods: {
    chunkText(text, chunkSize) {
      const regex = new RegExp(`.{1,${chunkSize}}`, 'g');
      return text.match(regex) || [];
    },
    copyText(text) {
      navigator.clipboard.writeText(text).then(() => {
        message.success({
          content: `已成功复制到剪贴板。`,
          duration: 0.5, // Duration in seconds
        });
      }).catch(() => {
        message.error({
          content: '复制到剪贴板失败，请重试。',
          duration: 0.5, // Duration in seconds
        });
      });
    },

    onSearch() {
      // Implement search logic
    },
    onReset() {
      this.merchantId = '';
      this.gameId = '';
      this.platform = '';
      this.nBetting = '';
      this.status = '';
      // Implement reset logic
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    handleSizeChange(current, size) {
      this.pageSize = size;
      this.currentPage = 1; // Reset to the first page when page size changes
    },

    handleOperation(operation) {
      // Add logic for handling the operation (e.g., audit, lock)
      if(operation === "提现明细")
      this.showReviewPage = true; // Switch to the add strategy view
    },

    onBackToMainPage() {
      this.showReviewPage = false; // Switch back to the main table view
    },
    handleConfirm() {
      console.log('Confirmed');
    },
    handleReject() {
      console.log('Rejected');
    }

  },
};
</script>

<style scoped>
.expanded-row-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-left: 40px;  /* Add margin to the whole sub-row */
}

.row {
  display: contents;
}

.cell {
  padding: 8px;
  white-space: pre-line; /* Ensure text wraps in each cell */
}

/* Add transition effects */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter, .fade-slide-leave-to /* .fade-slide-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateX(10px);
}
</style>
