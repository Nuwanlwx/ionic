import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NetworkCheckService } from './services/network/network-check.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.scss'],
})

export class AppComponent implements OnInit {
  registerForm: FormGroup;
    submitted = false;
  // Let's have all needed application data in a single data-set.
  // TODO:
  // 1. This need to be stored in local storage to work offline
  // 2. Need to be fetched/sync with central data-set for remote update
  public appData = {
    config: {
      version: '0.18.2', // Current application (will be overwritem by confix.xml value)

      // Dashboard display sorting is done based on this setting
      sortSetting: [
        {
          by: 'update', order: -1, icon: 'alarm',
          orderIcon: 'arrow-down', userText: 'by Active Site'
        }, // Recently updated site on the top (-1: descending)
        {
          by: 'delay', order: -1, icon: 'medkit',
          orderIcon: 'arrow-down', userText: 'by Delay'}, // Most delayed site on top (-1: descending)
        {
          by: 'done', order: 1, icon: 'paper-plane',
          orderIcon: 'arrow-up', userText: 'by Completion'}, // Least completed site on top (+1: assending)
      ],

      // Application left menu
      menu: [

        {title: 'Dashboard', url: '/dashboard', icon: 'easel'},
        {title: 'Survey', url: '/survey', icon: 'stats'},
        {title: 'Survey-New', url: '/line-list', icon: 'stats'},
        {title: 'Task Update', url: '/second-line-list', icon: 'stats'},
        // {title: 'Site List', url: '/site-list', icon: 'list'},
        // {title: 'Line Specs', url: '/site-spec', icon: 'clipboard'},
        {title: 'Notifications', url: '/notification', icon: 'clipboard'},
        // {title: 'Login', url: '/login', icon: 'log-in'},
        {title: 'Settings', url: '/settings', icon: 'settings'},
        {title: 'Dashboard', url: '/main-dashboard', icon: 'easel'},
        // {title: 'Status Update', url: '/update-site-stage', icon: 'checkbox'},
      ],

      // TODO: to be used in 'Update Weather' page
      weatherSetting: [
        {text: 'Sunny', icon: 'sunny'},
        {text: 'Rainy', icon: 'rainy'},
        {text: 'Thunderstorm', icon: 'thunderstorm'},
        {text: 'Cloudy', icon: 'cloudy'},
        {text: 'Flash', icon: 'flash'},
        {text: 'Cloudy Night', icon: 'cloudy-night'},
        {text: 'Partly Sunny', icon: 'partly-sunny'}
      ],

      hourList: [
        {title: '0 to 1 am'},
        {title: '1 to 2 am'},
        {title: '3 to 4 am'},
        {title: '4 to 5 am'},
        {title: '5 to 6 am'},
        {title: '7 to 8 am'},
        {title: '8 to 9 am'},
        {title: '9 to 10 am'},
        {title: '10 to 11 am'},
        {title: '11 to 12 pm'},
        {title: '12 to 1 pm'},
        {title: '1 to 2 pm'},
        {title: '2 to 3 pm'},
        {title: '3 to 4 pm'},
        {title: '4 to 5 pm'},
        {title: '5 to 6 pm'},
        {title: '7 to 8 pm'},
        {title: '8 to 9 pm'},
        {title: '9 to 10 pm'},
        {title: '10 to 11 pm'},
        {title: '11 to 12 am'},
      ],

      // TODO: to be used in 'Update Weather' page
      siteStageSetting: [
        {stage: 1, text: 'Survey', image: 'survey.png'},
        {stage: 2, text: 'Soil', image: 'soil.png'},
        {stage: 3, text: 'Facility', image: 'facility.png'},
        {stage: 4, text: 'Pit', image: 'pit.png'},
        {stage: 5, text: 'Foundation', image: 'foundation.png'},
        {stage: 6, text: 'Pre-erraction', image: 'pre-erraction.png'},
        {stage: 7, text: 'Erraction', image: 'erraction.png'},
        {stage: 8, text: 'Stringing', image: 'stringing.png'},
        {stage: 9, text: 'Earthing', image: 'earthing.png'},
        {stage: 10, text: 'Done', image: 'done.png'}
      ]
    },
    lineList: [
      {
        id: 1, code: '1A01', name: 'PUTTALAM TO KEERIYANKALLIYA', start_loc: 'PUTTALAM', end_loc: 'KEERIYANKALLIYA',
        length: 50, progress: 2.58,  tower_count: 99 , created_ts: '2019-06-15 13:38:20' , updated_ts: '2019-06-30 19:48: 33'
      },
      {
        id: 1, code: '1A02', name: 'MALLAWAPITIYA TO RATHMALGODA ', start_loc: ' PUTTALAM ', end_loc: 'KEERIYANKALLIYA',
        length: 40, progress: 1.93,  tower_count: 65 , created_ts: '2019-06-15 13:38:20' , updated_ts: '2019-07-02 10:14:36'
      },
      {
        id: 1, code: '1A03', name: 'MAHO TO MAELIYA 33 kV DOUBLE CIRCUIT TOWER LINE', start_loc: 'PUTMAHO ', end_loc: 'MAELIYATALAM',
        length: 50, progress: 2.58,  tower_count: 99 , created_ts: '2019-06-15 13:38:20' , updated_ts: '2019-06-30 19:48: 33'
      },
      {
        id: 1, code: '1A04', name: 'KAPPALTHURAIY TO 6TH MILE POST', start_loc: 'KAPPALTHURAIY', end_loc: '6TH MILE POST',
        length: 14, progress: 0.00,  tower_count: 30 , created_ts: '2019-06-15 13:38:21' , updated_ts: '2019-06-15 13:38:21'
      },
      {
        id: 1, code: '1A05', name: ' AMPARA TO UHANA', start_loc: 'AMPARA', end_loc: 'UHANA',
        length: 12, progress: 0.00,  tower_count: 40 , created_ts: '2019-06-15 13:38:21' , updated_ts: '2019-06-15 13:38:21'
      }
    ],

    // The site list permitted to access
    siteList: [
      {
        id: 1, title: 'Tower 1', update: 1558915200, delay: 12, done: 0.8,
        stage: 9, weather: 'sunny', type: 'tower'
      },
      {
        id: 2, title: 'Tower 2', update: 1558656000, delay: 28, done: 0.2,
        stage: 2, weather: 'rainy', type: 'tower'
      },
      {
        id: 3, title: 'Substation 3', update: 1550880000, delay: 20, done: 0.9,
        stage: 8, weather: 'thunderstorm', type: 'substation'
      },
      {
        id: 4, title: 'Tower 4', update: 1556841600, delay: 0, done: 0.4,
        stage: 4, weather: 'sunny', type: 'tower'
      },
      {
        id: 5, title: 'Tower 5', update: 1558656000, delay: 8, done: 0.5,
        stage: 5, weather: 'cloudy', type: 'tower'
      },
      {
        id: 6, title: 'Tower 6', update: 1558310400, delay: 13, done: 0.6,
        stage: 6, weather: 'flash', type: 'tower'
      },
      {
        id: 7, title: 'Tower 7', update: 1550880000, delay: 15, done: 0.7,
        stage: 7, weather: 'cloudy-night', type: 'tower'
      },
      {
        id: 8, title: 'Tower 8', update: 1558656000, delay: 8, done: 0.1,
        stage: 1, weather: 'partly-sunny', type: 'tower'
      },
      {
        id: 9, title: 'Tower 9', update: 1556841600, delay: 17, done: 0.3,
        stage: 2, weather: 'cloudy-night', type: 'tower'
      },
      {
        id: 10, title: 'Tower 10', update: 1558310400, delay: 0, done: 1,
        stage: 10, weather: 'partly-sunny', type: 'tower'
      },
      {
        id: 11, title: 'Tower 11', update: 1558310400, delay: 0, done: 0,
        stage: 1, weather: 'partly-sunny', type: 'tower'
      }
    ],

    // Initialization of delay which will be calculated/populated latr using overall delay on site list
    maxDelay: 0,

    // Site ID in focus; 0 means no site in focus
    siteInFocus: 0,

    // Dashboard display sorting is done based on this setting
    sortSetting: [
      {
        by: 'update', order: -1, icon: 'alarm',
        orderIcon: 'arrow-down', userText: 'by Active Site'
      }, // Recently updated site on the top (-1: descending)
      {
        by: 'delay', order: -1, icon: 'medkit',
        orderIcon: 'arrow-down', userText: 'by Delay'}, // Most delayed site on top (-1: descending)
      {
        by: 'done', order: 1, icon: 'paper-plane',
        orderIcon: 'arrow-up', userText: 'by Completion'}, // Least completed site on top (+1: assending)
    ],

   
 
    // weather list
    weatherList: [
      {id: 1, title: 'sunny'},
      {id: 2, title: 'rainy'},
      {id: 3, title: 'thunderstorm'},
      {id: 4, title: 'cloudy'},
      {id: 5, title: 'flash'},
      {id: 6, title: 'cloudy-night'},
      {id: 7, title: 'cloudy-night'},
      {id: 8, title: 'partly-sunny'},

    ],
     //  siteSpec list
     siteSpecList: [
      {id: 1 ,  title:'Tower1' , type:'F1'},
      {id: 2 ,  title:'Tower2' , type:'F1'},
      {id: 3 ,  title:'Tower3' , type:'F2'},
      {id: 4 ,  title:'Tower4' , type:'F1'},
      {id: 5 ,  title:'Tower5' , type:'F3'},
      {id: 6 ,  title:'Tower6' , type:'F1'},
      {id: 7 ,  title:'Tower7' , type:'F1'},
      {id: 8 ,  title:'Tower8' , type:'F2'},
      {id: 9 ,  title:'Tower9' , type:'F3'},
      {id: 10,  title:'Tower10', type:'F1'}

    ]
  };

