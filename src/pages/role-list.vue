<template>
  <section id="role-list">
    <tkm-table :tableData="tableData"
               :headers="headers"
               :searchOperations="searchOperations"
               @init-data="initData"
               @search-operation="searchOperation"
               @rows-operation="rowsOperation">
    </tkm-table>
    <tkm-dialog ref="dialogForm" title="添加角色" cancelLabel="取消" confirmLabel="确定">
      <mu-text-field label="角色名称" v-model="dialogForm.name" hintText="请输入角色名称" labelFloat></mu-text-field>
      <mu-text-field label="角色类型" v-model="dialogForm.type" hintText="请输入角色类型  [字母 + 数字] 6位" labelFloat></mu-text-field>
    </tkm-dialog>
    <tkm-dialog ref="dialog" title="警告" cancelLabel="取消" confirmLabel="确定">
      {{dialogMsg}}
    </tkm-dialog>
  </section>
</template>

<script>
  import roleList from 'service/role-list'
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
        dialogForm: {
          name: '',
          type: ''
        },
        tableData: [],
        searchOperations: [
          {
            name: '查询',
            action: 'onSubmit',
            type: 'normal'
          },
          {
            name: '增加角色',
            action: 'addRole',
            type: 'normal'
          },
          {
            name: '删除',
            action: 'deleteRoles',
            type: 'delete'
          }
        ],
        headers: [{name: '角色名称'}, {name: '角色类型'}]
      }
    },
    methods: {
      initData (params, success, fail) {
        roleList.getList.bind(this)({findContent: params.findContent, pageNo: params.pageNo}, (data) => {
          this.tableData = data
        }, (err) => {
          fail(err)
        })
      },
      rowsOperation (action, row, success, fail) {
        if (action === 'deleteRole') {
          this.dialogMsg = '确认要删除这个角色吗？'
          this.$refs.dialog.openDialog(() => {
            roleList.deleteOne.bind(this)({row: row}, (data) => {
              success(data.resultData)
            }, (err) => {
              fail(err)
            })
          }, () => {
          })
        }
      },
      searchOperation (action, success, fail) {
        if (action === 'deleteRoles') {
          this.dialogMsg = '确认要删除这些角色吗？'
          this.$refs.dialog.openDialog(() => {
            roleList.delete.bind(this)({tableData: this.tableData}, (data) => {
              success(data.resultData)
            }, (err) => {
              fail(err)
            })
          }, () => {
          })
        } else if (action === 'addRole') {
          this.$refs.dialogForm.openDialog(() => {
            roleList.addRole.bind(this)({form: this.dialogForm}, (data) => {
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
