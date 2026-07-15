import ResourceListPage from "@/components/site/ResourceListPage";
import { getResources, deriveFacets } from "@/lib/resources";

export const metadata = {
  title: "Sample Papers — NextGen Olympiad",
  description: "Download exam-pattern Olympiad sample papers with detailed solutions, class-wise and subject-wise.",
};

export default async function Page() {
  const items = await getResources("sample-papers");
  const { subjects, years, classes } = deriveFacets(items);
  return (
    <ResourceListPage
      breadcrumb="Sample Papers"
      title="Sample Papers"
      subtitle="Practice with exam-pattern sample papers and understand the type of questions asked in the Olympiad."
      items={items}
      classes={classes}
      subjects={subjects}
      years={years}
      cta={{
        title: "Consistent Practice. Better Performance.",
        text: "The more you practice, the better you get. Keep learning and keep growing!",
        label: "Explore Mock Tests",
        href: "/resources/mock-tests",
      }}
    />
  );
}
