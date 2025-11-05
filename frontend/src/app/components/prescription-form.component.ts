import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PrescriptionService, Prescription } from '../services/prescription.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-prescription-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-page">
      <div class="form-header">
        <h1>{{ isEditMode ? 'Edit' : 'New' }} Prescription</h1>
        <button class="btn btn-secondary" (click)="goBack()">← Back</button>
      </div>

      <form [formGroup]="prescriptionForm" (ngSubmit)="onSubmit()" class="prescription-form">
        <div class="form-row">
          <div class="form-group">
            <label for="date">Prescription Date *</label>
            <input
              type="date"
              id="date"
              formControlName="date"
              required
              class="form-control"
            />
            <div *ngIf="prescriptionForm.get('date')?.invalid && prescriptionForm.get('date')?.touched" class="error-message">
              Date is required.
            </div>
          </div>

          <div class="form-group">
            <label for="nextVisitDate">Next Visit Date</label>
            <input
              type="date"
              id="nextVisitDate"
              formControlName="nextVisitDate"
              class="form-control"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="patientName">Patient Name *</label>
            <input
              type="text"
              id="patientName"
              formControlName="patientName"
              required
              class="form-control"
              placeholder="Enter patient name"
            />
            <div *ngIf="prescriptionForm.get('patientName')?.invalid && prescriptionForm.get('patientName')?.touched" class="error-message">
              Patient name is required.
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="age">Age</label>
            <input
              type="number"
              id="age"
              formControlName="age"
              min="0"
              max="120"
              class="form-control"
              placeholder="0-120"
            />
            <div *ngIf="prescriptionForm.get('age')?.invalid && prescriptionForm.get('age')?.touched" class="error-message">
              Age must be a positive number.
            </div>
          </div>

          <div class="form-group">
            <label for="gender">Gender</label>
            <select
              id="gender"
              formControlName="gender"
              class="form-control"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <div *ngIf="prescriptionForm.get('gender')?.invalid && prescriptionForm.get('gender')?.touched" class="error-message">
              Gender is required.
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="diagnosis">Diagnosis *</label>
          <textarea
            id="diagnosis"
            formControlName="diagnosis"
            required
            class="form-control"
            rows="4"
            placeholder="Enter diagnosis details"
          ></textarea>
          <div *ngIf="prescriptionForm.get('diagnosis')?.invalid && prescriptionForm.get('diagnosis')?.touched" class="error-message">
            Diagnosis is required.
          </div>
        </div>

        <div class="form-group">
          <label for="medicines">Medicines *</label>
          <textarea
            id="medicines"
            formControlName="medicines"
            required
            class="form-control"
            rows="6"
            placeholder="Enter prescribed medicines"
          ></textarea>
          <div *ngIf="prescriptionForm.get('medicines')?.invalid && prescriptionForm.get('medicines')?.touched" class="error-message">
            Medicines are required.
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" (click)="goBack()">
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            [disabled]="!prescriptionForm.valid || loading"
          >
            {{ loading ? 'Saving...' : (isEditMode ? 'Update' : 'Create') }} Prescription
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-page {
      max-width: 900px;
    }

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .form-header h1 {
      margin: 0;
      color: #333;
      font-size: 32px;
      font-weight: 700;
    }

    .prescription-form {
      background: white;
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      margin-bottom: 8px;
      color: #333;
      font-weight: 500;
      font-size: 14px;
    }

    .form-control {
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;
      transition: border-color 0.3s;
    }

    .form-control:focus {
      outline: none;
      border-color: #0066cc;
    }

    textarea.form-control {
      resize: vertical;
      min-height: 100px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #eee;
    }

    .btn {
      padding: 12px 24px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      border: none;
    }

    .btn-primary {
      background-color: #0066cc;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #0052a3;
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background-color: #5a6268;
    }

    .error-message {
      color: red;
      font-size: 12px;
      margin-top: 4px;
    }

    @media (max-width: 768px) {
      .form-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }

      .prescription-form {
        padding: 20px;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .form-actions {
        flex-direction: column-reverse;
      }

      .form-actions .btn {
        width: 100%;
      }
    }
  `]
})
export class PrescriptionFormComponent implements OnInit {
  prescriptionForm: FormGroup;
  isEditMode = false;
  loading = false;
  prescriptionId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private prescriptionService: PrescriptionService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastService
  ) {
    this.prescriptionForm = this.fb.group({
      date: [new Date().toISOString().split('T')[0], Validators.required],
      patientName: ['', Validators.required],
      age: [null, [Validators.min(0), Validators.max(120)]],
      gender: ['', Validators.required],
      diagnosis: ['', Validators.required],
      medicines: ['', Validators.required],
      nextVisitDate: ['']
    });
  }

  ngOnInit() {
    this.prescriptionId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.prescriptionId) {
      this.isEditMode = true;
      this.loadPrescription();
    }
  }

  loadPrescription() {
    if (!this.prescriptionId) return;

    this.prescriptionService.getPrescriptionById(this.prescriptionId).subscribe({
      next: (data: Prescription) => {
        this.prescriptionForm.patchValue(data);
      },
      error: (err) => {
        this.toast.error('Failed to load prescription');
        console.error(err);
        this.goBack();
      }
    });
  }

  onSubmit() {
    if (this.prescriptionForm.invalid) {
      this.prescriptionForm.markAllAsTouched();
      this.toast.error('Please fill in all required fields correctly.');
      return;
    }

    this.loading = true;
    const prescriptionData: Prescription = this.prescriptionForm.value;

    if (this.isEditMode && this.prescriptionId) {
      this.prescriptionService.updatePrescription(this.prescriptionId, prescriptionData).subscribe({
        next: () => {
          this.toast.success('Prescription updated successfully');
          this.goBack();
        },
        error: (err) => {
          this.toast.error('Failed to update prescription');
          console.error(err);
          this.loading = false;
        }
      });
    } else {
      this.prescriptionService.createPrescription(prescriptionData).subscribe({
        next: () => {
          this.toast.success('Prescription created successfully');
          this.goBack();
        },
        error: (err) => {
          this.toast.error('Failed to create prescription');
          console.error(err);
          this.loading = false;
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/prescriptions']);
  }
}
