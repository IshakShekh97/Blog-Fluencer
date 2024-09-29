import { CloudRain, Fingerprint, PersonStanding, Zap } from "lucide-react";
import React from "react";

const features = [
  {
    name: "Get Started For Free",
    description:
      "Sign up today and start your blogging journey without any cost. Enjoy all the basic features for free and upgrade anytime as your needs grow.",
    icon: CloudRain,
  },
  {
    name: "Blazing Fast",
    description:
      "    Experience lightning-fast performance with our optimized platform. Your blog will load quickly, ensuring a seamless experience for your readers.",
    icon: Zap,
  },
  {
    name: "Super Secured",
    description:
      "Your blog's security is our top priority. We use state-of-the-art security measures to protect your data and ensure your content is safe from unauthorized access.",
    icon: Fingerprint,
  },
  {
    name: "Easy To Use",
    description:
      "Designed with simplicity in mind, our platform is intuitive and user-friendly. Whether you're a beginner or a seasoned blogger, you'll find it easy to navigate and use.",
    icon: PersonStanding,
  },
];

const Features = () => {
  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-semibold leading-7 text-primary text-xl">
          Blog{" "}
          <span className="bg-gradient-to-b from-violet-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text">
            Faster
          </span>
        </p>
        <h1 className="text-center text-4xl mt-2 font-bold tracking-tight sm:text-5xl">
          Get Your blog up and running in <br />
          <span className="bg-gradient-to-b from-violet-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text">
            mater of minutes
          </span>
        </h1>
        <p className="mt-6 text-base leading-snug text-muted-foreground">
          Right here you can create your blog in Maters of minutes. Just sign up
          and start writing your blog post. We will take care of the rest.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl relative">
        <div className="bg-gradient-to-b from-amber-500 to-emerald-600 size-20 absolute blur-[100px] left-[40%] top-[30%]" />
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature, index) => (
            <div
              className="relative pl-16 backdrop-blur backdrop-saturate-200 backdrop-brightness-200  p-3 rounded-xl"
              key={index}
            >
              <div className="text-base font-semibold leading-7">
                <div className="bg-primary absolute left-3 top-4 flex size-10 items-center justify-center rounded-lg">
                  <feature.icon className="size-6 text-secondary" />
                </div>
                {feature.name}
              </div>

              <p className="mt-2 text-muted-foreground leading-snug">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
