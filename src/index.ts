import Axios, { AxiosResponse } from "axios";
import cheerio from "cheerio";
import { writeFileSync } from "fs";

import {
  baseUrl,
  categoryUrl,
  extractJobPostingUrlsFromJobListingHtml,
} from "./utilities/extract-job-posting-urls-from-job-listing-html";
import extractLocationFromString from "./utilities/extract-location-from-string";
import extractTechnologiesFromString from "./utilities/extract-technologies-from-string";

const main = async () => {
  const response: AxiosResponse = await Axios.get(baseUrl + categoryUrl);

  const jobPostingUrls: string[] = extractJobPostingUrlsFromJobListingHtml(
    response.data
  );

  const responses = await Promise.all(
    jobPostingUrls.map((url) => Axios.get(url))
  );

  const postingPages = responses.map(
    (postingsResponse: AxiosResponse) => postingsResponse.data
  );

  const jobPostings = postingPages.map((postingPage) => {
    const $ = cheerio.load(postingPage);

    const location = extractLocationFromString(
      $(".listing-tag")
        .get()
        .filter(
          (_item, index, array) => index > 1 && index === array.length - 1
        )
        .map((item) => $(item).text())[0]
    );

    const posting = $("#job-listing-show-container")!.html();
    const technologies = extractTechnologiesFromString(posting);

    return { location, technologies };
  });

  const jobPostingJSON = JSON.stringify(jobPostings);

  writeFileSync("technologies.json", jobPostingJSON);
};

main();
