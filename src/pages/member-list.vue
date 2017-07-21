<template>
  <section id="member-list">
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
  import memberList from 'service/member-list'
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
            action: 'deleteMembers',
            type: 'delete'
          }
        ],
        headers: [{name: '昵称'}, {name: 'Email/帐号'}, {name: '登录状态'}, {name: '创建时间'}, {name: '最后登录时间'}]
      }
    },
    methods: {
      initData (params, success, fail) {
        memberList.getList.bind(this)({findContent: params.findContent, pageNo: params.pageNo}, (data) => {
          this.tableData = data
        }, (err) => {
          fail(err)
        })
      },
      rowsOperation (action, row, success, fail) {
        if (action === 'forbidden') {
          memberList.forbidden.bind(this)({row: row}, (data) => {
            success(data.resultData)
          }, (err) => {
            fail(err)
          })
        } else if (action === 'deleteMember') {
          this.dialogMsg = '确认要删除这个用户吗？'
          this.$refs.dialog.openDialog(() => {
            memberList.deleteOne.bind(this)({row: row}, (data) => {
              success(data.resultData)
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
        if (action === 'deleteMembers') {
          this.dialogMsg = '确认要删除这些用户吗？'
          this.$refs.dialog.openDialog(() => {
            memberList.delete.bind(this)({tableData: this.tableData}, (data) => {
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
