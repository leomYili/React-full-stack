import React, { Component } from "react";
import poster from '../head.png';
import "./FilmList.css";

/**
 * 单日电影榜单
 * 
 * @class DayFilmCharts
 * @extends {Component}
 */
class DayFilmCharts extends Component {
    render() {
        let listItems = this.props.data.map((item, index) => (
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
                    <span
                        className={
                            index === 0
                                ? "film-first"
                                : index === 1
                                  ? "film-second"
                                  : index === 2 ? "film-third" : ""
                        }
                    >
                        {item.Rank}
                    </span>
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

/**
 * 单周电影榜单
 * 
 * @class WeekFilmCharts
 * @extends {Component}
 */
class WeekFilmCharts extends Component {
    render() {
        let listItems = this.props.data.map((item, index) => (
            <div className="film" key={index}>
                <div className="film_left">
                    <img className="film-poster" alt="test" src={poster} />
                </div>
                <div className="film_content">
                    <h1>{item.MovieName}</h1>
                    <p>
                        平均票价{item.AvgPrice}(¥) 环比变化{item.Amount_Up}
                    </p>
                    <p>
                        单周票房{item.WeekAmount}(万) 累计票房{item.SumWeekAmount}(万)
                    </p>
                    <p>上映天数{item.MovieDay}</p>
                </div>
                <div className="film_right">
                    <span
                        className={
                            index === 0
                                ? "film-first"
                                : index === 1
                                  ? "film-second"
                                  : index === 2 ? "film-third" : ""
                        }
                    >
                        {item.Rank}
                    </span>
                </div>
            </div>
        ));

        return (
            <div className="film-list" id="weeks">
                {listItems}
            </div>
        );
    }
}

/**
 * 单月电影榜单
 * 
 * @class MonthFilmCharts
 * @extends {Component}
 */
class MonthFilmCharts extends Component {
    render() {
        let listItems = this.props.data.map((item, index) => (
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
                    <span
                        className={
                            index === 0
                                ? "film-first"
                                : index === 1
                                  ? "film-second"
                                  : index === 2 ? "film-third" : ""
                        }
                    >
                        {item.rank}
                    </span>
                </div>
            </div>
        ));

        return (
            <div className="film-list" id="months">
                {listItems}
            </div>
        );
    }
}

/**
 * 装饰函数,将功能集合在一起
 * 
 * @param {any} type 
 * @returns 
 */
function withSubscription(item) {
    let WrappedComponent =
        item.api.type === "Day"
            ? DayFilmCharts
            : item.api.type === "Week"
              ? WeekFilmCharts
              : item.api.type === "Month" ? MonthFilmCharts : "";

    // ……返回另一个新组件……
    return class extends React.Component {
        render() {
            if (item.data.length === 0) return <div>暂无数据!</div>;

            return <WrappedComponent data={item.data} {...this.props} />;
        }
    };
}

export { withSubscription };
