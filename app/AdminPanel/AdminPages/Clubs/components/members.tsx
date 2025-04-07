import { fetchData } from "@/app/actions";

const ClubMembers = async ({ params }: { params: { id: string } }) => {
  let data: {
    clubId: number;
    clubName: string;
    users: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
    }[];
  } = { clubId: 0, clubName: "", users: [] };
  try {
    const response = await fetchData(
      `http://localhost:3000/api/clubs/${params.id}`
    );
    if (response.success) {
      data = response.data;
    }
  } catch (e) {
    throw new Error((e as Error).message);
  }
  return ;
};

export default ClubMembers;
