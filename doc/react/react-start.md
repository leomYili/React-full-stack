# React是什么

> 如果单以官网的说明性文字来说明,则其基础的定义应该是一个快速构建用户界面的javascript库,但从文字中,能得到的其它知识有限,其官方文档的三个特点Declarative,Declarative,Learn Once Write Anywhere.粗略介绍了该库的特点.

不过,hello word是一个更好的开始,只有实例才能深刻.

## create-react-app

新应用以安装npm包而开始,而最省心的安装方式,就是官方提供的**create-react-app**.

```
$ npm install -g create-react-app
$ create-react-app my-app
```

这里如果安装进度条很慢,或者报错退出了,那可以试试使用`npm config set registry https://registry.npm.taobao.org`,更换下载源.

当成功之后,可以看到

```
+ react@16.0.0
+ react-scripts@1.0.14
+ react-dom@16.0.0
```

安装信息中,这三个模块是与react直接相关连的.

之后直接使用

```
$ cd my-app
$ npm start
```

即可以在本机开启一个`http://localhost:3000/`地址的应用.当然,其中涉及到了node.js的各种知识,在node.js的阅读笔记里,会详细介绍与之相关的信息.

## 添加React到现有应用

如果按照以往的逻辑,直接在本机打开index.html,即可运行项目,但在my-app中,如果不使用npm命令运行,那么是无法执行该app的.也因此,为了调试以及运行方便,需要可以直接能在浏览器端运行的文件.也就是`<script>`引入方式

### 使用 CDN

```
<script src="https://unpkg.com/react@15/dist/react.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.js"></script>
```

以上版本仅用于开发，不适合生产。压缩优化的生产版本如下：

```
<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
```

该方式可直接引入react进行使用

### npm包安装

```
$ npm install --save react react-dom
```

npm的模块,如果想在浏览器中运行,则需要使用babel进行转码

```
$ npm install --save babel-cli
$ npm install babel-preset-es2015
$ npm install babel-preset-stage-0
```

配置`.babelrc`文件

```
{
    "presets": [
        "es2015",
        "react",
        "stage-0"
    ]
}
```

当前所使用的目录为

```
first-app/
  node_modules/
  package.json
  dist/
    index.html
  src/
    index.js
  babel/
    index.js
```

进行转码

```
$ babel src -d babel
```

在安装完babel之后,如果想直接运行,则还需要使用webpack进行打包

```
$ npm install --save-dev webpack
```

并创建webpack.config.js配置文件,其内容为:

```
const path = require('path');

module.exports = {
  entry: './babel/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

最后,通过使用

```
$ ./node_modules/.bin/webpack --config webpack.config.js
```

来打包成bundle.js,现在引入index.html中,则可以开始使用react了.