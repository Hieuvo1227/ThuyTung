"use client";

import { useCallback, useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader} from "@/components/ui/card";
import { useFAQStore } from "@/utils/stores/faqStore";
import CreateFAQDialog from "@/components/common/admin/faqDashboard/CreateFAQDialog";
import UpdateFAQDialog from "@/components/common/admin/faqDashboard/UpdateFAQDialog";
import { FAQTable } from "@/components/common/admin/faqDashboard/FAQTable";
import { TableSearch } from "@/components/common/admin/TableSearch";
import { DashboardHeader } from "@/components/common/admin/DashboardHeader";
import { EStatus } from "@/utils/types/enum";
import { FAQCategory } from "@/components/common/admin/faqDashboard/constant";
import { toast } from "react-toastify";

const initialFilters = { status: [] as string[], contentType: [] as string[] };

export default function FAQDashboardPage() {
    const { isLoading, getAllFAQs, updateFAQ, createFAQ, deleteFAQ } = useFAQStore();

    const [searchQuery, setSearchQuery] = useState("");
    const [isCreateFAQOpen, setIsCreateFAQOpen] = useState(false);
    const [isUpdateFAQOpen, setIsUpdateFAQOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState(initialFilters);
    const [allFAQs, setAllFAQs] = useState<IFAQ[]>([]);
    const [filteredFAQs, setFilteredFAQs] = useState<IFAQ[]>([]);
    const [openMenuFilters, setOpenMenuFilters] = useState(false);
    

    type MaybeFAQ = (IFAQ & { imageFile?: File | null }) | null;
    const [faqData, setFaqData] = useState<MaybeFAQ>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllFAQs();
            const data = res?.data?.FAQs || [];
            setAllFAQs(data);
            setFilteredFAQs(data);
        };
        fetchData();
    }, [getAllFAQs]);

    const filterData = useCallback(
        (query: string, filters: { status: string[]; contentType: string[] }) => {
            let results = [...allFAQs];

            if (query.trim()) {
                const q = query.toLowerCase().trim();
                results = results.filter(
                    (faq) =>
                        (faq.question || "").toLowerCase().includes(q) ||
                        (faq.answer || "").toLowerCase().includes(q) ||
                        (faq.category || "").toLowerCase().includes(q)
                );
            }

            if (filters.status.length > 0) {
                results = results.filter((faq) => filters.status.includes(faq.status || ""));
            }

            if (filters.contentType.length > 0) {
                results = results.filter((faq) => filters.contentType.includes(faq.category || ""));
            }

            setFilteredFAQs(results);
        },
        [allFAQs]
    );

    const handleSearch = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            filterData(searchQuery, activeFilters);
        },
        [searchQuery, activeFilters, filterData]
    );

    const resetView = async () => {
        const res = await getAllFAQs();
        const data = res?.data?.FAQs || [];
        setAllFAQs(data);
        setFilteredFAQs(data);
        setActiveFilters(initialFilters);
        setSearchQuery("");
        
    };

    const handleChange = (field: keyof IFAQ | "imageFile", value: string | File | null) => {
        setFaqData((prev) => {
            if (!prev) {
                const defaultFAQ: IFAQ & { imageFile?: File | null } = {
                    _id: "",
                    question: "",
                    answer: "",
                    category: FAQCategory[0].value,
                    status: EStatus.ACTIVE,
                    createdAt: undefined,
                    imageFile: null,
                };
                return { ...defaultFAQ, [field]: value } as MaybeFAQ;
            }
            return { ...(prev as IFAQ & { imageFile?: File | null }), [field]: value } as MaybeFAQ;
        });
    };

    const handleCreate = async () => {
        if (!faqData) return;
        await createFAQ(
            faqData.question,
            faqData.answer,
            faqData.category,
            faqData.status as EStatus,
            faqData.imageFile || null
        );
        await resetView();
        toast.success("FAQ created");
        setIsCreateFAQOpen(false);
        setFaqData(null);
    };

    const handleUpdate = async () => {
        if (!faqData) return;
        
        const result = await updateFAQ(
            faqData._id,
            faqData.question,
            faqData.answer,
            faqData.category,
            faqData.status as EStatus,
            faqData.imageFile instanceof File ? faqData.imageFile : null
        );
        
        if (result.success) {
            await resetView();
            toast.success("FAQ updated successfully");
            setIsUpdateFAQOpen(false);
            setFaqData(null);
        } else {
            toast.error(result.message || "Update failed");
        }
    };

    const handleDelete = async (faqId: string) => {
        if (!faqId) return;
        const res = await deleteFAQ(faqId);
        if (res.success) {
            await resetView();
            toast.success("FAQ deleted");
        } else {
            toast.error(res.message || "Delete failed");
        }
    };

    return (
        <div className="space-y-4">
            {/* Header trên cùng có nút +Create FAQ */}
            <DashboardHeader
                title="FAQ Dashboard"
                createButtonText="Create FAQ"
                onCreateClick={() => {
                    setFaqData({
                        _id: "",
                        question: "",
                        answer: "",
                        category: FAQCategory[0].value,
                        status: EStatus.ACTIVE,
                        createdAt: undefined,
                        imageFile: null,
                    });
                    setIsCreateFAQOpen(true);
                }}
            />

            <CreateFAQDialog
                isOpen={isCreateFAQOpen}
                onOpenChange={setIsCreateFAQOpen}
                onChange={handleChange}
                onFAQCreated={handleCreate}
                data={faqData}
                isLoading={isLoading}
            />

            <UpdateFAQDialog
                isOpen={isUpdateFAQOpen}
                onOpenChange={setIsUpdateFAQOpen}
                onChange={handleChange}
                data={faqData}
                onFAQUpdated={handleUpdate}
                isLoading={isLoading}
            />

            <Card className="bg-white dark:bg-gray-800">
                <CardHeader className="pb-3">
                    <div className="flex justify-end">
                        <div className="flex items-center gap-3">
                            <TableSearch
                                handleSearch={handleSearch}
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                placeholder="Search FAQs..."
                            />
                            <Button variant="secondary" size="sm" className="h-8 gap-1" onClick={resetView}>
                                <RefreshCw className="h-4 w-4" /> Refresh
                            </Button>
                            <Button variant="secondary" size="sm" onClick={() => setOpenMenuFilters(true)}>
                                Bộ lọc
                            </Button>
                        </div>
                    </div>
                </CardHeader>


                <FAQTable
                    FAQs={filteredFAQs}
                    isLoading={isLoading}
                    onEdit={(faq: IFAQ) => {
                        setFaqData(faq);
                        setIsUpdateFAQOpen(true);
                    }}
                    onDelete={handleDelete}
                />
            </Card>
        </div>
    );
}
