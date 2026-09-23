import {
  Product,
  ImportRecord,
  ExportRecord,
  MonthlyReport,
  PinAccount,
  UserRole,
  AuditLog,
  AuditModule,
  AuditActionType,
} from '../types';
import { formatM3, formatVND } from '../utils/formatters';

const STORAGE_KEYS = {
  PRODUCTS: 'ht_inventory_products',
  IMPORTS: 'ht_inventory_imports',
  EXPORTS: 'ht_inventory_exports',
  REPORTS: 'ht_inventory_reports',
  USERS: 'ht_inventory_pin_accounts_v3',
  CURRENT_USER: 'ht_inventory_current_pin_user_v3',
  AUDIT_LOGS: 'ht_inventory_audit_logs_v3',
};

// Realistic seed data for CÔNG TY TNHH HƯNG THỊNH CQT
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'G2.5',
    size: '2.5 cm',
    conversion_coefficient: 0.05,
    created_at: '2026-09-18T00:00:00.000Z',
  },
  {
    id: 'prod-2',
    name: 'G01.5',
    size: '1.5cm',
    conversion_coefficient: 0.03,
    created_at: '2026-01-10T08:00:00.000Z',
  },
  {
    id: 'prod-3',
    name: 'G02',
    size: '2 cm',
    conversion_coefficient: 0.04,
    created_at: '2026-01-12T09:30:00.000Z',
  },
  {
    id: 'prod-4',
    name: 'G03',
    size: '3 cm',
    conversion_coefficient: 0.06,
    created_at: '2026-01-15T14:15:00.000Z',
  },
  {
    id: 'prod-5',
    name: 'G04',
    size: '4 cm',
    conversion_coefficient: 0.08,
    created_at: '2026-02-01T10:00:00.000Z',
  },
  {
    id: 'prod-6',
    name: 'G06',
    size: '6 cm',
    conversion_coefficient: 0.12,
    created_at: '2026-02-10T11:00:00.000Z',
  },
];

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;

function pad(n: number) {
  return n < 10 ? '0' + n : '' + n;
}

const INITIAL_IMPORTS: ImportRecord[] = [
  {
    id: 'imp-1',
    product_id: 'prod-1',
    import_date: `${currentYear}-${pad(currentMonth)}-02T08:30:00`,
    so_luot: 500,
    total_m3: 500 * 0.05, // 25.0
    created_at: `${currentYear}-${pad(currentMonth)}-02T08:35:00.000Z`,
    created_by: 'Quản trị viên (Admin)',
  },
  {
    id: 'imp-2',
    product_id: 'prod-2',
    import_date: `${currentYear}-${pad(currentMonth)}-05T10:15:00`,
    so_luot: 800,
    total_m3: 800 * 0.03, // 24.0
    created_at: `${currentYear}-${pad(currentMonth)}-05T10:20:00.000Z`,
    created_by: 'Nhân viên nhập hàng',
  },
  {
    id: 'imp-3',
    product_id: 'prod-3',
    import_date: `${currentYear}-${pad(currentMonth)}-08T14:00:00`,
    so_luot: 120,
    total_m3: 120 * 0.04, // 4.8
    created_at: `${currentYear}-${pad(currentMonth)}-08T14:05:00.000Z`,
    created_by: 'Quản trị viên (Admin)',
  },
  {
    id: 'imp-4',
    product_id: 'prod-4',
    import_date: `${currentYear}-${pad(currentMonth)}-11T09:45:00`,
    so_luot: 350,
    total_m3: 350 * 0.06, // 21.0
    created_at: `${currentYear}-${pad(currentMonth)}-11T09:50:00.000Z`,
    created_by: 'Nhân viên nhập hàng',
  },
  {
    id: 'imp-5',
    product_id: 'prod-5',
    import_date: `${currentYear}-${pad(currentMonth)}-13T15:20:00`,
    so_luot: 200,
    total_m3: 200 * 0.08, // 16.0
    created_at: `${currentYear}-${pad(currentMonth)}-13T15:25:00.000Z`,
    created_by: 'Quản trị viên (Admin)',
  },
  // Previous months
  {
    id: 'imp-prev-1',
    product_id: 'prod-1',
    import_date: `${currentYear}-01-15T09:00:00`,
    so_luot: 1200,
    total_m3: 1200 * 0.05, // 60.0
    created_at: `${currentYear}-01-15T09:00:00.000Z`,
    created_by: 'Quản trị viên (Admin)',
  },
  {
    id: 'imp-prev-2',
    product_id: 'prod-3',
    import_date: `${currentYear}-02-18T10:00:00`,
    so_luot: 180,
    total_m3: 180 * 0.04, // 7.2
    created_at: `${currentYear}-02-18T10:00:00.000Z`,
    created_by: 'Quản trị viên (Admin)',
  },
];

