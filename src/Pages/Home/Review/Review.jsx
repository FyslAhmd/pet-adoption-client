import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import demoPerson from "../../../assets/demoPerson.png";

const reviews = [
  {
    name: "Sadia Rahman",
    location: "Dhaka",
    description:
      "I found the sweetest kitten through this platform. The adoption process was smooth, and the family who listed her was kind and transparent. It feels good to give a pet a second chance.",
  },
  {
    name: "Tanvir Ahmed",
    location: "Chattogram",
    description:
      "As someone who fosters animals, this site helped me connect with responsible adopters. It's a great way to ensure pets go to loving homes. Highly recommended for both adopters and listers.",
  },
  {
    name: "Nusrat Jahan",
    location: "Sylhet",
    description:
      "We were looking to adopt a rescue dog, and this platform made it so easy to find one nearby. It’s heartwarming to see how many people care about rehoming pets properly.",
  },
  {
    name: "Fahim Hossain",
    location: "Khulna",
    description:
      "Listing our rescued puppies here brought in multiple caring families. The process felt secure and respectful — definitely the best local option for pet adoption.",
  },
  {
    name: "Mehjabin Khan",
    location: "Rajshahi",
    description:
      "I adopted a lovely parrot from here, and I’m amazed how simple the experience was. The filters helped me find exactly what I was looking for, and the pet's previous owner was very cooperative.",
  },
  {
    name: "Jahidul Islam",
    location: "Barisal",
    description:
      "We had to rehome our cat due to relocation, and this site helped us find a loving new family. It's comforting to know she's in good hands. Thank you for this amazing platform!",
  },
  {
    name: "Afsana Akter",
    location: "Mymensingh",
    description:
      "Being an animal lover, this platform allowed me to adopt a senior dog who needed a forever home. It's wonderful to have a service that prioritizes compassion over commercialism.",
  },
  {
    name: "Rafiq Hasan",
    location: "Cumilla",
    description:
      "I was impressed by how easy it was to connect with pet adopters. The platform values animal welfare, and the user interface is simple yet effective.",
  },
  {
    name: "Sumaiya Sultana",
    location: "Rangpur",
    description:
      "As a first-time adopter, I was nervous, but this site made me feel confident. The information was clear, and the family I adopted from was incredibly supportive.",
  },
];

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3;

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + cardsPerView >= reviews.length ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? reviews.length - cardsPerView : prev - 1
    );
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleNext();
  //   }, 6000);
  //   return () => clearInterval(interval);
  // }, []);

  const cardWidth = 335;
  const offset = -currentIndex * (cardWidth + 48);

  return (
    <div className="my-8 md:my-12 lg:my-16 px-4 bg-transparent text-black overflow-hidden">
      <h2 className="text-3xl font-bold text-center">Customer Reviews</h2>
      <p className="font-medium w-4/6 mx-auto text-center my-4">
        See what users are saying about their experience with our platform.
      </p>
      <div className="flex justify-center items-center gap-4 mb-8">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <FaArrowLeft />
        </button>
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-2 md:gap-12"
            animate={{ x: offset }}
            transition={{ type: "tween", duration: 1 }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="min-w-[250px] md:min-w-[335px] bg-[url(assets/reviewQuote.png)] bg-no-repeat bg-left-top rounded-xl p-6 shadow-md bg-[#b0b8df] flex flex-col gap-4"
              >
                <p className="text-sm line-clamp-5 flex-1">
                  "{review.description}"
                </p>
                <hr className="border-dashed" />
                <div className="flex gap-6 items-center">
                  <div className="h-8 w-8 rounded-full bg-white">
                    <img src={demoPerson} alt="" />
                  </div>
                  <div>
                    <div className="font-semibold">{review.name}</div>
                    <div className="text-xs text-gray-500">
                      {review.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Review;
