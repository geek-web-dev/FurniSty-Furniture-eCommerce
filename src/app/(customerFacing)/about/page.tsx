import Heading from "@/components/common/Heading";
import Image from "next/image";
import BadgeImage from "@/components/common/BadgeImage";
import FunFact from "./_components/FunFact";
import { clients, funFacts, services } from "@/config";
import ShowList from "@/components/common/ShowList";
import ServiceCard from "./_components/ServiceCard";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TestimonialCard from "./_components/TestimonialCard";

const AboutPage = () => {
  return (
    <>
      <Heading title="About Us" location="/ about" />

      <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
        <div className="relative xl:col-span-4 lg:col-span-5">
          <Image
            src="/about.jpg"
            width={1000}
            height={600}
            alt="about"
            className="rounded-lg z-3 z-10 relative"
            loading="lazy"
          />
          <div className="absolute border w-full h-full rounded-lg border-blue-200 dark:border-blue-800 top-2 left-2"></div>
        </div>
        <div className="xl:col-span-8 lg:col-span-7">
          <BadgeImage
            color="blue"
            title="Our Team"
            imageSrc="/icons/team.svg"
          />
          <h1 className="text-3xl font-semibold my-4 ">
            Online shopping includes both buying things online.
          </h1>
          <p className="mb-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit
            nihil tempora veritatis, assumenda odit eligendi quasi nisi eaque ad
            tenetur sequi voluptates veniam necessitatibus quam ex voluptatem
            beatae blanditiis magnam?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit
            nihil tempora veritatis, assumenda odit eligendi quasi nisi eaque ad
            tenetur sequi voluptates veniam necessitatibus quam ex voluptatem
            beatae blanditiis magnam? Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Velit nihil tempora veritatis, assumenda odit
          </p>
        </div>
      </div>

      <div className="mb-12">
        <BadgeImage
          color="teal"
          title="fun Facts"
          imageSrc="/icons/chart.svg"
        />
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-4 gap-4">
          <ShowList
            list={funFacts}
            renderItem={(item) => <FunFact {...item} />}
          />
        </div>
      </div>

      <div className="mb-12">
        <BadgeImage
          color="purple"
          title="Services"
          imageSrc="/icons/gear.svg"
        />
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 mt-4">
          <ShowList
            list={services}
            renderItem={(item) => <ServiceCard {...item} />}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
        {/* <div className="grid lg:grid-cols-2 gap-4 mt-4"> */}
        <div className="xl:col-span-8 lg:col-span-7">
          <BadgeImage
            color="red"
            title="Our Gallery"
            imageSrc="/icons/sofa2.svg"
          />
          <h1 className="text-3xl font-semibold my-4 ">
            Online shopping includes both buying things online.
          </h1>{" "}
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
            esse incidunt culpa. Magni sequi et nemo facilis illum
            necessitatibus doloribus. Amet consequuntur ipsam dolorum.
            Reprehenderit quam nulla minus adipisci cum!
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
            dolores assumenda, tempora quas laboriosam et nihil voluptate
            itaque!
          </p>
        </div>
        <div className="relative xl:col-span-4 lg:col-span-5">
          <Image
            src={"/gallery.jpg"}
            width={1000}
            height={500}
            alt="Gallery"
            className="rounded-e-lg z-3 z-10 relative"
          />
          <div className="absolute border w-full h-full rounded-lg border-blue-200 dark:border-blue-800 top-2 left-2"></div>
        </div>
        {/* </div> */}
      </div>

      <div className="mb-12">
        <BadgeImage
          color="yellow"
          title="Top Customers Testimonials"
          imageSrc="/icons/star-face.svg"
        />
        <Carousel
          opts={{
            align: "start",
          }}
          className=" mt-4 sm:w-full max-w-300"
        >
          <CarouselContent className="cursor-grab">
            <ShowList
              list={clients}
              renderItem={(item) => <TestimonialCard {...item} />}
            />
          </CarouselContent>
          <div className="mt-8 w-fit mx-auto">
            <CarouselPrevious className="relative border-none bg-slate-100 dark:bg-black rounded-sm" />
            <CarouselNext className="relative border-none bg-slate-100 dark:bg-black rounded-sm" />
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default AboutPage;
