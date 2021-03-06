import {Component, AfterViewInit, NgZone} from '@angular/core';
import {ServerService} from "../../../provider/ServerService";
import * as myMusic from "../music/musicexport";

declare var firebase;
declare var $;

declare var google;

declare var TweenMax;
declare var Bounce;
declare var Circ;
declare var Back;

@Component({
    selector: 'main-page',
    styleUrls: ['client/modules/home/main/main.component.css'],
    templateUrl: `client/modules/home/main/main.component.html`,
})
export class MainPage implements AfterViewInit {


    zone;

    firstCommitLogo:boolean = false;

    loader;

    textMessage1= "test";
    textMessage2= "test";
    textMessage3= "test";

    word_logo;
    img_logo;
    map_container;
    map_overlay;
    map;

    aud;

    extraMap;

    lat = `40.3503270`;
    lng = `-74.6526860`;

    CurrentCenter;

    //Reverse
    ReverseiPhoneContactList;

    //Containers to animate
    RestaurantList;


    //Picture to show on phone
    mainContact = "jason";

    //MUSIC
    AllMusic;

    //Containers to show
    ShowRestaurantList: boolean = false;
    ShowContactList: boolean = false;
    ShowMusicList: boolean = false;
    ShowMyOwnMusic: boolean = false;
    ShowIndividualContactMessage: boolean = false;
    ShowLightList: boolean = false;


    //DATA TO SHOW ON PAGE
        //Restaurant List
        myFoods;
        my6Foods:any[] = [];


    constructor(private serverService: ServerService) { }

