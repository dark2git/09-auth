import { QueryClient, dehydrate } from "@tanstack/react-query";
import { FetchHttpResponse, fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = slug[0];
  return {
    title: `Notes in ${category} | Notes App`,
    description: `Browse and manage your notes in the "${category}" category. Stay organized and keep everything at hand`,
    openGraph: {
      title: `Notes in ${category} | Notes App`,
      description: `Discover and manage your personal notes categorized under "${category}". Access them anytime, anywhere.`,
      url: `https://08-zustand-mu-seven.vercel.app/notes/filter/${category}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Notes picture",
        },
      ],
    },
  };
}

async function App({ params }: Props) {
  const { slug } = await params;
  const category = slug[0] === "All" ? undefined : slug[0];
  const searchQuery = "";
  const currentPage = 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", searchQuery, category, currentPage],
    queryFn: () => fetchNotes(searchQuery, category, currentPage),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient
        initialPage={currentPage}
        initialSearch={searchQuery}
        tag={category}
      />
    </HydrationBoundary>
  );
}

export default App;
