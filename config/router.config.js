export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/index' },

      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        hideInMenu: true,
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          {
            path: '/result/registerSuccess',
            name: 'success',
            component: './Result/RegisterSuccess',
          },
          {
            path: '/result/activationSuccess',
            name: 'success',
            component: './Result/ActivationSuccess',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },

      //首页
      {
        path: '/index',
        name: 'index',
        icon: 'compass',
        component: './Index/Index',
      },
      {
        path: '/index/articleDetail',
        name: 'index',
        icon: 'compass',
        component: './Account/Article/ArticleDetail',
        hideInMenu: true,
      },

      //个人页
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        authority: ['currentUser'],
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/myStarArticles',
                component: './Account/Center/MyStarArticles',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
          // 我的文章
          {
            path: '/account/myArticle',
            name: 'myArticle',
            component: './Account/Article/MyArticle',
          },
          {
            path: '/account/addArticle',
            name: 'addArticle',
            component: './Account/Article/AddArticle',
          },
          {
            path: '/account/articleDetail',
            name: 'articleDetail',
            component: './Account/Article/ArticleDetail',
            hideInMenu: true,
          },
        ],
      },
      //排行榜
      {
        path: '/rankList',
        name: 'rankList',
        icon: 'bar-chart',
        component: './RankList/Index',
      },
      //系统管理
      {
        name: 'systemManage',
        icon: 'setting',
        path: '/systemManage',
        // authority: ['admin'],
        hideInMenu: true,
        routes: [
          // permission
          {
            path: '/systemManage/permission',
            name: 'permission',
            component: './SystemManage/Permission',
          },
          // user
          {
            path: '/systemManage/user',
            name: 'user',
            component: './SystemManage/User',
          },
          // role
          {
            path: '/systemManage/role',
            name: 'role',
            component: './SystemManage/Role',
          },
        ],
      },

      {
        component: '404',
      },
    ],
  },
];
