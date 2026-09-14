import Image from "next/image";

type PartnerLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  displayClassName: string;
};

const partnerLogos: PartnerLogo[] = [
  { name: "Vodacom", src: "/partners/vodacom.svg", width: 180, height: 54, displayClassName: "h-12 w-40 sm:h-14 sm:w-44" },
  { name: "Huawei", src: "/partners/huawei.svg", width: 84, height: 84, displayClassName: "size-20 sm:size-24" },
  { name: "Binance", src: "/partners/binance.png", width: 84, height: 84, displayClassName: "size-20 sm:size-24" },
  { name: "TEDI", src: "/partners/tedi.png", width: 84, height: 84, displayClassName: "size-20 sm:size-24" },
  { name: "3D Robotics", src: "/partners/3d-robotics.png", width: 96, height: 96, displayClassName: "size-24 sm:size-28" },
];

interface LogoCloudAnimatedProps {
  title?: string;
}

export function LogoCloudAnimated({
  title = "Organizations we collaborate with.",
}: LogoCloudAnimatedProps) {
  return (
    <section className="overflow-hidden border-y border-line bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-2xl font-bold text-ink lg:text-3xl">{title}</h2>
        </div>

        <div
          className="relative overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        >
          <div className="uiss-logo-marquee flex w-max items-center">
            {["first", "second", "third"].map((setName, setIndex) => (
              <div
                aria-hidden={setIndex === 0 ? undefined : true}
                className="flex shrink-0 items-center gap-10 pr-10 sm:gap-16 sm:pr-16"
                key={setName}
              >
                {partnerLogos.map((logo) => (
                  <div
                    aria-label={setIndex === 0 ? logo.name : undefined}
                    className="flex h-28 w-44 shrink-0 items-center justify-center p-4 sm:h-32 sm:w-52"
                    key={`${setName}-${logo.name}`}
                    role={setIndex === 0 ? "img" : undefined}
                  >
                    <div className="uiss-logo-tile flex size-full items-center justify-center transition-transform duration-200 ease-out motion-reduce:transition-none">
                      <Image
                        alt=""
                        className={`${logo.displayClassName} object-contain`}
                        height={logo.height}
                        src={logo.src}
                        width={logo.width}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LogoCloudAnimated;
