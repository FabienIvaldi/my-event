import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetInfoService } from '@app/services/get-info.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  event: any;
  map!: L.Map;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventPageService: GetInfoService
  ) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      // Получение события по slug
      this.eventPageService.getEventBySlug(slug).subscribe(
        (event) => {
          this.event = event;
          if (this.event && this.event.location_coordinates) {
            const latitude = this.event.location_coordinates.lat;
            const longitude = this.event.location_coordinates.lon;
            this.initMap(latitude, longitude);
          } else {
            this.initMap();
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  organizeEvent(): void {
    if (this.event) {
      const organizedEvents = JSON.parse(localStorage.getItem('organizedEvents') || '[]');
      organizedEvents.push(this.event);
      localStorage.setItem('organizedEvents', JSON.stringify(organizedEvents));

      this.router.navigate(['/profile']);
    }
  }

  private initMap(latitude: number = 48.8566, longitude: number = 2.3522): void {
    this.map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([latitude, longitude]).addTo(this.map)
      .bindPopup('Lieu de l\'événement')
      .openPopup();
  }
}