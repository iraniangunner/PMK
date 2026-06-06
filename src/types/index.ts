// Auth
export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  }
  
  // Brand
  export interface Brand {
    id: number;
    name: string;
    logo: string | null;
    description: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }
  
  // Category
  export interface Category {
    id: number;
    brand_id: number;
    name: string;
    description: string | null;
    is_active: boolean;
    brand?: Brand;
    created_at: string;
    updated_at: string;
  }
  
  // Product
  export interface Product {
    id: number;
    brand_id: number;
    category_id: number;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    size: string;
    pr: number | null;
    load_range: string | null;
    load_index: string | null;
    speed_rating: string | null;
    max_speed_mph: number | null;
    tread_depth_32nds: number | null;
    tread_depth_mm: number | null;
    standard_rim: string | null;
    single_load_lbs: number | null;
    single_load_psi: number | null;
    single_load_kg: number | null;
    single_load_kpa: number | null;
    dual_load_lbs: number | null;
    dual_load_psi: number | null;
    dual_load_kg: number | null;
    dual_load_kpa: number | null;
    is_active: boolean;
    brand?: Brand;
    category?: Category;
    created_at: string;
    updated_at: string;
  }
  
  // Representative
  export interface Representative {
    id: number;
    name: string;
    city: string;
    province: string;
    address: string;
    phone: string | null;
    mobile: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }
  
  // Contact
  export interface Contact {
    id: number;
    name: string;
    email: string | null;
    phone: string;
    subject: string;
    message: string;
    created_at: string;
    updated_at: string;
  }
  
  // Damage Form
  export interface DamageForm {
    id: number;
    buyer_name: string;
    buyer_mobile: string;
    buyer_phone: string | null;
    buyer_address: string;
    seller_name: string;
    seller_mobile: string;
    seller_phone: string | null;
    seller_shop_name: string | null;
    dot_serial: string;
    tire_size: string;
    tire_code: string;
    warranty_card_serial: string;
    install_date: string;
    purchase_date: string;
    status: 'pending' | 'reviewing' | 'approved' | 'rejected';
    created_at: string;
    updated_at: string;
  }
  
  // Complaint Form
  export interface ComplaintForm {
    id: number;
    buyer_name: string;
    buyer_mobile: string;
    buyer_phone: string | null;
    buyer_address: string;
    representative_name: string;
    representative_mobile: string;
    representative_phone: string | null;
    purchase_date: string;
    complaint_description: string;
    status: 'pending' | 'reviewing' | 'resolved' | 'rejected';
    created_at: string;
    updated_at: string;
  }
  
  // Survey Form
  export interface SurveyForm {
    id: number;
    full_name: string;
    phone: string;
    city: string;
    province: string;
    tire_model: string;
    tire_overall: 'excellent' | 'good' | 'average' | 'weak';
    rainy_performance: 'excellent' | 'good' | 'average' | 'weak';
    dry_performance: 'excellent' | 'good' | 'average' | 'weak';
    comfort: 'excellent' | 'good' | 'average' | 'weak';
    handling: 'excellent' | 'good' | 'average' | 'weak';
    braking: 'excellent' | 'good' | 'average' | 'weak';
    after_sales_service: 'excellent' | 'good' | 'average' | 'weak';
    staff_response: 'excellent' | 'good' | 'average' | 'weak';
    created_at: string;
    updated_at: string;
  }
  
  // API Response
  export interface ApiResponse<T> {
    data: T;
    message?: string;
  }
  
  // Pagination
  export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  }