<template>
  <section id="role-allocation">
    <tkm-table :tableData="tableData"
               :headers="headers"
               :searchOperations="searchOperations"
               @init-data="initData"
               @search-operation="searchOperation"
               @rows-operation="rowsOperation">
    </tkm-table>
    <tkm-dialog ref="dialogForm" title="添加角色" cancelLabel="取消" confirmLabel="确定">
      <template v-for="role in roles">
        <mu-checkbox :label="role.name" v-model="roleIds" :nativeValue="role.id"/>
      </template>
    </tkm-dialog>
    <tkm-dialog ref="dialog" title="警告" cancelLabel="取消" confirmLabel="确定">
      {{dialogMsg}}
    </tkm-dialog>
  </section>
</template>

<script>
  import roleAllocation from 'service/role-allocation'
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
            name: '清空用户角色',
            action: 'clearRole',
            type: 'delete'
          }
        ],
        roles: [],
        roleIds: [],
        headers: [{name: '用户昵称'}, {name: 'Email/帐号'}, {name: '状态'}, {name: '拥有的角色'}]
      }
    },
    methods: {
      initData (params, success, fail) {
        roleAllocation.getList.bind(this)({findContent: params.findContent, pageNo: params.pageNo}, (data) => {
          this.tableData = data
        }, (err) => {
          fail(err)
        })
      },
      rowsOperation (action, row, success, fail) {
        if (action === 'selectRole') {
          roleAllocation.getRoles.bind(this)({id: row.id}, (data) => {
            this.roleIds = []
            this.roles = data.map((role) => {
              if (role.marker !== '0') {
                this.roleIds.push(role.id)
              }
              role.id = role.id + ''
              return role
            })
            this.$refs.dialogForm.openDialog(() => {
              roleAllocation.addRoles.bind(this)({roleIds: this.roleIds, userId: row.id}, (data) => {
                success(data.resultData)
              }, (err) => {
                fail(err)
              })
            }, () => {
            })
          }, (err) => {
            fail(err)
          })
        }
      },
      searchOperation (action, success, fail) {
        if (action === 'clearRole') {
          this.dialogMsg = '确认要清空这些用户的角色吗？'
          this.$refs.dialog.openDialog(() => {
            roleAllocation.clearRole.bind(this)({tableData: this.tableData}, (data) => {
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
