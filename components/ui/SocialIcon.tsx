type Props = {
  item: {
    iconClass: string;
  };
};

export default function SocialIcon({ item }: Props) {
  return <i className={item.iconClass} />;
}