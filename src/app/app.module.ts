import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AlertController, IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Device } from '@ionic-native/device/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPopoverComponent } from './pages/filter-popover/filter-popover.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TaskUpdateModalPageModule } from './pages/task-update-modal/task-update-modal.module';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@NgModule({
  declarations: [AppComponent, NotificationsComponent, FilterPopoverComponent],
  entryComponents: [NotificationsComponent, FilterPopoverComponent],
  imports: [BrowserModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    TaskUpdateModalPageModule],
  providers: [
    StatusBar,
    Network,
    SplashScreen,
    Device,
    UniqueDeviceID,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // LocalNotifications
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    private router: Router,
    private alertController: AlertController,
    // private localNotifications: LocalNotifications
  ) { }

  async gotoHomePage() {
    this.doNavigate(0, '/');
  }

  async doNavigate(siteId, uri) {
    this.router.navigateByUrl(uri).catch(e => {
      console.log(e);
      this.pageMissingAlert(uri);
      event.stopPropagation();
    });
  }

  async pageMissingAlert(uri) {
    const alert = await this.alertController.create({
      header: 'Navigation Failed',
      subHeader: uri,
      message: 'Please contact Aasa IT via support@aasait.com or +94 11 3690702',
      buttons: ['OK']
    });

    await alert.present();
  }
}
