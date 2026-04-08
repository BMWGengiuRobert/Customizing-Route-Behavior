import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private router = inject(Router);

  backgroundLoadingMessage = signal<string | null>(null);

  ngOnInit() {
    this.onPreloadStart();
  }

  onPreloadStart() {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.backgroundLoadingMessage.set(`Background loading: /${event.route.path} ...`);
      } else if (event instanceof RouteConfigLoadEnd) {
        setTimeout(() => this.backgroundLoadingMessage.set(null), 1500);
      }
    });

  }
}