    ngAfterViewInit(){

        // console.log(JSON.parse(myMusic.data));


        let music_list = JSON.parse(myMusic.data);
        this.AllMusic = music_list.music;
        console.log(this.AllMusic);

        this.zone = new NgZone({enableLongStackTrace: false});
        let valueChanged = firebase.database().ref("/Listener");

        valueChanged.on("value", (snapshot) => {

            let obj = snapshot.val();
            console.log(obj);


            this.zone.run(() => {
                Object.keys(obj).forEach((key) => {
                    if(obj[key].active === 1){
                        this[key](key, obj);
                    }
                });
            });

        });

        this.CurrentCenter = {lat: 40.3503270, lng: -74.6526860};

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: this.CurrentCenter
        });


        var marker = new google.maps.Marker({
            position: this.CurrentCenter,
            map: this.map
        });



        // $(document).ready(function() {
            google.maps.event.addListener(this.map, "idle", () => {
                console.log("went in here");
                google.maps.event.trigger(this.map, 'resize');
            });
        // });

        // Zoom Level
        // 1 World
        // 5 Landmasscontinent
        // 10 City
        // 15 Streets
        // 20 Buildings


        //MAPSIZE
        this.map_container = $("#map");
        this.map_overlay = $(".map-overlay");
        //GRAB THE LOGO ID
        this.img_logo = $(".robot-container")[0];
        this.loader = $("#logo-box");
        this.word_logo = $(".logo-container")[0];

        //RestaurantList
        this.RestaurantList = $(".restaurant-list")[0];

        // this.loader.css("display", "");


    }

    refreshSkill(skill){
        this.serverService.Refresh_ActiveSkill(skill).subscribe(
            (data) => {
                console.log("Sucessfylly changed the data");
            }, (err) => {
                console.log(err);
            }
        );
    }

    refreshSkillForRefresh(skill){
        this.serverService.Refresh_ActiveSkillForRefresh(skill).subscribe(
            (data) => {
                console.log("Sucessfylly changed the data");
                window.location.reload(true);
            }, (err) => {
                console.log(err);
            }
        );
    }

    ResizeLogo(){
        console.log("went here");
        this.firstCommitLogo = true;
        TweenMax.to(this.word_logo, 1, {left: '0',ease:Back.easeInOut});
        TweenMax.to(this.img_logo, 1.5, {scale: 0.3, rotation: 360,left: '36%',top: '2%',ease:Back.easeInOut});
    }

    WhoAreYou(skill){
        console.log(`You just called ${skill}`);
        this.refreshSkill(skill);
    }

    LookUpFoodPlaces(skill){
        console.log(`You just called ${skill}`);

        let doThis = () => {
            var cent = this.map.getCenter();
            google.maps.event.trigger(this.map,"resize");
            this.map.setCenter(cent);
        }

        if(!this.firstCommitLogo){
            this.ResizeLogo();
            TweenMax.to(this.map_container, 1, {width: '50%',ease:Back.easeInOut, onComplete: doThis});
            TweenMax.to(this.map_overlay, 1, {width: '50%',ease:Back.easeInOut});
        };

        this.loader.css("display", "");

            // var cent = this.map.getCenter();
            // google.maps.event.trigger(this.map,"resize");
            // this.map.setCenter(cent);

        this.serverService.GetNearByRestaurant(this.lat, this.lng, 'restaurant', 'food').subscribe(
            (data) => {
                this.loader.css("display", "none");
                let result = JSON.parse(data.body);

                this.myFoods = result.results;
                console.log(this.myFoods);

                for(let i = 0; i < this.myFoods.length; i++){
                    if(this.myFoods[i].photos){
                        if(this.my6Foods.length <= 5){
                            this.my6Foods.push(this.myFoods[i]);
                        };
                    };
                };

                console.log(this.my6Foods);
                console.log("bruh");

                this.ShowRestaurantList = true;
                setTimeout(() => {
                    let restaurantList = $("#main-bruh");
                    TweenMax.to(restaurantList, 0.5, {scale: 1,ease:Circ.easeInOut});
                },500);
                // console.log(restaurantList)

                // data.body.results = this.myFoods;
            }, (err) => {
                console.log(err);
            }
        );

        // setTimeout(() => {
        //     console.log(this.map);
        // }, 2500);


        this.refreshSkill(skill);
    }

    SendTextLocation(skill){
        console.log(`You just called ${skill}`);
        this.refreshSkill(skill);
    }

    CallSpecificIndividual(skill){
        console.log(`You just called ${skill}`);
        this.refreshSkill(skill);
    }

    OpenContactList(skill){
        console.log(`You just called ${skill}`);

        let doThis = () => {
            var cent = this.map.getCenter();
            google.maps.event.trigger(this.map,"resize");
            this.map.setCenter(cent);
        }

        if(!this.firstCommitLogo){
            this.ResizeLogo();
            TweenMax.to(this.map_container, 1, {width: '50%',ease:Back.easeInOut, onComplete: doThis});
            TweenMax.to(this.map_overlay, 1, {width: '50%',ease:Back.easeInOut});
        };

        this.loader.css("display", "");
        this.ShowContactList = true;
        setTimeout(() => {
            let contactList = $("#contact-id");
            this.loader.css("display", "none");
            TweenMax.to(contactList, 0.5, {scale: 1,ease:Circ.easeInOut});
        },3000);

        this.refreshSkill(skill);
    }

    SaveContactToFavorite(skill){
        console.log(`You just called ${skill}`);
        this.refreshSkill(skill);
    }

    OpenGPS(skill){
        console.log(`You just called ${skill}`);
        this.refreshSkill(skill);
    }

    SaveCurrentDestination(skill){
        console.log(`You just called ${skill}`);
        this.refreshSkill(skill);
    }

    TextSpecificIndividual(skill, obj){
        console.log(`You just called ${skill}`);

        let res = obj[skill].respond;
        this.mainContact = res;

        let iphoneScreenList = $(".my-contact-list");
        this.ReverseiPhoneContactList = TweenMax.to(iphoneScreenList[0], 1, {scale: '0',ease:Back.easeInOut});



        setTimeout(() => {
            let iphoneMessageArea = $(".contact-message-page");
            iphoneMessageArea.css("opacity","1");
            TweenMax.from(iphoneMessageArea[0], 0.5, {scale: '0',ease:Back.easeInOut});
        }, 500);


        setTimeout(() => {
           // let message1 = $("#message1");
           // let message2 = $("#message2");
           // let message3 = $("#message3");
           //  TweenMax.to(message1[0], 2, {y: '-40px',opacity: 1,ease:Back.easeInOut});
           //  TweenMax.to(message2[0], 2, {y: '-40px',opacity: 1,ease:Back.easeInOut});
           //  TweenMax.to(message3[0], 2, {y: '-40px',opacity: 1,ease:Back.easeInOut});
        }, 4000);

        // console.log(this.ReverseiPhoneContactList);


        this.refreshSkill(skill);
    }

    GoBackToMain(skill){
        console.log(`You just called ${skill}`);
        this.refreshSkill(skill);
    }

    GoBackPrevious(skill){
        console.log(`You just called ${skill}`);
        this.refreshSkill(skill);
    }

    SetLocationAsDestinationForGps(skill){
        console.log(`You just called ${skill}`);
        this.refreshSkill(skill);
    }

    CallLocation(skill){
        console.log(`You just called ${skill}`);
        this.refreshSkill(skill);
    }

    LetsPlayAGame(skill){
        console.log(`You just called ${skill}`);
        this.refreshSkill(skill);
    }

    ChooseAGame(skill){
        console.log(`You just called ${skill}`);
        this.refreshSkill(skill)
    }

    OpenMusicUp(skill){
        console.log(`You just called ${skill}`);

        let doThis = () => {
            var cent = this.map.getCenter();
            google.maps.event.trigger(this.map,"resize");
            this.map.setCenter(cent);
        }

        if(!this.firstCommitLogo){
            this.ResizeLogo();
            TweenMax.to(this.map_container, 1, {width: '50%',ease:Back.easeInOut, onComplete: doThis});
            TweenMax.to(this.map_overlay, 1, {width: '50%',ease:Back.easeInOut});
        };

        this.loader.css("display", "");
        this.ShowMusicList = true;
        setTimeout(() => {
            let musicList = $("#music-id");
            this.loader.css("display", "none");
            TweenMax.to(musicList, 0.5, {scale: 1,ease:Circ.easeInOut});
        },3000);

        this.refreshSkill(skill);
    }

    CreateNotification(skill){
        console.log(`You just called ${skill}`);
        this.refreshSkill(skill);
    }

    OpenMyMusicUp(skill){
        console.log(`You just called ${skill}`);
        this.loader.css("display", "");
        this.ShowMusicList = true;
        this.ShowMyOwnMusic = true;
        let overallMusic = $(".internal-music-container")[0];
        TweenMax.to(overallMusic, 0.5, {scale: 0,ease:Circ.easeInOut});
        setTimeout(() => {
            // let musicList = $("#music-id");
            this.loader.css("display", "none");
            // TweenMax.to(musicList, 0.5, {scale: 1,ease:Circ.easeInOut});

            this.aud = $("#audio");
            // this.aud.attr('src', 'https://s3.amazonaws.com/videos564123/safedrive/loveyourself.mp3');
            // console.log($("#audio"));
            // this.aud[0].play();


            let myMusic = $(".own-music-list-background")[0];
            console.log(myMusic);
            TweenMax.to(myMusic, 0.5, {scale: 1,ease:Circ.easeInOut});

        },2000);




        this.refreshSkill(skill)
    }

    CheckHomeStatus(skill){
        console.log(`You just called ${skill}`);


        let doThis = () => {
            var cent = this.map.getCenter();
            google.maps.event.trigger(this.map,"resize");
            this.map.setCenter(cent);
        }

        if(!this.firstCommitLogo){
            this.ResizeLogo();
            console.log("yesh");
            TweenMax.to(this.map_container, 1, {width: '50%',ease:Back.easeInOut, onComplete: doThis});
            TweenMax.to(this.map_overlay, 1, {width: '50%',ease:Back.easeInOut});
        };

        this.loader.css("display", "");
        this.ShowLightList = true;
        setTimeout(() => {
            let lightContainer = $("#light-id");
            console.log(lightContainer);
            this.loader.css("display", "none");
            TweenMax.to(lightContainer, 0.5, {scale: 1,ease:Circ.easeInOut});
        },1500);





        this.refreshSkill(skill)
    }

    TurnOffLight(skill){
        console.log(`You just called ${skill}`);
        this.serverService.ServerTurnOfLight().subscribe(
            (data) => {
                console.log("Sycessfykly");
                console.log(data);
            }, (err) => {
                console.log(err);
            }
        );
        this.refreshSkill(skill)
    }

    TurnOnLight(skill){
        console.log(`You just called ${skill}`);

        this.serverService.ServerTurnOnLight().subscribe(
            (data) => {
                console.log("Sycessfykly");
                console.log(data);
            }, (err) => {
                console.log(err);
            }
        );;

        this.refreshSkill(skill)
    }

    OpenMusicAndPlayPhrase(skill, respond){

        console.log(`You just called ${skill}`);

        let trackNumber = respond[skill].respond;
        this.MusicAudioPlayerPhrase(trackNumber);

        this.refreshSkill(skill)
    }

    OpenMusicAndPlayTrack(skill, respond){
        console.log(`You just called ${skill}`);

        let trackNumber = respond[skill].respond;

        this.MusicAudioPlayerTrack(trackNumber);
        this.ChangeSongsText(trackNumber, false, null, null);
        this.refreshSkill(skill)
    }


    MusicAudioPlayerTrack(respond){
        this.aud[0].pause();

        let musicNum = respond - 1;

        let file = this.AllMusic[musicNum].file_link;
        console.log(file);
        this.aud.attr('src', file);
        this.aud[0].play();

    }

    MusicAudioPlayerPhrase(respond){
        this.aud[0].pause();
        console.log(respond);

        if(respond === 'lit'){
            this.aud.attr('src', "https://s3.amazonaws.com/videos564123/safedrive/juju.mp3");
            this.ChangeSongsText(respond,true, "Zay Hilfigerrr & Zaylon McCall", "Juju On That Beat");
            this.aud[0].play();
        }

        if(respond === 'sad'){
            this.aud.attr('src', "https://s3.amazonaws.com/videos564123/safedrive/saysomething.mp3");
            this.aud[0].play();
            this.ChangeSongsText(respond,true, "The Great Big World", "Say Something");
            this.aud[0].currentTime = 14;
        }
    }

    ChangeSongsText(respond, phrase, phraseTitle, phraseSong){
        let title = $(".artist-name")[0];
        let mysong = $(".album-title")[0];

        if(phrase){

            TweenMax.from(mysong, 1, {scale: 3,ease:Back.easeInOut});
            TweenMax.from(title, 1, {scale: 3,ease:Back.easeInOut});


            title.innerHTML = phraseTitle;
            mysong.innerHTML = phraseSong;

        }else{

            let musicNum = respond - 1;


            let newTitle = this.AllMusic[musicNum].author;
            let newSong = this.AllMusic[musicNum].song;


            TweenMax.from(mysong, 1, {scale: 3,ease:Back.easeInOut});
            TweenMax.from(title, 1, {scale: 3,ease:Back.easeInOut});


            title.innerHTML = newTitle;
            mysong.innerHTML = newSong;
        }

    }

    TextSinglePersonWithPhrase(skill, respond){

        console.log(`You just called ${skill}`);

        let theResponse = respond[skill].respond;
        console.log(theResponse);


        this.textMessage1 = theResponse;

        let message1 = $("#message1");

        // setTimeout(() => {
            TweenMax.to(message1[0], 2, {y: '-40px',opacity: 1,ease:Back.easeInOut});
        // },1000);

        this.refreshSkill(skill)

    }

    TextResponse(skill, respond){
        console.log(`You just called ${skill}`);
        let theResponse = respond[skill].respond;
        this.textMessage2 = theResponse;

        let message2 = $("#message2");
        TweenMax.to(message2[0], 2, {y: '-40px',opacity: 1,ease:Back.easeInOut});

        this.refreshSkill(skill)
    }

    TextResponseBackToHer(skill, respond){
        console.log(`You just called ${skill}`);
        let theResponse = respond[skill].respond;
        this.textMessage3 = theResponse;

        let message3 = $("#message3");
        TweenMax.to(message3[0], 2, {y: '-40px',opacity: 1,ease:Back.easeInOut});

        this.refreshSkill(skill)
    }


    RefreshEverything(skill){
        console.log(`You just called ${skill}`);
        this.refreshSkillForRefresh(skill)
    }




}



































