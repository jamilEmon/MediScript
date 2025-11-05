import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PrescriptionService, Prescription, PrescriptionPage } from '../services/prescription.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="prescriptions-page">
      <div class="page-header">
        <h1>Prescriptions</h1>
        <button class="btn btn-primary" routerLink="/prescriptions/new">
          + New Prescription
        </button>
      </div>

      <div class="filters-section">
        <div class="filter-row">
          <div class="filter-group">
            <label>Start Date</label>
            <input type="date" [(ngModel)]="startDate" (change)="loadPrescriptions()">
          </div>
          <div class="filter-group">
            <label>End Date</label>
            <input type="date" [(ngModel)]="endDate" (change)="loadPrescriptions()">
          </div>
          <div class="filter-group flex-grow">
            <label>Search</label>
            <input
              type="text"
              [(ngModel)]="searchQuery"
              (ngModelChange)="onSearchChange()"
              placeholder="Search by patient name or diagnosis..."
            >
          </div>
        </div>
      </div>

      <div class="table-container">
        <table class="prescriptions-table" *ngIf="prescriptions.length > 0">
          <thead>
            <tr>
              <th>Date</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Diagnosis</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let prescription of prescriptions">
              <td>{{ formatDate(prescription.date) }}</td>
              <td>{{ prescription.patientName }}</td>
              <td>{{ prescription.age || '-' }}</td>
              <td>{{ prescription.gender || '-' }}</td>
              <td>{{ prescription.diagnosis || '-' }}</td>
              <td class="actions">
                <button
                  class="btn-icon edit"
                  (click)="editPrescription(prescription.id!)"
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  class="btn-icon delete"
                  (click)="confirmDelete(prescription)"
                  title="Delete"
                >
                  🗑️
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="no-data" *ngIf="prescriptions.length === 0 && !loading">
          <p>No prescriptions found</p>
          <button class="btn btn-primary" routerLink="/prescriptions/new">
            Create Your First Prescription
          </button>
        </div>

        <div class="loading" *ngIf="loading">
          <p>Loading...</p>
        </div>
      </div>

      <div class="pagination" *ngIf="totalPages > 1">
        <button
          class="btn btn-sm"
          (click)="goToPage(currentPage - 1)"
          [disabled]="currentPage === 0"
        >
          Previous
        </button>
        <span class="page-info">Page {{ currentPage + 1 }} of {{ totalPages }}</span>
        <button
          class="btn btn-sm"
          (click)="goToPage(currentPage + 1)"
          [disabled]="currentPage + 1 === totalPages"
        >
          Next
        </button>
      </div>
    </div>

    <div class="modal" *ngIf="showDeleteModal" (click)="closeModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this prescription for {{ prescriptionToDelete?.patientName }}?</p>
        <div class="modal-actions">
          <button class="btn btn-secondary" (click)="closeModal()">Cancel</button>
          <button class="btn btn-danger" (click)="deletePrescription()">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .prescriptions-page {
      max-width: 1400px;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .page-header h1 {
      margin: 0;
      color: #333;
      font-size: 32px;
      font-weight: 700;
    }

    .filters-section {
      background: white;
      padding: 24px;
      border-radius: 12px;
      margin-bottom: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .filter-row {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .filter-group {
      display: flex;
      flex-direction: column;
      min-width: 200px;
    }

    .filter-group.flex-grow {
      flex: 1;
    }

    .filter-group label {
      margin-bottom: 8px;
      color: #666;
      font-size: 14px;
      font-weight: 500;
    }

    .filter-group input {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
    }

    .filter-group input:focus {
      outline: none;
      border-color: #0066cc;
    }

    .table-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }

    .prescriptions-table {
      width: 100%;
      border-collapse: collapse;
    }

    .prescriptions-table thead {
      background-color: #f8f9fa;
    }

    .prescriptions-table th {
      padding: 16px;
      text-align: left;
      font-weight: 600;
      color: #333;
      font-size: 14px;
    }

    .prescriptions-table td {
      padding: 16px;
      border-top: 1px solid #eee;
      color: #666;
    }

    .prescriptions-table tbody tr:hover {
      background-color: #f8f9fa;
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    .btn-icon {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      padding: 4px 8px;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .btn-icon:hover {
      background-color: #f0f0f0;
    }

    .no-data {
      padding: 60px 20px;
      text-align: center;
      color: #666;
    }

    .no-data p {
      margin-bottom: 20px;
      font-size: 16px;
    }

    .loading {
      padding: 60px 20px;
      text-align: center;
      color: #666;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin-top: 24px;
    }

    .page-info {
      color: #666;
      font-size: 14px;
    }

    .btn {
      padding: 12px 24px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      border: none;
      text-decoration: none;
      display: inline-block;
    }

    .btn-primary {
      background-color: #0066cc;
      color: white;
    }

    .btn-primary:hover {
      background-color: #0052a3;
    }

    .btn-sm {
      padding: 8px 16px;
      font-size: 13px;
      background-color: white;
      color: #0066cc;
      border: 1px solid #0066cc;
    }

    .btn-sm:hover:not(:disabled) {
      background-color: #0066cc;
      color: white;
    }

    .btn-sm:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background-color: #5a6268;
    }

    .btn-danger {
      background-color: #dc3545;
      color: white;
    }

    .btn-danger:hover {
      background-color: #c82333;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }

    .modal-content {
      background: white;
      padding: 32px;
      border-radius: 12px;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }

    .modal-content h2 {
      margin: 0 0 16px 0;
      color: #333;
    }

    .modal-content p {
      color: #666;
      margin-bottom: 24px;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    @media (max-width: 768px) {
      .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }

      .filter-row {
        flex-direction: column;
      }

      .filter-group {
        width: 100%;
      }

      .prescriptions-table {
        font-size: 12px;
      }

      .prescriptions-table th,
      .prescriptions-table td {
        padding: 12px 8px;
      }
    }
  `]
})
export class PrescriptionsComponent implements OnInit {
  prescriptions: Prescription[] = [];
  loading = false;
  searchQuery = '';
  startDate = '';
  endDate = '';
  currentPage = 0;
  pageSize = 10;
  totalCount = 0;
  totalPages = 0;
  showDeleteModal = false;
  prescriptionToDelete: Prescription | null = null;
  searchTimeout: any;

  constructor(
    private prescriptionService: PrescriptionService,
    private router: Router,
    private toast: ToastService
  ) {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    this.startDate = firstDay.toISOString().split('T')[0];
    this.endDate = now.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.loadPrescriptions();
  }

  loadPrescriptions() {
    this.loading = true;
    this.prescriptionService.getPrescriptions(
      this.currentPage,
      this.pageSize,
      this.startDate,
      this.endDate,
      this.searchQuery
    ).subscribe({
      next: (pageData: PrescriptionPage) => {
        this.prescriptions = pageData.content;
        this.totalCount = pageData.totalElements;
        this.totalPages = pageData.totalPages;
        this.loading = false;
      },
      error: (err) => {
        this.toast.error('Failed to load prescriptions');
        console.error(err);
        this.loading = false;
      }
    });
  }

  onSearchChange() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.currentPage = 0;
      this.loadPrescriptions();
    }, 500);
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadPrescriptions();
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  editPrescription(id: number) {
    this.router.navigate(['/prescriptions/edit', id]);
  }

  confirmDelete(prescription: Prescription) {
    this.prescriptionToDelete = prescription;
    this.showDeleteModal = true;
  }

  closeModal() {
    this.showDeleteModal = false;
    this.prescriptionToDelete = null;
  }

  deletePrescription() {
    if (!this.prescriptionToDelete?.id) return;

    this.prescriptionService.deletePrescription(this.prescriptionToDelete.id).subscribe({
      next: () => {
        this.toast.success('Prescription deleted successfully');
        this.loadPrescriptions();
      },
      error: (err) => {
        this.toast.error('Failed to delete prescription');
        console.error(err);
      }
    });

    this.closeModal();
  }
}
