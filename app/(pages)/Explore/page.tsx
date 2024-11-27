import Quote from "../Home/Quote/Quote"
import AwardAndArchivement from "./Award&Archivements"
import CoreValues from "./CoreValues"
import Governance from "./Governance"
import VisionAndMission from "./Vision&Mission"
import WelcomeNote from "./WelcomeNote"

const Explore = () => {
  return (
    <div>
        <WelcomeNote/>
        <VisionAndMission/>
        <CoreValues/>
        <AwardAndArchivement/>
        <Quote />
        <Governance/>
    </div>
  )
}

export default Explore