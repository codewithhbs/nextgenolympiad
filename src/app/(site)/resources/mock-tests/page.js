import ResourceListPage from "@/components/site/ResourceListPage";
import { getResources, deriveFacets } from "@/lib/resources";

export const metadata = {
  title: "Mock Tests — NextGen Olympiad",
  description: "Full-length timed Olympiad mock tests to build speed, accuracy and exam confidence.",
};

export default async function Page() {
  const items = await getResources("mock-tests");
  const { subjects, years, classes } = deriveFacets(items);
  return (
    <ResourceListPage
      breadcrumb="Mock Tests"
      title="Mock Tests"
      subtitle="Timed, full-length mock tests that build speed, accuracy and real exam confidence."
      items={items}
      classes={classes}
      subjects={subjects}
      years={years}
      cta={{
        title: "Ready for the real thing?",
        text: "Review the syllabus and marking scheme before your next attempt.",
        label: "View Syllabus",
        href: "/resources/syllabus",
      }}
    />
  );
}