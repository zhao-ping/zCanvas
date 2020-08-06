"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var colors = ["#333", "#FD7A4F", "#FDD764", "#7359C3", "#42C288", "#92E98E", "#2E8AE6", "#44C0EA", "#3C52C9", "#4Dd62196", "#ff679b", "#fa5c7c", "#0acf97", "#02a8b5", "#39afd1", "#727cf5", "#727cf5", "#6b5eae", "#51d69a", "#81a7fe", "#aa67f7", "#cc3fa4", "#ffba49", "#ff6663"];

var chart =
/*#__PURE__*/
function () {
  function chart(id, title) {
    var _this = this;

    _classCallCheck(this, chart);

    this.colors = colors;
    this.scale = 4;
    var box = document.getElementById(id);

    if (!box) {
      alert("您传入的ID不正确");
      return false;
    }

    this.box = box;
    this.canvas = document.createElement("canvas");
    this.title = title;
    this.initData();

    var resizeFun = function resizeFun() {
      _this.initData();

      _this.draw();
    };

    window.addEventListener('resize', resizeFun);
    this.legendRows = [];
    this.box.addEventListener("click", function (e) {
      _this.clickLegendItem(e);
    });
  }

  _createClass(chart, [{
    key: "clickLegendItem",
    value: function clickLegendItem(e) {
      var x = e.offsetX * this.scale,
          y = e.offsetY * this.scale; // 图例高度为10

      var dataCount = 0; //点击了第几条数据的图标

      for (var rowIndex = 0; rowIndex < this.legendRows.length; rowIndex++) {
        var row = this.legendRows[rowIndex];

        if (y < row.y + 5 * this.fontSizeScale && y > row.y - 5 * this.fontSizeScale) {
          for (var itemIndex = 0; itemIndex < row.data.length; itemIndex++) {
            var item = row.data[itemIndex];
            dataCount++;

            if (x > item.startX && x < item.startX + item.width) {
              this.reDraw(dataCount - 1);
              return;
            }
          }

          return;
        }

        dataCount += row.data.length;
      }
    }
  }, {
    key: "reDraw",
    value: function reDraw(dataIndex) {}
  }, {
    key: "initData",
    value: function initData() {
      this.box.innerHTML = "";
      var width = this.box.clientWidth;
      var height = this.box.clientHeight || width * 0.6;
      this.box.appendChild(this.canvas);
      this.width = width * this.scale;
      this.height = height * this.scale;
      this.canvas.style.width = width + "px";
      this.canvas.style.height = height + "px";
      this.context = this.canvas.getContext("2d");
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      var size = width > height ? width : this.height;

      if (size <= 289) {
        this.fontSizeScale = 0.7;
      } else if (size >= 580) {
        this.fontSizeScale = 1.4;
      } else {
        this.fontSizeScale = size / 414;
      }

      this.fontSizeScale = this.fontSizeScale * this.scale;
      this.initSelfData();
    }
  }, {
    key: "initSelfData",
    value: function initSelfData() {}
  }, {
    key: "draw",
    value: function draw() {
      this.drwaTitle();
    }
  }, {
    key: "drwaTitle",
    value: function drwaTitle() {
      this.context.font = "".concat(18 * this.fontSizeScale, "px Helvetica");
      this.context.fillStyle = "#000";
      this.context.textAlign = "center";
      this.context.textBaseline = "top";
      this.context.fillText(this.title, this.width / 2, this.fontSizeScale * 5, this.width);
    }
  }, {
    key: "drawLegend",
    value: function drawLegend(legendRows) {
      var _this2 = this;

      var xIconWidth = 20 * this.fontSizeScale; // 画图例

      legendRows.map(function (row, rowIndex) {
        var startX = row.startX;
        row.data.map(function (item) {
          item.startX = startX; // 图例文字

          _this2.context.beginPath();

          _this2.context.font = "".concat(10 * _this2.fontSizeScale, "px Helvetica");
          _this2.context.textAlign = "left";
          _this2.context.textBaseline = "middle";
          _this2.context.fillStyle = "#333";

          _this2.context.beginPath();

          _this2.context.fillText(item.name, startX + xIconWidth, row.y);

          _this2.context.fill(); // 图例标志


          _this2.context.lineWidth = 1 * _this2.fontSizeScale;
          _this2.context.fillStyle = item.color;

          _this2.context.beginPath();

          _this2.context.fillRect(startX, row.y - 5 * _this2.fontSizeScale, xIconWidth * 0.8, 10 * _this2.fontSizeScale);

          _this2.context.fill();

          startX += item.width;
        });
      });
      this.legendRows = legendRows;
    }
  }]);

  return chart;
}();

