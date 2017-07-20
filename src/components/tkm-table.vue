<template>
  <section id="tkm-table">
    <mu-table :fixedHeader="fixedHeader" :selectable="selectable" :showCheckbox="showCheckbox"
              :multiSelectable="multiSelectable" :height="height" @rowClick="rowClick">
      <mu-thead slot="header">
        <mu-tr>
          <mu-th><mu-checkbox v-model="selectedAll" /></mu-th>
          <template v-for="head in headers">
            <mu-th :tooltip="head.name">{{head.name}}</mu-th>
          </template>
          <mu-th tooltip="操作">操作</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="row,index in tableData.rows"  :key="index" :selected="row.selected">
          <mu-td><mu-checkbox v-model="row.selected" /></mu-td>
          <template v-for="column in row.columns">
            <mu-td>{{column.name}}</mu-td>
          </template>
          <mu-td>
            <template v-for="operation in operations">
              <mu-raised-button :label="operation.name"  @click="optHandler(operation.action, row)" secondary/>
            </template>
          </mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <mu-pagination :total="tableData.totalCount" :current="tableData.pageNo" @pageChange="pageChange">
    </mu-pagination>
  </section>
</template>

<script>
  import isNotEmpty from 'utilities/is-not-empty'
  export default{
    created () {
    },
    props: {
      headers: {},
      tableData: {},
      operations: {}
    },
    data () {
      return {
        fixedHeader: true,
        selectable: true,
        showCheckbox: false,
        multiSelectable: true,
        selectedAll: false,
        totalCount: 1,
        pageNo: 1,
        height: '70vh'
      }
    },
    watch: {
      selectedAll: function (newValue, oldValue) {
        if (isNotEmpty(newValue)) {
          if (newValue) {
            this.tableData.map((row) => {
              row.selected = true
            })
          } else {
            this.tableData.map((row) => {
              row.selected = false
            })
          }
        }
      }
    },
    methods: {
      initData () {
      },
      optHandler (action, row) {

      },
      pageChange (newIndex) {
        this.tableData.pageNo = newIndex
        this.$emit('init-data', {pageNo: newIndex})
      },
      rowClick (index, tr) {
        this.tableData[index].selected = !this.tableData[index].selected
      }
    }
  }

</script>

<style scoped>
  #tkm-table .mu-pagination{
    justify-content: flex-end;
  }
  #tkm-table .mu-tr .mu-th,#tkm-table .mu-tr .mu-td{
    white-space:pre-wrap;
    word-wrap:break-word;
  }
  #tkm-table .mu-tr .mu-th:first-child,#tkm-table .mu-tr .mu-td:first-child{
    width: 100px;
    white-space:nowrap;
  }
  #tkm-table .mu-tr .mu-th:last-child,#tkm-table .mu-tr .mu-td:last-child{
    width: 200px;
    padding-left: 5px;
    padding-right: 5px;
  }
  #tkm-table .mu-table .mu-raised-button-secondary{
    width: 50px;
  }
</style>
