import { Component, OnInit } from '@angular/core';
import { EvenementService } from '../../services/evenement.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-evenement-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './evenement-list.component.html',
  styleUrls: ['./evenement-list.component.css']
})
export class EvenementListComponent implements OnInit {
  events: any[] = [];
  errorMessage: string = '';
  searchTerm: string = '';
  selectedRegion: string = '';
  selectedDepartment: string = '';
  uniqueRegions: string[] = [];
  uniqueDepartments: string[] = [];
  userLatitude: number | undefined;
  userLongitude: number | undefined;

  constructor(private evenementService: EvenementService) { }

  ngOnInit(): void {
    this.getUserLocation();
    this.evenementService.getEvents()
      .subscribe(data => {
        this.events = data; 
        this.extractUniqueRegionsAndDepartments();
      }, error => {
        this.errorMessage = 'Erreur lors de la récupération des informations.';
      });
  }

  private getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLatitude = position.coords.latitude;
          this.userLongitude = position.coords.longitude;
        },
        (error) => {
          this.errorMessage = this.getErrorMessage(error);
        }
      );
    } else {
      this.errorMessage = "La géolocalisation n'est pas supportée par ce navigateur.";
    }
  }

  private extractUniqueRegionsAndDepartments(): void {
    const regions = new Set<string>();
    const departments = new Set<string>();
    this.events.forEach(event => {
      if (event.location_region) regions.add(event.location_region);
      if (event.location_department) departments.add(event.location_department);
    });
    this.uniqueRegions = Array.from(regions);
    this.uniqueDepartments = Array.from(departments);
  }

  private getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; //rayon de la terre
    const dLat = this.degToRad(lat2 - lat1);
    const dLon = this.degToRad(lon2 - lon1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degToRad(lat1)) * Math.cos(this.degToRad(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; 
    return distance;
  }

  private degToRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  filteredEvents(): any[] {
    return this.events.filter(event =>
      (!this.searchTerm || event.title_fr.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.selectedRegion || event.location_region === this.selectedRegion) &&
      (!this.selectedDepartment || event.location_department === this.selectedDepartment) &&
      this.isWithinDistance(event)
    );
  }

  private isWithinDistance(event: any): boolean {
    if (this.userLatitude !== undefined && this.userLongitude !== undefined) {
      const eventLat = event.location_coordinates?.lat;
      const eventLon = event.location_coordinates?.lon;
      if (eventLat !== undefined && eventLon !== undefined) {
        const distance = this.getDistance(this.userLatitude, this.userLongitude, eventLat, eventLon);
        return distance <= 100; // Modifier la distance ici (en kilomètres)
      }
    }
    return false;
  }

  applyFilters(): void {
  }

  private getErrorMessage(error: GeolocationPositionError): string {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return "L'utilisateur a refusé la demande de géolocalisation.";
      case error.POSITION_UNAVAILABLE:
        return "Les informations de localisation ne sont pas disponibles.";
      case error.TIMEOUT:
        return "La demande de localisation a expiré.";
      default:
        return "Une erreur inconnue est survenue.";
    }
  }
}
