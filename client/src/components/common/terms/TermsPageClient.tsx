"use client";

import React from "react";
import { COMPANY, PHONE, EMAIL } from "@/utils/services/constants";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TermsPageClient() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Điều Khoản Sử Dụng
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Quy định và điều kiện khi sử dụng dịch vụ của {COMPANY}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 lg:p-10 max-w-4xl mx-auto">
          <div className="prose dark:prose-invert max-w-none">
            <div className="mb-10">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="flex items-center text-primary mb-6"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại trang chủ
                </Button>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Cập nhật lần cuối: Ngày 25 tháng 10 năm 2025
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. Giới thiệu
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Chào mừng bạn đến với {COMPANY}! Các điều khoản sử dụng này
                (&quot;Điều khoản&quot;) quy định việc sử dụng trang web và dịch vụ của
                Công ty TNHH Giáo Dục Quốc Tế {COMPANY} (sau đây gọi là
                &quot;{COMPANY}&quot;, &quot;chúng tôi&quot;, &quot;của chúng tôi&quot;).
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Bằng cách truy cập hoặc sử dụng dịch vụ của chúng tôi, bạn đồng ý
                tuân thủ và bị ràng buộc bởi các Điều khoản này. Nếu bạn không
                đồng ý với bất kỳ phần nào của các Điều khoản này, vui lòng không
                sử dụng dịch vụ của chúng tôi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                2. Định nghĩa dịch vụ
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                {COMPANY} cung cấp các dịch vụ sau:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <strong>Tư vấn du học:</strong> Hỗ trợ chọn trường, ngành học,
                  chuẩn bị hồ sơ, xin học bổng và visa du học
                </li>
                <li>
                  <strong>Tư vấn việc làm quốc tế:</strong> Kết nối với nhà tuyển
                  dụng, hỗ trợ làm hồ sơ xuất khẩu lao động và định hướng nghề nghiệp
                </li>
                <li>
                  <strong>Đào tạo ngoại ngữ:</strong> Các khóa học tiếng Nhật, Hàn,
                  Đức, Anh và kỹ năng mềm
                </li>
                <li>
                  <strong>Dịch vụ hỗ trợ khác:</strong> Đặt vé máy bay, sắp xếp chỗ ở,
                  hỗ trợ sau khi đến nước ngoài
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                3. Điều kiện sử dụng dịch vụ
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  Cung cấp thông tin chính xác, đầy đủ và trung thực trong quá trình
                  đăng ký và sử dụng dịch vụ
                </li>
                <li>
                  Tuân thủ mọi quy định pháp luật của Việt Nam và quốc gia bạn dự
                  định du học hoặc làm việc
                </li>
                <li>
                  Không sử dụng dịch vụ cho mục đích bất hợp pháp hoặc vi phạm quyền
                  của bên thứ ba
                </li>
                <li>
                  Bảo mật thông tin tài khoản (nếu có) và chịu trách nhiệm về mọi
                  hoạt động diễn ra dưới tài khoản của bạn
                </li>
                <li>
                  Hợp tác và cung cấp đầy đủ tài liệu cần thiết theo yêu cầu của
                  chúng tôi và các đối tác
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4. Quyền và nghĩa vụ của khách hàng
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                4.1. Quyền của khách hàng
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Được tư vấn miễn phí về các chương trình du học và việc làm</li>
                <li>Được cung cấp thông tin chính xác, minh bạch về chi phí dịch vụ</li>
                <li>Được hỗ trợ trong suốt quá trình làm hồ sơ và sau khi đến nước ngoài</li>
                <li>Được bảo mật thông tin cá nhân theo chính sách bảo mật của chúng tôi</li>
                <li>Được khiếu nại và giải quyết tranh chấp theo quy định</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                4.2. Nghĩa vụ của khách hàng
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Thanh toán đầy đủ chi phí dịch vụ theo thỏa thuận trong hợp đồng</li>
                <li>Cung cấp hồ sơ, tài liệu chính xác và đầy đủ theo yêu cầu</li>
                <li>Tuân thủ lịch trình và quy trình làm việc do {COMPANY} đưa ra</li>
                <li>Thông báo kịp thời khi có thay đổi về thông tin cá nhân hoặc hồ sơ</li>
                <li>Chịu trách nhiệm về tính hợp pháp của các giấy tờ, tài liệu cung cấp</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                5. Quyền và nghĩa vụ của {COMPANY}
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                5.1. Quyền của {COMPANY}
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  Từ chối hoặc tạm ngưng cung cấp dịch vụ nếu khách hàng vi phạm
                  Điều khoản này
                </li>
                <li>
                  Yêu cầu khách hàng cung cấp bổ sung tài liệu hoặc thông tin cần thiết
                </li>
                <li>
                  Thay đổi, cập nhật dịch vụ và Điều khoản sử dụng khi cần thiết
                </li>
                <li>
                  Hủy hợp đồng nếu khách hàng cung cấp thông tin gian dối hoặc không
                  hợp tác
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                5.2. Nghĩa vụ của {COMPANY}
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  Cung cấp dịch vụ tư vấn chuyên nghiệp, chính xác và phù hợp với nhu
                  cầu khách hàng
                </li>
                <li>Bảo mật thông tin cá nhân của khách hàng</li>
                <li>
                  Hỗ trợ khách hàng trong suốt quá trình làm hồ sơ và sau khi đến nước
                  ngoài
                </li>
                <li>
                  Thông báo kịp thời về tiến độ xử lý hồ sơ và các thay đổi liên quan
                </li>
                <li>Giải quyết khiếu nại và tranh chấp một cách công bằng, minh bạch</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                6. Chính sách thanh toán và hoàn tiền
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                6.1. Thanh toán
              </h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Chi phí dịch vụ sẽ được thỏa thuận cụ thể trong hợp đồng ký kết giữa
                khách hàng và {COMPANY}. Khách hàng có thể thanh toán qua:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Chuyển khoản ngân hàng</li>
                <li>Thanh toán trực tiếp tại văn phòng</li>
                <li>Thanh toán online qua cổng thanh toán điện tử (nếu có)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
                6.2. Hoàn tiền
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  Trường hợp khách hàng hủy dịch vụ trước khi bắt đầu: Hoàn lại 80%
                  chi phí dịch vụ (trừ chi phí hành chính)
                </li>
                <li>
                  Trường hợp khách hàng hủy dịch vụ sau khi đã bắt đầu làm hồ sơ:
                  Hoàn lại theo thỏa thuận cụ thể trong hợp đồng
                </li>
                <li>
                  Trường hợp hồ sơ bị từ chối không phải do lỗi của khách hàng:
                  Được xem xét hoàn lại một phần chi phí hoặc hỗ trợ làm lại hồ sơ
                </li>
                <li>
                  Không hoàn tiền nếu khách hàng cung cấp thông tin sai lệch, thiếu
                  hợp tác hoặc vi phạm Điều khoản
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                7. Giới hạn trách nhiệm
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                {COMPANY} cam kết nỗ lực hết mình để hỗ trợ khách hàng, tuy nhiên:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  Chúng tôi không đảm bảo 100% việc xin học bổng, visa hoặc tìm việc
                  làm thành công do phụ thuộc vào quyết định của trường học, cơ quan
                  chính phủ và nhà tuyển dụng
                </li>
                <li>
                  Không chịu trách nhiệm về những thay đổi chính sách, quy định của
                  các quốc gia hoặc trường học
                </li>
                <li>
                  Không chịu trách nhiệm về các sự kiện bất khả kháng như thiên tai,
                  dịch bệnh, chiến tranh ảnh hưởng đến dịch vụ
                </li>
                <li>
                  Khách hàng phải tự chịu trách nhiệm về các quyết định cá nhân liên
                  quan đến du học và làm việc tại nước ngoài
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                8. Quyền sở hữu trí tuệ
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Tất cả nội dung trên trang web của {COMPANY}, bao gồm nhưng không
                giới hạn ở văn bản, hình ảnh, logo, thiết kế, phần mềm, đều thuộc
                quyền sở hữu trí tuệ của {COMPANY} hoặc các bên cấp phép.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Bạn không được sao chép, phân phối, sửa đổi hoặc sử dụng bất kỳ nội
                dung nào từ trang web của chúng tôi mà không có sự cho phép bằng văn
                bản từ {COMPANY}.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                9. Bảo mật thông tin
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                {COMPANY} cam kết bảo vệ thông tin cá nhân của khách hàng theo Chính
                sách bảo mật. Vui lòng đọc{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Chính sách bảo mật
                </Link>{" "}
                để biết thêm chi tiết về cách chúng tôi thu thập, sử dụng và bảo vệ
                thông tin của bạn.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                10. Giải quyết tranh chấp
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Mọi tranh chấp phát sinh từ việc sử dụng dịch vụ sẽ được ưu tiên giải
                quyết thông qua thương lượng, hòa giải giữa hai bên.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Trong trường hợp không thể thương lượng được, tranh chấp sẽ được giải
                quyết tại Tòa án có thẩm quyền tại Thành phố Hồ Chí Minh, Việt Nam
                theo pháp luật Việt Nam.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                11. Sửa đổi điều khoản
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                {COMPANY} có quyền sửa đổi, cập nhật các Điều khoản sử dụng này bất
                kỳ lúc nào. Phiên bản mới nhất sẽ được đăng tải trên trang web với
                ngày cập nhật.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Việc bạn tiếp tục sử dụng dịch vụ sau khi có thay đổi đồng nghĩa với
                việc bạn chấp nhận các Điều khoản mới. Chúng tôi khuyến khích bạn
                thường xuyên xem lại trang này để cập nhật các thay đổi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                12. Thông tin liên hệ
              </h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Nếu bạn có bất kỳ câu hỏi nào về Điều khoản sử dụng này, vui lòng
                liên hệ với chúng tôi:
              </p>
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <p className="mb-2 text-gray-800 dark:text-gray-200">
                  <strong>Công ty TNHH Giáo Dục Quốc Tế {COMPANY}</strong>
                </p>
                <p className="mb-2 text-gray-700 dark:text-gray-300">
                  Địa chỉ: 24/22 Đường số 23, Phường Hiệp Bình Chánh, Tp Thủ Đức
                </p>
                <p className="mb-2 text-gray-700 dark:text-gray-300">
                  Email: {EMAIL || "support@thuytung.edu.vn"}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Hotline: {PHONE || "0908616014"}
                </p>
              </div>
            </section>

            <section className="mt-10 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-primary">
              <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">
                Lưu ý quan trọng:
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Bằng việc sử dụng dịch vụ của {COMPANY}, bạn xác nhận rằng đã đọc,
                hiểu và đồng ý với tất cả các Điều khoản sử dụng nêu trên. Nếu bạn
                không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng dịch
                vụ của chúng tôi.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
