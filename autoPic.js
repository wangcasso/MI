function slideshow(boxId,time){
    this.images=document.getElementsByClassName('autoPic')
    this.box=document.createElement('div')
    this.body=document.getElementById(boxId)
    this.ul=document.createElement('ul')
    this.timer
    this.index=0
    this._right=document.getElementById('right')
    this._left=document.getElementById('left')
    this.repeatPic=function(){
        this.ul.setAttribute('style','list-style: none;height:20px;position: absolute;z-index: 99;bottom: 20px;right:20px;')
        this.box.appendChild(this.ul)
        this.body.appendChild(this.box)
        for(let i=0;i<6;i++){
            this.li=document.createElement('li')
            this.li.innerText=i+1
            this.ul.appendChild(this.li)
            this.li.setAttribute('style','float: left;width:20px;height:20px;border-radius: 50%;background: pink;margin-right: 5px;text-align: center;')
        }
        this.liAll=document.querySelectorAll('#'+boxId+' li')
        this.liAll[0].style.background='purple'
        let _this=this
        this.ul.onclick=function(ev){
            ev=ev||event.window
            _this.target=ev.target||ev.srcElement
            if(_this.target.nodeName=='LI'){
                _this.index=_this.target.innerHTML-1
                _this.showImage()
                _this.autoPlay()
            }
        }
        this._left.onclick=function(){
            clearInterval(_this.timer)
            --_this.index
            if(_this.index==-1){
                _this.index=5
            }
            _this.showImage()
            _this.autoPlay()
        }
        this._right.onclick=function(){
            clearInterval(_this.timer)
            ++_this.index
            if(_this.index==6){
                _this.index=0
            }
            _this.showImage()
            _this.autoPlay()
        }
        this.showImage=function(){
            
            for(let i=0;i<_this.images.length;i++){
                    fadeTo(_this.images[i],0,time,function(){
                        _this.images[i].style.display='none'
                    })
                    _this.liAll[i].style.background='pink'
                }
                _this.images[_this.index].style.display='block'
                fadeTo(_this.images[_this.index],1,time)
                _this.liAll[_this.index].style.background='purple'
        }
        this.autoPlay=function(){       
            clearInterval(_this.timer)
            _this.timer=setInterval(function(){
                ++_this.index
                if(_this.index==6){
                    _this.index=0
            }
            _this.showImage()
            },4000)
        }
        this.autoPlay()

        function getStyle(ele,attr){
            return window.getComputedStyle(ele,null)[attr]?window.getComputedStyle(ele,null)[attr]:ele.current()[attr]
        }
        
        function fadeTo(ele,target,time,callback){
            clearInterval(ele.timer)
            target*=100
            let init=getStyle(ele,'opacity')*100
                callback = callback || function(){} ;
            let speed=target>init? 10: -10
            
            time=time/((target-init)/speed)
            
            ele.timer=setInterval(function(){
                let opacity=getStyle(ele,'opacity')*100
                
                if(opacity==target){
                    clearInterval(ele.timer)
                    if(callback){
                        callback(ele)
                    }
                }else{
                    ele.style.opacity=(opacity+speed)/100
                }
            },time)
        
        }
    }
}
let one=new slideshow('box',300)
        one.repeatPic()