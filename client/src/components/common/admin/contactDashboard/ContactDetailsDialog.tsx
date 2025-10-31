import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  User,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Tag,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { formatDateAgo } from "@/lib/utils";
import { EContactStatus } from "@/utils/types/enum";

interface IContactDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedContact: IContact | null;
  handleResolveContact: () => void;
  isResolving: boolean;
}

const ContactDetailsDialog = ({
  isOpen,
  onOpenChange,
  selectedContact,
  handleResolveContact,
  isResolving,
}: IContactDetailsDialogProps) => {
  if (!selectedContact) return null;

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => onOpenChange(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-30"
            aria-hidden="true"
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Contact Details
                </Dialog.Title>
                <Dialog.Description className="text-gray-700 dark:text-gray-300 mb-6">
                  Review the contact information from {selectedContact.name}
                </Dialog.Description>

                <ScrollArea className="h-[calc(85vh-12rem)] overflow-auto">
                  <div className="grid gap-6 py-4 px-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <User className="h-5 w-5 text-blue-500" />
                          <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Tên người gửi
                            </Label>
                            <p className="text-gray-900 dark:text-white">
                              {selectedContact.name}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-green-500" />
                          <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Email
                            </Label>
                            <p className="text-gray-900 dark:text-white">
                              {selectedContact.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-purple-500" />
                          <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Số điện thoại
                            </Label>
                            <p className="text-gray-900 dark:text-white">
                              {selectedContact.phone}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Tag className="h-5 w-5 text-orange-500" />
                          <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Chương trình
                            </Label>
                            <p className="text-gray-900 dark:text-white">
                              {selectedContact.program || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-indigo-500" />
                          <div>
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Ngày gửi
                            </Label>
                            <p className="text-gray-900 dark:text-white">
                              {formatDateAgo(selectedContact?.createdAt || "")}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                selectedContact.status
                              )}`}
                            >
                              {selectedContact.status || "pending"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <MessageSquare className="h-5 w-5 text-teal-500 mt-1" />
                          <div className="flex-1">
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Message
                            </Label>
                            <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                              <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                                {selectedContact.message}
                              </p>
                            </div>
                          </div>
                        </div>

                        {selectedContact.resolvedAt && (
                          <div className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <div>
                              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Resolved At
                              </Label>
                              <p className="text-gray-900 dark:text-white">
                                {formatDateAgo(selectedContact.resolvedAt || "")}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollArea>

                <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="bg-gray-200 border-gray-300 text-gray-700 hover:bg-gray-300 dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                  >
                    Close
                  </Button>

                  <div className="flex space-x-3">
                    <Button
                      variant="default"
                      onClick={handleResolveContact}
                      className="bg-green-600 hover:bg-green-700 text-white"
                      disabled={isResolving || selectedContact.status === EContactStatus.RESOLVED}
                    >
                      {isResolving ? (
                        <>Resolving...</>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ContactDetailsDialog;
