"use client";

import { useState } from "react";
import { 
  Search, 
  MoreHorizontal, 
  Trash2, 
  Ban, 
  UserCheck,
  Filter,
  Download
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

const initialUsers = [
  { id: "1", name: "Alex Johnson", email: "alex@example.com", status: "active", joinedAt: "2024-03-12", avatar: "" },
  { id: "2", name: "Sarah Miller", email: "sarah.m@example.com", status: "active", joinedAt: "2024-03-15", avatar: "" },
  { id: "3", name: "Mike Ross", email: "mike@suits.com", status: "banned", joinedAt: "2024-02-28", avatar: "" },
  { id: "4", name: "Elena Gilbert", email: "elena@mystic.com", status: "active", joinedAt: "2024-04-01", avatar: "" },
  { id: "5", name: "Harvey Specter", email: "harvey@pearson.com", status: "active", joinedAt: "2024-01-20", avatar: "" },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    toast.success("User deleted successfully");
  };

  const handleToggleBan = (id: string) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        const newStatus = user.status === "banned" ? "active" : "banned";
        toast.info(`User ${newStatus === "banned" ? "banned" : "unbanned"} successfully`);
        return { ...user, status: newStatus as any };
      }
      return user;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users Management</h2>
          <p className="text-muted-foreground">Manage your application users, monitor their status, and take actions.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button size="sm" className="h-9">
            <UserCheck className="mr-2 h-4 w-4" /> Add User
          </Button>
        </div>
      </div>

      <Card className="border-border/50 bg-card/50">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                className="pl-9 bg-accent/50 border-border/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border/50">
            <Table>
              <TableHeader>
                <TableRow className="bg-accent/30">
                  <TableHead className="w-[250px]">User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-accent/20">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {user.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === "active" ? "success" : "destructive" as any} className="capitalize">
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joinedAt}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleToggleBan(user.id)}>
                              {user.status === "banned" ? (
                                <><UserCheck className="mr-2 h-4 w-4 text-emerald-500" /> Unban User</>
                              ) : (
                                <><Ban className="mr-2 h-4 w-4 text-orange-500" /> Ban User</>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                              onClick={() => handleDelete(user.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
