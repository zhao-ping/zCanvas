class lineChart{
    constructor(id,{title="",series=[],xAxis={data:[]}}){
        this.colors=["#FD7A4F","#FDD764","#7359C3","#42C288","#92E98E","#2E8AE6","#44C0EA","#3C52C9","#4Dd62196"];
        const box= document.getElementById(id);
        box.innerHTML="";
        this.c=document.createElement("canvas");
        this.width=box.clientWidth*4;
        this.height=box.clientHeight?box.clientHeight*4:this.width*0.6;
        this.c.width=this.width;this.c.height=this.height;
        this.c.style.width=this.width/4+'px';
        this.c.style.height=this.height/4+'px';
        this.context=this.c.getContext("2d");
        this.context.width=this.size;
        this.title=title;
        this.series=series;
        this.xAxis=xAxis;
        this.xAxisPoint=[];
        this.left=this.width*0.12;
        this.right=this.width*0.95;
        this.top=this.height*0.1;
        this.lineTop=this.height*0.2;
        this.bottom=this.height*0.8;
        this.lineBottom=this.height*0.7;
        this.everyWidth=0;//x轴每个标记所占的宽度
        this.everyHeight=0;//每个数值所占的高度
        this.setXaxisPoint(xAxis.data);
        this.drawLine();
        box.appendChild(this.c);
    }
    setXaxisPoint(xAxis){
        let everyWidth=this.width*(0.95-0.1)/xAxis.length;
        this.everyWidth=everyWidth;
        for(let i=0;i<xAxis.length;i++){
            this.xAxisPoint.push(this.left+(i+0.5)*everyWidth);
        }
    }
    drawLine(){
        // 标题
        this.context.font=(this.width*0.04>80?80:this.width*0.04)+"px Helvetica";
        this.context.textAlign="center";
        this.context.fillText(this.title,this.width/2,this.height*0.08,this.width);
        this.context.fillStyle='#333';
        this.context.strokeStyle='#666';
        this.context.lineWidth=1;
        this.context.beginPath();
        this.context.moveTo(this.left,this.top);
        this.context.lineTo(this.left,this.bottom);
        this.context.lineTo(this.right,this.bottom);
        this.context.stroke();
        this.context.font=(this.width*0.02>60?60:this.width*0.02)+"px Helvetica";
        this.context.fillStyle="#999"
        this.context.textAlign='center';
        this.context.textBaseline='top';
        // 横坐标标记
        this.xAxis.data.map((item,i)=>{
            let x=this.xAxisPoint[i]
            this.context.fillText(item,x,this.bottom+this.height*0.04, this.everyWidth);
        });
        // 计算纵坐标
        let allData=[];
        this.series.map((item,i)=>{
            allData=[...allData,...item.data];
        })
        const min=Math.min(...allData);
        const max=Math.max(...allData);
        this.everyHeight=(this.lineBottom-this.lineTop)/(max-min);
        const stepNum=(max-min)/5;
        const stepHeight=(this.lineBottom-this.lineTop)/4;
        this.context.textAlign='right';
        this.context.textBaseline='middle';
        // 纵坐标标记
        for(let i=0;i<5;i++){
            let positon=[this.left-this.width*0.02,this.lineBottom-stepHeight*i];
            this.context.beginPath();
            this.context.fillText(min+stepNum*i,...positon,this.left);
        }
        // 折线图
        this.series.map((item,i)=>{
            this.context.strokeStyle=this.colors[i];
            this.context.fillStyle=this.colors[i];
            this.context.textAlign="center";
            this.context.lineWidth=this.width*0.002;
            this.context.lineJoin="round";
            this.context.beginPath();
            let datas=item.data;
            let yAxis=[];
            for(let n=0;n<datas.length;n++){
                let y=this.lineBottom-(datas[n]-min)*this.everyHeight;
                yAxis.push(y);
                if(n==0){
                    this.context.moveTo(this.xAxisPoint[n],y);
                }else{
                    this.context.lineTo(this.xAxisPoint[n],y);
                }
                if(item.tag!=null){
                   this.context.fillText(datas[n]+item.tag,this.xAxisPoint[n],y-this.height*0.04) 
                }
            }
            this.context.stroke();
            if(item.type=="area"){
                this.context.beginPath();
                this.context.fillStyle=this.colors[i];
                this.context.globalAlpha=0.1;
                this.context.moveTo(this.xAxisPoint[this.xAxisPoint.length-1],this.bottom);
                this.context.lineTo(this.xAxisPoint[0],this.bottom);
                for(let n=0;n<datas.length;n++){
                    this.context.lineTo(this.xAxisPoint[n],yAxis[n]);
                }
                this.context.fill();
            }
            this.context.globalAlpha=1;
            this.context.fillStyle="#fff";
            for(let n=0;n<datas.length;n++){
                this.context.beginPath();
                this.context.lineWidth=this.width*0.004;
                this.context.arc(this.xAxisPoint[n],yAxis[n], this.width*0.004, 0, Math.PI*2);
                this.context.stroke();
                this.context.fill();
            }
            
        });
        //计算标注起始位置
        this.context.font=(this.width*0.02>60?60:this.width*0.02)+"px Helvetica";
        let textWidth=0;
        let textStartXaxis=this.width*0.05;
        this.series.map((item,i)=>{
            let text=this.xAxis.data[i];
            textWidth+=this.context.measureText(text).width+this.width*0.08;
        })
        if(textWidth<this.width*0.9){
            textStartXaxis=(this.width-textWidth)/2
        }else{
            textStartXaxis=this.width*0.05;
        }
        //画出标注
        this.series.map((item,i)=>{
            let text=item.name;
            this.context.strokeStyle=this.colors[i];
            this.context.fillStyle="#fff";
            // 线
            this.context.beginPath();
            this.context.moveTo(textStartXaxis-this.width*0.015,this.height*0.95);
            this.context.lineTo(textStartXaxis+this.width*0.015,this.height*0.95);
            this.context.stroke();
            // 圆圈
            this.context.beginPath();
            this.context.lineWidth=this.width*0.004;
            this.context.arc(textStartXaxis,this.height*0.95, this.width*0.004, 0, Math.PI*2);
            this.context.stroke();
            this.context.fill();
            //name
            this.context.beginPath()
            this.context.fillStyle="#999";
            this.context.textAlign="left";
            this.context.textBaseline='middle';
            this.context.fillText(text,textStartXaxis+this.width*0.03,this.height*0.95,this.width*0.6);
            this.context.fill();
            textStartXaxis+=this.context.measureText(text).width+this.width*0.08;
        })
    }
}
class barChart{
    constructor(id,{title="",type="vertical", series=[],xAxis={data:[]}}){
        this.colors=["#FD7A4F","#FDD764","#7359C3","#42C288","#92E98E","#2E8AE6","#44C0EA","#3C52C9","#4Dd62196"];
        const box= document.getElementById(id);
        box.innerHTML="";
        this.c=document.createElement("canvas");
        this.width=box.clientWidth*4;
        this.height=box.clientHeight?box.clientHeight*4:this.width*0.6;
        this.c.width=this.width;this.c.height=this.height;
        this.c.style.width=this.width/4+'px';
        this.c.style.height=this.height/4+'px';
        this.context=this.c.getContext("2d");
        this.context.width=this.size;
        this.title=title;
        this.type=type.toLowerCase();
        this.series=series;
        this.xAxis=xAxis;
        this.xAxisPoint=[];
        this.yAxisPoint=[];
        this.left=this.width*0.12;
        this.lineLeft=this.width*0.22;
        this.right=this.width*0.95;
        this.lineRight=this.width*0.85;
        this.top=this.height*0.1;
        this.lineTop=this.height*0.2;
        this.bottom=this.height*0.8;
        this.lineBottom=this.height*0.7;
        this.everyWidth=0;//x轴每个标记所占的宽度;水平柱状图时与everyHeight表意互换
        this.everyHeight=0;//每个数值所占的高度
        this.draw(xAxis.data);
        box.appendChild(this.c);
    }
    draw(xAxis){
        // 标题
        this.context.font=(this.width*0.04>80?80:this.width*0.04)+"px Helvetica";
        this.context.textAlign="center";
        this.context.fillText(this.title,this.width/2,this.height*0.08,this.width);
        this.context.fillStyle='#333';
        this.context.strokeStyle='#666';
        this.context.lineWidth=1;
        this.context.beginPath();
        this.context.moveTo(this.left,this.top);
        this.context.lineTo(this.left,this.bottom);
        this.context.lineTo(this.right,this.bottom);
        this.context.stroke();
        //画出标注
        //计算标注起始位置
        this.context.font=(this.width*0.02>60?60:this.width*0.02)+"px Helvetica";
        let textWidth=0;
        let textStartXaxis=this.width*0.05;
        this.series.map((item,i)=>{
            let text=this.xAxis.data[i];
            textWidth+=this.context.measureText(text).width+this.width*0.08;
        })
        if(textWidth<this.width*0.9){
            textStartXaxis=(this.width-textWidth)/2
        }else{
            textStartXaxis=this.width*0.05;
        }
        this.series.map((item,i)=>{
            let text=item.name;
            this.context.strokeStyle=this.colors[i];
            this.context.fillStyle=this.colors[i];
            this.context.beginPath();
            //矩形
            this.context.rect(textStartXaxis, (this.height*0.95)-(this.height*0.01), this.width*0.02,this.height*0.02);
            this.context.fill();
            //name
            this.context.beginPath();
            this.context.fillStyle="#999";
            this.context.textAlign="left";
            this.context.textBaseline='middle';
            this.context.fillText(text,textStartXaxis+this.width*0.03,this.height*0.95,this.width*0.6);
            this.context.fill();
            textStartXaxis+=this.context.measureText(text).width+this.width*0.08;
        })
        
        if(this.type=="vertical"){
            this.drawVerticalBar();
        }else{
            this.drawHorizonBar();
        }
    }
    drawHorizonBar(){
        this.xAxis.data.map((item,i)=>{
            let everyHeight=(this.bottom-this.top)/this.xAxis.data.length;
            this.everyHeight=everyHeight;
            this.yAxisPoint=[]
            for(let i=0;i<this.xAxis.data.length;i++){
                this.yAxisPoint.push(this.top+(i+0.5)*everyHeight);
            }
        })
        //纵坐标标记
        this.xAxis.data.map((item,i)=>{
            let y=this.yAxisPoint[i]
            this.context.textAlign="right";
            this.context.textAlign="middle"
            this.context.fillText(item,this.left-this.width*0.02,y, this.left-this.width*0.02);
        })
        //计算横坐标
        let allData=[];
        this.series.map((item,i)=>{
            allData=[...allData,...item.data];
        })
        const min=Math.min(...allData);
        const max=Math.max(...allData);
        this.everyWidth=(this.lineRight-this.lineLeft)/(max-min);
        const stepNum=(max-min)/5;
        const stepWidth=(this.lineRight-this.lineLeft)/4;
        this.context.textAlign='center';
        // 横坐标标记
        for(let i=0;i<5;i++){
            let positon=[this.left+stepWidth*(i+0.5),this.bottom+this.height*0.04];
            this.context.beginPath();
            this.context.fillText(min+stepNum*i,...positon,this.left);
        }
        // 柱状图
        const barHeight=this.everyHeight*0.8/this.series.length;
        this.series.map((item,i)=>{
            let datas=item.data;
            this.context.fillStyle=this.colors[i];
            for(let n=0;n<datas.length;n++){
                const barWidth=(datas[n]-min)*this.everyWidth+stepWidth*0.5;
                const x=this.left;
                const y=this.left+this.everyHeight*(n+0.1-1)+barHeight*i;
                this.context.beginPath();
                this.context.rect(x,y,barWidth,barHeight);
                this.context.fill();
            }
        });
    }
    drawVerticalBar(){
        let everyWidth=this.width*(0.95-0.1)/this.xAxis.data.length;
        this.everyWidth=everyWidth;
        this.xAxisPoint=[];
        for(let i=0;i<this.xAxis.data.length;i++){
            this.xAxisPoint.push(this.left+(i+0.5)*everyWidth);
        }
        // 横坐标标记
        this.xAxis.data.map((item,i)=>{
            let x=this.xAxisPoint[i]
            this.context.fillText(item,x,this.bottom+this.height*0.05, this.everyWidth);
        });
        // 计算纵坐标
        let allData=[];
        this.series.map((item,i)=>{
            allData=[...allData,...item.data];
        })
        const min=Math.min(...allData);
        const max=Math.max(...allData);
        this.everyHeight=(this.lineBottom-this.lineTop)/(max-min);
        const stepNum=(max-min)/5;
        const stepHeight=(this.lineBottom-this.lineTop)/4;
        this.context.textAlign='right';
        // 纵坐标标记
        for(let i=0;i<5;i++){
            let positon=[this.left-this.width*0.02,this.lineBottom-stepHeight*i];
            this.context.beginPath();
            this.context.fillText(min+stepNum*i,...positon,this.left);
        }
        // 柱状图
        const barWidth=this.everyWidth*0.8/this.series.length;
        this.series.map((item,i)=>{
            let datas=item.data;
            this.context.fillStyle=this.colors[i];
            for(let n=0;n<datas.length;n++){
                const x=this.left+this.everyWidth*0.1+this.everyWidth*n+barWidth*i;
                const h=(datas[n]-min)*this.everyHeight+(this.bottom-this.lineBottom);
                const y=this.bottom-h;
                this.context.beginPath();
                this.context.rect(x,y,barWidth,h);
                this.context.fill();
            }
        });
        
    }
}

