"use client";

import { useState } from "react";
import { 
  Search, 
  MoreHorizontal, 
  Trash2, 
  Eye, 
  MapPin,
  Calendar,
  Globe,
  Lock
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const initialTrips = [
  { id: "1", title: "European Summer Escape", user: "Alex Johnson", city: "Paris, France", status: "public", date: "2024-05-10" },
  { id: "2", title: "Tokyo Foodie Tour", user: "Sarah Miller", city: "Tokyo, Japan", status: "public", date: "2024-05-12" },
  { id: "3", title: "Alpine Trekking", user: "Mike Ross", city: "Zermatt, Switzerland", status: "private", date: "2024-05-15" },
  { id: "4", title: "Bali Relaxation", user: "Elena Gilbert", city: "Ubud, Indonesia", status: "public", date: "2024-05-20" },
  { id: "5", title: "NYC Business Trip", user: "Harvey Specter", city: "New York, USA", status: "private", date: "2024-05-25" },
];

export default function TripsPage() {
  const [trips, setTrips] = useState(initialTrips);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredTrips = trips.filter(trip => 
    trip.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    trip.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setTrips(trips.filter(trip => trip.id !== id));
    toast.success("Trip deleted successfully");
  };

  const handleViewDetails = (trip: any) => {
    setSelectedTrip(trip);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Trips Management</h2>
          <p className="text-muted-foreground">Monitor and manage all itineraries created on the platform.</p>
        </div>
      </div>

      <Card className="border-border/50 bg-card/50">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, user, or city..."
                className="pl-9 bg-accent/50 border-border/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border/50">
            <Table>
              <TableHeader>
                <TableRow className="bg-accent/30">
                  <TableHead className="w-[300px]">Trip Title</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrips.length > 0 ? (
                  filteredTrips.map((trip) => (
                    <TableRow key={trip.id} className="hover:bg-accent/20">
                      <TableCell className="font-medium">{trip.title}</TableCell>
                      <TableCell>{trip.user}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          {trip.city}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="flex w-fit items-center gap-1.5 font-normal">
                          {trip.status === "public" ? (
                            <><Globe className="h-3 w-3 text-emerald-500" /> Public</>
                          ) : (
                            <><Lock className="h-3 w-3 text-muted-foreground" /> Private</>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>{trip.date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewDetails(trip)}>
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                              onClick={() => handleDelete(trip.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete Trip
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No trips found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedTrip?.title}</DialogTitle>
            <DialogDescription>Itinerary details and planned activities.</DialogDescription>
          </DialogHeader>
          {selectedTrip && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Destination</p>
                  <p className="flex items-center gap-2 text-foreground"><MapPin className="h-4 w-4 text-primary" /> {selectedTrip.city}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Traveler</p>
                  <p className="flex items-center gap-2 text-foreground">{selectedTrip.user}</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Itinerary Preview</p>
                <div className="space-y-3 border-l-2 border-primary/20 pl-4 py-1">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-primary" />
                    <p className="font-medium text-sm">Day 1: Arrival & Exploration</p>
                    <p className="text-xs text-muted-foreground">Check-in at hotel, local walking tour, and welcome dinner.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-primary/40" />
                    <p className="font-medium text-sm">Day 2: Cultural Landmarks</p>
                    <p className="text-xs text-muted-foreground">Museum visits, historic site exploration, and evening show.</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>Close</Button>
                <Button variant="destructive" onClick={() => {
                  handleDelete(selectedTrip.id);
                  setIsDetailsOpen(false);
                }}>Delete Trip</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
