const anywhereLocations = [
  "americas, europe, africa",
  "all regions",
  "all",
  "any region",
  "any",
  "anywhere",
  "anywhere (100% remote) only",
  "earth",
  "eastern europe and asia",
  "global",
  "no location given",
  "north america, europe, india, brazil, australia",
  "remote - all regions",
  "remote",
  "remote, anywhere",
  "united states/india/south africa",
  "us,canada,australia",
  "virtual location",
  "world wide",
  "worldwide",
];

const northAmericaOrEuropeLocations = [
  "americas & europe",
  "americas or europe",
  "europe / americas",
  "europe or usa",
  "europe, east coast us",
  "european or american timezone",
  "european timezones, american timezones",
  "london, europe or usa (in order of preference)",
  "north america & europe",
  "north america and europe",
  "north america, europe",
  "north america, europe, spain",
  "north america, uk",
  "usa and europe",
];

const americasLocations = [
  "+/- 3h est preferred",
  "americas (north, south, and central)",
  "americas time zones",
  "americas",
  "americas only",
  "gmt +- 4hrs",
  "must be willing to work within cst business day",
  "north america & south america",
  "north america and south america",
  "north america time zones",
  "north american timezones",
  "north and south america",
  "north or south america",
  "north/south america",
  "overlap 9am-12pm eastern standard time",
  "overlap pacific time (-07:00)",
  "p.s.t. preferred but flexible",
  "p.s.t., m.s.t., and c.s.t. only",
  "pacific to eastern time zones",
  "us (gmt-8 - gmt-4, prefer gmt-7)",
  "us timezones only",
  "usa time zones only",
  "within 3 hours of cst",
];

const northAmericaLocations = [
  "San Francisco or Remote (US only)",
  "austin",
  "california",
  "canada only",
  "canada",
  "continental us only",
  "fl",
  "il or fl only",
  "los angeles or remote (us only)",
  "new york city",
  "north america only",
  "north america only",
  "north america or canada",
  "north america preferred",
  "north america",
  "nyc",
  "on, canada",
  "remote - us only",
  "u.s. only. not hiring in wa, or, sf, ny, or nj.",
  "u.s.",
  "u.s.a",
  "u.s.a. only",
  "u.s.a.",
  "united states and canada",
  "united states only",
  "united states",
  "us & canada",
  "us only",
  "us",
  "usa only",
  "usa",
  "utc+3 (eastern europe) and utc-7 (as far as san francisco) time zones",
];

const southAmericaLocations = [
  "latin america only",
  "latin america",
  "south america",
];

const europeLocations = [
  "anywhere (0700 - 1400h utc)",
  "anywhere (overlap a few hours with 0700 - 1400h utc)",
  "berlin",
  "eu",
  "europ time zone or gmt time zone only",
  "europe ideally, also open to russia, australia, nz, and other timezones",
  "europe only",
  "europe",
  "european time zones only",
  "ireland",
  "london, uk",
  "uk or europe",
  "united kingdom",
  "utc-5 to utc+2",
  "worldwide except us & canada",
];

const asiaLocations = ["asia only"];

const australiaLocations = ["australia", "australia only"];

const invalidLocations = ["emea only", "full-stack", "front-end", "back-end"];

const locations: Array<{ name: string; listedAs: string[] }> = [
  { name: "Americas", listedAs: americasLocations },
  { name: "Anywhere", listedAs: anywhereLocations },
  { name: "Asia", listedAs: asiaLocations },
  { name: "Australia", listedAs: australiaLocations },
  { name: "Europe", listedAs: europeLocations },
  { name: "North America or Europe", listedAs: northAmericaOrEuropeLocations },
  { name: "North America", listedAs: northAmericaLocations },
  { name: "South America", listedAs: southAmericaLocations },
];

export default function extractLocationFromString(str?: string) {
  if (!str || invalidLocations.includes(str.toLowerCase())) {
    return "Uncertain Location";
  }

  const relatedLocation = locations.find((location) => {
    const formattedList: string[] = location.listedAs.map((place) =>
      place.trim().toLowerCase()
    );

    return formattedList.includes(str.trim().toLowerCase());
  });

  return relatedLocation ? relatedLocation.name : str;
}