  // Function to sort the data-set before display (Dashboard)
  public sortDataSet() {
    // Arrange sorting configuration as the priority (seq) given
    const sortSetting = this.appData.config.sortSetting;
    // Sort the data set as per each setting
    for (let i = sortSetting.length; i > 0; i--) {
      const setting = sortSetting[i - 1];
      this.appData.siteList.sort((site1, site2) => setting.order * (site1[setting.by] - site2[setting.by]));
    }
  }

  public setMaxDelay() {
    return this.appData.maxDelay = this.appData.siteList.reduce((md, s) => Math.max(md, s.delay), 0);
  }

  public getMaxDelay() {
    return this.appData.maxDelay;
  }

  public setDisplayPara() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const maxDelay = this.setMaxDelay();
    // Amending site data with display specific parameters
    this.appData.siteList = this.appData.siteList.map(site => {
      const uDate = new Date(site.update * 1000);
      return Object.assign(site, {
        // Site delay as a % of overall delay
        delayPercent: Math.round(site.delay / maxDelay * 100) + '%',
        // On time completion of the size as a % of overall delay
        onTimePercent: Math.round((maxDelay - site.delay) / maxDelay * 100) + '%',
        // Completed % of the site
        donePercent: Math.round(site.done * 100) + '%',
        // Pending work as a % of the totoal site work
        pendingPercent: Math.round((1 - site.done) * 100) + '%',
        // Possition to place the text indicating current state
        stageTextPos: Math.max(Math.round((1 - Math.max(site.done, 0.1)) * 100), 10) + '%',
        // Possition to place the text box indicating current state
        stageTextBoxPos: Math.round((1 - site.done - 0.1) * 100) + '%',
        // Background image using in site data tile
        image: 'url(../../../assets/images/' + site.type + '.png)',
        displayDate: '' + uDate.getDate() + '-' + months[uDate.getMonth()],
        // Current stage text
        stageText: this.appData.config.siteStageSetting.find(setting => setting.stage === site.stage).text
      });
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private networkCheck: NetworkCheckService,
    private storage: Storage) {
    this.initializeApp();
  }
  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }

  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.networkCheck.getConnectionStatus();
    });
  }
}
