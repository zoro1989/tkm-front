<template>
  <section id="first">
    <mu-flexbox justify="flex-start" align="center" class="header">
      <mu-flexbox-item>
        <el-menu theme="dark" :unique-opened="uniqueMenu" class="el-menu-demo" mode="horizontal">
          <el-submenu index="1">
            <template slot="title">{{nickname}}</template>
            <el-menu-item index="1-1" @click="changeView('personal-data')">个人资料</el-menu-item>
            <el-menu-item index="1-2" @click="changeView('my-permission')">我的权限</el-menu-item>
            <el-menu-item index="1-3" @click="logout">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-flexbox class="body" align="flex-start">
      <mu-flexbox-item grow="1" class="menu">
        <el-menu default-active="1" class="el-menu-vertical-demo" :unique-opened="uniqueMenu">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>个人中心</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="changeView('personal-data')">个人资料</el-menu-item>
              <el-menu-item index="1-2" @click="changeView('info-modify')">资料修改</el-menu-item>
              <el-menu-item index="1-3" @click="changeView('pdw-modify')">密码修改</el-menu-item>
              <el-menu-item index="1-4" @click="changeView('my-permission')">我的权限</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>推送中心</template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="changeView('message-push')">消息推送</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-share"></i>用户中心</template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="changeView('member-list')">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-setting"></i>权限管理</template>
            <el-menu-item-group>
              <el-menu-item index="4-1" @click="changeView('role-list')">角色列表</el-menu-item>
              <el-menu-item index="4-2" @click="changeView('role-allocation')">角色分配</el-menu-item>
              <el-menu-item index="4-3" @click="changeView('permission-list')">权限列表</el-menu-item>
              <el-menu-item index="4-4" @click="changeView('permission-allocation')">权限分配</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </mu-flexbox-item>
      <mu-flexbox-item grow="6" class="content">
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </mu-flexbox-item>
    </mu-flexbox>
  </section>

</template>
<script>
  import first from 'service/first'
  export default {
    created () {
      first.get.bind(this)({}, (data) => {
        this.nickname = data.nickname
      }, (err) => {
        this.$message.error(err)
      })
      this.changeView('member-list')
    },
    data () {
      return {
        uniqueMenu: true,
        nickname: '',
        open: false,
        trigger: null
      }
    },
    methods: {
      toggle () {
        this.open = !this.open
      },
      handleClose (e) {
        this.open = false
      },
      changeView (route) {
        this.$router.replace(route)
      },
      logout () {
        first.logout.bind(this)({}, (data) => {
          this.message({
            type: 'success',
            message: '退出登录'
          })
        }, (err) => {
          this.$message.error(err)
        })
        this.$router.replace('login')
      }
    }
  }
</script>
<style scoped>
  #first .header{
    height: 50px;
    background-color: #4db3ff;
  }
  #first .body{
    min-height: calc(100vh - 50px);
  }
  #first .body .menu{
    background-color: #eef1f6;
    min-height: calc(100vh - 50px);
  }

</style>
