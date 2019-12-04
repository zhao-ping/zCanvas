"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var lineAnimate =
/*#__PURE__*/
function () {
  function lineAnimate(id, number) {
    var _this = this;

    _classCallCheck(this, lineAnimate);

    this.number = number;
    var box = document.getElementById(id);
    this.size = box.clientWidth * 4;
    this.width = this.size;
    this.height = this.size;
    this.canvas = document.createElement("canvas");
    this.canvas.style.width = this.size / 4;
    this.canvas.style.height = this.size / 4;
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.context = this.canvas.getContext("2d");
    this.number = number;
    this.stars = [];
    this.setStars();
    setInterval(function () {
      _this.drawStars();
    }, 50);
    box.innerHTML = "";
    box.appendChild(this.canvas);
  }

  _createClass(lineAnimate, [{
    key: "drawStars",
    value: function drawStars() {
      var _this2 = this;

      this.context.fillStyle = "rgba(255,255,255,0.1)";
      this.context.fillRect(0, 0, this.width, this.height);
      this.context.fill();
      this.stars.map(function (star) {
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
        var img = star.getDot();
        var x = star.x0 + star.speed * star.time;
        var y = star.y0 + star.speed * star.time * star.slop;

        if (x > _this2.width || y > _this2.height) {
          star.x0 = Math.random() * _this2.canvas.width;
          star.y0 = Math.random() * _this2.canvas.height;
          star.time = 0;
        }

        _this2.context.drawImage(img, x, y, star.size, star.size);

        star.time++;
      });
    }
  }, {
    key: "setStars",
    value: function setStars() {
      for (var i = 0; i < this.number; i++) {
        var star = new dot();
        star.x0 = Math.random() * this.canvas.width;
        star.y0 = Math.random() * this.canvas.height;
        this.stars.push(star);
      }
    }
  }]);

  return lineAnimate;
}();

var dot =
/*#__PURE__*/
function () {
  function dot() {
    _classCallCheck(this, dot);

    this.canvas = document.createElement("canvas");
    this.size = Math.random() * 40 + 20;
    this.canvas.style.width = this.size / 4 + "px";
    this.canvas.style.height = this.size / 4 + "px";
    this.canvas.width = this.size;
    this.canvas.height = this.size;
    this.context = this.canvas.getContext("2d");
    this.alpha = Math.random();
    this.add = Math.random() > 0.5 ? true : false;
    this.context.globalAlpha = this.alpha;
    var grd = this.context.createRadialGradient(this.size / 2, this.size / 2, this.size * 0.1, this.size / 2, this.size / 2, this.size / 2);
    var colorR = Math.random() * 255;
    var colorG = 122;
    grd.addColorStop(0, "rgba(".concat(colorR, ",").concat(colorG, ",233,1)"));
    grd.addColorStop(1, "rgba(".concat(colorR, ",").concat(colorG, ",233,0)"));
    this.context.fillStyle = grd;
    this.context.arc(this.size / 2, this.size / 2, this.size / 2, 0, Math.PI * 2);
    this.context.fill();
    this.speed = Math.random() > 0.5 ? Math.random() * 10 + 4 : -Math.random() * 10 - 4; // this.speed=Math.random()*10+1;

    this.slop = Math.random() > 0.5 ? Math.random() : -Math.random(); // this.slop=1;

    this.x0 = 0;
    this.y0 = 0;
    this.time = 0;
  }

  _createClass(dot, [{
    key: "getDot",
    value: function getDot() {
      return this.canvas;
    }
  }]);

  return dot;
}();