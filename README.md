
![image](https://github.com/zhao-ping/zCanvas/blob/master/images/z-chart.v2.jpg)
##z-chart2.0版本简介
zp-chart.v2现现有的图表包括```柱状图```、```折线图```、```饼图```、```环形图```、```3/4环形图```、```雷达图```、```散点图```、```气泡图```这几种图表，与v1版本相比,有以下变化：
```
1.代码优化
2.新增图表“3/4环形图表”
3.窗口大小改变会重新绘制图表
4.为折线图、柱状图、气泡图、散点图、雷达图新增单条数据展示功能
5.重新定制尺寸规则布局方式，相较于版本1更加合理
```
### 获取地址
ES5地址：
<https://github.com/zhao-ping/zCanvas/blob/master/ES5/z-chart.v2.js>

ES6地址：
<https://github.com/zhao-ping/zCanvas/blob/master/ES6/z-chart.v2.js>
### 使用方法：
每种图表都需要传入两个参数，第一个是放置图表的标签的id，类型是str，第二个是图表所需参数：
```
<div id="barChart"></div>
```
```
//柱状图
new barChart("barChart", barChartOption);
```
详细使用方法请阅读下方内容：

## 柱状图与折线图
折线图和柱状图可以点击图例切换显示的数据
柱状图与折线图的参数格式是一样的，不同的参数值会有不同的效果
```
var chartOption = {
    title: "一周销售额报表", //图表标题
    type:"verticle",//柱状图方向，有垂直型柱状图(verticle)和水平型柱状图
    xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],//X轴数据
    },
    yAxis: {
        tofixed:0,//Y轴数据小数点位数，默认是0
        type: 'value',
        tag:"元",//y轴数值单位
    },
    series: [{
        name: '邮件营销',//数据分类标题
        data: [820, 932, 901, 934, 1290, 1330, 1320],//数据具体数值
        type: 'area',//line or area 用于折线图，line只画折线，area折线区域有颜色块
        tag:"",//有tag参数时,数据点的标注为data值+tag，没有tag参数时，数据点将不会标注
    }, {
        name: '联盟广告',
        data: [920, 1032, 1001, 1034, 1390, 1430, 1420],
        type: 'area',
        tag:"",
    }, {
        name: '视频广告',
        data: [620, 832, 800, 864, 1090, 1000, 1020],
        type: 'area',
        tag:"",
    }],
    callback(i){console.log(i)}//点击切换展示的具体数据条时的回调函数
};
```
#### 垂直型柱状图
![image](https://github.com/zhao-ping/zCanvas/blob/master/images/virticleBarChart.jpg)
type不传参时，默认为垂直型柱状图
```
type:"virticle"
new barChart("barChart", lineChartOption);
```
#### 水平型柱状图
![image](https://github.com/zhao-ping/zCanvas/blob/master/images/horizonBarChart.jpg)
type不传参时，默认为垂直型柱状图
```
type:"horizon"
new barChart("barChartHorizon", {...chartOption,type:"horizon"});
```
#### 无色块折线图
![image](https://github.com/zhao-ping/zCanvas/blob/master/images/linechart1.jpg)
series里的每条数据中有type参数，type有两种类型```line```和```area```,无色块折线图用```line```
```
{
    name: '联盟广告',
    data: [920, 1032, 1001, 1034, 1390, 1430, 1420],
    type: 'line',
},
new barChart("barChartHorizon", {...chartOption,type:"horizon"});
```
#### 有色块折线图
![image](https://github.com/zhao-ping/zCanvas/blob/master/images/linechart.jpg)
![image](https://github.com/zhao-ping/zCanvas/blob/master/images/linechart2.jpg)
series里的每条数据中有type参数，type有两种类型```line```和```area```,无色块折线图用```area```
```
{
    name: '联盟广告',
    data: [920, 1032, 1001, 1034, 1390, 1430, 1420],
    type: 'area',
    tag:"",
},
new lineChart("lineChart", chartOption);
```
## 气泡图与散点图
气泡图和散点图可以点击图例切换显示的数据
气泡图与餐点图的参数格式只有一点不一样,气泡图的series里的每项都是三维数据，有参数z
```
var scatterChartoption = {
    type:"scatter",
    title:"北上广一百年城市人均收入调查散点图(虚构数据)",
    xTag: "年",//x轴单位
    xTagNum:5,//x轴分成几层数据
    yTag:"元",//y轴单位
    yTagNum:5,//Y轴分成几层数据
    symbolSize:10,//旗袍或者散点大小基数
    series:  [
        {
            name:"北京",
            data:[]
        },
        {
            name:"上海",
            data:[]
        },
        {
            name:"广州",
            data:[]
        }
    ],
    callback(i){
        console.log(i)
    }
};
        
```
由于数据量有点大，用函数来随机生成了虚拟数据
```
scatterChartoption.series.map((item,i)=>{
    for(let i=0;i<30;i++){
        var x=Math.random()*100+1920;
        var y=Math.random()*(i+2)*(x-1920)*(x-1920)/2+2000;
        var z=Math.random()*90+10;
        item.data.push({x,y,z})
    }
})
```
#### 散点图
![image](https://github.com/zhao-ping/zCanvas/blob/master/images/scatterChart.jpg)
如果type没有传参，将默认是散点图
```
type:"scatter"
new scatterChart("scatterChart",scatterChartoption);
```
#### 气泡图
![image](https://github.com/zhao-ping/zCanvas/blob/master/images/bublechart.jpg)
如果type没有传参，将默认是散点图
```
type:"bubble"
new scatterChart("bubbleChart",{...scatterChartoption,type:"bubble"};
```
## 雷达图
![image](https://github.com/zhao-ping/zCanvas/blob/master/images/radarDatas.jpg)
雷达图与版本1相比，改了布局，做了窗口onresized监听，也可以切换显示项，有回调函数
```
var radarDatas={
    defalutIndex:0,
    title:"英雄能力评估",
    axis:["生命","防护","控场","机动","输出","爆发"],
    data:[
        {
            name:"嫦娥",
            num:[80,60,68,50,60,57]
        },
        {
            name:"后羿",
            num:[70,50,50,70,90,87]
        },
        {
            name:"蔡文姬",
            num:[100,100,70,60,30,20]
        },
        {
            name:"甄姬",
            num:[70,44,33,89,64,32]
        },
        {
            name:"诸葛亮",
            num:[19,46,45,88,90,87]
        },
        {
            name:"小乔",
            num:[67,69,70,80,37,45]
        },
    ],
    callback:(i)=>{console.log(i);}
}
var radarcahrt=new radarChart("radarChart", radarDatas);
```
## 环形图与饼图
环形图与饼图使用的是同一个类，参数也只有type类型不同，环形图,选中的数据图表会有相应的偏移，点击饼图或者环形图可以切换选中项，也可以点击图例切换当前选中项目
```
var pieDatas = { 
title: "饼图或者环形图",
defalutIndex:0,//默认选中数据的index
type:"pie",//pie:扇形，doughnut:环形
data: [{ name: "周一", num:620 }, { name: "周二", num:832 }, { name: "周三", num:800 }, { name: "周四", num: 864}, { name: "周五", num:1090 }, { name: "周六", num:1000 }, { name: "周日", num:1020 },] ,
callback:(i)=>{console.log(i);}
}
```
#### 饼图
![image](https://github.com/zhao-ping/zCanvas/blob/master/images/piechart.jpg)
type类型不传参默认为饼图
```
type:"pie"
new pieChart("circleChart", {...pieDatas,type:"doughnut"})
```
#### 环形图
![image](https://github.com/zhao-ping/zCanvas/blob/master/images/circleChart.jpg)
```
type:"doughnut"
new pieChart("circleChart", {...pieDatas,type:"doughnut"})
```
#### 3/4环形图
![image](https://github.com/zhao-ping/zCanvas/blob/master/images/doughnutchart.jpg)
3/4环形图数据最好大于3条
```
var doughnutOptions={
    title:"3/4环形图",
    maxData:1500,//最大值设置，若没有设置最大值，将会取data里的最大值
    tag:"元",
    data: [{ name: "周一", num:620 }, { name: "周二", num:832 }, { name: "周三", num:800 }, { name: "周四", num: 864}, { name: "周五", num:1090 }, { name: "周六", num:1000 }, { name: "周日", num:1020 },] ,
    callback:(i)=>{console.log(i);}
}
var doughnutchart=new doughnutChart("doughnutChart",doughnutOptions);
```