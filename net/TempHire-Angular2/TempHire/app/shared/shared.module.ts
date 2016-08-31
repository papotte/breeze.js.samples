import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewLineDirective } from './directives/common';
import { UnitOfWork } from './services/common';

@NgModule({
    imports: [CommonModule],
    declarations: [
        NewLineDirective
    ],
    exports: [
        NewLineDirective
    ],
    providers: [UnitOfWork]
})
export class SharedModule { }