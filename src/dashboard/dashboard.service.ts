import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

export interface MenuItem {
  productName: string;
  itemId: string;
  stock: number;
  category: string;
  price: number;
  availability: string;
  description: string;
  image: string;
}

export interface DashboardMetrics {
  dailySales: number;
  monthlyRevenue: number;
  tableOccupancy: number;
}

export interface OverviewData {
  month: string;
  sales: number;
  revenue: number;
}

@Injectable()
export class DashboardService {
  private readonly jsonServerUrl = 'http://localhost:3001';

  async getMenuItems(): Promise<MenuItem[]> {
    try {
      const response = await fetch(`${this.jsonServerUrl}/menuItems`);
      if (!response.ok) {
        throw new HttpException('Failed to fetch menu items', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new HttpException(
        'Error fetching menu items',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPopularDishes(): Promise<MenuItem[]> {
    try {
      const allItems = await this.getMenuItems();
      console.log(allItems);
      
      const popularItems = allItems
        .sort((a, b) => a.stock - b.stock)
        .slice(0, 4);
      return popularItems;
    } catch (error) {
      throw new HttpException(
        `Error fetching dashboard metrics: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    try {
      const response = await fetch(`${this.jsonServerUrl}/metrics`);
      if (!response.ok) {
        throw new HttpException('Failed to fetch metrics', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const data = await response.json();
      return {
        dailySales: data.dailySales,
        monthlyRevenue: data.monthlyRevenue,
        tableOccupancy: data.tableOccupancy
      };
    } catch (error) {
      throw new HttpException(
        `Error fetching dashboard metrics: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOverview(period: 'daily' | 'weekly' | 'monthly' = 'monthly'): Promise<OverviewData[]> {
    try {
      const response = await fetch(`${this.jsonServerUrl}/overview?period=${period}`);
      if (!response.ok) {
        throw new HttpException('Failed to fetch overview data', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new HttpException(
        'Error fetching overview data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}