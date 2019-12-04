class lineAnimate{
    constructor(id,number){
        this.number=number;
        let box=document.getElementById(id);
        this.size=box.clientWidth*4;
        this.width=this.size;
        this.height=this.size;
        this.canvas=document.createElement("canvas");
        this.canvas.style.width=this.size/4;
        this.canvas.style.height=this.size/4;
        this.canvas.width=this.size;
        this.canvas.height=this.size;
        this.context=this.canvas.getContext("2d");
        this.number=number;
        this.stars=[];
        this.setStars();
        setInterval(() => {
             this.drawStars();
        }, 50);
        box.innerHTML="";
        box.appendChild(this.canvas);
    }
    drawStars(){
        this.context.fillStyle="rgba(255,255,255,0.1)";
        this.context.fillRect(0,0,this.width,this.height);
        this.context.fill();
        this.stars.map(star=>{
            // if(star.alpha>0.95){
            //     star.add=false;
            // }else if(star.alpha<0.4){
            //     star.add=true;
            // }
            // if(star.add){
            //     star.alpha+=star.speed-4/10;
            // }else{
            //     star.alpha-=star.speed-4/10;
            // }
            let img=star.getDot();
            let x=star.x0+star.speed*star.time;
            let y=star.y0+star.speed*star.time*star.slop;
            if(x>this.width||y>this.height){
                star.x0=Math.random()*this.canvas.width;
                star.y0=Math.random()*this.canvas.height;
                star.time=0;
            }
            this.context.drawImage(img,x,y,star.size,star.size);
            star.time++;
        })
    }
    setStars(){
        for(let i=0;i<this.number;i++){
            const star=new dot();
            star.x0=Math.random()*this.canvas.width;
            star.y0=Math.random()*this.canvas.height;
            this.stars.push(star);
        }
    }
}

class dot{
    constructor(){
        this.canvas=document.createElement("canvas");
        this.size=Math.random()*40+20;
        this.canvas.style.width =this.size/4+"px";
        this.canvas.style.height=this.size/4+"px";
        this.canvas.width=this.size;
        this.canvas.height=this.size;
        this.context=this.canvas.getContext("2d");
        this.alpha=Math.random();
        this.add=Math.random()>0.5?true:false;
        this.context.globalAlpha=this.alpha;
        let grd=this.context.createRadialGradient(this.size/2,this.size/2,this.size*0.1,this.size/2,this.size/2,this.size/2);
        const colorR=Math.random()*255;
        const colorG=122;
        grd.addColorStop(0,`rgba(${colorR},${colorG},233,1)`);
        grd.addColorStop(1,`rgba(${colorR},${colorG},233,0)`);
        this.context.fillStyle=grd;
        this.context.arc(this.size/2,this.size/2,this.size/2,0,Math.PI*2);
        this.context.fill();
        this.speed=Math.random()>0.5?Math.random()*10+4:-Math.random()*10-4;
        // this.speed=Math.random()*10+1;
        this.slop=Math.random()>0.5?Math.random():-Math.random();
        // this.slop=1;
        this.x0=0;
        this.y0=0;
        this.time=0;
    }
    getDot(){

        return this.canvas;
    }
}