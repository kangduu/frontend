export default [
  {
    path: '/',
    component: '@/layouts',
    routes: [
      {
        path: "/user",
        component: "@/layouts/"

      }
    ]
  },
  // {
  //   name: '个人中心',
  //   path: '/accountcenter',
  //   component: './AccountCenter',
  //   icon: "user",
  //   flatMenu: true,
  //   // routes: [
  //   //   {
  //   //     name: "基本信息",
  //   //     path: "/user",
  //   //   },
  //   //   {
  //   //     name: "会员中心",
  //   //     path: "/user",
  //   //   },
  //   // ]
  // },
  // {
  //   name: '工作台',
  //   path: '/workplace',
  //   component: './DashboardWorkplace',
  //   access: "canReadWorkplace"
  //   // // 新页面打开
  //   // target: '_blank',
  //   // // 不展示顶栏
  //   // headerRender: false,
  //   // // 不展示页脚
  //   // footerRender: false,
  //   // // 不展示菜单
  //   // menuRender: false,
  //   // // 不展示菜单顶栏
  //   // menuHeaderRender: false,
  //   // // 权限配置，需要与 plugin-access 插件配合使用
  //   // access: 'canRead',
  //   // // 隐藏子菜单
  //   // hideChildrenInMenu: false,
  //   // // 隐藏自己和子菜单
  //   // hideInMenu: false,
  //   // // 在面包屑中隐藏
  //   // hideInBreadcrumb: false,
  //   // // 子项往上提，仍旧展示,
  //   // flatMenu: false,
  // },

  // {
  //   name: '监控页',
  //   path: '/dashboardmonitor',
  //   component: './DashboardMonitor',
  //   icon: "eye"
  // },
  // {
  //   name: "Dva-Counter",
  //   path: '/counter',
  //   component: './Counter'
  // },
  // {
  //   path: '/login',
  //   component: './login',
  // },
  {
    component: '@/pages/404.tsx',
  },
];