var axisChart =
/*#__PURE__*/
function (_chart) {
  _inherits(axisChart, _chart);

  function axisChart(id) {
    var _this3;

    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var series = arguments.length > 2 ? arguments[2] : undefined;
    var xAxis = arguments.length > 3 ? arguments[3] : undefined;
    var yAxis = arguments.length > 4 ? arguments[4] : undefined;
    var type = arguments.length > 5 ? arguments[5] : undefined;

    _classCallCheck(this, axisChart);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(axisChart).call(this, id, title));
    _this3.defalutIndex = 0;
    _this3.type = type;
    _this3.series = series;

    if (_this3.series[0].name != "全部") {
      _this3.series.unshift({
        name: "全部",
        num: []
      });
    }

    _this3.xAxis = xAxis;
    _this3.xAxisPoint = [];
    _this3.yAxis = yAxis;
    _this3.yAxisCount = 5;

    _this3.initSelfData();

    _this3.draw();

    return _this3;
  }

  _createClass(axisChart, [{
    key: "initSelfData",
    value: function initSelfData() {
      this.xAxisPoint = [];
      this.titleHeight = 40 * this.fontSizeScale;
      this.left = this.fontSizeScale * 60;
      this.lineLeft = this.left + 30 * this.fontSizeScale;
      this.right = this.width - this.fontSizeScale * 10;
      this.lineRight = this.right - 30 * this.fontSizeScale;
      this.top = this.titleHeight;
      this.lineTop = this.top + 30 * this.fontSizeScale;
      this.bottom = this.height - 80 * this.fontSizeScale;
      this.lineBottom = this.bottom - 30 * this.fontSizeScale;
      this.stepSize = 0; //单个数值所占的尺寸(高度or宽度)
    }
  }, {
    key: "initLegendData",
    value: function initLegendData() {
      var _this4 = this;

      // 画图例
      // 设置图例样式
      this.context.font = "".concat(10 * this.fontSizeScale, "px Helvetica");
      this.context.textAlign = "left";
      this.context.textBaseline = "middle";
      var xIconWidth = 20 * this.fontSizeScale,
          gapWidth = 10 * this.fontSizeScale; // 计算图例的行数和起始位置

      var legendRows = [];
      var legends = [];
      var legendW = 0;
      this.series.map(function (item, i) {
        var xTagWidth = _this4.context.measureText(item.name).width + gapWidth;
        var itemWidth = xTagWidth + xIconWidth + gapWidth;

        if (legendW + itemWidth > _this4.width) {
          legendRows.push({
            data: legends,
            startX: (_this4.width - legendW) / 2 + gapWidth / 2
          });
          legends = [];
          legendW = 0;
        }

        legendW += itemWidth;
        legends.push({
          name: item.name,
          color: _this4.colors[i],
          width: itemWidth
        });
      });
      legendRows.push({
        data: legends,
        startX: (this.width - legendW) / 2 + gapWidth / 2
      });
      this.bottom = this.height - 20 * this.fontSizeScale * legendRows.length - 40 * this.fontSizeScale;
      this.lineBottom = this.bottom - 30 * this.fontSizeScale;
      legendRows.map(function (row, i) {
        row.y = _this4.bottom + 40 * _this4.fontSizeScale + 20 * _this4.fontSizeScale * i;
      });
      this.drawLegend(legendRows);
    }
  }, {
    key: "drawVerticleAxis",
    value: function drawVerticleAxis() {
      var everyX = (this.right - this.left) / this.xAxis.data.length; // x轴坐标

      for (var i = 0; i < this.xAxis.data.length; i++) {
        var point = {
          x: (i + 0.5) * everyX + this.left,
          y: this.bottom
        };
        this.xAxisPoint.push(point);
        this.context.fillStyle = "#666";
        this.context.font = "".concat(10 * this.fontSizeScale, "px Helvetica");
        this.context.textAlign = "center";
        this.context.textBaseline = "top";
        this.context.fillText(this.xAxis.data[i], point.x, this.bottom + this.fontSizeScale * 10, everyX);
      } // 垂直坐标
      // 计算数据最大值和最小值


      var seriesDatas = [];

      for (var _i = 1; _i < this.series.length; _i++) {
        seriesDatas = seriesDatas.concat(this.series[_i].data);
      }

      this.dataMax = Math.max.apply(Math, _toConsumableArray(seriesDatas));
      this.dataMin = Math.min.apply(Math, _toConsumableArray(seriesDatas));
      var stepYaxisDataCount = (this.dataMax - this.dataMin) / (this.yAxisCount - 1);
      var stepHeight = (this.lineBottom - this.lineTop) / (this.yAxisCount - 1);
      this.stepSize = (this.lineBottom - this.lineTop) / (this.dataMax - this.dataMin); // 画Y轴坐标

      this.context.textAlign = "right";
      this.context.textBaseline = "middle";

      for (var _i2 = 0; _i2 < this.yAxisCount; _i2++) {
        this.context.fillText(Number(this.dataMax - _i2 * stepYaxisDataCount).toFixed(this.yAxis.tofixed) + this.yAxis.tag || "", this.left - 10 * this.fontSizeScale, this.lineTop + stepHeight * _i2);
      }
    }
  }, {
    key: "drawHorisonAxis",
    value: function drawHorisonAxis() {
      var _this5 = this;

      // 画y轴坐标
      this.context.fillStyle = "#666";
      this.context.textAlign = "right";
      this.context.textBaseline = "middle";
      var everyY = (this.bottom - this.top) / this.xAxis.data.length;
      this.xAxis.data.map(function (item, index) {
        _this5.context.fillText(item, _this5.left - 10 * _this5.fontSizeScale, _this5.top + (index + 0.5) * everyY);
      }); // 计算数据最大值和最小值

      var seriesDatas = [];

      for (var i = 1; i < this.series.length; i++) {
        seriesDatas = seriesDatas.concat(this.series[i].data);
      }

      this.dataMax = Math.max.apply(Math, _toConsumableArray(seriesDatas));
      this.dataMin = Math.min.apply(Math, _toConsumableArray(seriesDatas));
      var stepXaxisDataCount = (this.dataMax - this.dataMin) / (this.yAxisCount - 1);
      var stepWidth = (this.lineRight - this.lineLeft) / (this.yAxisCount - 1);
      this.stepSize = (this.lineRight - this.lineLeft) / (this.dataMax - this.dataMin); // 画Y轴坐标

      this.context.textAlign = "center";
      this.context.textBaseline = "top";

      for (var _i3 = 0; _i3 < this.yAxisCount; _i3++) {
        this.context.fillText(Number(this.dataMin + _i3 * stepXaxisDataCount).toFixed(this.yAxis.tofixed), this.lineLeft + _i3 * stepWidth, this.bottom + this.fontSizeScale * 10);
      }
    }
  }, {
    key: "drwaAxis",
    value: function drwaAxis() {
      this.initLegendData(); // 画坐标轴

      this.context.strokeStyle = "#ccc";
      this.context.lineWidth = 2;
      this.context.moveTo(this.left, this.top);
      this.context.lineTo(this.left, this.bottom);
      this.context.lineTo(this.right, this.bottom);
      this.context.stroke();

      if (this.type == "horizon") {
        this.drawHorisonAxis();
      } else {
        this.drawVerticleAxis();
      }
    }
  }]);

  return axisChart;
}(chart);

