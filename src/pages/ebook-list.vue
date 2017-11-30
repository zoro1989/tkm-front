<template>
  <section id="ebook-list">
    <tkm-table :tableData="tableData"
               :headers="headers"
               :searchOperations="searchOperations"
               @init-data="initData"
               @search-operation="searchOperation"
               @rows-operation="rowsOperation">
    </tkm-table>
    <tkm-dialog ref="dialog" title="警告" cancelLabel="取消" confirmLabel="确定">
      {{dialogMsg}}
    </tkm-dialog>
  </section>
</template>
<script>
  import ebookList from 'service/ebook-list'
  import TkmDialog from 'components/tkm-dialog'
  import TkmTable from 'components/tkm-table'
  export default{
    components: {
      TkmDialog,
      TkmTable
    },
    data () {
      return {
        dialog: false,
        dialogMsg: '',
        tableData: [],
        searchOperations: [
          {
            name: '查询',
            action: 'onSubmit',
            type: 'normal'
          },
          {
            name: '删除',
            action: 'deleteTips',
            type: 'delete'
          },
          {
            name: '添加',
            action: 'addTip'
          }
        ],
        headers: [{name: 'Tip编号'}, {name: 'Tip标题'}, {name: '修改时间'}, {name: '创建时间'}]
      }
    },
    methods: {
      initData (params, success, fail) {
        ebookList.getList.bind(this)({findContent: params.findContent, pageNo: params.pageNo}, (data) => {
          this.tableData = data
        }, (err) => {
          fail(err)
        })
      },
      rowsOperation (action, row, success, fail) {
        if (action === 'deleteTip') {
          this.dialogMsg = '确认要删除这个Tip吗？'
          this.$refs.dialog.openDialog(() => {
            ebookList.deleteOne.bind(this)({row: row}, (data) => {
              success(data.message)
            }, (err) => {
              fail(err)
            })
          }, () => {
          })
        }
        if (action === 'editTip') {
          this.$router.replace({
            path: `/ebook-list/${row.columns[0].value}`
          })
        }
      },
      searchOperation (action, success, fail) {
        if (action === 'deleteTips') {
          this.dialogMsg = '确认要删除这些Tip吗？'
          this.$refs.dialog.openDialog(() => {
            ebookList.delete.bind(this)({tableData: this.tableData}, (data) => {
              success(data.message)
            }, (err) => {
              fail(err)
            })
          }, () => {
          })
        } else if (action === 'addTip') {
          this.$router.replace({
            path: `/ebook-list/0`
          })
        } else {
          success()
        }
      }
    }
  }
</script>
<style scoped>
</style>
