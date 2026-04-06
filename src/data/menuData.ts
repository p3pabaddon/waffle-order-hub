import waffleNutella from "@/assets/waffle-nutella.jpg";
import waffleBerry from "@/assets/waffle-berry.jpg";
import waffleCaramel from "@/assets/waffle-caramel.jpg";
import coffeeLatte from "@/assets/coffee-latte.jpg";
import icedCoffee from "@/assets/iced-coffee.jpg";
import lemonade from "@/assets/lemonade.jpg";
import heroWaffle from "@/assets/hero-waffle.jpg";

export type Category = "waffle" | "kahve" | "soguk";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  popular?: boolean;
}

export const categories: { id: Category; label: string; emoji: string }[] = [
  { id: "waffle", label: "Waffle", emoji: "🧇" },
  { id: "kahve", label: "Kahveler", emoji: "☕" },
  { id: "soguk", label: "Soğuk İçecekler", emoji: "🧊" },
];

export const menuItems: MenuItem[] = [
  {
    id: "w1",
    name: "Nutella & Muz Waffle",
    description: "Taze Belçika waffle'ı, bol Nutella ve dilimlenmiş muz ile",
    price: 120,
    image: waffleNutella,
    category: "waffle",
    popular: true,
  },
  {
    id: "w2",
    name: "Orman Meyveli Waffle",
    description: "Çilek, yaban mersini, ahududu ve pudra şekeri ile",
    price: 130,
    image: waffleBerry,
    category: "waffle",
    popular: true,
  },
  {
    id: "w3",
    name: "Karamel & Dondurma Waffle",
    description: "Ev yapımı karamel sos ve vanilyalı dondurma ile",
    price: 140,
    image: waffleCaramel,
    category: "waffle",
  },
  {
    id: "w4",
    name: "Klasik Çikolatalı Waffle",
    description: "Bitter çikolata sosu, çilek ve krema ile",
    price: 115,
    image: heroWaffle,
    category: "waffle",
  },
  {
    id: "k1",
    name: "Latte",
    description: "Espresso ve buharla ısıtılmış süt, latte art ile",
    price: 70,
    image: coffeeLatte,
    category: "kahve",
    popular: true,
  },
  {
    id: "k2",
    name: "Cappuccino",
    description: "Eşit oranda espresso, süt ve süt köpüğü",
    price: 65,
    image: coffeeLatte,
    category: "kahve",
  },
  {
    id: "k3",
    name: "Türk Kahvesi",
    description: "Geleneksel yöntemle pişirilmiş Türk kahvesi",
    price: 50,
    image: coffeeLatte,
    category: "kahve",
  },
  {
    id: "s1",
    name: "Buzlu Latte",
    description: "Soğuk süt ve buz üzerine espresso shot",
    price: 75,
    image: icedCoffee,
    category: "soguk",
    popular: true,
  },
  {
    id: "s2",
    name: "Taze Limonata",
    description: "Taze sıkılmış limon, nane ve buz ile",
    price: 55,
    image: lemonade,
    category: "soguk",
  },
  {
    id: "s3",
    name: "Buzlu Çikolata",
    description: "Soğuk süt, çikolata sosu ve krema ile",
    price: 70,
    image: icedCoffee,
    category: "soguk",
  },
];
