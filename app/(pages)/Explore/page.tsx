import { fetchData } from "@/app/actions"
import Quote from "../Home/Quote/Quote"
import AwardAndArchivement from "./Award&Archivements"
import CoreValues from "./CoreValues"
import Governance from "./Governance"
import VisionAndMission from "./Vision&Mission"
import WelcomeNote from "./WelcomeNote"
import { IVisionCard } from "../types"

const Explore = async () => {
  const { data } = await fetchData<IVisionCard>(`${process.env.NEXT_PUBLIC_API_ROUTE}/visionMission/3`)
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