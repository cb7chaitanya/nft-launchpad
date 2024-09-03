import Header from "@/components/Header"
import Hero from "@/components/Hero"
import VerticalMarquee from "@/components/Marquee"

const Landing = () => {
  return (
    <div className="bg-black w-full h-screen overflow-x-hidden">
        <Header />
        <div className="grid grid-cols-3">
            <Hero />
            <VerticalMarquee />
        </div>
    </div>
  )
}

export default Landing