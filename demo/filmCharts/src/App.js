import React, { Component } from "react";
import {Tabs} from './components/Tabs';
import { apis } from "./api.js";
/**
 * 获取各类filmList数据并统一处理
 * 
 * @param {any} url 
 * @returns Promise
 */
function getFilmData(url,sortKey) {
    return fetch(url)
        .then(function(response) {
            let json = response.json(); // there's always a body
            if (response.status >= 200 && response.status < 300) {
                return json;
            } else {
                return json.then(Promise.reject.bind(Promise));
            }
        })
        .then(function(data) {
            if (data.showapi_res_code === 0) {
                return data.showapi_res_body.datalist;
            } else {
                throw new Error(data.showapi_res_error);
            }
        });
}

function sortData(key,data) {
    return data.sort(function(left, right) {
        var a = parseFloat(left[key]);
        var b = parseFloat(right[key]);

        if (a !== b) {
            if (a > b || a === void 0) return 1;
            if (a < b || b === void 0) return -1;
        }
    });
}

class App extends Component {
    constructor(){
        super();

        this.state = {
            sd:[
            {
                tabName: "日排行",
                api: apis.Day,
                sortList:['Rank','BoxOffice','AvgPrice','SumBoxOffice'],
                sortKey:'Rank',
                data: []
            },
            {
                tabName: "周排行",
                api: apis.Week,
                sortList:['Rank','WeekAmount','AvgPrice','SumWeekAmount'],
                sortKey:'Rank',
                data: []
            },
            {
                tabName: "月排行",
                api: apis.Month,
                sortList:['rank','avgboxoffice','boxoffice','avgshowcount'],
                sortKey:'rank',
                data: []
            }
        ]};

        this.init = this.init.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }
    init(index) {
        var _this = this;

        if (this.state.sd[index].data.length == 0) {
            
            getFilmData(_this.state.sd[index].api.url)
                .then(function(data) {
                    let _data = _this.state.sd.slice();
                    _data[index].data = sortData(_this.state.sd[index].sortKey,data);
                    _this.setState(_data);
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    }

    handleSort(index,key){
        console.log(index,key);

        let _data = this.state.sd.slice();
        _data[index].sortKey = key
        _data[index].data = sortData(key,_data[index].data);

        this.setState(_data);
    }

    render() {
        return (
            <div className="App">
                <article className="App-article">
                    <Tabs defaultIndex='0' name="z-tab" sd={this.state.sd} init={this.init} handleSort={this.handleSort}/>
                </article>
            </div>
        );
    }
}

export default App;