var lineChart =
/*#__PURE__*/
function (_axisChart) {
  _inherits(lineChart, _axisChart);

  function lineChart(id, _ref) {
    var _this6;

    var _ref$title = _ref.title,
        title = _ref$title === void 0 ? "" : _ref$title,
        _ref$series = _ref.series,
        series = _ref$series === void 0 ? [] : _ref$series,
        _ref$xAxis = _ref.xAxis,
        xAxis = _ref$xAxis === void 0 ? {
      data: []
    } : _ref$xAxis,
        _ref$yAxis = _ref.yAxis,
        yAxis = _ref$yAxis === void 0 ? {
      tofixed: 0,
      type: 'value'
    } : _ref$yAxis,
        _ref$callback = _ref.callback,
        callback = _ref$callback === void 0 ? function () {} : _ref$callback;

    _classCallCheck(this, lineChart);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(lineChart).call(this, id, title, series, xAxis, yAxis));
    _this6.callback = callback;
    return _this6;
  }

  _createClass(lineChart, [{
    key: "draw",
    value: function draw() {
      this.drwaTitle();
      this.drwaAxis();
      this.drawLine();
    }
  }, {
    key: "reDraw",
    value: function reDraw(dataIndex) {
      // 从“全部”开始，全部的index=0
      this.context.clearRect(0, 0, this.width, this.height);
      this.defalutIndex = dataIndex;
      this.draw();
      this.callback(dataIndex);
    }
  }, {
    key: "drawLegend",
    value: function drawLegend(legendRows) {
      var _this7 = this;

      // 居中显示图例
      var xIconWidth = 20 * this.fontSizeScale; // 画图例

      legendRows.map(function (row, rowIndex) {
        var startX = row.startX;
        row.data.map(function (item) {
          // 图例文字
          _this7.context.beginPath();

          _this7.context.font = "".concat(10 * _this7.fontSizeScale, "px Helvetica");
          _this7.context.textAlign = "left";
          _this7.context.textBaseline = "middle";
          _this7.context.fillStyle = "#333";

          _this7.context.beginPath();

          _this7.context.fillText(item.name, startX + xIconWidth, row.y);

          _this7.context.fill(); // 图例标志


          _this7.context.lineWidth = 1 * _this7.fontSizeScale;
          _this7.context.strokeStyle = item.color;
          _this7.context.fillStyle = item.color;

          _this7.context.beginPath();

          _this7.context.moveTo(startX, row.y);

          _this7.context.lineTo(startX + xIconWidth * 0.8, row.y);

          _this7.context.stroke(); // 画图例圆圈


          _this7.context.fillStyle = "#fff";

          _this7.context.beginPath();

          _this7.context.arc(startX + xIconWidth * 0.4, row.y, 3 * _this7.fontSizeScale, 0, 2 * Math.PI);

          _this7.context.fill();

          _this7.context.stroke();

          item.startX = startX;
          startX += item.width;
        });
      });
      this.legendRows = legendRows;
    }
  }, {
    key: "drawLine",
    value: function drawLine() {
      var _this8 = this;

      var linePoints = [],
          endIndex = 2,
          startIndex = 1;

      if (this.defalutIndex == 0) {
        // 计算全部折线点
        startIndex = 1;
        endIndex = this.series.length;
      } else {
        // 计算选中折线的点
        startIndex = this.defalutIndex;
        endIndex = startIndex + 1;
      }

      var _loop = function _loop(i) {
        var item = _this8.series[i];
        var points = {
          color: _this8.colors[i],
          type: item.type,
          data: []
        };
        item.data.map(function (num, i) {
          var x = _this8.xAxisPoint[i].x;
          var y = _this8.lineTop + (_this8.dataMax - num) * _this8.stepSize;
          points.data.push({
            point: [x, y],
            value: num,
            tag: item.tag
          });
        });
        linePoints.push(points);
      };

      for (var i = startIndex; i < endIndex; i++) {
        _loop(i);
      } // 画折线色块


      this.context.globalAlpha = 0.1;
      linePoints.map(function (item) {
        _this8.context.fillStyle = item.color;

        if (item.type == "area") {
          _this8.context.beginPath();

          _this8.context.moveTo(_this8.xAxisPoint[_this8.xAxisPoint.length - 1].x, _this8.bottom);

          _this8.context.lineTo(_this8.xAxisPoint[0].x, _this8.bottom);

          item.data.map(function (data) {
            var _this8$context;

            (_this8$context = _this8.context).lineTo.apply(_this8$context, _toConsumableArray(data.point));
          });

          _this8.context.closePath();

          _this8.context.fill();
        }
      }); // 画折线

      this.context.globalAlpha = 1;
      this.context.lineWidth = 1 * this.fontSizeScale;
      linePoints.map(function (item, itemIndex) {
        _this8.context.strokeStyle = item.color;

        _this8.context.beginPath();

        item.data.map(function (data) {
          var _this8$context2;

          (_this8$context2 = _this8.context).lineTo.apply(_this8$context2, _toConsumableArray(data.point));
        });

        _this8.context.stroke();
      }); // 画折线圆圈点

      this.context.lineWidth = 1 * this.fontSizeScale;
      this.context.textBaseline = "bottom";
      this.context.textAlign = "center";
      linePoints.map(function (item, itemIndex) {
        _this8.context.strokeStyle = item.color;
        _this8.context.fillStyle = "#fff";
        item.data.map(function (data, pointIndex) {
          var _this8$context3;

          _this8.context.beginPath();

          (_this8$context3 = _this8.context).arc.apply(_this8$context3, _toConsumableArray(data.point).concat([3 * _this8.fontSizeScale, 0, 2 * Math.PI]));

          _this8.context.fill();

          _this8.context.stroke();
        });
      });
      linePoints.map(function (item) {
        _this8.context.strokeStyle = item.color;
        _this8.context.fillStyle = item.color;
        item.data.map(function (data) {
          if (data.tag != undefined) {
            _this8.context.beginPath();

            _this8.context.fillText(data.value, data.point[0], data.point[1] - 5 * _this8.fontSizeScale);
          }
        });
      });
    }
  }]);

  return lineChart;
}(axisChart);

