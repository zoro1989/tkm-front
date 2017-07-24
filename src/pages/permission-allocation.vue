<template>
  <section id="permission-allocation">
    <tkm-table :tableData="tableData"
               :headers="headers"
               :searchOperations="searchOperations"
               @init-data="initData"
               @search-operation="searchOperation"
               @rows-operation="rowsOperation">
    </tkm-table>
    <tkm-dialog ref="dialogForm" title="添加权限" cancelLabel="取消" confirmLabel="确定">
      <template v-for="permission in permissions">
        <mu-checkbox :label="permission.name" v-model="permissionIds" :nativeValue="permission.id"/>
      </template>
    </tkm-dialog>
    <tkm-dialog ref="dialog" title="警告" cancelLabel="取消" confirmLabel="确定">
      {{dialogMsg}}
    </tkm-dialog>
  </section>
</template>

<script>
  import permissionAllocation from 'service/permission-allocation'
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
        form: {
          findContent: ''
        },
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
            name: '清空用户权限',
            action: 'clearPermission'
          }
        ],
        headers: [{name: '角色名称'}, {name: '角色类型'}, {name: '拥有的权限'}],
        permissions: [],
        permissionIds: []
      }
    },
    methods: {
      initData (params, success, fail) {
        permissionAllocation.getList.bind(this)({findContent: params.findContent, pageNo: params.pageNo}, (data) => {
          this.tableData = data
        }, (err) => {
          fail(err)
        })
      },
      rowsOperation (action, row, success, fail) {
        if (action === 'selectPermission') {
          permissionAllocation.getPermissions.bind(this)({id: row.id}, (data) => {
            this.permissionIds = []
            this.permissions = data.map((permission) => {
              if (permission.marker !== '0') {
                this.permissionIds.push(permission.id)
              }
              permission.id = permission.id + ''
              return permission
            })
            this.$refs.dialogForm.openDialog(() => {
              permissionAllocation.addPermissions.bind(this)({permissionIds: this.permissionIds, roleId: row.id}, (data) => {
                success(data.resultData)
              }, (err) => {
                fail(err)
              })
            }, () => {
            })
          }, (err) => {
            fail(err)
          })
        } else {
          success()
        }
      },
      searchOperation (action, success, fail) {
        if (action === 'clearPermission') {
          this.dialogMsg = '确认要清空这些用户的权限吗？'
          this.$refs.dialog.openDialog(() => {
            permissionAllocation.clearPermission.bind(this)({tableData: this.tableData}, (data) => {
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
