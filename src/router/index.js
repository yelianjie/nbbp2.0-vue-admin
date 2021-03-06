import Vue from 'vue'
import Router from 'vue-router'
// const _import = require('./_import_' + process.env.NODE_ENV)
const _import = require('./_import_production')
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'Main',
    children: [{
      path: 'Main',
      component: _import('Main/index'),
      name: 'Main',
      meta: { title: 'main', icon: '', noCache: true }
    }]
  }
  /* {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [{
      path: 'index',
      component: _import('documentation/index'),
      name: 'documentation',
      meta: { title: 'documentation', icon: 'documentation', noCache: true }
    }]
  } */
]


// export const asyncRouterMap = [
//   {
//     path: '/barManage',
//     component: Layout,
//     redirect: '/barManage/index',
//    // meta: { roles: ['admin'] }, // you can set roles in root nav
//     children: [{
//       path: 'index',
//       component: _import('bar-manage/index'),
//       name: 'barManage',
//       meta: {
//         noCache: true,
//         title: 'barManage',
//         icon: 'bar',
//         //roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }]
//   },
//   {
//     path: '/barManageDo',
//     component: Layout,
//     hidden: true,
//     redirect: '/barManageDo/edit',
//     meta: { roles: ['admin'] }, // you can set roles in root nav
//     children: [{
//       path: 'edit/:id',
//       component: _import('bar-manage-do/edit/index'),
//       name: 'barManageEdit',
//       meta: {
//         noCache: true,
//         title: 'barManageEdit',
//         icon: 'lock',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }]
//   },
//   {
//     path: '/bigScreenManage',
//     component: Layout,
//     redirect: '/bigScreenManage/index',
//     meta: { roles: ['admin'] }, // you can set roles in root nav
//     children: [{
//       path: 'index',
//       component: _import('big-screen-manage/index'),
//       name: 'bigScreenManage',
//       meta: {
//         noCache: true,
//         title: 'bigScreenManage',
//         icon: 'bigscreen',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }]
//   },
//   {
//     path: '/resourceManage',
//     component: Layout,
//     redirect: '/resourceManage/index',
//     meta: {
//       title: 'financeManage',
//       icon: 'component',
//       roles: ['admin']
//     },
//     children: [{
//       path: 'index',
//       component: _import('resource-manage/index'),
//       name: 'resourceManage',
//       meta: {
//         noCache: true,
//         title: 'resourceManage',
//         icon: 'resource',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }]
//   },
//   {
//     path: '/financeManage',
//     component: Layout,
//     redirect: 'noredirect',
//     name: 'financeManage',
//     meta: {
//       title: 'financeManage',
//       icon: 'finance',
//       roles: ['admin']
//     },
//     children: [{
//       path: 'statistics',
//       component: _import('finance-manage/statistics/index'),
//       name: 'statistics',
//       meta: {
//         noCache: true,
//         title: 'statistics',
//         icon: 'statistics',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }, /* , {
//       path: 'statisticsUser',
//       component: _import('finance-manage/statistics-user/index'),
//       name: 'statisticsUser',
//       meta: {
//         noCache: true,
//         title: 'statisticsUser',
//         icon: 'statistics',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }, */ {
//       path: 'defaultDivide',
//       component: _import('finance-manage/default-divide/index'),
//       name: 'defaultDivide',
//       meta: {
//         noCache: true,
//         title: 'defaultDivide',
//         icon: 'divide',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }, {
//       path: 'orderList',
//       component: _import('finance-manage/order-list/index'),
//       name: 'orderList',
//       meta: {
//         noCache: true,
//         title: 'orderList',
//         icon: 'order',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }, {
//       path: 'rechargeList',
//       component: _import('finance-manage/recharge-list/index'),
//       name: 'rechargeList',
//       meta: {
//         noCache: true,
//         title: 'rechargeList',
//         icon: 'recharge',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }, {
//       path: 'depositList',
//       component: _import('finance-manage/deposit-list/index'),
//       name: 'depositList',
//       meta: {
//         noCache: true,
//         title: 'depositList',
//         icon: 'deposit',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }, {
//       path: 'exchangeList',
//       component: _import('finance-manage/exchange-list/index'),
//       name: 'exchangeList',
//       meta: {
//         noCache: true,
//         title: 'exchangeList',
//         icon: 'exchange',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }, {
//       path: 'packetList',
//       component: _import('finance-manage/packet-list/index'),
//       name: 'packetList',
//       meta: {
//         noCache: true,
//         title: 'packetList',
//         icon: 'packet',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }]
//   },
//   {
//     path: '/userManage',
//     component: Layout,
//     redirect: 'noredirect',
//     name: 'userManage',
//     meta: {
//       title: 'userManage',
//       icon: 'userm',
//       roles: ['admin']
//     },
//     children: [{
//       path: 'barManager',
//       component: _import('user-manage/bar-manager/index'),
//       name: 'barManager',
//       meta: {
//         noCache: true,
//         title: 'barManager',
//         icon: 'barmanager',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }, {
//       path: 'agentManager',
//       component: _import('user-manage/agent-manager/index'),
//       name: 'agentManager',
//       meta: {
//         noCache: true,
//         title: 'agentManager',
//         icon: 'agent',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }, {
//       path: 'wxManager',
//       component: _import('user-manage/wx-manager/index'),
//       name: 'wxManager',
//       meta: {
//         noCache: true,
//         title: 'wxManager',
//         icon: 'wxuser',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }, {
//       path: 'business',
//       component: _import('user-manage/business/index'),
//       name: 'business',
//       meta: {
//         noCache: true,
//         title: 'business',
//         icon: 'member',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }, {
//       path: 'adminManager',
//       component: _import('user-manage/admin-manager/index'),
//       name: 'adminManager',
//       meta: {
//         noCache: true,
//         title: 'adminManager',
//         icon: 'barmanager',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }]
//   },
//   {
//     path: '/systemManage',
//     component: Layout,
//     redirect: 'noredirect',
//     name: 'systemManage',
//     meta: {
//       title: 'systemManage',
//       icon: 'system',
//       roles: ['admin']
//     },
//     children: [{
//       path: 'systemUser',
//       component: _import('system-manage/system-user/index'),
//       name: 'systemUser',
//       meta: {
//         noCache: true,
//         title: 'systemUser',
//         icon: 'systemuser',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }, {
//       path: 'roleManage',
//       component: _import('system-manage/roleManage/index'),
//       name: 'roleManage',
//       meta: {
//         noCache: true,
//         title: 'roleManage',
//         icon: 'systemuser',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }, {
//       path: 'roleManageEdit',
//       component: _import('system-manage/roleManage/edit'),
//       name: 'roleManageEdit',
//       meta: {
//         noCache: true,
//         title: 'roleManageEdit',
//         icon: 'systemuser',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     },{
//       path: 'modifyPassword',
//       component: _import('system-manage/modify-password/index'),
//       name: 'modifyPassword',
//       meta: {
//         noCache: true,
//         title: 'modifyPassword',
//         icon: 'modifypassword',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }, {
//       path: 'systemSetting',
//       component: _import('system-manage/system-setting/index'),
//       name: 'systemSetting',
//       meta: {
//         noCache: true,
//         title: 'systemSetting',
//         icon: 'system',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }]
//   },
//   {
//     path: '/systemVersion',
//     component: Layout,
//     redirect: 'noredirect',
//     name: 'systemVersion',
//     meta: {
//       title: 'systemVersion',
//       icon: 'version',
//       roles: ['admin']
//     },
//     children: [{
//       path: 'systemVersionUser',
//       component: _import('system-version/system-version-user/index'),
//       name: 'systemVersionUser',
//       meta: {
//         noCache: true,
//         title: 'systemVersionUser',
//         icon: 'version',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }, {
//       path: 'systemVersionClient',
//       component: _import('system-version/system-version-client/index'),
//       name: 'systemVersionClient',
//       meta: {
//         noCache: true,
//         title: 'systemVersionClient',
//         icon: 'version',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }]
//   },
//   /* {
//     path: '/city',
//     component: Layout,
//     redirect: '/city/index',
//     name: 'city',
//     meta: {
//       title: 'city',
//       icon: 'system',
//       roles: ['admin']
//     },
//     children: [{
//       path: 'index',
//       component: _import('city/index'),
//       name: 'city',
//       meta: {
//         noCache: true,
//         title: 'city',
//         icon: 'city',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }]
//   }, */
//   /* {
//     path: '/permission',
//     component: Layout,
//     redirect: '/permission/index',
//     meta: { roles: ['admin'] }, // you can set roles in root nav
//     children: [{
//       path: 'index',
//       component: _import('permission/index'),
//       name: 'permission',
//       meta: {
//         title: 'permission',
//         icon: 'lock',
//         roles: ['admin'] // or you can only set roles in sub nav
//       }
//     }]
//   },

