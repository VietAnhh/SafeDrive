import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgSemanticModule } from "ng-semantic";
import { CommonModule } from "@angular/common";

import { HomeComponent } from "./home.component";
import { routing } from "./home.routing";
import { SharedModule } from "../shared/shared.module";
import {MainPage} from "./main/main.component";
import {WelcomePage} from "./welcome/welcome.component";
import {RobotLogo} from "./robot/robot.component";
import {LogoComponent} from "./logo/logo.component";
import {LoaderComponent} from "./loader/loader.component";
import {PhonePage} from "./phone/phone.component";
import {MusicPage} from "./music/music.component";
import {LightComponent} from "./lightswitch/lightswitch.component";

@NgModule({
    imports: [
        CommonModule,
        routing,
        SharedModule.forRoot(),
        NgSemanticModule,
    ],
    declarations: [
        MainPage,
        RobotLogo,
        LogoComponent,
        PhonePage,
        MusicPage,
        LightComponent,
        LoaderComponent,
        WelcomePage,
        HomeComponent
    ],
    bootstrap: [
        HomeComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class HomeModule { }
