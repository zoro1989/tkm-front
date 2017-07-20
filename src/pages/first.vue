<template>
  <section id="first">
    <mu-flexbox justify="flex-start" align="center" class="header">
      <mu-flexbox-item>
        <mu-appbar title="停车收费管理系统">
          <mu-icon-button icon="menu" slot="left" @click="toggleMenuShow"/>
          <mu-flat-button :label="nickname" slot="right"/>
          <mu-icon-menu
            slot="right"
            icon="expand_more"
            :anchorOrigin="leftTop"
            :targetOrigin="leftTop">
            <mu-menu-item title="个人资料" @click="changeView('personal-data')" />
            <mu-menu-item title="我的权限" @click="changeView('my-permission')" />
            <mu-menu-item title="退出登录" @click="logout"/>
          </mu-icon-menu>
        </mu-appbar>
        <!--<el-menu theme="dark" :unique-opened="uniqueMenu" class="el-menu-demo" mode="horizontal">-->
          <!--<div class="title">停车收费管理系统</div>-->
          <!--<el-submenu index="1" style="float: right">-->
            <!--<template slot="title">{{nickname}}</template>-->
            <!--<el-menu-item index="1-1" @click="changeView('personal-data')">个人资料</el-menu-item>-->
            <!--<el-menu-item index="1-2" @click="changeView('my-permission')">我的权限</el-menu-item>-->
            <!--<el-menu-item index="1-3" @click="logout">退出登录</el-menu-item>-->
          <!--</el-submenu>-->
        <!--</el-menu>-->
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-flexbox class="body" align="flex-start">
      <transition name="slide-fade">
        <mu-flexbox-item grow="1" class="menu" v-show="isShowMenu">
          <el-menu default-active="1" class="el-menu-vertical-demo" :unique-opened="uniqueMenu">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-menu"></i>个人中心</template>
              <el-menu-item index="1-1" @click="changeView('personal-data')">个人资料</el-menu-item>
              <el-menu-item index="1-2" @click="changeView('info-modify')">资料修改</el-menu-item>
              <el-menu-item index="1-3" @click="changeView('pdw-modify')">密码修改</el-menu-item>
              <el-menu-item index="1-4" @click="changeView('my-permission')">我的权限</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-message"></i>推送中心</template>
              <el-menu-item index="2-1" @click="changeView('message-push')">消息推送</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-share"></i>用户中心</template>
              <el-menu-item index="3-1" @click="changeView('member-list')">用户列表</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-setting"></i>权限管理</template>
              <el-menu-item index="4-1" @click="changeView('role-list')">角色列表</el-menu-item>
              <el-menu-item index="4-2" @click="changeView('role-allocation')">角色分配</el-menu-item>
              <el-menu-item index="4-3" @click="changeView('permission-list')">权限列表</el-menu-item>
              <el-menu-item index="4-4" @click="changeView('permission-allocation')">权限分配</el-menu-item>
            </el-submenu>
          </el-menu>
        </mu-flexbox-item>
      </transition>
      <mu-flexbox-item grow="6" class="content">
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-drawer :open="drawerOpen" :docked="docked" class="drawer" @close="drawerOpen = false">
      <mu-appbar title="菜单"/>
      <el-menu default-active="1" class="el-menu-vertical-demo" :unique-opened="uniqueMenu">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i>个人中心</template>
          <el-menu-item index="1-1" @click="changeView('personal-data')">个人资料</el-menu-item>
          <el-menu-item index="1-2" @click="changeView('info-modify')">资料修改</el-menu-item>
          <el-menu-item index="1-3" @click="changeView('pdw-modify')">密码修改</el-menu-item>
          <el-menu-item index="1-4" @click="changeView('my-permission')">我的权限</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i>推送中心</template>
          <el-menu-item index="2-1" @click="changeView('message-push')">消息推送</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-share"></i>用户中心</template>
          <el-menu-item index="3-1" @click="changeView('member-list')">用户列表</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-setting"></i>权限管理</template>
          <el-menu-item index="4-1" @click="changeView('role-list')">角色列表</el-menu-item>
          <el-menu-item index="4-2" @click="changeView('role-allocation')">角色分配</el-menu-item>
          <el-menu-item index="4-3" @click="changeView('permission-list')">权限列表</el-menu-item>
          <el-menu-item index="4-4" @click="changeView('permission-allocation')">权限分配</el-menu-item>
        </el-submenu>
      </el-menu>
    </mu-drawer>
  </section>

</template>
<script>
  import first from 'service/first'
  import EventBus from 'utilities/event-bus'
  export default {
    created () {
      first.get.bind(this)({}, (data) => {
        this.nickname = data.nickname
      }, (err) => {
        this.$message.error(err)
      })
      // this.changeView('member-list')
    },
    data () {
      return {
        leftTop: {horizontal: 'left', vertical: 'top'},
        uniqueMenu: true,
        nickname: '',
        trigger: null,
        isShowMenu: true,
        drawerOpen: false,
        docked: false
      }
    },
    methods: {
      toggleMenuShow () {
        this.isShowMenu = !this.isShowMenu
        this.drawerOpen = true
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
        EventBus.backUrl = ''
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
  #first .header .title{
    position: absolute;
    top: 20px;
    left: 20px;
    color: #FFFFFF;
    font-weight: bold;
    font-size: large;
    font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #first .content {
    margin-top: 5px;
  }
  #first .body{
    margin-top: 5px;
    min-height: calc(100vh - 50px);
  }
  #first .body .menu{
    background-color: #eef1f6;
    min-height: calc(100vh - 50px);
  }

  #first .drawer {
    display: none;
    background-color: #EEF1F6;
  }
  @media screen and (max-width: 1024px) {
    #first .body .menu{
      display: none;
    }
    #first .drawer {
      display: block;
    }
    .mu-overlay {
      display: block;
    }
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-leave-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for <2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }

</style>
