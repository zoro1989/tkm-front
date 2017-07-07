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

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/personal-data',
      name: 'personal-data',
      meta: 'personal-data',
      component: PersonalData
    },
    {
      path: '/info-modify',
      name: 'info-modify',
      meta: 'info-modify',
      component: InfoModify
    },
    {
      path: '/pdw-modify',
      name: 'pdw-modify',
      meta: 'pdw-modify',
      component: PdwModify
    },
    {
      path: '/my-permission',
      name: 'my-permission',
      meta: 'my-permission',
      component: MyPermission
    },
    {
      path: '/message-push',
      name: 'message-push',
      meta: 'message-push',
      component: MessagePush
    },
    {
      path: '/member-list',
      name: 'member-list',
      meta: 'member-list',
      component: MemberList
    },
    {
      path: '/role-list',
      name: 'role-list',
      meta: 'role-list',
      component: RoleList
    },
    {
      path: '/role-allocation',
      name: 'role-allocation',
      meta: 'role-allocation',
      component: RoleAllocation
    },
    {
      path: '/permission-list',
      name: 'permission-list',
      meta: 'permission-list',
      component: PermissionList
    },
    {
      path: '/permission-allocation',
      name: 'permission-allocation',
      meta: 'permission-allocation',
      component: PermissionAllocation
    }
  ]
})
