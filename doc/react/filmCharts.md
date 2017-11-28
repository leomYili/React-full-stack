# 试手demo-移动版电影榜单

> 本文为react-full-stack的第一个demo,需要对于react,sass,node有一定的了解,本文详细记录了使用react开发一个简易电影榜单的过程.其中的api使用了showAPI-<https://www.showapi.com/api/lookPoint/578/4>

## 使用create-react-app开始创建项目

一个react项目最快速简单的开始,就是使用官方提供的**creat-react-app**脚手架来创建一个项目,你不需要考虑打包,不需要考虑热加载等一系列环境问题.

```
$ create-react-app your-app
```

## 配置sass环境

在**create-react-app**官网或者创建的项目中,我们可以查看**Adding a CSS Preprocessor**章节,来开启sass的使用,具体可以查看
<https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc>

## 应用功能分析

1.通过tab切换方式展示列表
2.可以排序

首先,要满足上述需求只需要一个页面就可以搞定,当前目录为:

```
src/
    components/
    App.js
    App.css
    index.js
    index.css
```

开始创建一个列表组件 -- FilmList.

## FilmList

一个简单的展示列表只需要提供模板并渲染,就可以完成需求.

```DayFilmCharts.jsx
class DayFilmCharts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                "AvgPrice": "38",
                "MovieDay": "6",
                "Rank": "1",
                "WomIndex": "",
                "SumBoxOffice": "40729",
                "BoxOffice_Up": "-88",
                "MovieName": "正义联盟",
                "AvpPeoPle": "1",
                "BoxOffice": "339"
            }]
        };
    }
    render() {
        // 这里的海报暂时使用了示意图片
        let listItems = this.state.data.map((item, index) => (
            <div className="film" key={index}>
                <div className="film_left">
                    <img className="film-poster" alt="test" src={poster} />
                </div>
                <div className="film_content">
                    <h1>{item.MovieName}</h1>
                    <p>
                        平均票价{item.AvgPrice}(¥) 环比变化{item.BoxOffice_Up}
                    </p>
                    <p>
                        单日票房{item.BoxOffice}(万) 累计票房{item.SumBoxOffice}(万)
                    </p>
                    <p>上映天数{item.MovieDay}</p>
                </div>
                <div className="film_right">
                    {item.Rank}
                </div>
            </div>
        ));

        return (
            <div className="film-list" id="days">
                {listItems}
            </div>
        );
    }
}
```

一个简单的list就可以进行渲染了

替换调获取data的部分,修改成动态获取

```DayFilmCharts.jsx update1
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        var _this = this;
        this.serverRequest = fetch(url).
            .then(function(response) {
                let json = response.json();
                if (response.status >= 200 && response.status < 300) {
                    if (json.length === 0) {
                        json.push({ warning: "暂无数据!" });
                    }
                    _this.setState({ data: json });
                } else {
                    return json.then(Promise.reject.bind(Promise));
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    }
```

### 多个榜单实现

上述仅仅只是排行榜中其中一个列表的实现,如果需要增加类型,那么可以通过复制或者修改props.url,生成不一样类型的列表.

```MonthFilmCharts.jsx
class MonthFilmCharts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount() {
        var _this = this;
        this.serverRequest = fetch(url).
            .then(function(response) {
                let json = response.json();
                if (response.status >= 200 && response.status < 300) {
                    if (json.length === 0) {
                        json.push({ warning: "暂无数据!" });
                    }
                    _this.setState({ data: json });
                } else {
                    return json.then(Promise.reject.bind(Promise));
                }
            })
            .catch(function(err) {
                console.log(err);
            });
    }
    render() {
        // 这里的海报暂时使用了示意图片
        let listItems = this.state.data.map((item, index) => (
            <div className="film" key={index}>
                <div className="film_left">
                    <img className="film-poster" alt="test" src={poster} />
                </div>
                <div className="film_content">
                    <h1>{item.MovieName}</h1>
                    <p>
                        平均票价{item.avgboxoffice}(¥) 场均人次{item.avgshowcount}
                    </p>
                    <p>
                        单月票房{item.boxoffice}(万) 上映日期{item.releaseTime}
                    </p>
                    <p>
                        月内天数{item.days} 月内占比{item.box_pro}
                    </p>
                </div>
                <div className="film_right">
                    {item.Rank}
                </div>
            </div>
        ));

        return (
            <div className="film-list" id="days">
                {listItems}
            </div>
        );
    }
}
```

