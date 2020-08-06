const colors=["#333","#FD7A4F","#FDD764","#7359C3","#42C288","#92E98E","#2E8AE6","#44C0EA","#3C52C9","#4Dd62196","#ff679b","#fa5c7c","#0acf97","#02a8b5","#39afd1","#727cf5","#727cf5","#6b5eae","#51d69a","#81a7fe","#aa67f7","#cc3fa4","#ffba49","#ff6663"];

class chart{
    constructor(id,title){
        this.colors=colors;
        this.scale=4;
        const box=document.getElementById(id);
        if(!box){
            console.log("您传入的ID不正确");
            return false;
        }
        this.box=box;
        this.canvas=document.createElement("canvas");
        this.title=title;
        this.initData();
        var resizeFun=()=>{
            this.initData();
            this.draw();
        }
        window.addEventListener('resize',resizeFun);
        this.legendRows=[];
        this.box.addEventListener("click",(e)=>{
            this.clickLegendItem(e);
        })
    }
    clickLegendItem(e){
        let [x,y]=[e.offsetX*this.scale,e.offsetY*this.scale];
        // 图例高度为10
        let dataCount=0;//点击了第几条数据的图标
        for(let rowIndex=0;rowIndex<this.legendRows.length;rowIndex++){
            let row=this.legendRows[rowIndex];
            if(y<row.y+5*this.fontSizeScale&&y>row.y-5*this.fontSizeScale){
                for(let itemIndex=0;itemIndex<row.data.length;itemIndex++){
                    let item=row.data[itemIndex];
                    dataCount++;
                    if(x>item.startX&&x<item.startX+item.width){
                        this.reDraw(dataCount-1);
                        return;
                    }
                }
                return;
            }
            dataCount+=row.data.length;
        }
    }
    reDraw(dataIndex){}
    initData(){
        this.box.innerHTML="";
        const width=this.box.clientWidth;
        const height=this.box.clientHeight||width*0.6;
        this.box.appendChild(this.canvas);
        this.width=width*this.scale;
        this.height=height*this.scale;
        this.canvas.style.width=width+"px";
        this.canvas.style.height=height+"px";
        this.context=this.canvas.getContext("2d");
        this.canvas.width=this.width;
        this.canvas.height=this.height;
        var size=width>height?width:this.height;
        if(size<=289){
            this.fontSizeScale=0.7;
        }else if(size>=580){
            this.fontSizeScale=1.4;
        }else{
            this.fontSizeScale=size/414;
        }
        this.fontSizeScale=this.fontSizeScale*this.scale;
        this.initSelfData();
    }
    initSelfData(){}
    draw(){
        this.drawTitle();
    }
    drawTitle(){
        this.context.font=`${18*this.fontSizeScale}px Helvetica`;
        this.context.fillStyle="#000";
        this.context.textAlign="center";
        this.context.textBaseline="top";
        this.context.fillText(this.title,this.width/2,this.fontSizeScale*5,this.width);
        this.top=40*this.fontSizeScale;
    }
    drawLegend(legendRows){
        let xIconWidth=20*this.fontSizeScale;
        // 画图例
        legendRows.map((row,rowIndex)=>{
            let startX=row.startX;
            row.data.map(item=>{
                item.startX=startX;
                // 图例文字
                this.context.beginPath();
                this.context.font=`${10*this.fontSizeScale}px Helvetica`;
                this.context.textAlign="left";
                this.context.textBaseline="middle";
                this.context.fillStyle="#333";
                this.context.beginPath();
                this.context.fillText(item.name,startX+xIconWidth,row.y);
                this.context.fill();
                // 图例标志
                this.context.lineWidth=1*this.fontSizeScale;
                this.context.fillStyle=item.color;
                this.context.beginPath();
                this.context.fillRect(startX,row.y-5*this.fontSizeScale,xIconWidth*0.8,10*this.fontSizeScale)
                this.context.fill();
                startX+=item.width;
            })
        })
        this.legendRows=legendRows;
    }
}

