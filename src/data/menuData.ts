import waffleNutella from "@/assets/waffle-nutella.jpg";
import waffleBerry from "@/assets/waffle-berry.jpg";
import waffleCaramel from "@/assets/waffle-caramel.jpg";
import waffleStrawberry from "@/assets/waffle-strawberry.jpg";
import wafflePistachio from "@/assets/waffle-pistachio.jpg";
import heroWaffle from "@/assets/hero-waffle.jpg";
import coffeeLatte from "@/assets/coffee-latte.jpg";
import icedCoffee from "@/assets/iced-coffee.jpg";
import lemonade from "@/assets/lemonade.jpg";
import turkishTea from "@/assets/turkish-tea.jpg";
import hotChocolate from "@/assets/hot-chocolate.jpg";
import kunefe from "@/assets/kunefe.jpg";
import brownie from "@/assets/brownie.jpg";
import cappuccino from "@/assets/cappuccino.jpg";
import turkishCoffee from "@/assets/turkish-coffee.jpg";
import americano from "@/assets/americano.jpg";
import herbalTea from "@/assets/herbal-tea.jpg";
import winterTea from "@/assets/winter-tea.jpg";
import icedChocolate from "@/assets/iced-chocolate.jpg";
import milkshake from "@/assets/milkshake.jpg";
import cheesecake from "@/assets/cheesecake.jpg";
import nutellaSauce from "@/assets/nutella-sauce.jpg";
import caramelSauce from "@/assets/caramel-sauce.jpg";
import whiteChocoSauce from "@/assets/white-choco-sauce.jpg";
import waffleChocoBanana from "@/assets/waffle-choco-banana.jpg";
import waffleTatliEksi from "@/assets/waffle-tatli-eksi.jpg";
import waffleFistikGecesi from "@/assets/waffle-fistik-gecesi.jpg";
import waffleKlasikNutella from "@/assets/waffle-klasik-nutella.jpg";
import waffleOrman from "@/assets/waffle-orman.jpg";
import waffleKlasikChoco from "@/assets/waffle-klasik-choco.jpg";

export type Category = "waffle-special" | "waffle-klasik" | "kahve" | "cay" | "soguk" | "tatli" | "sos";

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
  { id: "waffle-special", label: "Special's", emoji: "⭐" },
  { id: "waffle-klasik", label: "Klasik", emoji: "🧇" },
  { id: "kahve", label: "Kahveler", emoji: "☕" },
  { id: "cay", label: "Çaylar", emoji: "🍵" },
  { id: "soguk", label: "Soğuk İçecek", emoji: "🧊" },
  { id: "tatli", label: "Tatlılar", emoji: "🍰" },
  { id: "sos", label: "Ek Soslar", emoji: "🍫" },
];

