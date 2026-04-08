import waffleStrawberry from "@/assets/waffle-strawberry.jpg";
import waffleCaramel from "@/assets/waffle-caramel.jpg";
import wafflePistachio from "@/assets/waffle-pistachio.jpg";
import waffleChocoBanana from "@/assets/waffle-choco-banana.jpg";
import waffleTatliEksi from "@/assets/waffle-tatli-eksi.jpg";
import waffleFistikGecesi from "@/assets/waffle-fistik-gecesi.jpg";
import waffleKlasikNutella from "@/assets/waffle-klasik-nutella.jpg";
import waffleOrman from "@/assets/waffle-orman.jpg";
import waffleKlasikChoco from "@/assets/waffle-klasik-choco.jpg";
import coffeeLatte from "@/assets/coffee-latte.jpg";
import cappuccino from "@/assets/cappuccino.jpg";
import turkishCoffee from "@/assets/turkish-coffee.jpg";
import americano from "@/assets/americano.jpg";
import hotChocolate from "@/assets/hot-chocolate.jpg";
import turkishTea from "@/assets/turkish-tea.jpg";
import herbalTea from "@/assets/herbal-tea.jpg";
import winterTea from "@/assets/winter-tea.jpg";
import icedCoffee from "@/assets/iced-coffee.jpg";
import lemonade from "@/assets/lemonade.jpg";
import icedChocolate from "@/assets/iced-chocolate.jpg";
import milkshake from "@/assets/milkshake.jpg";
import kunefe from "@/assets/kunefe.jpg";
import brownie from "@/assets/brownie.jpg";
import cheesecake from "@/assets/cheesecake.jpg";
import nutellaSauce from "@/assets/nutella-sauce.jpg";
import caramelSauce from "@/assets/caramel-sauce.jpg";
import whiteChocoSauce from "@/assets/white-choco-sauce.jpg";
import heroWaffle from "@/assets/hero-waffle.jpg";
// Breakfast images
import serpmeKahvalti from "@/assets/serpme-kahvalti.jpg";
import menemen from "@/assets/menemen.jpg";
import tost from "@/assets/tost.jpg";
import sahandaYumurta from "@/assets/sahanda-yumurta.jpg";
import peynirTabagi from "@/assets/peynir-tabagi.jpg";
import balKaymak from "@/assets/bal-kaymak.jpg";
import pisi from "@/assets/pisi.jpg";
import kuymak from "@/assets/kuymak.jpg";
import sogusTabagi from "@/assets/sogus-tabagi.jpg";
import simit from "@/assets/simit.jpg";
import omlet from "@/assets/omlet.jpg";
// Starter images
import patatesTava from "@/assets/patates-tava.jpg";
import sicakTabagi from "@/assets/sicak-tabagi.jpg";
import gozleme from "@/assets/gozleme.jpg";

export type Category =
  | "waffle-special"
  | "waffle-klasik"
  | "kendin-yarat"
  | "kahvalti"
  | "baslangic"
  | "sicak-icecek"
  | "espresso"
  | "soguk-espresso"
  | "bitki-cayi"
  | "frozen-milkshake"
  | "kokteyl"
  | "mesrubat"
  | "tatli"
  | "sos";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  popular?: boolean;
  ingredients?: string[];
  isCustomizable?: boolean;
}

