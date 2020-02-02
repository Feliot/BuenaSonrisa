// GERMAN Molina hago este archivo para importar todo lo relacionado a Material.IO
// desde a este archivo y que el app me quede mas limpio
//https://material.io/resources/icons/?icon=fingerprint&style=baseline iconos!
import { MatSelectModule, MatSnackBarModule, MatRippleModule } from '@angular/material'
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import{ NgModule} from '@angular/core'
import {MatNativeDateModule} from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatSelectModule, MatIconModule, MatListModule,
        MatToolbarModule, MatMenuModule, MatTableModule, MatCardModule, MatFormFieldModule, 
        MatInputModule, MatDialogModule, MatSnackBarModule, MatPaginatorModule, MatRippleModule,
        MatDatepickerModule, MatNativeDateModule ],
    exports: [MatButtonModule, MatSelectModule, MatIconModule, MatListModule,
        MatToolbarModule, MatMenuModule, MatTableModule, MatCardModule, MatFormFieldModule,
         MatInputModule, MatDialogModule, MatSnackBarModule, MatPaginatorModule, MatRippleModule, 
         MatDatepickerModule, MatNativeDateModule],
})

export class MaterialModule{

}