var barChart =
/*#__PURE__*/
function (_axisChart2) {
  _inherits(barChart, _axisChart2);

  function barChart(id, _ref2) {
    var _this9;

    var _ref2$title = _ref2.title,
        title = _ref2$title === void 0 ? "" : _ref2$title,
        _ref2$type = _ref2.type,
        type = _ref2$type === void 0 ? "verticle" : _ref2$type,
        _ref2$series = _ref2.series,
        series = _ref2$series === void 0 ? [] : _ref2$series,
        _ref2$xAxis = _ref2.xAxis,
        xAxis = _ref2$xAxis === void 0 ? {
      data: []
    } : _ref2$xAxis,
        _ref2$yAxis = _ref2.yAxis,
        yAxis = _ref2$yAxis === void 0 ? {
      tofixed: 0,
      type: 'value'
    } : _ref2$yAxis,
        _ref2$callback = _ref2.callback,
        callback = _ref2$callback === void 0 ? function () {} : _ref2$callback;

    _classCallCheck(this, barChart);

    _this9 = _possibleConstructorReturn(this, _getPrototypeOf(barChart).call(this, id, title, series, xAxis, yAxis, type));
    _this9.callback = callback;
    return _this9;
  }

  _createClass(barChart, [{
    key: "draw",
    value: function draw() {
      this.drwaTitle();
      this.drwaAxis();
      this.drawBar();
    }
  }, {
    key: "reDraw",
    value: function reDraw(dataIndex) {
      this.context.clearRect(0, 0, this.width, this.height);
      this.defalutIndex = dataIndex;
      this.draw();
      this.callback(dataIndex);
    }
  }, {
    key: "drawBar",
    value: function drawBar() {
      if (this.type != "horizon") {
        this.drawVirticleBar();
      } else {
        this.drawHorizonBar();
      }
    }
  }, {
    key: "drawHorizonBar",
    value: function drawHorizonBar() {
      var _this10 = this;

      var everyYHeight = (this.bottom - this.top) / this.xAxis.data.length;
      var startIndex, endIndex;

      if (this.defalutIndex == 0) {
        startIndex = 1;
        endIndex = this.series.length;
      } else {
        startIndex = this.defalutIndex;
        endIndex = startIndex + 1;
      }

      var barHeight = everyYHeight / (endIndex - startIndex + 1);
      this.context.font = "".concat(7 * this.fontSizeScale, "px Helvetica");
      this.context.textAlign = "left";
      this.context.textBaseline = "middle";

      var _loop2 = function _loop2(rowIndex) {
        _this10.context.fillStyle = _this10.colors[rowIndex];
        var row = _this10.series[rowIndex];
        row.data.map(function (data, dataIndex) {
          var barWidth = (data - _this10.dataMin) * _this10.stepSize + (_this10.lineLeft - _this10.left);
          var y = _this10.defalutIndex == 0 ? _this10.top + everyYHeight * dataIndex + barHeight * (rowIndex - 0.5) : _this10.top + everyYHeight * dataIndex + barHeight * 0.5;

          _this10.context.fillRect(_this10.left, y, barWidth, barHeight);

          if (row.tag != undefined) {
            _this10.context.fillText(data + row.tag, _this10.left + barWidth, y + barHeight * 0.5);
          }
        });
      };

      for (var rowIndex = startIndex; rowIndex < endIndex; rowIndex++) {
        _loop2(rowIndex);
      }
    }
  }, {
    key: "drawVirticleBar",
    value: function drawVirticleBar() {
      var _this11 = this;

      var everyXWidth = (this.right - this.left) / this.xAxis.data.length;
      var startIndex, endIndex;

      if (this.defalutIndex == 0) {
        startIndex = 1;
        endIndex = this.series.length;
      } else {
        startIndex = this.defalutIndex;
        endIndex = startIndex + 1;
      }

      var barWidth = everyXWidth / (endIndex - startIndex + 1);
      this.context.font = "".concat(7 * this.fontSizeScale, "px Helvetica");
      this.context.textAlign = "center";
      this.context.textBaseline = "bottom";

      var _loop3 = function _loop3(rowIndex) {
        _this11.context.fillStyle = _this11.colors[rowIndex];
        var row = _this11.series[rowIndex];
        row.data.map(function (data, dataIndex) {
          var _this11$context;

          var x = _this11.defalutIndex == 0 ? _this11.left + everyXWidth * dataIndex + (rowIndex - 0.5) * barWidth : _this11.left + everyXWidth * dataIndex + 0.5 * barWidth;
          var rectStartPoint = [x, _this11.lineTop + (_this11.dataMax - data) * _this11.stepSize];

          (_this11$context = _this11.context).fillRect.apply(_this11$context, rectStartPoint.concat([barWidth, _this11.bottom - rectStartPoint[1]]));

          if (row.tag != undefined) {
            _this11.context.fillText(data + row.tag, rectStartPoint[0] + barWidth / 2, rectStartPoint[1]);
          }
        });
      };

      for (var rowIndex = startIndex; rowIndex < endIndex; rowIndex++) {
        _loop3(rowIndex);
      }
    }
  }]);

  return barChart;
}(axisChart);

