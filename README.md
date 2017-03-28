
# Vue 砍价活动专题


![项目摘要图](https://github.com/fengyi123/bargainActivities/blob/master/src/images/GIF.gif)


## 前端相关技术：Webpack1.0、、、VueJS1.0、、、Less、、、ES6、、、
	
	1: 依赖nodejs，需要先安装nodejs环境，安装nodejs 后执行命令 npm install 
	2: 依赖Webpack1.0 环境，，先安装webpack1.0 全局环境  npm install -g webpack@1.0
	3：检查安装成功 =>
		npm -v
		webpack -V
	4：npm install 插件名  添加开发插件
	5：npm uninstall 插件名 移除插件
	

## 项目介绍：
  
	1：build目录：
        webpack 自动化打包配置文件。

	
	2：config目录
	     webpack 自动化打包配置文件。

	3：node_module  ....
	
	4：dist目录
		最终代码编译目录

	4: src目录
		4.1：项目开发源代码目录，包括js脚本文件，css,less样式文件，images图片文件，，组件目录。
		4.2：Vue组件。
		4.3：index.html 	单页引用入口页面
		     main.js    	页面入口脚本文件
		     App.vue        app入口组件
		


## 项目运行：
    
	1：npm install ，安装node_modules所有依赖的包文件	 
	2：npm run dev   生产环境
	3：npm run build 开发环境... 最终编译代码打包到 dist目录














> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
