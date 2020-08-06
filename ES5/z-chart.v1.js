"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var lineChart =
/*#__PURE__*/
function () {
  function lineChart(id, _ref) {
    var _ref$title = _ref.title,
        title = _ref$title === void 0 ? "" : _ref$title,
        _ref$series = _ref.series,
        series = _ref$series === void 0 ? [] : _ref$series,
        _ref$xAxis = _ref.xAxis,
        xAxis = _ref$xAxis === void 0 ? {
      data: []
    } : _ref$xAxis;

    _classCallCheck(this, lineChart);

    this.colors = ["#FD7A4F", "#FDD764", "#7359C3", "#42C288", "#92E98E", "#2E8AE6", "#44C0EA", "#3C52C9", "#4Dd62196"];
    var box = document.getElementById(id);
    box.innerHTML = "";
    this.c = document.createElement("canvas");
    this.width = box.clientWidth * 4;
    this.height = box.clientHeight ? box.clientHeight * 4 : this.width * 0.6;
    this.c.width = this.width;
    this.c.height = this.height;
    this.c.style.width = this.width / 4 + 'px';
    this.c.style.height = this.height / 4 + 'px';
    this.context = this.c.getContext("2d");
    this.context.width = this.size;
    this.title = title;
    this.series = series;
    this.xAxis = xAxis;
    this.xAxisPoint = [];
    this.left = this.width * 0.12;
    this.right = this.width * 0.95;
    this.top = this.height * 0.1;
    this.lineTop = this.height * 0.2;
    this.bottom = this.height * 0.8;
    this.lineBottom = this.height * 0.7;
    this.everyWidth = 0; //x轴每个标记所占的宽度

    this.everyHeight = 0; //每个数值所占的高度

    this.setXaxisPoint(xAxis.data);
    this.drawLine();
    box.appendChild(this.c);
  }

  _createClass(lineChart, [{
    key: "setXaxisPoint",
    value: function setXaxisPoint(xAxis) {
      var everyWidth = this.width * (0.95 - 0.1) / xAxis.length;
      this.everyWidth = everyWidth;

      for (var i = 0; i < xAxis.length; i++) {
        this.xAxisPoint.push(this.left + (i + 0.5) * everyWidth);
      }
    }
  }, {
    key: "drawLine",
    value: function drawLine() {
      var _this = this;

      // 标题
      this.context.font = (this.width * 0.04 > 80 ? 80 : this.width * 0.04) + "px Helvetica";
      this.context.textAlign = "center";
      this.context.fillText(this.title, this.width / 2, this.height * 0.08, this.width);
      this.context.fillStyle = '#333';
      this.context.strokeStyle = '#666';
      this.context.lineWidth = 1;
      this.context.beginPath();
      this.context.moveTo(this.left, this.top);
      this.context.lineTo(this.left, this.bottom);
      this.context.lineTo(this.right, this.bottom);
      this.context.stroke();
      this.context.font = (this.width * 0.02 > 60 ? 60 : this.width * 0.02) + "px Helvetica";
      this.context.fillStyle = "#999";
      this.context.textAlign = 'center';
      this.context.textBaseline = 'top'; // 横坐标标记

      this.xAxis.data.map(function (item, i) {
        var x = _this.xAxisPoint[i];

        _this.context.fillText(item, x, _this.bottom + _this.height * 0.04, _this.everyWidth);
      }); // 计算纵坐标

      var allData = [];
      this.series.map(function (item, i) {
        allData = [].concat(_toConsumableArray(allData), _toConsumableArray(item.data));
      });
      var min = Math.min.apply(Math, _toConsumableArray(allData));
      var max = Math.max.apply(Math, _toConsumableArray(allData));
      this.everyHeight = (this.lineBottom - this.lineTop) / (max - min);
      var stepNum = (max - min) / 5;
      var stepHeight = (this.lineBottom - this.lineTop) / 4;
      this.context.textAlign = 'right';
      this.context.textBaseline = 'middle'; // 纵坐标标记

      for (var i = 0; i < 5; i++) {
        var _this$context;

        var positon = [this.left - this.width * 0.02, this.lineBottom - stepHeight * i];
        this.context.beginPath();

        (_this$context = this.context).fillText.apply(_this$context, [min + stepNum * i].concat(positon, [this.left]));
      } // 折线图


      this.series.map(function (item, i) {
        _this.context.strokeStyle = _this.colors[i];
        _this.context.fillStyle = _this.colors[i];
        _this.context.textAlign = "center";
        _this.context.lineWidth = _this.width * 0.002;
        _this.context.lineJoin = "round";

        _this.context.beginPath();

        var datas = item.data;
        var yAxis = [];

        for (var n = 0; n < datas.length; n++) {
          var y = _this.lineBottom - (datas[n] - min) * _this.everyHeight;
          yAxis.push(y);

          if (n == 0) {
            _this.context.moveTo(_this.xAxisPoint[n], y);
          } else {
            _this.context.lineTo(_this.xAxisPoint[n], y);
          }

          if (item.tag != null) {
            _this.context.fillText(datas[n] + item.tag, _this.xAxisPoint[n], y - _this.height * 0.04);
          }
        }

        _this.context.stroke();

        if (item.type == "area") {
          _this.context.beginPath();

          _this.context.fillStyle = _this.colors[i];
          _this.context.globalAlpha = 0.1;

          _this.context.moveTo(_this.xAxisPoint[_this.xAxisPoint.length - 1], _this.bottom);

          _this.context.lineTo(_this.xAxisPoint[0], _this.bottom);

          for (var _n = 0; _n < datas.length; _n++) {
            _this.context.lineTo(_this.xAxisPoint[_n], yAxis[_n]);
          }

          _this.context.fill();
        }

        _this.context.globalAlpha = 1;
        _this.context.fillStyle = "#fff";

        for (var _n2 = 0; _n2 < datas.length; _n2++) {
          _this.context.beginPath();

          _this.context.lineWidth = _this.width * 0.004;

          _this.context.arc(_this.xAxisPoint[_n2], yAxis[_n2], _this.width * 0.004, 0, Math.PI * 2);

          _this.context.stroke();

          _this.context.fill();
        }
      }); //计算标注起始位置

      this.context.font = (this.width * 0.02 > 60 ? 60 : this.width * 0.02) + "px Helvetica";
      var textWidth = 0;
      var textStartXaxis = this.width * 0.05;
      this.series.map(function (item, i) {
        var text = _this.xAxis.data[i];
        textWidth += _this.context.measureText(text).width + _this.width * 0.08;
      });

      if (textWidth < this.width * 0.9) {
        textStartXaxis = (this.width - textWidth) / 2;
      } else {
        textStartXaxis = this.width * 0.05;
      } //画出标注


      this.series.map(function (item, i) {
        var text = item.name;
        _this.context.strokeStyle = _this.colors[i];
        _this.context.fillStyle = "#fff"; // 线

        _this.context.beginPath();

        _this.context.moveTo(textStartXaxis - _this.width * 0.015, _this.height * 0.95);

        _this.context.lineTo(textStartXaxis + _this.width * 0.015, _this.height * 0.95);

        _this.context.stroke(); // 圆圈


        _this.context.beginPath();

        _this.context.lineWidth = _this.width * 0.004;

        _this.context.arc(textStartXaxis, _this.height * 0.95, _this.width * 0.004, 0, Math.PI * 2);

        _this.context.stroke();

        _this.context.fill(); //name


        _this.context.beginPath();

        _this.context.fillStyle = "#999";
        _this.context.textAlign = "left";
        _this.context.textBaseline = 'middle';

        _this.context.fillText(text, textStartXaxis + _this.width * 0.03, _this.height * 0.95, _this.width * 0.6);

        _this.context.fill();

        textStartXaxis += _this.context.measureText(text).width + _this.width * 0.08;
      });
    }
  }]);

  return lineChart;
}();