class pieChart {
    constructor(id, {data,title,type="circle",defalutIndex,callback}) {
        this.colors=["#FD7A4F","#FDD764","#7359C3","#42C288","#92E98E","#2E8AE6","#44C0EA","#3C52C9","#4Dd62196"];
        const box= document.getElementById(id);
        box.innerHTML="";
        this.c=document.createElement("canvas");
        this.width=box.clientWidth*4;
        this.height=box.clientHeight?box.clientHeight*4:this.width*0.8;
        this.size = Math.min(this.width*0.8,this.height*0.8);
        this.c.style.width = this.width / 4 + "px";
        this.c.style.height = this.height / 4 + "px";
        this.c.width = this.width;
        this.c.height = this.height;
        this.context = this.c.getContext("2d");
        this.defalutIndex = defalutIndex;
        let allNum=0;
        data.map(item=>{allNum+=item.num});
        let chartDatas=data.map((item,i)=>{
           return {color:this.colors[i],...item,percent:item.num/allNum}
        })
        this.chartDatas = chartDatas;
        this.title=title;
        this.type=type.toLowerCase();
        this.textWidth=0;
        this.tagH=0;
        this.tagW=0;
        this.lineWidth =this.type=="circle"?this.size/5:this.size/2.4;
        this.startAngle = -0.5;
        this.callback=callback;
        this.c.addEventListener('click',this.mouseDownEvent.bind(this));
        this.AngleList=[];
        this.setTitle();
        this.draw();
        box.appendChild(this.c);
    }
    setTitle(){
        this.context.font=(this.width*0.04>80?80:this.width*0.04)+"px Helvetica";
        this.context.textAlign="center";
        this.context.fillText(this.title,this.width/2,this.height*0.08,this.width);
    }
    draw() {
        this.context.clearRect(0,this.height*0.1,this.width,this.height*0.9);
        // 标题
        if (this.chartDatas.length == 0) return;
        this.context.lineWidth = this.lineWidth;
        let startAngle = Math.PI * -0.5;
        let endAngle = startAngle;
        this.AngleList=[];
        // 画饼图
        let tagW=this.size*0.06>90?90:this.size*0.06;this.tagW=tagW;
        let tagH=this.size*0.04>60?60:this.size*0.04;this.tagH=tagH;
        this.chartDatas.map((item, i) => {
            // 画标注
            let textW=this.context.measureText(item.title).width;
            if(textW>this.textWidth){
                this.textWidth=textW;
            }
            this.context.beginPath();
            this.context.strokeStyle = item.color;
            this.context.fillStyle = item.color;
            this.context.rect(this.width*0.05,this.height*0.2+tagH*i*2.5,tagW,tagH);
            this.context.fill();
            this.context.fillStyle = "#666";
            this.context.font=(this.size*0.06>50?50:this.size*0.06)+"px Helvetica";
            this.context.textAlign="left";
            this.context.textBaseline='middle';
            this.context.fillText(`${item.title}`,this.width*0.06+tagW,this.height*0.2+tagH*i*2.5+tagH*0.5);
            // 画饼图
            this.context.beginPath();
            this.context.lineWidth=this.lineWidth;
            if (i > 0) {
                startAngle = endAngle;
            }
            endAngle = startAngle + item.percent * Math.PI * 2;
            this.AngleList.push(endAngle);
            //选中当前项，需要向外偏移
            if (i == this.defalutIndex) {
                //选中当前项，需要向外偏移
                let centerAngle=(startAngle+endAngle)/2;
                let x=this.lineWidth*0.2*Math.cos(centerAngle);
                let y=this.lineWidth*0.2*Math.sin(centerAngle);
                this.context.arc(this.width*0.6 +x, this.height*0.6+y, this.size / 2 - this.lineWidth / 2 - this.lineWidth * 0.2, startAngle, endAngle);
            } else {
                this.context.arc(this.width*0.6, this.height *0.6, this.size / 2 - this.lineWidth / 2 - this.lineWidth * 0.2, startAngle, endAngle);
            }
            this.context.stroke();
            // if(this.type=="pie"){
                this.context.beginPath();
                this.context.fillStyle="#fff";
                this.context.strokeStyle="#fff";
                this.context.lineWidth=this.size*0.15;
                this.context.lineJoin="round";
                this.context.globalAlpha=0.15;
                this.context.rect(this.width*0.51,this.height*0.53,this.size*0.27,this.size*0.14);
                // this.context.fill();
                this.context.stroke();
                this.context.globalAlpha=1;
            // }
            // 百分比
            this.context.beginPath();
            this.context.fillStyle='#333';
            this.context.font=this.size*0.12+"px Helvetica";
            this.context.textAlign="center";
            this.context.textBaseline='bottom';
            let percent=Number(this.chartDatas[this.defalutIndex].percent*100).toFixed(2)+"%";
            this.context.fillText(percent,this.width*0.6,this.height*0.6);
            this.context.fill();
            //name
            this.context.beginPath();
            this.context.font=this.size*0.06+"px bold Helvetica";
            this.context.fillStyle='#666';
            this.context.textBaseline='top';
            this.context.fillText(`${this.chartDatas[this.defalutIndex].title} / ${this.chartDatas[this.defalutIndex].num}`,this.width*0.6,this.height*0.62);
        });
    }
    mouseDownEvent(e){
        const [x1,y1]=[e.offsetX,e.offsetY];
        const [x0,y0]=[this.width*0.6/4,this.height*0.6/4];
        let angle=0;
        if((x1>(this.width*0.6-this.size/2)/4)&&(x1<(this.width*0.6+this.size/2)/4)&&(y1>(this.height*0.6-this.size/2)/4)&&(y1<(this.height*0.6+this.size/2)/4)){
            if(x1>x0){
                y1<y0?angle=-0.5*Math.PI+Math.atan((x1-x0)/(y0-y1)):angle=Math.atan((y1-y0)/(x1-x0));
            }else{
                y1<y0?angle=Math.PI+Math.atan((y0-y1)/(x0-x1)):angle=Math.atan((x0-x1)/(y1-y0))+Math.PI*0.5;
            }
            for(let i=0;i<this.AngleList.length;i++){
                if(angle<this.AngleList[i]){
                    this.defalutIndex=i;
                    this.draw();
                    this.callback?this.callback(i):'';
                    break;
                }
            }
        }
        if(x1>(this.width*0.05/4)&&x1<(this.textWidth+this.tagW+this.width*0.06)/4){
            let i=Math.floor((y1*4-this.height*0.2)/this.tagH/2.5);
            if(i>=0&&i<this.chartDatas.length){
                this.defalutIndex=i;
                this.draw();
                this.callback?this.callback(i):'';
            }
        }
    }
}

