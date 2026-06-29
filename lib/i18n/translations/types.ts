export type Translation = {
  nav: {
    rooms: string;
    hotel: string;
    rooftop: string;
    gallery: string;
    offers: string;
    shop: string;
    contact: string;
    blog: string;
    about: string;
    menu: string;
    book: string;
  };
  hero: {
    benefits: string[];
  };
  home: {
    introTitle: string;
    introSubtitle: string;
    introCta: string;
    roomsTitle: string;
    roomsCta: string;
    amenitiesTitle: string;
    amenitiesSubtitle: string;
    amenitiesCta: string;
    instagramTitle: string;
    instagramSubtitle: string;
    instagramCta: string;
    blogTitle: string;
    blogSubtitle: string;
    blogCta: string;
    blogLatestTitle: string;
    blogHighlightsTitle: string;
    blogExploreHighlights: string;
    blogReviewName: string;
    blogReviewHandle: string;
    blogReviewTitle: string;
    blogReviewText: string;
    blogVideoCaption: string;
  };
  booking: {
    checkIn: string;
    checkOut: string;
    guests: string;
    adults: string;
    rooms: string;
    book: string;
    search: string;
  };
  footer: {
    newsletter: string;
    subscribe: string;
    terms: string;
    copyright: string;
    legal: string;
    cookies: string;
    openMaps: string;
  };
  common: {
    bookNow: string;
    seeMore: string;
    learnMore: string;
    back: string;
    loading: string;
    search: string;
    send: string;
    close: string;
    minRead: string;
  };
};

export type TranslationKey = Translation;