var barChart =
/*#__PURE__*/
function () {
  function barChart(id, _ref2) {
    var _ref2$title = _ref2.title,
        title = _ref2$title === void 0 ? "" : _ref2$title,
        _ref2$type = _ref2.type,
        type = _ref2$type === void 0 ? "vertical" : _ref2$type,
        _ref2$series = _ref2.series,
        series = _ref2$series === void 0 ? [] : _ref2$series,
        _ref2$xAxis = _ref2.xAxis,
        xAxis = _ref2$xAxis === void 0 ? {
      data: []
    } : _ref2$xAxis;

    _classCallCheck(this, barChart);

    this.colors = ["#FD7A4F", "#FDD764", "#7359C3", "#42C288", "#92E98E", "#2E8AE6", "#44C0EA", "#3C52C9", "#4Dd62196"];
    var box = document.getElementById(id);
    box.innerHTML = "";
    this.c = document.createElement("canvas");
    this.width = box.clientWidth * 4;
    this.height = box.clientHeight ? box.clientHeight * 4 : this.width * 0.6;
    this.c.width = this.width;
    this.c.height = this.height;
    this.c.style.width = this.width / 4 + 'px';
    this.c.style.height = this.height / 4 + 'px';
    this.context = this.c.getContext("2d");
    this.context.width = this.size;
    this.title = title;
    this.type = type.toLowerCase();
    this.series = series;
    this.xAxis = xAxis;
    this.xAxisPoint = [];
    this.yAxisPoint = [];
    this.left = this.width * 0.12;
    this.lineLeft = this.width * 0.22;
    this.right = this.width * 0.95;
    this.lineRight = this.width * 0.85;
    this.top = this.height * 0.1;
    this.lineTop = this.height * 0.2;
    this.bottom = this.height * 0.8;
    this.lineBottom = this.height * 0.7;
    this.everyWidth = 0; //x轴每个标记所占的宽度;水平柱状图时与everyHeight表意互换

    this.everyHeight = 0; //每个数值所占的高度

    this.draw(xAxis.data);
    box.appendChild(this.c);
  }

  _createClass(barChart, [{
    key: "draw",
    value: function draw(xAxis) {
      var _this2 = this;

      // 标题
      this.context.font = (this.width * 0.04 > 80 ? 80 : this.width * 0.04) + "px Helvetica";
      this.context.textAlign = "center";
      this.context.fillText(this.title, this.width / 2, this.height * 0.08, this.width);
      this.context.fillStyle = '#333';
      this.context.strokeStyle = '#666';
      this.context.lineWidth = 1;
      this.context.beginPath();
      this.context.moveTo(this.left, this.top);
      this.context.lineTo(this.left, this.bottom);
      this.context.lineTo(this.right, this.bottom);
      this.context.stroke(); //画出标注
      //计算标注起始位置

      this.context.font = (this.width * 0.02 > 60 ? 60 : this.width * 0.02) + "px Helvetica";
      var textWidth = 0;
      var textStartXaxis = this.width * 0.05;
      this.series.map(function (item, i) {
        var text = _this2.xAxis.data[i];
        textWidth += _this2.context.measureText(text).width + _this2.width * 0.08;
      });

      if (textWidth < this.width * 0.9) {
        textStartXaxis = (this.width - textWidth) / 2;
      } else {
        textStartXaxis = this.width * 0.05;
      }

      this.series.map(function (item, i) {
        var text = item.name;
        _this2.context.strokeStyle = _this2.colors[i];
        _this2.context.fillStyle = _this2.colors[i];

        _this2.context.beginPath(); //矩形


        _this2.context.rect(textStartXaxis, _this2.height * 0.95 - _this2.height * 0.01, _this2.width * 0.02, _this2.height * 0.02);

        _this2.context.fill(); //name


        _this2.context.beginPath();

        _this2.context.fillStyle = "#999";
        _this2.context.textAlign = "left";
        _this2.context.textBaseline = 'middle';

        _this2.context.fillText(text, textStartXaxis + _this2.width * 0.03, _this2.height * 0.95, _this2.width * 0.6);

        _this2.context.fill();

        textStartXaxis += _this2.context.measureText(text).width + _this2.width * 0.08;
      });

      if (this.type == "vertical") {
        this.drawVerticalBar();
      } else {
        this.drawHorizonBar();
      }
    }
  }, {
    key: "drawHorizonBar",
    value: function drawHorizonBar() {
      var _this3 = this;

      this.xAxis.data.map(function (item, i) {
        var everyHeight = (_this3.bottom - _this3.top) / _this3.xAxis.data.length;
        _this3.everyHeight = everyHeight;
        _this3.yAxisPoint = [];

        for (var _i = 0; _i < _this3.xAxis.data.length; _i++) {
          _this3.yAxisPoint.push(_this3.top + (_i + 0.5) * everyHeight);
        }
      }); //纵坐标标记

      this.xAxis.data.map(function (item, i) {
        var y = _this3.yAxisPoint[i];
        _this3.context.textAlign = "right";
        _this3.context.textAlign = "middle";

        _this3.context.fillText(item, _this3.left - _this3.width * 0.02, y, _this3.left - _this3.width * 0.02);
      }); //计算横坐标

      var allData = [];
      this.series.map(function (item, i) {
        allData = [].concat(_toConsumableArray(allData), _toConsumableArray(item.data));
      });
      var min = Math.min.apply(Math, _toConsumableArray(allData));
      var max = Math.max.apply(Math, _toConsumableArray(allData));
      this.everyWidth = (this.lineRight - this.lineLeft) / (max - min);
      var stepNum = (max - min) / 5;
      var stepWidth = (this.lineRight - this.lineLeft) / 4;
      this.context.textAlign = 'center'; // 横坐标标记

      for (var i = 0; i < 5; i++) {
        var _this$context2;

        var positon = [this.left + stepWidth * (i + 0.5), this.bottom + this.height * 0.04];
        this.context.beginPath();

        (_this$context2 = this.context).fillText.apply(_this$context2, [min + stepNum * i].concat(positon, [this.left]));
      } // 柱状图


      var barHeight = this.everyHeight * 0.8 / this.series.length;
      this.series.map(function (item, i) {
        var datas = item.data;
        _this3.context.fillStyle = _this3.colors[i];

        for (var n = 0; n < datas.length; n++) {
          var barWidth = (datas[n] - min) * _this3.everyWidth + stepWidth * 0.5;
          var x = _this3.left;
          var y = _this3.left + _this3.everyHeight * (n + 0.1 - 1) + barHeight * i;

          _this3.context.beginPath();

          _this3.context.rect(x, y, barWidth, barHeight);

          _this3.context.fill();
        }
      });
    }
  }, {
    key: "drawVerticalBar",
    value: function drawVerticalBar() {
      var _this4 = this;

      var everyWidth = this.width * (0.95 - 0.1) / this.xAxis.data.length;
      this.everyWidth = everyWidth;
      this.xAxisPoint = [];

      for (var i = 0; i < this.xAxis.data.length; i++) {
        this.xAxisPoint.push(this.left + (i + 0.5) * everyWidth);
      } // 横坐标标记


      this.xAxis.data.map(function (item, i) {
        var x = _this4.xAxisPoint[i];

        _this4.context.fillText(item, x, _this4.bottom + _this4.height * 0.05, _this4.everyWidth);
      }); // 计算纵坐标

      var allData = [];
      this.series.map(function (item, i) {
        allData = [].concat(_toConsumableArray(allData), _toConsumableArray(item.data));
      });
      var min = Math.min.apply(Math, _toConsumableArray(allData));
      var max = Math.max.apply(Math, _toConsumableArray(allData));
      this.everyHeight = (this.lineBottom - this.lineTop) / (max - min);
      var stepNum = (max - min) / 5;
      var stepHeight = (this.lineBottom - this.lineTop) / 4;
      this.context.textAlign = 'right'; // 纵坐标标记

      for (var _i2 = 0; _i2 < 5; _i2++) {
        var _this$context3;

        var positon = [this.left - this.width * 0.02, this.lineBottom - stepHeight * _i2];
        this.context.beginPath();

        (_this$context3 = this.context).fillText.apply(_this$context3, [min + stepNum * _i2].concat(positon, [this.left]));
      } // 柱状图


      var barWidth = this.everyWidth * 0.8 / this.series.length;
      this.series.map(function (item, i) {
        var datas = item.data;
        _this4.context.fillStyle = _this4.colors[i];

        for (var n = 0; n < datas.length; n++) {
          var x = _this4.left + _this4.everyWidth * 0.1 + _this4.everyWidth * n + barWidth * i;
          var h = (datas[n] - min) * _this4.everyHeight + (_this4.bottom - _this4.lineBottom);
          var y = _this4.bottom - h;

          _this4.context.beginPath();

          _this4.context.rect(x, y, barWidth, h);

          _this4.context.fill();
        }
      });
    }
  }]);

  return barChart;
}();

