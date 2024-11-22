import CardPerson from "./cardPerson";

interface CardListProps {
  profiles: {
    name: string;
    image: any;
  }[];
}

export default function CardList({ profiles }: CardListProps) {
  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">
      {profiles.map((profile, index) => (
        <CardPerson key={index} image={profile.image} name={profile.name} />
      ))}
    </div>
  );
}
