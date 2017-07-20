<template>
  <section id="role-list">
    <section class="search-content">
      <mu-text-field v-model="form.findContent" hintText="输入角色类型 / 角色名称" ></mu-text-field>
      <mu-raised-button label="查询"  @click="onSubmit" primary/>
      <mu-raised-button label="增加角色"  @click="addRole" secondary/>
      <mu-raised-button label="删除"  @click="deleteRoles" backgroundColor="red"/>
    </section>
    <section>
      <mu-table :fixedHeader="fixedHeader" :selectable="selectable" :showCheckbox="showCheckbox"
                :multiSelectable="multiSelectable" :height="height" @rowClick="rowClick">
        <mu-thead slot="header">
          <mu-tr>
            <mu-th><mu-checkbox v-model="selectedAll" /></mu-th>
            <mu-th tooltip="角色名称">角色名称</mu-th>
            <mu-th tooltip="角色类型">角色类型</mu-th>
            <mu-th tooltip="操作">操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="item,index in tableData"  :key="index" :selected="item.selected">
            <mu-td><mu-checkbox v-model="item.selected" /></mu-td>
            <mu-td>{{item.name}}</mu-td>
            <mu-td>{{item.type}}</mu-td>
            <mu-td>
              <mu-raised-button label="删除"  @click="deleteRole(item)" backgroundColor="red"/>
            </mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <mu-pagination :total="totalCount" :current="pageNo" @pageChange="pageChange">
      </mu-pagination>
      <tkm-dialog ref="dialogForm" title="添加角色" cancelLabel="取消" confirmLabel="确定">
        <mu-text-field label="角色名称" v-model="dialogForm.name" hintText="请输入角色名称" labelFloat></mu-text-field>
        <mu-text-field label="角色类型" v-model="dialogForm.type" hintText="请输入角色类型  [字母 + 数字] 6位" labelFloat></mu-text-field>
      </tkm-dialog>
      <tkm-dialog ref="dialog" title="警告" cancelLabel="取消" confirmLabel="确定">
        {{dialogMsg}}
      </tkm-dialog>
    </section>
  </section>
</template>

<script>
  import roleList from 'service/role-list'
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
        fixedHeader: true,
        selectable: true,
        showCheckbox: false,
        multiSelectable: true,
        selectedAll: false,
        totalCount: 1,
        pageNo: 1,
        height: '70vh'
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
        roleList.getList.bind(this)({findContent: this.form.findContent, pageNo: this.pageNo}, (data) => {
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
      deleteRoles () {
        this.dialogMsg = '确认要删除这些角色吗？'
        this.$refs.dialog.openDialog(() => {
          roleList.delete.bind(this)({tableData: this.tableData}, (data) => {
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
      deleteRole (row) {
        this.dialogMsg = '确认要删除这个角色吗？'
        this.$refs.dialog.openDialog(() => {
          roleList.deleteOne.bind(this)({row: row}, (data) => {
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
      addRole () {
        this.$refs.dialogForm.openDialog(() => {
          roleList.addRole.bind(this)({form: this.dialogForm}, (data) => {
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
   #role-list .mu-pagination{
     justify-content: flex-end;
   }
   #role-list .mu-tr .mu-th,#role-list .mu-tr .mu-td{
     white-space:pre-wrap;
     word-wrap:break-word;
   }
   #role-list .mu-tr .mu-th:first-child,#role-list .mu-tr .mu-td:first-child{
     width: 100px;
     white-space:nowrap;
   }
   #role-list .mu-tr .mu-th:last-child,#role-list .mu-tr .mu-td:last-child{
     width: 200px;
     padding-left: 5px;
     padding-right: 5px;
   }
</style>