const INITIAL_EXPORTS: ExportRecord[] = [
  {
    id: 'exp-1',
    product_id: 'prod-1',
    export_date: `${currentYear}-${pad(currentMonth)}-04T13:30:00`,
    so_luot: 300,
    total_m3: 300 * 0.05, // 15.0
    unit_price: 4200000,
    revenue: 300 * 0.05 * 4200000, // 63,000,000
    note: 'Xuất xưởng cho Đại lý Hoàng Mai',
    created_at: `${currentYear}-${pad(currentMonth)}-04T13:35:00.000Z`,
    created_by: 'Quản trị viên (Admin)',
  },
  {
    id: 'exp-2',
    product_id: 'prod-2',
    export_date: `${currentYear}-${pad(currentMonth)}-07T11:00:00`,
    so_luot: 450,
    total_m3: 450 * 0.03, // 13.5
    unit_price: 3800000,
    revenue: 450 * 0.03 * 3800000, // 51,300,000
    note: 'Cung cấp công trình xây dựng KĐT',
    created_at: `${currentYear}-${pad(currentMonth)}-07T11:05:00.000Z`,
    created_by: 'Nhân viên nhập hàng',
  },
  {
    id: 'exp-3',
    product_id: 'prod-3',
    export_date: `${currentYear}-${pad(currentMonth)}-10T16:20:00`,
    so_luot: 60,
    total_m3: 60 * 0.04, // 2.4
    unit_price: 3100000,
    revenue: 60 * 0.04 * 3100000, // 7,440,000
    note: 'Xuất bán gỗ tròn xưởng ván ép Hải Phòng',
    created_at: `${currentYear}-${pad(currentMonth)}-10T16:25:00.000Z`,
    created_by: 'Quản trị viên (Admin)',
  },
  {
    id: 'exp-4',
    product_id: 'prod-4',
    export_date: `${currentYear}-${pad(currentMonth)}-12T14:40:00`,
    so_luot: 150,
    total_m3: 150 * 0.06, // 9.0
    unit_price: 5200000,
    revenue: 150 * 0.06 * 5200000, // 46,800,000
    note: 'Lô xuất cảng Cát Lái đóng container',
    created_at: `${currentYear}-${pad(currentMonth)}-12T14:45:00.000Z`,
    created_by: 'Nhân viên nhập hàng',
  },
  // Previous months
  {
    id: 'exp-prev-1',
    product_id: 'prod-1',
    export_date: `${currentYear}-01-20T14:00:00`,
    so_luot: 800,
    total_m3: 800 * 0.05, // 40.0
    unit_price: 4100000,
    revenue: 800 * 0.05 * 4100000, // 164,000,000
    note: 'Hợp đồng số 01/HT-HM',
    created_at: `${currentYear}-01-20T14:05:00.000Z`,
    created_by: 'Quản trị viên (Admin)',
  },
  {
    id: 'exp-prev-2',
    product_id: 'prod-3',
    export_date: `${currentYear}-02-25T15:30:00`,
    so_luot: 100,
    total_m3: 100 * 0.04, // 4.0
    unit_price: 3050000,
    revenue: 100 * 0.04 * 3050000, // 12,200,000
    note: 'Đợt 2 giao hàng công ty Minh Quân',
    created_at: `${currentYear}-02-25T15:35:00.000Z`,
    created_by: 'Quản trị viên (Admin)',
  },
];

const INITIAL_REPORTS: MonthlyReport[] = [
  {
    id: 'rep-prev-1',
    year: currentYear,
    month: 1,
    total_import_m3: 4.8,
    total_export_m3: 3.2,
    total_revenue: 13120000,
    cost_goods: 8000000,
    cost_labor: 2500000,
    cost_electricity: 800000,
    cost_capital: 300000,
    cost_other: 250000,
    total_cost: 11850000,
    profit: 1270000,
    finalized: true,
    created_at: `${currentYear}-02-01T08:00:00.000Z`,
  },
  {
    id: 'rep-prev-2',
    year: currentYear,
    month: 2,
    total_import_m3: 31.86,
    total_export_m3: 17.7,
    total_revenue: 53985000,
    cost_goods: 36000000,
    cost_labor: 4800000,
    cost_electricity: 1600000,
    cost_capital: 800000,
    cost_other: 650000,
    total_cost: 43850000,
    profit: 10135000,
    finalized: true,
    created_at: `${currentYear}-03-01T08:00:00.000Z`,
  },
];

