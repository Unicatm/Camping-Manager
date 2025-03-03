import {
  HomeIcon,
  UserGroupIcon,
  CreditCardIcon,
  ChartBarIcon,
} from "@heroicons/react/20/solid";

const navLinks = [
  {
    route: "/acasa",
    title: "Acasă",
    icon: HomeIcon,
  },
  {
    route: "/clienti",
    title: "Clienți",
    icon: UserGroupIcon,
  },
  {
    route: "/rezervari",
    title: "Rezervări",
    icon: CreditCardIcon,
  },
  {
    route: "/stats",
    title: "Statistici",
    icon: ChartBarIcon,
  },
];

export default navLinks;
