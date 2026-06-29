import HeroVideo from '@/components/home/HeroVideo';
import HotelIntro from '@/components/home/HotelIntro';
import RoomsCarousel from '@/components/home/RoomsCarousel';
import AmenitiesTabs from '@/components/home/AmenitiesTabs';
import InstagramFeed from '@/components/home/InstagramFeed';
import BlogGrid from '@/components/home/BlogGrid';

export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <HotelIntro />
      <RoomsCarousel />
      <AmenitiesTabs />
      <InstagramFeed />
      <BlogGrid />
    </>
  );
}
