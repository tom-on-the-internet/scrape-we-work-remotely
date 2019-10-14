"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const fs_1 = require("fs");
const baseUrl = 'https://weworkremotely.com';
const categoryUrl = '/categories/remote-programming-jobs/';
const getLocationFromString = (location) => {
    if (!location) {
        return 'Anywhere';
    }
    if ([
        'remote',
        'anywhere',
        'global',
        'world wide',
        'worldwide',
        'no location given',
        'remote - all regions',
        'earth',
        'all regions',
        'any region',
        'any',
        'all',
        'us,canada,australia',
        'virtual location',
        'remote, anywhere',
        'eastern europe and asia',
        'north america, europe, india, brazil, australia',
    ].includes(location.trim().toLowerCase())) {
        return 'Anywhere';
    }
    if ([
        'north america, europe',
        'north america & europe',
        'north america and europe',
        'european or american timezone',
        'london, europe or usa (in order of preference)',
        'european timezones, american timezones',
        'usa and europe',
        'americas or europe',
        'americas & europe',
        'europe or usa',
        'europe, east coast us',
        'europe / americas',
    ].includes(location.trim().toLowerCase())) {
        return 'North America or Europe';
    }
    if ([
        'americas',
        'us timezones only',
        'americas time zones',
        'within 3 hours of cst',
        'us (gmt-8 - gmt-4, prefer gmt-7)',
        'north/south america',
        'must be willing to work within cst business day',
        'overlap 9am-12pm eastern standard time',
        'p.s.t. preferred but flexible',
        'gmt +- 4hrs',
        'north america and south america',
        'north america & south america',
        'p.s.t., m.s.t., and c.s.t. only',
        'usa time zones only',
        'north america time zones',
        'north american time zones',
        'pacific to eastern time zones',
        '+/- 3h est preferred',
        'north or south america',
        'north and south america',
        'overlap pacific time (-07:00)',
        'americas (north, south, and central)',
    ].includes(location.trim().toLowerCase())) {
        return 'Americas';
    }
    if ([
        'north america',
        'north america only',
        'united states',
        'us',
        'usa',
        'u.s.',
        'u.s.a',
        'u.s.a.',
        'us only',
        'usa only',
        'united states only',
        'north america only',
        'fl',
        'nyc',
        'new york city',
        'canada',
        'california',
        'utc+3 (eastern europe) and utc-7 (as far as san francisco) time zones',
        'remote - us only',
        'north america or canada',
        'united states and canada',
        'il or fl only',
        'on, canada',
        'north america preferred',
        'los angeles or remote (us only)',
        'austin',
        'u.s. only. not hiring in wa, or, sf, ny, or nj.',
        'us & canada',
    ].includes(location.trim().toLowerCase())) {
        return 'North America';
    }
    if (['south america', 'latin america only', 'latin america'].includes(location.trim().toLowerCase())) {
        return 'South America';
    }
    if ([
        'europe',
        'eu',
        'united kingdom',
        'uk or europe',
        'utc-5 to utc+2',
        'london, uk',
        'ireland',
        'european time zones only',
        'anywhere (0700 - 1400h utc)',
        'berlin',
        'anywhere (overlap a few hours with 0700 - 1400h utc)',
        'worldwide except us & canada',
        'europe ideally, also open to russia, australia, nz, and other timezones',
    ].includes(location.trim().toLowerCase())) {
        return 'Europe';
    }
    if (['australia', 'australia only'].includes(location.trim().toLowerCase())) {
        return 'Australia';
    }
    return location;
};
const getTechnologiesFromPosting = (posting) => {
    const technologies = [];
    if (/web/i.test(posting)) {
        technologies.push('Web');
    }
    if (/android/i.test(posting)) {
        technologies.push('Android');
    }
    if (/[^A-z]ios[^A-z]/i.test(posting)) {
        technologies.push('iOS');
    }
    if (/electron/i.test(posting)) {
        technologies.push('Electron');
    }
    if (/(reactnative|react native)/i.test(posting)) {
        technologies.push('React Native');
    }
    if (/(nativescript|native script)/i.test(posting)) {
        technologies.push('NativeScript');
    }
    if (/python/i.test(posting)) {
        technologies.push('Python');
    }
    if (/scala/i.test(posting)) {
        technologies.push('Scala');
    }
    if (/kotlin/i.test(posting)) {
        technologies.push('Kotlin');
    }
    if (/(?!javascript)java/i.test(posting)) {
        technologies.push('Java');
    }
    if (/(javascript|js|es5|es6|es7|es2015|es2016|es2017|ecmascript)/i.test(posting)) {
        technologies.push('JavaScript');
    }
    if (/typescript/i.test(posting)) {
        technologies.push('TypeScript');
    }
    if (/ruby/i.test(posting)) {
        technologies.push('Ruby');
    }
    if (/php/i.test(posting)) {
        technologies.push('PHP');
    }
    if (/c#/i.test(posting)) {
        technologies.push('C#');
    }
    if (/node/i.test(posting)) {
        technologies.push('Node');
    }
    if (/elixir/i.test(posting)) {
        technologies.push('Elixir');
    }
    if (/rust/i.test(posting)) {
        technologies.push('Rust');
    }
    if (/([^!?].Go[^A-z]|Golang|golang)/.test(posting)) {
        technologies.push('Go');
    }
    if (/css/i.test(posting)) {
        technologies.push('CSS');
    }
    if (/html/i.test(posting)) {
        technologies.push('HTML');
    }
    if (/sql/i.test(posting)) {
        technologies.push('SQL');
    }
    if (/(rails|ror)/i.test(posting)) {
        technologies.push('Ruby on Rails');
    }
    if (/(laravel)/i.test(posting)) {
        technologies.push('Laravel');
    }
    if (/(nestjs)/i.test(posting)) {
        technologies.push('NestJS');
    }
    if (/\.net/i.test(posting)) {
        technologies.push('.NET');
    }
    if (/(django)/i.test(posting)) {
        technologies.push('Django');
    }
    if (/(express)/i.test(posting)) {
        technologies.push('Express');
    }
    if (/(word press | wordpress)/i.test(posting)) {
        technologies.push('WordPress');
    }
    if (/react/i.test(posting)) {
        technologies.push('React');
    }
    if (/angular/i.test(posting)) {
        technologies.push('Angular');
    }
    if (/vue/i.test(posting)) {
        technologies.push('Vue');
    }
    if (/docker/i.test(posting)) {
        technologies.push('Docker');
    }
    if (/ansible/i.test(posting)) {
        technologies.push('Ansible');
    }
    if (/chef/i.test(posting)) {
        technologies.push('Chef');
    }
    if (/puppet/i.test(posting)) {
        technologies.push('Puppet');
    }
    if (/(kubernetes|k8)/i.test(posting)) {
        technologies.push('Kubernetes');
    }
    if (/apache/i.test(posting)) {
        technologies.push('Apache');
    }
    if (/nginx/i.test(posting)) {
        technologies.push('NGINX');
    }
    if (/(bitcoin|bit coin)/i.test(posting)) {
        technologies.push('Bitcoin');
    }
    if (/graphql/i.test(posting)) {
        technologies.push('GraphQL');
    }
    if (/blockchain/i.test(posting)) {
        technologies.push('Blockchain');
    }
    return technologies;
};
const main = async () => {
    const indexUrl = baseUrl + categoryUrl;
    const response = await axios_1.default.get(indexUrl);
    const jobListingHTML = response.data;
    const $ = cheerio_1.default.load(jobListingHTML);
    const jobPostingUrls = $('article li > a')
        .get()
        .map((item) => {
        const relativeUrl = $(item).attr('href');
        return baseUrl + relativeUrl;
    })
        .filter((url) => url !== `${baseUrl}/`);
    const responses = await Promise.all(jobPostingUrls.map((url) => axios_1.default.get(url)));
    const postingPages = responses.map((response) => response.data);
    const jobPostings = postingPages.map((postingPage) => {
        const $ = cheerio_1.default.load(postingPage);
        const location = getLocationFromString($('.listing-tag')
            .get()
            .filter((_item, index) => index > 1)
            .map((item) => $(item).text())[0]);
        const posting = $('#job-listing-show-container').html();
        const technologies = getTechnologiesFromPosting(posting);
        return { location, technologies };
    });
    const jobPostingJSON = JSON.stringify(jobPostings);
    fs_1.writeFileSync('technologies.json', jobPostingJSON);
};
main();
