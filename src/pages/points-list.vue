<template>
  <section id="points-list">
    <tkm-table :tableData="tableData"
               :headers="headers"
               :searchOperations="searchOperations"
               @init-data="initData"
               @search-operation="searchOperation"
               @rows-operation="rowsOperation">
    </tkm-table>
    <tkm-dialog ref="dialog" title="知识点" cancelLabel="取消" confirmLabel="确定">
      <quill-editor v-model="pointsContent">
      </quill-editor>
    </tkm-dialog>
  </section>
</template>

<script>
  import pointList from 'service/points-list'
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
        pointsContent: '',
        searchOperations: [
          {
            name: '查询',
            action: 'onSubmit',
            type: 'normal'
          },
          {
            name: '删除',
            action: 'deletePoints',
            type: 'delete'
          }
        ],
        headers: [{name: '标题'}]
      }
    },
    methods: {
      initData (params, success, fail) {
        pointList.getList.bind(this)({findContent: params.findContent, pageNo: params.pageNo}, (data) => {
          this.tableData = data
        }, (err) => {
          fail(err)
        })
      },
      rowsOperation (action, row, success, fail) {
        if (action === 'editPoint') {
          pointList.editPoint.bind(this)({row: row}, (data) => {
            this.pointsContent = data.detail
            this.$refs.dialog.openDialog(() => {
              row.detail = this.pointsContent
              pointList.save.bind(this)({row: row}, (data) => {
                success(data.message)
              }, (err) => {
                fail(err)
              })
            }, () => {
            })
          }, (err) => {
            fail(err)
          })
        } else if (action === 'deletePoint') {
          this.dialogMsg = '确认要删除这个知识点吗？'
          this.$refs.dialog.openDialog(() => {
            pointList.deleteOne.bind(this)({row: row}, (data) => {
              success(data.message)
            }, (err) => {
              fail(err)
            })
          }, () => {
          })
        } else {
          success()
        }
      },
      searchOperation (action, success, fail) {
        if (action === 'deletePoints') {
          this.dialogMsg = '确认要删除这些知识点吗？'
          this.$refs.dialog.openDialog(() => {
            pointList.delete.bind(this)({tableData: this.tableData}, (data) => {
              success(data.resultData)
            }, (err) => {
              fail(err)
            })
          }, () => {
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
