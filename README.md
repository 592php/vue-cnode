# 基于vue.js重写Cnodejs.org社区的webapp [线上访问地址](http://demo.592php.com/vuecnode/)

## 注意：当前项目代码已经升级到2.0，均采用vue-cli搭建的程序
 如果对你有帮助，请帮忙点star。
## 技术栈

vue + vux + vue-router + webpack + ES6/7  + sass + flex

# 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，nodejs 必须是 6.0 以上版本

npm install


### 编译环境
```
npm run dev

访问 http://localhost:8031
```
### 打包发布
```
npm run build

```
### 代码检查[standardjs](https://standardjs.com/readme-zhcn.html)
可在config/index.js 
useEslint: true 设置是否启用

# 项目目录配置

```
.
├── public                                      // 入口文件
│   ├── favicon.ico                             // 图标
│   ├── index.html                              // 入口html文件
├── build                                       // 上线项目文件，放在服务器即可正常访问
├── src                                         // 源码目录
│   ├── api                                     // http请求配置
│   │   ├── api.js                              // axios配置
│   │   ├── index.js                            // 入口
│   │   ├── service.js                          // 请求url配置
│   ├── assets                                  // 静态资源库
│   │   ├── css                                 // css
│   │   ├── images                              // 图片目录
│   ├── components                              // 公共组件
│   │   ├── api.js                              // fetch配置
│   ├── config                                  // 其他配置
│   │   ├── common.js                           // 共用方法
│   ├── pages                                   // 组件页面
│   │   ├── detailes                            // 详情页面
│   │   ├── home                                // 首页
│   │   ├── login                               // 登录页
│   ├── store                                   // redux状态管理
│   │   ├── index.js                            // store入口文件
│   │   ├── modules                             // store模块
│   │   │   └── index.js                        // 入口
│   │   │   └── common.js                       // 公共状态
│   │   │   └── login.js                        // 模块
│   ├── router                                  // 路由配置
│   ├── index.js                                // 页面入口文件
├── package.json                                // 依赖包
```