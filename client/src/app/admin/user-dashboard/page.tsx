"use client";

import { useCallback, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { RefreshCw } from "lucide-react";
import { EUserStatus } from "@/utils/types/enum";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/utils/stores/userStore";
import { DashboardHeader } from "@/components/common/admin/DashboardHeader";
import CreateUserDialog from "@/components/common/admin/userDashboard/CreateUserDialog";
import UpdateUserDialog from "@/components/common/admin/userDashboard/UpdateUserDialog";
import { TableSearch } from "@/components/common/admin/TableSearch";
import { UserFilter } from "@/components/common/admin/userDashboard/UserFilter";
import { UserTable } from "@/components/common/admin/userDashboard/UserTable";
import { useAuthStore } from "@/utils/stores/authStore";
import { toast } from "react-toastify";

// Initialize empty filters
const initialFilters = { status: [] as string[] };

function UserDashboardPage() {
  const { isLoading, getAllUsers, createUser, updateUser, deleteUser } = useUserStore();
  const { resetPassword } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState("");

  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isUpdateUserOpen, setIsUpdateUserOpen] = useState(false);

  const [activeFilters, setActiveFilters] = useState<{
    status: string[];
  }>(initialFilters);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('[UserDashboard] Fetching users...');
      const res = await getAllUsers();
      console.log('[UserDashboard] API Response:', res);
      const data = res?.data?.users || [];
      console.log('[UserDashboard] Extracted users:', data);
      setAllUsers(data);
      setFilteredUsers(data);
    };

    fetchData();
  }, [getAllUsers]);

  // Helper: reset filters/search and show updated data
  const resetView = (updatedData?: IUser[]) => {
    const data = updatedData ?? allUsers;
    setActiveFilters(initialFilters);
    setSearchQuery("");
    setOpenMenuFilters(false);
    setAllUsers(data);
    setFilteredUsers(data);
  };

  // Function to filter data based on query and activeFilters
  const filterData = useCallback(
    (query: string, filters: { status: string[] }) => {
      let results = [...allUsers];

      // Filter by search query
      if (query.trim()) {
        const searchTerms = query.toLowerCase().trim();
        results = results.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerms) ||
            user.email.toLowerCase().includes(searchTerms) ||
            user.phone.toLowerCase().includes(searchTerms)
        );
      }

      // Filter by status
      if (filters.status.length > 0) {
        results = results.filter((user) =>
          filters.status.includes(user.status || "")
        );
      }

      setFilteredUsers(results);
    },
    [allUsers]
  );

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      filterData(searchQuery, activeFilters);
    },
    [searchQuery, activeFilters, filterData]
  );

  // Toggle filter without auto-filtering
  const toggleFilter = (value: string, type: "status") => {
    setActiveFilters((prev) => {
      const updated = { ...prev };
      if (updated[type]?.includes(value)) {
        updated[type] = updated[type].filter((item) => item !== value);
      } else {
        updated[type] = [...(updated[type] || []), value];
      }
      return updated;
    });
  };

  const clearFilters = () => {
    setActiveFilters(initialFilters);
    setSearchQuery("");
    setFilteredUsers(allUsers); // Reset filtered data
    closeMenuMenuFilters();
  };

  const applyFilters = () => {
    filterData(searchQuery, activeFilters);
    closeMenuMenuFilters();
  };

  const [openMenuFilters, setOpenMenuFilters] = useState(false);
  const closeMenuMenuFilters = () => setOpenMenuFilters(false);

  // Use a key to reset the dialog data completely between opens
  const [dialogKey, setDialogKey] = useState(0);
  type ExtendedUserData = Omit<IUser, "status"> & {
    status: EUserStatus;
    password?: string;
  };

  const [data, setData] = useState<ExtendedUserData | null>(null);

  const handleChange = (
    field: keyof ExtendedUserData,
    value: string | string[] | boolean
  ) => {
    setData((prev) => {
      if (!prev) {
        const defaultData = {
          _id: "",
          email: "",
          password: "",
          name: "",
          phone: "",
          role: "user",
          status: EUserStatus.PENDING,
        };
        return { ...defaultData, [field]: value } as ExtendedUserData;
      }
      return { ...prev, [field]: value };
    });
  };

  const handleUpdate = async () => {
    if (data) {
      await updateUser(
        data._id,
        data.email,
        data.password || "",
        data.name,
        data.phone,
        data.status
      );

      const res = await getAllUsers();
      const updatedData = res?.data?.users || [];
      resetView(updatedData);

      toast.success("User updated");
      setIsUpdateUserOpen(false);
      setData(null);
      setDialogKey(k => k + 1);
    }
  };

  const handleCreate = async () => {
    if (data) {
      await createUser(
        data.email,
        data.password || "",
        data.name,
        data.phone,
        data.status
      );

      const res = await getAllUsers();
      const updatedData = res?.data?.users || [];
      resetView(updatedData);

      toast.success("User created");
      setIsCreateUserOpen(false);
      setData(null);
      setDialogKey(k => k + 1);
    }
  };

  const handleResetPassword = async (user: IUser) => {
    if (user) {
      const result = await resetPassword(user.email);
      if (result?.success) {
        toast.success("Password reset email sent successfully");
      } else {
        toast.error("Failed to send password reset email");
      }
    }
  };

  const handleDelete = async (userId: string) => {
    const resDel = await deleteUser(userId);
    if (resDel.success) {
      const res = await getAllUsers();
      const updated = res?.data?.users || [];
      resetView(updated);
      toast.success("User deleted");
    } else {
      toast.error(resDel.message || "Failed to delete user");
    }
  };

  return (
    <div className="space-y-4">
      <DashboardHeader
        title="User Dashboard"
        onCreateClick={() => {
          const defaultUser: ExtendedUserData = {
            _id: "",
            email: "",
            password: "",
            name: "",
            phone: "",
            status: EUserStatus.PENDING,
          };
          setData(defaultUser);
          setIsCreateUserOpen(true);
        }}
        createButtonText="Create User"
      />

      <CreateUserDialog
        key={`create-${dialogKey}-${isCreateUserOpen ? "open" : "closed"}`}
        isOpen={isCreateUserOpen}
        onOpenChange={(open) => {
          setIsCreateUserOpen(open);
          if (!open) {
            setData(null);
            setDialogKey((prev) => prev + 1);
          }
        }}
        onChange={handleChange}
        onUserCreated={handleCreate}
        data={data}
        isLoading={isLoading}
      />

      <UpdateUserDialog
        key={`update-${dialogKey}-${isUpdateUserOpen ? "open" : "closed"}`}
        isOpen={isUpdateUserOpen}
        onOpenChange={(open) => {
          setIsUpdateUserOpen(open);
          if (!open) {
            setData(null);
            setDialogKey((prev) => prev + 1);
          }
        }}
        onChange={handleChange}
        data={data}
        onUserUpdated={handleUpdate}
        isLoading={isLoading}
      />

      <div className="space-y-4">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle />

              <div className="flex items-center gap-2">
                <TableSearch
                  handleSearch={handleSearch}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  placeholder="Search Users..."
                />

                <Button
                  variant="secondary"
                  size="sm"
                  className="h-8 gap-1"
                  onClick={async () => {
                    setActiveFilters(initialFilters);
                    setSearchQuery("");
                    const res = await getAllUsers();
                    const data = res?.data?.users || [];
                    setAllUsers(data);
                    setFilteredUsers(data);
                  }}
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>

                <UserFilter
                  openMenuFilters={openMenuFilters}
                  setOpenMenuFilters={setOpenMenuFilters}
                  activeFilters={activeFilters}
                  toggleFilter={toggleFilter}
                  clearFilters={clearFilters}
                  applyFilters={applyFilters}
                  closeMenuMenuFilters={closeMenuMenuFilters}
                />
              </div>
            </div>
          </CardHeader>

          <UserTable
            Users={filteredUsers}
            isLoading={isLoading}
            onEdit={(user) => {
              setData(user);
              setIsUpdateUserOpen(true);
            }}
            onResetPassword={(user) => {
              handleResetPassword(user);
            }}
            onDelete={handleDelete}
          />
        </Card>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(UserDashboardPage), {
  ssr: false,
});
