// import { fetchData } from "@/app/admin/actions";

// const ClubMembers = async ({ params }: { params: { id: string } }) => {
//   let data: {
//     clubId: number;
//     clubName: string;
//     users: {
//       id: number;
//       firstName: string;
//       lastName: string;
//       email: string;
//     }[];
//   } = { clubId: 0, clubName: "", users: [] };
//   try {
//     const response = await fetchData(
//       `/clubs/${params.id}`
//     );
//     if (response.success) {
//       data = response.data;
//     }
//   } catch (e) {
//     throw new Error((e instanceof Error ? e.message : "Unknown error"));
//   }
//   return ;
// };

// export default ClubMembers;
