import { useEffect } from 'react';
import { Target, Users, Award, Lightbulb, ArrowRight } from 'lucide-react';

const History = () => {
  // Scroll to top khi vào trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Logo container với target và arrow */}
              <div className="w-20 h-20 bg-white border-4 border-red-500 rounded-full flex items-center justify-center relative">
                {/* Target (bullseye) */}
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                {/* Arrow */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-6 bg-amber-600"></div>
                  <div className="w-0 h-0 border-l-3 border-r-3 border-b-4 border-l-transparent border-r-transparent border-b-red-600 transform -translate-x-1/2 ml-0.5"></div>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 tracking-wide">KYANON</h1>
          <p className="text-xl mb-2">KF-Lab</p>
          <h2 className="text-3xl font-bold mb-4">RELIABILITY IN ACTION</h2>
          <p className="text-xl opacity-90">ARCHER'S DNA</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Lịch sử */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Lịch sử hình thành</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              KYANON được thành lập với sứ mệnh mang lại sự tin cậy và chất lượng trong mọi hành động, 
              như một cung thủ luôn nhắm trúng mục tiêu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tầm nhìn</h3>
              <p className="text-gray-600">
                Trở thành đối tác tin cậy hàng đầu, luôn đặt chất lượng và độ chính xác lên hàng đầu 
                trong mọi dự án và sản phẩm.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sứ mệnh</h3>
              <p className="text-gray-600">
                Cung cấp giải pháp tối ưu, đổi mới sáng tạo và dịch vụ chất lượng cao, 
                đáp ứng mọi nhu cầu của khách hàng.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Giá trị cốt lõi</h3>
              <p className="text-gray-600">
                Sự tin cậy, chất lượng, đổi mới và cam kết với khách hàng là những giá trị 
                không bao giờ thay đổi của KYANON.
              </p>
            </div>
          </div>
        </div>

        {/* Hình ảnh gốc KYANON */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Đội ngũ KYANON</h2>
            <p className="text-lg text-gray-600">
              Đội ngũ chuyên gia và cố vấn của KYANON - RELIABILITY IN ACTION
            </p>
          </div>

          {/* Hình ảnh gốc */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-red-200 p-8 mb-12">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-red-600 mb-2">RELIABILITY IN ACTION - ARCHER'S DNA</h3>
              <p className="text-gray-600">Đội ngũ KYANON K-Fresh 2025</p>
            </div>
            
            <div className="flex justify-center">
              <img 
                src="/images/history.jpeg" 
                alt="KYANON Team - RELIABILITY IN ACTION - ARCHER'S DNA"
                className="max-w-full h-auto rounded-lg shadow-lg border-4 border-red-600"
                style={{
                  maxHeight: '600px',
                  objectFit: 'contain'
                }}
              />
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Hình ảnh chính thức của đội ngũ KYANON - K-Fresh 2025
              </p>
            </div>
          </div>

         

          
        </div>

        {/* Thông tin địa chỉ đơn giản */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vị trí của chúng tôi</h2>
            <p className="text-lg text-gray-600">
              Trường Đại học Sư phạm TP.HCM - Cơ sở An Dương Vương
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-red-200 p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-red-600 mb-4">B506 - 280 An Dương Vương</h3>
              <p className="text-xl text-gray-600 mb-2">Phường Chợ Quán, TP.HCM</p>
              <div className="w-16 h-1 bg-red-600 mx-auto"></div>
            </div>
            
            {/* Thông tin địa chỉ và liên hệ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-4 text-lg">Địa chỉ chi tiết</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong>Tòa nhà:</strong> B506
                  </p>
                  <p className="text-gray-700">
                    <strong>Đường:</strong> 280 An Dương Vương
                  </p>
                  <p className="text-gray-700">
                    <strong>Phường:</strong> Chợ Quán
                  </p>
                  <p className="text-gray-700">
                    <strong>Thành phố:</strong> TP.HCM
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-4 text-lg">Thông tin liên hệ</h4>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong>Điện thoại:</strong><br/>
                    <span className="text-red-600">+84 28 3835 2020</span>
                  </p>
                  <p className="text-gray-700">
                    <strong>Email:</strong><br/>
                    <span className="text-red-600">contact@kyanon.digital</span>
                  </p>
                  <p className="text-gray-700">
                    <strong>Website:</strong><br/>
                    <span className="text-red-600">kyanon.digital</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cảm ơn */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-2xl p-8 transform">
            <h3 className="text-2xl font-bold mb-4">
              Cảm ơn Ban Tổ Chức và Đào Tạo K-Fresh 2025
            </h3>
            <p className="text-lg opacity-90">
              Sự hỗ trợ và đóng góp của các bạn đã giúp KYANON phát triển và hoàn thiện hơn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
