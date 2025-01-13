import { c as create_ssr_component, e as escape, v as validate_component } from "../../../chunks/ssr.js";
const ModuleNavigator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentSection;
  let currentPage;
  let currentSectionIndex;
  let currentPageIndex;
  let hasPrevPage;
  let { sections } = $$props;
  let { progress } = $$props;
  let { currentSectionId = void 0 } = $$props;
  let { currentPageId = void 0 } = $$props;
  let { onNavigate } = $$props;
  function getNextPage() {
    if (!currentSection || !currentPage) return void 0;
    if (currentPageIndex < (currentSection.pages?.length || 0) - 1) {
      return {
        sectionId: currentSection.id,
        pageId: currentSection.pages?.[currentPageIndex + 1].id
      };
    }
    if (currentSectionIndex < sections.length - 1) {
      const nextSection = sections[currentSectionIndex + 1];
      if (nextSection.pages && nextSection.pages.length > 0) {
        return {
          sectionId: nextSection.id,
          pageId: nextSection.pages[0].id
        };
      }
    }
    return void 0;
  }
  if ($$props.sections === void 0 && $$bindings.sections && sections !== void 0) $$bindings.sections(sections);
  if ($$props.progress === void 0 && $$bindings.progress && progress !== void 0) $$bindings.progress(progress);
  if ($$props.currentSectionId === void 0 && $$bindings.currentSectionId && currentSectionId !== void 0) $$bindings.currentSectionId(currentSectionId);
  if ($$props.currentPageId === void 0 && $$bindings.currentPageId && currentPageId !== void 0) $$bindings.currentPageId(currentPageId);
  if ($$props.onNavigate === void 0 && $$bindings.onNavigate && onNavigate !== void 0) $$bindings.onNavigate(onNavigate);
  currentSection = sections.find((s) => s.id === currentSectionId);
  currentPage = currentSection?.pages?.find((p) => p.id === currentPageId);
  currentSectionIndex = sections.findIndex((s) => s.id === currentSectionId);
  currentPageIndex = currentSection?.pages?.findIndex((p) => p.id === currentPageId) ?? -1;
  currentSection && (currentPageIndex < (currentSection.pages?.length ?? 0) - 1 || currentSectionIndex < sections.length - 1);
  hasPrevPage = currentPageIndex > 0 || currentSectionIndex > 0;
  return `<div class="space-y-4"><div class="flex justify-between items-center"><div class="text-sm">${currentSection && currentPage ? `Section ${escape(currentSectionIndex + 1)}.${escape(currentPageIndex + 1)} of ${escape(sections.length)}` : ``}</div> <div class="flex gap-2"><button class="btn variant-ghost-primary" ${!hasPrevPage || !currentSection ? "disabled" : ""}>Previous</button> <button class="btn variant-filled-primary" ${!getNextPage() ? "disabled" : ""}>Next</button> <button class="btn variant-soft">${escape("Show Sections")}</button></div></div> ${``}</div>`;
});
function handleCourseComplete() {
  console.log("Course completed!");
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const courseModules = [
    {
      title: "Introduction to Petroleum Systems",
      content: "Understanding the fundamentals of petroleum systems...",
      media: [
        {
          type: "video",
          url: "/videos/intro.mp4",
          title: "Introduction"
        }
      ]
    },
    {
      title: "Source Rocks",
      content: "Exploring different types of source rocks...",
      media: [
        {
          type: "image",
          url: "/images/source-rocks.jpg",
          alt: "Types of source rocks"
        },
        {
          type: "audio",
          url: "/audio/expert-source-rocks.mp3",
          title: "Expert Analysis"
        }
      ]
    }
  ];
  return `${validate_component(ModuleNavigator, "ModuleNavigator").$$render(
    $$result,
    {
      modules: courseModules,
      onComplete: handleCourseComplete
    },
    {},
    {}
  )}`;
});
export {
  Page as default
};