export const menuItems: MenuItem[] = [
  // Waffle Special's
  {
    id: "ws1",
    name: "Çilek Rüyası",
    description: "Sütlü Çikolata, Beyaz Çikolata, Çilek, Antep Fıstığı, Yer Fıstığı, Frambuazlı Pirinç Patlağı",
    price: 199,
    image: waffleStrawberry,
    category: "waffle-special",
    popular: true,
  },
  {
    id: "ws2",
    name: "Karamelize",
    description: "Karamel, Beyaz Çikolata, Muz, Lotus Bisküvi, Altın Pirinç Patlağı, Yer Fıstığı",
    price: 199,
    image: waffleCaramel,
    category: "waffle-special",
    popular: true,
  },
  {
    id: "ws3",
    name: "Çikolatalı Muzlu",
    description: "Sütlü Çikolata, Beyaz Çikolata, Muz, Oreo, Pirinç Patlağı, Yer Fıstığı",
    price: 199,
    image: waffleChocoBanana,
    category: "waffle-special",
  },
  {
    id: "ws4",
    name: "Fıstık Şöleni",
    description: "Antep Fıstık Sos, Beyaz Çikolata, Çilek, Antep Fıstığı, Çıtır Kadayıf",
    price: 199,
    image: wafflePistachio,
    category: "waffle-special",
    popular: true,
  },
  {
    id: "ws5",
    name: "Fıstık Gecesi",
    description: "Bitter Çikolata, Antep Fıstık Sos, Muz, Antep Fıstığı, Oreo",
    price: 199,
    image: waffleFistikGecesi,
    category: "waffle-special",
  },
  {
    id: "ws6",
    name: "Tatlı Ekşi",
    description: "Bitter Çikolata, Ruby Çikolata, Çilek, Hindistan Cevizi, Yer Fıstığı, Parti Süsleri",
    price: 199,
    image: waffleTatliEksi,
    category: "waffle-special",
  },
  // Waffle Klasik
  {
    id: "wk1",
    name: "Nutella & Muz Waffle",
    description: "Taze Belçika waffle'ı, bol Nutella ve dilimlenmiş muz ile",
    price: 139,
    image: waffleKlasikNutella,
    category: "waffle-klasik",
  },
  {
    id: "wk2",
    name: "Orman Meyveli Waffle",
    description: "Çilek, yaban mersini, ahududu ve pudra şekeri ile",
    price: 149,
    image: waffleOrman,
    category: "waffle-klasik",
  },
  {
    id: "wk3",
    name: "Klasik Çikolatalı Waffle",
    description: "Bitter çikolata sosu, çilek ve krema ile",
    price: 129,
    image: waffleKlasikChoco,
    category: "waffle-klasik",
  },
  // Kahveler
  {
    id: "k1",
    name: "Latte",
    description: "Espresso ve buharla ısıtılmış süt, latte art ile",
    price: 85,
    image: coffeeLatte,
    category: "kahve",
    popular: true,
  },
  {
    id: "k2",
    name: "Cappuccino",
    description: "Eşit oranda espresso, süt ve süt köpüğü",
    price: 80,
    image: cappuccino,
    category: "kahve",
  },
  {
    id: "k3",
    name: "Türk Kahvesi",
    description: "Geleneksel yöntemle pişirilmiş Türk kahvesi",
    price: 60,
    image: turkishCoffee,
    category: "kahve",
  },
  {
    id: "k4",
    name: "Americano",
    description: "Çift shot espresso ve sıcak su",
    price: 70,
    image: americano,
    category: "kahve",
  },
  {
    id: "k5",
    name: "Sıcak Çikolata",
    description: "Zengin kakao, süt ve mini marshmallow ile",
    price: 75,
    image: hotChocolate,
    category: "kahve",
  },
  // Çaylar
  {
    id: "c1",
    name: "Demli Çay",
    description: "Geleneksel Türk çayı, ince belli bardakta",
    price: 30,
    image: turkishTea,
    category: "cay",
    popular: true,
  },
  {
    id: "c2",
    name: "Bitki Çayı",
    description: "Ihlamur, papatya veya adaçayı seçenekleri",
    price: 45,
    image: herbalTea,
    category: "cay",
  },
  {
    id: "c3",
    name: "Kış Çayı",
    description: "Tarçın, karanfil, zencefil ve bal ile özel harman",
    price: 50,
    image: winterTea,
    category: "cay",
  },
  // Soğuk İçecekler
  {
    id: "s1",
    name: "Buzlu Latte",
    description: "Soğuk süt ve buz üzerine espresso shot",
    price: 90,
    image: icedCoffee,
    category: "soguk",
    popular: true,
  },
  {
    id: "s2",
    name: "Taze Limonata",
    description: "Taze sıkılmış limon, nane ve buz ile",
    price: 65,
    image: lemonade,
    category: "soguk",
  },
  {
    id: "s3",
    name: "Buzlu Çikolata",
    description: "Soğuk süt, çikolata sosu ve krema ile",
    price: 80,
    image: icedChocolate,
    category: "soguk",
  },
  {
    id: "s4",
    name: "Milkshake",
    description: "Çikolata, vanilya veya çilek aromalı",
    price: 85,
    image: milkshake,
    category: "soguk",
  },
  // Tatlılar
  {
    id: "t1",
    name: "Künefe",
    description: "Tel kadayıf, peynir ve Antep fıstığı ile sıcak servis",
    price: 130,
    image: kunefe,
    category: "tatli",
    popular: true,
  },
  {
    id: "t2",
    name: "Brownie & Dondurma",
    description: "Sıcak çikolatalı brownie, vanilyalı dondurma ve çikolata sosu",
    price: 110,
    image: brownie,
    category: "tatli",
  },
  {
    id: "t3",
    name: "Cheesecake",
    description: "New York usulü cheesecake, orman meyveli sos ile",
    price: 100,
    image: cheesecake,
    category: "tatli",
  },
  // Ek Soslar
  {
    id: "sos1",
    name: "Nutella Sos",
    description: "Ekstra Nutella çikolata sosu",
    price: 25,
    image: nutellaSauce,
    category: "sos",
  },
  {
    id: "sos2",
    name: "Antep Fıstık Sos",
    description: "Ev yapımı Antep fıstığı sosu",
    price: 35,
    image: wafflePistachio,
    category: "sos",
  },
  {
    id: "sos3",
    name: "Karamel Sos",
    description: "Ev yapımı karamel sos",
    price: 25,
    image: caramelSauce,
    category: "sos",
  },
  {
    id: "sos4",
    name: "Beyaz Çikolata Sos",
    description: "Kremalı beyaz çikolata sosu",
    price: 25,
    image: whiteChocoSauce,
    category: "sos",
  },
];
