import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [
    {
      path: 'pages/index',
      style: {
        navigationBarTitleText: '首页',
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/alarm',
      style: {
        navigationBarTitleText: '报警',
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/detail',
      style: {
        navigationBarTitleText: '详情',
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/monitor',
      style: {
        navigationBarTitleText: '监控',
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/profile',
      style: {
        navigationBarTitleText: '我的',
        navigationStyle: 'custom',
      },
    },
  ],
  globalStyle: {
    backgroundColor: '@bgColor',
    backgroundColorBottom: '@bgColorBottom',
    backgroundColorTop: '@bgColorTop',
    backgroundTextStyle: '@bgTxtStyle',
    navigationBarBackgroundColor: '#000000',
    navigationBarTextStyle: '@navTxtStyle',
    navigationBarTitleText: '矿山监控',
    navigationStyle: 'custom',
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#1890ff',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index',
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/home-active.png',
        text: '首页',
      },
      {
        pagePath: 'pages/monitor',
        iconPath: 'static/tabbar/monitor.png',
        selectedIconPath: 'static/tabbar/monitor-active.png',
        text: '监控',
      },
      {
        pagePath: 'pages/alarm',
        iconPath: 'static/tabbar/alarm.png',
        selectedIconPath: 'static/tabbar/alarm-active.png',
        text: '报警',
      },
      {
        pagePath: 'pages/profile',
        iconPath: 'static/tabbar/profile.png',
        selectedIconPath: 'static/tabbar/profile-active.png',
        text: '我的',
      },
    ],
  },
})
