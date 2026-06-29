import type { SiteContent } from '../types';
import { mergeContent } from './merge';

const r = (
  name: string, category: string, short: string, desc: string, view: string, amenities: string[]
) => ({ name, category, shortDescription: short, description: desc, view, amenities });

const roomsFr = {
  'suite-capitao': r('Suite Capitaine', 'Suite', 'Suite exclusive avec vue mer et terrasse privée.', 'Notre suite la plus exclusive avec vue panoramique sur l\'océan Indien. Élégance coloniale et confort contemporain. Terrasse privée, lit king-size et baignoire balnéo.', 'Vue Mer', ['Wi-Fi', 'Climatisation', 'Mini-bar', 'Coffre', 'Terrasse privée', 'Baignoire', 'Room service']),
  'quarto-vista-mar': r('Chambre Vue Mer', 'Premium', 'Balcon avec vue imprenable sur la mer.', 'Chambre spacieuse avec balcon sur l\'océan Indien. Décoration inspirée des navigateurs portugais. Lit queen-size et salle de bain en marbre.', 'Vue Mer', ['Wi-Fi', 'Climatisation', 'Mini-bar', 'Coffre', 'Balcon']),
  'quarto-jardim': r('Chambre Jardin', 'Standard', 'Vue sur le jardin tropical de l\'hôtel.', 'Chambre chaleureuse avec vue sur notre jardin tropical. Atmosphère sereine après une journée à Tofo ou dans la baie d\'Inhambane.', 'Vue Jardin', ['Wi-Fi', 'Climatisation', 'Coffre', 'Bouilloire']),
  'quarto-familiar': r('Chambre Familiale', 'Famille', 'Idéale pour les familles, accès piscine.', 'Espace généreux avec deux lits et coin salon, parfait pour les familles. Rez-de-chaussée avec accès direct à la piscine et au restaurant.', 'Vue Piscine', ['Wi-Fi', 'Climatisation', 'Mini-bar', 'Coffre', 'Deux lits', 'Coin salon']),
  'quarto-economico': r('Chambre Économique', 'Économique', 'Confort essentiel à prix accessible.', 'Option confortable et abordable pour les voyageurs soucieux de leur budget.', 'Vue Intérieure', ['Wi-Fi', 'Climatisation', 'Coffre']),
  'quarto-historico': r('Chambre Historique', 'Premium', 'Patrimoine historique, confort moderne.', 'Hommage à la riche histoire maritime d\'Inhambane. Mobilier d\'époque restauré, bois noble et azulejos originaux.', 'Vue Ville', ['Wi-Fi', 'Climatisation', 'Mini-bar', 'Coffre', 'Décor historique']),
};