class axisChart extends chart{
    constructor(id,title="",series,xAxis,yAxis,type){
        super(id,title);
        this.defalutIndex=0;
        this.type=type;
        this.series=series;
        if(this.series[0].name!="全部"){
            this.series.unshift({name:"全部",num:[]});
        }
        this.xAxis=xAxis;
        this.xAxisPoint=[];
        this.yAxis=yAxis;
        this.yAxisCount=5;
        this.initSelfData();
        this.draw();
    }
    initSelfData(){
        this.xAxisPoint=[];
        this.titleHeight=40*this.fontSizeScale;
        this.left=this.fontSizeScale*60;
        this.lineLeft=this.left+30*this.fontSizeScale;
        this.right=this.width-this.fontSizeScale*10;
        this.lineRight=this.right-30*this.fontSizeScale;
        this.top=this.titleHeight;
        this.lineTop=this.top+30*this.fontSizeScale;
        this.bottom=this.height-80*this.fontSizeScale;
        this.lineBottom=this.bottom-30*this.fontSizeScale;
        this.stepSize = 0;//单个数值所占的尺寸(高度or宽度)
    }
    initLegendData(){
        // 画图例
        // 设置图例样式
        this.context.font=`${10*this.fontSizeScale}px Helvetica`;
        this.context.textAlign="left";
        this.context.textBaseline="middle";
        
        let xIconWidth=20*this.fontSizeScale,gapWidth=10*this.fontSizeScale;
        // 计算图例的行数和起始位置
        let legendRows=[];
        let legends=[]
        let legendW=0;
        this.series.map((item,i)=>{
            let xTagWidth=this.context.measureText(item.name).width+gapWidth;
            let itemWidth=xTagWidth+xIconWidth+gapWidth;
            if(legendW+itemWidth>this.width){
                legendRows.push({data:legends,startX:(this.width-legendW)/2+gapWidth/2});
                legends=[];
                legendW=0;
            }
            legendW+=itemWidth;
            legends.push({name:item.name,color:this.colors[i],width:itemWidth});
        })
        legendRows.push({data:legends,startX:(this.width-legendW)/2+gapWidth/2});
        this.bottom=this.height-20*this.fontSizeScale*legendRows.length-40*this.fontSizeScale;
        this.lineBottom=this.bottom-30*this.fontSizeScale;
        legendRows.map((row,i)=>{
            row.y=this.bottom+40*this.fontSizeScale+20*this.fontSizeScale*i;
        })
        this.drawLegend(legendRows);
    }
    drawVerticleAxis(){
        const everyX=(this.right-this.left)/this.xAxis.data.length;
        // x轴坐标
        for(let i=0;i<this.xAxis.data.length;i++){
            let point={x:(i+0.5)*everyX+this.left,y:this.bottom}
            this.xAxisPoint.push(point);
            this.context.fillStyle="#666";
            this.context.font=`${10*this.fontSizeScale}px Helvetica`;
            this.context.textAlign="center";
            this.context.textBaseline="top";
            this.context.fillText(this.xAxis.data[i],point.x,this.bottom+this.fontSizeScale*10,everyX);
        }
        // 垂直坐标
        // 计算数据最大值和最小值
        var seriesDatas=[];
        for(let i=1;i<this.series.length;i++){
            seriesDatas=seriesDatas.concat(this.series[i].data);
        }
        this.dataMax=Math.max(...seriesDatas);
        this.dataMin=Math.min(...seriesDatas);
        const stepYaxisDataCount=(this.dataMax-this.dataMin)/(this.yAxisCount-1);
        const stepHeight=(this.lineBottom-this.lineTop)/(this.yAxisCount-1);
        this.stepSize=(this.lineBottom-this.lineTop)/(this.dataMax-this.dataMin);

        // 画Y轴坐标
        this.context.textAlign="right";
        this.context.textBaseline="middle";
        for(let i=0;i<this.yAxisCount;i++){
            this.context.fillText(Number(this.dataMax-i*stepYaxisDataCount).toFixed(this.yAxis.tofixed)+this.yAxis.tag||"",this.left-10*this.fontSizeScale,this.lineTop+stepHeight*i);
        }
    }
    drawHorisonAxis(){
        // 画y轴坐标
        this.context.fillStyle="#666";
        this.context.textAlign="right";
        this.context.textBaseline="middle";
        const everyY=(this.bottom-this.top)/this.xAxis.data.length;
        this.xAxis.data.map((item,index)=>{
            this.context.fillText(item,this.left-10*this.fontSizeScale,this.top+(index+0.5)*everyY);
        })
        
        // 计算数据最大值和最小值
        var seriesDatas=[];
        for(let i=1;i<this.series.length;i++){
             seriesDatas=seriesDatas.concat(this.series[i].data);
        }
        this.dataMax=Math.max(...seriesDatas);
        this.dataMin=Math.min(...seriesDatas);
        const stepXaxisDataCount=(this.dataMax-this.dataMin)/(this.yAxisCount-1);
        const stepWidth=(this.lineRight-this.lineLeft)/(this.yAxisCount-1);
        this.stepSize=(this.lineRight-this.lineLeft)/(this.dataMax-this.dataMin);
        // 画Y轴坐标
        this.context.textAlign="center";
        this.context.textBaseline="top";
        for(let i=0;i<this.yAxisCount;i++){
            this.context.fillText(Number(this.dataMin+i*stepXaxisDataCount).toFixed(this.yAxis.tofixed),this.lineLeft+i*stepWidth,this.bottom+this.fontSizeScale*10);
        }
    }
    drwaAxis(){
        this.initLegendData();
        // 画坐标轴
        this.context.strokeStyle="#ccc";
        this.context.lineWidth=2;
        this.context.moveTo(this.left,this.top);
        this.context.lineTo(this.left,this.bottom);
        this.context.lineTo(this.right,this.bottom);
        this.context.stroke();
        
        if(this.type=="horizon"){
            this.drawHorisonAxis()
        }else{
            this.drawVerticleAxis();
        }
    }
}
// 折线图
class lineChart extends axisChart{
    constructor(id,{title="",series=[],xAxis={data:[]},yAxis={tofixed:0,type: 'value'},callback=()=>{}}){
        super(id,title,series,xAxis,yAxis);
        this.callback=callback;
    }
    draw(){
        this.drawTitle();
        this.drwaAxis();
        this.drawLine();
    }
    reDraw(dataIndex){
        // 从“全部”开始，全部的index=0
        this.context.clearRect(0,0,this.width,this.height);
        this.defalutIndex=dataIndex;
        this.draw();
        this.callback(dataIndex)
    }
    drawLegend(legendRows){
        // 居中显示图例
        let xIconWidth=20*this.fontSizeScale;
        // 画图例
        legendRows.map((row,rowIndex)=>{
            let startX=row.startX;
            row.data.map(item=>{
                // 图例文字
                this.context.beginPath();
                this.context.font=`${10*this.fontSizeScale}px Helvetica`;
                this.context.textAlign="left";
                this.context.textBaseline="middle";
                this.context.fillStyle="#333";
                this.context.beginPath();
                this.context.fillText(item.name,startX+xIconWidth,row.y);
                this.context.fill();
                // 图例标志
                this.context.lineWidth=1*this.fontSizeScale;
                this.context.strokeStyle=item.color;
                this.context.fillStyle=item.color;
                this.context.beginPath();
                this.context.moveTo(startX,row.y);
                this.context.lineTo(startX+xIconWidth*0.8,row.y);
                this.context.stroke();
                // 画图例圆圈
                this.context.fillStyle="#fff";
                this.context.beginPath();
                this.context.arc(startX+xIconWidth*0.4,row.y,3*this.fontSizeScale,0,2*Math.PI);
                this.context.fill();
                this.context.stroke();
                item.startX=startX;
                startX+=item.width;
            })
        })
        this.legendRows=legendRows;
    }
    drawLine(){
        let linePoints=[],endIndex=2,startIndex=1;
        if(this.defalutIndex==0){
            // 计算全部折线点
            startIndex=1
            endIndex=this.series.length;
        }else{
            // 计算选中折线的点
            startIndex=this.defalutIndex;
            endIndex=startIndex+1;
        }
        for(let i=startIndex;i<endIndex;i++){
            let item=this.series[i];
            let points={color:this.colors[i],type:item.type,data:[]}
            item.data.map((num,i)=>{
                let x=this.xAxisPoint[i].x;
                let y=this.lineTop+(this.dataMax-num)*this.stepSize;
                points.data.push({point:[x,y],value:num,tag:item.tag,});
            })
            linePoints.push(points);
        }
        // 画折线色块
        this.context.globalAlpha=0.1;
        linePoints.map(item=>{
            this.context.fillStyle=item.color;
            if(item.type=="area"){
                this.context.beginPath();
                this.context.moveTo(this.xAxisPoint[this.xAxisPoint.length-1].x,this.bottom);
                this.context.lineTo(this.xAxisPoint[0].x,this.bottom);
                item.data.map(data=>{
                    this.context.lineTo(...data.point)
                })
                this.context.closePath();
                this.context.fill();
            }
        })
        // 画折线
        this.context.globalAlpha=1;
        this.context.lineWidth=1*this.fontSizeScale;
        linePoints.map((item,itemIndex)=>{
            this.context.strokeStyle=item.color;
            this.context.beginPath();
            item.data.map(data=>{
                this.context.lineTo(...data.point)
            })
            this.context.stroke();
        })
        // 画折线圆圈点
        this.context.lineWidth=1*this.fontSizeScale;
        this.context.textBaseline="bottom";
        this.context.textAlign="center";
        linePoints.map((item,itemIndex)=>{
            this.context.strokeStyle=item.color;
            this.context.fillStyle="#fff";
            item.data.map((data,pointIndex)=>{
                this.context.beginPath();
                this.context.arc(...data.point,3*this.fontSizeScale,0,2*Math.PI);
                this.context.fill();
                this.context.stroke();
            })
        })
        linePoints.map(item=>{
            this.context.strokeStyle=item.color;
            this.context.fillStyle=item.color;
            item.data.map(data=>{
                if(data.tag!=undefined){
                    this.context.beginPath();
                    this.context.fillText(data.value,data.point[0],data.point[1]-5*this.fontSizeScale);
                }
                
            })
        })
    }
}
// 柱状图
class barChart extends axisChart{
    constructor(id,{title="",type="verticle",series=[],xAxis={data:[]},yAxis={tofixed:0,type: 'value'},callback=()=>{}}){
        super(id,title,series,xAxis,yAxis,type);
        this.callback=callback;
    }
    draw(){
        this.drawTitle();
        this.drwaAxis();
        this.drawBar();
    }
    reDraw(dataIndex){
        this.context.clearRect(0,0,this.width,this.height);
        this.defalutIndex=dataIndex;
        this.draw();
        this.callback(dataIndex);
    }
    drawBar(){
        if(this.type!="horizon"){
            this.drawVirticleBar();
        }else{
            this.drawHorizonBar();
        }
    }
    drawHorizonBar(){
        let everyYHeight=(this.bottom-this.top)/this.xAxis.data.length;
        
        let startIndex,endIndex;
        if(this.defalutIndex==0){
            startIndex=1;
            endIndex=this.series.length;
        }else{
            startIndex=this.defalutIndex;
            endIndex=startIndex+1;
        }
        let barHeight=everyYHeight/(endIndex-startIndex+1);
        this.context.font=`${7*this.fontSizeScale}px Helvetica`;
        this.context.textAlign="left";
        this.context.textBaseline="middle";
        for (let rowIndex = startIndex; rowIndex < endIndex; rowIndex++) {
            this.context.fillStyle=this.colors[rowIndex];
            let row=this.series[rowIndex];
            row.data.map((data,dataIndex)=>{
                let barWidth=(data-this.dataMin)*this.stepSize+(this.lineLeft-this.left);
                var y=this.defalutIndex==0?this.top+everyYHeight*dataIndex+barHeight*(rowIndex-0.5):this.top+everyYHeight*dataIndex+barHeight*0.5;
                this.context.fillRect(this.left,y,barWidth,barHeight);
                if(row.tag!=undefined){
                    this.context.fillText(data+row.tag,this.left+barWidth,y+barHeight*0.5);
                }
            })
        }
    }
    drawVirticleBar(){
        let everyXWidth=(this.right-this.left)/this.xAxis.data.length;
        
        let startIndex,endIndex;
        if(this.defalutIndex==0){
            startIndex=1;
            endIndex=this.series.length;
        }else{
            startIndex=this.defalutIndex;
            endIndex=startIndex+1;
        }
        let barWidth=everyXWidth/(endIndex-startIndex+1);
        this.context.font=`${7*this.fontSizeScale}px Helvetica`;
        this.context.textAlign="center";
        this.context.textBaseline="bottom";
        for (let rowIndex = startIndex; rowIndex < endIndex; rowIndex++) {
            this.context.fillStyle=this.colors[rowIndex];
            let row=this.series[rowIndex];
            row.data.map((data,dataIndex)=>{
                let x=this.defalutIndex==0?this.left+everyXWidth*dataIndex+(rowIndex-0.5)*barWidth:this.left+everyXWidth*dataIndex+0.5*barWidth;
                var rectStartPoint=[x,this.lineTop+(this.dataMax-data)*this.stepSize];
                this.context.fillRect(...rectStartPoint,barWidth,this.bottom-rectStartPoint[1]);
                if(row.tag!=undefined){
                    this.context.fillText(data+row.tag,rectStartPoint[0]+barWidth/2,rectStartPoint[1])
                }
            })
        }
    }
}
// 气泡图
class scatterChart extends chart{
    constructor(id,{title="散点图",type="scatter",xTag="",xTagNum=5,yTag="",yTagNum=5,symbolSize=10,series,callback=()=>{}}){
        super(id,title);
        this.defalutIndex=0;
        this.callback=callback;
        this.type=type;
        this.series=series;
        if(this.series[0].name!="全部"){
            this.series.unshift({name:"全部",num:[]});
        }
        this.xTag=xTag;
        this.xTagNum=xTagNum;
        this.yTag=yTag;
        this.yTagNum=yTagNum;
        this.symbolSize=symbolSize;
        this.initSelfData();
        this.draw();
    }
    draw(){
        this.drawTitle();
        this.drwaAxis();
    }
    reDraw(dataIndex){
        // 从"全部"开始，全部的Index=0
        this.callback(dataIndex);
        this.context.clearRect(0,0,this.width,this.height);
        this.defalutIndex=dataIndex;
        this.draw();
    }
    initSelfData(){
        this.xAxisPoint=[];
        this.titleHeight=40*this.fontSizeScale;
        this.left=this.fontSizeScale*60;
        this.lineLeft=this.left+30*this.fontSizeScale;
        this.right=this.width-this.fontSizeScale*10;
        this.lineRight=this.right-30*this.fontSizeScale;
        this.top=this.titleHeight;
        this.lineTop=this.top+30*this.fontSizeScale;
        this.bottom=this.height-80*this.fontSizeScale;
        this.lineBottom=this.bottom-30*this.fontSizeScale;
        this.stepSize = 0;//单个数值所占的尺寸(高度or宽度)
    }
    initLegendData(){
        // 画图例
        // 设置图例样式
        this.context.font=`${10*this.fontSizeScale}px Helvetica`;
        this.context.textAlign="left";
        this.context.textBaseline="middle";
        
        let xIconWidth=20*this.fontSizeScale,gapWidth=10*this.fontSizeScale;
        // 计算图例的行数和起始位置
        let legendRows=[];
        let legends=[]
        let legendW=0;
        this.series.map((item,i)=>{
            let xTagWidth=this.context.measureText(item.name).width+gapWidth;
            let itemWidth=xTagWidth+xIconWidth+gapWidth;
            if(legendW+itemWidth>this.width){
                legendRows.push({data:legends,startX:(this.width-legendW)/2+gapWidth/2});
                legends=[];
                legendW=0;
            }
            legendW+=itemWidth;
            legends.push({name:item.name,color:this.colors[i],width:itemWidth});
        })
        legendRows.push({data:legends,startX:(this.width-legendW)/2+gapWidth/2});
        this.bottom=this.height-20*this.fontSizeScale*legendRows.length-40*this.fontSizeScale;
        this.lineBottom=this.bottom-30*this.fontSizeScale;
        legendRows.map((row,i)=>{
            row.y=this.bottom+40*this.fontSizeScale+20*this.fontSizeScale*i;
        })
        this.drawLegend(legendRows);
    }
    drawLegend(legendRows){
        let xIconWidth=20*this.fontSizeScale;
        // 画图例
        legendRows.map((row,rowIndex)=>{
            let startX=row.startX;
            row.data.map(item=>{
                item.startX=startX;
                // 图例文字
                this.context.beginPath();
                this.context.font=`${10*this.fontSizeScale}px Helvetica`;
                this.context.textAlign="left";
                this.context.textBaseline="middle";
                this.context.fillStyle="#333";
                this.context.beginPath();
                this.context.fillText(item.name,startX+xIconWidth,row.y);
                this.context.fill();
                // 图例标志
                this.context.lineWidth=1*this.fontSizeScale;
                this.context.fillStyle=item.color;
                this.context.beginPath();
                this.context.arc(startX+10*this.fontSizeScale,row.y,5*this.fontSizeScale,0,Math.PI*2)
                // this.context.fillRect(startX,row.y-5*this.fontSizeScale,xIconWidth*0.8,10*this.fontSizeScale)
                this.context.fill();
                startX+=item.width;
            })
        })
        this.legendRows=legendRows;
    }
    drawAxisAndScatter(){
        // 坐标轴
        this.context.globalAlpha=1;
        this.context.fillStyle='#333';
        this.context.strokeStyle='#666';
        this.context.lineWidth=1;
        this.context.beginPath();
        this.context.moveTo(this.left,this.top);
        this.context.lineTo(this.left,this.bottom);
        this.context.lineTo(this.right,this.bottom);
        this.context.stroke();
        // 计算恒旭欧标和纵坐标轴标注
        let xDatas=[];
        let yDatas=[];
        for(let i=1;i<this.series.length;i++){
            let item=this.series[i];
            xDatas=[...xDatas,...item.data.map(tem=>tem.x)];
            yDatas=[...yDatas,...item.data.map(tem=>tem.y)];
        }
        
        if(xDatas.length==0) return
        const xMin=Math.min(...xDatas);
        const xMax=Math.max(...xDatas);
        const yMin=Math.min(...yDatas);
        const yMax=Math.max(...yDatas);
        const everyX=(this.lineRight-this.lineLeft)/(xMax-xMin);
        const everyXWidth=(this.lineRight-this.lineLeft)/(this.xTagNum-1);
        const everyY=(this.lineBottom-this.lineTop)/(yMax-yMin);
        const everyYHeight=(this.lineBottom-this.lineTop)/(this.yTagNum-1);
        this.context.fillStyle="#999"
        this.context.textAlign='center';
        this.context.textBaseline='top';
        // 横坐标标记
        this.context.fillStyle="#666";
        this.context.font=10*this.fontSizeScale+"px Helvetica";
        this.context.textAlign="center";
        this.context.textBaseline="top";
        for(let i=0;i<5;i++){
            const xTagStr=(xMin+(xMax-xMin)/(this.xTagNum-1)*i).toFixed(0)+this.xTag;
            const position=[this.lineLeft+everyXWidth*i,this.bottom+10*this.fontSizeScale];
            this.context.fillText(xTagStr,...position,everyXWidth);
        }
        //纵坐标
        this.context.textAlign="right";
        this.context.textBaseline="middle";
        for(let i=0;i<5;i++){
            const yTagStr=(yMin+(yMax-yMin)/(this.yTagNum-1)*i).toFixed(0)+this.yTag;
            let positon=[this.left-10*this.fontSizeScale,this.lineBottom-everyYHeight*i];
            this.context.fillText(yTagStr,...positon,this.left);
        }

        //计算散点大小
        let zDatas=[];
        if(this.type=="bubble"){
            for(let i=1;i<this.series.length;i++){
                zDatas=[...zDatas,...this.series[i].data.map(tem=>tem.z)];
            }
        }
        // 为计算气泡大小做准备
        let symbolSize=this.width*this.symbolSize*0.001;
        let everySymbolSize,minZ,maxZ,minSymbolSize,maxSymbolSize;
        if(this.type=="bubble"){
            minZ=Math.min(...zDatas);
            maxZ=Math.max(...zDatas);
            minSymbolSize=symbolSize*0.5;
            maxSymbolSize=symbolSize*4;
            everySymbolSize=(maxSymbolSize-minSymbolSize)/(maxZ-minZ);
        }
        // 散点
        this.context.globalAlpha=0.5;
        var renderScatter=(color,datas)=>{
            this.context.fillStyle=color;
            datas.map(data=>{
                if(this.type=="bubble"){
                    symbolSize=(minSymbolSize+(data.z-minZ)*everySymbolSize);
                }
                this.context.beginPath();
                let position=[this.lineLeft+(data.x-xMin)*everyX,this.lineBottom-(data.y-yMin)*everyY]
                this.context.arc(...position,symbolSize,0,Math.PI*2);
                this.context.fill();
            })
        }
        
        if(this.defalutIndex==0){
            // 画全部散点
            for(let i=1;i<this.series.length;i++){
                renderScatter(this.colors[i],this.series[i].data);
            }
        }else{
            // 画选中的散点
            let datas=this.series[this.defalutIndex].data;
            renderScatter(this.colors[this.defalutIndex],datas);
        }
        
        this.context.globalAlpha=1;
    }
    drwaAxis(){
        this.initLegendData();
        // 画坐标轴
        this.context.strokeStyle="#ccc";
        this.context.lineWidth=2;
        this.context.moveTo(this.left,this.top);
        this.context.lineTo(this.left,this.bottom);
        this.context.lineTo(this.right,this.bottom);
        this.context.stroke();
        this.drawAxisAndScatter();
    }
}
// 雷达图
class radarChart extends chart{
    constructor(id,{title="雷达图",defalutIndex=0,axis,data,callback=()=>{}}){
        super(id,title);
        this.bgLineCount=5;//背景分层线条的层数
        this.defalutIndex=defalutIndex;
        this.axis=axis;
        this.data=data;
        this.callback=callback;
        let datas=[];
        data.unshift({name:"全部",num:[]});
        data.map((item,i)=>{
            item["color"]=this.colors[i];
            datas=[...datas,...item.num];
        });
        this.max=Math.max(...datas);
        this.min=Math.min(...datas);
        if(this.min!=0){
            this.min=(this.max-this.min)/this.max*this.min;
        }
        this.chartDatas=data;
        this.startAngle=-0.5;
        this.angleList=[];
        this.angleList=axis.map((item,i)=>{
            return this.startAngle+i*Math.PI*2/axis.length;
        })
        this.everyDataLineLength=0;
        this.initSelfData();
        this.draw();
    }
    draw(){
        this.drawTitle();
        this.initLegendData();
        this.drawBg();
        this.drawHeros();
    }
    reDraw(dataIndex){
        // 从"全部"开始，全部的Index=0
        this.context.clearRect(0,0,this.width,this.height);
        this.defalutIndex=dataIndex;
        this.draw();
        this.callback(dataIndex);
    }
    initData(){
        this.box.innerHTML="";
        const width=this.box.clientWidth;
        const height=this.box.clientHeight||width;
        this.box.appendChild(this.canvas);
        this.width=width*this.scale;
        this.height=height*this.scale;
        this.canvas.style.width=width+"px";
        this.canvas.style.height=height+"px";
        this.context=this.canvas.getContext("2d");
        this.canvas.width=this.width;
        this.canvas.height=this.height;
        var size=width>height?height:width;
        if(size<=289){
            this.fontSizeScale=0.7;
        }else if(size>=580){
            this.fontSizeScale=1.4;
        }else{
            this.fontSizeScale=size/414;
        }
        this.fontSizeScale=this.fontSizeScale*this.scale;
        this.top=60*this.fontSizeScale;
       
    }
    initLegendData(){
        // 画图例
        // 设置图例样式
        this.context.font=`${10*this.fontSizeScale}px Helvetica`;
        this.context.textAlign="left";
        this.context.textBaseline="middle";
        
        let xIconWidth=20*this.fontSizeScale,gapWidth=10*this.fontSizeScale;
        // 计算图例的行数和起始位置
        let legendRows=[];
        let legends=[]
        let legendW=0;
        this.data.map((item,i)=>{
            let xTagWidth=this.context.measureText(item.name).width+gapWidth;
            let itemWidth=xTagWidth+xIconWidth+gapWidth;
            if(legendW+itemWidth>this.width){
                legendRows.push({data:legends,startX:(this.width-legendW)/2+gapWidth/2});
                legends=[];
                legendW=0;
            }
            legendW+=itemWidth;
            legends.push({name:item.name,color:this.colors[i],width:itemWidth});
        })
        legendRows.push({data:legends,startX:(this.width-legendW)/2+gapWidth/2});
        this.bottom=this.height-20*this.fontSizeScale*legendRows.length-40*this.fontSizeScale;
        this.everyDataLineLength=(this.bottom-this.top-20*this.fontSizeScale)/2/(this.max-this.min);
        this.pointCenter=[this.width/2,this.top+(this.bottom-this.top)/2];
        legendRows.map((row,i)=>{
            row.y=this.bottom+40*this.fontSizeScale+20*this.fontSizeScale*i;
        })
        this.drawLegend(legendRows);
    }
    drawHeros(){
        this.chartDatas.map((hero,i)=>{
            // 标注
            let textW=this.context.measureText(hero.name).width;
            if(textW>this.textWidth){
                this.textWidth=textW;
            }
            this.context.beginPath();
            this.context.strokeStyle = hero.color;
            this.context.fillStyle = hero.color;
            this.context.rect(this.width*0.05,this.height*0.2+this.tagH*i*2.5,this.tagW,this.tagH);
            this.context.fill();
            // name 标注名
            this.context.fillStyle = "#666";
            this.context.font=(this.size*0.06>50?50:this.size*0.06)+"px Helvetica";
            this.context.textAlign="left";
            this.context.textBaseline='middle';
            this.context.fillText(`${hero.name}`,this.width*0.06+this.tagW,this.height*0.2+this.tagH*i*2.5+this.tagH*0.5);
        })
        if(this.defalutIndex==0){
            this.chartDatas.map((hero,i)=>{
                this.drawHero(hero,i);
            })
        }else if(this.defalutIndex>0){
            this.drawHero(this.chartDatas[this.defalutIndex],this.defalutIndex);
        }
    }
    drawHero(hero,i){
        // 范围
        this.context.beginPath();
        this.context.lineWidth=0.5*this.fontSizeScale;
        this.context.fillStyle=hero.color;
        this.context.strokeStyle=hero.color;
        hero.num.map((num,i)=>{
            let lineLenth=this.everyDataLineLength*(num-this.min);
            let {x,y}=this.getAnglePoint(this.angleList[i],lineLenth);
            if(i==0){
                this.context.moveTo(x,y);
            }else{
                this.context.lineTo(x,y);
            }
        })
        this.context.closePath();
        this.context.stroke();
        this.context.globalAlpha=0.1;
        this.context.fill();
        this.context.globalAlpha=1;
    }
    drawBg(){
        let [x0,y0]=this.pointCenter;
        let pointList=[];
        let points=[];
        let stepLength=(this.bottom-this.top-20*this.fontSizeScale)/2/this.bgLineCount;
        this.context.beginPath();
        this.context.globalAlpha=1;
        this.context.strokeStyle="#ddd";
        for(let i=this.bgLineCount;i>0;i--){
            let currentlineLength=stepLength*i;
            points=[];
            this.context.beginPath();
            this.angleList.map((angle,j)=>{
                let {x,y}=this.getAnglePoint(angle,currentlineLength);
                points.push({x,y});
                if(j==0){
                    this.context.moveTo(x,y);
                }else{
                    this.context.lineTo(x,y);
                }
            })
            pointList.push(points);
            this.context.closePath();
            this.context.stroke();
        }
        pointList[0].map((point,i)=>{
            let [x0,y0]=this.pointCenter;
            let [x,y]=[point.x,point.y];
            this.context.beginPath();
            this.context.moveTo(x0,y0);
            this.context.lineTo(x,y);
            this.context.stroke();
            this.context.textBaseline="middle";
            this.context.fillStyle="#999";
            let [textX,textY]=[x,y];
            this.context.beginPath();
            this.context.font=10*this.fontSizeScale+"px Helvetica";
            if(i==this.axis.length-1||i==this.axis.length/2-1){
                this.context.textAlign="center";
                if(y>y0){
                    textY=y+this.fontSizeScale*10;
                }else{
                    textY=y-this.fontSizeScale*10;
                }
            }else if(x>x0){
                this.context.textAlign="left";
                textX=x+this.fontSizeScale*10;
            }else if(x<x0){
                this.context.textAlign="right";
                textX=x-this.fontSizeScale*10;
            }
            this.context.fillText(this.axis[i],textX,textY);
        })
    }
    getAnglePoint(angle,lineLength){
        let {x,y}={
            x:this.pointCenter[0]+Math.cos(angle)*lineLength,
            y:this.pointCenter[1]+Math.sin(angle)*lineLength
        }
        return {x,y}
    }
}
// 饼图
class pieChart extends chart{
    constructor(id,{title="饼图",type,defalutIndex=0,data,callback=()=>{}}){
        super(id,title);
        this.colors=[...colors].splice(1,colors.length-1);
        this.type=type;
        this.defalutIndex=defalutIndex;
        this.data=data;
        this.callback=callback;
        this.defalutIndex = defalutIndex;
        let allNum=0;
        data.map(item=>{allNum+=item.num});
        let chartDatas=data.map((item,i)=>{
           return {color:this.colors[i],...item,percent:item.num/allNum}
        })
        this.chartDatas = chartDatas;
        this.type=type.toLowerCase();
        this.tagH=0;
        this.tagW=0;
        this.lineWidth =this.type=="circle"?this.size/5:this.size/2.4;
        this.startAngle = -0.5;
        this.AngleList=[];
        this.initSelfData();
        this.draw();
        this.box.addEventListener("click",(e)=>{
            this.clickPie(e);
        })
    }
    draw(){
        this.drawTitle();
        this.initLegendData();
        this.drawPie();
    }
    reDraw(dataIndex){
        // 从"全部"开始，全部的Index=0
        this.context.clearRect(0,0,this.width,this.height);
        this.defalutIndex=dataIndex;
        this.draw();
        this.callback(dataIndex);
    }
    clickPie(e){
        let [x1,y1]=[e.offsetX*this.scale,e.offsetY*this.scale];
        let [x0,y0]=this.pointCenter;
        let lineLength=Math.sqrt((x0-x1)*(x0-x1)+(y0-y1)*(y0-y1));
        // 用三角函数计算夹角
        let angle=Math.atan(Math.abs(x0-x1)/Math.abs(y0-y1));
        let eventAngle;
        // 点击范围在饼图范围内
        if(lineLength<this.radius){
            // 计算角度
            if(x1>x0){
                if(y1<y0){
                    // 第一象限
                    eventAngle=angle
                }else{
                    // 第二象限
                    eventAngle=Math.PI-angle
                }
            }else{
                if(y1<y0){
                    // 第四象限
                    eventAngle=Math.PI*2-angle;
                }else{
                    // 第三象限
                    eventAngle=Math.PI+angle
                }
            }
            // console.log(eventAngle)
            eventAngle+=this.startAngle*Math.PI;
            for(let i=0;i<this.data.length;i++){
                let item=this.data[i];
                // console.log(item.startAngle,item.endAngle,eventAngle);
                if(item.startAngle<eventAngle&&item.endAngle>eventAngle){
                    // this.defalutIndex=i;
                    this.reDraw(i);
                    return;
                }
            }
        }
        
    }
    initData(){
        this.box.innerHTML="";
        const width=this.box.clientWidth;
        const height=this.box.clientHeight||width;
        this.box.appendChild(this.canvas);
        this.width=width*this.scale;
        this.height=height*this.scale;
        this.canvas.style.width=width+"px";
        this.canvas.style.height=height+"px";
        this.context=this.canvas.getContext("2d");
        this.canvas.width=this.width;
        this.canvas.height=this.height;
        var size=width>height?height:width;
        if(size<=289){
            this.fontSizeScale=0.7;
        }else if(size>=580){
            this.fontSizeScale=1.4;
        }else{
            this.fontSizeScale=size/414;
        }
        this.fontSizeScale=this.fontSizeScale*this.scale;
        this.top=60*this.fontSizeScale;
       
    }
    initLegendData(){
        // 画图例
        // 设置图例样式
        this.context.font=`${10*this.fontSizeScale}px Helvetica`;
        this.context.textAlign="left";
        this.context.textBaseline="middle";
        
        let xIconWidth=20*this.fontSizeScale,gapWidth=10*this.fontSizeScale;
        // 计算图例的行数和起始位置
        let legendRows=[];
        let legends=[]
        let legendW=0;
        this.data.map((item,i)=>{
            let xTagWidth=this.context.measureText(item.name).width+gapWidth;
            let itemWidth=xTagWidth+xIconWidth+gapWidth;
            if(legendW+itemWidth>this.width){
                legendRows.push({data:legends,startX:(this.width-legendW)/2+gapWidth/2});
                legends=[];
                legendW=0;
            }
            legendW+=itemWidth;
            legends.push({name:item.name,color:this.colors[i],width:itemWidth});
        })
        legendRows.push({data:legends,startX:(this.width-legendW)/2+gapWidth/2});
        this.bottom=this.height-20*this.fontSizeScale*legendRows.length-40*this.fontSizeScale;
        this.everyDataLineLength=(this.bottom-this.top-20*this.fontSizeScale)/2/(this.max-this.min);
        this.pointCenter=[this.width/2,this.top+(this.bottom-this.top)/2];
        legendRows.map((row,i)=>{
            row.y=this.bottom+40*this.fontSizeScale+20*this.fontSizeScale*i;
        })
        this.drawLegend(legendRows);
        this.pieCenterPoint=[this.width/2,(this.bottom-this.top)/2+this.top];
    }
    drawPie(){
        console.log(this.defalutIndex)
        let radius=(this.bottom-this.top)/2;
        this.radius=radius;
        this.context.lineWidth=radius*0.4;
        if(this.type!="pie"){
            radius=(this.bottom-this.top)/2-this.context.lineWidth/2;
        }
        this.pointCenter=[this.width/2,this.top+(this.bottom-this.top)/2];
        let totalCount=0;
        this.data.map(item=>{
            totalCount+=item.num;
        });
        // 画饼图or环形图
        let startAngle=this.startAngle*Math.PI;
        let endAngle;
        this.data.map((item,i)=>{
            let percent=item.num/totalCount;
            let stepAngle=percent*Math.PI*2
            let endAngle=startAngle+stepAngle;
            item.startAngle=startAngle;
            item.endAngle=endAngle;
            item.percent=percent;
            let center=this.pointCenter;
            if(i==this.defalutIndex){
                center=this.getAnglePoint(stepAngle/2+startAngle,radius*0.1);
            }
            this.context.fillStyle=this.colors[i];
            this.context.strokeStyle=this.colors[i];
            this.context.beginPath();
            this.context.arc(...center,radius,startAngle,endAngle,false);
            if(this.type!="pie"){
                this.context.stroke();
            }else{
                this.context.lineTo(...center);
                this.context.closePath();
                this.context.fill();
            }
            startAngle=endAngle;
        })
        // 当前项标注
        this.context.fillStyle="rgba(255,255,255,0.6)";
        this.context.beginPath();
        this.context.arc(...this.pointCenter,radius*0.55,0,Math.PI*2);
        this.context.fill();
        this.context.fillStyle="#333";
        this.context.font=`${radius*0.3}px Helvetica`;
        this.context.textBaseline="bottom";
        this.context.textAlign="center";
        this.context.fillText(((this.data[this.defalutIndex].num/totalCount)*100).toFixed(2)+"%",...this.pointCenter);
        this.context.fillStyle="#666";
        this.context.font=`${radius*0.15}px Helvetica`;
        this.context.textBaseline="top";
        this.context.fillText(`${this.data[this.defalutIndex].name} / ${this.data[this.defalutIndex].num}`,this.pointCenter[0],this.pointCenter[1]+radius*0.1);
    }
    getAnglePoint(angle,lineLength){
        let {x,y}={
            x:this.pointCenter[0]+Math.cos(angle)*lineLength,
            y:this.pointCenter[1]+Math.sin(angle)*lineLength
        }
        return [x,y]
    }
}
// 3/4环形图
class doughnutChart extends chart{
    constructor(id,{title="3/4环形图",maxData,data,tag="",callback=()=>{}}){
        super(id,title);
        this.colors=[...colors].splice(1,colors.length-1);
        this.maxData=maxData;
        this.data=data;
        this.tag=tag;
        this.callback=callback;
        this.initData();
        this.draw();
    }
    draw(){
        this.drawTitle();
        this.drawDoughnut();
    }
    reDraw(){
        this.context.clearRect(0,0,this.width,this.height);
        this.draw();
    }
    initData(){
        this.box.innerHTML="";
        const width=this.box.clientWidth;
        const height=this.box.clientHeight||width;
        this.box.appendChild(this.canvas);
        this.width=width*this.scale;
        this.height=height*this.scale;
        this.canvas.style.width=width+"px";
        this.canvas.style.height=height+"px";
        this.context=this.canvas.getContext("2d");
        this.canvas.width=this.width;
        this.canvas.height=this.height;
        var size=width>height?width:this.height;
        if(size<=289){
            this.fontSizeScale=0.7;
        }else if(size>=580){
            this.fontSizeScale=1.4;
        }else{
            this.fontSizeScale=size/414;
        }
        this.fontSizeScale=this.fontSizeScale*this.scale;
        this.initSelfData();
    }
    initSelfData(){
    }
    drawDoughnut(){
        this.bottom=this.height-20*this.fontSizeScale
        this.pointCenter=[this.width/2,(this.bottom-this.top)/2+this.top];
        let startRadiusPercent=0.2;
        let maxRadius=this.bottom-this.pointCenter[1];
        let stepRadius=maxRadius*(1-startRadiusPercent)/this.data.length;
        this.context.lineWidth=stepRadius/2;
        this.context.lineCap="round";
        this.context.font=`${9*this.fontSizeScale}px Helvetica`;
        this.context.textAlign="left";
        this.context.textBaseline="middle";
        let radius=maxRadius*startRadiusPercent+stepRadius/2;
        // 计算最大值
        if(!this.maxData){
            let datas=this.data.map(item=>item.num);
            this.maxData=Math.max(...datas);
        }
        this.data.map((item,itemIndex)=>{
            //背景环
            this.context.strokeStyle=this.colors[itemIndex];
            this.context.globalAlpha=0.1;
            this.context.beginPath();
            this.context.arc(...this.pointCenter,radius,0,Math.PI*1.5,false);
            this.context.stroke();
            // 数据环
            // 计算结束角度
            let endAngle=-0.5*Math.PI-(item.num/this.maxData)*Math.PI*1.5;
            console.log(endAngle);
            this.context.globalAlpha=1;
            this.context.beginPath();
            this.context.arc(...this.pointCenter,radius,-0.5*Math.PI,endAngle,true);
            this.context.stroke();
            // name
            this.context.fillStyle="#333";
            this.context.fillText(`${item.name} / ${item.num}${this.tag}`,this.pointCenter[0]+stepRadius*0.5,this.pointCenter[1]-stepRadius*(itemIndex+0.5)-startRadiusPercent*maxRadius);

            radius+=stepRadius;
        })
    }
}
