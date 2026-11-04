import { CalendarDays, Clock3, MapPin } from "lucide-react";

interface Props {
  title: string;
  date: string;
  location: string;
}

export default function UpcomingEventsCard({ title, date, location }: Props) {
  return (
    <article className="border-b border-line py-5 last:border-0">
      <h3 className="text-base font-medium text-ink">{title}</h3>
      <div className="mt-3 space-y-2 text-sm text-muted">
        <p className="flex items-start gap-2">
          <MapPin aria-hidden className="mt-0.5 size-4 shrink-0" />
          {location}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <p className="flex items-center gap-2">
            <CalendarDays aria-hidden className="size-4" />
            <time dateTime={date}>{date.slice(0, 10)}</time>
          </p>
          <p className="flex items-center gap-2">
            <Clock3 aria-hidden className="size-4" />
            {date.slice(11, 16)}
          </p>
        </div>
      </div>
    </article>
  );
}
