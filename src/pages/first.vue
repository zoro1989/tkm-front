<template>
  <section id="first">
    <section>
      <mu-appbar title="μ's" class="menuTitle">
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
      <mu-appbar title="μ's" class="drawerTitle" >
        <mu-icon-button icon="menu" slot="left" @click="toggleDrawerShow"/>
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
    </section>
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
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-document"></i>培训手册配置</template>
              <el-menu-item index="5-1" @click="changeView('points', 1)">HTML配置</el-menu-item>
              <el-menu-item index="5-2" @click="changeView('points', 2)">CSS配置</el-menu-item>
              <el-menu-item index="5-3" @click="changeView('points', 3)">JS配置</el-menu-item>
              <el-menu-item index="5-4" @click="changeView('points', 4)">JQuery配置</el-menu-item>
              <el-menu-item index="5-5" @click="changeView('points', 5)">VB配置</el-menu-item>
              <el-menu-item index="5-6" @click="changeView('points', 6)">SQL配置</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"><i class="el-icon-document"></i>Ebook配置</template>
              <el-menu-item index="6-1" @click="changeView('ebook-list')">vbabook配置</el-menu-item>
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
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-document"></i>培训手册配置</template>
          <el-menu-item index="5-1" @click="changeView('points', 1)">HTML配置</el-menu-item>
          <el-menu-item index="5-2" @click="changeView('points', 2)">CSS配置</el-menu-item>
          <el-menu-item index="5-3" @click="changeView('points', 3)">JS配置</el-menu-item>
          <el-menu-item index="5-4" @click="changeView('points', 4)">JQuery配置</el-menu-item>
          <el-menu-item index="5-5" @click="changeView('points', 5)">VB配置</el-menu-item>
          <el-menu-item index="5-6" @click="changeView('points', 6)">SQL配置</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title"><i class="el-icon-document"></i>Ebook配置</template>
          <el-menu-item index="6-1" @click="changeView('ebook-list')">vbabook配置</el-menu-item>
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
      },
      toggleDrawerShow () {
        this.drawerOpen = true
      },
      changeView (route, type) {
        if (type && !isNaN(type)) {
          this.$router.replace(`/${route}/${type}`)
        } else {
          this.$router.replace(`/${route}`)
        }
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
        this.$router.replace('/login')
      }
    }
  }
</script>
<style scoped>
  #first {
    overflow: hidden;
    zoom: 1;
  }
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
    overflow: auto;
    margin-top: 5px;
  }
  #first .mu-flexbox {
    overflow: hidden;
  }
  #first .body .menu{
    background-color: #eef1f6;
    margin-bottom:-3000px;
    padding-bottom:3000px;
  }

  #first .drawer {
    display: none;
    background-color: #EEF1F6;
  }

  #first .drawerTitle {
    display: none;
  }
  @media screen and (max-width: 1024px) {
    #first .body .menu{
      display: none;
    }
    #first .drawer {
      display: block;
    }
    #first .menuTitle {
      display: none;
    }
    #first .drawerTitle {
      display: flex;
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
