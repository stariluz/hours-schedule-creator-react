var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_React$Component) {
    _inherits(Calendar, _React$Component);

    function Calendar() {
        _classCallCheck(this, Calendar);

        return _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).apply(this, arguments));
    }

    _createClass(Calendar, [{
        key: "renderHourClass",
        value: function renderHourClass(hour, key) {
            var hourComponent = React.createElement(HourClass, { hour: hour, key: key });
            // console.log(hourComponent);
            return hourComponent;
        }
    }, {
        key: "renderHourTime",
        value: function renderHourTime(hour) {
            var hourComponent = React.createElement(Hour, { hour: hour, key: 'hour' - hour });
            // console.log(hourComponent);
            return hourComponent;
        }
    }, {
        key: "renderDay",
        value: function renderDay(day, key) {
            var _this2 = this;

            var hours = Array(24).fill(null).map(function (value, index) {
                return _this2.renderHourClass(index, day + "_" + index);
            });
            console.log(hours);
            var dayComponent = React.createElement(
                "div",
                { className: "day", key: key },
                React.createElement(
                    "div",
                    { className: "day__name" },
                    day
                ),
                hours
            );
            return dayComponent;
        }
    }, {
        key: "renderWeek",
        value: function renderWeek() {
            var _this3 = this;

            var days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
            var hoursTime = Array(24).fill(null).map(function (value, index) {
                return _this3.renderHourTime(index);
            });
            var weekComponent = React.createElement(
                "div",
                { className: "week" },
                React.createElement(
                    "div",
                    { className: "hours__time" },
                    React.createElement(
                        "div",
                        null,
                        "Hora"
                    ),
                    hoursTime
                ),
                days.map(function (day, index) {
                    return _this3.renderDay(day, "row-" + day);
                })
            );
            return weekComponent;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "calendar" },
                this.renderWeek()
            );
        }
    }]);

    return Calendar;
}(React.Component);