const pagesFr = {
  quartos: { title: 'Chambres', intro: 'Chaque chambre raconte une histoire. De la Suite Capitaine à la Chambre Historique, trouvez votre refuge à Inhambane.' },
  contacto: { title: 'Contact', addressLabel: 'Adresse', emailLabel: 'Email', phoneLabel: 'Téléphone', whatsapp: 'WhatsApp', sendMessage: 'Envoyer le message', name: 'Nom', email: 'Email', subject: 'Objet', message: 'Message', namePlaceholder: 'Votre nom', subjectPlaceholder: 'Objet du message', messagePlaceholder: 'Votre message...' },
  oHotel: { title: 'L\'Hôtel', intro: 'Sur la baie où les dhows ancestraux traversent encore l\'horizon, Casa do Capitão est un refuge qui laisse parler la mer.', historyTitle: 'Notre Histoire', galleryCta: 'Voir la Galerie', sections: [{ title: 'Un Héritage Maritime', text: 'Casa do Capitão est née de la riche histoire maritime d\'Inhambane.' }, { title: 'Architecture et Âme', text: 'Chaque détail honore la mémoire de cette terre : azulejos originaux et poutres de dhows.' }, { title: 'Le Jardin Tropical', text: 'Notre jardin est une oasis de palmiers, fleurs tropicales et bruit lointain des vagues.' }], timeline: [{ year: '1534', event: 'Les navigateurs portugais arrivent à Inhambane' }, { year: '1854', event: 'Construction de la résidence devenue hôtel' }, { year: '2018', event: 'Restauration et ouverture de Casa do Capitão' }, { year: '2024', event: 'Extension du Rooftop Bar et nouvelles suites' }] },
  rooftop: { title: 'Rooftop Bar', tagline: 'Là où l\'horizon rencontre le verre', intro: 'Cocktails au coucher du soleil avec vue panoramique sur la baie d\'Inhambane.', cta: 'Réserver une table' },
  galeria: { title: 'Galerie', intro: 'Moments capturés à Casa do Capitão et dans la belle baie d\'Inhambane.' },
  ofertas: { title: 'Offres', intro: 'Forfaits spéciaux pour rendre votre séjour encore plus mémorable.' },
  servicos: { title: 'Services', intro: 'Tout ce dont vous avez besoin pour un séjour confortable et inoubliable.' },
  restaurante: { title: 'Restaurant', intro: 'Saveurs du Mozambique face à l\'océan Indien.' },
  sobreNos: { title: 'À Propos', intro: 'Notre mission est de partager l\'hospitalité mozambicaine avec le monde.' },
  blog: { title: 'Blog', intro: 'Histoires, destinations et inspiration pour votre voyage à Inhambane.' },
  faqs: { title: 'Questions Fréquentes', intro: 'Réponses aux questions les plus courantes de nos hôtes.' },
  reservar: { title: 'Réserver', intro: 'Réservez votre séjour à Casa do Capitão.' },
  cancelarReserva: { title: 'Annuler la Réservation', intro: 'Entrez les détails de votre réservation pour demander l\'annulation.' },
  pesquisa: { title: 'Recherche', intro: 'Résultats de votre recherche sur le site.' },
};

export const FR_CONTENT: SiteContent = mergeContent({
  amenities: {
    rooftop: { label: 'Rooftop Bar', description: 'Cocktails au coucher du soleil avec vue panoramique sur la baie d\'Inhambane.' },
    lobby: { label: 'Lobby Bar', description: 'Ambiance chaleureuse avec vins sélectionnés et amuse-bouches.' },
    gym: { label: 'Gymnase', description: 'Équipement moderne avec vue sur le jardin tropical.' },
  },
  rooms: roomsFr,
  offers: {
    'escapada-maritima': { title: 'Escapade Maritime', description: 'Trois nuits avec petit-déjeuner et croisière en dhow traditionnel. -20% au restaurant.', badge: '-20%' },
    'romance-capitao': { title: 'Romance du Capitaine', description: 'Forfait romantique : dîner aux chandelles, bouteille de vin et late check-out gratuit.', badge: 'Couples' },
    'verao-inhambane': { title: 'Été à Inhambane', description: '4 nuits au prix de 3. Transfert aéroport et accès piscine et gym inclus.', badge: '4=3' },
    'aventura-tofo': { title: 'Aventure Tofo', description: 'Hôtel + plongée avec requins-baleines à Tofo. Transport, équipement et guide inclus.', badge: 'Aventure' },
  },
  pages: pagesFr,
  labels: { area: 'Surface', view: 'Vue', capacity: 'Capacité', price: 'Prix', perNight: '/ nuit', amenities: 'Équipements', people: 'personnes', unavailable: 'Indisponible', otherRooms: 'Autres chambres', freeCancel: 'Annulation gratuite jusqu\'à 48h avant', validUntil: 'Valable jusqu\'au' },
  footer: { hotel: 'Hôtel', bookings: 'Réservations', info: 'Information', whatsapp: 'WhatsApp', rooms: 'Chambres', theHotel: 'L\'Hôtel', rooftop: 'Rooftop', gallery: 'Galerie', services: 'Services', book: 'Réserver', offers: 'Offres', restaurant: 'Restaurant', contact: 'Contact', blog: 'Blog', about: 'À Propos', faqs: 'FAQs', legal: 'Mentions Légales' },
  popup: { title: 'Escapade Maritime', description: 'Trois nuits avec petit-déjeuner et 20% de réduction. Réservez avant le 31 août.', cta: 'Voir l\'Offre' },
});

