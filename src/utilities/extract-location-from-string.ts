const anywhereLocations = [
  "remote",
  "anywhere",
  "global",
  "world wide",
  "worldwide",
  "no location given",
  "remote - all regions",
  "earth",
  "all regions",
  "any region",
  "any",
  "all",
  "us,canada,australia",
  "virtual location",
  "remote, anywhere",
  "eastern europe and asia",
  "north america, europe, india, brazil, australia",
  "united states/india/south africa"
];

const northAmericaOrEuropeLocations = [
  "north america, europe",
  "north america & europe",
  "north america and europe",
  "european or american timezone",
  "london, europe or usa (in order of preference)",
  "european timezones, american timezones",
  "usa and europe",
  "americas or europe",
  "americas & europe",
  "europe or usa",
  "europe, east coast us",
  "europe / americas",
  "north america, europe, spain"
];

const americasLocations = [
  "americas",
  "us timezones only",
  "americas time zones",
  "within 3 hours of cst",
  "us (gmt-8 - gmt-4, prefer gmt-7)",
  "north/south america",
  "must be willing to work within cst business day",
  "overlap 9am-12pm eastern standard time",
  "p.s.t. preferred but flexible",
  "gmt +- 4hrs",
  "north america and south america",
  "north america & south america",
  "p.s.t., m.s.t., and c.s.t. only",
  "usa time zones only",
  "north america time zones",
  "north american timezones",
  "pacific to eastern time zones",
  "+/- 3h est preferred",
  "north or south america",
  "north and south america",
  "overlap pacific time (-07:00)",
  "americas (north, south, and central)"
];

const northAmericaLocations = [
  "north america",
  "north america only",
  "united states",
  "us",
  "usa",
  "u.s.",
  "u.s.a",
  "u.s.a.",
  "us only",
  "usa only",
  "united states only",
  "north america only",
  "fl",
  "nyc",
  "new york city",
  "canada",
  "canada only",
  "california",
  "utc+3 (eastern europe) and utc-7 (as far as san francisco) time zones",
  "remote - us only",
  "north america or canada",
  "united states and canada",
  "il or fl only",
  "on, canada",
  "north america preferred",
  "los angeles or remote (us only)",
  "austin",
  "u.s. only. not hiring in wa, or, sf, ny, or nj.",
  "us & canada",
  "San Francisco or Remote (US only)"
];

const southAmericaLocations = [
  "south america",
  "latin america only",
  "latin america"
];

const europeLocations = [
  "europe",
  "eu",
  "united kingdom",
  "europe only",
  "uk or europe",
  "utc-5 to utc+2",
  "london, uk",
  "ireland",
  "european time zones only",
  "anywhere (0700 - 1400h utc)",
  "berlin",
  "anywhere (overlap a few hours with 0700 - 1400h utc)",
  "worldwide except us & canada",
  "europe ideally, also open to russia, australia, nz, and other timezones",
  "europ time zone or gmt time zone only"
];

const australiaLocations = ["australia", "australia only"];

const locations: Array<{ name: string; listedAs: string[] }> = [
  { name: "Anywhere", listedAs: anywhereLocations },
  { name: "North America or Europe", listedAs: northAmericaOrEuropeLocations },
  { name: "Americas", listedAs: americasLocations },
  { name: "North America", listedAs: northAmericaLocations },
  { name: "South America", listedAs: southAmericaLocations },
  { name: "Europe", listedAs: europeLocations },
  { name: "Australia", listedAs: australiaLocations }
];

export default function extractLocationFromString(str?: string) {
  if (!str) {
    return "Anywhere";
  }

  const relatedLocation = locations.find(location => {
    const formattedList: string[] = location.listedAs.map(place =>
      place.trim().toLowerCase()
    );

    return formattedList.includes(str.trim().toLowerCase());
  });

  return relatedLocation ? relatedLocation.name : str;
}