var pieChart =
/*#__PURE__*/
function () {
  function pieChart(id, _ref3) {
    var _this5 = this;

    var data = _ref3.data,
        title = _ref3.title,
        _ref3$type = _ref3.type,
        type = _ref3$type === void 0 ? "circle" : _ref3$type,
        defalutIndex = _ref3.defalutIndex,
        callback = _ref3.callback;

    _classCallCheck(this, pieChart);

    this.colors = ["#FD7A4F", "#FDD764", "#7359C3", "#42C288", "#92E98E", "#2E8AE6", "#44C0EA", "#3C52C9", "#4Dd62196"];
    var box = document.getElementById(id);
    box.innerHTML = "";
    this.c = document.createElement("canvas");
    this.width = box.clientWidth * 4;
    this.height = box.clientHeight ? box.clientHeight * 4 : this.width * 0.8;
    this.size = Math.min(this.width * 0.8, this.height * 0.8);
    this.c.style.width = this.width / 4 + "px";
    this.c.style.height = this.height / 4 + "px";
    this.c.width = this.width;
    this.c.height = this.height;
    this.context = this.c.getContext("2d");
    this.defalutIndex = defalutIndex;
    var allNum = 0;
    data.map(function (item) {
      allNum += item.num;
    });
    var chartDatas = data.map(function (item, i) {
      return _objectSpread({
        color: _this5.colors[i]
      }, item, {
        percent: item.num / allNum
      });
    });
    this.chartDatas = chartDatas;
    this.title = title;
    this.type = type.toLowerCase();
    this.textWidth = 0;
    this.tagH = 0;
    this.tagW = 0;
    this.lineWidth = this.type == "circle" ? this.size / 5 : this.size / 2.4;
    this.startAngle = -0.5;
    this.callback = callback;
    this.c.addEventListener('click', this.mouseDownEvent.bind(this));
    this.AngleList = [];
    this.setTitle();
    this.draw();
    box.appendChild(this.c);
  }

  _createClass(pieChart, [{
    key: "setTitle",
    value: function setTitle() {
      this.context.font = (this.width * 0.04 > 80 ? 80 : this.width * 0.04) + "px Helvetica";
      this.context.textAlign = "center";
      this.context.fillText(this.title, this.width / 2, this.height * 0.08, this.width);
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this6 = this;

      this.context.clearRect(0, this.height * 0.1, this.width, this.height * 0.9); // 标题

      if (this.chartDatas.length == 0) return;
      this.context.lineWidth = this.lineWidth;
      var startAngle = Math.PI * -0.5;
      var endAngle = startAngle;
      this.AngleList = []; // 画饼图

      var tagW = this.size * 0.06 > 90 ? 90 : this.size * 0.06;
      this.tagW = tagW;
      var tagH = this.size * 0.04 > 60 ? 60 : this.size * 0.04;
      this.tagH = tagH;
      this.chartDatas.map(function (item, i) {
        // 画标注
        var textW = _this6.context.measureText(item.title).width;

        if (textW > _this6.textWidth) {
          _this6.textWidth = textW;
        }

        _this6.context.beginPath();

        _this6.context.strokeStyle = item.color;
        _this6.context.fillStyle = item.color;

        _this6.context.rect(_this6.width * 0.05, _this6.height * 0.2 + tagH * i * 2.5, tagW, tagH);

        _this6.context.fill();

        _this6.context.fillStyle = "#666";
        _this6.context.font = (_this6.size * 0.06 > 50 ? 50 : _this6.size * 0.06) + "px Helvetica";
        _this6.context.textAlign = "left";
        _this6.context.textBaseline = 'middle';

        _this6.context.fillText("".concat(item.title), _this6.width * 0.06 + tagW, _this6.height * 0.2 + tagH * i * 2.5 + tagH * 0.5); // 画饼图


        _this6.context.beginPath();

        _this6.context.lineWidth = _this6.lineWidth;

        if (i > 0) {
          startAngle = endAngle;
        }

        endAngle = startAngle + item.percent * Math.PI * 2;

        _this6.AngleList.push(endAngle); //选中当前项，需要向外偏移


        if (i == _this6.defalutIndex) {
          //选中当前项，需要向外偏移
          var centerAngle = (startAngle + endAngle) / 2;
          var x = _this6.lineWidth * 0.2 * Math.cos(centerAngle);
          var y = _this6.lineWidth * 0.2 * Math.sin(centerAngle);

          _this6.context.arc(_this6.width * 0.6 + x, _this6.height * 0.6 + y, _this6.size / 2 - _this6.lineWidth / 2 - _this6.lineWidth * 0.2, startAngle, endAngle);
        } else {
          _this6.context.arc(_this6.width * 0.6, _this6.height * 0.6, _this6.size / 2 - _this6.lineWidth / 2 - _this6.lineWidth * 0.2, startAngle, endAngle);
        }

        _this6.context.stroke(); // if(this.type=="pie"){


        _this6.context.beginPath();

        _this6.context.fillStyle = "#fff";
        _this6.context.strokeStyle = "#fff";
        _this6.context.lineWidth = _this6.size * 0.15;
        _this6.context.lineJoin = "round";
        _this6.context.globalAlpha = 0.15;

        _this6.context.rect(_this6.width * 0.51, _this6.height * 0.53, _this6.size * 0.27, _this6.size * 0.14); // this.context.fill();


        _this6.context.stroke();

        _this6.context.globalAlpha = 1; // }
        // 百分比

        _this6.context.beginPath();

        _this6.context.fillStyle = '#333';
        _this6.context.font = _this6.size * 0.12 + "px Helvetica";
        _this6.context.textAlign = "center";
        _this6.context.textBaseline = 'bottom';
        var percent = Number(_this6.chartDatas[_this6.defalutIndex].percent * 100).toFixed(2) + "%";

        _this6.context.fillText(percent, _this6.width * 0.6, _this6.height * 0.6);

        _this6.context.fill(); //name


        _this6.context.beginPath();

        _this6.context.font = _this6.size * 0.06 + "px bold Helvetica";
        _this6.context.fillStyle = '#666';
        _this6.context.textBaseline = 'top';

        _this6.context.fillText("".concat(_this6.chartDatas[_this6.defalutIndex].title, " / ").concat(_this6.chartDatas[_this6.defalutIndex].num), _this6.width * 0.6, _this6.height * 0.62);
      });
    }
  }, {
    key: "mouseDownEvent",
    value: function mouseDownEvent(e) {
      var _ref4 = [e.offsetX, e.offsetY],
          x1 = _ref4[0],
          y1 = _ref4[1];
      var x0 = this.width * 0.6 / 4,
          y0 = this.height * 0.6 / 4;
      var angle = 0;

      if (x1 > (this.width * 0.6 - this.size / 2) / 4 && x1 < (this.width * 0.6 + this.size / 2) / 4 && y1 > (this.height * 0.6 - this.size / 2) / 4 && y1 < (this.height * 0.6 + this.size / 2) / 4) {
        if (x1 > x0) {
          y1 < y0 ? angle = -0.5 * Math.PI + Math.atan((x1 - x0) / (y0 - y1)) : angle = Math.atan((y1 - y0) / (x1 - x0));
        } else {
          y1 < y0 ? angle = Math.PI + Math.atan((y0 - y1) / (x0 - x1)) : angle = Math.atan((x0 - x1) / (y1 - y0)) + Math.PI * 0.5;
        }

        for (var i = 0; i < this.AngleList.length; i++) {
          if (angle < this.AngleList[i]) {
            this.defalutIndex = i;
            this.draw();
            this.callback ? this.callback(i) : '';
            break;
          }
        }
      }

      if (x1 > this.width * 0.05 / 4 && x1 < (this.textWidth + this.tagW + this.width * 0.06) / 4) {
        var _i3 = Math.floor((y1 * 4 - this.height * 0.2) / this.tagH / 2.5);

        if (_i3 >= 0 && _i3 < this.chartDatas.length) {
          this.defalutIndex = _i3;
          this.draw();
          this.callback ? this.callback(_i3) : '';
        }
      }
    }
  }]);

  return pieChart;
}();

