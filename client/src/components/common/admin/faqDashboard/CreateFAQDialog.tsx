"use client";

import { Fragment, useState, useRef, ChangeEvent, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
  Transition,
  TransitionChild,
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
import { EStatus } from "@/utils/types/enum";
import { FAQCategory, FAQStatus } from "./constant";

interface CreateFAQDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (field: keyof IFAQ | "imageFile", value: string | File | null) => void;
  onFAQCreated: () => void;
  data: (IFAQ & { imageFile?: File | null; imageUrl?: string }) | null;
  isLoading: boolean;
}

const CreateFAQDialog = ({
  isOpen,
  onOpenChange,
  onChange,
  onFAQCreated,
  data,
  isLoading,
}: CreateFAQDialogProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      onChange("imageFile", file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    } else {
      onChange("imageFile", null);
      setPreviewImage(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    let objectUrl: string | null = null;
    if (isOpen && data) {
      if (data.imageFile instanceof File) {
        objectUrl = URL.createObjectURL(data.imageFile);
        setPreviewImage(objectUrl);
      } else if (data.imageUrl) {
        setPreviewImage(data.imageUrl);
      } else {
        setPreviewImage(null);
      }
    } else if (!isOpen) {
      setPreviewImage(null);
    }

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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 transition-opacity duration-300 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                >
                  Tạo câu hỏi thường gặp
                </DialogTitle>

                <ScrollArea className="h-[calc(80vh-150px)] md:h-[400px] pr-4 mt-4">
                  <div className="space-y-4">
                    {/* Câu hỏi */}
                    <div className="grid gap-2">
                      <Label htmlFor="create-question">Câu hỏi</Label>
                      <Input
                        id="create-question"
                        value={data?.question || ""}
                        onChange={(e) => onChange("question", e.target.value)}
                      />
                    </div>

                    {/* Câu trả lời */}
                    <div className="grid gap-2">
                      <Label htmlFor="create-answer">Câu trả lời</Label>
                      <Textarea
                        id="create-answer"
                        value={data?.answer || ""}
                        onChange={(e) => onChange("answer", e.target.value)}
                      />
                    </div>

                    {/* Danh mục */}
                    <div className="grid gap-2">
                      <Label htmlFor="create-category">Danh mục</Label>
                      <Select
                        value={data?.category || FAQCategory[0].value}
                        onValueChange={(value: string) => onChange("category", value)}
                      >
                        <SelectTrigger id="create-category">
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          {FAQCategory.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Hình ảnh */}
                    <div className="grid gap-2">
                      <Label htmlFor="create-image">Hình ảnh</Label>
                      <div className="flex flex-col gap-2">
                        <input
                          type="file"
                          id="create-image"
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

                    {/* Trạng thái */}
                    <div className="grid gap-2">
                      <Label htmlFor="create-status">Trạng thái</Label>
                      <Select
                        value={data?.status || EStatus.ACTIVE}
                        onValueChange={(value: string) => onChange("status", value)}
                      >
                        <SelectTrigger id="create-status">
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                          {FAQStatus.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
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
                  <Button onClick={onFAQCreated} disabled={isLoading} className="flex items-center gap-1.5">
                    {isLoading ? (
                      "Đang lưu..."
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Lưu
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

export default CreateFAQDialog;
