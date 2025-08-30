import { useEffect } from 'react';
import { BookOpen, Award, Users, Target, CheckCircle } from 'lucide-react';

const About = () => {
  // Scroll to top khi vào trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const values = [
    {
      icon: BookOpen,
      title: "Chất lượng nội dung",
      description: "Cam kết cung cấp nội dung khoa học, chính xác và cập nhật"
    },
    {
      icon: Award,
      title: "Uy tín và kinh nghiệm",
      description: "Hơn 25 năm kinh nghiệm trong lĩnh vực xuất bản giáo dục"
    },
    {
      icon: Users,
      title: "Phục vụ cộng đồng",
      description: "Đóng góp tích cực cho sự phát triển giáo dục Việt Nam"
    },
    {
      icon: Target,
      title: "Đổi mới sáng tạo",
      description: "Áp dụng công nghệ mới trong quy trình xuất bản và phân phối"
    }
  ];

  const achievements = [
    { number: "500+", label: "Đầu sách đa dạng" },
    { number: "50K+", label: "Độc giả tin tưởng" },
    { number: "25+", label: "Năm kinh nghiệm" },
    { number: "100+", label: "Tác giả uy tín" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Về Chúng Tôi
          </h1>
          <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
            NXB Đại Học Sư Phạm - Nơi ươm mầm tri thức, phát triển tài năng giáo dục Việt Nam
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Lịch Sử Và Sứ Mệnh
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Được thành lập vào năm 1998, NXB Đại Học Sư Phạm đã trải qua hơn 25 năm 
                phát triển và trưởng thành. Chúng tôi tự hào là một trong những nhà xuất bản 
                hàng đầu trong lĩnh vực giáo dục tại Việt Nam.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Sứ mệnh của chúng tôi là cung cấp những tài liệu học tập chất lượng cao, 
                góp phần nâng cao chất lượng giáo dục và đào tạo nguồn nhân lực cho đất nước.
              </p>
              <p className="text-lg text-gray-600">
                Với đội ngũ biên tập viên giàu kinh nghiệm và mạng lưới tác giả uy tín, 
                chúng tôi cam kết mang đến những cuốn sách có giá trị học thuật cao, 
                phù hợp với nhu cầu thực tế của ngành giáo dục.
              </p>
            </div>
            <div className="relative">
              <div className="bg-blue-600 w-full h-80 rounded-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center">
                <BookOpen className="h-32 w-32 text-white opacity-20" />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Giá Trị Cốt Lõi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những nguyên tắc và giá trị định hướng mọi hoạt động của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-20">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Thành Tựu Nổi Bật
              </h2>
              <p className="text-xl text-gray-600">
                Những con số ấn tượng phản ánh sự phát triển và uy tín của chúng tôi
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-gray-600">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Đội Ngũ Của Chúng Tôi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những con người tâm huyết với sự nghiệp giáo dục và xuất bản
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-12 w-12 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Biên Tập Viên
              </h3>
              <p className="text-gray-600">
                Đội ngũ biên tập viên giàu kinh nghiệm, am hiểu sâu sắc về các lĩnh vực chuyên môn
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tác Giả
              </h3>
              <p className="text-gray-600">
                Mạng lưới tác giả uy tín, bao gồm các giáo sư, tiến sĩ đầu ngành
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-12 w-12 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Cố Vấn
              </h3>
              <p className="text-gray-600">
                Hội đồng cố vấn khoa học với các chuyên gia hàng đầu trong lĩnh vực giáo dục
              </p>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Tầm Nhìn Tương Lai
          </h2>
          <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
            Chúng tôi đặt mục tiêu trở thành nhà xuất bản giáo dục hàng đầu Đông Nam Á, 
            ứng dụng công nghệ số để mang tri thức đến mọi người, mọi nơi.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-red-200" />
              <span>Xuất bản số hóa</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-red-200" />
              <span>Mở rộng thị trường quốc tế</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-red-200" />
              <span>Phát triển bền vững</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 