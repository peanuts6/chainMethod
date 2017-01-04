;(function(window){
var LazyMan = function(name){
    return new LazyMan.prototype.init(name);
}
var init = function(name){
    this.queues = [];
    this.index = -1;
    if(typeof(name) != 'string'){
        return this;
    }
    this.name = name;
    
    this.putStock(function(name,next){
        this.sayHi.call(this,name);
        if(typeof(next) === 'function'){
                return next.call(this);
            }
    },name);
    var _this = this;
    setTimeout(function(){
        _this.end.call(_this);
    },10);
}
init.prototype = LazyMan.prototype;
init.constructor = LazyMan;
LazyMan.prototype.init = init;

LazyMan.prototype.putStock = function(fn,args,first,end){
    if(!!first){
        this.queues.unshift({fn:fn,args:args});
    }else{
        this.queues.push({fn:fn,args:args});
    }
    this.index++;
    return this;
}
LazyMan.prototype.callback = function(fn){
    var _this = this;
    return function(x,cb){
        fn.call(_this,x,function(){
            return cb.call(_this,arguments)
        })
    }
};
LazyMan.prototype.next = function(fn,args){
    return fn.call(this,args);
}
LazyMan.prototype.end = function(){
    if(this.queues.length == 1){
        var cb = this.queues[0];
        this.queues.shift();
        cb['fn'].call(this,cb['args'],null);
    }
    if(this.queues.length>=2){
        var cb = this.queues[0];
        var next2 = this.queues[1];
        
        this.queues.shift();
        var fn = this.callback.call(this,cb["fn"]);
        fn.call(this,cb["args"],function(){
            this.end();
        });
    }
}


LazyMan.prototype.sayHi = function(name){
    console.log('Hi! This is ' + name);
}
LazyMan.prototype.sleep = function(minuts){
    return this.putStock(function(minuts,next){
        setTimeout(function(){
            // 等待 n 秒...
            console.log('Wake up after ' + minuts +' minuts');
            if(typeof(next) === 'function'){
                return next.call(this);
            }
        },minuts*1000);
    },minuts);
}
LazyMan.prototype.eat = function(food){
    
    return this.putStock(function(food,next){
        console.log('Eat '+food+'~');
        console.log(next)
        if(typeof(next) === 'function'){
                return next.call(this);
            }
    },food);
}
LazyMan.prototype.aa = function(food){
    
    return this.putStock(function(food,next){
        console.log('aa '+food+'~');
        console.log(next)
        if(typeof(next) === 'function'){
                return next.call(this);
            }
    },food);
}
LazyMan.prototype.sleepFirst = function(minuts){
    return this.putStock(function(minuts,next){
        setTimeout(function(){
            // 等待 n 秒...
            console.log('Wake up after ' + minuts +' minuts');
            if(typeof(next) === 'function'){
                return next.call(this);
            }
        },minuts*1000);
    },minuts,true);
}
window.LazyMan = LazyMan;
})(window,undefined);