//   {
//     path: '/icon',
//     component: Layout,
//     children: [{
//       path: 'index',
//       component: _import('svg-icons/index'),
//       name: 'icons',
//       meta: { title: 'icons', icon: 'icon', noCache: true }
//     }]
//   },

//   {
//     path: '/components',
//     component: Layout,
//     redirect: 'noredirect',
//     name: 'component-demo',
//     meta: {
//       title: 'components',
//       icon: 'component'
//     },
//     children: [
//       { path: 'tinymce', component: _import('components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
//       { path: 'markdown', component: _import('components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
//       { path: 'json-editor', component: _import('components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' }},
//       { path: 'dnd-list', component: _import('components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
//       { path: 'splitpane', component: _import('components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
//       { path: 'avatar-upload', component: _import('components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
//       { path: 'dropzone', component: _import('components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
//       { path: 'sticky', component: _import('components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
//       { path: 'count-to', component: _import('components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
//       { path: 'mixin', component: _import('components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
//       { path: 'back-to-top', component: _import('components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }}
//     ]
//   },

//   {
//     path: '/charts',
//     component: Layout,
//     redirect: 'noredirect',
//     name: 'charts',
//     meta: {
//       title: 'charts',
//       icon: 'chart'
//     },
//     children: [
//       { path: 'keyboard', component: _import('charts/keyboard'), name: 'keyboardChart', meta: { title: 'keyboardChart', noCache: true }},
//       { path: 'line', component: _import('charts/line'), name: 'lineChart', meta: { title: 'lineChart', noCache: true }},
//       { path: 'mixchart', component: _import('charts/mixChart'), name: 'mixChart', meta: { title: 'mixChart', noCache: true }}
//     ]
//   },

