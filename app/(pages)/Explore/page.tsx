import { fetchData } from "@/app/actions";
import Quote from "../Home/Quote/Quote";
import AwardAndArchivement from "./Award&Archivements";
import CoreValues from "./CoreValues";
import Governance from "./Governance";
import VisionAndMission from "./Vision&Mission";
import WelcomeNote from "./WelcomeNote";
import { IVisionMission } from "@/app/components/types";

const Explore = async () => {
  const { success, data: VisionMission } = await fetchData<IVisionMission>(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/visionMission/11`
  );
  return (
    <div>
      <WelcomeNote />
      {success && <VisionAndMission
        visionDescription={VisionMission.vision}
        missionDescription={VisionMission.mission}
        visionMissionDescription={VisionMission.description}
      />}
      <CoreValues />
      <AwardAndArchivement />
      <Quote />
      {/* <Governance /> */}
    </div>
  );
};

export default Explore;
