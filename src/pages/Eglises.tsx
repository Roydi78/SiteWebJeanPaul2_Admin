import { MapPin, Clock, Phone } from 'lucide-react';
import CoverImg from '../assets/pexels-saarteaga-18038388.jpg';
import ChristroiImg from '../assets/paroisse-christ-roi.jpg';
import AssomptionImg from '../assets/assumption-assomption-5.jpg';
import NotreDamedeGraceImg from '../assets/notre-dame-de-grace.jpg';

const eglises = [
  {
    nom: 'Paroisse Christ-Roi',
    statut: 'Église principale',
    description: "L'église Saint-Martin est le centre de l'unité pastorale. Édifice néo-gothique du XIXe siècle, elle abrite la plus grande capacité d'accueil et la majorité des célébrations.",
    histoire: "Construite entre 1865 et 1878, l'église Saint-Martin se distingue par ses vitraux du XIXe siècle représentant la vie du Christ et ses saints. Son clocher de 45 mètres domine le village depuis plus de 150 ans.",
    adresse: 'Rue Saint-Martin 12, Ville',
    ouverture: 'Lun–Sam : 8h00–18h00 | Dim : 7h30–12h30',
    telephone: '+1 (0)xxx xx xx xx',
    image: ChristroiImg,
    particularites: ['Grande capacité : 400 places', 'Orgue à tuyaux (1924)', 'Vitraux classés XIXe', 'Accessible PMR'],
  },
  {
    nom: 'Paroisse Notre-Dame de l\'Assomption',
    statut: 'Église paroissiale',
    description: "L'église Notre-Dame, dédiée à la Vierge Marie, est un joyau roman situé au cœur du village. Sa sobriété et sa beauté intérieure en font un lieu de prière apprécié.",
    histoire: "Bâtie au XIIe siècle sur les fondations d'une première chapelle, Notre-Dame a été restaurée au XVIIe siècle. Elle possède une vierge en chêne polychrome du XVe siècle, trésor de la paroisse.",
    adresse: "Place de l'Église 3, Ville",
    ouverture: 'Tlj : 8h00–17h00',
    telephone: '+1 (0)xxx xx xx xx',
    image: AssomptionImg,
    particularites: ['Architecture romane XIIe', 'Vierge en chêne XVe', '200 places assises', 'Crypte ouverte sur demande'],
  },
  {
    nom: 'Paroisse Notre-Dame-de-Grâce',
    statut: 'Chapelle de hameau',
    description: "Nichée entre les prairies, la chapelle Saint-Nicolas est le symbole de la foi rurale profonde de notre région. Son intimité en fait un lieu de prière privilégié.",
    histoire: "Édifiée au XVIIIe siècle par la communauté villageoise, la chapelle Saint-Nicolas a traversé les siècles en conservant son caractère simple et authentique. Elle fut entièrement restaurée en 2008 grâce à une collecte paroissiale.",
    adresse: 'Chemin des Érables 7, Village',
    ouverture: 'Dim matin (en période de messe)',
    telephone: '+1 (0)xxx xx xx xx',
    image: NotreDamedeGraceImg,
    particularites: ['Architecture rurale XVIIIe', '80 places assises', 'Cadre naturel exceptionnel', 'Restaurée en 2008'],
  },
];

export default function Eglises() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Page header */}
      <div
        className="relative pt-40 pb-20 px-4 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(28,25,23,0.72), rgba(28,25,23,0.72)), url(${CoverImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
        }}
      >
        <p className="text-amber-400 text-xs uppercase tracking-widest font-inter font-medium mb-3">Patrimoine</p>
        <h1 className="font-playfair text-4xl sm:text-5xl text-white">Nos Églises</h1>
        <p className="mt-4 text-stone-300 font-inter font-light max-w-lg mx-auto">
          Trois lieux de culte, trois histoires, une seule communauté de foi.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="space-y-16">
          {eglises.map((e, i) => (
            <div
              key={i}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 items-start`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={e.image}
                  alt={e.nom}
                  className="w-full h-72 lg:h-96 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <span className="inline-block text-xs font-inter font-medium text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                  {e.statut}
                </span>
                <h2 className="font-playfair text-3xl text-stone-900 mb-3">{e.nom}</h2>
                <p className="text-stone-600 font-inter leading-relaxed mb-4">{e.description}</p>
                <p className="text-stone-500 text-sm font-inter leading-relaxed mb-6">{e.histoire}</p>

                {/* Particularités */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {e.particularites.map((p) => (
                    <span key={p} className="text-xs font-inter text-stone-600 bg-stone-100 px-3 py-1.5 rounded-full">
                      {p}
                    </span>
                  ))}
                </div>

                {/* Infos pratiques */}
                <div className="bg-white rounded-xl border border-stone-100 p-5 space-y-3">
                  <div className="flex items-start gap-3 text-sm font-inter text-stone-600">
                    <MapPin size={15} className="text-amber-500 mt-0.5 shrink-0" />
                    {e.adresse}
                  </div>
                  <div className="flex items-start gap-3 text-sm font-inter text-stone-600">
                    <Clock size={15} className="text-amber-500 mt-0.5 shrink-0" />
                    {e.ouverture}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-inter text-stone-600">
                    <Phone size={15} className="text-amber-500 shrink-0" />
                    {e.telephone}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
