import Link from "next/link";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import TeamGrid from "@/components/team/TeamGrid";
import TEAM_MEMBERS from "@/data/teamMembers";

import teamSectionOuterBg from "@/public/images/team-section-outer-bg.jpg";
import teamSectionInnerBg from "@/public/images/team-section-inner-bg.jpg";

import type { Lang, TeamMember } from "@/data/teamMembers";

type TeamSectionProps = {
  t: {
    teamTitle: string;
    recruitTitle: string;
    viewAllTherapists: string;
  };
  lang: Lang;
  onOpenGallery: (member: TeamMember, index?: number) => void;
  openLineBooking: (memberName: string, lang: string) => void;
};

function isStillNew(newUntil?: string) {
  if (!newUntil) return false;

  const endDate = new Date(`${newUntil}T23:59:59`);
  return endDate.getTime() >= Date.now();
}

export default function TeamSection({
  t,
  lang,
  onOpenGallery,
  openLineBooking,
}: TeamSectionProps) {
  const teamHref = lang === "zh" ? "/team" : `/team?lang=${lang}`;

  const newMembers = TEAM_MEMBERS.filter((member) => isStillNew(member.newUntil));
  const existingMembers = TEAM_MEMBERS.filter(
    (member) => !isStillNew(member.newUntil)
  );

  const homepageMembers =
    newMembers.length >= 3
      ? newMembers
      : [...newMembers, ...existingMembers.slice(0, 3 - newMembers.length)];

  return (
    <section
      id="team"
      className="relative overflow-hidden px-6 py-16 md:px-10 md:py-24 scroll-mt-32"
    >
      {/* 外層背景圖 */}
      <div className="absolute inset-0 z-0">
        <Image
          src={teamSectionOuterBg}
          alt=""
          fill
          sizes="100vw"
          className="object-cover scale-105 saturate-[0.56] contrast-[0.80] brightness-[0.88]"
        />
      </div>

      {/* 重一點的背景模糊 */}
      <div className="absolute inset-0 z-10 backdrop-blur-[14px]" />

      {/* 暖米色基底：讓整體從偏灰改成偏暖 */}
      <div className="absolute inset-0 z-10 bg-[rgba(248,240,230,0.38)]" />

      {/* 主暖色漸層：左上角較有圖感，往右下角逐漸消失 */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(165,125,90,0.28)_0%,rgba(200,165,130,0.18)_20%,rgba(225,200,175,0.10)_38%,rgba(245,235,225,0.04)_58%,rgba(255,255,255,0)_78%)]" />

      {/* 左上角暖光 */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,225,190,0.20)_0%,rgba(255,225,190,0.12)_18%,rgba(255,225,190,0.05)_34%,transparent_54%)]" />

      {/* 中段極淡暖棕融合 */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_28%_24%,rgba(165,128,96,0.08)_0%,rgba(165,128,96,0.045)_24%,rgba(165,128,96,0.015)_40%,transparent_58%)] mix-blend-multiply" />

      {/* 中央暖光：讓內容區更柔和、更聚焦 */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(255,240,220,0.30),transparent_60%)]" />

      {/* 右下角柔和收尾 */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_bottom_right,rgba(255,248,240,0.22)_0%,rgba(255,248,240,0.10)_20%,rgba(255,248,240,0.04)_32%,transparent_46%)]" />

      {/* 上下極淡收邊 */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(110,84,60,0.03),transparent_18%,transparent_82%,rgba(110,84,60,0.04))]" />

      <RevealOnScroll className="relative z-20 mx-auto max-w-6xl" y={24}>
        <SectionTitle className="text-[rgba(95,75,60,0.58)] tracking-[0.12em] font-light [text-shadow:0_1px_0_rgba(255,255,255,0.30),0_0_8px_rgba(255,255,255,0.28),0_0_18px_rgba(255,245,235,0.32)]">
          {t.teamTitle}
        </SectionTitle>

        {/* 內層主背板 */}
        <div className="relative mt-8 overflow-hidden rounded-[32px] border border-white/60 shadow-[0_25px_80px_rgba(90,65,45,0.12)] md:mt-10">
          {/* 內層背景 */}
          <div className="absolute inset-0">
            <Image
              src={teamSectionInnerBg}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
          </div>

          {/* 內層暖白玻璃感 */}
          <div className="absolute inset-0 bg-[rgba(255,249,243,0.82)] backdrop-blur-[1.5px]" />

          {/* 左上柔光 */}
          <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.48),transparent_34%)]" />

          {/* 底部微陰影 */}
          <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01),transparent_58%,rgba(80,56,38,0.04))]" />

          <div className="relative p-5 md:p-8 lg:p-10">
            <TeamGrid
              members={homepageMembers}
              lang={lang}
              onOpenGallery={onOpenGallery}
              openLineBooking={openLineBooking}
            />

            <div className="mt-10 flex justify-center">
              <Link
                href={teamHref}
                className="inline-flex items-center justify-center rounded-full border border-stone-300/70 bg-[rgba(255,249,243,0.9)] px-6 py-3 text-sm font-medium text-stone-800 shadow-[0_6px_18px_rgba(80,56,38,0.10)] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_24px_rgba(80,56,38,0.14)]"
              >
                {t.viewAllTherapists}
              </Link>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}