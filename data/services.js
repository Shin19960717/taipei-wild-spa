export function buildServiceCards(t) {
  return [
    {
      imageSrc: "/services/store.jpg",
      imageAlt: "store service",
      title: t.inStoreTitle,
      times: [t.inStoreTime1, t.inStoreTime2, t.inStoreTime3],
      notes: [t.inStoreNote1, t.inStoreNote2],
      className: "md:justify-self-start",
      delay: 100,
    },
    {
      imageSrc: "/services/home.jpg",
      imageAlt: "home service",
      title: t.homeServiceTitle,
      times: [t.homeServiceTime1, t.homeServiceTime2],
      notes: [t.homeNote1, t.homeNote2, t.homeNote3],
      className: "md:justify-self-end",
      delay: 220,
    },
  ];
}