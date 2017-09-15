<template>
  <section id="permission-list">
    <tkm-table :tableData="tableData"
               :headers="headers"
               :searchOperations="searchOperations"
               @init-data="initData"
               @search-operation="searchOperation"
               @rows-operation="rowsOperation">
    </tkm-table>
    <tkm-dialog ref="dialogForm" title="添加权限" cancelLabel="取消" confirmLabel="确定">
      <mu-text-field label="权限名称" v-model="dialogForm.name" hintText="请输入权限名称" labelFloat></mu-text-field>
      <mu-text-field label="权限URL地址" v-model="dialogForm.url" hintText="请输入权限URL地址" labelFloat></mu-text-field>
    </tkm-dialog>
    <tkm-dialog ref="dialog" title="警告" cancelLabel="取消" confirmLabel="确定">
      {{dialogMsg}}
    </tkm-dialog>
  </section>
</template>

<script>
  import permissionList from 'service/permission-list'
  import TkmDialog from 'components/tkm-dialog'
  import HasPermission from 'components/has-permission'
  import HasAnyRoles from 'components/has-any-roles'
  import TkmTable from 'components/tkm-table'
  export default{
    components: {
      TkmDialog,
      HasPermission,
      HasAnyRoles,
      TkmTable
    },
    data () {
      return {
        dialog: false,
        dialogMsg: '',
        dialogForm: {
          name: '',
          url: ''
        },
        tableData: [],
        searchOperations: [
          {
            name: '查询',
            action: 'onSubmit',
            type: 'normal'
          },
          {
            name: '增加权限',
            action: 'addPermission'
          },
          {
            name: '删除',
            action: 'deletePermissions',
            type: 'delete'
          }
        ],
        headers: [{name: '权限名称'}, {name: '权限url'}]
      }
    },
    methods: {
      initData (params, success, fail) {
        permissionList.getList.bind(this)({findContent: params.findContent, pageNo: params.pageNo}, (data) => {
          this.tableData = data
        }, (err) => {
          fail(err)
        })
      },
      rowsOperation (action, row, success, fail) {
        if (action === 'deletePermission') {
          this.dialogMsg = '确认要删除这个权限吗？'
          this.$refs.dialog.openDialog(() => {
            permissionList.deleteOne.bind(this)({row: row}, (data) => {
              success(data.message)
            }, (err) => {
              fail(err)
            })
          }, () => {
          })
        }
      },
      searchOperation (action, success, fail) {
        if (action === 'deletePermissions') {
          this.dialogMsg = '确认要删除这些权限吗？'
          this.$refs.dialog.openDialog(() => {
            permissionList.delete.bind(this)({tableData: this.tableData}, (data) => {
              success(data.message)
            }, (err) => {
              fail(err)
            })
          }, () => {
          })
        } else if (action === 'addPermission') {
          this.$refs.dialogForm.openDialog(() => {
            permissionList.addPermission.bind(this)({form: this.dialogForm}, (data) => {
              success(data.message)
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
