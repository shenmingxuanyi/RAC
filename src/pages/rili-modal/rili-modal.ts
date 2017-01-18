import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/*
 Generated class for the RiliModal page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-rili-modal',
    templateUrl: 'rili-modal.html'
})
export class RiliModalPage implements OnInit {

    @ViewChild("YEAR_SLIDES") yearSlides;

    @ViewChild("MONTH_SLIDES") monthSlides;

    @ViewChild("DATE_SLIDES") dateSlides;

    minDate: string = "2017-01-01";

    maxDate: string = "2026-12-31";

    theme: string = 'primary';

    markTheme: string = 'primary';

    currentDate: string;

    _yearList: Array<string> = [];

    _monthList: Array<string> = [];

    _weekList: Array<string> = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

    _dayList: Array<Array<any>> = [];

    currentWeek: string = "";

    markDateList: Array<string> = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewController: ViewController) {
        this.minDate = this.navParams.get("minDate") || "2017-01-01";
        this.maxDate = this.navParams.get("maxDate") || "2026-12-31";
        this.currentDate = this.navParams.get("currentDate") || this.minDate;

        this.markDateList = this.navParams.get("markDateList") || [];
    }

    ionViewDidLoad() {

    }

    ionViewWillEnter() {
        this.initCurrentDate();
    };

    ngOnInit() {
        this._yearList = this.initYear(this.minDate.split("-")[0], this.maxDate.split("-")[0]);
        this._monthList = this.initMonth("1", "12");
    }


    private initYear(startYear: string, endYear: string) {

        let _yearList: Array<string> = [];

        let start: number = parseInt(startYear, 10);
        let end: number = parseInt(endYear, 10);

        for (let i = start; i <= end; i++) {
            _yearList.push(i + "");
        }

        return _yearList;
    }

    private initMonth(startMonth: string, endMonth: string) {

        let _monthLis: Array<string> = [];

        let start: number = parseInt(startMonth, 10);
        let end: number = parseInt(endMonth, 10);

        for (let i = start; i <= end; i++) {
            _monthLis.push(("0" + i).slice(-2));
        }

        return _monthLis;
    }

    close($event, date) {
        $event.stopImmediatePropagation()
        $event.preventDefault();
        this.viewController.dismiss(date);
    }

    _yearSlideNextStart($event) {
        // console.log("_yearSlideNextStart", $event);
        this._dayList = this.initDate(this._yearList[this.yearSlides.realIndex], this._monthList[this.monthSlides.realIndex]);
    }

    _yearSlidePrevStart($event) {
        // console.log("_yearSlidePrevStart", $event);
        this._dayList = this.initDate(this._yearList[this.yearSlides.realIndex], this._monthList[this.monthSlides.realIndex]);
    }

    _monthSlideNextStart($event) {
        // console.log("_monthSlideNextStart", $event);
        //12->1 下一年 并且有年控制器触发动态日期
        if ($event.realIndex == 0) {
            this.yearSlides.slideNext();
        } else {
            this._dayList = this.initDate(this._yearList[this.yearSlides.realIndex], this._monthList[this.monthSlides.realIndex]);
        }
    }

    _monthSlidePrevStart($event) {
        // console.log("_monthSlidePrevStart", $event);
        //1->12 上一年  并且有年控制器触发动态日期
        if ($event.realIndex == 11) {
            this.yearSlides.slidePrev();
        } else {
            this._dayList = this.initDate(this._yearList[this.yearSlides.realIndex], this._monthList[this.monthSlides.realIndex]);
        }
    }

    _dateSlideNextStart($event) {
        // console.log("_dateSlideNextStart", $event);
    }

    _dateSlidePrevStart($event) {
        // console.log("_dateSlidePrevStart", $event);
    }

    initDate(year: string, month: string) {

        console.log(year + "-" + month);

        let dateList = [];

        let yearNumber = parseInt(year, 10);
        let monthNumber = parseInt(month, 10) - 1;

        //是否润年
        let is_leap = yearNumber % 100 == 0 ? (yearNumber % 400 == 0 ? 1 : 0) : (yearNumber % 4 == 0 ? 1 : 0);

        let yearMonthDayList = new Array(31, 28 + is_leap, 31, 30, 31, 31, 30, 31, 30, 31, 30, 31);

        let date = new Date(yearNumber, monthNumber, 1);

        let colList: Array<any> = new Array(7);

        for (let i = 1, n = yearMonthDayList[monthNumber]; i <= n; i++) {
            date.setDate(i);
            colList[date.getDay()] = {
                date: ("0" + i).slice(-2),
                day: date.getDay(),
                year: year,
                month: month,
                primary: true,
                fullDate: year + "-" + month + "-" + ("0" + i).slice(-2)
            };
            colList[date.getDay()]['mark'] = this.markDateList.findIndex(item => item == colList[date.getDay()].fullDate) > -1 ? true : false;

            if (date.getDay() == 6 || i == n) {
                dateList.push(colList);
                colList = new Array(7);
            }
        }

        this.controllerDateListFirst(new Date(yearNumber, monthNumber, 1), dateList);
        this.controllerDateListEnd(new Date(yearNumber, monthNumber, yearMonthDayList[monthNumber]), dateList);

        return dateList;
    }

    controllerDateListFirst(date: Date, dateList) {
        //处理日期头部
        date.setDate(date.getDate() - 1);

        for (let i = 0; i < 6; i++) {
            if (!dateList[0][date.getDay()]) {
                dateList[0][date.getDay()] = {
                    date: ("0" + date.getDate()).slice(-2),
                    day: date.getDay(),
                    year: date.getFullYear() + "",
                    month: ("0" + (date.getMonth() + 1)).slice(-2),
                    primary: false,
                    fullDate: date.getFullYear() + "" + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + i).slice(-2)
                };

                dateList[0][date.getDay()]['mark'] = this.markDateList.findIndex(item => item == dateList[0][date.getDay()].fullDate) > -1 ? true : false;

            }

            date.setDate(date.getDate() - 1);
        }


        console.log("controllerDateListFirst", date.getFullYear(), date.getMonth() + 1, date.getDate());

    }

    controllerDateListEnd(date: Date, dateList) {
        //处理日期尾部
        date.setDate(date.getDate() + 1);

        for (let i = 0; i < 6; i++) {
            if (!dateList[dateList.length - 1][date.getDay()]) {
                dateList[dateList.length - 1][date.getDay()] = {
                    date: ("0" + date.getDate()).slice(-2),
                    day: date.getDay(),
                    year: date.getFullYear() + "",
                    month: ("0" + (date.getMonth() + 1)).slice(-2),
                    primary: false,
                    fullDate: date.getFullYear() + "" + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + i).slice(-2)
                };

                dateList[dateList.length - 1][date.getDay()]['mark'] = this.markDateList.findIndex(item => item == dateList[dateList.length - 1][date.getDay()].fullDate) > -1 ? true : false;

            }

            date.setDate(date.getDate() + 1);
        }

        console.log("controllerDateListEnd", date.getFullYear(), date.getMonth() + 1, date.getDate());
    }

    initCurrentDate() {
        if (this.currentDate) {
            let strings: Array<string> = this.currentDate.split("-");
            let year = strings[0];
            let month = strings[1];
            let date = strings[2];
            this.yearSlides.slideTo(this._yearList.findIndex(item => item == year));
            this.monthSlides.slideTo(this._monthList.findIndex(item => item == month) + 1);

            let currentDate = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(date, 10));

            this.currentWeek = this._weekList[currentDate.getDay()];
        }
    }

}
