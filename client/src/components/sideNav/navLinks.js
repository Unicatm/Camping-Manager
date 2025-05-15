import {
  HomeIcon,
  UserGroupIcon,
  CreditCardIcon,
  ChartBarIcon,
  MapIcon,
} from "@heroicons/react/20/solid";

const navLinks = [
  {
    route: "/acasa",
    title: "Acasă",
    icon: HomeIcon,
  },
  {
    route: "/rezervari",
    title: "Rezervări",
    icon: CreditCardIcon,
  },
  {
    route: "/clienti",
    title: "Clienți",
    icon: UserGroupIcon,
  },
  {
    route: "/map",
    title: "Hartă",
    icon: MapIcon,
  },
  {
    route: "/stats",
    title: "Statistici",
    icon: ChartBarIcon,
  },
];

export default navLinks;