export const DE_CONTENT: SiteContent = mergeContent({
  amenities: {
    rooftop: { label: 'Rooftop Bar', description: 'Cocktails bei Sonnenuntergang mit Panoramablick auf die Bucht von Inhambane.' },
    lobby: { label: 'Lobby Bar', description: 'Gemütliche Atmosphäre mit ausgewählten Weinen und Haus-Snacks.' },
    gym: { label: 'Fitnessstudio', description: 'Moderne Ausstattung mit Blick auf den tropischen Garten.' },
  },
  rooms: {
    'suite-capitao': r('Kapitäns-Suite', 'Suite', 'Exklusive Suite mit Meerblick und privater Terrasse.', 'Unsere exklusivste Suite mit Panoramablick auf den Indischen Ozean. Koloniale Eleganz und moderner Komfort. Private Terrasse, Kingsize-Bett und Whirlpool.', 'Meerblick', ['Wi-Fi', 'Klimaanlage', 'Minibar', 'Safe', 'Private Terrasse', 'Badewanne', 'Zimmerservice']),
    'quarto-vista-mar': r('Meerblick-Zimmer', 'Premium', 'Balkon mit atemberaubendem Meerblick.', 'Geräumiges Zimmer mit Balkon zum Indischen Ozean. Dekoration inspiriert von portugiesischen Seefahrern.', 'Meerblick', ['Wi-Fi', 'Klimaanlage', 'Minibar', 'Safe', 'Balkon']),
    'quarto-jardim': r('Gartenzimmer', 'Standard', 'Blick auf den tropischen Hotelgarten.', 'Gemütliches Zimmer mit Blick auf unseren tropischen Garten. Ideal nach einem Tag am Strand von Tofo.', 'Gartenblick', ['Wi-Fi', 'Klimaanlage', 'Safe', 'Wasserkocher']),
    'quarto-familiar': r('Familienzimmer', 'Familie', 'Ideal für Familien mit Poolzugang.', 'Großzügiger Raum mit zwei Betten und Sitzbereich. Erdgeschoss mit direktem Zugang zum Pool und Restaurant.', 'Poolblick', ['Wi-Fi', 'Klimaanlage', 'Minibar', 'Safe', 'Zwei Betten', 'Sitzbereich']),
    'quarto-economico': r('Economy-Zimmer', 'Economy', 'Wesentlicher Komfort zu einem fairen Preis.', 'Komfortable und erschwingliche Option für preisbewusste Reisende.', 'Innenblick', ['Wi-Fi', 'Klimaanlage', 'Safe']),
    'quarto-historico': r('Historisches Zimmer', 'Premium', 'Historisches Erbe mit modernem Komfort.', 'Eine Hommage an die maritime Geschichte von Inhambane. Restaurierte Möbel und originale Fliesen.', 'Stadtblick', ['Wi-Fi', 'Klimaanlage', 'Minibar', 'Safe', 'Historische Einrichtung']),
  },
  offers: {
    'escapada-maritima': { title: 'Maritime Auszeit', description: 'Drei Nächte mit Frühstück und traditioneller Dhow-Tour. 20% Rabatt im Restaurant.', badge: '-20%' },
    'romance-capitao': { title: 'Romantik des Kapitäns', description: 'Romantikpaket: Candlelight-Dinner, Wein und kostenloser Late Check-out.', badge: 'Paare' },
    'verao-inhambane': { title: 'Sommer in Inhambane', description: '4 Nächte zum Preis von 3. Flughafentransfer und Pool- und Fitnesszugang inklusive.', badge: '4=3' },
    'aventura-tofo': { title: 'Tofo-Abenteuer', description: 'Hotel + Walhai-Tauchen in Tofo. Transport, Ausrüstung und Guide inklusive.', badge: 'Abenteuer' },
  },
  pages: {
    quartos: { title: 'Zimmer', intro: 'Jedes Zimmer erzählt eine Geschichte. Von der Kapitäns-Suite bis zum Historischen Zimmer – finden Sie Ihr Refugium in Inhambane.' },
    contacto: { title: 'Kontakt', addressLabel: 'Adresse', emailLabel: 'E-Mail', phoneLabel: 'Telefon', whatsapp: 'WhatsApp', sendMessage: 'Nachricht senden', name: 'Name', email: 'E-Mail', subject: 'Betreff', message: 'Nachricht', namePlaceholder: 'Ihr Name', subjectPlaceholder: 'Betreff der Nachricht', messagePlaceholder: 'Ihre Nachricht...' },
    oHotel: { title: 'Das Hotel', intro: 'An der Bucht, wo noch immer Dhows den Horizont überqueren, ist Casa do Capitão ein Refugium, das das Meer sprechen lässt.', historyTitle: 'Unsere Geschichte', galleryCta: 'Galerie ansehen', sections: [{ title: 'Ein maritimes Erbe', text: 'Casa do Capitão entstand aus der reichen Seefahrtsgeschichte von Inhambane.' }, { title: 'Architektur und Seele', text: 'Jedes Detail ehrt die Erinnerung an dieses Land: originale Fliesen und Dhow-Holzbalken.' }, { title: 'Der tropische Garten', text: 'Unser Garten ist eine Oase aus Palmen, tropischen Blumen und dem fernen Rauschen der Wellen.' }], timeline: [{ year: '1534', event: 'Portugiesische Seefahrer erreichen Inhambane' }, { year: '1854', event: 'Bau des Gebäudes, das heute das Hotel beherbergt' }, { year: '2018', event: 'Restaurierung und Eröffnung der Casa do Capitão' }, { year: '2024', event: 'Erweiterung der Rooftop Bar und neuer Suiten' }] },
    rooftop: { title: 'Rooftop Bar', tagline: 'Wo der Horizont das Glas trifft', intro: 'Cocktails bei Sonnenuntergang mit Panoramablick auf die Bucht.', cta: 'Tisch reservieren' },
    galeria: { title: 'Galerie', intro: 'Momente bei Casa do Capitão und in der schönen Bucht von Inhambane.' },
    ofertas: { title: 'Angebote', intro: 'Spezielle Pakete für einen noch unvergesslicheren Aufenthalt.' },
    servicos: { title: 'Dienstleistungen', intro: 'Alles für einen komfortablen und unvergesslichen Aufenthalt.' },
    restaurante: { title: 'Restaurant', intro: 'Aromen Mosambiks mit Blick auf den Indischen Ozean.' },
    sobreNos: { title: 'Über Uns', intro: 'Unsere Mission ist es, mosambikanische Gastfreundschaft mit der Welt zu teilen.' },
    blog: { title: 'Blog', intro: 'Geschichten, Reiseziele und Inspiration für Ihre Reise nach Inhambane.' },
    faqs: { title: 'Häufige Fragen', intro: 'Antworten auf die häufigsten Fragen unserer Gäste.' },
    reservar: { title: 'Buchen', intro: 'Sichern Sie Ihren Aufenthalt in der Casa do Capitão.' },
    cancelarReserva: { title: 'Buchung stornieren', intro: 'Geben Sie Ihre Buchungsdaten ein, um eine Stornierung anzufragen.' },
    pesquisa: { title: 'Suche', intro: 'Ergebnisse Ihrer Suche auf der Website.' },
  },
  labels: { area: 'Fläche', view: 'Aussicht', capacity: 'Kapazität', price: 'Preis', perNight: '/ Nacht', amenities: 'Ausstattung', people: 'Personen', unavailable: 'Nicht verfügbar', otherRooms: 'Weitere Zimmer', freeCancel: 'Kostenlose Stornierung bis 48h vorher', validUntil: 'Gültig bis' },
  footer: { hotel: 'Hotel', bookings: 'Buchungen', info: 'Information', whatsapp: 'WhatsApp', rooms: 'Zimmer', theHotel: 'Das Hotel', rooftop: 'Rooftop', gallery: 'Galerie', services: 'Dienstleistungen', book: 'Buchen', offers: 'Angebote', restaurant: 'Restaurant', contact: 'Kontakt', blog: 'Blog', about: 'Über Uns', faqs: 'FAQs', legal: 'Impressum' },
  popup: { title: 'Maritime Auszeit', description: 'Drei Nächte mit Frühstück und 20% Rabatt. Buchen bis 31. August.', cta: 'Angebot ansehen' },
});