class radarChart {
    constructor(id, {data,title,axis,defalutIndex=0,callback}) {
        this.colors=["#FD7A4F","#FDD764","#7359C3","#42C288","#92E98E","#2E8AE6","#44C0EA","#3C52C9","#4Dd62196"];
        const box= document.getElementById(id);
        box.innerHTML="";
        this.c=document.createElement("canvas");
        this.width=box.clientWidth*4;
        this.height=box.clientHeight?box.clientHeight*4:this.width*0.8;
        this.size = Math.min(this.width*0.8,this.height*0.8);
        this.tagW=this.size*0.06>90?90:this.size*0.06;
        this.tagH=this.size*0.04>60?60:this.size*0.04;
        this.lineLength=this.size*0.45;
        this.dataLineLength=this.lineLength*1;
        [this.x0,this.y0]=[this.width*0.6,this.height*0.55];
        this.c.style.width = this.width / 4 + "px";
        this.c.style.height = this.height / 4 + "px";
        this.c.width = this.width;
        this.c.height = this.height;
        this.context = this.c.getContext("2d");
        this.textWidth=0;
        this.defalutIndex = defalutIndex;
        this.axis=axis;
        this.startAngle=-0.5;
        this.angleList=[];
        this.angleList=axis.map((item,i)=>{
            return this.startAngle+i*Math.PI*2/axis.length;
        })
        let datas=[]
        data.map((item,i)=>{
            item["color"]=this.colors[i];
            datas=[...datas,...item.num];
        });
        data.unshift({color:"#000",name:"全部",num:[]});
        this.max=Math.max(...datas);
        this.min=Math.min(...datas);
        if(this.min!=0){
            this.min=(this.max-this.min)/this.max*this.min;
        }
        this.everyDataLineLength=this.dataLineLength/(this.max-this.min)
        this.chartDatas=data;
        this.title=title;
        this.callback=callback;
        this.c.addEventListener('click',this.mouseDownEvent.bind(this));
        this.setTitle();
        this.draw();
        box.appendChild(this.c);
    }
    setTitle(){
        this.context.font=(this.width*0.04>80?80:this.width*0.04)+"px Helvetica";
        this.context.textAlign="center";
        this.context.fillText(this.title,this.width/2,this.height*0.08,this.width);
    }
    draw(){
        this.context.clearRect(0,this.height*0.1,this.width,this.height*0.9)
        this.drawBg();
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
        this.context.fillStyle=hero.color;
        this.context.strokeStyle=hero.color;
        this.context.lineWidth=this.lineLength*0.003;
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
        let [x0,y0]=[this.x0,this.y0];
        let pointList=[];
        let points=[];
        let stepLength=this.lineLength/5;
        this.context.beginPath();
        this.context.globalAlpha=1;
        this.context.strokeStyle="#aaa";
        for(let i=5;i>0;i--){
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
            let [x0,y0]=[this.x0,this.y0];
            let [x,y]=[point.x,point.y];
            this.context.beginPath();
            this.context.moveTo(x0,y0);
            this.context.lineTo(x,y);
            this.context.stroke();
            this.context.textBaseline="middle";
            this.context.fillStyle="#999";
            let [textX,textY]=[x,y];
            this.context.beginPath();
            this.context.font=(this.lineLength*0.06>50?50:this.lineLength*0.06)+"px Helvetica";
            if(Math.abs(x-x0)<this.lineLength*0.05){
                this.context.textAlign="center";
                if(y>y0){
                    textY=y+this.lineLength*0.06;
                }else{
                    textY=y-this.lineLength*0.06;
                }
            }else if(x>x0){
                this.context.textAlign="left";
                textX=x+this.lineLength*0.04;
            }else if(x<x0){
                this.context.textAlign="right";
                textX=x-this.lineLength*0.04;
            }
            this.context.fillText(this.axis[i],textX,textY);
        })
    }
    getAnglePoint(angle,lineLength){
        let {x,y}={
            x:this.x0+Math.cos(angle)*lineLength,
            y:this.y0+Math.sin(angle)*lineLength
        }
        return {x,y}
    }
    mouseDownEvent(e){
        const [x1,y1]=[e.offsetX,e.offsetY];
        if(x1>(this.width*0.05/4)&&x1<(this.textWidth+this.tagW+this.width*0.06)/4){
            let i=Math.floor((y1*4-this.height*0.2)/this.tagH/2.5);
            if(i>=0&&i<this.chartDatas.length){
                this.defalutIndex=i;
                this.draw();
                this.callback?this.callback(i-1):'';
            }
        }
    }
}