export const categories: { id: Category; label: string; emoji: string }[] = [
  { id: "waffle-special", label: "Special's", emoji: "⭐" },
  { id: "waffle-klasik", label: "Klasik Waffle", emoji: "🧇" },
  { id: "kendin-yarat", label: "Kendin Yarat", emoji: "🎨" },
  { id: "kahvalti", label: "Kahvaltı", emoji: "🍳" },
  { id: "baslangic", label: "Başlangıçlar", emoji: "🍟" },
  { id: "sicak-icecek", label: "Sıcak İçecekler", emoji: "☕" },
  { id: "espresso", label: "Espresso", emoji: "☕" },
  { id: "soguk-espresso", label: "Soğuk Kahve", emoji: "🧊" },
  { id: "bitki-cayi", label: "Bitki Çayları", emoji: "🍵" },
  { id: "frozen-milkshake", label: "Frozen & Shake", emoji: "🥤" },
  { id: "kokteyl", label: "Kokteyller", emoji: "🍹" },
  { id: "mesrubat", label: "Meşrubatlar", emoji: "🥤" },
  { id: "tatli", label: "Tatlılar", emoji: "🍰" },
  { id: "sos", label: "Ek Soslar", emoji: "🍫" },
];

// Build-your-own customization options
export interface CustomizationOption {
  id: string;
  name: string;
  category: "meyve" | "cikolata" | "susleme";
}

export const customizationOptions: CustomizationOption[] = [
  { id: "fruit-cilek", name: "Çilek", category: "meyve" },
  { id: "fruit-muz", name: "Muz", category: "meyve" },
  { id: "fruit-frambuaz", name: "Frambuaz", category: "meyve" },
  { id: "fruit-yaban-mersini", name: "Yaban Mersini", category: "meyve" },
  { id: "fruit-kivi", name: "Kivi", category: "meyve" },
  { id: "fruit-ananas", name: "Ananas", category: "meyve" },
  { id: "choco-sutlu", name: "Sütlü Çikolata", category: "cikolata" },
  { id: "choco-bitter", name: "Bitter Çikolata", category: "cikolata" },
  { id: "choco-beyaz", name: "Beyaz Çikolata", category: "cikolata" },
  { id: "choco-ruby", name: "Ruby Çikolata", category: "cikolata" },
  { id: "choco-nutella", name: "Nutella", category: "cikolata" },
  { id: "choco-karamel", name: "Karamel", category: "cikolata" },
  { id: "choco-fistik-sos", name: "Antep Fıstık Sos", category: "cikolata" },
  { id: "top-antep", name: "Antep Fıstığı", category: "susleme" },
  { id: "top-yer-fistigi", name: "Yer Fıstığı", category: "susleme" },
  { id: "top-hindistan", name: "Hindistan Cevizi", category: "susleme" },
  { id: "top-oreo", name: "Oreo", category: "susleme" },
  { id: "top-lotus", name: "Lotus Bisküvi", category: "susleme" },
  { id: "top-pirinc-patlagi", name: "Pirinç Patlağı", category: "susleme" },
  { id: "top-citir-kadayif", name: "Çıtır Kadayıf", category: "susleme" },
  { id: "top-parti-susleri", name: "Parti Süsleri", category: "susleme" },
  { id: "top-marshmallow", name: "Marshmallow", category: "susleme" },
];