var radarChart =
/*#__PURE__*/
function () {
  function radarChart(id, _ref5) {
    var _this7 = this;

    var data = _ref5.data,
        title = _ref5.title,
        axis = _ref5.axis,
        _ref5$defalutIndex = _ref5.defalutIndex,
        defalutIndex = _ref5$defalutIndex === void 0 ? 0 : _ref5$defalutIndex,
        callback = _ref5.callback;

    _classCallCheck(this, radarChart);

    this.colors = ["#FD7A4F", "#FDD764", "#7359C3", "#42C288", "#92E98E", "#2E8AE6", "#44C0EA", "#3C52C9", "#4Dd62196"];
    var box = document.getElementById(id);
    box.innerHTML = "";
    this.c = document.createElement("canvas");
    this.width = box.clientWidth * 4;
    this.height = box.clientHeight ? box.clientHeight * 4 : this.width * 0.8;
    this.size = Math.min(this.width * 0.8, this.height * 0.8);
    this.tagW = this.size * 0.06 > 90 ? 90 : this.size * 0.06;
    this.tagH = this.size * 0.04 > 60 ? 60 : this.size * 0.04;
    this.lineLength = this.size * 0.45;
    this.dataLineLength = this.lineLength * 1;
    var _ref6 = [this.width * 0.6, this.height * 0.55];
    this.x0 = _ref6[0];
    this.y0 = _ref6[1];
    this.c.style.width = this.width / 4 + "px";
    this.c.style.height = this.height / 4 + "px";
    this.c.width = this.width;
    this.c.height = this.height;
    this.context = this.c.getContext("2d");
    this.textWidth = 0;
    this.defalutIndex = defalutIndex;
    this.axis = axis;
    this.startAngle = -0.5;
    this.angleList = [];
    this.angleList = axis.map(function (item, i) {
      return _this7.startAngle + i * Math.PI * 2 / axis.length;
    });
    var datas = [];
    data.map(function (item, i) {
      item["color"] = _this7.colors[i];
      datas = [].concat(_toConsumableArray(datas), _toConsumableArray(item.num));
    });
    data.unshift({
      color: "#000",
      name: "全部",
      num: []
    });
    this.max = Math.max.apply(Math, _toConsumableArray(datas));
    this.min = Math.min.apply(Math, _toConsumableArray(datas));

    if (this.min != 0) {
      this.min = (this.max - this.min) / this.max * this.min;
    }

    this.everyDataLineLength = this.dataLineLength / (this.max - this.min);
    this.chartDatas = data;
    this.title = title;
    this.callback = callback;
    this.c.addEventListener('click', this.mouseDownEvent.bind(this));
    this.setTitle();
    this.draw();
    box.appendChild(this.c);
  }

  _createClass(radarChart, [{
    key: "setTitle",
    value: function setTitle() {
      this.context.font = (this.width * 0.04 > 80 ? 80 : this.width * 0.04) + "px Helvetica";
      this.context.textAlign = "center";
      this.context.fillText(this.title, this.width / 2, this.height * 0.08, this.width);
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this8 = this;

      this.context.clearRect(0, this.height * 0.1, this.width, this.height * 0.9);
      this.drawBg();
      this.chartDatas.map(function (hero, i) {
        // 标注
        var textW = _this8.context.measureText(hero.name).width;

        if (textW > _this8.textWidth) {
          _this8.textWidth = textW;
        }

        _this8.context.beginPath();

        _this8.context.strokeStyle = hero.color;
        _this8.context.fillStyle = hero.color;

        _this8.context.rect(_this8.width * 0.05, _this8.height * 0.2 + _this8.tagH * i * 2.5, _this8.tagW, _this8.tagH);

        _this8.context.fill(); // name 标注名


        _this8.context.fillStyle = "#666";
        _this8.context.font = (_this8.size * 0.06 > 50 ? 50 : _this8.size * 0.06) + "px Helvetica";
        _this8.context.textAlign = "left";
        _this8.context.textBaseline = 'middle';

        _this8.context.fillText("".concat(hero.name), _this8.width * 0.06 + _this8.tagW, _this8.height * 0.2 + _this8.tagH * i * 2.5 + _this8.tagH * 0.5);
      });

      if (this.defalutIndex == 0) {
        this.chartDatas.map(function (hero, i) {
          _this8.drawHero(hero, i);
        });
      } else if (this.defalutIndex > 0) {
        this.drawHero(this.chartDatas[this.defalutIndex], this.defalutIndex);
      }
    }
  }, {
    key: "drawHero",
    value: function drawHero(hero, i) {
      var _this9 = this;

      // 范围
      this.context.beginPath();
      this.context.fillStyle = hero.color;
      this.context.strokeStyle = hero.color;
      this.context.lineWidth = this.lineLength * 0.003;
      hero.num.map(function (num, i) {
        var lineLenth = _this9.everyDataLineLength * (num - _this9.min);

        var _this9$getAnglePoint = _this9.getAnglePoint(_this9.angleList[i], lineLenth),
            x = _this9$getAnglePoint.x,
            y = _this9$getAnglePoint.y;

        if (i == 0) {
          _this9.context.moveTo(x, y);
        } else {
          _this9.context.lineTo(x, y);
        }
      });
      this.context.closePath();
      this.context.stroke();
      this.context.globalAlpha = 0.1;
      this.context.fill();
      this.context.globalAlpha = 1;
    }
  }, {
    key: "drawBg",
    value: function drawBg() {
      var _this10 = this;

      var _ref7 = [this.x0, this.y0],
          x0 = _ref7[0],
          y0 = _ref7[1];
      var pointList = [];
      var points = [];
      var stepLength = this.lineLength / 5;
      this.context.beginPath();
      this.context.globalAlpha = 1;
      this.context.strokeStyle = "#aaa";

      var _loop = function _loop(i) {
        var currentlineLength = stepLength * i;
        points = [];

        _this10.context.beginPath();

        _this10.angleList.map(function (angle, j) {
          var _this10$getAnglePoint = _this10.getAnglePoint(angle, currentlineLength),
              x = _this10$getAnglePoint.x,
              y = _this10$getAnglePoint.y;

          points.push({
            x: x,
            y: y
          });

          if (j == 0) {
            _this10.context.moveTo(x, y);
          } else {
            _this10.context.lineTo(x, y);
          }
        });

        pointList.push(points);

        _this10.context.closePath();

        _this10.context.stroke();
      };

      for (var i = 5; i > 0; i--) {
        _loop(i);
      }

      pointList[0].map(function (point, i) {
        var _ref8 = [_this10.x0, _this10.y0],
            x0 = _ref8[0],
            y0 = _ref8[1];
        var _ref9 = [point.x, point.y],
            x = _ref9[0],
            y = _ref9[1];

        _this10.context.beginPath();

        _this10.context.moveTo(x0, y0);

        _this10.context.lineTo(x, y);

        _this10.context.stroke();

        _this10.context.textBaseline = "middle";
        _this10.context.fillStyle = "#999";
        var textX = x,
            textY = y;

        _this10.context.beginPath();

        _this10.context.font = (_this10.lineLength * 0.06 > 50 ? 50 : _this10.lineLength * 0.06) + "px Helvetica";

        if (Math.abs(x - x0) < _this10.lineLength * 0.05) {
          _this10.context.textAlign = "center";

          if (y > y0) {
            textY = y + _this10.lineLength * 0.06;
          } else {
            textY = y - _this10.lineLength * 0.06;
          }
        } else if (x > x0) {
          _this10.context.textAlign = "left";
          textX = x + _this10.lineLength * 0.04;
        } else if (x < x0) {
          _this10.context.textAlign = "right";
          textX = x - _this10.lineLength * 0.04;
        }

        _this10.context.fillText(_this10.axis[i], textX, textY);
      });
    }
  }, {
    key: "getAnglePoint",
    value: function getAnglePoint(angle, lineLength) {
      var _x$y = {
        x: this.x0 + Math.cos(angle) * lineLength,
        y: this.y0 + Math.sin(angle) * lineLength
      },
          x = _x$y.x,
          y = _x$y.y;
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "mouseDownEvent",
    value: function mouseDownEvent(e) {
      var _ref10 = [e.offsetX, e.offsetY],
          x1 = _ref10[0],
          y1 = _ref10[1];

      if (x1 > this.width * 0.05 / 4 && x1 < (this.textWidth + this.tagW + this.width * 0.06) / 4) {
        var i = Math.floor((y1 * 4 - this.height * 0.2) / this.tagH / 2.5);

        if (i >= 0 && i < this.chartDatas.length) {
          this.defalutIndex = i;
          this.draw();
          this.callback ? this.callback(i - 1) : '';
        }
      }
    }
  }]);

  return radarChart;
}();

var scatterChart =
/*#__PURE__*/
function () {
  function scatterChart(id, _ref11) {
    var title = _ref11.title,
        _ref11$xTag = _ref11.xTag,
        xTag = _ref11$xTag === void 0 ? "" : _ref11$xTag,
        _ref11$xTagNum = _ref11.xTagNum,
        xTagNum = _ref11$xTagNum === void 0 ? 5 : _ref11$xTagNum,
        _ref11$yTag = _ref11.yTag,
        yTag = _ref11$yTag === void 0 ? "" : _ref11$yTag,
        _ref11$yTagNum = _ref11.yTagNum,
        yTagNum = _ref11$yTagNum === void 0 ? 5 : _ref11$yTagNum,
        symbolSize = _ref11.symbolSize,
        series = _ref11.series,
        _ref11$type = _ref11.type,
        type = _ref11$type === void 0 ? "scatter" : _ref11$type;

    _classCallCheck(this, scatterChart);

    this.colors = ["#FD7A4F", "#FDD764", "#7359C3", "#42C288", "#92E98E", "#2E8AE6", "#44C0EA", "#3C52C9", "#4Dd62196"];
    var box = document.getElementById(id);
    box.innerHTML = "";
    this.c = document.createElement("canvas");
    this.width = box.clientWidth * 4;
    this.height = box.clientHeight ? box.clientHeight * 4 : this.width * 0.6;
    this.c.width = this.width;
    this.c.height = this.height;
    this.c.style.width = this.width / 4 + 'px';
    this.c.style.height = this.height / 4 + 'px';
    this.context = this.c.getContext("2d");
    this.context.width = this.size;
    this.title = title;
    this.type = type;
    this.series = series;
    this.xTag = xTag;
    this.yTag = yTag;
    this.xTagNum = xTagNum;
    this.yTagNum = yTagNum;
    this.left = this.width * 0.12;
    this.lineLeft = this.width * 0.22;
    this.right = this.width * 0.95;
    this.lineRight = this.width * 0.85;
    this.top = this.height * 0.1;
    this.lineTop = this.height * 0.2;
    this.bottom = this.height * 0.8;
    this.lineBottom = this.height * 0.7;
    this.symbolSize = symbolSize || 0.1;
    this.setTitle();
    this.draw();
    box.appendChild(this.c);
  }

  _createClass(scatterChart, [{
    key: "setTitle",
    value: function setTitle() {
      this.context.font = (this.width * 0.04 > 80 ? 80 : this.width * 0.04) + "px Helvetica";
      this.context.textAlign = "center";
      this.context.fillText(this.title, this.width / 2, this.height * 0.08, this.width);
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this11 = this;

      // 坐标轴
      this.context.fillStyle = '#333';
      this.context.strokeStyle = '#666';
      this.context.lineWidth = 1;
      this.context.beginPath();
      this.context.moveTo(this.left, this.top);
      this.context.lineTo(this.left, this.bottom);
      this.context.lineTo(this.right, this.bottom);
      this.context.stroke(); // 计算恒旭欧标和纵坐标轴标注

      var xDatas = [];
      var yDatas = [];
      this.series.map(function (item) {
        xDatas = [].concat(_toConsumableArray(xDatas), _toConsumableArray(item.data.map(function (tem) {
          return tem.x;
        })));
        yDatas = [].concat(_toConsumableArray(yDatas), _toConsumableArray(item.data.map(function (tem) {
          return tem.y;
        })));
      });
      if (xDatas.length == 0) return;
      var xMin = Math.min.apply(Math, _toConsumableArray(xDatas));
      var xMax = Math.max.apply(Math, _toConsumableArray(xDatas));
      var yMin = Math.min.apply(Math, _toConsumableArray(yDatas));
      var yMax = Math.max.apply(Math, _toConsumableArray(yDatas));
      var everyX = (this.lineRight - this.lineLeft) / (xMax - xMin);
      var everyXWidth = (this.lineRight - this.lineLeft) / (this.xTagNum - 1);
      var everyY = (this.lineBottom - this.lineTop) / (yMax - yMin);
      var everyYHeight = (this.lineBottom - this.lineTop) / (this.yTagNum - 1);
      this.context.fillStyle = "#999";
      this.context.textAlign = 'center';
      this.context.textBaseline = 'top'; // 横坐标标记

      this.context.font = (this.width * 0.02 > 60 ? 60 : this.width * 0.02) + "px Helvetica";
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";

      for (var i = 0; i < 5; i++) {
        var _this$context4;

        var xTagStr = (xMin + (xMax - xMin) / (this.xTagNum - 1) * i).toFixed(0) + this.xTag;
        var position = [this.lineLeft + everyXWidth * i, this.bottom + this.height * 0.05];

        (_this$context4 = this.context).fillText.apply(_this$context4, [xTagStr].concat(position, [everyXWidth]));
      } //纵坐标


      this.context.textAlign = "right";
      this.context.textBaseline = "middle";

      for (var _i4 = 0; _i4 < 5; _i4++) {
        var _this$context5;

        var yTagStr = (yMin + (yMax - yMin) / (this.yTagNum - 1) * _i4).toFixed(0) + this.yTag;
        var positon = [this.left - this.width * 0.02, this.lineBottom - everyYHeight * _i4];

        (_this$context5 = this.context).fillText.apply(_this$context5, [yTagStr].concat(positon, [this.left]));
      } //标注
      //画出标注
      //计算标注起始位置


      this.context.font = (this.width * 0.02 > 60 ? 60 : this.width * 0.02) + "px Helvetica";
      var textWidth = 0;
      var textStartXaxis = this.width * 0.05;
      this.series.map(function (item, i) {
        var text = item.name;
        textWidth += _this11.context.measureText(text).width + _this11.width * 0.08;
      });

      if (textWidth < this.width * 0.9) {
        textStartXaxis = (this.width - textWidth) / 2;
      } else {
        textStartXaxis = this.width * 0.05;
      }

      this.series.map(function (item, i) {
        var text = item.name;
        _this11.context.fillStyle = _this11.colors[i];

        _this11.context.beginPath(); //圆形


        _this11.context.globalAlpha = 0.5;

        _this11.context.arc(textStartXaxis, _this11.height * 0.95, _this11.width * _this11.symbolSize * 0.1, 0, Math.PI * 2);

        _this11.context.fill(); //name


        _this11.context.globalAlpha = 1;

        _this11.context.beginPath();

        _this11.context.fillStyle = "#999";
        _this11.context.textAlign = "left";
        _this11.context.textBaseline = 'middle';

        _this11.context.fillText(text, textStartXaxis + _this11.width * 0.02, _this11.height * 0.95, _this11.width * 0.6);

        _this11.context.fill();

        textStartXaxis += _this11.context.measureText(text).width + _this11.width * 0.08;
      }); //计算散点大小

      var zDatas = [];

      if (this.type == "bubble") {
        this.series.map(function (item) {
          zDatas = [].concat(_toConsumableArray(zDatas), _toConsumableArray(item.data.map(function (tem) {
            return tem.z;
          })));
        });
      } // 为计算气泡大小做准备


      var minZ = Math.min.apply(Math, _toConsumableArray(zDatas));
      var maxZ = Math.max.apply(Math, _toConsumableArray(zDatas));
      var minSymbolSize = this.symbolSize * 0.4;
      var maxSymbolSize = minSymbolSize + this.symbolSize * 3;
      var everySymbolSize = (maxSymbolSize - minSymbolSize) / (maxZ - minZ); // 散点

      this.context.globalAlpha = 0.5;
      this.series.map(function (item, i) {
        _this11.context.fillStyle = _this11.colors[i];
        var datas = item.data;
        datas.map(function (data) {
          var _this11$context;

          var symbolSize = _this11.symbolSize * 0.1;

          if (_this11.type == "bubble") {
            symbolSize = (minSymbolSize + (data.z - minZ) * everySymbolSize) * 0.1;
          }

          _this11.context.beginPath();

          var position = [_this11.lineLeft + (data.x - xMin) * everyX, _this11.lineBottom - (data.y - yMin) * everyY];

          (_this11$context = _this11.context).arc.apply(_this11$context, position.concat([_this11.width * symbolSize, 0, Math.PI * 2]));

          _this11.context.fill();
        });
      });
      this.context.globalAlpha = 1;
    }
  }]);

  return scatterChart;
}();