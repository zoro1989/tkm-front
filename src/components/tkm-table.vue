<template>
  <section id="tkm-table">
    <section class="search-content">
      <mu-text-field v-model="form.findContent" hintText="请输入搜索关键字" ></mu-text-field>
      <template v-for="operation in searchOperations">
        <mu-raised-button :label="operation.name"  @click="searchOptHandler(operation.action)" :backgroundColor="operation.type==='delete'?'red':'orange'"/>
      </template>
    </section>
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
            <mu-td>{{column.value}}</mu-td>
          </template>
          <mu-td>
            <template v-for="operation in row.operations">
              <mu-raised-button :label="operation.name"  @click="optHandler(operation.action, row)" :backgroundColor="operation.type==='delete'?'red':'pinkA200'"/>
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
      this.loadTable()
    },
    props: {
      headers: {},
      tableData: {},
      searchOperations: {}
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
        height: '70vh',
        form: {
          findContent: ''
        }
      }
    },
    watch: {
      selectedAll: function (newValue, oldValue) {
        if (isNotEmpty(newValue)) {
          if (newValue) {
            this.tableData.rows.map((row) => {
              row.selected = true
            })
          } else {
            this.tableData.rows.map((row) => {
              row.selected = false
            })
          }
        }
      }
    },
    methods: {
      loadTable () {
        let success = (msg) => {
          this.showSuccess(msg)
        }
        let fail = (err) => {
          this.showError(err)
        }
        this.$emit('init-data', { pageNo: this.pageNo, findContent: this.form.findContent }, success, fail)
      },
      optHandler (action, row) {
        let success = (msg) => {
          this.showSuccess(msg)
          this.loadTable()
        }
        let fail = (err) => {
          this.showError(err)
        }
        this.$emit('rows-operation', action, row, success, fail)
      },
      searchOptHandler (action, row) {
        let success = (msg) => {
          this.showSuccess(msg)
          this.loadTable()
        }
        let fail = (err) => {
          this.showError(err)
        }
        this.$emit('search-operation', action, success, fail)
      },
      pageChange (newIndex) {
        this.pageNo = newIndex
        this.loadTable()
      },
      rowClick (index, tr) {
        this.tableData.rows[index].selected = !this.tableData.rows[index].selected
      },
      showSuccess (msg) {
        if (msg) {
          this.$message({
            message: msg,
            type: 'success'
          })
        }
      },
      showError (msg) {
        if (msg) {
          this.$message.error(msg)
        }
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
  #tkm-table .mu-raised-button {
    margin: 1px;
  }
</style>
