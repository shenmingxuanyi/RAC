import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

/*
 Generated class for the FujianModal page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-fujian-modal',
    templateUrl: 'fujian-modal.html'
})
export class FujianModalPage {

    list: Array<any> = [
        "./assets/image/image1.jpg",
        "./assets/image/image1.jpg",
        "./assets/image/image1.jpg",
        "./assets/image/image1.jpg",
        "./assets/image/image1.jpg",
        "./assets/image/image1.jpg",
        "./assets/image/image1.jpg",
        "./assets/image/image1.jpg"
    ]

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewController: ViewController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FujianModalPage');
    }

    close($event?) {
        this.viewController.dismiss()
    }

}
