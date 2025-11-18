"use client";

import { Fragment, useState, useRef, ChangeEvent, useEffect } from "react";
// Sửa: Import các component mới từ Headless UI và Fragment
import {
    Dialog,
    DialogPanel, // <-- Mới
    DialogTitle, // <-- Mới
    DialogBackdrop, // <-- Mới
    Transition,
    TransitionChild // <-- Giữ nguyên (nhưng dùng đúng chỗ)
} from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Save, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { EStatus } from "@/utils/types/enum"; // Giả sử EStatus được import


interface UpdateProgramDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onChange: (
        field: keyof IProgram,
        value: string | boolean | File | null | EStatus // Thêm EStatus
    ) => void;
    data: IProgram | null;
    onProgramUpdated: () => void;
    isLoading: boolean;
}

const UpdateProgramDialog = ({
    isOpen,
    onOpenChange,
    onChange,
    data,
    onProgramUpdated,
    isLoading,
}: UpdateProgramDialogProps) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- Logic xử lý file và preview giữ nguyên ---
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        let objectUrl: string | null = null;
        if (file) {
            onChange("image", file);
            objectUrl = URL.createObjectURL(file);
            setPreviewImage(objectUrl);
        } else {
            onChange("image", null);
            // Giữ ảnh gốc nếu không chọn file mới
            setPreviewImage(data?.imageUrl || null);
        }
        // Cleanup function trả về từ handler nếu tạo object URL
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    };


    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    // Cập nhật preview khi dialog mở hoặc dữ liệu thay đổi
    useEffect(() => {
        let objectUrl: string | null = null;
        if (isOpen && data) {
            // Ưu tiên file mới chọn
            if (data.image instanceof File) {
                objectUrl = URL.createObjectURL(data.image);
                setPreviewImage(objectUrl);
            }
            // Nếu không có file mới, dùng imageUrl gốc
            else if (data.imageUrl) {
                setPreviewImage(data.imageUrl);
            } else {
                setPreviewImage(null);
            }
        } else if (!isOpen) {
            setPreviewImage(null); // Reset khi dialog đóng
        }

        // Cleanup function
        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [isOpen, data]);


    const handleClose = () => {
        onOpenChange(false);
    };

    return (
        // --- Cấu trúc Transition và Dialog đã được cập nhật ---
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleClose}>
                {/* Sửa: Dùng DialogBackdrop riêng, bỏ as={Fragment} */}
                <DialogBackdrop
                    transition // Cho phép dùng class transition
                    className="fixed inset-0 bg-black/30 transition-opacity duration-300 ease-out data-[closed]:opacity-0"
                />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        {/* TransitionChild bao quanh DialogPanel */}
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            {/* Sửa: Dùng DialogPanel */}
                            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                                {/* Sửa: Dùng DialogTitle */}
                                <DialogTitle
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                                >
                                    Chỉnh sửa chương trình
                                </DialogTitle>

                                {/* --- Phần Form bên trong --- */}
                                <ScrollArea className="h-[calc(80vh-150px)] md:h-[400px] pr-4 mt-4">
                                    {/* Chỉ render form nếu có data */}
                                    {data && (
                                        <div className="space-y-4">
                                            {/* Title */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="update-title">Chương trình</Label>
                                                <Input
                                                    id="update-title"
                                                    value={data.title || ""}
                                                    onChange={(e) => onChange("title", e.target.value)}
                                                />
                                            </div>
                                            {/* Description */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="update-description">Mô tả</Label>
                                                <Textarea
                                                    id="update-description"
                                                    value={data.description || ""}
                                                    onChange={(e) => onChange("description", e.target.value)}
                                                />
                                            </div>
                                            {/* Country */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="update-country">Quốc gia</Label>
                                                <Input
                                                    id="update-country"
                                                    value={data.country || ""}
                                                    onChange={(e) => onChange("country", e.target.value)}
                                                />
                                            </div>
                                            {/* Duration */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="update-duration">Thời gian</Label>
                                                <Input
                                                    id="update-duration"
                                                    value={data.duration || ""}
                                                    onChange={(e) => onChange("duration", e.target.value)}
                                                />
                                            </div>
                                            {/* Tuition */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="update-tuition">Chi phí trọn gói</Label> {/* Sửa lỗi chính tả */}
                                                <Input
                                                    id="update-tuition"
                                                    value={data.tuition || ""}
                                                    onChange={(e) => onChange("tuition", e.target.value)}
                                                />
                                            </div>
                                            {/* Opportunities */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="update-opportunities">Cơ hội</Label>
                                                <Textarea
                                                    id="update-opportunities"
                                                    value={data.opportunities || ""}
                                                    onChange={(e) => onChange("opportunities", e.target.value)}
                                                />
                                            </div>
                                            {/* About */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="update-about">Giới thiệu</Label>
                                                <Textarea
                                                    id="update-about"
                                                    value={data.about || ""}
                                                    onChange={(e) => onChange("about", e.target.value)}
                                                />
                                            </div>
                                            {/* Image Upload */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="update-image">Hình ảnh</Label>
                                                <div className="flex flex-col gap-2">
                                                    <input
                                                        type="file"
                                                        id="update-image"
                                                        ref={fileInputRef}
                                                        onChange={handleFileChange}
                                                        accept="image/*"
                                                        className="hidden"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={handleButtonClick}
                                                        className="flex items-center gap-2 w-fit"
                                                    >
                                                        <ImageIcon className="h-4 w-4" />
                                                        {previewImage ? "Đổi ảnh" : "Tải ảnh lên"}
                                                    </Button>
                                                    {previewImage && (
                                                        <div className="relative mt-2 h-40 w-full overflow-hidden rounded-md border">
                                                            <Image
                                                                src={previewImage}
                                                                alt="Xem trước ảnh"
                                                                fill
                                                                sizes="(max-width: 440px) 100vw, 400px"
                                                                style={{ objectFit: "cover" }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {/* Requirements */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="update-requirements">Yêu cầu (cách nhau bằng dấu phẩy)</Label>
                                                <Input
                                                    id="update-requirements"
                                                    value={data.requirements || ""}
                                                    onChange={(e) => onChange("requirements", e.target.value)}
                                                />
                                            </div>
                                            {/* Benefits */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="update-benefits">Lợi ích (cách nhau bằng dấu phẩy)</Label>
                                                <Input
                                                    id="update-benefits"
                                                    value={data.benefits || ""}
                                                    onChange={(e) => onChange("benefits", e.target.value)}
                                                />
                                            </div>
                                            {/* Featured */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="update-featured">Nổi bật</Label>
                                                <Select
                                                    value={data.featured ? "true" : "false"}
                                                    onValueChange={(value) => onChange("featured", value === "true")}
                                                >
                                                    <SelectTrigger id="update-featured">
                                                        <SelectValue placeholder="Chọn trạng thái nổi bật" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="true">Có</SelectItem>
                                                        <SelectItem value="false">Không</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            {/* Status */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="update-status">Trạng thái</Label>
                                                <Select
                                                    // Đảm bảo value khớp với giá trị trong EStatus
                                                    value={data.status || EStatus.INACTIVE}
                                                    onValueChange={(value) => onChange("status", value as EStatus)}
                                                >
                                                    <SelectTrigger id="update-status">
                                                        <SelectValue placeholder="Chọn trạng thái" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value={EStatus.ACTIVE}>Hoạt động</SelectItem>
                                                        <SelectItem value={EStatus.INACTIVE}>Không hoạt động</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    )}
                                </ScrollArea>

                                {/* Footer */}
                                <div className="mt-4 flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <Button
                                        variant="outline"
                                        onClick={handleClose}
                                        disabled={isLoading}
                                    >
                                        Hủy
                                    </Button>
                                    <Button onClick={onProgramUpdated} disabled={isLoading} className="flex items-center gap-1.5">
                                        {isLoading ? (
                                            "Đang lưu..."
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4" />
                                                Lưu thay đổi
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default UpdateProgramDialog;