const INITIAL_PINS: PinAccount[] = [
  {
    id: 'pin-1',
    pin: '1111',
    name: 'Quản trị viên (Admin)',
    role: 'admin',
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'pin-2',
    pin: '6868',
    name: 'Nhân viên nhập hàng',
    role: 'nhap',
    created_at: '2026-01-10T09:00:00.000Z',
  },
  {
    id: 'pin-3',
    pin: '2222',
    name: 'Ban Giám Đốc / Kiểm Soát',
    role: 'xem',
    created_at: '2026-01-05T08:00:00.000Z',
  },
  {
    id: 'pin-4',
    pin: '7979',
    name: 'Kế toán đối soát công nợ',
    role: 'xem',
    created_at: '2026-01-12T10:00:00.000Z',
  },
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    created_at: `${currentYear}-${pad(currentMonth)}-13T15:20:00.000Z`,
    user_name: 'Quản trị viên (Admin)',
    user_pin: '1111',
    user_role: 'admin',
    module: 'import',
    action: 'create',
    title: 'Thêm phiếu nhập kho',
    summary: 'Ván ép cốp pha phủ phim • 200 lượt (10.720 m³)',
  },
  {
    id: 'log-2',
    created_at: `${currentYear}-${pad(currentMonth)}-12T14:40:00.000Z`,
    user_name: 'Nhân viên nhập hàng',
    user_pin: '6868',
    user_role: 'nhap',
    module: 'export',
    action: 'create',
    title: 'Thêm phiếu xuất kho',
    summary: 'Gỗ bạch đàn xẻ hộp • 150 lượt (3.375 m³) • 17.550.000 đ',
  },
  {
    id: 'log-3',
    created_at: `${currentYear}-${pad(currentMonth)}-11T09:45:00.000Z`,
    user_name: 'Nhân viên nhập hàng',
    user_pin: '6868',
    user_role: 'nhap',
    module: 'import',
    action: 'create',
    title: 'Thêm phiếu nhập kho',
    summary: 'Gỗ bạch đàn xẻ hộp • 350 lượt (7.875 m³)',
  },
  {
    id: 'log-4',
    created_at: `${currentYear}-${pad(currentMonth)}-10T16:20:00.000Z`,
    user_name: 'Quản trị viên (Admin)',
    user_pin: '1111',
    user_role: 'admin',
    module: 'export',
    action: 'create',
    title: 'Thêm phiếu xuất kho',
    summary: 'Gỗ tràm bóc tròn tiêu chuẩn • 60 lượt (10.620 m³) • 32.922.000 đ',
  },
  {
    id: 'log-5',
    created_at: `${currentYear}-${pad(currentMonth)}-08T14:00:00.000Z`,
    user_name: 'Quản trị viên (Admin)',
    user_pin: '1111',
    user_role: 'admin',
    module: 'product',
    action: 'create',
    title: 'Thêm sản phẩm mới',
    summary: 'Gỗ xoan đào tròn bãi tập kết (Đk 40cm x Dài 3.0m)',
  },
  {
    id: 'log-6',
    created_at: `${currentYear}-03-01T08:00:00.000Z`,
    user_name: 'Quản trị viên (Admin)',
    user_pin: '1111',
    user_role: 'admin',
    module: 'report',
    action: 'finalize',
    title: 'Chốt báo cáo tháng 2',
    summary: `Doanh thu 53.985.000 đ • Lợi nhuận: 10.135.000 đ`,
  },
];

export class StorageService {
  private static isInitializing = false;

