import { Component } from '@angular/core';
import { ModalController, NavController, LoadingController, ToastController, App } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
import { ItemDetailPage } from '../item-detail/item-detail';
import { LoginPage } from '../login/login';
//import { RegisterPage } from '../register/register';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];
  loading: any;
  isLoggedIn: boolean = false;

  constructor(public app: App, public authService: AuthService, public navCtrl: NavController, public modalCtrl: ModalController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    if(localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
  }

  logout() {
    this.authService.logout().then((result) => {
     this.loading.dismiss();
     let nav = this.app.getRootNav();
     nav.setRoot(LoginPage);
   }, (err) => {
     this.loading.dismiss();
     this.presentToast(err);
   });
  }

  showLoader(){
   this.loading = this.loadingCtrl.create({
       content: 'Authenticating...'
   });

   this.loading.present();
 }

 presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  ionViewDidLoad(){

  }
// Could add funcitonality here to save the items to a db

  addItem(){

    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {

          if(item){
            this.saveItem(item);

          }

    });

    addModal.present();

  }

  saveItem(item){
    this.items.push(item);
  }

  deleteItem(item){ 
    this.items.pop(item);
  }

  viewItem(item){
    this.navCtrl.push(ItemDetailPage, {
       item: item
     });
  }

}
