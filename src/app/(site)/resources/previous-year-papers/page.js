import ResourceListPage from "@/components/site/ResourceListPage";
import { getResources, deriveFacets } from "@/lib/resources";

export const metadata = {
  title: "Previous Year Papers — NextGen Olympiad",
  description: "A decade of Olympiad past papers with fully worked solutions for focused revision.",
};

export default async function Page() {
  const items = await getResources("previous-year-papers");
  const { subjects, years, classes } = deriveFacets(items);
  return (
    <ResourceListPage
      breadcrumb="Previous Year Papers"
      title="Previous Year Papers"
      subtitle="A decade of past Olympiad papers with fully worked solutions for focused, high-impact revision."
      items={items}
      classes={classes}
      subjects={subjects}
      years={years}
      cta={{
        title: "Practice makes permanent.",
        text: "Attempt a full-length mock under real exam timing.",
        label: "Explore Mock Tests",
        href: "/resources/mock-tests",
      }}
    />
  );
}