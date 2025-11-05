import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrescriptionService } from '../services/prescription.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard">
      <h1 class="page-title">Dashboard</h1>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon blue">📋</div>
          <div class="stat-content">
            <h3>Today's Prescriptions</h3>
            <p class="stat-value">{{ todayCount }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon green">📊</div>
          <div class="stat-content">
            <h3>This Month</h3>
            <p class="stat-value">{{ monthCount }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon orange">🏥</div>
          <div class="stat-content">
            <h3>Quick Actions</h3>
            <button class="btn btn-primary" routerLink="/prescriptions/new">
              New Prescription
            </button>
          </div>
        </div>
      </div>

      <div class="recent-section">
        <h2>Recent Activity</h2>
        <p class="section-desc">View and manage your prescriptions</p>
        <button class="btn btn-outline" routerLink="/prescriptions">
          View All Prescriptions
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1200px;
    }

    .page-title {
      color: #333;
      font-size: 32px;
      margin-bottom: 30px;
      font-weight: 700;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      display: flex;
      align-items: center;
      gap: 20px;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    }

    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
    }

    .stat-icon.blue {
      background-color: #e6f2ff;
    }

    .stat-icon.green {
      background-color: #e6f9f0;
    }

    .stat-icon.orange {
      background-color: #fff3e6;
    }

    .stat-content {
      flex: 1;
    }

    .stat-content h3 {
      margin: 0 0 8px 0;
      color: #666;
      font-size: 14px;
      font-weight: 500;
    }

    .stat-value {
      margin: 0;
      color: #0066cc;
      font-size: 32px;
      font-weight: 700;
    }

    .recent-section {
      background: white;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .recent-section h2 {
      margin: 0 0 8px 0;
      color: #333;
      font-size: 24px;
      font-weight: 600;
    }

    .section-desc {
      color: #666;
      margin: 0 0 20px 0;
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

    .btn-outline {
      background-color: transparent;
      color: #0066cc;
      border: 2px solid #0066cc;
    }

    .btn-outline:hover {
      background-color: #0066cc;
      color: white;
    }
  `]
})
export class DashboardComponent implements OnInit {
  todayCount = 0;
  monthCount = 0;

  constructor(private prescriptionService: PrescriptionService) {}

  ngOnInit() {
    this.prescriptionService.getDailyStats(30).subscribe(data => {
      const today = new Date().toISOString().split('T')[0];
      this.todayCount = data[today] || 0;

      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

      this.monthCount = Object.entries(data)
        .filter(([date]) => date >= firstDayOfMonth && date <= lastDayOfMonth)
        .reduce((sum, [, count]) => sum + count, 0);
    });
  }
}
