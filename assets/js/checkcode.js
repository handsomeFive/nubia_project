!(function(window, document) {
    function GVerify(options) { //鍒涘缓涓€涓浘褰㈤獙璇佺爜瀵硅薄锛屾帴鏀秓ptions瀵硅薄涓哄弬鏁�
        this.options = { //榛樿options鍙傛暟鍊�
            id: "", //瀹瑰櫒Id
            canvasId: "verifyCanvas", //canvas鐨処D
            width: "100", //榛樿canvas瀹藉害
            height: "30", //榛樿canvas楂樺害
            type: "blend", //鍥惧舰楠岃瘉鐮侀粯璁ょ被鍨媌lend:鏁板瓧瀛楁瘝娣峰悎绫诲瀷銆乶umber:绾暟瀛椼€乴etter:绾瓧姣�
            code: ""
        }

        if(Object.prototype.toString.call(options) == "[object Object]"){//鍒ゆ柇浼犲叆鍙傛暟绫诲瀷
            for(var i in options) { //鏍规嵁浼犲叆鐨勫弬鏁帮紝淇敼榛樿鍙傛暟鍊�
                this.options[i] = options[i];
            }
        }else{
            this.options.id = options;
        }

        this.options.numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
        this.options.letterArr = getAllLetter();

        this._init();
        this.refresh();
    }

    GVerify.prototype = {
        /**鐗堟湰鍙�**/
        version: '1.0.0',

        /**鍒濆鍖栨柟娉�**/
        _init: function() {
            var con = document.getElementById(this.options.id);
            var canvas = document.createElement("canvas");
            this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "100";
            this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";
            canvas.id = this.options.canvasId;
            canvas.width = this.options.width;
            canvas.height = this.options.height;
            canvas.style.cursor = "pointer";
            canvas.innerHTML = "鎮ㄧ殑娴忚鍣ㄧ増鏈笉鏀寔canvas";
            con.appendChild(canvas);
            var parent = this;
            canvas.onclick = function(){
                parent.refresh();
            }
        },

        /**鐢熸垚楠岃瘉鐮�**/
        refresh: function() {
            this.options.code = "";
            var canvas = document.getElementById(this.options.canvasId);
            if(canvas.getContext) {
                var ctx = canvas.getContext('2d');
            }else{
                return;
            }

            ctx.textBaseline = "middle";

            ctx.fillStyle = randomColor(180, 240);
            ctx.fillRect(0, 0, this.options.width, this.options.height);

            if(this.options.type == "blend") { //鍒ゆ柇楠岃瘉鐮佺被鍨�
                var txtArr = this.options.numArr.concat(this.options.letterArr);
            } else if(this.options.type == "number") {
                var txtArr = this.options.numArr;
            } else {
                var txtArr = this.options.letterArr;
            }

            for(var i = 1; i <= 4; i++) {
                var txt = txtArr[randomNum(0, txtArr.length)];
                this.options.code += txt;
                ctx.font = randomNum(this.options.height/2, this.options.height) + 'px SimHei'; //闅忔満鐢熸垚瀛椾綋澶у皬
                ctx.fillStyle = randomColor(50, 160); //闅忔満鐢熸垚瀛椾綋棰滆壊
                ctx.shadowOffsetX = randomNum(-3, 3);
                ctx.shadowOffsetY = randomNum(-3, 3);
                ctx.shadowBlur = randomNum(-3, 3);
                ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
                var x = this.options.width / 5 * i;
                var y = this.options.height / 2;
                var deg = randomNum(-30, 30);
                /**璁剧疆鏃嬭浆瑙掑害鍜屽潗鏍囧師鐐�**/
                ctx.translate(x, y);
                ctx.rotate(deg * Math.PI / 180);
                ctx.fillText(txt, 0, 0);
                /**鎭㈠鏃嬭浆瑙掑害鍜屽潗鏍囧師鐐�**/
                ctx.rotate(-deg * Math.PI / 180);
                ctx.translate(-x, -y);
            }
            /**缁樺埗骞叉壈绾�**/
            for(var i = 0; i < 4; i++) {
                ctx.strokeStyle = randomColor(40, 180);
                ctx.beginPath();
                ctx.moveTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
                ctx.lineTo(randomNum(0, this.options.width), randomNum(0, this.options.height));
                ctx.stroke();
            }
            /**缁樺埗骞叉壈鐐�**/
            for(var i = 0; i < this.options.width/4; i++) {
                ctx.fillStyle = randomColor(0, 255);
                ctx.beginPath();
                ctx.arc(randomNum(0, this.options.width), randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
                ctx.fill();
            }
        },

        /**楠岃瘉楠岃瘉鐮�**/
        validate: function(code){
            var code = code.toLowerCase();
            var v_code = this.options.code.toLowerCase();
            console.log(v_code);
            if(code == v_code){
                return true;
            }else{
                this.refresh();
                return false;
            }
        }
    }
    /**鐢熸垚瀛楁瘝鏁扮粍**/
    function getAllLetter() {
        var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
        return letterStr.split(",");
    }
    /**鐢熸垚涓€涓殢鏈烘暟**/
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    /**鐢熸垚涓€涓殢鏈鸿壊**/
    function randomColor(min, max) {
        var r = randomNum(min, max);
        var g = randomNum(min, max);
        var b = randomNum(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    window.GVerify = GVerify;
})(window, document);