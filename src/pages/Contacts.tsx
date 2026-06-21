import { MapPin, Phone, Mail, Clock, User } from 'lucide-react';
import CoverImg from '../assets/pexels-mart-production-7218369.jpg';

const equipe = [
  {
    nom: 'Père Jean-Baptiste Renard',
    role: 'Curé de l\'unité pastorale',
    image: 'https://images.pexels.com/photos/5397723/pexels-photo-5397723.jpeg?auto=compress&cs=tinysrgb&w=400',
    email: 'cure@unitejeanpaul2.com',
    telephone: '+32 (0)xxx xx xx xx',
  },
  {
    nom: 'Père Michel Dumont',
    role: 'Prêtre coopérateur',
    image: 'https://images.pexels.com/photos/5397735/pexels-photo-5397735.jpeg?auto=compress&cs=tinysrgb&w=400',
    email: 'p.dumont@unitejeanpaul2.com',
    telephone: '+32 (0)xxx xx xx xx',
  },
  {
    nom: 'Sœur Anne-Marie',
    role: 'Animatrice en pastorale',
    image: 'https://images.pexels.com/photos/5397715/pexels-photo-5397715.jpeg?auto=compress&cs=tinysrgb&w=400',
    email: 'pastorale@unitejeanpaul2.com',
    telephone: '+32 (0)xxx xx xx xx',
  },
  {
    nom: 'Marie Fontaine',
    role: 'Secrétaire paroissiale',
    image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400',
    email: 'secretariat@unitejeanpaul2.com',
    telephone: '+32 (0)xxx xx xx xx',
  },
];

export default function Contacts() {
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
        <p className="text-amber-400 text-xs uppercase tracking-widest font-inter font-medium mb-3">Nous rejoindre</p>
        <h1 className="font-playfair text-4xl sm:text-5xl text-white">Contact</h1>
        <p className="mt-4 text-stone-300 font-inter font-light max-w-lg mx-auto">
          Notre équipe pastorale est à votre écoute pour toute demande ou information.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* Équipe pastorale */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <User size={18} className="text-amber-600" />
            <h2 className="font-playfair text-2xl text-stone-900">Notre équipe pastorale</h2>
          </div>
          <p className="text-stone-500 font-inter text-sm mb-8 ml-7">
            N'hésitez pas à contacter directement la personne concernée selon votre besoin.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipe.map((p, i) => (
              <div key={i} className="bg-white rounded-xl border border-stone-100 overflow-hidden hover:shadow-lg transition-all duration-300 text-center">
                <div className="relative h-48 overflow-hidden">
                  <img src={p.image} alt={p.nom} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-playfair text-lg text-stone-900 mb-1">{p.nom}</h3>
                  <p className="text-amber-600 text-xs font-inter font-medium uppercase tracking-wider mb-4">{p.role}</p>
                  <div className="space-y-2">
                    <a
                      href={`tel:${p.telephone.replace(/\s/g, '')}`}
                      className="flex items-center justify-center gap-2 text-stone-500 hover:text-amber-600 text-sm font-inter transition-colors"
                    >
                      <Phone size={13} />
                      {p.telephone}
                    </a>
                    <a
                      href={`mailto:${p.email}`}
                      className="flex items-center justify-center gap-2 text-stone-500 hover:text-amber-600 text-sm font-inter transition-colors truncate"
                    >
                      <Mail size={13} />
                      {p.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Secrétariat & Formulaire */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Infos secrétariat */}
          <div>
            <h2 className="font-playfair text-2xl text-stone-900 mb-6">Secrétariat paroissial</h2>
            <div className="bg-white rounded-xl border border-stone-100 p-7 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-inter font-semibold text-stone-400 uppercase tracking-wider mb-1">Adresse</p>
                  <p className="text-stone-700 font-inter">Rue de l'Église 1<br />Ville, Belgique</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-inter font-semibold text-stone-400 uppercase tracking-wider mb-1">Heures d'ouverture</p>
                  <div className="text-stone-700 font-inter text-sm space-y-1">
                    <p>Lundi, mercredi, vendredi : 09h00 – 12h00</p>
                    <p>Mardi et jeudi : 14h00 – 17h00</p>
                    <p className="text-stone-400">Samedi et dimanche : fermé</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-inter font-semibold text-stone-400 uppercase tracking-wider mb-1">Téléphone</p>
                  <a href="tel:+32xxxxx" className="text-stone-700 font-inter hover:text-amber-600 transition-colors">
                    +32 (0)xxx xx xx xx
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-inter font-semibold text-stone-400 uppercase tracking-wider mb-1">Email</p>
                  <a
                    href="mailto:info@unitejeanpaul2.com"
                    className="text-stone-700 font-inter hover:text-amber-600 transition-colors"
                  >
                    info@unitejeanpaul2.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div>
            <h2 className="font-playfair text-2xl text-stone-900 mb-6">Envoyer un message</h2>
            <form className="bg-white rounded-xl border border-stone-100 p-7 space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-inter font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Prénom</label>
                  <input
                    type="text"
                    className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label className="block text-xs font-inter font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Nom</label>
                  <input
                    type="text"
                    className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-inter font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Email</label>
                <input
                  type="email"
                  className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-xs font-inter font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Objet</label>
                <select className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition text-stone-700">
                  <option value="">Choisir un objet</option>
                  <option>Demande de baptême</option>
                  <option>Mariage</option>
                  <option>Catéchèse</option>
                  <option>Information générale</option>
                  <option>Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-inter font-semibold text-stone-500 uppercase tracking-wider mb-1.5">Message</label>
                <textarea
                  rows={5}
                  className="w-full border border-stone-200 rounded-lg px-4 py-2.5 text-sm font-inter focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-500 text-white py-3 rounded-lg text-sm font-inter font-medium transition-colors shadow-sm hover:shadow-md"
              >
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