而通过高阶组件的学习,可以将这一类重复的component抽象为一个函数,并可以通过对于该抽象函数的重新的定义而去修改原组件的功能

```withSubscription

class DayFilmCharts extends Component {
    render() {
        let listItems = this.props.data.map((item, index) => (
            <div className="film" key={index}>
                ...
            </div>
        ));

        if (typeof this.props.data[0].warning !== "undefined") {
            listItems = (
                <p className="film-noData">日榜{this.props.data[0].warning}</p>
            );
        }

        return (
            <div className="film-list" id="days">
                {listItems}
            </div>
        );
    }
}

function withSubscription(api) {
    let WrappedComponent =
        api.type === "Day"
            ? DayFilmCharts
            : api.type === "Week"
              ? WeekFilmCharts
              : api.type === "Month" ? MonthFilmCharts : "";

    // ……返回另一个新组件……
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: []
            };
        }

        componentDidMount() {
            var _this = this;
            this.serverRequest = getFilmData(api.url)
                .then(function(data) {
                    if (data.length === 0) {
                        data.push({ warning: "暂无数据!" });
                    }
                    _this.setState({ data: data });
                })
                .catch(function(err) {
                    console.log(err);
                });
        }

        componentWillUnmount() {
            this.serverRequest = null;
        }

        render() {
            if (this.state.data.length === 0) return false;

            return <WrappedComponent data={this.state.data} {...this.props} />;
        }
    };
}
```

而此时的列表组件则可以将相同的逻辑提取到高阶函数中统一处理.高阶组件比起普通的抽象函数而言,能够对包裹的组件进行无副作用的功能修饰,同时,也不会影响原组件的复用.

## tabs组件

通过上面的编写,现在我们有了多种类型的list,实际上,不可能每次都把所有的list全部在页面中展示完,所以,可以使用tabs组件增强app的功能.

首先,从UI划分来看,tabs实际上大致由tabHeader与tabPanel组成,tabHeader中每一个tab即对应了tabPanel,它们既可以通过顺序一致的排序值来绑定,也可以通过唯一的标识符进行绑定.

同时,为了达到切换的效果,对于tab而言,需要一个class在点击时修改被点击的tab的样式来区分,而对于tabPanel来说,一样可以通过class来达到显隐的效果,也可以只设置一个tabPanel,在每次点击tab时,重新渲染tabPanel.

```Tabs.jsx
class Tabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultIndex: props.defaultIndex || 0
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(index) {
        this.setState({
            defaultIndex: index
        });
    }

    render() {
        var _this = this;

        const list = [
            {
                tabName: "日排行",
                component: withSubscription(apis.Day)
            },{
                tabName: "周排行",
                component: withSubscription(apis.Week)
            },{
                tabName: "月排行",
                component: withSubscription(apis.Month)
            }
        ];

        return (
            <div className="tab">
                <TabHeader>
                    {list.map(function(item, index) {
                        return (
                            <Tab
                                actived={
                                    _this.state.defaultIndex == index
                                        ? "true"
                                        : "false"
                                }
                                key={index}
                                index={index}
                                onSelect={_this.handleClick}
                            >
                                <a>{item.tabName}</a>
                            </Tab>
                        );
                    })}
                </TabHeader>
                <div className="tab-content">
                    {list.map(function(item, index) {
                        return (
                            <TabPanel
                                actived={
                                    _this.state.defaultIndex == index
                                        ? "true"
                                        : "false"
                                }

                                key={index}
                            >
                                <item.component />
                            </TabPanel>
                        );
                    })}
                </div>
            </div>
        );
    }
}

class Tab extends Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onSelect(e.target.closest('li').getAttribute("index"));
    }

    isActived() {
        return this.props.actived === "true" ? "tab-active" : "";
    }

    render() {
        return (
            <li
                className={this.isActived()}
                onClick={this.handleClick}
                index={this.props.index}
            >
                {this.props.children}
            </li>
        );
    }
}
```