class scatterChart {
    constructor(id, {title,xTag="",xTagNum=5,yTag="",yTagNum=5,symbolSize,series,type="scatter"}) {
        this.colors=["#FD7A4F","#FDD764","#7359C3","#42C288","#92E98E","#2E8AE6","#44C0EA","#3C52C9","#4Dd62196"];
        const box= document.getElementById(id);
        box.innerHTML="";
        this.c=document.createElement("canvas");
        this.width=box.clientWidth*4;
        this.height=box.clientHeight?box.clientHeight*4:this.width*0.6;
        this.c.width=this.width;
        this.c.height=this.height;
        this.c.style.width=this.width/4+'px';
        this.c.style.height=this.height/4+'px';
        this.context=this.c.getContext("2d");
        this.context.width=this.size;
        this.title=title;
        this.type=type;
        this.series=series;
        this.xTag=xTag;
        this.yTag=yTag;
        this.xTagNum=xTagNum;
        this.yTagNum=yTagNum;
        this.left=this.width*0.12;
        this.lineLeft=this.width*0.22;
        this.right=this.width*0.95;
        this.lineRight=this.width*0.85;
        this.top=this.height*0.1;
        this.lineTop=this.height*0.2;
        this.bottom=this.height*0.8;
        this.lineBottom=this.height*0.7;
        this.symbolSize=symbolSize||0.1;
        this.setTitle();
        this.draw();
        box.appendChild(this.c);
    }
    setTitle(){
        this.context.font=(this.width*0.04>80?80:this.width*0.04)+"px Helvetica";
        this.context.textAlign="center";
        this.context.fillText(this.title,this.width/2,this.height*0.08,this.width);
    }
    draw(){
        // 坐标轴
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
        
        this.series.map(item=>{
            xDatas=[...xDatas,...item.data.map(tem=>tem.x)];
            yDatas=[...yDatas,...item.data.map(tem=>tem.y)];
        })
        
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
        this.context.font=(this.width*0.02>60?60:this.width*0.02)+"px Helvetica";
        this.context.textAlign="center";
        this.context.textBaseline="middle";
        for(let i=0;i<5;i++){
            const xTagStr=(xMin+(xMax-xMin)/(this.xTagNum-1)*i).toFixed(0)+this.xTag;
            const position=[this.lineLeft+everyXWidth*i,this.bottom+this.height*0.05];
            this.context.fillText(xTagStr,...position,everyXWidth);
        }
        //纵坐标
        this.context.textAlign="right";
        this.context.textBaseline="middle";
        for(let i=0;i<5;i++){
            const yTagStr=(yMin+(yMax-yMin)/(this.yTagNum-1)*i).toFixed(0)+this.yTag;
            let positon=[this.left-this.width*0.02,this.lineBottom-everyYHeight*i];
            this.context.fillText(yTagStr,...positon,this.left);
        }
        //标注
        //画出标注
        //计算标注起始位置
        this.context.font=(this.width*0.02>60?60:this.width*0.02)+"px Helvetica";
        let textWidth=0;
        let textStartXaxis=this.width*0.05;
        this.series.map((item,i)=>{
            let text=item.name;
            textWidth+=this.context.measureText(text).width+this.width*0.08;
        })
        if(textWidth<this.width*0.9){
            textStartXaxis=(this.width-textWidth)/2
        }else{
            textStartXaxis=this.width*0.05;
        }
        this.series.map((item,i)=>{
            let text=item.name;
            this.context.fillStyle=this.colors[i];
            this.context.beginPath();
            //圆形
            this.context.globalAlpha=0.5;
            this.context.arc(textStartXaxis,this.height*0.95,this.width*this.symbolSize*0.1,0,Math.PI*2);
            this.context.fill();
            //name
            this.context.globalAlpha=1;
            this.context.beginPath();
            this.context.fillStyle="#999";
            this.context.textAlign="left";
            this.context.textBaseline='middle';
            this.context.fillText(text,textStartXaxis+this.width*0.02,this.height*0.95,this.width*0.6);
            this.context.fill();
            textStartXaxis+=this.context.measureText(text).width+this.width*0.08;
        })
        //计算散点大小
        let zDatas=[];
        if(this.type=="bubble"){
            this.series.map(item=>{
                zDatas=[...zDatas,...item.data.map(tem=>tem.z)];
            })
        }
        // 为计算气泡大小做准备
        const minZ=Math.min(...zDatas);
        const maxZ=Math.max(...zDatas);
        const minSymbolSize=this.symbolSize*0.4;
        const maxSymbolSize=minSymbolSize+this.symbolSize*3;
        const everySymbolSize=(maxSymbolSize-minSymbolSize)/(maxZ-minZ);

        // 散点
        this.context.globalAlpha=0.5;
        this.series.map((item,i)=>{
            this.context.fillStyle=this.colors[i];
            var datas=item.data;
            datas.map(data=>{
                let symbolSize=this.symbolSize*0.1;
                if(this.type=="bubble"){
                    symbolSize=(minSymbolSize+(data.z-minZ)*everySymbolSize)*0.1;
                }
                this.context.beginPath();
                let position=[this.lineLeft+(data.x-xMin)*everyX,this.lineBottom-(data.y-yMin)*everyY]
                this.context.arc(...position,this.width*symbolSize,0,Math.PI*2);
                this.context.fill();
            })
        })
        this.context.globalAlpha=1;
    }
}