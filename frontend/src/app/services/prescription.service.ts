import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Prescription {
  id?: number;
  date: string;
  patientName: string;
  age: number;
  gender: string;
  diagnosis: string;
  medicines: string;
  nextVisitDate: string;
}

export interface PrescriptionPage {
  content: Prescription[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface DailyPrescriptionCount {
  [key: string]: number;
}

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private apiUrl = 'http://localhost:8081/api/v1/prescription';

  constructor(private http: HttpClient) {}

  getPrescriptions(
    page: number = 0,
    size: number = 10,
    startDate?: string,
    endDate?: string,
    search?: string
  ): Observable<PrescriptionPage> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (startDate) {
    }
    if (endDate) {
    }
    if (search) {
    }

    return this.http.get<PrescriptionPage>(this.apiUrl, { params });
  }

  getPrescriptionById(id: number): Observable<Prescription> {
    return this.http.get<Prescription>(`${this.apiUrl}/${id}`);
  }

  createPrescription(prescription: Prescription): Observable<Prescription> {
    return this.http.post<Prescription>(this.apiUrl, prescription);
  }

  updatePrescription(id: number, prescription: Prescription): Observable<Prescription> {
    return this.http.put<Prescription>(`${this.apiUrl}/${id}`, prescription);
  }

  deletePrescription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDailyStats(lastDays: number = 10): Observable<DailyPrescriptionCount> {
    let params = new HttpParams().set('lastDays', lastDays.toString());
    return this.http.get<DailyPrescriptionCount>(`${this.apiUrl}/report/daywise`, { params });
  }
}
