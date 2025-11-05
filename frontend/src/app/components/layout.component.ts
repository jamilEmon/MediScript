import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="layout-container">
      <aside class="sidebar" [class.open]="sidebarOpen">
        <div class="sidebar-header">
          <h2>MediScript</h2>
          <button class="close-btn" (click)="toggleSidebar()">×</button>
        </div>

        <nav class="sidebar-nav">
          <a routerLink="/dashboard" routerLinkActive="active" (click)="closeSidebarOnMobile()">
            <span class="icon"></span>
            <span>Dashboard</span>
          </a>
          <a routerLink="/prescriptions" routerLinkActive="active" (click)="closeSidebarOnMobile()">
            <span class="icon"></span>
            <span>Prescriptions</span>
          </a>
          <a routerLink="/reports" routerLinkActive="active" (click)="closeSidebarOnMobile()">
            <span class="icon"></span>
            <span>Reports</span>
          </a>
          <a href="#" (click)="logout($event)" class="logout">
            <span class="icon"></span>
            <span>Logout</span>
          </a>
        </nav>
      </aside>

      <div class="main-content">
        <header class="top-header">
          <button class="menu-btn" (click)="toggleSidebar()">☰</button>
          <div class="header-right">
            <span class="user-name">{{ username }}</span>
          </div>
        </header>

        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>

    <div class="overlay" *ngIf="sidebarOpen" (click)="toggleSidebar()"></div>
  `,
  styles: [`
    .layout-container {
      display: flex;
      min-height: 100vh;
      background-color: #f5f7fa;
    }

    .sidebar {
      width: 250px;
      background-color: #0066cc;
      color: white;
      position: fixed;
      height: 100vh;
      left: 0;
      top: 0;
      transition: transform 0.3s ease;
      z-index: 1000;
    }

    .sidebar-header {
      padding: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .sidebar-header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
    }

    .close-btn {
      display: none;
      background: none;
      border: none;
      color: white;
      font-size: 28px;
      cursor: pointer;
      padding: 0;
      width: 30px;
      height: 30px;
      line-height: 1;
    }

    .sidebar-nav {
      padding: 20px 0;
    }

    .sidebar-nav a {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: all 0.3s;
    }

    .sidebar-nav a:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .sidebar-nav a.active {
      background-color: rgba(255, 255, 255, 0.15);
      color: white;
      border-left: 4px solid white;
    }

    .sidebar-nav .icon {
      margin-right: 12px;
      font-size: 18px;
    }

    .sidebar-nav .logout {
      margin-top: auto;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .main-content {
      flex: 1;
      margin-left: 250px;
      transition: margin-left 0.3s ease;
    }

    .top-header {
      background-color: white;
      padding: 15px 30px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .menu-btn {
      display: none;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #333;
    }

    .header-right {
      display: flex;
      align-items: center;
    }

    .user-name {
      color: #333;
      font-weight: 500;
    }

    .content {
      padding: 30px;
    }

    .overlay {
      display: none;
    }

    @media (max-width: 768px) {
      .sidebar {
        transform: translateX(-100%);
      }

      .sidebar.open {
        transform: translateX(0);
      }

      .close-btn {
        display: block;
      }

      .main-content {
        margin-left: 0;
      }

      .menu-btn {
        display: block;
      }

      .overlay {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
      }
    }
  `]
})
export class LayoutComponent implements OnInit {
  sidebarOpen = false;
  username = 'Admin';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebarOnMobile() {
    if (window.innerWidth <= 768) {
      this.sidebarOpen = false;
    }
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.toast.success('Logged out successfully');
  }
}
