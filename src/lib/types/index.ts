export type ProductCategory = 'Spices' | 'Coconut' | 'Seafood' | 'Textiles';

export type OrderStatus = 'PENDING' | 'CONTACTED' | 'APPROVED' | 'REJECTED';

export type SupplierRequestStatus = 'PENDING' | 'CONTACTED' | 'APPROVED' | 'REJECTED';

export type IncotermsOption = 'FOB Belawan' | 'CIF';

export interface ProductSpecification {
  grade?: string;
  moisture?: string;
  volatile_oil?: string;
  ash_content?: string;
  packaging?: string;
  origin?: string;
}

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  latin_or_local_name: string;
  hs_code: string;
  min_order_qty: number;
  unit: string;
  price_estimate_usd: number;
  specs: ProductSpecification;
  image_url: string;
  description: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  unit: string;
  packaging_notes?: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  hs_code: string;
  quantity: number;
  unit: string;
  unit_price_usd: number;
  subtotal_usd: number;
  packaging_notes?: string;
}

export interface BuyerOrder {
  id: string;
  order_code: string;
  buyer_name: string;
  company_name: string;
  email: string;
  whatsapp_number: string;
  destination_country: string;
  destination_port: string;
  incoterms: string;
  items: OrderItem[];
  status: OrderStatus;
  total_amount: number;
  currency: string;
  notes?: string;
  created_at: string;
}

export interface SupplierRequest {
  id: string;
  req_code: string;
  supplier_name: string;
  group_or_cv_name: string;
  location_regency: string;
  location_province: string;
  whatsapp_number: string;
  commodity_category: string;
  commodity_name: string;
  qty_monthly_capacity: number;
  unit: string;
  moisture_or_grade: string;
  offered_price_idr: number;
  readiness_status: string;
  notes?: string;
  status: SupplierRequestStatus;
  created_at: string;
}

export interface InvoiceItem {
  description: string;
  hs_code: string;
  quantity: number;
  unit: string;
  unit_price: number;
  subtotal: number;
}

export interface BankAccountInfo {
  bank_name: string;
  account_name: string;
  account_number: string;
  swift_code: string;
  branch: string;
}

export interface InvoicePayload {
  invoice_number: string;
  title: string;
  status: string;
  issued_date: string;
  due_date: string;
  ref_type: string;
  ref_code: string;
  company_name: string;
  company_address: string;
  company_email: string;
  company_phone: string;
  port_of_loading: string;
  recipient_name: string;
  recipient_company: string;
  recipient_email: string;
  recipient_phone: string;
  destination_country: string;
  destination_port: string;
  incoterms: string;
  payment_terms: string;
  items: InvoiceItem[];
  subtotal: number;
  shipping_and_insurance_fee: number;
  total_amount: number;
  currency: string;
  bank_instructions: BankAccountInfo;
  qr_verification_code: string;
  authorized_signatory: string;
  stamp_url?: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  ref_type: string;
  ref_id: string;
  ref_code: string;
  approved_by_admin: string;
  issued_at: string;
  total_amount: number;
  currency: string;
  payload: InvoicePayload;
}

export type MessageChannel = 'WHATS_APP' | 'WEB_INQUIRY' | 'EMAIL';
export type MessageStatus = 'UNREAD' | 'READ' | 'REPLIED';

export interface AdminMessage {
  id: string;
  sender_name: string;
  sender_company?: string;
  sender_phone: string;
  sender_email?: string;
  channel: MessageChannel;
  subject: string;
  content: string;
  ref_code?: string;
  status: MessageStatus;
  created_at: string;
}

export interface DashboardStats {
  pending_orders_count: number;
  approved_orders_count: number;
  total_orders_count: number;
  pending_suppliers_count: number;
  total_suppliers_count: number;
  unread_messages_count: number;
  total_products_count: number;
  total_invoices_issued: number;
  total_export_value_usd: number;
  belawan_port_status: string;
  operational_hours_status: string;
  server_time_utc: string;
  server_time_wib: string;
}

export type UserRole =
  | 'SUPER_ADMIN'
  | 'EXPORT_MANAGER'
  | 'LOGISTICS_OFFICER'
  | 'SOURCING_OFFICER'
  | 'FINANCE_OFFICER'
  | 'EXPORT_STAFF';

export interface UserProfileDto {
  id: string;
  nik: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  phone?: string;
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
  permissions: string[];
}

export interface AuthResponse {
  token: string;
  user: UserProfileDto;
  message: string;
  success: boolean;
}

export interface SecurityAuditLog {
  id: string;
  user_nik?: string;
  user_email?: string;
  action: string;
  severity: string;
  ip_address?: string;
  user_agent?: string;
  details?: Record<string, any>;
  created_at: string;
}

export interface SecurityTestReport {
  timestamp: string;
  database_backend: string;
  security_score: string;
  security_tests: {
    test: string;
    status: string;
    details: string;
  }[];
  active_roles: string[];
  recommendations: string[];
}
