# react-api

> 在上一篇中,使用了react创建了hello world的入门应用,而这一章,主要记录阅读react提供的api的总结

## JSX

```
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

该代码中,对于html片段,react并没有使用字符串的形式来定义,而是直接当做JavaScript来动态解析,相比较于以往各种template引擎的语法来说,其直接融合在JavaScript中的写法确实独树一帜.而在react中,jsx大量应用与用户界面的描述,不过,只需要知道JSX遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；遇到代码块（以 { 开头），就用 JavaScript 规则解析;
JSX 其实会被转化为普通的 JavaScript 对象。

## React.createElement

```
React.createElement(
  type,
  [props],
  [...children]
)
```

上述即**createElement()**函数的基本用法,现在可以将之前的hello world,用该方法来改写:

```
React.createElement('h1', null, 'Hello, world !')
```

这样就仍然可以得到与使用JSX一样的结果.

## React.Component

React.Component是React组件的基类,所有Component都会有自己的**render()**函数
其返回一个React元素,或者返回null或false,表明不渲染任何元素.

## React.PureComponent

其于React.Component基本相同,但React.PureComponent通过prop和state的浅对比来实现**shouldComponentUpate()**。
使用**shouldComponentUpdate()**以让React知道当前状态或属性的改变是否不影响组件的输出。默认行为是在每一次状态的改变重渲，在大部分情况下你应该依赖于默认行为。

而简单来说,就是如果使用React.Component,那么组件将不再因为状态的改变而重新渲染视图.

## React.cloneElement()

```
React.cloneElement(
  element,
  [props],
  [...children]
)
```

React.cloneElement() 几乎相当于：

```
<element.type {...element.props} {...props}>{children}</element.type>
```

## React.createFactory()

已被**createElement()**方法取代

## React.isValidElement()

验证对象是否是一个React元素。返回 true 或 false

## React.Children

提供了处理 this.props.children 这个不透明数据结构的工具。

```
React.Children.map(children, function[(thisArg)])
```

## ReactDOM

### ReactDOM.render()

根据上面的使用来看

```
ReactDOM.render(
  element,
  container,
  [callback]
)
```

其中,container就是将要替换内部元素的element节点.