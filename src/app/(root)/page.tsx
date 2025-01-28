import StartupCard, { StartupCardType } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {
  const query = (await searchParams).query;
  const posts: StartupCardType[] = [
    {
      _id: 1,
      _createdAt: "2025-01-28",
      views: 55,
      author:{
        _id: 1,
        name:"John Doe",
        image: "https://placehold.co/48x48"
      },
      description: "This is a description",
      image:"https://images.unsplash.com/photo-1734784547207-7ad9f04c1f0a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Robots",
      title: "We Robots"
    }
  ];
  return (
    <>
    <section className="pink_container">
      <h1 className="heading">Pitch Your Startup, <br /> Connect With Entrepreneurs</h1>
      <p className="subheading max-w-3xl text-white-100"> Submit Ideas, Vote on Pitches and Get Noticed in Virtual Competitions</p>
      <SearchForm query={query} />  
    </section>
    <section className="section_container">
     <p className="text-30-semibold">
      {query ? `Search Results for "${query}"` : "All Startups"}
     </p>
     <ul className="mt-7 card_grid">
      {posts?.length > 0 && posts.map((post: StartupCardType, index: number) => (
        <StartupCard key={index} post={post}/>
      ))}
     </ul>
    </section>
    </>
  );
}
