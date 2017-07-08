<template>
  <section id="permission-allocation">
    <section class="search-content">
      <mu-text-field v-model="form.findContent" hintText="输入权限名称 / 权限类型" ></mu-text-field>
      <mu-raised-button label="查询"  @click="onSubmit" primary/>
      <mu-raised-button label="清空用户权限"  @click="clearPermission" secondary/>
    </section>
    <section>
      <mu-table :fixedHeader="fixedHeader" :selectable="selectable" :showCheckbox="showCheckbox"
                :multiSelectable="multiSelectable" :height="height" @rowClick="rowClick">
        <mu-thead slot="header">
          <mu-tr>
            <mu-th><mu-checkbox v-model="selectedAll" /></mu-th>
            <mu-th tooltip="角色名称">角色名称</mu-th>
            <mu-th tooltip="角色类型">角色类型</mu-th>
            <mu-th tooltip="拥有的权限">拥有的权限</mu-th>
            <mu-th tooltip="操作">操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="item,index in tableData"  :key="index" :selected="item.selected">
            <mu-td><mu-checkbox v-model="item.selected" /></mu-td>
            <mu-td>{{item.name}}</mu-td>
            <mu-td>{{item.type}}</mu-td>
            <mu-td>{{item.permissionNames}}</mu-td>
            <mu-td>
              <mu-raised-button label="选择权限"  @click="selectPermission(item)" secondary/>
            </mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <mu-pagination :total="totalCount" :current="pageNo" @pageChange="pageChange">
      </mu-pagination>
      <tkm-dialog ref="dialogForm" title="添加权限" cancelLabel="取消" confirmLabel="确定">
        <template v-for="permission in permissions">
          <mu-checkbox :label="permission.name" v-model="permissionIds" :nativeValue="permission.id"/>
        </template>
      </tkm-dialog>
      <tkm-dialog ref="dialog" title="警告" cancelLabel="取消" confirmLabel="确定">
        {{dialogMsg}}
      </tkm-dialog>
    </section>
  </section>
</template>

<script>
  import permissionAllocation from 'service/permission-allocation'
  import isNotEmpty from 'utilities/is-not-empty'
  import TkmDialog from 'components/tkm-dialog'
  export default{
    components: {
      TkmDialog
    },
    created () {
      this.initData()
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
        permissions: [],
        permissionIds: [],
        fixedHeader: true,
        selectable: true,
        showCheckbox: false,
        multiSelectable: true,
        selectedAll: false,
        totalCount: 1,
        pageNo: 1,
        height: '60vh'
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
        permissionAllocation.getList.bind(this)({findContent: this.form.findContent, pageNo: this.pageNo}, (data) => {
          this.tableData = data.list.map((row) => {
            row.selected = false
            return row
          })
          this.totalCount = data.totalCount
          this.pageNo = data.pageNo
        }, (err) => {
          this.$message.error(err)
        })
      },
      onSubmit () {
        this.initData()
      },
      selectPermission (row) {
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
              this.$message({
                message: data.resultData,
                type: 'success'
              })
              this.initData()
            }, (err) => {
              this.$message.error(err)
            })
          }, () => {
          })
        }, (err) => {
          this.$message.error(err)
        })
      },
      clearPermission () {
        this.dialogMsg = '确认要清空这些用户的权限吗？'
        this.$refs.dialog.openDialog(() => {
          permissionAllocation.clearPermission.bind(this)({tableData: this.tableData}, (data) => {
            this.$message({
              message: data.resultData,
              type: 'success'
            })
            this.initData()
          }, (err) => {
            this.$message.error(err)
          })
        }, () => {
        })
      },
      pageChange (newIndex) {
        this.pageNo = newIndex
        this.initData()
      },
      rowClick (index, tr) {
        this.tableData[index].selected = !this.tableData[index].selected
      }
    }
  }

</script>

<style scoped>
   #permission-allocation .mu-pagination{
     justify-content: flex-end;
   }
   #permission-allocation .mu-tr .mu-th:first-child,#permission-allocation .mu-tr .mu-td:first-child{
     width: 100px;
   }
   #permission-allocation .mu-tr .mu-th,#permission-allocation .mu-tr .mu-td{
     white-space:pre-wrap;
     word-break:break-all;
     padding-top: 24px;
     padding-bottom: 24px;
   }

</style>
