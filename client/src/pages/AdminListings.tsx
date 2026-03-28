import { useState, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Pencil, Trash2, Plus, Star, Eye, EyeOff, Home, ArrowLeft,
  Bed, Bath, Users, DollarSign, MapPin, GripVertical, Save,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Listing = {
  id: number;
  name: string;
  tagline: string;
  location: string;
  beds: number;
  baths: string;
  guests: number;
  price: number;
  rating: string;
  reviews: number;
  tags: string[];
  badges: string[];
  image: string;
  houfy_url: string;
  listing_type: string;
  featured: number;
  active: number;
  sort_order: number;
};

type FormData = {
  name: string;
  tagline: string;
  location: string;
  beds: number;
  baths: string;
  guests: number;
  price: number;
  rating: string;
  reviews: number;
  tags: string[];
  badges: string[];
  image: string;
  houfy_url: string;
  listing_type: string;
  featured: number;
  active: number;
  sort_order: number;
};

const emptyForm: FormData = {
  name: "",
  tagline: "",
  location: "",
  beds: 3,
  baths: "2.0",
  guests: 6,
  price: 200,
  rating: "5.00",
  reviews: 0,
  tags: [],
  badges: [],
  image: "",
  houfy_url: "",
  listing_type: "home",
  featured: 0,
  active: 1,
  sort_order: 0,
};

// ─── Sortable listing row ──────────────────────────────────────────────────
function SortableListingRow({
  listing,
  onEdit,
  onDelete,
  onToggleActive,
  onToggleFeatured,
}: {
  listing: Listing;
  onEdit: (l: Listing) => void;
  onDelete: (id: number) => void;
  onToggleActive: (id: number) => void;
  onToggleFeatured: (id: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: listing.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className={`border-0 shadow-sm transition-opacity ${!listing.active ? "opacity-60" : ""}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {/* Drag handle */}
            <button
              {...attributes}
              {...listeners}
              className="mt-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 flex-shrink-0 touch-none"
              title="Drag to reorder"
            >
              <GripVertical className="w-4 h-4" />
            </button>

            <img
              src={listing.image}
              alt={listing.name}
              className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
              onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=200&q=60"; }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm">{listing.name}</h3>
                    {/* Listing type badge */}
                    <Badge
                      className={`text-xs px-1.5 py-0 ${
                        (listing.listing_type || "home") === "room"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {(listing.listing_type || "home") === "room" ? "🛏️ Room" : "🏠 Home"}
                    </Badge>
                    {listing.featured === 1 && <Badge className="bg-amber-100 text-amber-700 text-xs px-1.5 py-0">Featured</Badge>}
                    {!listing.active && <Badge variant="secondary" className="text-xs px-1.5 py-0">Hidden</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{listing.tagline}</p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => onToggleFeatured(listing.id)} title="Toggle featured">
                    <Star className={`w-3.5 h-3.5 ${listing.featured ? "fill-amber-400 text-amber-400" : "text-gray-400"}`} />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => onToggleActive(listing.id)} title="Toggle visibility">
                    {listing.active ? <Eye className="w-3.5 h-3.5 text-green-500" /> : <EyeOff className="w-3.5 h-3.5 text-gray-400" />}
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => onEdit(listing)}>
                    <Pencil className="w-3.5 h-3.5 text-blue-500" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => onDelete(listing.id)}>
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{listing.location}</span>
                <span className="flex items-center gap-1"><Bed className="w-3 h-3" />{listing.beds} beds</span>
                <span className="flex items-center gap-1"><Bath className="w-3 h-3" />{listing.baths} baths</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{listing.guests} guests</span>
                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />from ${listing.price}/night</span>
                <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{listing.rating} ({listing.reviews})</span>
              </div>
              {listing.badges && listing.badges.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {listing.badges.slice(0, 5).map((b: string) => (
                    <span key={b} className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">{b}</span>
                  ))}
                  {listing.badges.length > 5 && <span className="text-xs text-muted-foreground">+{listing.badges.length - 5} more</span>}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── FormDialog is defined OUTSIDE AdminListings so its identity is stable
//     across renders, preventing React from unmounting/remounting it on every
//     keystroke (which would reset focus and scroll position).
type FormDialogProps = {
  open: boolean;
  onClose: () => void;
  editingListing: Listing | null;
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  tagsInput: string;
  setTagsInput: React.Dispatch<React.SetStateAction<string>>;
  badgesInput: string;
  setBadgesInput: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
};

function FormDialog({
  open, onClose, editingListing, form, setForm,
  tagsInput, setTagsInput, badgesInput, setBadgesInput,
  onSubmit, isPending,
}: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingListing ? `Edit: ${editingListing.name}` : "Add New Listing"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Property Name *</Label>
              <Input
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
                placeholder="The Royal Palace"
              />
            </div>
            <div className="col-span-2">
              <Label>Tagline *</Label>
              <Input
                value={form.tagline}
                onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))}
                required
                placeholder="4BR Grand Estate · Resort Pool · Lazy River"
              />
            </div>
            <div className="col-span-2">
              <Label>Location *</Label>
              <Input
                value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                required
                placeholder="Kissimmee, FL — 9 mi to Disney"
              />
            </div>
            <div>
              <Label>Beds</Label>
              <Input
                type="number"
                min={1}
                value={form.beds}
                onChange={e => setForm(f => ({ ...f, beds: +e.target.value }))}
              />
            </div>
            <div>
              <Label>Baths</Label>
              <Input
                value={form.baths}
                onChange={e => setForm(f => ({ ...f, baths: e.target.value }))}
                placeholder="2.5"
              />
            </div>
            <div>
              <Label>Max Guests</Label>
              <Input
                type="number"
                min={1}
                value={form.guests}
                onChange={e => setForm(f => ({ ...f, guests: +e.target.value }))}
              />
            </div>
            <div>
              <Label>Price from ($/night)</Label>
              <Input
                type="number"
                min={1}
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: +e.target.value }))}
              />
            </div>
            <div>
              <Label>Rating (e.g. 4.92)</Label>
              <Input
                value={form.rating}
                onChange={e => setForm(f => ({ ...f, rating: e.target.value }))}
                placeholder="5.00"
              />
            </div>
            <div>
              <Label>Review Count</Label>
              <Input
                type="number"
                min={0}
                value={form.reviews}
                onChange={e => setForm(f => ({ ...f, reviews: +e.target.value }))}
              />
            </div>
            <div>
              <Label>Sort Order</Label>
              <Input
                type="number"
                value={form.sort_order}
                onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label>Image URL *</Label>
            <Input
              value={form.image}
              onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
              required
              placeholder="https://... or /local-image.jpg"
            />
            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="mt-2 h-24 w-full object-cover rounded-md"
                onError={e => (e.currentTarget.style.display = "none")}
              />
            )}
          </div>

          <div>
            <Label>Listing Type *</Label>
            <select
              value={form.listing_type}
              onChange={e => setForm(f => ({ ...f, listing_type: e.target.value }))}
              className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
            >
              <option value="home">🏠 Vacation Home (appears in Homes section)</option>
              <option value="room">🛏️ Suite / Room (appears in Rooms &amp; Suites section)</option>
            </select>
          </div>

          <div>
            <Label>Houfy Booking URL</Label>
            <Input
              value={form.houfy_url}
              onChange={e => setForm(f => ({ ...f, houfy_url: e.target.value }))}
              placeholder="https://www.houfy.com/..."
            />
          </div>

          <div>
            <Label>Tags (comma-separated)</Label>
            <Input
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="pool, gameroom, pets, resort, themed"
            />
            <p className="text-xs text-muted-foreground mt-1">Used for filtering: pool, gameroom, pets, resort, themed</p>
          </div>

          <div>
            <Label>Badges (comma-separated)</Label>
            <Textarea
              value={badgesInput}
              onChange={e => setBadgesInput(e.target.value)}
              placeholder="Private Pool, Game Room, Pet Friendly, Resort Stay"
              rows={2}
            />
            <p className="text-xs text-muted-foreground mt-1">Displayed as pills on the listing card</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Switch
                checked={form.active === 1}
                onCheckedChange={v => setForm(f => ({ ...f, active: v ? 1 : 0 }))}
              />
              <Label>Active (visible on site)</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.featured === 1}
                onCheckedChange={v => setForm(f => ({ ...f, featured: v ? 1 : 0 }))}
              />
              <Label>Featured</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white"
              disabled={isPending}
            >
              {editingListing ? "Save Changes" : "Add Listing"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main page component ───────────────────────────────────────────────────
export default function AdminListings() {
  const [, navigate] = useLocation();
  const utils = trpc.useUtils();

  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [tagsInput, setTagsInput] = useState("");
  const [badgesInput, setBadgesInput] = useState("");
  const [orderedListings, setOrderedListings] = useState<Listing[]>([]);
  const [orderChanged, setOrderChanged] = useState(false);
  const [typeFilter, setTypeFilter] = useState<"all" | "home" | "room">("all");

  const { data: listings = [], isLoading } = trpc.listings.getAll.useQuery();

  // Sync orderedListings when data arrives — use a stable key to avoid
  // infinite loops caused by React Query returning a new array reference
  // on every render even when the underlying data hasn't changed.
  const listingsKey = listings.map((l: Listing) => `${l.id}:${l.sort_order}:${l.active}:${l.featured}`).join(",");
  const prevKeyRef = useRef("");
  useEffect(() => {
    // We re-filter and re-sort whenever listings or the type filter changes
    let filtered = [...listings];
    if (typeFilter !== "all") {
      filtered = filtered.filter((l: Listing) => (l.listing_type || "home") === typeFilter);
    }
    
    const sorted = filtered.sort((a: Listing, b: Listing) => a.sort_order - b.sort_order);
    setOrderedListings(sorted);
    // Only reset orderChanged if the underlying data changed, not just the filter
    if (listingsKey !== prevKeyRef.current) {
      prevKeyRef.current = listingsKey;
      setOrderChanged(false);
    }
  }, [listingsKey, typeFilter]);

  const createMutation = trpc.listings.create.useMutation({
    onSuccess: () => {
      utils.listings.getAll.invalidate();
      utils.listings.getActive.invalidate();
      setIsCreating(false);
      setForm(emptyForm);
      toast.success(`${form.name} has been added.`);
    },
    onError: (e) => toast.error(e.message),
  });

  const updateMutation = trpc.listings.update.useMutation({
    onSuccess: () => {
      utils.listings.getAll.invalidate();
      utils.listings.getActive.invalidate();
      setEditingListing(null);
      toast.success("Changes saved successfully.");
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteMutation = trpc.listings.delete.useMutation({
    onSuccess: () => {
      utils.listings.getAll.invalidate();
      utils.listings.getActive.invalidate();
      setDeleteId(null);
      toast.success("Listing deleted.");
    },
    onError: (e) => toast.error(e.message),
  });

  const toggleActiveMutation = trpc.listings.toggleActive.useMutation({
    onSuccess: () => {
      utils.listings.getAll.invalidate();
      utils.listings.getActive.invalidate();
    },
  });

  const toggleFeaturedMutation = trpc.listings.toggleFeatured.useMutation({
    onSuccess: () => {
      utils.listings.getAll.invalidate();
      utils.listings.getActive.invalidate();
    },
  });

  const reorderMutation = trpc.listings.reorder.useMutation({
    onSuccess: () => {
      utils.listings.getAll.invalidate();
      utils.listings.getActive.invalidate();
      setOrderChanged(false);
      toast.success("Sort order saved.");
    },
    onError: (e) => toast.error(e.message),
  });

  const openCreate = () => {
    setForm(emptyForm);
    setTagsInput("");
    setBadgesInput("");
    setIsCreating(true);
  };

  const openEdit = (l: Listing) => {
    setForm({
      name: l.name, tagline: l.tagline, location: l.location,
      beds: l.beds, baths: l.baths, guests: l.guests, price: l.price,
      rating: l.rating, reviews: l.reviews, tags: l.tags || [], badges: l.badges || [],
      image: l.image, houfy_url: l.houfy_url, listing_type: (l as any).listing_type || "home",
      featured: l.featured, active: l.active, sort_order: l.sort_order,
    });
    setTagsInput((l.tags || []).join(", "));
    setBadgesInput((l.badges || []).join(", "));
    setEditingListing(l);
  };

  const parseCSV = (s: string) => s.split(",").map(t => t.trim()).filter(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...form, tags: parseCSV(tagsInput), badges: parseCSV(badgesInput), listing_type: form.listing_type as "home" | "room" };
    if (editingListing) {
      updateMutation.mutate({ id: editingListing.id, data });
    } else {
      createMutation.mutate(data as any);
    }
  };

  const saveOrder = () => {
    reorderMutation.mutate(
      orderedListings.map((l, i) => ({ id: l.id, sort_order: i }))
    );
  };

  // dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setOrderedListings(prev => {
        const oldIndex = prev.findIndex(l => l.id === active.id);
        const newIndex = prev.findIndex(l => l.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
      setOrderChanged(true);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminLayout title="Listings Manager">
    <div className="bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900">Listings Manager</h1>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setTypeFilter("all")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                typeFilter === "all" ? "bg-white shadow-sm text-amber-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setTypeFilter("home")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                typeFilter === "home" ? "bg-white shadow-sm text-amber-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🏠 Homes
            </button>
            <button
              onClick={() => setTypeFilter("room")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                typeFilter === "room" ? "bg-white shadow-sm text-amber-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              🛏️ Rooms
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {orderChanged && (
            <Button
              onClick={saveOrder}
              disabled={reorderMutation.isPending}
              className="bg-green-500 hover:bg-green-600 text-white"
              size="sm"
            >
              <Save className="w-4 h-4 mr-1" />
              {reorderMutation.isPending ? "Saving…" : "Save Order"}
            </Button>
          )}
          <Button onClick={openCreate} className="bg-amber-500 hover:bg-amber-600 text-white">
            <Plus className="w-4 h-4 mr-2" /> Add Listing
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Listings", value: listings.length, icon: Home },
          { label: "Active", value: listings.filter((l: Listing) => l.active).length, icon: Eye },
          { label: "Featured", value: listings.filter((l: Listing) => l.featured).length, icon: Star },
          { label: "Hidden", value: listings.filter((l: Listing) => !l.active).length, icon: EyeOff },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-lg"><Icon className="w-5 h-5 text-amber-600" /></div>
              <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Drag hint */}
      {!isLoading && orderedListings.length > 0 && (
        <div className="px-6 pb-2">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <GripVertical className="w-3 h-3" />
            Drag the handle on the left of each card to reorder. Click <strong className="text-green-600">Save Order</strong> when done.
          </p>
        </div>
      )}

      {/* Listings List */}
      <div className="px-6 pb-8">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500" />
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={orderedListings.map(l => l.id)} strategy={verticalListSortingStrategy}>
              <div className="grid gap-3">
                {orderedListings.map((listing: Listing) => (
                  <SortableListingRow
                    key={listing.id}
                    listing={listing}
                    onEdit={openEdit}
                    onDelete={setDeleteId}
                    onToggleActive={(id) => toggleActiveMutation.mutate({ id })}
                    onToggleFeatured={(id) => toggleFeaturedMutation.mutate({ id })}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Create / Edit Dialog — stable component identity, no remount on keypress */}
      <FormDialog
        open={isCreating || !!editingListing}
        onClose={() => { setIsCreating(false); setEditingListing(null); }}
        editingListing={editingListing}
        form={form}
        setForm={setForm}
        tagsInput={tagsInput}
        setTagsInput={setTagsInput}
        badgesInput={badgesInput}
        setBadgesInput={setBadgesInput}
        onSubmit={handleSubmit}
        isPending={isPending}
      />

      {/* Delete Confirm */}
      <AlertDialog open={deleteId !== null} onOpenChange={(v) => !v && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this listing?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. The listing will be permanently removed from the database.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteId && deleteMutation.mutate({ id: deleteId })}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </AdminLayout>
  );
}
