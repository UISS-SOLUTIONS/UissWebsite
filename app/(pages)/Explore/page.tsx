export const dynamic = "force-dynamic";

import { fetchData } from "@/app/actions";
import Quote from "../Home/Quote/Quote";
import AwardAndArchivement from "./Award&Archivements";
import CoreValues from "./CoreValues";
import Governance from "./Governance";
import VisionAndMission from "./Vision&Mission";
import WelcomeNote from "./WelcomeNote";
import { IVisionMission } from "@/app/components/types";

const Explore = async () => {
  const { success, data: VisionMission } = await fetchData<IVisionMission[]>(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/visionMission/1`
  );
  return (
    <div>
      <WelcomeNote />
      {success &&
        VisionMission.map((visionmission) => (
          <VisionAndMission key={visionmission.id}
            visionDescription={visionmission.vision}
            missionDescription={visionmission.mission}
            visionMissionDescription={visionmission.description}
          />
        ))}
      <CoreValues />
      <AwardAndArchivement />
      <Quote />
      <Governance />
    </div>
  );
};

export default Explore;
