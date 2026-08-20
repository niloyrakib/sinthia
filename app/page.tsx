import {
  Hero,
  PopularCategories,
  FeaturedGames,
  FeaturedTools,
  LatestBlog,
  Trending,
  Newsletter,
} from "@/features/home/components";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PopularCategories />
      <FeaturedGames />
      <FeaturedTools />
      <LatestBlog />
      <Trending />
      <Newsletter />
      {/* Footer arrives with the global layout chrome pass */}
    </main>
  );
}
