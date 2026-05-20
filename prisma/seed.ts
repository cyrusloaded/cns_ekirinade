import {prisma} from "@/lib/prisma";
import {footerSeed, navigationSeed, pageSeedMap} from "@/lib/site-seed";
import {hashPassword} from "@/lib/password";

async function main() {
  for (const item of navigationSeed) {
    await prisma.siteNavigationItem.upsert({
      where: {href: item.href},
      update: {label: item.label, order: item.order, isVisible: item.isVisible ?? true},
      create: {label: item.label, href: item.href, order: item.order, isVisible: item.isVisible ?? true},
    });
  }

  await prisma.siteFooter.upsert({
    where: {key: "default"},
    update: {content: footerSeed},
    create: {key: "default", content: footerSeed},
  });



  await prisma.adminUser.upsert({
    where: {email: "admin@ekinrin-ng.com"},
    update: {name: "Super Admin", role: "SUPER_ADMIN"},
    create: {
      email: "admin@ekinrin-ng.com",
      name: "Super Admin",
      role: "SUPER_ADMIN",
      passwordHash: hashPassword("admin"),
    },
  });

  await prisma.portalSetting.upsert({
    where: {key: "student-portal"},
    update: {
      title: "Student Portal Coming Soon",
      description: "The student portal is being prepared for students. Please check back soon.",
      isEnabled: true,
    },
    create: {
      key: "student-portal",
      title: "Student Portal Coming Soon",
      description: "The student portal is being prepared for students. Please check back soon.",
      launchAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      isEnabled: true,
    },
  });

  for (const page of Object.values(pageSeedMap)) {
    await prisma.sitePage.upsert({
      where: {slug: page.slug},
      update: {title: page.title, seoTitle: page.seoTitle, seoDescription: page.seoDescription, content: page.content},
      create: {slug: page.slug, title: page.title, seoTitle: page.seoTitle, seoDescription: page.seoDescription, content: page.content},
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
