/* =============================================================
   Admin Dashboard — Theme Park Stays
   Golden Hour Luxury Design
   Owner dashboard for viewing orders, revenue, and inventory
   ============================================================= */
import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import {
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  AlertCircle,
  Edit2,
  Plus,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

export default function AdminDashboard({ defaultTab = "overview" }: { defaultTab?: "overview" | "orders" | "inventory" }) {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "inventory">(defaultTab);
  const [showEditProduct, setShowEditProduct] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<any>({});

  // Fetch analytics
  const { data: analytics, isLoading: analyticsLoading } = trpc.admin.getOrdersAnalytics.useQuery(undefined);

  // Fetch orders
  const { data: ordersData, isLoading: ordersLoading } = trpc.admin.getAllOrders.useQuery(
    { page: 1, limit: 20, status: "all" }
  );

  // Fetch inventory
  const { data: inventory, isLoading: inventoryLoading } = trpc.admin.getProductInventory.useQuery(undefined);

  // Fetch revenue summary
  const { data: revenueSummary } = trpc.admin.getRevenueSummary.useQuery(
    { startDate: undefined, endDate: undefined }
  );

  // Update product mutation
  const updateProductMutation = trpc.admin.updateProduct.useMutation();

  const handleEditProduct = (product: any) => {
    setShowEditProduct(product.productId);
    setEditFormData(product);
  };

  const handleSaveProduct = async () => {
    if (!showEditProduct) return;

    try {
      await updateProductMutation.mutateAsync({
        productId: showEditProduct,
        name: editFormData.name,
        price: editFormData.price,
        isActive: editFormData.isActive,
        maxQuantityPerOrder: editFormData.maxQuantityPerOrder,
        description: editFormData.description,
      });

      setShowEditProduct(null);
      setEditFormData({});
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <AdminLayout title="Owner Dashboard">
    <div className="bg-[oklch(0.97_0.01_75)]">
      <div className="py-12 px-4">
        <div className="container max-w-7xl">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-sm text-stone-500 mb-3">
              <button onClick={() => navigate("/admin")} className="hover:text-amber-600 transition-colors">
                ← Admin Home
              </button>
            </div>
            <h1 className="text-4xl font-bold text-[oklch(0.18_0.012_55)] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Owner Dashboard
            </h1>
            <p className="text-[oklch(0.5_0.02_60)]">
              Manage your Theme Park Stays business
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-[oklch(0.92_0.015_75)]">
            {["overview", "orders", "inventory"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-[oklch(0.58_0.16_55)] text-[oklch(0.58_0.16_55)]"
                    : "border-transparent text-[oklch(0.5_0.02_60)] hover:text-[oklch(0.18_0.012_55)]"
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {tab === "overview" && "Overview"}
                {tab === "orders" && "Orders"}
                {tab === "inventory" && "Inventory"}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Key metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Revenue */}
                <div className="bg-white rounded-2xl p-6 border border-[oklch(0.92_0.015_75)]">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-[oklch(0.5_0.02_60)] font-medium mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        TOTAL REVENUE
                      </p>
                      <p className="text-3xl font-bold text-[oklch(0.58_0.16_55)]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        ${analytics?.totalRevenue || "0.00"}
                      </p>
                    </div>
                    <div className="p-3 bg-[oklch(0.93_0.025_75)] rounded-lg">
                      <DollarSign size={24} className="text-[oklch(0.58_0.16_55)]" />
                    </div>
                  </div>
                  <p className="text-xs text-[oklch(0.5_0.02_60)]">
                    From {analytics?.completedOrders || 0} completed orders
                  </p>
                </div>

                {/* Total Orders */}
                <div className="bg-white rounded-2xl p-6 border border-[oklch(0.92_0.015_75)]">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-[oklch(0.5_0.02_60)] font-medium mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        TOTAL ORDERS
                      </p>
                      <p className="text-3xl font-bold text-[oklch(0.18_0.012_55)]">
                        {analytics?.totalOrders || 0}
                      </p>
                    </div>
                    <div className="p-3 bg-[oklch(0.93_0.025_75)] rounded-lg">
                      <ShoppingCart size={24} className="text-[oklch(0.18_0.012_55)]" />
                    </div>
                  </div>
                  <p className="text-xs text-[oklch(0.5_0.02_60)]">
                    {analytics?.completedOrders || 0} completed, {analytics?.failedOrders || 0} failed
                  </p>
                </div>

                {/* Completion Rate */}
                <div className="bg-white rounded-2xl p-6 border border-[oklch(0.92_0.015_75)]">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-[oklch(0.5_0.02_60)] font-medium mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        COMPLETION RATE
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        {analytics?.totalOrders ? Math.round((analytics.completedOrders / analytics.totalOrders) * 100) : 0}%
                      </p>
                    </div>
                    <div className="p-3 bg-[oklch(0.93_0.025_75)] rounded-lg">
                      <TrendingUp size={24} className="text-green-600" />
                    </div>
                  </div>
                  <p className="text-xs text-[oklch(0.5_0.02_60)]">
                    Success rate of all orders
                  </p>
                </div>

                {/* Products */}
                <div className="bg-white rounded-2xl p-6 border border-[oklch(0.92_0.015_75)]">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-[oklch(0.5_0.02_60)] font-medium mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        ACTIVE PRODUCTS
                      </p>
                      <p className="text-3xl font-bold text-[oklch(0.18_0.012_55)]">
                        {inventory?.filter((p: any) => p.isActive).length || 0}
                      </p>
                    </div>
                    <div className="p-3 bg-[oklch(0.93_0.025_75)] rounded-lg">
                      <Package size={24} className="text-[oklch(0.18_0.012_55)]" />
                    </div>
                  </div>
                  <p className="text-xs text-[oklch(0.5_0.02_60)]">
                    Out of {inventory?.length || 0} total products
                  </p>
                </div>
              </div>

              {/* Revenue by product */}
              {revenueSummary && (
                <div className="bg-white rounded-2xl p-8 border border-[oklch(0.92_0.015_75)]">
                  <h2 className="text-xl font-bold text-[oklch(0.18_0.012_55)] mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Revenue by Product
                  </h2>
                  <div className="space-y-4">
                    {Object.entries(revenueSummary.productRevenue).map(([productId, data]: any) => (
                      <div key={productId} className="flex items-center justify-between p-4 bg-[oklch(0.93_0.025_75)] rounded-lg">
                        <div>
                          <p className="font-semibold text-[oklch(0.18_0.012_55)]">{productId}</p>
                          <p className="text-sm text-[oklch(0.5_0.02_60)]">{data.count} units sold</p>
                        </div>
                        <p className="text-lg font-bold text-[oklch(0.58_0.16_55)]">
                          ${data.revenue.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-2xl border border-[oklch(0.92_0.015_75)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[oklch(0.92_0.015_75)] bg-[oklch(0.93_0.025_75)]">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.18_0.012_55)]">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.18_0.012_55)]">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.18_0.012_55)]">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.18_0.012_55)]">
                        Items
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.18_0.012_55)]">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordersLoading ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center">
                          <Loader2 className="w-6 h-6 animate-spin mx-auto text-[oklch(0.58_0.16_55)]" />
                        </td>
                      </tr>
                    ) : ordersData?.orders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-[oklch(0.5_0.02_60)]">
                          No orders yet
                        </td>
                      </tr>
                    ) : (
                      ordersData?.orders.map((order: any) => (
                        <tr key={order.id} className="border-b border-[oklch(0.92_0.015_75)] hover:bg-[oklch(0.98_0.01_75)]">
                          <td className="px-6 py-4 font-semibold text-[oklch(0.18_0.012_55)]">
                            #{order.id.toString().padStart(6, "0")}
                          </td>
                          <td className="px-6 py-4 text-sm text-[oklch(0.5_0.02_60)]">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 font-semibold text-[oklch(0.58_0.16_55)]">
                            ${order.amount}
                          </td>
                          <td className="px-6 py-4 text-sm text-[oklch(0.5_0.02_60)]">
                            {order.items.length} item(s)
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                order.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "failed"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Inventory Tab */}
          {activeTab === "inventory" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[oklch(0.18_0.012_55)]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Product Inventory
                </h2>
                <button className="btn-amber px-4 py-2 rounded-lg flex items-center gap-2">
                  <Plus size={18} />
                  Add Product
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inventoryLoading ? (
                  <div className="col-span-full flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-[oklch(0.58_0.16_55)]" />
                  </div>
                ) : inventory?.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-[oklch(0.5_0.02_60)]">
                    No products found
                  </div>
                ) : (
                  inventory?.map((product: any) => (
                    <div
                      key={product.productId}
                      className="bg-white rounded-2xl p-6 border border-[oklch(0.92_0.015_75)]"
                    >
                      {showEditProduct === product.productId ? (
                        // Edit mode
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={editFormData.name}
                            onChange={e => setEditFormData({ ...editFormData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-[oklch(0.92_0.015_75)] rounded-lg"
                            placeholder="Product name"
                          />
                          <input
                            type="number"
                            value={editFormData.price}
                            onChange={e => setEditFormData({ ...editFormData, price: parseFloat(e.target.value) })}
                            className="w-full px-3 py-2 border border-[oklch(0.92_0.015_75)] rounded-lg"
                            placeholder="Price"
                            step="0.01"
                          />
                          <input
                            type="number"
                            value={editFormData.maxQuantityPerOrder}
                            onChange={e => setEditFormData({ ...editFormData, maxQuantityPerOrder: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 border border-[oklch(0.92_0.015_75)] rounded-lg"
                            placeholder="Max quantity"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveProduct}
                              disabled={updateProductMutation.isPending}
                              className="flex-1 btn-amber px-3 py-2 rounded-lg text-sm disabled:opacity-50"
                            >
                              {updateProductMutation.isPending ? "Saving..." : "Save"}
                            </button>
                            <button
                              onClick={() => setShowEditProduct(null)}
                              className="flex-1 px-3 py-2 border border-[oklch(0.92_0.015_75)] rounded-lg text-sm hover:bg-[oklch(0.93_0.025_75)]"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        // View mode
                        <>
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-[oklch(0.18_0.012_55)]">
                                {product.name}
                              </h3>
                              <p className="text-xs text-[oklch(0.5_0.02_60)] mt-1">
                                {product.category}
                              </p>
                            </div>
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="p-2 hover:bg-[oklch(0.93_0.025_75)] rounded-lg transition-colors"
                            >
                              <Edit2 size={16} className="text-[oklch(0.58_0.16_55)]" />
                            </button>
                          </div>

                          <div className="space-y-3 mb-4">
                            <div className="flex justify-between">
                              <span className="text-sm text-[oklch(0.5_0.02_60)]">Price</span>
                              <span className="font-semibold text-[oklch(0.58_0.16_55)]">
                                ${parseFloat(product.price).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-[oklch(0.5_0.02_60)]">Max per order</span>
                              <span className="font-semibold text-[oklch(0.18_0.012_55)]">
                                {product.maxQuantityPerOrder}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-[oklch(0.5_0.02_60)]">Status</span>
                              <span
                                className={`text-sm font-semibold flex items-center gap-1 ${
                                  product.isActive ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                {product.isActive ? (
                                  <>
                                    <Eye size={14} /> Active
                                  </>
                                ) : (
                                  <>
                                    <EyeOff size={14} /> Inactive
                                  </>
                                )}
                              </span>
                            </div>
                          </div>

                          {product.description && (
                            <p className="text-xs text-[oklch(0.5_0.02_60)] mb-4">
                              {product.description}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}
