import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AuthComponent,
    ],

    imports: [
        FormsModule,
        RouterModule.forChild([{ path: '', component: AuthComponent }]),
        SharedModule,
    ],
    exports: [
        RouterModule
    ]
})
export class AuthModule {

}