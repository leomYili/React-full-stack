# React是什么

> 如果单以官网的说明性文字来说明,则其基础的定义应该是一个快速构建用户界面的javascript库,但从文字中,能得到的其它知识有限,其官方文档的三个特点Declarative,Declarative,Learn Once Write Anywhere.粗略介绍了该库的特点.

不过,hello word是一个更好的开始,只有实例才能深刻.

## create-react-app

新应用以安装npm包而开始,而最省心的安装方式,就是官方提供的**create-react-app**.

```
npm install -g create-react-app
create-react-app my-app
```

这里如果安装进度条很慢,或者报错退出了,那可以试试使用`npm config set registry https://registry.npm.taobao.org`,更换下载源.

当成功之后,可以看到

```
+ react@16.0.0
+ react-scripts@1.0.14
+ react-dom@16.0.0
```

安装信息中,这三个文件是与react直接相关连的