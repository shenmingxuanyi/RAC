import {Component} from '@angular/core';

import {NavController, ModalController} from 'ionic-angular';
import {FujianModalPage} from "../fujian-modal/fujian-modal";
import {RiliModalPage} from "../rili-modal/rili-modal";

declare var cordova: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    date: string = "2017-01-09";

    constructor(public navCtrl: NavController, public modalController: ModalController) {

    }

    openFujianPage($event) {
        this.modalController.create(FujianModalPage).present({});
    }

    openRiliPage($event) {
        let dateModal = this.modalController.create(RiliModalPage, {
            currentDate: this.date,
            markDateList: ['2017-01-11', '2017-01-13', '2017-01-27', '2017-02-12', '2018-01-01']
        }, {});

        dateModal.onWillDismiss((date) => {
            this.date = date;
        })
        dateModal.present({});
    }

    openLocation($event) {
        if (cordova && cordova['plugins'] && cordova['plugins']['SSCLocation'] && cordova["plugins"]['SSCLocation']['start']) {
            cordova['plugins']['SSCLocation']['start']((data) => {
                console.log(data);
            }, (error) => {
                console.log(error);
            })
        }

        console.log(cordova.plugins.SSCLocation)
        console.log(cordova.plugins.SSCLocation.start)
    }

}
