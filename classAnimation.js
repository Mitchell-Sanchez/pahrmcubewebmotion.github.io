class Animation{
    constructor(animationId,inSegment,loopSegment){
        this.getElements(animationId);
        this.inSegment = inSegment;
        this.loopSegment = loopSegment;
    }
    initDate = {
        animationWidth : 300,
        animationHeight : 300,
        layerWidth : 300,
        layerHeight : 300,
        layerScale: 1 ,
    }
    animation = [];
    getElements(animationId){
        this.animationElement = document.getElementById(animationId);
        this.animationElement.style.width = this.initDate.animationWidth;
        this.animationElement.style.height = this.initDate.animationHeight;
        this.animationElement.style.position = 'relative';
        // this.animationElement.style.backgroundColor = "0092bc"
    }
    creatLayer (jsonPath){

        let countLayer = this.animation.length;

        let layerElement = document.createElement('layer');
        //添加图层属性
        layerElement.id = 'layer' + countLayer;
        layerElement.style.zIndex = countLayer*(-1);
        layerElement.style.position = 'absolute';
        layerElement.style.width = this.initDate.layerWidth;
        layerElement.style.height = this.initDate.layerHeight;
        layerElement.style.transform =  'scale(' + this.initDate.layerScale + ')'
        
        this.animationElement.appendChild(layerElement);

        //加载lottie动画
        let layer = lottie.loadAnimation({
            container: layerElement ,
            renderer: 'svg',
            path:jsonPath,
            loop: false, 
            autoplay: false,  
        });

        this.animation.push(layer);
        // return layerElement.style.width;
    }
    setLayerEffect(layerEffect,layerIndex){
        //设置图层效果  参数示例：blur(10px)   0
        //这个方法是基于filter的，第一个参数的规则遵循filter的字符规则
        this.animationElement.children[layerIndex].style.filter = layerEffect;
    }
    addRotationAnimation(layerIndex,velocity){
        let start = Date.now();
        let rotationAnimat = ()=>{
            let time = Date.now();
            let d = (time - start)/(1/velocity*100);
            this.animationElement.children[layerIndex].style.transform = 'rotate('+d+'deg)';
            requestAnimationFrame(()=>rotationAnimat());
        }
        rotationAnimat();
    }
    //播放指定图层的动画
    playLayer(layerIndex){
        //元素加载完成后执行
        this.animation[layerIndex].addEventListener("DOMLoaded",() => {
            //执行入场动画
            this.playInAnimation(layerIndex);
            //播放完成后执行
            this.animation[layerIndex].addEventListener("complete",() => {
                //执行循环动画
                this.playLoopAnimation(layerIndex);
            }) 
        })
    }
    playAnimation(){
        let i = 0;
        for(i=0;i<this.animation.length;i++){
            this.playLayer(i);  
        }
    }
    setSpeed(speed){
        let i = 0;
        for(i=0;i<this.animation.length;i++){
            this.animation[i].setSpeed(speed);
        }
    }
    playInAnimation(layerIndex){
        this.animation[layerIndex].addEventListener("DOMLoaded",() => {
            this.animation[layerIndex].playSegments(this.inSegment,true);
        }) 
    }
    playLoopAnimation(layerIndex){
            this.animation[layerIndex].playSegments(this.loopSegment,true);
    }

}