<template>
  <section id="member-list">
    <section class="search-content">
      <mu-text-field v-model="form.findContent" hintText="输入昵称 / 帐号" ></mu-text-field>
      <mu-raised-button label="查询"  @click="onSubmit" primary/>
      <mu-raised-button label="删除"  @click="deleteMembers" backgroundColor="red"/>
    </section>
    <section>
      <mu-table :fixedHeader="fixedHeader" :selectable="selectable" :showCheckbox="showCheckbox"
                :multiSelectable="multiSelectable" :height="height" @rowClick="rowClick">
        <mu-thead slot="header">
          <mu-tr>
            <mu-th><mu-checkbox v-model="selectedAll" /></mu-th>
            <mu-th tooltip="昵称">昵称</mu-th>
            <mu-th tooltip="Email/帐号">Email/帐号</mu-th>
            <mu-th tooltip="登录状态">登录状态</mu-th>
            <mu-th tooltip="创建时间">创建时间</mu-th>
            <mu-th tooltip="最后登录时间">最后登录时间</mu-th>
            <mu-th tooltip="操作">操作</mu-th>
          </mu-tr>
        </mu-thead>
        <mu-tbody>
          <mu-tr v-for="item,index in tableData"  :key="index" :selected="item.selected">
            <mu-td><mu-checkbox v-model="item.selected" /></mu-td>
            <mu-td>{{item.nickname}}</mu-td>
            <mu-td>{{item.email}}</mu-td>
            <mu-td>{{item.status==1?'有效':'禁止'}}</mu-td>
            <mu-td>{{item.createTime}}</mu-td>
            <mu-td>{{item.lastLoginTime}}</mu-td>
            <mu-td>
              <mu-raised-button :label="item.status==1?'禁止登录':'激活登录'"  @click="forbidden(item)" secondary/>
              <mu-raised-button label="删除"  @click="deleteMember(item)" backgroundColor="red"/>
            </mu-td>
          </mu-tr>
        </mu-tbody>
      </mu-table>
      <mu-pagination :total="totalCount" :current="pageNo" @pageChange="pageChange">
      </mu-pagination>
      <tkm-dialog ref="dialog" title="警告" cancelLabel="取消" confirmLabel="确定">
        {{dialogMsg}}
      </tkm-dialog>
    </section>
  </section>
</template>

<script>
  import memberList from 'service/member-list'
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
        memberList.getList.bind(this)({findContent: this.form.findContent, pageNo: this.pageNo}, (data) => {
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
      deleteMembers () {
        this.dialogMsg = '确认要删除这些用户吗？'
        this.$refs.dialog.openDialog(() => {
          memberList.delete.bind(this)({tableData: this.tableData}, (data) => {
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
      forbidden (row) {
        memberList.forbidden.bind(this)({row: row}, (data) => {
          this.$message({
            message: data.resultData,
            type: 'success'
          })
          this.initData()
        }, (err) => {
          this.$message.error(err)
        })
      },
      deleteMember (row) {
        this.dialogMsg = '确认要删除这个用户吗？'
        this.$refs.dialog.openDialog(() => {
          memberList.deleteOne.bind(this)({row: row}, (data) => {
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
   #member-list .mu-pagination{
     justify-content: flex-end;
   }
   #member-list .mu-tr .mu-th:first-child,#info-modify .mu-tr .mu-td:first-child{
     width: 100px;
   }

</style>
