import Vue from 'vue'
import Router from 'vue-router'
import PersonalData from '@/pages/personal-data'
import InfoModify from '@/pages/info-modify'
import PdwModify from '@/pages/pdw-modify'
import MyPermission from '@/pages/my-permission'
import MessagePush from '@/pages/message-push'
import MemberList from '@/pages/member-list'
import RoleList from '@/pages/role-list'
import RoleAllocation from '@/pages/role-allocation'
import PermissionList from '@/pages/permission-list'
import PermissionAllocation from '@/pages/permission-allocation'
import Login from '@/pages/login'
import Register from '@/pages/register'
import First from '@/pages/first'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册'
      },
      component: Register
    },
    {
      path: '/first',
      name: 'first',
      meta: {
        title: '首页'
      },
      component: First,
      children: [
        {
          path: '/personal-data',
          name: 'personal-data',
          meta: {
            title: '个人资料'
          },
          component: PersonalData
        },
        {
          path: '/info-modify',
          name: 'info-modify',
          meta: {
            title: '资料修改'
          },
          component: InfoModify
        },
        {
          path: '/pdw-modify',
          name: 'pdw-modify',
          meta: {
            title: '密码修改'
          },
          component: PdwModify
        },
        {
          path: '/my-permission',
          name: 'my-permission',
          meta: {
            title: '我的权限'
          },
          component: MyPermission
        },
        {
          path: '/message-push',
          name: 'message-push',
          meta: {
            title: '消息推送'
          },
          component: MessagePush
        },
        {
          path: '/member-list',
          name: 'member-list',
          meta: {
            title: '用户列表'
          },
          component: MemberList
        },
        {
          path: '/role-list',
          name: 'role-list',
          meta: {
            title: '角色列表'
          },
          component: RoleList
        },
        {
          path: '/role-allocation',
          name: 'role-allocation',
          meta: {
            title: '角色分配'
          },
          component: RoleAllocation
        },
        {
          path: '/permission-list',
          name: 'permission-list',
          meta: {
            title: '权限列表'
          },
          component: PermissionList
        },
        {
          path: '/permission-allocation',
          name: 'permission-allocation',
          meta: {
            title: '权限分配'
          },
          component: PermissionAllocation
        }
      ]
    }
  ]
})
