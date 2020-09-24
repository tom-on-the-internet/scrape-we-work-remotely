import cheerio from "cheerio";

export const baseUrl = "https://weworkremotely.com";
export const categoryUrl = "/categories/remote-programming-jobs/";

export function extractJobPostingUrlsFromJobListingHtml(
  jobListingHTML: any
): string[] {
  const $ = cheerio.load(jobListingHTML);

  return $("article li > a")
    .get()
    .map((item) => {
      const relativeUrl = $(item).attr("href");
      return baseUrl + relativeUrl;
    })
    .filter((url) => url !== `${baseUrl}/`);
}
