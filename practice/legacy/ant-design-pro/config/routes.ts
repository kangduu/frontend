export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: '首页',
    menu: { flatMenu: false, title: '首页', name: '首页' },
    component: '@/pages/home',
    access: 'canAbout',
    routes: [{ path: '/home/order', name: '订单页面', component: 'list' }],
  },
];
