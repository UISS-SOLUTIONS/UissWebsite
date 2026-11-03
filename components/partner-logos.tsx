import Image from "next/image";

type PartnerLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  displayClassName: string;
};

const partnerLogos: PartnerLogo[] = [
  {
    name: "Vodacom",
    src: "/partners/vodacom.svg",
    width: 180,
    height: 54,
    displayClassName: "h-6 w-auto sm:h-7 lg:h-9",
  },
  {
    name: "Huawei",
    src: "/partners/huawei.svg",
    width: 84,
    height: 84,
    displayClassName: "h-8 w-auto sm:h-9 lg:h-12",
  },
  {
    name: "Binance",
    src: "/partners/binance.png",
    width: 84,
    height: 84,
    displayClassName: "h-8 w-auto sm:h-9 lg:h-12",
  },
  {
    name: "TEDI",
    src: "/partners/tedi.png",
    width: 84,
    height: 84,
    displayClassName: "h-8 w-auto sm:h-9 lg:h-12",
  },
  {
    name: "3D Robotics",
    src: "/partners/3d-robotics.png",
    width: 96,
    height: 96,
    displayClassName: "h-8 w-auto sm:h-9 lg:h-12",
  },
  {
    name: "UDICTI",
    src: "/partners/udicti.svg",
    width: 84,
    height: 86,
    displayClassName: "h-8 w-auto sm:h-9 lg:h-12",
  },
];

export function PartnerLogos() {
  return (
    <section className="bg-canvas py-12" aria-labelledby="partners-heading">
      <div className="uiss-container">
        <div className="mx-auto max-w-xl lg:max-w-4xl">
          <h2 id="partners-heading" className="text-center text-sm font-medium text-ink">
            Our collaborators
          </h2>
          <ul
            className="mt-8 grid grid-cols-3 items-center gap-x-8 gap-y-12 lg:grid-cols-6"
            data-testid="partner-logo-static"
          >
            {partnerLogos.map((logo) => (
              <li key={logo.name} className="flex min-w-0 items-center justify-center">
                <Image
                  alt={logo.name}
                  className={`${logo.displayClassName} max-w-full object-contain`}
                  height={logo.height}
                  src={logo.src}
                  width={logo.width}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