export const menuItems: MenuItem[] = [
  // === WAFFLE SPECIAL'S ===
  {
    id: "ws1", name: "Çilek Rüyası",
    description: "Sütlü Çikolata, Beyaz Çikolata, Çilek, Antep Fıstığı, Yer Fıstığı, Frambuazlı Pirinç Patlağı",
    price: 199, image: waffleStrawberry, category: "waffle-special", popular: true,
    ingredients: ["Sütlü Çikolata", "Beyaz Çikolata", "Çilek", "Antep Fıstığı", "Yer Fıstığı", "Frambuazlı Pirinç Patlağı"],
  },
  {
    id: "ws2", name: "Karamelize",
    description: "Karamel, Beyaz Çikolata, Muz, Lotus Bisküvi, Altın Pirinç Patlağı, Yer Fıstığı",
    price: 199, image: waffleCaramel, category: "waffle-special", popular: true,
    ingredients: ["Karamel", "Beyaz Çikolata", "Muz", "Lotus Bisküvi", "Altın Pirinç Patlağı", "Yer Fıstığı"],
  },
  {
    id: "ws3", name: "Çikolatalı Muzlu",
    description: "Sütlü Çikolata, Beyaz Çikolata, Muz, Oreo, Pirinç Patlağı, Yer Fıstığı",
    price: 199, image: waffleChocoBanana, category: "waffle-special",
    ingredients: ["Sütlü Çikolata", "Beyaz Çikolata", "Muz", "Oreo", "Pirinç Patlağı", "Yer Fıstığı"],
  },
  {
    id: "ws4", name: "Fıstık Şöleni",
    description: "Antep Fıstık Sos, Beyaz Çikolata, Çilek, Antep Fıstığı, Çıtır Kadayıf",
    price: 199, image: wafflePistachio, category: "waffle-special", popular: true,
    ingredients: ["Antep Fıstık Sos", "Beyaz Çikolata", "Çilek", "Antep Fıstığı", "Çıtır Kadayıf"],
  },
  {
    id: "ws5", name: "Fıstık Gecesi",
    description: "Bitter Çikolata, Antep Fıstık Sos, Muz, Antep Fıstığı, Oreo",
    price: 199, image: waffleFistikGecesi, category: "waffle-special",
    ingredients: ["Bitter Çikolata", "Antep Fıstık Sos", "Muz", "Antep Fıstığı", "Oreo"],
  },
  {
    id: "ws6", name: "Tatlı Ekşi",
    description: "Bitter Çikolata, Ruby Çikolata, Çilek, Hindistan Cevizi, Yer Fıstığı, Parti Süsleri",
    price: 199, image: waffleTatliEksi, category: "waffle-special",
    ingredients: ["Bitter Çikolata", "Ruby Çikolata", "Çilek", "Hindistan Cevizi", "Yer Fıstığı", "Parti Süsleri"],
  },

  // === WAFFLE KLASİK ===
  {
    id: "wk1", name: "Nutella & Muz Waffle",
    description: "Taze Belçika waffle'ı, bol Nutella ve dilimlenmiş muz ile",
    price: 139, image: waffleKlasikNutella, category: "waffle-klasik",
    ingredients: ["Nutella", "Muz"],
  },
  {
    id: "wk2", name: "Orman Meyveli Waffle",
    description: "Çilek, yaban mersini, ahududu ve pudra şekeri ile",
    price: 149, image: waffleOrman, category: "waffle-klasik",
    ingredients: ["Çilek", "Yaban Mersini", "Ahududu", "Pudra Şekeri"],
  },
  {
    id: "wk3", name: "Klasik Çikolatalı Waffle",
    description: "Bitter çikolata sosu, çilek ve krema ile",
    price: 129, image: waffleKlasikChoco, category: "waffle-klasik",
    ingredients: ["Bitter Çikolata Sosu", "Çilek", "Krema"],
  },

  // === KENDİN YARAT ===
  {
    id: "ky1", name: "Kendin Yarat - Tabakta",
    description: "Tabakta servis edilir. 2 adet meyve, sınırsız çikolata ve sınırsız süsleme seçebilirsiniz.",
    price: 250, image: heroWaffle, category: "kendin-yarat", popular: true,
    isCustomizable: true, ingredients: [],
  },
  {
    id: "ky2", name: "Kendin Yarat - Kovada",
    description: "Kovada servis edilir. 2 adet meyve, sınırsız çikolata ve sınırsız süsleme seçebilirsiniz.",
    price: 250, image: heroWaffle, category: "kendin-yarat",
    isCustomizable: true, ingredients: [],
  },

  // === KAHVALTI ===
  {
    id: "kv1", name: "Serpme Kahvaltı (2 kişilik)",
    description: "Ezine beyaz peynir, Çeçil peyniri, Taze kaşar, Misket peynir, Jambon, Çikolatalı fındık kreması, Mevsim reçeli, Bal, Kaymak, Acuka, Zeytinler, Portakal, Patates kızartması, Sucuk şiş, Hellim şiş, Sigara böreği, Pişi, Soğan halkası, Salçalı sosis, Omlet, Simit, Ekmek ve Sınırsız çay",
    price: 1249, image: serpmeKahvalti, category: "kahvalti", popular: true,
    ingredients: ["Ezine Beyaz Peynir", "Çeçil Peyniri", "Taze Kaşar", "Misket Peynir", "Jambon", "Çikolatalı Fındık Kreması", "Mevsim Reçeli", "Bal", "Kaymak", "Acuka", "Siyah Zeytin", "Yeşil Zeytin", "Patates Kızartması", "Sucuk Şiş", "Hellim Şiş", "Sigara Böreği", "Pişi", "Soğan Halkası", "Salçalı Sosis", "Omlet", "Simit", "Ekmek", "Sınırsız Çay"],
  },
  {
    id: "kv2", name: "Hızlı Kahvaltı",
    description: "Beyaz peynir, Çeçil peyniri, Kaşar, Misket, Jambon, Zeytin, Söğüş, Çikolatalı fındık kreması, Reçel, Patates kızartması, Omlet, Sucuk hellim şiş, Sigara böreği, Soğan halkası ve Çay",
    price: 549, image: serpmeKahvalti, category: "kahvalti",
    ingredients: ["Beyaz Peynir", "Çeçil Peyniri", "Kaşar Peyniri", "Misket Peynir", "Dana Jambon", "Zeytin", "Söğüş", "Çikolatalı Fındık Kreması", "Reçel", "Patates Kızartması", "Omlet", "Sucuk Hellim Şiş", "Sigara Böreği", "Soğan Halkası", "Çay"],
  },
  {
    id: "kv3", name: "Peynir Tabağı",
    description: "Beyaz peynir, Kaşar peyniri, Çeçil peyniri, Misket peynir, Dana jambon, Kuru üzüm",
    price: 249, image: peynirTabagi, category: "kahvalti",
    ingredients: ["Beyaz Peynir", "Kaşar Peyniri", "Çeçil Peyniri", "Misket Peynir", "Dana Jambon", "Kuru Üzüm"],
  },
  {
    id: "kv4", name: "Söğüş Tabağı",
    description: "Domates, Salatalık, Köy biberi, Kıvırcık, Maydonoz",
    price: 209, image: sogusTabagi, category: "kahvalti",
    ingredients: ["Domates", "Salatalık", "Köy Biberi", "Kıvırcık", "Maydonoz"],
  },
  { id: "kv5", name: "Bal Kaymak", description: "Taze bal ve kaymak", price: 149, image: balKaymak, category: "kahvalti" },
  { id: "kv6", name: "Pişi Tabağı", description: "4 adet pişi", price: 199, image: pisi, category: "kahvalti" },
  { id: "kv7", name: "Klasik Menemen", description: "Geleneksel menemen", price: 249, image: menemen, category: "kahvalti" },
  { id: "kv8", name: "Peynirli Menemen", description: "Peynirli menemen", price: 259, image: menemen, category: "kahvalti" },
  { id: "kv9", name: "Cheddarlı Menemen", description: "Cheddar peynirli menemen", price: 269, image: menemen, category: "kahvalti" },
  { id: "kv10", name: "Sucuklu Menemen", description: "Sucuklu menemen", price: 269, image: menemen, category: "kahvalti" },
  { id: "kv11", name: "Kavurmalı Menemen", description: "Kavurmalı menemen", price: 349, image: menemen, category: "kahvalti" },
  { id: "kv12", name: "Karışık Menemen", description: "Sucuklu ve Kaşarlı", price: 299, image: menemen, category: "kahvalti" },
  { id: "kv13", name: "Salçalı Sosis", description: "Salçalı sosis tabağı", price: 209, image: sahandaYumurta, category: "kahvalti" },
  { id: "kv14", name: "Sade Omlet", description: "Sade omlet", price: 189, image: omlet, category: "kahvalti" },
  { id: "kv15", name: "Peynirli Omlet", description: "Peynirli omlet", price: 199, image: omlet, category: "kahvalti" },
  { id: "kv16", name: "Veggie Omlet", description: "Sebzeli omlet", price: 189, image: omlet, category: "kahvalti" },
  { id: "kv17", name: "Scrambled Egg", description: "Çırpılmış yumurta", price: 189, image: omlet, category: "kahvalti" },
  { id: "kv18", name: "Sahanda Yumurta", description: "Sahanda yumurta", price: 189, image: sahandaYumurta, category: "kahvalti" },
  { id: "kv19", name: "Sahanda Sucuk", description: "Sahanda sucuk", price: 239, image: sahandaYumurta, category: "kahvalti" },
  { id: "kv20", name: "Sucuklu Yumurta", description: "Sucuklu yumurta", price: 249, image: sahandaYumurta, category: "kahvalti" },
  { id: "kv21", name: "Kavurmalı Yumurta", description: "Kavurmalı yumurta", price: 299, image: sahandaYumurta, category: "kahvalti" },
  { id: "kv22", name: "Kaşarlı Tost", description: "Kaşarlı tost", price: 229, image: tost, category: "kahvalti" },
  { id: "kv23", name: "Kavurmalı Kaşarlı Tost", description: "Kavurmalı ve kaşarlı tost", price: 279, image: tost, category: "kahvalti" },
  { id: "kv24", name: "Karışık Tost", description: "Karışık tost", price: 259, image: tost, category: "kahvalti" },
  {
    id: "kv25", name: "Shabby Tost",
    description: "Yumurta, Panco, Cheddar, Patates",
    price: 289, image: tost, category: "kahvalti",
    ingredients: ["Yumurta", "Panco", "Cheddar", "Patates"],
  },
  { id: "kv26", name: "Kuymak", description: "Geleneksel kuymak", price: 299, image: kuymak, category: "kahvalti" },
  { id: "kv27", name: "Simit", description: "Simit", price: 39, image: simit, category: "kahvalti" },

  // === BAŞLANGIÇLAR ===
  { id: "bs1", name: "Patates Tava", description: "Klasik patates kızartması", price: 189, image: patatesTava, category: "baslangic" },
  { id: "bs2", name: "Patates Tava (Cajun Baharatlı)", description: "Cajun baharatlı patates kızartması", price: 190, image: patatesTava, category: "baslangic" },
  {
    id: "bs3", name: "Trüflü Patates Tava",
    description: "Parmesan ile birlikte servis edilmektedir",
    price: 199, image: patatesTava, category: "baslangic",
    ingredients: ["Patates", "Trüf Yağı", "Parmesan"],
  },
  {
    id: "bs4", name: "Börek Tabağı",
    description: "Sigara böreği (4 Adet), Pişi (2 Adet), ve Patates kızartması ile birlikte",
    price: 229, image: sicakTabagi, category: "baslangic",
    ingredients: ["Sigara Böreği", "Pişi", "Patates Kızartması"],
  },
  {
    id: "bs5", name: "Sıcak Tabağı",
    description: "Patates kızartması, Soğan halkası, Sigara böreği, Sucuk hellim şiş, Pişi",
    price: 299, image: sicakTabagi, category: "baslangic",
    ingredients: ["Patates Kızartması", "Soğan Halkası", "Sigara Böreği", "Sucuk Hellim Şiş", "Pişi"],
  },
  {
    id: "bs6", name: "Sosis Tabağı",
    description: "Patates kızartması ile servis edilir",
    price: 229, image: sicakTabagi, category: "baslangic",
  },
  { id: "bs7", name: "Patatesli Gözleme", description: "Domates, Salatalık ve Yeşillik ile birlikte", price: 249, image: gozleme, category: "baslangic" },
  { id: "bs8", name: "Patatesli Kaşarlı Gözleme", description: "Domates, Salatalık ve Yeşillik ile birlikte", price: 259, image: gozleme, category: "baslangic" },
  { id: "bs9", name: "Beyaz Peynirli Gözleme", description: "Domates, Salatalık ve Yeşillik ile birlikte", price: 229, image: gozleme, category: "baslangic" },
  { id: "bs10", name: "Kaşarlı Gözleme", description: "Domates, Salatalık ve Yeşillik ile birlikte", price: 229, image: gozleme, category: "baslangic" },
  { id: "bs11", name: "Karışık Gözleme", description: "Sucuk ve kaşarlı. Domates, Salatalık ve Yeşillik ile birlikte", price: 279, image: gozleme, category: "baslangic" },

  // === SICAK İÇECEKLER ===
  { id: "si1", name: "Demleme Çay", description: "Geleneksel demleme çay", price: 49, image: turkishTea, category: "sicak-icecek", popular: true },
  { id: "si2", name: "Demleme Çay Fincan", description: "Fincan demleme çay", price: 69, image: turkishTea, category: "sicak-icecek" },
  { id: "si3", name: "Türk Kahvesi", description: "Geleneksel Türk kahvesi", price: 79, image: turkishCoffee, category: "sicak-icecek" },
  { id: "si4", name: "Double Türk Kahvesi", description: "Çift Türk kahvesi", price: 89, image: turkishCoffee, category: "sicak-icecek" },
  { id: "si5", name: "Sütlü Türk Kahvesi", description: "Sütlü Türk kahvesi", price: 89, image: turkishCoffee, category: "sicak-icecek" },
  { id: "si6", name: "Damla Sakızlı Türk Kahvesi", description: "Damla sakızlı Türk kahvesi", price: 89, image: turkishCoffee, category: "sicak-icecek" },
  { id: "si7", name: "Menengiç Türk Kahvesi", description: "Menengiç Türk kahvesi", price: 89, image: turkishCoffee, category: "sicak-icecek" },
  { id: "si8", name: "Chai Latte", description: "Chai Latte", price: 99, image: coffeeLatte, category: "sicak-icecek" },
  { id: "si9", name: "Sahlep", description: "Sıcak sahlep", price: 99, image: hotChocolate, category: "sicak-icecek" },
  { id: "si10", name: "Sıcak Çikolata", description: "Zengin sıcak çikolata", price: 99, image: hotChocolate, category: "sicak-icecek" },

  // === ESPRESSO BAZLI ===
  { id: "es1", name: "Single Espresso", description: "Tek shot espresso", price: 65, image: americano, category: "espresso" },
  { id: "es2", name: "Double Espresso", description: "Çift shot espresso", price: 79, image: americano, category: "espresso" },
  { id: "es3", name: "Americano", description: "Espresso ve sıcak su", price: 89, image: americano, category: "espresso" },
  { id: "es4", name: "Filtre Kahve", description: "Filtre kahve", price: 89, image: americano, category: "espresso" },
  { id: "es5", name: "Latte", description: "Espresso ve buharla ısıtılmış süt", price: 99, image: coffeeLatte, category: "espresso", popular: true },
  { id: "es6", name: "Cappucino", description: "Eşit oranda espresso, süt ve süt köpüğü", price: 99, image: cappuccino, category: "espresso" },
  { id: "es7", name: "Mocha", description: "Espresso, çikolata ve süt", price: 99, image: coffeeLatte, category: "espresso" },
  { id: "es8", name: "White Chocolate Mocha", description: "Beyaz çikolatalı mocha", price: 99, image: coffeeLatte, category: "espresso" },
  { id: "es9", name: "Karamel Macchiato", description: "Karamel soslu macchiato", price: 99, image: coffeeLatte, category: "espresso" },
  { id: "es10", name: "Cortado", description: "Cortado", price: 99, image: americano, category: "espresso" },
  { id: "es11", name: "Flat White", description: "Flat White", price: 99, image: cappuccino, category: "espresso" },

  // === SOĞUK ESPRESSO BAZLI ===
  { id: "se1", name: "Ice Americano", description: "Soğuk Americano", price: 109, image: icedCoffee, category: "soguk-espresso" },
  { id: "se2", name: "Ice Latte", description: "Soğuk süt ve buz üzerine espresso", price: 115, image: icedCoffee, category: "soguk-espresso", popular: true },
  { id: "se3", name: "Ice Mocha", description: "Soğuk mocha", price: 119, image: icedCoffee, category: "soguk-espresso" },
  { id: "se4", name: "Ice White Chocolate Mocha", description: "Soğuk beyaz çikolatalı mocha", price: 119, image: icedCoffee, category: "soguk-espresso" },
  { id: "se5", name: "Frappe", description: "Frappe", price: 119, image: icedCoffee, category: "soguk-espresso" },
  { id: "se6", name: "Cool Drink Frappucino", description: "Muz, Karamel", price: 125, image: milkshake, category: "soguk-espresso" },
  { id: "se7", name: "Pink Berry Frappucino", description: "Çilek, Karadut", price: 125, image: milkshake, category: "soguk-espresso" },
  { id: "se8", name: "Banana Split Frappucino", description: "Muzlu frappucino", price: 125, image: milkshake, category: "soguk-espresso" },

  // === BİTKİ ÇAYLARI ===
  { id: "bc1", name: "Ihlamur", description: "Ihlamur çayı", price: 99, image: herbalTea, category: "bitki-cayi" },
  { id: "bc2", name: "Yeşil Çay", description: "Yeşil çay", price: 99, image: herbalTea, category: "bitki-cayi" },
  { id: "bc3", name: "Kış Çayı", description: "Tarçın, karanfil, zencefil ve bal ile", price: 99, image: winterTea, category: "bitki-cayi" },
  { id: "bc4", name: "Melisa Çayı", description: "Melisa çayı", price: 99, image: herbalTea, category: "bitki-cayi" },
  { id: "bc5", name: "Papatya Çayı", description: "Papatya çayı", price: 99, image: herbalTea, category: "bitki-cayi" },
  { id: "bc6", name: "Hibisküs Çayı", description: "Hibisküs çayı", price: 99, image: herbalTea, category: "bitki-cayi" },
  { id: "bc7", name: "Elma Tarçın Çayı", description: "Elma tarçın çayı", price: 99, image: herbalTea, category: "bitki-cayi" },

  // === FROZEN & MİLKSHAKE ===
  { id: "fm1", name: "Tropical Frozen", description: "Mango, Kivi, Limon", price: 125, image: milkshake, category: "frozen-milkshake" },
  { id: "fm2", name: "Black Mulberry Frozen", description: "Karadut, Limon", price: 125, image: milkshake, category: "frozen-milkshake" },
  { id: "fm3", name: "Pink Dream Frozen", description: "Çilek, Limon", price: 125, image: milkshake, category: "frozen-milkshake" },
  { id: "fm4", name: "Limonata Frozen", description: "Limonata frozen", price: 125, image: lemonade, category: "frozen-milkshake" },
  { id: "fm5", name: "Milkshake Çeşitleri", description: "Muz, Çilek, Karamel, Çikolata, Beyaz çikolata, Vanilya", price: 130, image: milkshake, category: "frozen-milkshake" },

  // === FRESH KOKTEYLLER ===
  { id: "fk1", name: "Mojito", description: "Çilekli veya Karadutlu seçenekleri", price: 129, image: lemonade, category: "kokteyl" },
  { id: "fk2", name: "Cool Lime", description: "Nane ve Limon özü", price: 129, image: lemonade, category: "kokteyl" },
  { id: "fk3", name: "Berry Hibiscus", description: "Karadut, Hibiscus çayı", price: 129, image: lemonade, category: "kokteyl" },
  { id: "fk4", name: "Blue Night", description: "Blue Curacao, Sprite, Ananas Suyu", price: 129, image: lemonade, category: "kokteyl" },
  { id: "fk5", name: "Fresh Black Mulberry", description: "Karadut, Sprite, Limon", price: 129, image: lemonade, category: "kokteyl" },

  // === MEŞRUBATLAR ===
  { id: "mr1", name: "Su", description: "Su", price: 39, image: lemonade, category: "mesrubat" },
  { id: "mr2", name: "Soda", description: "Soda", price: 59, image: lemonade, category: "mesrubat" },
  { id: "mr3", name: "İtalyan Soda", description: "Misket Limon, Çilek, Karadut, Blue Curaçao, Mango, Çarkıfelek Meyvesi", price: 89, image: lemonade, category: "mesrubat" },
  { id: "mr4", name: "Churchill", description: "Churchill", price: 75, image: lemonade, category: "mesrubat" },
  { id: "mr5", name: "Pepsi Cola", description: "Pepsi max (sıfır şeker)", price: 75, image: lemonade, category: "mesrubat" },
  { id: "mr6", name: "Yedigün", description: "Yedigün", price: 75, image: lemonade, category: "mesrubat" },
  { id: "mr7", name: "Ice Tea", description: "Şeftali, Limon, Mango", price: 75, image: lemonade, category: "mesrubat" },
  { id: "mr8", name: "7up", description: "Gazoz", price: 75, image: lemonade, category: "mesrubat" },
  { id: "mr9", name: "Meyve Suyu", description: "Şeftali, Vişne, Karışık", price: 75, image: lemonade, category: "mesrubat" },
  { id: "mr10", name: "Ayran", description: "Ayran", price: 75, image: lemonade, category: "mesrubat" },
  { id: "mr11", name: "Portakal Suyu", description: "Taze portakal suyu", price: 99, image: lemonade, category: "mesrubat" },
  { id: "mr12", name: "Limonata", description: "Ev yapımı limonata", price: 89, image: lemonade, category: "mesrubat" },
  { id: "mr13", name: "Çilekli Limonata", description: "Çilekli limonata", price: 95, image: lemonade, category: "mesrubat" },
  { id: "mr14", name: "Mango Peach Limonata", description: "Mango şeftalili limonata", price: 95, image: lemonade, category: "mesrubat" },
  { id: "mr15", name: "Çarkıfelek Meyveli Limonata", description: "Çarkıfelek meyveli limonata", price: 95, image: lemonade, category: "mesrubat" },

  // === TATLILAR ===
  {
    id: "t1", name: "Künefe",
    description: "Tel kadayıf, peynir ve Antep fıstığı ile sıcak servis",
    price: 130, image: kunefe, category: "tatli", popular: true,
    ingredients: ["Tel Kadayıf", "Peynir", "Antep Fıstığı"],
  },
  {
    id: "t2", name: "Brownie & Dondurma",
    description: "Sıcak çikolatalı brownie, vanilyalı dondurma ve çikolata sosu",
    price: 110, image: brownie, category: "tatli",
    ingredients: ["Brownie", "Vanilya Dondurma", "Çikolata Sosu"],
  },
  {
    id: "t3", name: "Cheesecake",
    description: "New York usulü cheesecake, orman meyveli sos ile",
    price: 100, image: cheesecake, category: "tatli",
  },

  // === EK SOSLAR ===
  { id: "sos1", name: "Nutella Sos", description: "Ekstra Nutella çikolata sosu", price: 25, image: nutellaSauce, category: "sos" },
  { id: "sos2", name: "Antep Fıstık Sos", description: "Ev yapımı Antep fıstığı sosu", price: 35, image: wafflePistachio, category: "sos" },
  { id: "sos3", name: "Karamel Sos", description: "Ev yapımı karamel sos", price: 25, image: caramelSauce, category: "sos" },
  { id: "sos4", name: "Beyaz Çikolata Sos", description: "Kremalı beyaz çikolata sosu", price: 25, image: whiteChocoSauce, category: "sos" },
];
