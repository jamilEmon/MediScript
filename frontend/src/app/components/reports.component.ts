import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrescriptionService, DailyPrescriptionCount } from '../services/prescription.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="reports-page">
      <h1 class="page-title">Reports</h1>

      <div class="chart-container">
        <div class="chart-header">
          <h2>Prescription Trends</h2>
          <p>Last 10 days prescription count</p>
        </div>
        <canvas #chartCanvas></canvas>
      </div>

      <div class="stats-summary">
        <div class="summary-card">
          <h3>Total (Last 10 Days)</h3>
          <p class="summary-value">{{ totalCount }}</p>
        </div>
        <div class="summary-card">
          <h3>Daily Average</h3>
          <p class="summary-value">{{ averageCount }}</p>
        </div>
        <div class="summary-card">
          <h3>Peak Day</h3>
          <p class="summary-value">{{ peakCount }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reports-page {
      max-width: 1200px;
    }

    .page-title {
      color: #333;
      font-size: 32px;
      margin-bottom: 30px;
      font-weight: 700;
    }

    .chart-container {
      background: white;
      padding: 32px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      margin-bottom: 30px;
    }

    .chart-header {
      margin-bottom: 24px;
    }

    .chart-header h2 {
      margin: 0 0 8px 0;
      color: #333;
      font-size: 24px;
      font-weight: 600;
    }

    .chart-header p {
      margin: 0;
      color: #666;
      font-size: 14px;
    }

    canvas {
      max-height: 400px;
    }

    .stats-summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
    }

    .summary-card {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      text-align: center;
    }

    .summary-card h3 {
      margin: 0 0 12px 0;
      color: #666;
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .summary-value {
      margin: 0;
      color: #0066cc;
      font-size: 36px;
      font-weight: 700;
    }

    @media (max-width: 768px) {
      .chart-container {
        padding: 20px;
      }

      canvas {
        max-height: 300px;
      }

      .stats-summary {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ReportsComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | null = null;
  dailyCounts: DailyPrescriptionCount = {};
  totalCount = 0;
  averageCount = 0;
  peakCount = 0;
  lastDays = 10;

  constructor(private prescriptionService: PrescriptionService) {}

  ngOnInit() {
    this.loadStats();
  }

  ngAfterViewInit() {
  }

  loadStats() {
    this.prescriptionService.getDailyStats(this.lastDays).subscribe({
      next: (data: DailyPrescriptionCount) => {
        this.dailyCounts = data;
        this.calculateSummary();
        this.renderChart();
      },
      error: (err) => {
        console.error('Failed to load daily stats:', err);
      }
    });
  }

  calculateSummary() {
    const counts = Object.values(this.dailyCounts);
    this.totalCount = counts.reduce((sum, count) => sum + count, 0);
    this.averageCount = counts.length > 0
      ? Math.round(this.totalCount / counts.length)
      : 0;
    this.peakCount = counts.length > 0
      ? Math.max(...counts)
      : 0;
  }

  renderChart() {
    if (!this.chartCanvas) return;

    const labels = Object.keys(this.dailyCounts).sort();
    const data = labels.map(label => this.dailyCounts[label]);

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Prescriptions',
          data,
          backgroundColor: 'rgba(0, 102, 204, 0.8)',
          borderColor: 'rgba(0, 102, 204, 1)',
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              precision: 0
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
}