var scatterChart =
/*#__PURE__*/
function (_chart2) {
  _inherits(scatterChart, _chart2);

  function scatterChart(id, _ref3) {
    var _this12;

    var _ref3$title = _ref3.title,
        title = _ref3$title === void 0 ? "散点图" : _ref3$title,
        _ref3$type = _ref3.type,
        type = _ref3$type === void 0 ? "scatter" : _ref3$type,
        _ref3$xTag = _ref3.xTag,
        xTag = _ref3$xTag === void 0 ? "" : _ref3$xTag,
        _ref3$xTagNum = _ref3.xTagNum,
        xTagNum = _ref3$xTagNum === void 0 ? 5 : _ref3$xTagNum,
        _ref3$yTag = _ref3.yTag,
        yTag = _ref3$yTag === void 0 ? "" : _ref3$yTag,
        _ref3$yTagNum = _ref3.yTagNum,
        yTagNum = _ref3$yTagNum === void 0 ? 5 : _ref3$yTagNum,
        _ref3$symbolSize = _ref3.symbolSize,
        symbolSize = _ref3$symbolSize === void 0 ? 10 : _ref3$symbolSize,
        series = _ref3.series,
        _ref3$callback = _ref3.callback,
        callback = _ref3$callback === void 0 ? function () {} : _ref3$callback;

    _classCallCheck(this, scatterChart);

    _this12 = _possibleConstructorReturn(this, _getPrototypeOf(scatterChart).call(this, id, title));
    _this12.defalutIndex = 0;
    _this12.callback = callback;
    _this12.type = type;
    _this12.series = series;

    if (_this12.series[0].name != "全部") {
      _this12.series.unshift({
        name: "全部",
        num: []
      });
    }

    _this12.xTag = xTag;
    _this12.xTagNum = xTagNum;
    _this12.yTag = yTag;
    _this12.yTagNum = yTagNum;
    _this12.symbolSize = symbolSize;

    _this12.initSelfData();

    _this12.draw();

    return _this12;
  }

  _createClass(scatterChart, [{
    key: "draw",
    value: function draw() {
      this.drwaTitle();
      this.drwaAxis();
    }
  }, {
    key: "reDraw",
    value: function reDraw(dataIndex) {
      // 从"全部"开始，全部的Index=0
      this.callback(dataIndex);
      this.context.clearRect(0, 0, this.width, this.height);
      this.defalutIndex = dataIndex;
      this.draw();
    }
  }, {
    key: "initSelfData",
    value: function initSelfData() {
      this.xAxisPoint = [];
      this.titleHeight = 40 * this.fontSizeScale;
      this.left = this.fontSizeScale * 60;
      this.lineLeft = this.left + 30 * this.fontSizeScale;
      this.right = this.width - this.fontSizeScale * 10;
      this.lineRight = this.right - 30 * this.fontSizeScale;
      this.top = this.titleHeight;
      this.lineTop = this.top + 30 * this.fontSizeScale;
      this.bottom = this.height - 80 * this.fontSizeScale;
      this.lineBottom = this.bottom - 30 * this.fontSizeScale;
      this.stepSize = 0; //单个数值所占的尺寸(高度or宽度)
    }
  }, {
    key: "initLegendData",
    value: function initLegendData() {
      var _this13 = this;

      // 画图例
      // 设置图例样式
      this.context.font = "".concat(10 * this.fontSizeScale, "px Helvetica");
      this.context.textAlign = "left";
      this.context.textBaseline = "middle";
      var xIconWidth = 20 * this.fontSizeScale,
          gapWidth = 10 * this.fontSizeScale; // 计算图例的行数和起始位置

      var legendRows = [];
      var legends = [];
      var legendW = 0;
      this.series.map(function (item, i) {
        var xTagWidth = _this13.context.measureText(item.name).width + gapWidth;
        var itemWidth = xTagWidth + xIconWidth + gapWidth;

        if (legendW + itemWidth > _this13.width) {
          legendRows.push({
            data: legends,
            startX: (_this13.width - legendW) / 2 + gapWidth / 2
          });
          legends = [];
          legendW = 0;
        }

        legendW += itemWidth;
        legends.push({
          name: item.name,
          color: _this13.colors[i],
          width: itemWidth
        });
      });
      legendRows.push({
        data: legends,
        startX: (this.width - legendW) / 2 + gapWidth / 2
      });
      this.bottom = this.height - 20 * this.fontSizeScale * legendRows.length - 40 * this.fontSizeScale;
      this.lineBottom = this.bottom - 30 * this.fontSizeScale;
      legendRows.map(function (row, i) {
        row.y = _this13.bottom + 40 * _this13.fontSizeScale + 20 * _this13.fontSizeScale * i;
      });
      this.drawLegend(legendRows);
    }
  }, {
    key: "drawLegend",
    value: function drawLegend(legendRows) {
      var _this14 = this;

      var xIconWidth = 20 * this.fontSizeScale; // 画图例

      legendRows.map(function (row, rowIndex) {
        var startX = row.startX;
        row.data.map(function (item) {
          item.startX = startX; // 图例文字

          _this14.context.beginPath();

          _this14.context.font = "".concat(10 * _this14.fontSizeScale, "px Helvetica");
          _this14.context.textAlign = "left";
          _this14.context.textBaseline = "middle";
          _this14.context.fillStyle = "#333";

          _this14.context.beginPath();

          _this14.context.fillText(item.name, startX + xIconWidth, row.y);

          _this14.context.fill(); // 图例标志


          _this14.context.lineWidth = 1 * _this14.fontSizeScale;
          _this14.context.fillStyle = item.color;

          _this14.context.beginPath();

          _this14.context.arc(startX + 10 * _this14.fontSizeScale, row.y, 5 * _this14.fontSizeScale, 0, Math.PI * 2); // this.context.fillRect(startX,row.y-5*this.fontSizeScale,xIconWidth*0.8,10*this.fontSizeScale)


          _this14.context.fill();

          startX += item.width;
        });
      });
      this.legendRows = legendRows;
    }
  }, {
    key: "drawAxisAndScatter",
    value: function drawAxisAndScatter() {
      var _this15 = this;

      // 坐标轴
      this.context.globalAlpha = 1;
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

      for (var i = 1; i < this.series.length; i++) {
        var item = this.series[i];
        xDatas = [].concat(_toConsumableArray(xDatas), _toConsumableArray(item.data.map(function (tem) {
          return tem.x;
        })));
        yDatas = [].concat(_toConsumableArray(yDatas), _toConsumableArray(item.data.map(function (tem) {
          return tem.y;
        })));
      }

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

      this.context.fillStyle = "#666";
      this.context.font = 10 * this.fontSizeScale + "px Helvetica";
      this.context.textAlign = "center";
      this.context.textBaseline = "top";

      for (var _i4 = 0; _i4 < 5; _i4++) {
        var _this$context;

        var xTagStr = (xMin + (xMax - xMin) / (this.xTagNum - 1) * _i4).toFixed(0) + this.xTag;
        var position = [this.lineLeft + everyXWidth * _i4, this.bottom + 10 * this.fontSizeScale];

        (_this$context = this.context).fillText.apply(_this$context, [xTagStr].concat(position, [everyXWidth]));
      } //纵坐标


      this.context.textAlign = "right";
      this.context.textBaseline = "middle";

      for (var _i5 = 0; _i5 < 5; _i5++) {
        var _this$context2;

        var yTagStr = (yMin + (yMax - yMin) / (this.yTagNum - 1) * _i5).toFixed(0) + this.yTag;
        var positon = [this.left - 10 * this.fontSizeScale, this.lineBottom - everyYHeight * _i5];

        (_this$context2 = this.context).fillText.apply(_this$context2, [yTagStr].concat(positon, [this.left]));
      } //计算散点大小


      var zDatas = [];

      if (this.type == "bubble") {
        for (var _i6 = 1; _i6 < this.series.length; _i6++) {
          zDatas = [].concat(_toConsumableArray(zDatas), _toConsumableArray(this.series[_i6].data.map(function (tem) {
            return tem.z;
          })));
        }
      } // 为计算气泡大小做准备


      var symbolSize = this.width * this.symbolSize * 0.001;
      var everySymbolSize, minZ, maxZ, minSymbolSize, maxSymbolSize;

      if (this.type == "bubble") {
        minZ = Math.min.apply(Math, _toConsumableArray(zDatas));
        maxZ = Math.max.apply(Math, _toConsumableArray(zDatas));
        minSymbolSize = symbolSize * 0.5;
        maxSymbolSize = symbolSize * 4;
        everySymbolSize = (maxSymbolSize - minSymbolSize) / (maxZ - minZ);
      } // 散点


      this.context.globalAlpha = 0.5;

      var renderScatter = function renderScatter(color, datas) {
        _this15.context.fillStyle = color;
        datas.map(function (data) {
          var _this15$context;

          if (_this15.type == "bubble") {
            symbolSize = minSymbolSize + (data.z - minZ) * everySymbolSize;
          }

          _this15.context.beginPath();

          var position = [_this15.lineLeft + (data.x - xMin) * everyX, _this15.lineBottom - (data.y - yMin) * everyY];

          (_this15$context = _this15.context).arc.apply(_this15$context, position.concat([symbolSize, 0, Math.PI * 2]));

          _this15.context.fill();
        });
      };

      if (this.defalutIndex == 0) {
        // 画全部散点
        for (var _i7 = 1; _i7 < this.series.length; _i7++) {
          renderScatter(this.colors[_i7], this.series[_i7].data);
        }
      } else {
        // 画选中的散点
        var datas = this.series[this.defalutIndex].data;
        renderScatter(this.colors[this.defalutIndex], datas);
      }

      this.context.globalAlpha = 1;
    }
  }, {
    key: "drwaAxis",
    value: function drwaAxis() {
      this.initLegendData(); // 画坐标轴

      this.context.strokeStyle = "#ccc";
      this.context.lineWidth = 2;
      this.context.moveTo(this.left, this.top);
      this.context.lineTo(this.left, this.bottom);
      this.context.lineTo(this.right, this.bottom);
      this.context.stroke();
      this.drawAxisAndScatter();
    }
  }]);

  return scatterChart;
}(chart);

