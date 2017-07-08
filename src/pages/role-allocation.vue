<template>
  <section id="role-allocation">
    <section class="search-content">
      <mu-text-field v-model="form.findContent" hintText="输入用户昵称 / 用户帐号" ></mu-text-field>
      <mu-raised-button label="查询"  @click="onSubmit" primary/>
      <mu-raised-button label="清空用户角色"  @click="clearRole" secondary/>
    </section>
    <section>
      <mu-table :fixedHeader="fixedHeader" :selectable="selectable" :showCheckbox="showCheckbox"
                :multiSelectable="multiSelectable" :height="height" @rowClick="rowClick">
        <mu-thead slot="header">
          <mu-tr>
            <mu-th><mu-checkbox v-model="selectedAll" /></mu-th>
            <mu-th tooltip="用户昵称">用户昵称</mu-th>
            <mu-th tooltip="Email/帐号">Email/帐号</mu-th>
            <mu-th tooltip="状态">状态</mu-th>
            <mu-th tooltip="拥有的角色">拥有的角色</mu-th>
            <mu-th tooltip="操作">操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="item,index in tableData"  :key="index" :selected="item.selected">
            <mu-td><mu-checkbox v-model="item.selected" /></mu-td>
            <mu-td>{{item.nickname}}</mu-td>
            <mu-td>{{item.email}}</mu-td>
            <mu-td>{{item.status==1?'有效':'禁止'}}</mu-td>
            <mu-td>{{item.roleNames}}</mu-td>
            <mu-td>
              <mu-raised-button label="选择角色"  @click="selectRole(item)" secondary/>
            </mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <mu-pagination :total="totalCount" :current="pageNo" @pageChange="pageChange">
      </mu-pagination>
      <tkm-dialog ref="dialogForm" title="添加角色" cancelLabel="取消" confirmLabel="确定">
        <template v-for="role in roles">
          <mu-checkbox :label="role.name" v-model="roleIds" :nativeValue="role.id"/>
        </template>
      </tkm-dialog>
      <tkm-dialog ref="dialog" title="警告" cancelLabel="取消" confirmLabel="确定">
        {{dialogMsg}}
      </tkm-dialog>
    </section>
  </section>
</template>

<script>
  import roleAllocation from 'service/role-allocation'
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
        roles: [],
        roleIds: [],
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
        roleAllocation.getList.bind(this)({findContent: this.form.findContent, pageNo: this.pageNo}, (data) => {
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
      selectRole (row) {
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
      clearRole () {
        this.dialogMsg = '确认要清空这些用户的角色吗？'
        this.$refs.dialog.openDialog(() => {
          roleAllocation.clearRole.bind(this)({tableData: this.tableData}, (data) => {
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
   #role-allocation .mu-pagination{
     justify-content: flex-end;
   }
   #role-allocation .mu-tr .mu-th:first-child,#role-allocation .mu-tr .mu-td:first-child{
     width: 100px;
   }
</style>
