import { useEffect } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  // Scroll to top khi vào trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const contactInfo = [
    {
      icon: MapPin,
      title: "Địa chỉ",
      content: "B506 - 280 An Dương Vương, Phường Chợ Quán, TP.HCM",
      color: "text-blue-600"
    },
    {
      icon: Phone,
      title: "Điện thoại",
      content: "+84 28 3835 2020",
      color: "text-green-600"
    },
    {
      icon: Clock,
      title: "Giờ làm việc",
      content: "Thứ 2 - Thứ 6: 8:00 - 17:00",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Liên Hệ
          </h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
            Chúng tôi luôn sẵn sàng hỗ trợ và phục vụ bạn
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Information */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Thông Tin Liên Hệ
            </h2>
            <p className="text-lg text-gray-600">
              Bạn có thể liên hệ với chúng tôi qua các kênh sau đây:
            </p>
          </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300 border-2 border-red-100 hover:border-red-300">
                <div className={`bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 ${info.color}`}>
                  <info.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                  {info.title}
                </h3>
                <p className="text-gray-600">
                  {info.content}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Contact Methods */}
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Các Kênh Liên Hệ Khác
              </h2>
              <p className="text-xl text-gray-600">
                Chúng tôi có mặt trên nhiều nền tảng để phục vụ bạn tốt nhất
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Email chính
                </h3>
                <p className="text-gray-600 mb-4">
                  Liên hệ chính thức qua email
                </p>
                <a
                  href="mailto:contact@kyanon.digital"
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  contact@kyanon.digital
                </a>
              </div>

              <div className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Email hỗ trợ
                </h3>
                <p className="text-gray-600 mb-4">
                  Hỗ trợ kỹ thuật và tư vấn
                </p>
                <a
                  href="mailto:hai.tran@kyanon.digital"
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  hai.tran@kyanon.digital
                </a>
              </div>

              <div className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Email liên hệ
                </h3>
                <p className="text-gray-600 mb-4">
                  Liên hệ chung và hợp tác
                </p>
                <a
                  href="mailto:trananhtuan526201@gmail.com"
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  trananhtuan526201@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
