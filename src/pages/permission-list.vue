<template>
  <section id="permission-list">
    <section class="search-content">
      <mu-text-field v-model="form.findContent" hintText="输入权限名称" ></mu-text-field>
      <mu-raised-button label="查询"  @click="onSubmit" primary/>
      <mu-raised-button label="增加权限"  @click="addPermission" secondary/>
      <has-permission :permission="'permission:deletePermissionById'">
        <mu-raised-button label="删除"  @click="deletePermissions" backgroundColor="red"/>
      </has-permission>
    </section>
    <section>
      <mu-table :fixedHeader="fixedHeader" :selectable="selectable" :showCheckbox="showCheckbox"
                :multiSelectable="multiSelectable" :height="height" @rowClick="rowClick">
        <mu-thead slot="header">
          <mu-tr>
            <mu-th><mu-checkbox v-model="selectedAll" /></mu-th>
            <mu-th tooltip="权限名称">权限名称</mu-th>
            <mu-th tooltip="权限url">权限url</mu-th>
            <mu-th tooltip="操作">操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="item,index in tableData"  :key="index" :selected="item.selected">
            <mu-td><mu-checkbox v-model="item.selected" /></mu-td>
            <mu-td>{{item.name}}</mu-td>
            <mu-td>{{item.url}}</mu-td>
            <mu-td>
              <mu-raised-button label="删除"  @click="deletePermission(item)" backgroundColor="red"/>
            </mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <mu-pagination :total="totalCount" :current="pageNo" @pageChange="pageChange">
      </mu-pagination>
      <tkm-dialog ref="dialogForm" title="添加权限" cancelLabel="取消" confirmLabel="确定">
        <mu-text-field label="权限名称" v-model="dialogForm.name" hintText="请输入权限名称" labelFloat></mu-text-field>
        <mu-text-field label="权限URL地址" v-model="dialogForm.url" hintText="请输入权限URL地址" labelFloat></mu-text-field>
      </tkm-dialog>
      <tkm-dialog ref="dialog" title="警告" cancelLabel="取消" confirmLabel="确定">
        {{dialogMsg}}
      </tkm-dialog>
    </section>
  </section>
</template>

<script>
  import permissionList from 'service/permission-list'
  import isNotEmpty from 'utilities/is-not-empty'
  import TkmDialog from 'components/tkm-dialog'
  import HasPermission from 'components/has-permission'
  import HasAnyRoles from 'components/has-any-roles'
  export default{
    components: {
      TkmDialog,
      HasPermission,
      HasAnyRoles
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
          url: ''
        },
        tableData: [],
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
        permissionList.getList.bind(this)({findContent: this.form.findContent, pageNo: this.pageNo}, (data) => {
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
      deletePermissions () {
        this.dialogMsg = '确认要删除这些权限吗？'
        this.$refs.dialog.openDialog(() => {
          permissionList.delete.bind(this)({tableData: this.tableData}, (data) => {
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
      deletePermission (row) {
        this.dialogMsg = '确认要删除这个权限吗？'
        this.$refs.dialog.openDialog(() => {
          permissionList.deleteOne.bind(this)({row: row}, (data) => {
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
      addPermission () {
        this.$refs.dialogForm.openDialog(() => {
          permissionList.addPermission.bind(this)({form: this.dialogForm}, (data) => {
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
   #permission-list .mu-pagination{
     justify-content: flex-end;
   }
   #permission-list .mu-tr .mu-th:first-child,#permission-list .mu-tr .mu-td:first-child{
     width: 100px;
   }

</style>
