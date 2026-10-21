"use client";

import { LOCAL_CATALOG, StoreProduct } from "./catalog";
import { isSupabaseConfigured, supabase } from "./supabase";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  stock?: number;
}

export interface CustomerOrder {
  id: string;
  user_id?: string | null;
  total_amount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shipping_address: {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
  };
  payment_id?: string;
  items: OrderItem[];
  created_at: string;
}

const PRODUCTS_STORAGE_KEY = "aquaterra_db_products_v3";
const ORDERS_STORAGE_KEY = "aquaterra_db_orders_v3";

// Initial seed orders for demonstration if none exist
const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: "AQ-8912401",
    user_id: "usr_maya_102",
    total_amount: 3499,
    status: "delivered",
    shipping_address: {
      fullName: "Maya Sharma",
      email: "maya.sharma@example.com",
      phone: "+91 98450 12345",
      address: "42, Palm Grove, Indiranagar",
      city: "Bangalore",
      state: "Karnataka",
      zip: "560038",
    },
    payment_id: "COD",
    items: [
      {
        id: "sunlit-moss-bowl",
        name: "Sunlit Moss Bowl",
        price: 3499,
        quantity: 1,
        image_url: "/images/terreriums/0a2fe810fce8f693f4a610543d741470.jpg",
      },
    ],
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "AQ-8912402",
    user_id: "usr_rohan_204",
    total_amount: 7999,
    status: "shipped",
    shipping_address: {
      fullName: "Rohan Dave",
      email: "rohan.d@example.com",
      phone: "+91 98200 98765",
      address: "Flat 12B, Sky Towers, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      zip: "400050",
    },
    payment_id: "UPI_CONFIRMED",
    items: [
      {
        id: "bonsai-waterfall-dome",
        name: "Bonsai Waterfall Dome",
        price: 7999,
        quantity: 1,
        image_url: "/images/terreriums/def99547305e1e1818cf74a58e141b74.jpg",
      },
    ],
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: "AQ-8912403",
    user_id: "usr_priya_305",
    total_amount: 4299,
    status: "pending",
    shipping_address: {
      fullName: "Priya Nair",
      email: "priya.nair@example.com",
      phone: "+91 97401 54321",
      address: "18, Lake View Enclave, Banjara Hills",
      city: "Hyderabad",
      state: "Telangana",
      zip: "500034",
    },
    payment_id: "COD",
    items: [
      {
        id: "woodland-lamp-terrarium",
        name: "Woodland Lamp Terrarium",
        price: 4299,
        quantity: 1,
        image_url: "/images/terreriums/0ebd25dbf195a4653893506c176842ed.jpg",
      },
    ],
    created_at: new Date(Date.now() - 4 * 3600000).toISOString(),
  },
];

export const db = {
  // -------------------------------------------------------------
  // PRODUCTS
  // -------------------------------------------------------------
  getProducts: async (): Promise<StoreProduct[]> => {
    if (typeof window === "undefined") return LOCAL_CATALOG;

    // Check localStorage cache
    try {
      const cached = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}

    // If Supabase is configured, fetch from Supabase
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(data));
          return data as StoreProduct[];
        }
      } catch {}
    }

    // Default to seeded catalog
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(LOCAL_CATALOG));
    return LOCAL_CATALOG;
  },

  addProduct: async (newProd: Omit<StoreProduct, "id" | "created_at"> & { id?: string }): Promise<StoreProduct> => {
    const product: StoreProduct = {
      ...newProd,
      id: newProd.id || `biotope-${Date.now().toString().slice(-6)}`,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        await supabase.from("products").insert([product]);
      } catch {}
    }

    if (typeof window !== "undefined") {
      const current = await db.getProducts();
      const updated = [product, ...current];
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("aquaterra_db_updated"));
    }

    return product;
  },

  updateProduct: async (id: string, updates: Partial<StoreProduct>): Promise<StoreProduct | null> => {
    if (isSupabaseConfigured) {
      try {
        await supabase.from("products").update(updates).eq("id", id);
      } catch {}
    }

    if (typeof window !== "undefined") {
      const current = await db.getProducts();
      const idx = current.findIndex((p) => p.id === id);
      if (idx !== -1) {
        current[idx] = { ...current[idx], ...updates };
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(current));
        window.dispatchEvent(new Event("aquaterra_db_updated"));
        return current[idx];
      }
    }

    return null;
  },

  deleteProduct: async (id: string): Promise<boolean> => {
    if (isSupabaseConfigured) {
      try {
        await supabase.from("products").delete().eq("id", id);
      } catch {}
    }

    if (typeof window !== "undefined") {
      const current = await db.getProducts();
      const filtered = current.filter((p) => p.id !== id);
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new Event("aquaterra_db_updated"));
      return true;
    }

    return false;
  },

  // -------------------------------------------------------------
  // ORDERS
  // -------------------------------------------------------------
  getOrders: async (): Promise<CustomerOrder[]> => {
    if (typeof window === "undefined") return INITIAL_ORDERS;

    // Check localStorage cache
    try {
      const cached = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}

    // Check Supabase
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(data));
          return data as CustomerOrder[];
        }
      } catch {}
    }

    // Default to INITIAL_ORDERS
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  },

  createOrder: async (orderData: Omit<CustomerOrder, "id" | "created_at">): Promise<CustomerOrder> => {
    const order: CustomerOrder = {
      ...orderData,
      id: `AQ-${Date.now().toString().slice(-8)}`,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        await supabase.from("orders").insert([order]);
      } catch {}
    }

    if (typeof window !== "undefined") {
      const current = await db.getOrders();
      const updated = [order, ...current];
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
      localStorage.setItem("aquaterra_last_order", JSON.stringify(order));
      window.dispatchEvent(new Event("aquaterra_db_updated"));
    }

    return order;
  },

  updateOrderStatus: async (orderId: string, status: CustomerOrder["status"]): Promise<boolean> => {
    if (isSupabaseConfigured) {
      try {
        await supabase.from("orders").update({ status }).eq("id", orderId);
      } catch {}
    }

    if (typeof window !== "undefined") {
      const current = await db.getOrders();
      const idx = current.findIndex((o) => o.id === orderId);
      if (idx !== -1) {
        current[idx].status = status;
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(current));
        window.dispatchEvent(new Event("aquaterra_db_updated"));
        return true;
      }
    }

    return false;
  },

  deleteOrder: async (orderId: string): Promise<boolean> => {
    if (isSupabaseConfigured) {
      try {
        await supabase.from("orders").delete().eq("id", orderId);
      } catch {}
    }

    if (typeof window !== "undefined") {
      const current = await db.getOrders();
      const filtered = current.filter((o) => o.id !== orderId);
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new Event("aquaterra_db_updated"));
      return true;
    }

    return false;
  },

  // -------------------------------------------------------------
  // METRICS & STATS
  // -------------------------------------------------------------
  getStats: async () => {
    const products = await db.getProducts();
    const orders = await db.getOrders();

    const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);
    const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "processing").length;
    const totalInventoryCount = products.reduce((sum, p) => sum + (Number(p.stock) || 0), 0);
    const lowStockCount = products.filter((p) => Number(p.stock) <= 3).length;

    return {
      totalRevenue,
      totalOrders: orders.length,
      pendingOrders,
      catalogSize: products.length,
      totalInventoryCount,
      lowStockCount,
    };
  },
};
