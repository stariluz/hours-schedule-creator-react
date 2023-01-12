var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FIRST_HOUR = 6;
var amountOfClasses = 5;
var days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
var daysMap = {
    0: days[0],
    1: days[1],
    2: days[2],
    3: days[3],
    4: days[4],
    5: days[5],
    6: days[6]
};

var Calendar = function (_React$Component) {
    _inherits(Calendar, _React$Component);

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

        _this.state = {
            history: [{
                hoursMap: Array(7).fill(Array(24).fill(0))
            }],
            currentTime: 0
            // const currentHoursMap=this.state.history[this.state.currentTime].hoursMap.slice();
            // console.log("DEV: Constructor",currentHoursMap);
        };return _this;
    }

    _createClass(Calendar, [{
        key: 'handleClickOnHour',
        value: function handleClickOnHour(day, hour) {
            var currentHoursMap = this.state.history[this.state.currentTime].hoursMap.slice();
            currentHoursMap[day][hour]++;
            currentHoursMap[day][hour] %= amountOfClasses;

            // this.setState({
            //     history: [...this.state.history, currentHoursMap],
            //     currentTime: this.state.currentTime+1,
            // });
            console.log("DEV: HANDLE CLICK ON HOUR ", hour, " AT ", daysMap[day], currentHoursMap);
        }
    }, {
        key: 'renderHourSpace',
        value: function renderHourSpace(day, hour, contentValue) {
            var _this2 = this;

            // console.log(hoursMap);
            var hourComponent = React.createElement(HourSpace, {
                hour: hour,
                contentValue: contentValue,
                key: day + "_" + hour,
                onClick: function onClick() {
                    return _this2.handleClickOnHour(day, hour);
                }
            });
            // console.log(hourComponent);
            return hourComponent;
        }
    }, {
        key: 'renderHourTime',
        value: function renderHourTime(hour) {
            var hourComponent = React.createElement(Hour, { hour: hour, key: 'hour-' + hour });
            // console.log(hourComponent);
            return hourComponent;
        }
    }, {
        key: 'renderDay',
        value: function renderDay(day) {
            var _this3 = this;

            var hoursMap = this.state.history[this.state.currentTime].hoursMap;
            var hours = Array(24 - FIRST_HOUR).fill(null).map(function (value, index) {
                var hour = index + FIRST_HOUR;
                return _this3.renderHourSpace(day, hour, hoursMap[day][hour]);
            });
            // console.log(hours,day);
            var dayComponent = React.createElement(
                'div',
                { className: 'day', key: "row_" + day },
                React.createElement(
                    'div',
                    { className: 'day__name' },
                    days[day]
                ),
                hours
            );
            return dayComponent;
        }
    }, {
        key: 'renderWeek',
        value: function renderWeek() {
            var _this4 = this;

            var hoursTime = Array(24 - FIRST_HOUR).fill(null).map(function (value, index) {
                return _this4.renderHourTime(index + FIRST_HOUR);
            });
            var weekComponent = React.createElement(
                'div',
                { className: 'week' },
                React.createElement(
                    'div',
                    { className: 'hours__time' },
                    React.createElement(
                        'div',
                        null,
                        'Hora'
                    ),
                    hoursTime
                ),
                Object.keys(daysMap).map(function (day) {
                    return _this4.renderDay(day);
                })
            );
            return weekComponent;
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'calendar' },
                this.renderWeek()
            );
        }
    }]);

    return Calendar;
}(React.Component);