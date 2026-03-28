/* =============================================================
   AdminUsers — User Management Page
   Add admins by email, promote/demote roles, remove users
   ============================================================= */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import AdminGuard from "@/components/AdminGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  UserPlus,
  ShieldCheck,
  ShieldOff,
  Trash2,
  Search,
  Crown,
  User,
  Mail,
  Clock,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

type UserRow = {
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  role: string;
  loginMethod: string | null;
  lastSignedIn: Date | null;
  createdAt: Date | null;
};

function formatDate(d: Date | null | undefined) {
  if (!d) return "Never";
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function RoleBadge({ role }: { role: string }) {
  if (role === "admin") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
        <Crown className="w-3 h-3" />
        Admin
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-600 border border-stone-200">
      <User className="w-3 h-3" />
      User
    </span>
  );
}

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const utils = trpc.useUtils();

  const { data: allUsers = [], isLoading, refetch } = trpc.admin.getAllUsers.useQuery();

  const setRoleMutation = trpc.admin.setUserRole.useMutation({
    onSuccess: () => {
      utils.admin.getAllUsers.invalidate();
      toast.success("Role updated successfully");
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteMutation = trpc.admin.deleteUser.useMutation({
    onSuccess: () => {
      utils.admin.getAllUsers.invalidate();
      toast.success("User removed successfully");
    },
    onError: (e) => toast.error(e.message),
  });

  const inviteMutation = trpc.admin.inviteAdmin.useMutation({
    onSuccess: () => {
      utils.admin.getAllUsers.invalidate();
      setInviteOpen(false);
      setInviteEmail("");
      setInviteName("");
      toast.success("Admin invited! They'll have access once they sign in.");
    },
    onError: (e) => toast.error(e.message),
  });

  const [search, setSearch] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<UserRow | null>(null);
  const [filter, setFilter] = useState<"all" | "admin" | "user">("all");

  const filtered = allUsers.filter((u) => {
    const matchesSearch =
      !search ||
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || u.role === filter;
    return matchesSearch && matchesFilter;
  });

  const adminCount = allUsers.filter((u) => u.role === "admin").length;
  const userCount = allUsers.filter((u) => u.role === "user").length;

  const isCurrentUser = (u: UserRow) => u.email === currentUser?.email;

  return (
    <AdminGuard>
      <AdminLayout title="User Management">
        <div className="max-w-5xl mx-auto px-4 py-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-stone-900">User Management</h1>
              <p className="text-stone-500 mt-1 text-sm">
                Manage who has access to the admin panel.
              </p>
            </div>
            <Button
              onClick={() => setInviteOpen(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white gap-2 self-start sm:self-auto"
            >
              <UserPlus className="w-4 h-4" />
              Add Admin
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total Users", value: allUsers.length, icon: User, color: "text-stone-600", bg: "bg-stone-50" },
              { label: "Admins", value: adminCount, icon: Crown, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Regular Users", value: userCount, icon: User, color: "text-blue-600", bg: "bg-blue-50" },
            ].map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className={`${bg} rounded-xl p-4 border border-stone-100`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${color}`} />
                  <span className="text-xs font-medium text-stone-500 uppercase tracking-wide">{label}</span>
                </div>
                <p className={`text-2xl font-bold ${color}`}>{value}</p>
              </div>
            ))}
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <Input
                placeholder="Search by name or email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "admin", "user"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    filter === f
                      ? "bg-amber-500 text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {f}
                </button>
              ))}
              <button
                onClick={() => refetch()}
                className="p-2 rounded-lg bg-stone-100 text-stone-500 hover:bg-stone-200 transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* User Table */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-stone-400">
                <User className="w-10 h-10 mb-3 opacity-30" />
                <p className="font-medium">No users found</p>
                <p className="text-sm mt-1">Try adjusting your search or filter</p>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {/* Table header */}
                <div className="hidden sm:grid grid-cols-[1fr_1.5fr_auto_auto_auto] gap-4 px-6 py-3 bg-stone-50 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  <span>Name</span>
                  <span>Email</span>
                  <span>Role</span>
                  <span>Last Sign In</span>
                  <span>Actions</span>
                </div>

                {filtered.map((u) => {
                  const isSelf = isCurrentUser(u);
                  const isInvited = u.loginMethod === "invited";
                  return (
                    <div
                      key={u.id}
                      className="grid grid-cols-1 sm:grid-cols-[1fr_1.5fr_auto_auto_auto] gap-2 sm:gap-4 px-6 py-4 items-center hover:bg-stone-50 transition-colors"
                    >
                      {/* Name */}
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {(u.name || u.email || "?")[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-stone-900 truncate">
                            {u.name || <span className="text-stone-400 italic">No name</span>}
                            {isSelf && (
                              <span className="ml-2 text-xs text-amber-600 font-normal">(you)</span>
                            )}
                          </p>
                          {isInvited && (
                            <p className="text-xs text-amber-500 font-medium">Pending sign-in</p>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-1.5 text-sm text-stone-600 min-w-0">
                        <Mail className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                        <span className="truncate">{u.email || <span className="text-stone-400 italic">No email</span>}</span>
                      </div>

                      {/* Role */}
                      <div>
                        <RoleBadge role={u.role} />
                      </div>

                      {/* Last sign in */}
                      <div className="flex items-center gap-1.5 text-xs text-stone-400">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                        {formatDate(u.lastSignedIn)}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {!isSelf && u.role === "user" && (
                          <button
                            onClick={() => setRoleMutation.mutate({ userId: u.id, role: "admin" })}
                            disabled={setRoleMutation.isPending}
                            title="Promote to Admin"
                            className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors disabled:opacity-40"
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </button>
                        )}
                        {!isSelf && u.role === "admin" && (
                          <button
                            onClick={() => setRoleMutation.mutate({ userId: u.id, role: "user" })}
                            disabled={setRoleMutation.isPending}
                            title="Revoke Admin"
                            className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 transition-colors disabled:opacity-40"
                          >
                            <ShieldOff className="w-4 h-4" />
                          </button>
                        )}
                        {!isSelf && (
                          <button
                            onClick={() => setDeleteTarget(u)}
                            title="Remove User"
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                        {isSelf && (
                          <span className="text-xs text-stone-300 italic px-1">—</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-stone-400">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> Promote to admin</span>
            <span className="flex items-center gap-1"><ShieldOff className="w-3.5 h-3.5 text-stone-400" /> Revoke admin access</span>
            <span className="flex items-center gap-1"><Trash2 className="w-3.5 h-3.5 text-red-400" /> Remove user record</span>
          </div>
        </div>

        {/* ── Invite Admin Dialog ── */}
        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-serif text-xl">
                <UserPlus className="w-5 h-5 text-amber-500" />
                Add New Admin
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <p className="text-sm text-stone-500">
                Enter the person's email address. They'll automatically receive admin access the first time they sign in with that email.
              </p>
              <div className="space-y-1.5">
                <Label htmlFor="invite-email">Email Address <span className="text-red-500">*</span></Label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="admin@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && inviteEmail && inviteMutation.mutate({ email: inviteEmail, name: inviteName })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="invite-name">Name <span className="text-stone-400 font-normal">(optional)</span></Label>
                <Input
                  id="invite-name"
                  placeholder="e.g. Chad"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setInviteOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => inviteMutation.mutate({ email: inviteEmail, name: inviteName })}
                disabled={!inviteEmail || inviteMutation.isPending}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                {inviteMutation.isPending ? "Adding…" : "Add Admin"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ── Delete Confirmation ── */}
        <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove User?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently remove <strong>{deleteTarget?.name || deleteTarget?.email || "this user"}</strong> from the system. If they sign in again, a new record will be created with default user access.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (deleteTarget) {
                    deleteMutation.mutate({ userId: deleteTarget.id });
                    setDeleteTarget(null);
                  }
                }}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </AdminGuard>
  );
}
