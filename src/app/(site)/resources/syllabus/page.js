import ResourceListPage from "@/components/site/ResourceListPage";
import { getResources, deriveFacets } from "@/lib/resources";

export const metadata = {
  title: "Syllabus & Blueprint — NextGen Olympiad",
  description: "Class-wise Olympiad syllabus and marking scheme, mapped topic by topic.",
};

export default async function Page() {
  const items = await getResources("syllabus");
  const { subjects, years, classes } = deriveFacets(items);
  return (
    <ResourceListPage
      breadcrumb="Syllabus & Blueprint"
      title="Syllabus & Blueprint"
      subtitle="Class-wise syllabus and marking scheme, mapped topic by topic so nothing is missed."
      items={items}
      classes={classes}
      subjects={subjects}
      years={years}
      cta={{
        title: "Know it, then practice it.",
        text: "Put the syllabus to work with exam-pattern sample papers.",
        label: "Sample Papers",
        href: "/resources/sample-papers",
      }}
    />
  );
}