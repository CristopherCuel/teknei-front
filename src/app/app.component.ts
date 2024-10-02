import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonService } from './services/person.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PersonService]
})
export class AppComponent {
  title = 'tekneiFront';
}
