import React from "react";

function AboutUsSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-20 text-center">
      <h2 className="text-4xl font-bold text-blue-700 mb-6">
        Về MediConnect
      </h2>
      <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
        🏥 About Us | Medi-Connect

Who We Are
At Medi-Connect, we believe that healthcare should be simple, accessible, and compassionate.
We are a modern healthcare platform that connects patients with trusted medical professionals, offering high-quality care and personalized solutions for every need.

Our Mission
Our mission is to make quality healthcare available anytime, anywhere.
Through advanced technology and a human-centered approach, we aim to bridge the gap between patients and medical services — ensuring everyone receives timely and effective care.
      </p>

      {/* Mission and Vision */}
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-16">
        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-2xl font-semibold text-blue-600 mb-3">
            Sứ mệnh của chúng tôi
          </h3>
          <p className="text-gray-600">
        Our Vision
To become a leading digital healthcare network that empowers people to live healthier, happier lives through innovation, trust, and connection.
          </p>
        </div>

        <div className="p-8 border rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-2xl font-semibold text-blue-600 mb-3">
            Tầm nhìn
          </h3>
          <p className="text-gray-600">
          What We Offer

Online medical consultations with licensed doctors

Appointment booking across multiple specialties

Health records and reports accessible securely online

Wellness programs and preventive health checkups

24/7 medical support and emergency assistance

Our Values

Compassion: We care deeply about every patient’s journey.

Integrity: We uphold transparency and ethical standards.

Innovation: We use technology to simplify healthcare.

Trust: Your health data and well-being are always protected.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <h3 className="text-3xl font-semibold text-gray-800 mb-8">
        Giá trị cốt lõi
      </h3>
      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div className="p-6 rounded-2xl bg-blue-50 hover:bg-blue-100 transition">
          <div className="text-4xl mb-2">❤️</div>
          <h4 className="text-lg font-semibold text-blue-700">Tận tâm</h4>
          <p className="text-gray-600 text-sm mt-2">
          Why Choose Medi-Connect?
Because your health deserves more than just treatment — it deserves understanding, care, and connection.
Medi-Connect isn’t just a service. It’s your partner in lifelong health.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-blue-50 hover:bg-blue-100 transition">
          <div className="text-4xl mb-2">🧠</div>
          <h4 className="text-lg font-semibold text-blue-700">Chuyên nghiệp</h4>
          <p className="text-gray-600 text-sm mt-2">
            Đội ngũ bác sĩ được chọn lọc và xác thực nghiêm ngặt.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-blue-50 hover:bg-blue-100 transition">
          <div className="text-4xl mb-2">🤝</div>
          <h4 className="text-lg font-semibold text-blue-700">Tin cậy</h4>
          <p className="text-gray-600 text-sm mt-2">
            Minh bạch thông tin, bảo mật tuyệt đối.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-blue-50 hover:bg-blue-100 transition">
          <div className="text-4xl mb-2">🌍</div>
          <h4 className="text-lg font-semibold text-blue-700">Cộng đồng</h4>
          <p className="text-gray-600 text-sm mt-2">
            Kết nối – sẻ chia – lan tỏa giá trị tốt đẹp.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;
