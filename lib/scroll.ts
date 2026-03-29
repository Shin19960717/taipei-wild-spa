export function scrollToSection(sectionId: string, headerOffset = 0) {
  if (typeof window === "undefined") return;

  const element = document.getElementById(sectionId);
  if (!element) return;

  const elementTop = element.getBoundingClientRect().top + window.scrollY;
  const targetTop = elementTop - headerOffset;

  window.scrollTo({
    top: targetTop,
    behavior: "smooth",
  });
}