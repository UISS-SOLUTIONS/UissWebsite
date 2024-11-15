interface IEventCard {
  id: number;
  image: string;
  title: string;
  description: string;
  date?: string;
  venue?: string;
}

type IEvents = IEventCard[] 