//   {
//     path: '/example',
//     component: Layout,
//     redirect: '/example/table/complex-table',
//     name: 'example',
//     meta: {
//       title: 'example',
//       icon: 'example'
//     },
//     children: [
//       {
//         path: '/example/table',
//         component: _import('example/table/index'),
//         redirect: '/example/table/complex-table',
//         name: 'Table',
//         meta: {
//           title: 'Table',
//           icon: 'table'
//         },
//         children: [
//           { path: 'dynamic-table', component: _import('example/table/dynamicTable/index'), name: 'dynamicTable', meta: { title: 'dynamicTable' }},
//           { path: 'drag-table', component: _import('example/table/dragTable'), name: 'dragTable', meta: { title: 'dragTable' }},
//           { path: 'inline-edit-table', component: _import('example/table/inlineEditTable'), name: 'inlineEditTable', meta: { title: 'inlineEditTable' }},
//           { path: 'complex-table', component: _import('example/table/complexTable'), name: 'complexTable', meta: { title: 'complexTable' }}
//         ]
//       },
//       { path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'tab', meta: { title: 'tab' }}
//     ]
//   },

//   {
//     path: '/form',
//     component: Layout,
//     redirect: 'noredirect',
//     name: 'form',
//     meta: {
//       title: 'form',
//       icon: 'form'
//     },
//     children: [
//       { path: 'create-form', component: _import('form/create'), name: 'createForm', meta: { title: 'createForm', icon: 'table' }},
//       { path: 'edit-form', component: _import('form/edit'), name: 'editForm', meta: { title: 'editForm', icon: 'table' }}
//     ]
//   },

//   {
//     path: '/error',
//     component: Layout,
//     redirect: 'noredirect',
//     name: 'errorPages',
//     meta: {
//       title: 'errorPages',
//       icon: '404'
//     },
//     children: [
//       { path: '401', component: _import('errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
//       { path: '404', component: _import('errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
//     ]
//   },

//   {
//     path: '/error-log',
//     component: Layout,
//     redirect: 'noredirect',
//     children: [{ path: 'log', component: _import('errorLog/index'), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
//   },

//   {
//     path: '/excel',
//     component: Layout,
//     redirect: '/excel/export-excel',
//     name: 'excel',
//     meta: {
//       title: 'excel',
//       icon: 'excel'
//     },
//     children: [
//       { path: 'export-excel', component: _import('excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }},
//       { path: 'export-selected-excel', component: _import('excel/selectExcel'), name: 'selectExcel', meta: { title: 'selectExcel' }},
//       { path: 'upload-excel', component: _import('excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'uploadExcel' }}
//     ]
//   },

