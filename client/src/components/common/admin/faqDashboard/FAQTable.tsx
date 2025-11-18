"use client";

import { DataTable } from "@/components/common/admin/DataTable";

interface IFAQTableProps {
  FAQs: IFAQ[];
  isLoading: boolean;
  onEdit?: (faq: IFAQ) => void;
  onDelete?: (faqId: string) => void;
}

const truncate = (text: string | undefined, max = 80) =>
  !text ? "" : text.length > max ? text.slice(0, max).trimEnd() + "…" : text;

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Hồ sơ du học":
      return "bg-green-500";
    case "Chi phí":
      return "bg-yellow-500";
    case "Visa":
      return "bg-blue-500";
    case "Ngôn ngữ":
      return "bg-indigo-500";
    case "Định cư":
      return "bg-purple-500";
    case "Dịch vụ":
      return "bg-teal-500";
    default:
      return "bg-gray-400";
  }
};

const getStatusColor = (status: string | undefined) =>
  status === "active" ? "bg-green-500" : "bg-red-500";

export const FAQTable = ({ FAQs, isLoading, onEdit, onDelete }: IFAQTableProps) => {
  const columns = [
    {
      header: "STT",
      accessor: (_: IFAQ, index: number) => (
        <span className="text-xs md:text-sm">{index + 1}</span>
      ),
      className: "w-8 px-2",
    },
    {
      header: "Câu hỏi / Trích dẫn",
      accessor: (faq: IFAQ) => (
        <div className="text-left max-w-md">
          <div className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
            {faq.question}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 line-clamp-2">
            {truncate(faq.answer, 80)}
          </div>
        </div>
      ),
    },
    {
      header: "Danh mục",
      accessor: (faq: IFAQ) => (
        <div className="flex items-center justify-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${getCategoryColor(faq.category)}`} />
          <span className="text-xs capitalize">{faq.category}</span>
        </div>
      ),
      className: "text-center px-2",
    },
    {
      header: "Trạng thái",
      accessor: (faq: IFAQ) => (
        <div className="flex items-center justify-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${getStatusColor(faq.status)}`} />
          <span className="text-xs capitalize">{faq.status}</span>
        </div>
      ),
      className: "text-center px-2",
    },
  ];

  const actions: {
    label: string;
    onClick: (item: IFAQ) => void;
  }[] = [];

  if (onEdit) {
    actions.push({
      label: "Chỉnh sửa",
      onClick: onEdit,
    });
  }

  if (onDelete) {
    actions.push({
      label: "Xóa",
      onClick: (faq: IFAQ) => {
        const confirmed = confirm(`Bạn có chắc muốn xóa câu hỏi: "${faq.question}"?`);
        if (confirmed) {
          onDelete(faq._id);
        }
      },
    });
  }

  return (
    <DataTable
      data={FAQs}
      isLoading={isLoading}
      columns={columns}
      actions={actions}
      emptyMessage="Không tìm thấy câu hỏi thường gặp nào"
    />
  );
};
