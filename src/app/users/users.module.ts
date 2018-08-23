import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { MaterialModule } from '../app.module';
import { AutofocusDirective } from '../directives/auto-focus.directive';
import { UserComponent } from './user/user.component';
import { UserRoutes } from './users.routing';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutes),
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        GooglePlaceModule,
        MaterialModule
    ],
    declarations: [
        UserComponent,
        AutofocusDirective
    ]
})

export class UsersModule {}
