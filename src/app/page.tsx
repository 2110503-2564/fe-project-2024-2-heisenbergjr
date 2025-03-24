import Banner from "@/components/Banner";
import TextBox from "@/components/TextBox";

export default function Home() {
  return (
    <main>
      <div>
        <Banner></Banner>
        <TextBox
          title="Rejuvenate Your Body, Refresh Your Mind"
          description="Discover expert massage therapists and indulge in a moment of pure relaxation. Book your perfect massage experience today."
          buttonText="Book a Massage"
          buttonLink="/shop"
          backgroundImage="/img/massage-bg.jpg"
        />

      </div>
    </main>
  );
}
