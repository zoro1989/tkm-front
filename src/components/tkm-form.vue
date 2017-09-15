<template>
  <section id="tkm-form">
    <slot name="search"></slot>
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
      tableData: {}
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
    }
  }

</script>

<style scoped>
</style>
