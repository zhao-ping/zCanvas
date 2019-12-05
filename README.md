
![image](https://github.com/zhao-ping/zCanvas/blob/master/images/z-cahrt.png)

#### zp-chart现在有柱状图、折线图、饼图、环形图、雷达图这几种图表，下面会一一简单的说明使用方法：
每种图表都需要传入两个参数，第一个是放置图表的标签的id，类型是str，第二个是图表所需参数：
```
<div id="barChart"></div>
```
```
//柱状图
new barChart("barChart", lineChartOption);
```
详细使用方法请阅读下方内容：

## 使用方法
```
npm init
npm install
```
### 将ES6通过babel转成浏览器可以接受的ES5
```
npm run babel
```
## 1.柱状图
### A：垂直型柱状图
柱状图如果不传type参数，将会默认是垂直型柱状图
```
var lineChartOption = {
    title: "一周销售额报表",
    xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name: '邮件营销',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',//line or area
    }, {
        name: '联盟广告',
        data: [920, 1032, 1001, 1034, 1390, 1430, 1420],
        type: 'line',
    }, {
        name: '视频广告',
        data: [620, 832, 800, 864, 1090, 1000, 1020],
        type: 'line',
    }]
};
//柱状图
new barChart("barChart", lineChartOption);
```

### B：水平柱状图 

水平柱状图的参数与垂直柱状图一致，只是把type属性改成"horizon"；
```
new barChart("barChartHorizon", {...lineChartOption,type:"horizon"});
```

## 2.折线图

### A：无区域覆盖折线图

折线图的参数与柱状图的参数是一样的，只是调用的类不同而已
```
var lineChartOption = {
    title: "一周销售额报表",
    xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name: '邮件营销',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',//line or area
    }, {
        name: '联盟广告',
        data: [920, 1032, 1001, 1034, 1390, 1430, 1420],
        type: 'line',
    }, {
        name: '视频广告',
        data: [620, 832, 800, 864, 1090, 1000, 1020],
        type: 'line',
    }]
};
// 折线图
new lineChart("lineChart", lineChartOption);
```

### B：区域覆盖型折线图

这种折线图将参数type改成了"area"
```
var lineChartOptionArea = {
    title: "一周销售额报表",
    xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name: '邮件营销',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'area',//line or area
    }, {
        name: '联盟广告',
        data: [920, 1032, 1001, 1034, 1390, 1430, 1420],
        type: 'area',
    }, {
        name: '视频广告',
        data: [620, 832, 800, 864, 1090, 1000, 1020],
        type: 'area',
    }]
};
// 折线图带有区块填充色
new lineChart("lineChartArea", lineChartOptionArea);
```

### C：混合型折线图

这种折线图是部分区域覆盖，部分只有折线，只需要将需要覆盖区域的type设置为“area”，只有折线的那条数据的type设置为“line”
```
var lineChartOption = {
    title: "一周销售额报表",
    xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name: '邮件营销',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',//line or area
    }, {
        name: '联盟广告',
        data: [920, 1032, 1001, 1034, 1390, 1430, 1420],
        type: 'line',
    }, {
        name: '视频广告',
        data: [620, 832, 800, 864, 1090, 1000, 1020],
        type: 'area',
    }]
};
new lineChart("lineChart", lineChartOption);
```

### D：标注型折线图

只需要将数据的tag属性添加上去，就会在图表上自动标注
```
var lineChartTagOption = {
    title: "一周销售额报表",
    xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        name: '邮件营销',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'area',
        tag:'元'
    }]
};
// 这线上带有标注
new lineChart("lineChartTag", lineChartTagOption);
```

## 3.饼图&环形图

饼图和环形图用的是一个class，点击相应的色块和标注会突出显示当前项

### A：饼图

环形图 type设置为"pie"
```
//饼图
var pieDatas = { 
    title: "一周销售额报表",
    defalutIndex:0,
    type:"pie",//pie、circle
    data: [
        { title: "周一", num:620 },
        { title: "周二", num:832 },
        { title: "周三", num:800 },
        { title: "周四", num: 864}, 
        { title: "周五", num:1090 },
        { title: "周六", num:1000 }, 
        { title: "周日", num:1020 },
    ] ,
    callback:function(i){
        console.log(i);
        }
    }
new pieChart("pieChart", pieDatas);
```

### B：环形图

环形图 type设置为"circle"
```
var pieDatas = { 
    title: "一周销售额报表",
    defalutIndex:0,
    type:"circle",//pie、circle
    data: [
        { title: "周一", num:620 },
        { title: "周二", num:832 },
        { title: "周三", num:800 },
        { title: "周四", num: 864}, 
        { title: "周五", num:1090 },
        { title: "周六", num:1000 }, 
        { title: "周日", num:1020 },
    ] ,
    callback:function(i){
        console.log(i);
        }
    }
new pieChart("circleChart", pieDatas);
```

## 4.雷达图

雷达图会自动添加一个全部的选项，点击相应的标注会显示当前项
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
    ]
}
new radarChart("radarChart", {...radarDatas,callback:function(i){console.log(i)}});
```

## 散点图

```
var scatterChartoption = {
    type: 'scatter',
    title:"IT行业经验岗位收入散点图",
    xTag: "年",
    xTagNum:5,
    yTag:"K",
    yTagNum:5,
    symbolSize:null,
    series:  [
        {
            name:"JAVA",
            data:[{x:5,y:13},***]
        },
        {
            name:"Python",
            data:[{x:5,y:13},***]
        },
        {
            name:"Golang",
            data:[{x:5,y:13},***]
        }
    ],
};
//因为数据太多，写起来麻烦，所以我就写了个循环计算series的data值;
scatterChartoption.series.map((item,i)=>{
    item.data=[];
    for(let i=0;i<30;i++){
        var x=Math.random()*50;
        var y=x*(Math.random()*1.5+i*0.5);
        item.data.push({x,y})
    }
})
new scatterChart("scatterChart",scatterChartoption)
```