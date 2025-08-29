import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi form liên hệ
    console.log('Form submitted:', formData);
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Địa chỉ",
      content: "280 An Dương Vương, Phường 4, Quận 5, TP.HCM",
      color: "text-blue-600"
    },
    {
      icon: Phone,
      title: "Điện thoại",
      content: "+84 28 3835 2020",
      color: "text-green-600"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@nxbsp.edu.vn",
      color: "text-purple-600"
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
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Liên Hệ
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe ý kiến và hỗ trợ bạn
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Gửi Tin Nhắn
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Hãy để lại thông tin và tin nhắn của bạn, chúng tôi sẽ phản hồi trong thời gian sớm nhất.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập email của bạn"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chủ đề
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập chủ đề tin nhắn"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung tin nhắn *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Nhập nội dung tin nhắn của bạn"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Gửi tin nhắn</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Thông Tin Liên Hệ
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Bạn có thể liên hệ với chúng tôi qua các kênh sau đây:
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`bg-gray-100 p-3 rounded-lg ${info.color}`}>
                    <info.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {info.title}
                    </h3>
                    <p className="text-gray-600">
                      {info.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="mt-8">
              <h3 className="font-semibold text-gray-900 mb-4">Vị trí của chúng tôi</h3>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Bản đồ sẽ được hiển thị tại đây</p>
                  <p className="text-sm">280 An Dương Vương, Phường 4, Quận 5, TP.HCM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <section className="mt-20">
          <div className="bg-white rounded-lg shadow-lg p-12">
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
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Hỗ trợ qua Email
                </h3>
                <p className="text-gray-600 mb-4">
                  Gửi email trực tiếp cho chúng tôi và nhận phản hồi trong vòng 24 giờ
                </p>
                <a
                  href="mailto:info@nxbsp.edu.vn"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  info@nxbsp.edu.vn
                </a>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Hỗ trợ qua Điện thoại
                </h3>
                <p className="text-gray-600 mb-4">
                  Gọi điện trực tiếp để được tư vấn và hỗ trợ nhanh chóng
                </p>
                <a
                  href="tel:+842838352020"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  +84 28 3835 2020
                </a>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Giờ Làm Việc
                </h3>
                <p className="text-gray-600 mb-4">
                  Chúng tôi sẵn sàng phục vụ bạn trong giờ hành chính
                </p>
                <p className="text-purple-600 font-medium">
                  Thứ 2 - Thứ 6: 8:00 - 17:00
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact; 