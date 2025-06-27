import {Component} from '@angular/core';
import {HeaderComponent} from './shared/layout/header/header.component';
import {FooterComponent} from './shared/layout/footer/footer.component';
import {RouterOutlet} from '@angular/router';
import {Toast, ToastModule} from 'primeng/toast';
import {NgHttpLoaderComponent, Spinkit} from 'ng-http-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    ToastModule,
    Toast,
    NgHttpLoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  public spinkit = Spinkit;

}