//   {
//     path: '/zip',
//     component: Layout,
//     redirect: '/zip/download',
//     children: [{ path: 'download', component: _import('zip/index'), name: 'exportZip', meta: { title: 'exportZip', icon: 'zip' }}]
//   },

//   {
//     path: '/theme',
//     component: Layout,
//     redirect: 'noredirect',
//     children: [{ path: 'index', component: _import('theme/index'), name: 'theme', meta: { title: 'theme', icon: 'theme' }}]
//   },

//   {
//     path: '/clipboard',
//     component: Layout,
//     redirect: 'noredirect',
//     children: [{ path: 'index', component: _import('clipboard/index'), name: 'clipboardDemo', meta: { title: 'clipboardDemo', icon: 'clipboard' }}]
//   },

//   {
//     path: '/i18n',
//     component: Layout,
//     children: [{ path: 'index', component: _import('i18n-demo/index'), name: 'i18n', meta: { title: 'i18n', icon: 'international' }}]
//   }, */

//   { path: '*', redirect: '/404', hidden: true }
// ]

constantRouterMap.push({
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
   // meta: { roles: ['admin'] }, // you can set roles in root nav
    children: [{
      path: '/dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: {
        noCache: true,
        title: 'dashboard',
        icon: 'dashboard',
        //roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },
  {
    path: '/barManage',
    component: Layout,
    redirect: '/barManage/index',
   // meta: { roles: ['admin'] }, // you can set roles in root nav
    children: [{
      path: 'index',
      component: _import('bar-manage/index'),
      name: 'barManage',
      meta: {
        noCache: true,
        title: 'barManage',
        icon: 'bar',
        //roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },
  {
    path: '/barManageDo',
    component: Layout,
    hidden: true,
    redirect: '/barManageDo/edit',
    meta: { roles: ['admin'] }, // you can set roles in root nav
    children: [{
      path: 'edit',
      component: _import('bar-manage-do/edit/index'),
      name: 'barManageEdit',
      meta: {
        noCache: true,
        title: 'barManageEdit',
        icon: 'lock',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },
  {
    path: '/bigScreenManage',
    component: Layout,
    redirect: '/bigScreenManage/index',
    meta: { roles: ['admin'] }, // you can set roles in root nav
    children: [{
      path: 'index',
      component: _import('big-screen-manage/index'),
      name: 'bigScreenManage',
      meta: {
        noCache: true,
        title: 'bigScreenManage',
        icon: 'bigscreen',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },
  {
    path: '/resourceManage',
    component: Layout,
    redirect: '/resourceManage/index',
    meta: {
      title: 'financeManage',
      icon: 'component',
      roles: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('resource-manage/index'),
      name: 'resourceManage',
      meta: {
        noCache: true,
        title: 'resourceManage',
        icon: 'resource',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },
  {
    path: '/financeManage',
    component: Layout,
    redirect: 'noredirect',
    name: 'financeManage',
    meta: {
      title: 'financeManage',
      icon: 'finance',
      roles: ['admin']
    },
    children: [{
      path: 'statistics',
      component: _import('finance-manage/statistics/index'),
      name: 'statistics',
      meta: {
        noCache: true,
        title: 'statistics',
        icon: 'statistics',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, /* , {
      path: 'statisticsUser',
      component: _import('finance-manage/statistics-user/index'),
      name: 'statisticsUser',
      meta: {
        noCache: true,
        title: 'statisticsUser',
        icon: 'statistics',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, */ {
      path: 'defaultDivide',
      component: _import('finance-manage/default-divide/index'),
      name: 'defaultDivide',
      meta: {
        noCache: true,
        title: 'defaultDivide',
        icon: 'divide',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'orderList',
      component: _import('finance-manage/order-list/index'),
      name: 'orderList',
      meta: {
        noCache: true,
        title: 'orderList',
        icon: 'order',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'rechargeList',
      component: _import('finance-manage/recharge-list/index'),
      name: 'rechargeList',
      meta: {
        noCache: true,
        title: 'rechargeList',
        icon: 'recharge',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'depositList',
      component: _import('finance-manage/deposit-list/index'),
      name: 'depositList',
      meta: {
        noCache: true,
        title: 'depositList',
        icon: 'deposit',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'exchangeList',
      component: _import('finance-manage/exchange-list/index'),
      name: 'exchangeList',
      meta: {
        noCache: true,
        title: 'exchangeList',
        icon: 'exchange',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'packetList',
      component: _import('finance-manage/packet-list/index'),
      name: 'packetList',
      meta: {
        noCache: true,
        title: 'packetList',
        icon: 'packet',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },
  {
    path: '/userManage',
    component: Layout,
    redirect: 'noredirect',
    name: 'userManage',
    meta: {
      title: 'userManage',
      icon: 'userm',
      roles: ['admin']
    },
    children: [{
      path: 'barManager',
      component: _import('user-manage/bar-manager/index'),
      name: 'barManager',
      meta: {
        noCache: true,
        title: 'barManager',
        icon: 'barmanager',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'agentManager',
      component: _import('user-manage/agent-manager/index'),
      name: 'agentManager',
      meta: {
        noCache: true,
        title: 'agentManager',
        icon: 'agent',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'wxManager',
      component: _import('user-manage/wx-manager/index'),
      name: 'wxManager',
      meta: {
        noCache: true,
        title: 'wxManager',
        icon: 'wxuser',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'business',
      component: _import('user-manage/business/index'),
      name: 'business',
      meta: {
        noCache: true,
        title: 'business',
        icon: 'member',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'adminManager',
      component: _import('user-manage/admin-manager/index'),
      name: 'adminManager',
      meta: {
        noCache: true,
        title: 'adminManager',
        icon: 'barmanager',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'blackManager',
      component: _import('user-manage/black-manager/index'),
      name: 'blackManager',
      meta: {
        noCache: true,
        title: 'blackManager',
        icon: 'barmanager',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },
  {
    path: '/systemManage',
    component: Layout,
    redirect: 'noredirect',
    name: 'systemManage',
    meta: {
      title: 'systemManage',
      icon: 'system',
      roles: ['admin']
    },
    children: [{
      path: 'systemUser',
      component: _import('system-manage/system-user/index'),
      name: 'systemUser',
      meta: {
        noCache: true,
        title: 'systemUser',
        icon: 'systemuser',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'roleManage',
      component: _import('system-manage/roleManage/index'),
      name: 'roleManage',
      meta: {
        noCache: true,
        title: 'roleManage',
        icon: 'systemuser',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'roleManageEdit',
      component: _import('system-manage/roleManage/edit'),
      name: 'roleManageEdit',
      meta: {
        noCache: true,
        title: 'roleManageEdit',
        icon: 'systemuser',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    },{
      path: 'modifyPassword',
      component: _import('system-manage/modify-password/index'),
      name: 'modifyPassword',
      meta: {
        noCache: true,
        title: 'modifyPassword',
        icon: 'modifypassword',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },
  {
    path: '/systemVersion',
    component: Layout,
    redirect: 'noredirect',
    name: 'systemVersion',
    meta: {
      title: 'systemVersion',
      icon: 'version',
      roles: ['admin']
    },
    children: [{
      path: 'systemVersionUser',
      component: _import('system-version/system-version-user/index'),
      name: 'systemVersionUser',
      meta: {
        noCache: true,
        title: 'systemVersionUser',
        icon: 'version',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }, {
      path: 'systemVersionClient',
      component: _import('system-version/system-version-client/index'),
      name: 'systemVersionClient',
      meta: {
        noCache: true,
        title: 'systemVersionClient',
        icon: 'version',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },
  {
    path: '/systemSetting',
    component: Layout,
    redirect: '/systemSetting/index',
    meta: { roles: ['admin'] }, // you can set roles in root nav
    children: [{
      path: 'index',
      component: _import('system-setting/index'),
      name: 'systemSetting',
      meta: {
        noCache: true,
        title: 'systemSetting',
        icon: 'system',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },
  {
    path: '/messageManage',
    component: Layout,
    redirect: '/messageManage/index',
    meta: { roles: ['admin'] }, // you can set roles in root nav
    children: [{
      path: 'index',
      component: _import('message/index'),
      name: 'messageManage',
      meta: {
        noCache: true,
        title: 'messageManage',
        icon: 'system',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },
  /* {
    path: '/city',
    component: Layout,
    redirect: '/city/index',
    name: 'city',
    meta: {
      title: 'city',
      icon: 'system',
      roles: ['admin']
    },
    children: [{
      path: 'index',
      component: _import('city/index'),
      name: 'city',
      meta: {
        noCache: true,
        title: 'city',
        icon: 'city',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  }, */
  /* {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    meta: { roles: ['admin'] }, // you can set roles in root nav
    children: [{
      path: 'index',
      component: _import('permission/index'),
      name: 'permission',
      meta: {
        title: 'permission',
        icon: 'lock',
        roles: ['admin'] // or you can only set roles in sub nav
      }
    }]
  },

  {
    path: '/icon',
    component: Layout,
    children: [{
      path: 'index',
      component: _import('svg-icons/index'),
      name: 'icons',
      meta: { title: 'icons', icon: 'icon', noCache: true }
    }]
  },

  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'component-demo',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [
      { path: 'tinymce', component: _import('components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
      { path: 'markdown', component: _import('components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
      { path: 'json-editor', component: _import('components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' }},
      { path: 'dnd-list', component: _import('components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
      { path: 'splitpane', component: _import('components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
      { path: 'avatar-upload', component: _import('components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
      { path: 'dropzone', component: _import('components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
      { path: 'sticky', component: _import('components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
      { path: 'count-to', component: _import('components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
      { path: 'mixin', component: _import('components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
      { path: 'back-to-top', component: _import('components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }}
    ]
  },

  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'charts',
    meta: {
      title: 'charts',
      icon: 'chart'
    },
    children: [
      { path: 'keyboard', component: _import('charts/keyboard'), name: 'keyboardChart', meta: { title: 'keyboardChart', noCache: true }},
      { path: 'line', component: _import('charts/line'), name: 'lineChart', meta: { title: 'lineChart', noCache: true }},
      { path: 'mixchart', component: _import('charts/mixChart'), name: 'mixChart', meta: { title: 'mixChart', noCache: true }}
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table/complex-table',
    name: 'example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: '/example/table',
        component: _import('example/table/index'),
        redirect: '/example/table/complex-table',
        name: 'Table',
        meta: {
          title: 'Table',
          icon: 'table'
        },
        children: [
          { path: 'dynamic-table', component: _import('example/table/dynamicTable/index'), name: 'dynamicTable', meta: { title: 'dynamicTable' }},
          { path: 'drag-table', component: _import('example/table/dragTable'), name: 'dragTable', meta: { title: 'dragTable' }},
          { path: 'inline-edit-table', component: _import('example/table/inlineEditTable'), name: 'inlineEditTable', meta: { title: 'inlineEditTable' }},
          { path: 'complex-table', component: _import('example/table/complexTable'), name: 'complexTable', meta: { title: 'complexTable' }}
        ]
      },
      { path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'tab', meta: { title: 'tab' }}
    ]
  },

  {
    path: '/form',
    component: Layout,
    redirect: 'noredirect',
    name: 'form',
    meta: {
      title: 'form',
      icon: 'form'
    },
    children: [
      { path: 'create-form', component: _import('form/create'), name: 'createForm', meta: { title: 'createForm', icon: 'table' }},
      { path: 'edit-form', component: _import('form/edit'), name: 'editForm', meta: { title: 'editForm', icon: 'table' }}
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      { path: '401', component: _import('errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
      { path: '404', component: _import('errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'log', component: _import('errorLog/index'), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      { path: 'export-excel', component: _import('excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }},
      { path: 'export-selected-excel', component: _import('excel/selectExcel'), name: 'selectExcel', meta: { title: 'selectExcel' }},
      { path: 'upload-excel', component: _import('excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'uploadExcel' }}
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    children: [{ path: 'download', component: _import('zip/index'), name: 'exportZip', meta: { title: 'exportZip', icon: 'zip' }}]
  },

  {
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'index', component: _import('theme/index'), name: 'theme', meta: { title: 'theme', icon: 'theme' }}]
  },

  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    children: [{ path: 'index', component: _import('clipboard/index'), name: 'clipboardDemo', meta: { title: 'clipboardDemo', icon: 'clipboard' }}]
  },

  {
    path: '/i18n',
    component: Layout,
    children: [{ path: 'index', component: _import('i18n-demo/index'), name: 'i18n', meta: { title: 'i18n', icon: 'international' }}]
  }, */

  { path: '*', redirect: '/404', hidden: true })

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
