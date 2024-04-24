import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&&appid=${environment.apiKey}`
    );
  }

  getForecastWeather(city: string): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&&appid=${environment.apiKey}`
    );
  }

  getAirPollution(city: string): Observable<any> {
    return this.http
      .get<any>(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${environment.apiKey}`
      )
      .pipe(
        switchMap((geoData: any) => {
          const lat = geoData[0].lat;
          const lon = geoData[0].lon;

          return this.http.get<any>(
            `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${environment.apiKey}`
          );
        }),
        catchError((error) => {
          console.error('Error getting air pollution data:', error);
          throw error;
        })
      );
  }
}