设置了一个defaultIndex,方便调试,以及setState.至于TabHeader与TabPanel,可以在有空时加以细化,增加功能.

这里通过简单的index与defaultIndex比对,得出被点击的tab对应的panel,并显示出来.

现在可以看到基础的应用模型了,不过每次点击tab时,总会重新发送请求.

## 解决render()中重复发送请求

对于web应用来说,我们总是希望可以做到按需加载以及不浪费带宽资源,上述之所以会重复发送请求,实际上是由于通过setState而使Tabs重新渲染了render(),所以,每次总会重复使用withSubscription()重新返回新的component.

同时,数据请求被我们放在了withSubscription中,从而每次都会重新请求.

如果判断tab第一次打开时才请求数据并渲染元素,而之后的每次请求只是根据tabPanel的显示条件,显隐tabPanel.

### refs

通过refs,我们可以获取真实dom节点,并对其进行操作.

对于tab而言,首先,初始化时我们只渲染defaultIndex对应的tabPanel.在点击之后直接修改class即可达到目标.

```refs
    handleClick(index) {

        this.tabs.map(function(item, i) {
            if (i == index) {
                console.log(i, index);
                item.classList.add("tab-active");
                _this.tabPanels[i].classList.add("tab-active");
            } else {
                item.classList.remove("tab-active");
                _this.tabPanels[i].classList.remove("tab-active");
            }
        });
    }

    render() {
        var _this = this;

        return (
            <div className="tab">
                <TabHeader>
                    {this.state.listInits.map(function(item, index) {
                        return (
                            <Tab
                                actived={
                                    _this.state.currentIndex == index
                                        ? "true"
                                        : "false"
                                }
                                key={index}
                                index={index}
                                onSelect={_this.handleClick}
                                tabRef={el => {
                                    _this.tabs.push(el);
                                }}
                            >
                                <a>{item.tabName}</a>
                            </Tab>
                        );
                    })}
                </TabHeader>
                <div className="tab-content">
                    {this.state.listInits.map(function(item, index) {
                        return (
                            <TabPanel
                                actived={
                                    _this.state.currentIndex == index
                                        ? "true"
                                        : "false"
                                }
                                tabPanelRef={el => {
                                    _this.tabPanels.push(el);
                                }}
                                key={index}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
```

这里使用了官网的demo提供的例子-对父组件暴露 DOM节点 <https://doc.react-china.org/docs/refs-and-the-dom.html>

从而在点击时对于真实dom节点直接操作,这样可以简单的达到目的,不过,既然使用了react,那么尽量少的直接操作真实dom就是我的目的.

### 使用并理解State和props

随着对于react的逐步认识,通过单向数据流,我们可以将之前存于filmList中的请求数据转移到顶层组件中,由顶层组件通过props子组件传参从而完成渲染.这样顶层组件就能直接拿到子组件的所有数据,并可以通过修改数据,影响子组件的渲染.

以该例子来看,filmList属于tabPanel,而tabPanel属于tabs,点击的动作是由tabHeader中的tab触发的,在触发完成后,可以通知tabs判断是否请求数据或者对比是否有新数据等,再传给filmList,就能完成上述需求.

而在这里,我们可以直接提到App中,以便下一步操作,可以直接将项目与之前代码做对比.

同时,Tabs组件可以进一步的解耦,而不仅是用于局限于该demo而已,不过这里就不造轮子了.

## sort

如果需要对电影榜单进行排序,请求数据时,给sort函数传入参数,重排下就可以.如果需要定义不同的排序依据,则单独保存在每个list相关的状态中,被事件改变时传给子组件就可以了.