  private static get<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) return defaultValue;
      return JSON.parse(data);
    } catch {
      return defaultValue;
    }
  }

  private static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('app-storage-changed', { detail: { key } }));
      }
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  }

  static init() {
    if (this.isInitializing) return;
    this.isInitializing = true;
    try {
      if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
        this.set(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
      } else {
        // Auto-sync products to new catalog table if not synced yet
        const CATALOG_VERSION_KEY = 'ht_catalog_version_20260918_v1';
        if (!localStorage.getItem(CATALOG_VERSION_KEY)) {
          const currentProducts = this.get<Product[]>(STORAGE_KEYS.PRODUCTS, []);
          const targetMap = new Map<string, Product>(INITIAL_PRODUCTS.map((p) => [p.id, p]));
          const oldSampleNames = new Set([
            'Gỗ thông xẻ thanh loại 1',
            'Gỗ keo xẻ sấy quy cách',
            'Gỗ tràm bóc tròn tiêu chuẩn',
            'Gỗ bạch đàn xẻ hộp xuất khẩu',
            'Ván ép cốp pha phủ phim',
            'Gỗ xoan đào tròn bãi tập kết',
          ]);

          const updated = currentProducts.map((p) => {
            if (targetMap.has(p.id) || oldSampleNames.has(p.name)) {
              const replacement = targetMap.get(p.id);
              if (replacement) return replacement;
            }
            return p;
          });

          // Ensure all 6 target products are present
          INITIAL_PRODUCTS.forEach((t) => {
            if (!updated.some((u) => u.id === t.id)) {
              updated.push(t);
            }
          });

          this.set(STORAGE_KEYS.PRODUCTS, updated);

          // Recalculate imports & exports m3
          const allProds = this.get<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
          const prodCoeffMap = new Map(allProds.map((p) => [p.id, p.conversion_coefficient]));

          const existingImports = this.get<ImportRecord[]>(STORAGE_KEYS.IMPORTS, []);
          if (existingImports.length > 0) {
            const updatedImports = existingImports.map((imp) => {
              const coeff = prodCoeffMap.get(imp.product_id);
              if (coeff != null && coeff > 0) {
                return {
                  ...imp,
                  total_m3: (imp.so_luot || 0) * coeff,
                };
              }
              return imp;
            });
            this.set(STORAGE_KEYS.IMPORTS, updatedImports);
          }

          const existingExports = this.get<ExportRecord[]>(STORAGE_KEYS.EXPORTS, []);
          if (existingExports.length > 0) {
            const updatedExports = existingExports.map((exp) => {
              const coeff = prodCoeffMap.get(exp.product_id);
              if (coeff != null && coeff > 0) {
                const total_m3 = (exp.so_luot || 0) * coeff;
                return {
                  ...exp,
                  total_m3,
                  revenue: total_m3 * (exp.unit_price || 0),
                };
              }
              return exp;
            });
            this.set(STORAGE_KEYS.EXPORTS, updatedExports);
          }

          localStorage.setItem(CATALOG_VERSION_KEY, 'synced');
          this.addAuditLog({
            module: 'product',
            action: 'update',
            title: 'Cập nhật danh mục sản phẩm theo bảng quy cách mới',
            summary: 'Đã cập nhật 6 sản phẩm: G2.5, G01.5, G02, G03, G04, G06',
          });
        }
      }
      if (!localStorage.getItem(STORAGE_KEYS.IMPORTS)) {
        this.set(STORAGE_KEYS.IMPORTS, INITIAL_IMPORTS);
      }
      if (!localStorage.getItem(STORAGE_KEYS.EXPORTS)) {
        this.set(STORAGE_KEYS.EXPORTS, INITIAL_EXPORTS);
      }
      if (!localStorage.getItem(STORAGE_KEYS.REPORTS)) {
        this.set(STORAGE_KEYS.REPORTS, INITIAL_REPORTS);
      }
      if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        this.set(STORAGE_KEYS.USERS, INITIAL_PINS);
      } else {
        // Migrate existing PIN accounts if 1111 was 'nhap'
        const users = this.get<PinAccount[]>(STORAGE_KEYS.USERS, INITIAL_PINS);
        let changed = false;
        const updatedUsers = users.map((u) => {
          if (u.pin === '1111' && u.role !== 'admin') {
            changed = true;
            return { ...u, role: 'admin' as UserRole, name: 'Quản trị viên (Admin)' };
          }
          return u;
        });
        if (changed) {
          this.set(STORAGE_KEYS.USERS, updatedUsers);
        }
      }

      if (!localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS)) {
        this.set(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
      }

      // Check current session directly without calling getCurrentUser() to prevent circular recursion
      const current = this.get<PinAccount | null>(STORAGE_KEYS.CURRENT_USER, null);
      if (current && current.pin === '1111' && current.role !== 'admin') {
        this.setCurrentUser({ ...current, role: 'admin', name: 'Quản trị viên (Admin)' });
      }
    } finally {
      this.isInitializing = false;
    }
  }

  // Audit Logs
  static getAuditLogs(): AuditLog[] {
    this.init();
    const logs = this.get<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    return logs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  static addAuditLog(entry: {
    module: AuditModule;
    action: AuditActionType;
    title: string;
    summary: string;
    details?: Record<string, any>;
  }): AuditLog {
    this.init();
    const current = this.getCurrentUser();
    const logs = this.get<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);

    const newLog: AuditLog = {
      id: 'log-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      created_at: new Date().toISOString(),
      user_name: current?.name || 'Quản trị viên',
      user_pin: current?.pin || '1111',
      user_role: current?.role || 'admin',
      module: entry.module,
      action: entry.action,
      title: entry.title,
      summary: entry.summary,
      details: entry.details,
    };

    logs.unshift(newLog);
    if (logs.length > 500) logs.length = 500;
    this.set(STORAGE_KEYS.AUDIT_LOGS, logs);
    return newLog;
  }

  // Products
  static getProducts(): Product[] {
    this.init();
    return this.get<Product[]>(STORAGE_KEYS.PRODUCTS, []);
  }

  static saveProduct(product: Omit<Product, 'id' | 'created_at'> & { id?: string }): Product {
    const products = this.getProducts();
    if (product.id) {
      const idx = products.findIndex((p) => p.id === product.id);
      if (idx !== -1) {
        const updated = {
          ...products[idx],
          name: product.name,
          size: product.size,
          conversion_coefficient: product.conversion_coefficient,
        };
        products[idx] = updated;
        this.set(STORAGE_KEYS.PRODUCTS, products);

        this.addAuditLog({
          module: 'product',
          action: 'update',
          title: 'Sửa sản phẩm',
          summary: `${updated.name} • Quy cách: ${updated.size || 'Tiêu chuẩn'} • Hệ số: ${updated.conversion_coefficient}`,
        });

        return updated;
      }
    }
    const newProduct: Product = {
      id: 'prod-' + Date.now(),
      name: product.name,
      size: product.size,
      conversion_coefficient: product.conversion_coefficient,
      created_at: new Date().toISOString(),
    };
    products.unshift(newProduct);
    this.set(STORAGE_KEYS.PRODUCTS, products);

    this.addAuditLog({
      module: 'product',
      action: 'create',
      title: 'Thêm sản phẩm mới',
      summary: `${newProduct.name} • Quy cách: ${newProduct.size || 'Tiêu chuẩn'} • Hệ số: ${newProduct.conversion_coefficient}`,
    });

    return newProduct;
  }

  static deleteProduct(id: string): void {
    const products = this.getProducts();
    const target = products.find((p) => p.id === id);
    const filtered = products.filter((p) => p.id !== id);
    this.set(STORAGE_KEYS.PRODUCTS, filtered);

    if (target) {
      this.addAuditLog({
        module: 'product',
        action: 'delete',
        title: 'Xóa sản phẩm',
        summary: `${target.name} (${target.size || 'Tiêu chuẩn'})`,
      });
    }
  }

  static resetProductsToDefault(): void {
    this.set(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    this.addAuditLog({
      module: 'product',
      action: 'update',
      title: 'Khôi phục danh mục sản phẩm chuẩn theo bảng quy cách',
      summary: 'Đồng bộ lại 6 sản phẩm: G2.5, G01.5, G02, G03, G04, G06',
    });
  }

  // Imports
  static getImports(): ImportRecord[] {
    this.init();
    const imports = this.get<ImportRecord[]>(STORAGE_KEYS.IMPORTS, []);
    const products = this.getProducts();
    const prodMap = new Map(products.map((p) => [p.id, p]));
    return imports.map((imp) => ({
      ...imp,
      products: prodMap.get(imp.product_id),
    }));
  }

  static saveImport(record: {
    id?: string;
    product_id: string;
    import_date: string;
    so_luot: number;
  }): ImportRecord {
    const imports = this.getImports();
    const products = this.getProducts();
    const prod = products.find((p) => p.id === record.product_id);
    const total_m3 = (record.so_luot || 0) * (prod?.conversion_coefficient || 0);
    const currentUser = this.getCurrentUser();

    if (record.id) {
      const idx = imports.findIndex((i) => i.id === record.id);
      if (idx !== -1) {
        const updated: ImportRecord = {
          ...imports[idx],
          product_id: record.product_id,
          import_date: record.import_date,
          so_luot: record.so_luot,
          total_m3: total_m3,
        };
        imports[idx] = updated;
        this.set(
          STORAGE_KEYS.IMPORTS,
          imports.map(({ products: _, ...rest }) => rest)
        );

        this.addAuditLog({
          module: 'import',
          action: 'update',
          title: 'Sửa phiếu nhập kho',
          summary: `${prod?.name || 'Sản phẩm'} • ${updated.so_luot} lượt (${formatM3(total_m3, 3)} m³)`,
        });

        return { ...updated, products: prod };
      }
    }

    const newImport: ImportRecord = {
      id: 'imp-' + Date.now(),
      product_id: record.product_id,
      import_date: record.import_date,
      so_luot: record.so_luot,
      total_m3: total_m3,
      created_at: new Date().toISOString(),
      created_by: currentUser?.name || 'Nhân sự nhập',
    };
    imports.unshift(newImport);
    this.set(
      STORAGE_KEYS.IMPORTS,
      imports.map(({ products: _, ...rest }) => rest)
    );

    this.addAuditLog({
      module: 'import',
      action: 'create',
      title: 'Thêm phiếu nhập kho',
      summary: `${prod?.name || 'Sản phẩm'} • ${newImport.so_luot} lượt (${formatM3(total_m3, 3)} m³)`,
    });

    return { ...newImport, products: prod };
  }

  static deleteImport(id: string): void {
    const imports = this.getImports();
    const target = imports.find((i) => i.id === id);
    const filtered = imports.filter((i) => i.id !== id);
    this.set(
      STORAGE_KEYS.IMPORTS,
      filtered.map(({ products: _, ...rest }) => rest)
    );

    if (target) {
      this.addAuditLog({
        module: 'import',
        action: 'delete',
        title: 'Xóa phiếu nhập kho',
        summary: `${target.products?.name || 'Sản phẩm'} • ${target.so_luot} lượt (${formatM3(target.total_m3, 3)} m³)`,
      });
    }
  }

  // Exports
  static getExports(): ExportRecord[] {
    this.init();
    const exports = this.get<ExportRecord[]>(STORAGE_KEYS.EXPORTS, []);
    const products = this.getProducts();
    const prodMap = new Map(products.map((p) => [p.id, p]));
    return exports.map((exp) => ({
      ...exp,
      products: prodMap.get(exp.product_id),
    }));
  }

  static saveExport(record: {
    id?: string;
    product_id: string;
    export_date: string;
    so_luot: number;
    unit_price: number;
    note?: string;
  }): ExportRecord {
    const exports = this.getExports();
    const products = this.getProducts();
    const prod = products.find((p) => p.id === record.product_id);
    const total_m3 = (record.so_luot || 0) * (prod?.conversion_coefficient || 0);
    const revenue = total_m3 * (record.unit_price || 0);
    const currentUser = this.getCurrentUser();

    if (record.id) {
      const idx = exports.findIndex((e) => e.id === record.id);
      if (idx !== -1) {
        const updated: ExportRecord = {
          ...exports[idx],
          product_id: record.product_id,
          export_date: record.export_date,
          so_luot: record.so_luot,
          unit_price: record.unit_price,
          total_m3: total_m3,
          revenue: revenue,
          note: record.note,
        };
        exports[idx] = updated;
        this.set(
          STORAGE_KEYS.EXPORTS,
          exports.map(({ products: _, ...rest }) => rest)
        );

        this.addAuditLog({
          module: 'export',
          action: 'update',
          title: 'Sửa phiếu xuất kho',
          summary: `${prod?.name || 'Sản phẩm'} • ${updated.so_luot} lượt (${formatM3(total_m3, 3)} m³) • Doanh thu ${formatVND(revenue)}`,
        });

        return { ...updated, products: prod };
      }
    }

    const newExport: ExportRecord = {
      id: 'exp-' + Date.now(),
      product_id: record.product_id,
      export_date: record.export_date,
      so_luot: record.so_luot,
      unit_price: record.unit_price,
      total_m3: total_m3,
      revenue: revenue,
      note: record.note,
      created_at: new Date().toISOString(),
      created_by: currentUser?.name || 'Nhân sự xuất',
    };
    exports.unshift(newExport);
    this.set(
      STORAGE_KEYS.EXPORTS,
      exports.map(({ products: _, ...rest }) => rest)
    );

    this.addAuditLog({
      module: 'export',
      action: 'create',
      title: 'Thêm phiếu xuất kho',
      summary: `${prod?.name || 'Sản phẩm'} • ${newExport.so_luot} lượt (${formatM3(total_m3, 3)} m³) • Doanh thu ${formatVND(revenue)}`,
    });

    return { ...newExport, products: prod };
  }

  static deleteExport(id: string): void {
    const exports = this.getExports();
    const target = exports.find((e) => e.id === id);
    const filtered = exports.filter((e) => e.id !== id);
    this.set(
      STORAGE_KEYS.EXPORTS,
      filtered.map(({ products: _, ...rest }) => rest)
    );

    if (target) {
      this.addAuditLog({
        module: 'export',
        action: 'delete',
        title: 'Xóa phiếu xuất kho',
        summary: `${target.products?.name || 'Sản phẩm'} • ${target.so_luot} lượt (${formatM3(target.total_m3, 3)} m³) • ${formatVND(target.revenue)}`,
      });
    }
  }

  // Monthly Reports
  static getMonthlyReports(): MonthlyReport[] {
    this.init();
    const reports = this.get<MonthlyReport[]>(STORAGE_KEYS.REPORTS, []);
    return reports.sort((a, b) => b.year - a.year || b.month - a.month);
  }

  static saveMonthlyReport(data: Omit<MonthlyReport, 'id' | 'created_at'>): MonthlyReport {
    const reports = this.getMonthlyReports();
    const existingIdx = reports.findIndex((r) => r.year === data.year && r.month === data.month);
    const currentUser = this.getCurrentUser();
    const now = new Date().toISOString();

    if (existingIdx !== -1) {
      const prev = reports[existingIdx];
      const updated: MonthlyReport = {
        ...prev,
        ...data,
        published_at: data.finalized ? (prev.published_at || now) : prev.published_at,
        published_by: data.finalized ? (currentUser?.name || 'Quản trị viên') : prev.published_by,
        updated_at: now,
      };
      reports[existingIdx] = updated;
      this.set(STORAGE_KEYS.REPORTS, reports);

      this.addAuditLog({
        module: 'report',
        action: data.finalized ? 'finalize' : 'update',
        title: data.finalized
          ? `Xuất bản báo cáo tháng ${data.month}/${data.year}`
          : `Lưu dự thảo báo cáo tháng ${data.month}/${data.year}`,
        summary: `Doanh thu: ${formatVND(data.total_revenue)} • Nhập: ${formatM3(data.total_import_m3, 2)} m³ • Xuất: ${formatM3(data.total_export_m3, 2)} m³ • Lợi nhuận: ${formatVND(data.profit)}`,
      });

      return updated;
    }

    const newReport: MonthlyReport = {
      id: 'rep-' + Date.now(),
      ...data,
      published_at: data.finalized ? now : undefined,
      published_by: data.finalized ? (currentUser?.name || 'Quản trị viên') : undefined,
      created_at: now,
      updated_at: now,
    };
    reports.unshift(newReport);
    this.set(STORAGE_KEYS.REPORTS, reports);

    this.addAuditLog({
      module: 'report',
      action: data.finalized ? 'finalize' : 'create',
      title: data.finalized
        ? `Tạo & Xuất bản báo cáo tháng ${data.month}/${data.year}`
        : `Tạo dự thảo báo cáo tháng ${data.month}/${data.year}`,
      summary: `Doanh thu: ${formatVND(data.total_revenue)} • Nhập: ${formatM3(data.total_import_m3, 2)} m³ • Xuất: ${formatM3(data.total_export_m3, 2)} m³ • Lợi nhuận: ${formatVND(data.profit)}`,
    });

    return newReport;
  }

  static deleteMonthlyReport(year: number, month: number): void {
    const reports = this.getMonthlyReports();
    const filtered = reports.filter((r) => !(r.year === year && r.month === month));
    this.set(STORAGE_KEYS.REPORTS, filtered);

    this.addAuditLog({
      module: 'report',
      action: 'delete',
      title: `Xóa / Đặt lại báo cáo tháng ${month}/${year}`,
      summary: 'Khôi phục tính toán tự động từ phiếu nhập/xuất thực tế',
    });
  }

  static deleteMonthlyReportById(id: string): void {
    const reports = this.getMonthlyReports();
    const target = reports.find((r) => r.id === id);
    const filtered = reports.filter((r) => r.id !== id);
    this.set(STORAGE_KEYS.REPORTS, filtered);

    if (target) {
      this.addAuditLog({
        module: 'report',
        action: 'delete',
        title: `Xóa báo cáo tháng ${target.month}/${target.year}`,
        summary: `Đã xóa báo cáo doanh thu ${formatVND(target.total_revenue)} • Lợi nhuận ${formatVND(target.profit)}`,
      });
    }
  }

  static clearAllMonthlyReports(): void {
    this.set(STORAGE_KEYS.REPORTS, []);
    this.addAuditLog({
      module: 'report',
      action: 'delete',
      title: 'Xóa toàn bộ dữ liệu báo cáo tài chính',
      summary: 'Khôi phục tính toán tự động toàn bộ theo phiếu kho thực tế',
    });
  }

  static finalizeMonthlyReport(year: number, month: number): MonthlyReport | null {
    const reports = this.getMonthlyReports();
    const existing = reports.find((r) => r.year === year && r.month === month);

    if (existing) {
      return this.saveMonthlyReport({
        ...existing,
        finalized: true,
      });
    }

    const exports = this.getExports().filter((e) => {
      const d = new Date(e.export_date);
      return d.getFullYear() === year && d.getMonth() + 1 === month;
    });
    const imports = this.getImports().filter((i) => {
      const d = new Date(i.import_date);
      return d.getFullYear() === year && d.getMonth() + 1 === month;
    });

    const total_export_m3 = exports.reduce((sum, e) => sum + e.total_m3, 0);
    const total_import_m3 = imports.reduce((sum, i) => sum + i.total_m3, 0);
    const total_revenue = exports.reduce((sum, e) => sum + e.revenue, 0);

    return this.saveMonthlyReport({
      year,
      month,
      total_import_m3,
      total_export_m3,
      total_revenue,
      cost_goods: 0,
      cost_labor: 0,
      cost_electricity: 0,
      cost_capital: 0,
      cost_other: 0,
      total_cost: 0,
      profit: total_revenue,
      finalized: true,
    });
  }

  // PIN Accounts & Authentication
  static getPinAccounts(): PinAccount[] {
    this.init();
    return this.get<PinAccount[]>(STORAGE_KEYS.USERS, INITIAL_PINS);
  }

  static getUsers(): PinAccount[] {
    return this.getPinAccounts();
  }

  static verifyPin(pin: string): PinAccount | null {
    const accounts = this.getPinAccounts();
    const clean = pin.trim();
    return accounts.find((a) => a.pin === clean) || null;
  }

  static savePinAccount(account: {
    id?: string;
    pin: string;
    name: string;
    role: UserRole;
  }): { success: boolean; error?: string; data?: PinAccount } {
    const accounts = this.getPinAccounts();
    const cleanPin = account.pin.trim();

    if (!/^\d{4}$/.test(cleanPin)) {
      return { success: false, error: 'Mã PIN phải bao gồm đúng 4 chữ số (0-9).' };
    }

    if (!account.name.trim()) {
      return { success: false, error: 'Vui lòng nhập tên người dùng hoặc bộ phận sử dụng.' };
    }

    const duplicate = accounts.find(
      (a) => a.pin === cleanPin && a.id !== account.id
    );
    if (duplicate) {
      return {
        success: false,
        error: `Mã PIN ${cleanPin} đã được gán cho "${duplicate.name}". Vui lòng chọn 4 số khác.`,
      };
    }

    const roleName =
      account.role === 'admin'
        ? 'Quản trị viên (Nhập/Sửa/Xóa)'
        : account.role === 'nhap'
        ? 'Chỉ nhập'
        : 'Chỉ xem';

    if (account.id) {
      const idx = accounts.findIndex((a) => a.id === account.id);
      if (idx !== -1) {
        const updated: PinAccount = {
          ...accounts[idx],
          pin: cleanPin,
          name: account.name.trim(),
          role: account.role,
        };
        accounts[idx] = updated;
        this.set(STORAGE_KEYS.USERS, accounts);

        this.addAuditLog({
          module: 'pin',
          action: 'update',
          title: 'Cập nhật mã PIN & Quyền',
          summary: `Mã PIN ${cleanPin} - ${updated.name} • Quyền: ${roleName}`,
        });

        return { success: true, data: updated };
      }
    }

    const newAcc: PinAccount = {
      id: 'pin-' + Date.now(),
      pin: cleanPin,
      name: account.name.trim(),
      role: account.role,
      created_at: new Date().toISOString(),
    };
    accounts.push(newAcc);
    this.set(STORAGE_KEYS.USERS, accounts);

    this.addAuditLog({
      module: 'pin',
      action: 'create',
      title: 'Cấp mã PIN mới',
      summary: `Mã PIN ${cleanPin} - ${newAcc.name} • Quyền: ${roleName}`,
    });

    return { success: true, data: newAcc };
  }

  static deletePinAccount(id: string): void {
    const accounts = this.getPinAccounts();
    const target = accounts.find((a) => a.id === id);
    const filtered = accounts.filter((a) => a.id !== id);
    this.set(STORAGE_KEYS.USERS, filtered);

    if (target) {
      this.addAuditLog({
        module: 'pin',
        action: 'delete',
        title: 'Xóa mã PIN',
        summary: `Mã PIN ${target.pin} - ${target.name}`,
      });
    }
  }

  // Auth session
  static getCurrentUser(): PinAccount | null {
    this.init();
    return this.get<PinAccount | null>(STORAGE_KEYS.CURRENT_USER, null);
  }

  static setCurrentUser(user: PinAccount | null): void {
    this.set(STORAGE_KEYS.CURRENT_USER, user);
  }

  // Reset to default seed
  static resetData(): void {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.IMPORTS);
    localStorage.removeItem(STORAGE_KEYS.EXPORTS);
    localStorage.removeItem(STORAGE_KEYS.REPORTS);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
    this.init();
  }
}
import { Product } from '../types';

// Link API kết nối trung gian đến MongoDB Atlas của bạn (Thay URL của bạn vào đây)
const MONGO_API_URL = 'https://mongodbatlas.com'; 

// Hàm lấy sản phẩm từ MongoDB thay vì LocalStorage
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${MONGO_API_URL}/products`);
    if (!response.ok) throw new Error('Không thể lấy dữ liệu');
    return await response.json();
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error);
    return []; // Trả về mảng rỗng nếu lỗi
  }
};

// Hàm lưu sản phẩm mới lên MongoDB đám mây
export const saveProduct = async (newProduct: Product): Promise<boolean> => {
  try {
    const response = await fetch(`${MONGO_API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    return response.ok;
  } catch (error) {
    console.error("Lỗi lưu MongoDB:", error);
    return false;
  }
};
