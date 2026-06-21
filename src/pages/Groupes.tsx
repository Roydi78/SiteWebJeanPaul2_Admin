import { Users, ArrowRight, Mail } from 'lucide-react';
import CoverImg from '../assets/pexels-photo-1181435.jpg';


const groupes = [
  {
    categorie: 'Jeunesse',
    couleur: 'bg-sky-50 border-sky-200',
    badge: 'text-sky-700 bg-sky-100',
    items: [
      {
        nom: 'Aumônerie des jeunes',
        cible: 'Secondaire 1–6',
        description: 'Rencontres, activités et week-ends pour découvrir et approfondir la foi dans la joie et la fraternité.',
        contact: 'aumônerie@unitejeanpaul2.com',
        reunions: 'Vendredi soir — 19h30',
      },
      {
        nom: 'Servants de messe',
        cible: 'Enfants dès 9 ans',
        description: 'Initiation au service liturgique. Les servants participent aux célébrations dominicales et aux grandes fêtes.',
        contact: 'servants@unitejeanpaul2.com',
        reunions: 'Dimanche après la messe',
      },
    ],
  },
  {
    categorie: 'Familles & Adultes',
    couleur: 'bg-amber-50 border-amber-200',
    badge: 'text-amber-700 bg-amber-100',
    items: [
      {
        nom: 'Fraternité Évangile & Vie',
        cible: 'Adultes',
        description: 'Groupe de partage d\'Évangile et de prière pour adultes. Rencontres mensuelles autour de la Parole de Dieu.',
        contact: 'fraternite@unitejeanpaul2.com',
        reunions: 'Deuxième mercredi du mois — 19h30',
      },
      {
        nom: 'Préparation au mariage',
        cible: 'Futurs mariés',
        description: 'Parcours d\'accompagnement des couples qui se préparent au sacrement du mariage.',
        contact: 'mariage@unitejeanpaul2.com',
        reunions: 'Week-end annuel + soirées ponctuelles',
      },
      {
        nom: 'Groupe Carême & Avent',
        cible: 'Tous',
        description: 'Temps de partage et de ressourcement spirituel proposés pendant les grandes périodes liturgiques.',
        contact: 'info@unitejeanpaul2.com',
        reunions: 'Carême et Avent — programme annuel',
      },
    ],
  },
  {
    categorie: 'Prière & Spiritualité',
    couleur: 'bg-emerald-50 border-emerald-200',
    badge: 'text-emerald-700 bg-emerald-100',
    items: [
      {
        nom: 'Lectio Divina',
        cible: 'Adultes',
        description: 'Lecteur et méditation priante de l\'Écriture Sainte. Chaque session approfondit un texte biblique par la prière et le silence.',
        contact: 'lectio@unitejeanpaul2.com',
        reunions: 'Vendredi soir — 19h30',
      },
      {
        nom: 'Adoration eucharistique',
        cible: 'Tous',
        description: 'Temps de silence et d\'adoration devant le Saint Sacrement, dans chaque église de l\'unité pastorale.',
        contact: 'info@unitejeanpaul2.com',
        reunions: 'Voir horaires par église',
      },
      {
        nom: 'Rosaire du mardi',
        cible: 'Tous',
        description: 'Récitation communautaire du chapelet chaque mardi après la messe de 8h, à l\'église Saint-Martin.',
        contact: 'info@unitejeanpaul2.com',
        reunions: 'Mardi — 08h30',
      },
    ],
  },
  {
    categorie: 'Service & Solidarité',
    couleur: 'bg-rose-50 border-rose-200',
    badge: 'text-rose-700 bg-rose-100',
    items: [
      {
        nom: 'Équipe Saint-Vincent-de-Paul',
        cible: 'Adultes',
        description: 'Visite et soutien aux personnes isolées, malades ou dans le besoin. Collectes alimentaires et vestimentaires.',
        contact: 'vincent@unitejeanpaul2.com',
        reunions: 'Premier lundi du mois — 18h00',
      },
      {
        nom: 'Bénévoles liturgiques',
        cible: 'Tous adultes',
        description: 'Accueil, lecture, communion eucharistique, fleurs, chorale... Rejoignez l\'équipe qui anime nos célébrations.',
        contact: 'liturgie@unitejeanpaul2.com',
        reunions: 'Selon mission choisie',
      },
    ],
  },
];

export default function Groupes() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Page header */}
      <div
        className="relative pt-40 pb-20 px-4 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(28,25,23,0.72), rgba(28,25,23,0.72)), url(${CoverImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <p className="text-amber-400 text-xs uppercase tracking-widest font-inter font-medium mb-3">Communauté</p>
        <h1 className="font-playfair text-4xl sm:text-5xl text-white">Groupes & Mouvements</h1>
        <p className="mt-4 text-stone-300 font-inter font-light max-w-xl mx-auto">
          Notre communauté s'organise en groupes variés pour prier, servir et grandir ensemble dans la foi.
          Chacun y trouvera une place.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="space-y-14">
          {groupes.map((cat) => (
            <div key={cat.categorie}>
              <div className="flex items-center gap-4 mb-7">
                <div className="inline-flex items-center gap-2">
                  <Users size={18} className="text-amber-600" />
                  <h2 className="font-playfair text-2xl text-stone-900">{cat.categorie}</h2>
                </div>
                <div className="flex-1 h-px bg-stone-200" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((g, i) => (
                  <div
                    key={i}
                    className={`group border rounded-xl p-6 hover:shadow-md transition-all duration-300 ${cat.couleur}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-playfair text-xl text-stone-900 leading-snug">{g.nom}</h3>
                      <span className={`shrink-0 ml-2 text-xs font-inter font-medium px-2.5 py-1 rounded-full ${cat.badge}`}>
                        {g.cible}
                      </span>
                    </div>

                    <p className="text-stone-600 text-sm font-inter leading-relaxed mb-5">{g.description}</p>

                    <div className="space-y-2 text-sm font-inter">
                      <div className="flex items-center gap-2 text-stone-500">
                        <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">Réunions</span>
                        <span>{g.reunions}</span>
                      </div>
                      <a
                        href={`mailto:${g.contact}`}
                        className="inline-flex items-center gap-1.5 text-amber-700 hover:text-amber-800 transition-colors"
                      >
                        <Mail size={12} />
                        {g.contact}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 bg-stone-900 rounded-2xl p-10 text-center text-white">
          <h3 className="font-playfair text-2xl mb-3">Vous souhaitez vous engager?</h3>
          <p className="text-stone-400 font-inter text-sm max-w-lg mx-auto mb-7">
            Chaque don reçu est un appel au service. Parlez-en avec notre curé ou contactez le secrétariat
            pour découvrir comment vous pourriez contribuer à la vie de notre communauté.
          </p>
          <a
            href="mailto:info@unitejeanpaul2.com"
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-6 py-3 rounded-lg text-sm font-inter font-medium transition-colors"
          >
            Nous contacter <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
