"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Plus,
  Search,
  Trash2,
  Edit2,
  Check,
  X,
  Truck,
  RotateCcw,
  SlidersHorizontal,
  ExternalLink,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { db, CustomerOrder } from "@/lib/db";
import { StoreProduct } from "@/lib/catalog";
import { resolveImageAsset, TERRARIUM_IMAGES } from "@/lib/assets";
import { PRIMARY_ADMIN_EMAIL } from "@/lib/firebase";
import { AnimatedButton } from "@/components/AnimatedButton";

const CATEGORIES = ["Terrariums", "Aquascape Kits", "Aquatic Plants"];
const CARE_LEVELS: StoreProduct["care_level"][] = ["Beginner", "Easy", "Moderate", "Advanced"];

export default function AdminPage() {
  const router = useRouter();

  // Active Tab: 'overview' | 'inventory' | 'orders' | 'settings'
  const [activeTab, setActiveTab] = useState<"overview" | "inventory" | "orders" | "settings">("inventory");

  // Data State
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    catalogSize: 0,
    totalInventoryCount: 0,
    lowStockCount: 0,
  });
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [inventorySearch, setInventorySearch] = useState("");
  const [ordersSearch, setOrdersSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("all");

  // Add Product Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    series: "Studio Terrariums",
    category: "Terrariums",
    description: "",
    price: 3499,
    stock: 10,
    care_level: "Beginner" as StoreProduct["care_level"],
    size: "26 x 32 cm",
    is_featured: false,
    is_limited: false,
    image_url: TERRARIUM_IMAGES.sunlightBowl,
  });

  // Edit Product Modal
  const [editingProduct, setEditingProduct] = useState<StoreProduct | null>(null);

  // Success / Notice Toast
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  // Load All Data from Working DB
  const loadData = async () => {
    setLoading(true);
    const prods = await db.getProducts();
    const ords = await db.getOrders();
    const st = await db.getStats();

    setProducts(prods);
    setOrders(ords);
    setStats(st);
    setLoading(false);
  };

  const handleTabChange = (tab: "overview" | "inventory" | "orders" | "settings") => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("tab", tab);
        window.history.replaceState({}, "", url.toString());
      } catch {}
    }
  };

  useEffect(() => {
    loadData();

    try {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "inventory" || tabParam === "orders" || tabParam === "settings" || tabParam === "overview") {
        setActiveTab(tabParam as any);
      }
    } catch {}

    // Listen for custom db update events
    const handleDbUpdate = () => {
      loadData();
    };
    window.addEventListener("aquaterra_db_updated", handleDbUpdate);
    return () => window.removeEventListener("aquaterra_db_updated", handleDbUpdate);
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    const q = inventorySearch.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.series.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [products, inventorySearch]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    const q = ordersSearch.trim().toLowerCase();
    return orders.filter((o) => {
      const matchSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        (o.shipping_address?.fullName || "").toLowerCase().includes(q) ||
        (o.shipping_address?.city || "").toLowerCase().includes(q);
      const matchStatus = orderStatusFilter === "all" || o.status === orderStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, ordersSearch, orderStatusFilter]);

  // Handle Quick Stock Adjust (+1 / -1)
  const handleStockDelta = async (prod: StoreProduct, delta: number) => {
    const newStock = Math.max(0, (prod.stock || 0) + delta);
    await db.updateProduct(prod.id, { stock: newStock });
    showNotice(`Updated stock for ${prod.name} to ${newStock}`);
    loadData();
  };

  // Handle Add Product
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim()) return;

    await db.addProduct({
      name: newProduct.name,
      series: newProduct.series,
      category: newProduct.category,
      description: newProduct.description,
      price: Number(newProduct.price) || 2999,
      stock: Number(newProduct.stock) || 5,
      care_level: newProduct.care_level,
      size: newProduct.size,
      is_featured: newProduct.is_featured,
      is_limited: newProduct.is_limited,
      image_url: newProduct.image_url,
    });

    setIsAddModalOpen(false);
    showNotice(`Added new specimen: ${newProduct.name}`);
    setNewProduct({
      name: "",
      series: "Studio Terrariums",
      category: "Terrariums",
      description: "",
      price: 3499,
      stock: 10,
      care_level: "Beginner",
      size: "26 x 32 cm",
      is_featured: false,
      is_limited: false,
      image_url: TERRARIUM_IMAGES.sunlightBowl,
    });
    loadData();
  };

  // Handle Edit Product
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    await db.updateProduct(editingProduct.id, {
      name: editingProduct.name,
      series: editingProduct.series,
      category: editingProduct.category,
      description: editingProduct.description,
      price: Number(editingProduct.price),
      stock: Number(editingProduct.stock),
      care_level: editingProduct.care_level,
      size: editingProduct.size,
      is_featured: editingProduct.is_featured,
      is_limited: editingProduct.is_limited,
    });

    setEditingProduct(null);
    showNotice(`Saved edits for ${editingProduct.name}`);
    loadData();
  };

  // Handle Delete Product
  const handleDeleteProduct = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the store inventory?`)) {
      await db.deleteProduct(id);
      showNotice(`Removed ${name} from catalog`);
      loadData();
    }
  };

  // Handle Order Status Change
  const handleUpdateOrderStatus = async (orderId: string, status: CustomerOrder["status"]) => {
    await db.updateOrderStatus(orderId, status);
    showNotice(`Order #${orderId} marked as ${status.toUpperCase()}`);
    loadData();
  };

  // Handle Delete Order
  const handleDeleteOrder = async (orderId: string) => {
    if (confirm(`Delete record for order #${orderId}?`)) {
      await db.deleteOrder(orderId);
      showNotice(`Deleted order #${orderId}`);
      loadData();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Toast Notice */}
      {notice && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 p-4 rounded-2xl bg-zinc-900 text-white text-xs font-mono font-bold shadow-xl flex items-center space-x-2 animate-in slide-in-from-top-4">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{notice}</span>
        </div>
      )}

      {/* Top Header (Matches AnonVote Admin Hub Exact Styling) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-100">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold text-zinc-700 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
            <span>STUDIO OPERATIONS COMMAND</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-950 tracking-tight">
            Master Administration Hub
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-normal mt-1">
            Logged in as <strong className="text-zinc-900 font-mono">{PRIMARY_ADMIN_EMAIL}</strong> · Direct database management
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <AnimatedButton
            onClick={() => setIsAddModalOpen(true)}
            variant="dark"
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Specimen</span>
          </AnimatedButton>

          <Link
            href="/shop"
            target="_blank"
            className="p-2.5 rounded-xl bg-[#f4f4f6] text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200 transition-all cursor-pointer"
            title="Open Live Shop in New Tab"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Metric Stat Cards (AnonVote Style) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-[#f4f4f6] rounded-[28px] p-5 sm:p-6 border border-zinc-200/60">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider font-mono">
            Total Revenue
          </span>
          <p className="text-2xl sm:text-3xl font-bold text-zinc-950 font-mono tracking-tight mt-1.5">
            ₹{stats.totalRevenue.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] text-zinc-400 font-mono mt-1">From confirmed orders</p>
        </div>

        <div className="bg-[#f4f4f6] rounded-[28px] p-5 sm:p-6 border border-zinc-200/60">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider font-mono">
            Pending Dispatch
          </span>
          <p className="text-2xl sm:text-3xl font-bold text-amber-600 font-mono tracking-tight mt-1.5">
            {stats.pendingOrders}
          </p>
          <p className="text-[11px] text-zinc-400 font-mono mt-1">Awaiting packaging</p>
        </div>

        <div className="bg-[#f4f4f6] rounded-[28px] p-5 sm:p-6 border border-zinc-200/60">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider font-mono">
            Catalog Size
          </span>
          <p className="text-2xl sm:text-3xl font-bold text-zinc-950 font-mono tracking-tight mt-1.5">
            {stats.catalogSize}
          </p>
          <p className="text-[11px] text-zinc-400 font-mono mt-1">{stats.totalInventoryCount} units total stock</p>
        </div>

        <div className="bg-[#f4f4f6] rounded-[28px] p-5 sm:p-6 border border-zinc-200/60">
          <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider font-mono">
            Low Stock Alerts
          </span>
          <p className="text-2xl sm:text-3xl font-bold text-red-600 font-mono tracking-tight mt-1.5">
            {stats.lowStockCount}
          </p>
          <p className="text-[11px] text-zinc-400 font-mono mt-1">Less than 4 in stock</p>
        </div>
      </div>

      {/* Navigation Pills (Mobile-Perfect Scrolling) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-100">
        <button
          type="button"
          onClick={() => handleTabChange("inventory")}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
            activeTab === "inventory"
              ? "bg-[#18181b] text-white shadow-xs"
              : "bg-[#f4f4f6] text-zinc-600 hover:text-zinc-950"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Specimen Inventory ({products.length})</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("orders")}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
            activeTab === "orders"
              ? "bg-[#18181b] text-white shadow-xs"
              : "bg-[#f4f4f6] text-zinc-600 hover:text-zinc-950"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("settings")}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center space-x-2 ${
            activeTab === "settings"
              ? "bg-[#18181b] text-white shadow-xs"
              : "bg-[#f4f4f6] text-zinc-600 hover:text-zinc-950"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Database & Studio Config</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: INVENTORY MANAGEMENT                                  */}
      {/* ============================================================ */}
      {activeTab === "inventory" && (
        <div className="space-y-6">
          {/* Search bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inventorySearch}
                onChange={(e) => setInventorySearch(e.target.value)}
                placeholder="Filter specimens by title, series..."
                className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl pl-11 pr-4 py-2.5 text-xs font-medium text-zinc-900 focus:outline-none focus:bg-white focus:border-zinc-900 transition-all"
              />
            </div>

            <span className="text-xs font-mono text-zinc-400">
              Showing {filteredProducts.length} of {products.length} listed
            </span>
          </div>

          {/* Responsive Products Table / Card Grid */}
          <div className="bg-white rounded-[28px] border border-zinc-200/60 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-400 uppercase text-[10px] font-bold bg-[#fafafa]">
                    <th className="py-3.5 px-4 sm:px-6">Specimen</th>
                    <th className="py-3.5 px-4">Series / Care</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Stock</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-zinc-50 transition-colors">
                      {/* Specimen Info */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center space-x-3.5">
                          <div className="w-12 h-12 rounded-xl overflow-hidden relative bg-zinc-100 flex-shrink-0 border border-zinc-200/50">
                            <Image
                              src={resolveImageAsset(prod.image_url)}
                              alt={prod.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-zinc-950 text-xs sm:text-sm truncate">
                              {prod.name}
                            </h4>
                            <p className="text-[11px] text-zinc-400 font-sans truncate">{prod.size}</p>
                          </div>
                        </div>
                      </td>

                      {/* Series & Care */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <p className="font-semibold text-zinc-800">{prod.series}</p>
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-600">
                            {prod.care_level}
                          </span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 font-bold text-zinc-950 text-sm">
                        ₹{Number(prod.price).toLocaleString("en-IN")}
                      </td>

                      {/* Stock Stepper */}
                      <td className="py-4 px-4">
                        <div className="inline-flex items-center rounded-lg bg-[#f4f4f6] border border-zinc-200 p-0.5">
                          <button
                            type="button"
                            onClick={() => handleStockDelta(prod, -1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-zinc-600 hover:bg-white transition-colors cursor-pointer"
                            title="Decrement stock"
                          >
                            -
                          </button>
                          <span
                            className={`w-8 text-center font-bold text-xs ${
                              prod.stock <= 3 ? "text-red-600" : "text-zinc-950"
                            }`}
                          >
                            {prod.stock}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleStockDelta(prod, 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-zinc-600 hover:bg-white transition-colors cursor-pointer"
                            title="Increment stock"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setEditingProduct(prod)}
                            className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors cursor-pointer"
                            title="Edit Specimen"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(prod.id, prod.name)}
                            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                            title="Delete Specimen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: ORDER MANAGEMENT                                      */}
      {/* ============================================================ */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          {/* Orders search & status pills */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={ordersSearch}
                onChange={(e) => setOrdersSearch(e.target.value)}
                placeholder="Search by order ID, customer name, city..."
                className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl pl-11 pr-4 py-2.5 text-xs font-medium text-zinc-900 focus:outline-none focus:bg-white focus:border-zinc-900 transition-all"
              />
            </div>

            {/* Status switcher pills */}
            <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
              {["all", "pending", "shipped", "delivered", "cancelled"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setOrderStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all whitespace-nowrap cursor-pointer ${
                    orderStatusFilter === st
                      ? "bg-zinc-900 text-white"
                      : "bg-[#f4f4f6] text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Orders list */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="bg-[#f4f4f6] rounded-[28px] p-12 text-center text-zinc-400 text-xs font-mono">
                No customer orders matching query.
              </div>
            ) : (
              filteredOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white rounded-[24px] p-5 sm:p-6 border border-zinc-200/70 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono font-bold text-sm text-zinc-950">#{ord.id}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                          ord.status === "delivered"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : ord.status === "shipped"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : ord.status === "cancelled"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {ord.status}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono text-zinc-400">
                        {new Date(ord.created_at).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-sm font-mono font-bold text-zinc-950">
                        ₹{(ord.total_amount || 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Customer details & Items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Destination Address */}
                    <div className="bg-[#f4f4f6] p-4 rounded-xl space-y-1 font-mono">
                      <p className="font-bold text-zinc-900">{ord.shipping_address?.fullName || "Valued Collector"}</p>
                      <p className="text-zinc-600">{ord.shipping_address?.address || "Address on record"}</p>
                      <p className="text-zinc-600">
                        {ord.shipping_address?.city}, {ord.shipping_address?.state} {ord.shipping_address?.zip}
                      </p>
                      <p className="text-zinc-500 pt-1">Phone: {ord.shipping_address?.phone || "N/A"}</p>
                    </div>

                    {/* Items bought */}
                    <div className="space-y-2">
                      {ord.items && ord.items.map((it: any, i: number) => (
                        <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-zinc-100 last:border-0 font-mono">
                          <span className="font-semibold text-zinc-800 truncate pr-2">
                            {it.name} × {it.quantity}
                          </span>
                          <span className="text-zinc-950 font-bold">
                            ₹{(it.price * it.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons to update status */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-100">
                    <span className="text-xs font-mono text-zinc-400">Update Shipment State:</span>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateOrderStatus(ord.id, "processing")}
                        className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold cursor-pointer"
                      >
                        Processing
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateOrderStatus(ord.id, "shipped")}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold cursor-pointer"
                      >
                        Mark Shipped
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateOrderStatus(ord.id, "delivered")}
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold cursor-pointer"
                      >
                        Mark Delivered
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteOrder(ord.id)}
                        className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: CONFIGURATION & SETTINGS                              */}
      {/* ============================================================ */}
      {activeTab === "settings" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#f4f4f6] rounded-[28px] p-6 sm:p-8 space-y-4 border border-zinc-200/60">
            <h3 className="font-bold text-base text-zinc-950">Master Identity</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Designated Administrator Email recognized across the studio system:
            </p>
            <div className="p-3.5 bg-white rounded-xl border border-zinc-200 font-mono text-xs font-bold text-zinc-900">
              {PRIMARY_ADMIN_EMAIL}
            </div>
            <p className="text-[11px] font-mono text-emerald-600">
              ✓ Full Administrative Rights Active
            </p>
          </div>

          <div className="bg-[#f4f4f6] rounded-[28px] p-6 sm:p-8 space-y-4 border border-zinc-200/60">
            <h3 className="font-bold text-base text-zinc-950">Database Synchronization</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Active storage engine: Universal Hybrid DB (Supabase + Persistent Browser Storage).
            </p>
            <button
              type="button"
              onClick={async () => {
                if (confirm("Reset catalog to default 13 handcrafted terrarium specimens?")) {
                  localStorage.removeItem("aquaterra_db_products_v3");
                  localStorage.removeItem("aquaterra_db_orders_v3");
                  await loadData();
                  showNotice("Reset catalog to factory botanical seed.");
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-200 text-xs font-bold text-zinc-800 transition-all cursor-pointer flex items-center space-x-2"
            >
              <RotateCcw className="w-3.5 h-3.5 text-zinc-500" />
              <span>Restore Factory Seed Specimens</span>
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: ADD SPECIMEN                                          */}
      {/* ============================================================ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="absolute inset-0 bg-zinc-900/40 backdrop-blur-xs"
          />

          <div className="relative w-full max-w-lg bg-white rounded-[28px] p-6 sm:p-8 shadow-2xl space-y-5 border border-zinc-200/80 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="font-bold text-lg text-zinc-950">Add Botanical Specimen</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase mb-1">
                  Specimen Name
                </label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Emerald Forest Cloche"
                  className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-900 focus:outline-none focus:bg-white focus:border-zinc-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase mb-1">
                    Series
                  </label>
                  <input
                    type="text"
                    value={newProduct.series}
                    onChange={(e) => setNewProduct({ ...newProduct, series: e.target.value })}
                    className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl px-4 py-2 text-xs font-medium text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl px-4 py-2 text-xs font-medium text-zinc-900"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl px-4 py-2 text-xs font-mono font-bold text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    required
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl px-4 py-2 text-xs font-mono font-bold text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase mb-1">
                    Care Level
                  </label>
                  <select
                    value={newProduct.care_level}
                    onChange={(e) => setNewProduct({ ...newProduct, care_level: e.target.value as any })}
                    className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl px-3 py-2 text-xs font-medium text-zinc-900"
                  >
                    {CARE_LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase mb-1">
                  Dimensions (Size)
                </label>
                <input
                  type="text"
                  value={newProduct.size}
                  onChange={(e) => setNewProduct({ ...newProduct, size: e.target.value })}
                  placeholder="28 x 36 cm cloche"
                  className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl px-4 py-2 text-xs font-medium text-zinc-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Composition details, moss varieties, substrate layers..."
                  className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl p-3 text-xs font-medium text-zinc-900 resize-y"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-white text-xs font-semibold cursor-pointer"
                >
                  Publish Specimen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: EDIT SPECIMEN                                         */}
      {/* ============================================================ */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setEditingProduct(null)}
            className="absolute inset-0 bg-zinc-900/40 backdrop-blur-xs"
          />

          <div className="relative w-full max-w-lg bg-white rounded-[28px] p-6 sm:p-8 shadow-2xl space-y-5 border border-zinc-200/80 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="font-bold text-lg text-zinc-950">Edit {editingProduct.name}</h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase mb-1">
                  Specimen Name
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl px-4 py-2 text-xs font-mono font-bold text-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 uppercase mb-1">
                    Current Stock
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl px-4 py-2 text-xs font-mono font-bold text-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-[#f4f4f6] border border-zinc-200 rounded-xl p-3 text-xs font-medium text-zinc-900 resize-y"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#18181b] hover:bg-zinc-800 text-white text-xs font-semibold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
