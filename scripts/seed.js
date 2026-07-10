import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../src/models/User.js";
import Settings from "../src/models/Settings.js";
import Page from "../src/models/Page.js";
import Faq from "../src/models/Faq.js";
import Testimonial from "../src/models/Testimonial.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/nextgen_olympiad";

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log("✓ Connected to MongoDB");

  // 1. Super admin
  const email = process.env.SEED_ADMIN_EMAIL || "admin@nextgenolympiad.in";
  const password = process.env.SEED_ADMIN_PASSWORD || "Admin@12345";
  const name = process.env.SEED_ADMIN_NAME || "Super Admin";
  let admin = await User.findOne({ email });
  if (!admin) {
    admin = await User.create({
      name, email, password: await bcrypt.hash(password, 12),
      role: "super_admin", isEmailVerified: true, isActive: true,
    });
    console.log(`✓ Super admin created: ${email} / ${password}`);
  } else {
    console.log("• Super admin already exists");
  }

  // 2. Settings singleton
  const settings = await Settings.findOne({ key: "global" });
  if (!settings) { await Settings.create({ key: "global" }); console.log("✓ Default settings created"); }
  else console.log("• Settings already exist");

  // 3. Default CMS pages (policies + about)
  const pages = [
    { slug: "privacy-policy", title: "Privacy Policy", type: "policy",
      content: "<h2>Privacy Policy</h2><p>We respect your privacy. This page explains how NextGen Olympiad Foundation collects, uses and protects information. Update this content from the admin panel.</p>" },
    { slug: "terms-and-conditions", title: "Terms & Conditions", type: "policy",
      content: "<h2>Terms &amp; Conditions</h2><p>By using this website and participating in our olympiads you agree to these terms. Update this content from the admin panel.</p>" },
    { slug: "refund-policy", title: "Refund Policy", type: "policy",
      content: "<h2>Refund Policy</h2><p>Details about registration fees and refunds. Update this content from the admin panel.</p>" },
    { slug: "disclaimer", title: "Disclaimer", type: "policy",
      content: "<h2>Disclaimer</h2><p>General disclaimer for the NextGen Olympiad website. Update this content from the admin panel.</p>" },
  ];
  for (const p of pages) {
    await Page.updateOne({ slug: p.slug }, { $setOnInsert: { ...p, isPublished: true, showInNav: false } }, { upsert: true });
  }
  console.log(`✓ ${pages.length} default pages ensured`);

  // 4. Sample FAQs
  if ((await Faq.countDocuments()) === 0) {
    await Faq.insertMany([
      { question: "Who can participate in NextGen Olympiad?", answer: "Students from Classes I to X can participate in the NextGen Olympiad, and Bal Vatika I–III children can join Wonder Kids.", order: 1 },
      { question: "How does my school register?", answer: "Click Register, fill in your school details, verify your email via OTP, and our team will approve your account.", order: 2 },
      { question: "How are results published?", answer: "The admin uploads results per school. They instantly appear in your school dashboard and can be checked publicly using the student code.", order: 3 },
      { question: "Do all participants get certificates?", answer: "Yes. Every participant receives a certificate, and top performers earn medals and trophies.", order: 4 },
    ]);
    console.log("✓ Sample FAQs added");
  } else console.log("• FAQs already exist");

  // 5. Sample testimonials
  if ((await Testimonial.countDocuments()) === 0) {
    await Testimonial.insertMany([
      { name: "Mrs. Anjali Verma", role: "Principal", school: "Sunrise Public School", rating: 5, order: 1,
        message: "NextGen Olympiad made competitive learning genuinely exciting for our students. The process was smooth and results were quick." },
      { name: "Mr. Rakesh Kumar", role: "Parent", rating: 5, order: 2,
        message: "My daughter loved the Wonder Kids olympiad. It felt like play, not pressure. Highly recommended." },
      { name: "Ms. Priya Nair", role: "Coordinator", school: "Green Valley School", rating: 5, order: 3,
        message: "Well-designed papers that reward thinking. The school dashboard makes managing students effortless." },
    ]);
    console.log("✓ Sample testimonials added");
  } else console.log("• Testimonials already exist");

  console.log("\n🎉 Seed complete.\n");
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => { console.error("Seed failed:", err); process.exit(1); });
