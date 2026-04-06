import { useState } from "react";
import { ChevronDown, Search, Filter, Eye, AlertCircle, CheckCircle, Clock, Loader2, Mail } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface OrderFilters {
  status: "all" | "pending" | "completed" | "failed" | "cancelled";
  searchTerm: string;
  page: number;
}

export function OrderManagement() {
  const [filters, setFilters] = useState<OrderFilters>({
    status: "all",
    searchTerm: "",
    page: 1,
  });
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [statusUpdateOrder, setStatusUpdateOrder] = useState<any>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [notifyCustomer, setNotifyCustomer] = useState(true);

  // Update order status mutation
  const updateStatusMutation = trpc.admin.updateOrderStatus.useMutation();

  const handleUpdateStatus = async () => {
    if (!statusUpdateOrder || !newStatus) return;

    try {
      await updateStatusMutation.mutateAsync({
        orderId: statusUpdateOrder.id,
        status: newStatus as "pending" | "completed" | "failed" | "cancelled",
        notifyCustomer,
      });
      // Refresh orders
      setStatusUpdateOrder(null);
      setNewStatus("");
      setNotifyCustomer(true);
      // Trigger a refresh of the orders list
      window.location.reload();
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  // Fetch orders with filters
  const { data: ordersData, isLoading: ordersLoading } = trpc.admin.getAllOrders.useQuery({
    page: filters.page,
    limit: 10,
    status: filters.status,
  });

  // Filter orders by search term
  const filteredOrders = ordersData?.orders.filter((order: any) =>
    order.id.toString().includes(filters.searchTerm) ||
    order.guestEmail?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
    order.guestName?.toLowerCase().includes(filters.searchTerm.toLowerCase())
  ) || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "failed":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "failed":
        return "bg-red-50 text-red-700 border-red-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "cancelled":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[oklch(0.18_0.012_55)]" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Order Management
          </h2>
          <p className="text-sm text-[oklch(0.5_0.02_60)] mt-1">
            Total: {ordersData?.total || 0} orders
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[oklch(0.92_0.015_75)] p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[oklch(0.5_0.02_60)]" />
            <input
              type="text"
              placeholder="Search by Order ID, Email, or Name"
              value={filters.searchTerm}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value, page: 1 })}
              className="w-full pl-10 pr-4 py-2 border border-[oklch(0.92_0.015_75)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.58_0.16_55)]"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-3 w-5 h-5 text-[oklch(0.5_0.02_60)]" />
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value as any, page: 1 })}
              className="w-full pl-10 pr-4 py-2 border border-[oklch(0.92_0.015_75)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.58_0.16_55)] appearance-none bg-white"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-[oklch(0.5_0.02_60)] pointer-events-none" />
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-end text-sm text-[oklch(0.5_0.02_60)]">
            Showing {filteredOrders.length} of {ordersData?.total || 0} orders
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[oklch(0.92_0.015_75)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[oklch(0.92_0.015_75)] bg-[oklch(0.93_0.025_75)]">
                <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.18_0.012_55)]">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[oklch(0.18_0.012_55)]">
                  Customer
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
                <th className="px-6 py-4 text-center text-sm font-semibold text-[oklch(0.18_0.012_55)]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {ordersLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center">
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-[oklch(0.58_0.16_55)] border-t-transparent rounded-full animate-spin" />
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-[oklch(0.5_0.02_60)]">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order: any) => (
                  <tr key={order.id} className="border-b border-[oklch(0.92_0.015_75)] hover:bg-[oklch(0.98_0.01_75)] transition-colors">
                    <td className="px-6 py-4 font-semibold text-[oklch(0.18_0.012_55)]">
                      #{order.id.toString().padStart(6, "0")}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="font-medium text-[oklch(0.18_0.012_55)]">{order.guestName || "N/A"}</div>
                      <div className="text-xs text-[oklch(0.5_0.02_60)]">{order.guestEmail || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[oklch(0.5_0.02_60)]">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 font-semibold text-[oklch(0.58_0.16_55)]">
                      ${parseFloat(order.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-[oklch(0.5_0.02_60)]">
                      {Array.isArray(order.items) ? order.items.length : 0} item(s)
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowDetails(true);
                        }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[oklch(0.93_0.025_75)] hover:bg-[oklch(0.88_0.025_75)] text-[oklch(0.58_0.16_55)] transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-xs font-medium">View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {ordersData && ordersData.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setFilters({ ...filters, page: Math.max(1, filters.page - 1) })}
            disabled={filters.page === 1}
            className="px-4 py-2 rounded-lg border border-[oklch(0.92_0.015_75)] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[oklch(0.93_0.025_75)]"
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: ordersData.pages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setFilters({ ...filters, page })}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  filters.page === page
                    ? "bg-[oklch(0.58_0.16_55)] text-white"
                    : "border border-[oklch(0.92_0.015_75)] hover:bg-[oklch(0.93_0.025_75)]"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setFilters({ ...filters, page: Math.min(ordersData.pages, filters.page + 1) })}
            disabled={filters.page === ordersData.pages}
            className="px-4 py-2 rounded-lg border border-[oklch(0.92_0.015_75)] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[oklch(0.93_0.025_75)]"
          >
            Next
          </button>
        </div>
      )}

      {/* Order Details Modal */}
      {showDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-[oklch(0.92_0.015_75)] px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[oklch(0.18_0.012_55)]">
                Order #{selectedOrder.id.toString().padStart(6, "0")}
              </h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-[oklch(0.5_0.02_60)] hover:text-[oklch(0.18_0.012_55)]"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Header Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[oklch(0.5_0.02_60)] font-medium mb-1">Order Date</p>
                  <p className="font-semibold text-[oklch(0.18_0.012_55)]">
                    {new Date(selectedOrder.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[oklch(0.5_0.02_60)] font-medium mb-1">Status</p>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusIcon(selectedOrder.status)}
                    <span className="capitalize">{selectedOrder.status}</span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="bg-[oklch(0.93_0.025_75)] rounded-lg p-4">
                <h4 className="font-semibold text-[oklch(0.18_0.012_55)] mb-3">Customer Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-[oklch(0.5_0.02_60)]">Name</p>
                    <p className="font-medium text-[oklch(0.18_0.012_55)]">{selectedOrder.guestName || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-[oklch(0.5_0.02_60)]">Email</p>
                    <p className="font-medium text-[oklch(0.18_0.012_55)]">{selectedOrder.guestEmail || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold text-[oklch(0.18_0.012_55)] mb-3">Order Items</h4>
                <div className="space-y-2">
                  {Array.isArray(selectedOrder.items) && selectedOrder.items.length > 0 ? (
                    selectedOrder.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-[oklch(0.93_0.025_75)] rounded-lg">
                        <div>
                          <p className="font-medium text-[oklch(0.18_0.012_55)]">{item.name || `Item ${idx + 1}`}</p>
                          <p className="text-xs text-[oklch(0.5_0.02_60)]">Qty: {item.quantity || 1}</p>
                        </div>
                        <p className="font-semibold text-[oklch(0.58_0.16_55)]">
                          ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-[oklch(0.5_0.02_60)]">No items in this order</p>
                  )}
                </div>
              </div>

              {/* Order Total */}
              <div className="border-t border-[oklch(0.92_0.015_75)] pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-[oklch(0.18_0.012_55)]">Total Amount</p>
                  <p className="text-2xl font-bold text-[oklch(0.58_0.16_55)]">
                    ${parseFloat(selectedOrder.amount).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Payment Info */}
              {selectedOrder.stripeSessionId && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-xs text-blue-600 font-medium mb-1">Stripe Session ID</p>
                  <p className="text-xs text-blue-700 font-mono break-all">{selectedOrder.stripeSessionId}</p>
                </div>
              )}

              {/* Status Update Section */}
              <div className="bg-[oklch(0.93_0.025_75)] rounded-lg p-4 border border-[oklch(0.92_0.015_75)]">
                <h4 className="font-semibold text-[oklch(0.18_0.012_55)] mb-3">Update Order Status</h4>
                <div className="space-y-3">
                  <select
                    value={statusUpdateOrder?.id === selectedOrder.id ? newStatus : selectedOrder.status}
                    onChange={(e) => {
                      setStatusUpdateOrder(selectedOrder);
                      setNewStatus(e.target.value);
                    }}
                    className="w-full px-3 py-2 border border-[oklch(0.92_0.015_75)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[oklch(0.58_0.16_55)]"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifyCustomer}
                      onChange={(e) => setNotifyCustomer(e.target.checked)}
                      className="w-4 h-4 rounded border-[oklch(0.92_0.015_75)] cursor-pointer"
                    />
                    <span className="text-sm text-[oklch(0.18_0.012_55)]">Notify customer via email</span>
                  </label>
                  {statusUpdateOrder?.id === selectedOrder.id && newStatus && newStatus !== selectedOrder.status && (
                    <button
                      onClick={handleUpdateStatus}
                      disabled={updateStatusMutation.isPending}
                      className="w-full px-4 py-2 rounded-lg bg-[oklch(0.58_0.16_55)] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {updateStatusMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          Update Status
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  setShowDetails(false);
                  setStatusUpdateOrder(null);
                  setNewStatus("");
                }}
                className="w-full px-4 py-2 rounded-lg bg-[oklch(0.58_0.16_55)] text-white font-medium hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );


}
