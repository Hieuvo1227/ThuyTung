import { SharedFilter } from "@/components/common/admin/SharedFilter";
import { EContactStatus } from "@/utils/types/enum";

interface ContactFilterProps {
  openMenuFilters: boolean;
  setOpenMenuFilters: (open: boolean) => void;
  activeFilters: { status: string[] };
  toggleFilter: (value: string, type: "status") => void;
  clearFilters: () => void;
  applyFilters: () => void;
  closeMenuMenuFilters: () => void;
}

export const ContactFilter = ({
  openMenuFilters,
  setOpenMenuFilters,
  activeFilters,
  toggleFilter,
  clearFilters,
  applyFilters,
  closeMenuMenuFilters,
}: ContactFilterProps) => {
  // Create a wrapper function to match the expected signature
  const handleToggleFilter = (
    value: string,
    type: "status" | "contentType"
  ) => {
    if (type === "status") {
      toggleFilter(value, "status");
    }
  };

  const filterOptions = {
    status: [
      { label: "Đang chờ", value: EContactStatus.PENDING },
      { label: "Đã giải quyết", value: EContactStatus.RESOLVED },
    ],
  };

  return (
    <SharedFilter
      openMenuFilters={openMenuFilters}
      setOpenMenuFilters={setOpenMenuFilters}
      activeFilters={activeFilters}
      toggleFilter={handleToggleFilter}
      clearFilters={clearFilters}
      applyFilters={applyFilters}
      closeMenuMenuFilters={closeMenuMenuFilters}
      filterOptions={filterOptions}
    />
  );
};