var radarChart =
/*#__PURE__*/
function (_chart3) {
  _inherits(radarChart, _chart3);

  function radarChart(id, _ref4) {
    var _this16;

    var _ref4$title = _ref4.title,
        title = _ref4$title === void 0 ? "雷达图" : _ref4$title,
        _ref4$defalutIndex = _ref4.defalutIndex,
        defalutIndex = _ref4$defalutIndex === void 0 ? 0 : _ref4$defalutIndex,
        axis = _ref4.axis,
        data = _ref4.data,
        _ref4$callback = _ref4.callback,
        callback = _ref4$callback === void 0 ? function () {} : _ref4$callback;

    _classCallCheck(this, radarChart);

    _this16 = _possibleConstructorReturn(this, _getPrototypeOf(radarChart).call(this, id, title));
    _this16.bgLineCount = 5; //背景分层线条的层数

    _this16.defalutIndex = defalutIndex;
    _this16.axis = axis;
    _this16.data = data;
    _this16.callback = callback;
    var datas = [];
    data.unshift({
      name: "全部",
      num: []
    });
    data.map(function (item, i) {
      item["color"] = _this16.colors[i];
      datas = [].concat(_toConsumableArray(datas), _toConsumableArray(item.num));
    });
    _this16.max = Math.max.apply(Math, _toConsumableArray(datas));
    _this16.min = Math.min.apply(Math, _toConsumableArray(datas));

    if (_this16.min != 0) {
      _this16.min = (_this16.max - _this16.min) / _this16.max * _this16.min;
    }

    _this16.chartDatas = data;
    _this16.startAngle = -0.5;
    _this16.angleList = [];
    _this16.angleList = axis.map(function (item, i) {
      return _this16.startAngle + i * Math.PI * 2 / axis.length;
    });
    _this16.everyDataLineLength = 0;

    _this16.initSelfData();

    _this16.draw();

    return _this16;
  }

  _createClass(radarChart, [{
    key: "draw",
    value: function draw() {
      this.drwaTitle();
      this.initLegendData();
      this.drawBg();
      this.drawHeros();
    }
  }, {
    key: "reDraw",
    value: function reDraw(dataIndex) {
      // 从"全部"开始，全部的Index=0
      this.context.clearRect(0, 0, this.width, this.height);
      this.defalutIndex = dataIndex;
      this.draw();
      this.callback(dataIndex);
    }
  }, {
    key: "initData",
    value: function initData() {
      this.box.innerHTML = "";
      var width = this.box.clientWidth;
      var height = this.box.clientHeight || width;
      this.box.appendChild(this.canvas);
      this.width = width * this.scale;
      this.height = height * this.scale;
      this.canvas.style.width = width + "px";
      this.canvas.style.height = height + "px";
      this.context = this.canvas.getContext("2d");
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      var size = width > height ? height : width;

      if (size <= 289) {
        this.fontSizeScale = 0.7;
      } else if (size >= 580) {
        this.fontSizeScale = 1.4;
      } else {
        this.fontSizeScale = size / 414;
      }

      this.fontSizeScale = this.fontSizeScale * this.scale;
      this.top = 60 * this.fontSizeScale;
    }
  }, {
    key: "initLegendData",
    value: function initLegendData() {
      var _this17 = this;

      // 画图例
      // 设置图例样式
      this.context.font = "".concat(10 * this.fontSizeScale, "px Helvetica");
      this.context.textAlign = "left";
      this.context.textBaseline = "middle";
      var xIconWidth = 20 * this.fontSizeScale,
          gapWidth = 10 * this.fontSizeScale; // 计算图例的行数和起始位置

      var legendRows = [];
      var legends = [];
      var legendW = 0;
      this.data.map(function (item, i) {
        var xTagWidth = _this17.context.measureText(item.name).width + gapWidth;
        var itemWidth = xTagWidth + xIconWidth + gapWidth;

        if (legendW + itemWidth > _this17.width) {
          legendRows.push({
            data: legends,
            startX: (_this17.width - legendW) / 2 + gapWidth / 2
          });
          legends = [];
          legendW = 0;
        }

        legendW += itemWidth;
        legends.push({
          name: item.name,
          color: _this17.colors[i],
          width: itemWidth
        });
      });
      legendRows.push({
        data: legends,
        startX: (this.width - legendW) / 2 + gapWidth / 2
      });
      this.bottom = this.height - 20 * this.fontSizeScale * legendRows.length - 40 * this.fontSizeScale;
      this.everyDataLineLength = (this.bottom - this.top - 20 * this.fontSizeScale) / 2 / (this.max - this.min);
      this.pointCenter = [this.width / 2, this.top + (this.bottom - this.top) / 2];
      legendRows.map(function (row, i) {
        row.y = _this17.bottom + 40 * _this17.fontSizeScale + 20 * _this17.fontSizeScale * i;
      });
      this.drawLegend(legendRows);
    }
  }, {
    key: "drawHeros",
    value: function drawHeros() {
      var _this18 = this;

      this.chartDatas.map(function (hero, i) {
        // 标注
        var textW = _this18.context.measureText(hero.name).width;

        if (textW > _this18.textWidth) {
          _this18.textWidth = textW;
        }

        _this18.context.beginPath();

        _this18.context.strokeStyle = hero.color;
        _this18.context.fillStyle = hero.color;

        _this18.context.rect(_this18.width * 0.05, _this18.height * 0.2 + _this18.tagH * i * 2.5, _this18.tagW, _this18.tagH);

        _this18.context.fill(); // name 标注名


        _this18.context.fillStyle = "#666";
        _this18.context.font = (_this18.size * 0.06 > 50 ? 50 : _this18.size * 0.06) + "px Helvetica";
        _this18.context.textAlign = "left";
        _this18.context.textBaseline = 'middle';

        _this18.context.fillText("".concat(hero.name), _this18.width * 0.06 + _this18.tagW, _this18.height * 0.2 + _this18.tagH * i * 2.5 + _this18.tagH * 0.5);
      });

      if (this.defalutIndex == 0) {
        this.chartDatas.map(function (hero, i) {
          _this18.drawHero(hero, i);
        });
      } else if (this.defalutIndex > 0) {
        this.drawHero(this.chartDatas[this.defalutIndex], this.defalutIndex);
      }
    }
  }, {
    key: "drawHero",
    value: function drawHero(hero, i) {
      var _this19 = this;

      // 范围
      this.context.beginPath();
      this.context.lineWidth = 0.5 * this.fontSizeScale;
      this.context.fillStyle = hero.color;
      this.context.strokeStyle = hero.color;
      hero.num.map(function (num, i) {
        var lineLenth = _this19.everyDataLineLength * (num - _this19.min);

        var _this19$getAnglePoint = _this19.getAnglePoint(_this19.angleList[i], lineLenth),
            x = _this19$getAnglePoint.x,
            y = _this19$getAnglePoint.y;

        if (i == 0) {
          _this19.context.moveTo(x, y);
        } else {
          _this19.context.lineTo(x, y);
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
      var _this20 = this;

      var _this$pointCenter = _slicedToArray(this.pointCenter, 2),
          x0 = _this$pointCenter[0],
          y0 = _this$pointCenter[1];

      var pointList = [];
      var points = [];
      var stepLength = (this.bottom - this.top - 20 * this.fontSizeScale) / 2 / this.bgLineCount;
      this.context.beginPath();
      this.context.globalAlpha = 1;
      this.context.strokeStyle = "#ddd";

      var _loop4 = function _loop4(i) {
        var currentlineLength = stepLength * i;
        points = [];

        _this20.context.beginPath();

        _this20.angleList.map(function (angle, j) {
          var _this20$getAnglePoint = _this20.getAnglePoint(angle, currentlineLength),
              x = _this20$getAnglePoint.x,
              y = _this20$getAnglePoint.y;

          points.push({
            x: x,
            y: y
          });

          if (j == 0) {
            _this20.context.moveTo(x, y);
          } else {
            _this20.context.lineTo(x, y);
          }
        });

        pointList.push(points);

        _this20.context.closePath();

        _this20.context.stroke();
      };

      for (var i = this.bgLineCount; i > 0; i--) {
        _loop4(i);
      }

      pointList[0].map(function (point, i) {
        var _this20$pointCenter = _slicedToArray(_this20.pointCenter, 2),
            x0 = _this20$pointCenter[0],
            y0 = _this20$pointCenter[1];

        var _ref5 = [point.x, point.y],
            x = _ref5[0],
            y = _ref5[1];

        _this20.context.beginPath();

        _this20.context.moveTo(x0, y0);

        _this20.context.lineTo(x, y);

        _this20.context.stroke();

        _this20.context.textBaseline = "middle";
        _this20.context.fillStyle = "#999";
        var textX = x,
            textY = y;

        _this20.context.beginPath();

        _this20.context.font = 10 * _this20.fontSizeScale + "px Helvetica";

        if (i == _this20.axis.length - 1 || i == _this20.axis.length / 2 - 1) {
          _this20.context.textAlign = "center";

          if (y > y0) {
            textY = y + _this20.fontSizeScale * 10;
          } else {
            textY = y - _this20.fontSizeScale * 10;
          }
        } else if (x > x0) {
          _this20.context.textAlign = "left";
          textX = x + _this20.fontSizeScale * 10;
        } else if (x < x0) {
          _this20.context.textAlign = "right";
          textX = x - _this20.fontSizeScale * 10;
        }

        _this20.context.fillText(_this20.axis[i], textX, textY);
      });
    }
  }, {
    key: "getAnglePoint",
    value: function getAnglePoint(angle, lineLength) {
      var _x$y = {
        x: this.pointCenter[0] + Math.cos(angle) * lineLength,
        y: this.pointCenter[1] + Math.sin(angle) * lineLength
      },
          x = _x$y.x,
          y = _x$y.y;
      return {
        x: x,
        y: y
      };
    }
  }]);

  return radarChart;
}(chart);

var pieChart =
/*#__PURE__*/
function (_chart4) {
  _inherits(pieChart, _chart4);

  function pieChart(id, _ref6) {
    var _this21;

    var _ref6$title = _ref6.title,
        title = _ref6$title === void 0 ? "饼图" : _ref6$title,
        type = _ref6.type,
        _ref6$defalutIndex = _ref6.defalutIndex,
        defalutIndex = _ref6$defalutIndex === void 0 ? 0 : _ref6$defalutIndex,
        data = _ref6.data,
        _ref6$callback = _ref6.callback,
        callback = _ref6$callback === void 0 ? function () {} : _ref6$callback;

    _classCallCheck(this, pieChart);

    _this21 = _possibleConstructorReturn(this, _getPrototypeOf(pieChart).call(this, id, title));
    _this21.colors = [].concat(colors).splice(1, colors.length - 1);
    _this21.type = type;
    _this21.defalutIndex = defalutIndex;
    _this21.data = data;
    _this21.callback = callback;
    _this21.defalutIndex = defalutIndex;
    var allNum = 0;
    data.map(function (item) {
      allNum += item.num;
    });
    var chartDatas = data.map(function (item, i) {
      return _objectSpread({
        color: _this21.colors[i]
      }, item, {
        percent: item.num / allNum
      });
    });
    _this21.chartDatas = chartDatas;
    _this21.type = type.toLowerCase();
    _this21.tagH = 0;
    _this21.tagW = 0;
    _this21.lineWidth = _this21.type == "circle" ? _this21.size / 5 : _this21.size / 2.4;
    _this21.startAngle = -0.5;
    _this21.AngleList = [];

    _this21.initSelfData();

    _this21.draw();

    _this21.box.addEventListener("click", function (e) {
      _this21.clickPie(e);
    });

    return _this21;
  }

  _createClass(pieChart, [{
    key: "draw",
    value: function draw() {
      this.drwaTitle();
      this.initLegendData();
      this.drawPie();
    }
  }, {
    key: "reDraw",
    value: function reDraw(dataIndex) {
      // 从"全部"开始，全部的Index=0
      this.context.clearRect(0, 0, this.width, this.height);
      this.defalutIndex = dataIndex;
      this.draw();
      this.callback(dataIndex);
    }
  }, {
    key: "clickPie",
    value: function clickPie(e) {
      var x1 = e.offsetX * this.scale,
          y1 = e.offsetY * this.scale;

      var _this$pointCenter2 = _slicedToArray(this.pointCenter, 2),
          x0 = _this$pointCenter2[0],
          y0 = _this$pointCenter2[1];

      var lineLength = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1)); // 用三角函数计算夹角

      var angle = Math.atan(Math.abs(x0 - x1) / Math.abs(y0 - y1));
      var eventAngle; // 点击范围在饼图范围内

      if (lineLength < this.radius) {
        // 计算角度
        if (x1 > x0) {
          if (y1 < y0) {
            // 第一象限
            eventAngle = angle;
          } else {
            // 第二象限
            eventAngle = Math.PI - angle;
          }
        } else {
          if (y1 < y0) {
            // 第四象限
            eventAngle = Math.PI * 2 - angle;
          } else {
            // 第三象限
            eventAngle = Math.PI + angle;
          }
        } // console.log(eventAngle)


        eventAngle += this.startAngle * Math.PI;

        for (var i = 0; i < this.data.length; i++) {
          var item = this.data[i]; // console.log(item.startAngle,item.endAngle,eventAngle);

          if (item.startAngle < eventAngle && item.endAngle > eventAngle) {
            // this.defalutIndex=i;
            this.reDraw(i);
            return;
          }
        }
      }
    }
  }, {
    key: "initData",
    value: function initData() {
      this.box.innerHTML = "";
      var width = this.box.clientWidth;
      var height = this.box.clientHeight || width;
      this.box.appendChild(this.canvas);
      this.width = width * this.scale;
      this.height = height * this.scale;
      this.canvas.style.width = width + "px";
      this.canvas.style.height = height + "px";
      this.context = this.canvas.getContext("2d");
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      var size = width > height ? height : width;

      if (size <= 289) {
        this.fontSizeScale = 0.7;
      } else if (size >= 580) {
        this.fontSizeScale = 1.4;
      } else {
        this.fontSizeScale = size / 414;
      }

      this.fontSizeScale = this.fontSizeScale * this.scale;
      this.top = 60 * this.fontSizeScale;
    }
  }, {
    key: "initLegendData",
    value: function initLegendData() {
      var _this22 = this;

      // 画图例
      // 设置图例样式
      this.context.font = "".concat(10 * this.fontSizeScale, "px Helvetica");
      this.context.textAlign = "left";
      this.context.textBaseline = "middle";
      var xIconWidth = 20 * this.fontSizeScale,
          gapWidth = 10 * this.fontSizeScale; // 计算图例的行数和起始位置

      var legendRows = [];
      var legends = [];
      var legendW = 0;
      this.data.map(function (item, i) {
        var xTagWidth = _this22.context.measureText(item.name).width + gapWidth;
        var itemWidth = xTagWidth + xIconWidth + gapWidth;

        if (legendW + itemWidth > _this22.width) {
          legendRows.push({
            data: legends,
            startX: (_this22.width - legendW) / 2 + gapWidth / 2
          });
          legends = [];
          legendW = 0;
        }

        legendW += itemWidth;
        legends.push({
          name: item.name,
          color: _this22.colors[i],
          width: itemWidth
        });
      });
      legendRows.push({
        data: legends,
        startX: (this.width - legendW) / 2 + gapWidth / 2
      });
      this.bottom = this.height - 20 * this.fontSizeScale * legendRows.length - 40 * this.fontSizeScale;
      this.everyDataLineLength = (this.bottom - this.top - 20 * this.fontSizeScale) / 2 / (this.max - this.min);
      this.pointCenter = [this.width / 2, this.top + (this.bottom - this.top) / 2];
      legendRows.map(function (row, i) {
        row.y = _this22.bottom + 40 * _this22.fontSizeScale + 20 * _this22.fontSizeScale * i;
      });
      this.drawLegend(legendRows);
      this.pieCenterPoint = [this.width / 2, (this.bottom - this.top) / 2 + this.top];
    }
  }, {
    key: "drawPie",
    value: function drawPie() {
      var _this23 = this,
          _this$context3,
          _this$context4;

      console.log(this.defalutIndex);
      var radius = (this.bottom - this.top) / 2;
      this.radius = radius;
      this.context.lineWidth = radius * 0.4;

      if (this.type != "pie") {
        radius = (this.bottom - this.top) / 2 - this.context.lineWidth / 2;
      }

      this.pointCenter = [this.width / 2, this.top + (this.bottom - this.top) / 2];
      var totalCount = 0;
      this.data.map(function (item) {
        totalCount += item.num;
      }); // 画饼图or环形图

      var startAngle = this.startAngle * Math.PI;
      var endAngle;
      this.data.map(function (item, i) {
        var _this23$context;

        var percent = item.num / totalCount;
        var stepAngle = percent * Math.PI * 2;
        var endAngle = startAngle + stepAngle;
        item.startAngle = startAngle;
        item.endAngle = endAngle;
        item.percent = percent;
        var center = _this23.pointCenter;

        if (i == _this23.defalutIndex) {
          center = _this23.getAnglePoint(stepAngle / 2 + startAngle, radius * 0.1);
        }

        _this23.context.fillStyle = _this23.colors[i];
        _this23.context.strokeStyle = _this23.colors[i];

        _this23.context.beginPath();

        (_this23$context = _this23.context).arc.apply(_this23$context, _toConsumableArray(center).concat([radius, startAngle, endAngle, false]));

        if (_this23.type != "pie") {
          _this23.context.stroke();
        } else {
          var _this23$context2;

          (_this23$context2 = _this23.context).lineTo.apply(_this23$context2, _toConsumableArray(center));

          _this23.context.closePath();

          _this23.context.fill();
        }

        startAngle = endAngle;
      }); // 当前项标注

      this.context.fillStyle = "rgba(255,255,255,0.6)";
      this.context.beginPath();

      (_this$context3 = this.context).arc.apply(_this$context3, _toConsumableArray(this.pointCenter).concat([radius * 0.55, 0, Math.PI * 2]));

      this.context.fill();
      this.context.fillStyle = "#333";
      this.context.font = "".concat(radius * 0.3, "px Helvetica");
      this.context.textBaseline = "bottom";
      this.context.textAlign = "center";

      (_this$context4 = this.context).fillText.apply(_this$context4, [(this.data[this.defalutIndex].num / totalCount * 100).toFixed(2) + "%"].concat(_toConsumableArray(this.pointCenter)));

      this.context.fillStyle = "#666";
      this.context.font = "".concat(radius * 0.15, "px Helvetica");
      this.context.textBaseline = "top";
      this.context.fillText("".concat(this.data[this.defalutIndex].name, " / ").concat(this.data[this.defalutIndex].num), this.pointCenter[0], this.pointCenter[1] + radius * 0.1);
    }
  }, {
    key: "getAnglePoint",
    value: function getAnglePoint(angle, lineLength) {
      var _x$y2 = {
        x: this.pointCenter[0] + Math.cos(angle) * lineLength,
        y: this.pointCenter[1] + Math.sin(angle) * lineLength
      },
          x = _x$y2.x,
          y = _x$y2.y;
      return [x, y];
    }
  }]);

  return pieChart;
}(chart);