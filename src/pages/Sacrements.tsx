import { ArrowRight, Phone, Mail } from 'lucide-react';

const sacrements = [
  {
    nom: 'Baptême',
    icone: '💧',
    image: 'https://images.pexels.com/photos/3951628/pexels-photo-3951628.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Le baptême est la porte d\'entrée dans la vie chrétienne et dans la communauté de l\'Église. Il peut être célébré pour les enfants comme pour les adultes.',
    demarches: [
      'Contacter le secrétariat paroissial au moins 3 mois à l\'avance.',
      'Participer à une rencontre de préparation pour les parents et parrains.',
      'Le baptême est généralement célébré le dimanche après la messe ou lors d\'une célébration communautaire.',
    ],
  },
  {
    nom: 'Eucharistie (1ère communion)',
    icone: '✝️',
    image: 'https://images.pexels.com/photos/267559/pexels-photo-267559.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'La première communion marque une étape importante dans le parcours de foi d\'un enfant. Elle est préparée sur plusieurs années à travers la catéchèse.',
    demarches: [
      'S\'inscrire à la catéchèse dès la 3e primaire.',
      'Suivre le parcours de préparation sur deux ans (5e-6e primaire).',
      'La célébration a lieu généralement au mois de mai.',
    ],
  },
  {
    nom: 'Confirmation',
    icone: '🕊️',
    image: 'https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'La confirmation achève les sacrements d\'initiation chrétienne. Elle renforce la grâce du baptême et fortifie le confirmé par les dons de l\'Esprit Saint.',
    demarches: [
      'Suivre le parcours de préparation proposé pour les jeunes (secondaire).',
      'S\'engager dans un groupe ou un mouvement de la paroisse.',
      'La confirmation est célébrée par l\'évêque lors d\'une liturgie diocésaine.',
    ],
  },
  {
    nom: 'Mariage',
    icone: '💍',
    image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Le sacrement du mariage est une alliance d\'amour entre un homme et une femme, signe de l\'amour du Christ pour son Église. La préparation est essentielle.',
    demarches: [
      'Prendre contact avec le curé au moins 6 mois à l\'avance.',
      'Participer au parcours de préparation au mariage (soirées ou week-end).',
      'Fixer la date et préparer la célébration liturgique avec le prêtre.',
    ],
  },
  {
    nom: 'Réconciliation (Confession)',
    icone: '🙏',
    image: 'https://images.pexels.com/photos/208216/pexels-photo-208216.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Le sacrement de réconciliation est un retour à la tendresse du Père, un pardon offert à chacun qui le demande avec sincérité.',
    demarches: [
      'Les confessions individuelles sont disponibles aux horaires affichés dans chaque église.',
      'Des temps de réconciliation communautaire sont proposés en Avent et en Carême.',
      'Un rendez-vous peut être pris avec le curé ou un prêtre de l\'unité pastorale.',
    ],
  },
  {
    nom: 'Onction des malades',
    icone: '🕯️',
    image: 'https://images.pexels.com/photos/1028725/pexels-photo-1028725.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Ce sacrement apporte réconfort, paix et courage à ceux qui sont éprouvés par la maladie ou la vieillesse. Il peut être administré à domicile ou en institution.',
    demarches: [
      'Contacter le secrétariat ou directement un prêtre en cas d\'urgence.',
      'Une célébration communautaire de l\'onction des malades est organisée une fois par an.',
      'Le prêtre peut se déplacer à domicile ou en maison de repos.',
    ],
  },
];

export default function Sacrements() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Page header */}
      <div
        className="relative pt-40 pb-20 px-4 text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(28,25,23,0.72), rgba(28,25,23,0.72)), url('https://images.pexels.com/photos/256150/pexels-photo-256150.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <p className="text-amber-400 text-xs uppercase tracking-widest font-inter font-medium mb-3">Foi & liturgie</p>
        <h1 className="font-playfair text-4xl sm:text-5xl text-white">Les Sacrements</h1>
        <p className="mt-4 text-stone-300 font-inter font-light max-w-lg mx-auto">
          Les sept sacrements, signes efficaces de la grâce de Dieu, au cœur de la vie de l'Église.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sacrements.map((s, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="relative h-40 overflow-hidden">
                <img src={s.image} alt={s.nom} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-5 flex items-center gap-3">
                  <span className="text-2xl">{s.icone}</span>
                  <h2 className="font-playfair text-xl text-white">{s.nom}</h2>
                </div>
              </div>

              <div className="p-6">
                <p className="text-stone-600 text-sm font-inter leading-relaxed mb-5">{s.description}</p>

                <h3 className="text-xs font-inter font-semibold text-stone-500 uppercase tracking-wider mb-3">
                  Démarches
                </h3>
                <ul className="space-y-2">
                  {s.demarches.map((d, j) => (
                    <li key={j} className="flex items-start gap-2 text-stone-600 text-sm font-inter">
                      <ArrowRight size={13} className="text-amber-500 mt-0.5 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-14 bg-stone-900 rounded-2xl p-8 text-white text-center">
          <h3 className="font-playfair text-2xl mb-2">Une question sur un sacrement?</h3>
          <p className="text-stone-400 font-inter text-sm mb-6 max-w-lg mx-auto">
            N'hésitez pas à contacter le secrétariat paroissial ou directement le curé.
            Nous sommes là pour vous accompagner dans votre démarche.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="tel:+32xxxxx" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-lg text-sm font-inter transition-colors">
              <Phone size={15} className="text-amber-400" />
              +32 (0)xxx xx xx xx
            </a>
            <a href="mailto:info@unitejeanpaul2.com" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-lg text-sm font-inter transition-colors">
              <Mail size={15} className="text-amber-400" />
              info@unitejeanpaul2.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