export const IT_CONTENT: SiteContent = mergeContent({
  amenities: {
    rooftop: { label: 'Rooftop Bar', description: 'Cocktail al tramonto con vista panoramica sulla baia di Inhambane.' },
    lobby: { label: 'Lobby Bar', description: 'Atmosfera accogliente con vini selezionati e stuzzichini della casa.' },
    gym: { label: 'Palestra', description: 'Attrezzature moderne con vista sul giardino tropicale.' },
  },
  rooms: {
    'suite-capitao': r('Suite Capitano', 'Suite', 'Suite esclusiva con vista mare e terrazza privata.', 'La nostra suite più esclusiva con vista panoramica sull\'Oceano Indiano. Eleganza coloniale e comfort contemporaneo.', 'Vista Mare', ['Wi-Fi', 'Aria condizionata', 'Minibar', 'Cassaforte', 'Terrazza privata', 'Vasca', 'Servizio in camera']),
    'quarto-vista-mar': r('Camera Vista Mare', 'Premium', 'Balcone con vista mozzafiato sul mare.', 'Camera spaziosa con balcone sull\'Oceano Indiano. Arredamento ispirato ai navigatori portoghesi.', 'Vista Mare', ['Wi-Fi', 'Aria condizionata', 'Minibar', 'Cassaforte', 'Balcone']),
    'quarto-jardim': r('Camera Giardino', 'Standard', 'Vista sul giardino tropicale dell\'hotel.', 'Camera accogliente con vista sul nostro giardino tropicale. Atmosfera serena dopo una giornata a Tofo.', 'Vista Giardino', ['Wi-Fi', 'Aria condizionata', 'Cassaforte', 'Bollitore']),
    'quarto-familiar': r('Camera Familiare', 'Famiglia', 'Ideale per famiglie, accesso piscina.', 'Ampio spazio con due letti e zona soggiorno. Piano terra con accesso diretto a piscina e ristorante.', 'Vista Piscina', ['Wi-Fi', 'Aria condizionata', 'Minibar', 'Cassaforte', 'Due letti', 'Zona soggiorno']),
    'quarto-economico': r('Camera Economy', 'Economy', 'Comfort essenziale a prezzo accessibile.', 'Opzione confortevole e conveniente per viaggiatori attenti al budget.', 'Vista Interna', ['Wi-Fi', 'Aria condizionata', 'Cassaforte']),
    'quarto-historico': r('Camera Storica', 'Premium', 'Patrimonio storico con comfort moderno.', 'Omaggio alla ricca storia marittima di Inhambane. Mobili d\'epoca restaurati e azulejos originali.', 'Vista Città', ['Wi-Fi', 'Aria condizionata', 'Minibar', 'Cassaforte', 'Arredamento storico']),
  },
  offers: {
    'escapada-maritima': { title: 'Fuga Marittima', description: 'Tre notti con colazione e giro in dhow tradizionale. Sconto del 20% al ristorante.', badge: '-20%' },
    'romance-capitao': { title: 'Romance del Capitano', description: 'Pacchetto romantico: cena a lume di candela, vino e late check-out gratuito.', badge: 'Coppie' },
    'verao-inhambane': { title: 'Estate a Inhambane', description: '4 notti al prezzo di 3. Transfer aeroporto e accesso piscina e palestra.', badge: '4=3' },
    'aventura-tofo': { title: 'Avventura Tofo', description: 'Hotel + immersioni con squali balena a Tofo. Trasporto, attrezzatura e guida inclusi.', badge: 'Avventura' },
  },
  pages: {
    quartos: { title: 'Camere', intro: 'Ogni camera racconta una storia. Dalla Suite Capitano alla Camera Storica, trova il tuo rifugio a Inhambane.' },
    contacto: { title: 'Contatti', addressLabel: 'Indirizzo', emailLabel: 'Email', phoneLabel: 'Telefono', whatsapp: 'WhatsApp', sendMessage: 'Invia messaggio', name: 'Nome', email: 'Email', subject: 'Oggetto', message: 'Messaggio', namePlaceholder: 'Il tuo nome', subjectPlaceholder: 'Oggetto del messaggio', messagePlaceholder: 'Il tuo messaggio...' },
    oHotel: { title: 'L\'Hotel', intro: 'Sulla baia dove i dhow ancestrali attraversano ancora l\'orizzonte, Casa do Capitão lascia parlare il mare.', historyTitle: 'La Nostra Storia', galleryCta: 'Vedi Galleria', sections: [{ title: 'Un Eredità Marittima', text: 'Casa do Capitão nasce dalla ricca storia marittima di Inhambane.' }, { title: 'Architettura e Anima', text: 'Ogni dettaglio onora la memoria di questa terra: azulejos originali e travi di dhow.' }, { title: 'Il Giardino Tropicale', text: 'Il nostro giardino è un\'oasi di palme, fiori tropicali e il suono lontano delle onde.' }], timeline: [{ year: '1534', event: 'I navigatori portoghesi arrivano a Inhambane' }, { year: '1854', event: 'Costruzione della residenza che oggi è l\'hotel' }, { year: '2018', event: 'Restauro e apertura di Casa do Capitão' }, { year: '2024', event: 'Espansione del Rooftop Bar e nuove suite' }] },
    rooftop: { title: 'Rooftop Bar', tagline: 'Dove l\'orizzonte incontra il bicchiere', intro: 'Cocktail al tramonto con vista panoramica sulla baia di Inhambane.', cta: 'Prenota un tavolo' },
    galeria: { title: 'Galleria', intro: 'Momenti catturati a Casa do Capitão e nella bella baia di Inhambane.' },
    ofertas: { title: 'Offerte', intro: 'Pacchetti speciali per un soggiorno ancora più memorabile.' },
    servicos: { title: 'Servizi', intro: 'Tutto ciò che serve per un soggiorno confortevole e indimenticabile.' },
    restaurante: { title: 'Ristorante', intro: 'Sapori del Mozambico con vista sull\'Oceano Indiano.' },
    sobreNos: { title: 'Chi Siamo', intro: 'La nostra missione è condividere l\'ospitalità mozambicana con il mondo.' },
    blog: { title: 'Blog', intro: 'Storie, destinazioni e ispirazione per il tuo viaggio a Inhambane.' },
    faqs: { title: 'Domande Frequenti', intro: 'Risposte alle domande più comuni dei nostri ospiti.' },
    reservar: { title: 'Prenota', intro: 'Prenota il tuo soggiorno a Casa do Capitão.' },
    cancelarReserva: { title: 'Cancella Prenotazione', intro: 'Inserisci i dati della prenotazione per richiedere la cancellazione.' },
    pesquisa: { title: 'Ricerca', intro: 'Risultati della tua ricerca sul sito.' },
  },
  labels: { area: 'Superficie', view: 'Vista', capacity: 'Capacità', price: 'Prezzo', perNight: '/ notte', amenities: 'Servizi', people: 'persone', unavailable: 'Non disponibile', otherRooms: 'Altre camere', freeCancel: 'Cancellazione gratuita fino a 48h prima', validUntil: 'Valido fino al' },
  footer: { hotel: 'Hotel', bookings: 'Prenotazioni', info: 'Informazione', whatsapp: 'WhatsApp', rooms: 'Camere', theHotel: 'L\'Hotel', rooftop: 'Rooftop', gallery: 'Galleria', services: 'Servizi', book: 'Prenota', offers: 'Offerte', restaurant: 'Ristorante', contact: 'Contatti', blog: 'Blog', about: 'Chi Siamo', faqs: 'FAQs', legal: 'Note Legali' },
  popup: { title: 'Fuga Marittima', description: 'Tre notti con colazione e sconto del 20%. Prenota entro il 31 agosto.', cta: 'Vedi Offerta' },
});
