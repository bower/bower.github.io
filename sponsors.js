// TODO: lead supply is charged for 3x logos since Oct 2019

const fetch = require('cross-fetch')
const fs = require('fs')

let SPONSORS = ''
let SUPPORTERS = ''

async function query(page) {
  const url = 'https://api.opencollective.com/graphql/v2/' + process.env.API_KEY
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `
{
  account(slug: "bower") {
    transactions(limit: 100, offset: ${100*(page-1)}) {
      nodes {
        type
        amount {
          value
          currency
        }
        createdAt
        fromAccount {
          name
          slug
        }
        toAccount {
          name
          slug
        }
      }
    }
  }
}
      `
    })
  })

  const json = await response.json()

  return json.data.account.transactions.nodes
}

const forcedsponsors = {
  '1gbits': {
      price: 150,
      date: '2019-10-30'
  }
}

const forcedsupporters = ['royal-tech-ab']
const ignoredsupporters = ['rocketpayz', 'webton-bv', 'casinotop-com', 'upendra-rathore', 'world-of-the-casinos', 'baocasino', 'hollandsegokken-nl', 'nettcasinobonus-com1', 'bellwether-capital', 'esquire-client-solutions', 'college-paper-world', 'yevgen-yanovskyy']
const exceptions = ['digital-bank-guide', 'alex-owner']
  
const datasup = [
  {
    name: 'real-time-communications-world',
    href: 'https://www.realtimecommunicationsworld.com',
    text: 'Real Time Communications World'
  },
  {
    name: 'dpcoupon',
    href: 'https://www.dpcoupon.com',
    text: 'DPCoupon.com'
  },
  {
    name: 'gjeldsproblemer-com',
    href: 'https://gjeldsproblemer.com/',
    text: 'Gjeldsproblemer'
  },
  {
    name: 'ministry-of-freedom',
    href: 'https://www.theministryoffreedomreview.com',
    text: 'Ministry Of Freedom'
  },
  {
    name: 'scalp-micropigmentation-clinics',
    href: 'https://www.scalpmicropigmentationclinics.com',
    text: 'Scalp Micropigmentation Clinics'
  },
  {
    name: 'tjek-dating-sider',
    href: 'https://www.tjekdatingsider.dk/',
    text: 'Tjek Dating Sider'
  },
  {
    name: 'current-bitcoin-news',
    href: 'https://currentbitcoinnews.com/',
    text: 'Current Bitcoin News'
  },
  {
    name: 'argeweb1',
    href: 'https://www.argeweb.nl/',
    text: 'argeweb'
  },
  {
    name: '123calendars',
    href: 'https://www.123calendars.com/',
    text: '123Calendars'
  },
  {
    name: 'laina-pro',
    href: 'https://laina.pro/',
    text: 'Laina.pro'
  },
  {
    name: 'coinnewsspan',
    href: 'https://www.coinnewsspan.com',
    text: 'CoinNewsSpan'
  },
  {
    name: 'talousapu',
    href: 'https://talousapu.fi/',
    text: 'Talousapu.fi'
  },
  {
    name: 'ponfish',
    href: 'https://www.ponfish.com',
    text: 'PonFish'
  },
  {
    name: 'zenscrape',
    href: 'https://zenscrape.com/',
    text: 'Zenscrape - Web Scraping API'
  },
  {
    name: 'paraphrase-tool',
    href: 'https://paraphrasetools.com',
    text: 'Paraphrase tools'
  },
  {
    name: 'butikkene-no',
    href: 'https://www.butikkene.no/',
    text: 'Butikkene.no'
  },
  {
    name: 'tierlists',
    href: 'https://tierlists.com/',
    text: 'Free Tier List Maker'
  },
  {
    name: 'credit-cards-in-norway',
    href: 'https://scandinavia.life/credit-cards-norway/',
    text: 'Credit Cards in Norway'
  },
  {
    name: 'lazy-sg',
    href: 'https://www.lazy.com.sg/cleaning-services',
    text: 'Cleaning Services'
  },
  {
    name: 'mobil-paa-afbetaling',
    href: 'https://mobilafbetaling.dk/',
    text: 'Mobil på afbetaling'
  },
  {
    name: 'troniczone',
    text: 'circuit design',
    href: 'https://www.tronicszone.com/electronic-circuit-design/'
  },
  {
    name: 'wohnungsreinigung',
    href: 'https://wohnungsreinigung24.ch/',
    text: 'Wohnungsreinigung'
  },
  {
    name: 'five-guys-plumbing-dearborn',
    href: 'http://www.fiveguysplumbingdearborn.com',
    text: 'Five Guys Plumbing Dearborn'
  },
  {
    name: 'negativeseoexpert',
    href: 'https://negativeseoexpert.com/',
    text: 'Negative SEO SERVICES'
  },
  {
    name: 'lan-penger',
    href: 'https://låneport.no/',
    text: 'Lån Penger'
  },
  {
    name: 'couponupto-com',
    href: 'https://www.couponupto.com',
    text: 'CouponUpTo'
  },
  {
    name: 'cryptomoonpress',
    href: 'https://cryptomoonpress.com/',
    text: 'CryptoMoonPress'
  },
  {
    name: 'open-apk-file',
    href: 'https://openapkfilez.com/',
    text: 'Open APK File'
  },
  {
    name: 'esquire-client-solutions',
    href: 'https://esquireclientsolutions.com/west-palm-beach-seo/',
    text: 'West Palm Beach SEO'
  },
  {
    name: 'pillarwm',
    href: 'https://pillarwm.com',
    text: 'Pillar Wealth Management'
  },
  {
    name: 'sanyo-digital1',
    href: 'https://sanyodigital.com/',
    text: 'Sanyo Digital'
  },
  {
    name: 'capitalbaynews',
    href: 'https://www.capitalbay.news/',
    text: 'Capitalbay News'
  },
  {
    name: 'wongagames',
    href: 'https://wongagames.co.uk/',
    text: 'Wonga Games'
  },
  {
    name: "tankpenge-dk",
    href: "https://tankpenge.dk",
    text: "Tankpenge.dk - Lån penge"
  },
  {
    name: 'rahoitustalo',
    href: 'https://www.rahoitustalo.fi',
    text: 'rahoitustalo.fi'
  },
  {
    name: 'metro-detroit-review',
    text: 'metrodetroitreview.com',
    href: 'http://www.metrodetroitreview.com'
  },
  {
    name: 'outdooranalysis',
    href: 'https://www.outdooranalysis.com/',
    text: 'www.outdooranalysis.com'
  },
  {
    name: 'cool-things-to-buy',
    href: 'https://coolestthingstobuy.com/',
    text: 'coolestthingstobuy.com'
  },
  {
    name: 'allofvacuums1',
    href: 'https://allofvacuums.com/',
    text: 'allofvacuums.com'
  },
  {
    name: 'casinomatcher-com',
    href: 'https://www.xn--lnasmart-9za.com/',
    text: 'Lånasmart.com'
  },
  {
    name: 'nordic-creative-life',
    href: 'https://parenthood.dk/',
    text: 'parenthood.dk'
  },
  {
    name: 'evohostin',
    href: 'https://evolution-host.com/',
    text: 'evolution-host.com'
  },
  {
    name: 'nordic-meal-company',
    href: 'https://maaltidskasser-online.dk/',
    text: 'maaltidskasser-online.dk'
  },
  {
    name: 'norlan-no-refinansiering',
    href: 'https://www.xn--norln-pra.no/refinansiering/',
    text: 'Norlån.no'
  },
  {
    name: 'lemon-law',
    href: 'https://lemonlaw.site',
    text: 'Lemon Law.Site'
  },
  {
    name: 'royal-tech-ab',
    href: 'https://www.fundfirstcapital.com',
    text: 'FundFirst Capital',
    second: [
      {
        href: 'https://settle4cash.com',
        text: 'Settle4Cash'
      },
      {
        href: 'https://dieting.org',
        text: 'Dieting.org'
      }
    ]
  },
  {
    name: 'alvenda',
    href: 'https://alvenda.com',
    text: 'alvenda.com'
  },
  {
    name: 'grammar-gang',
    href: 'https://grammargang.com/',
    text: 'grammargang.com'
  },
  {
    name: 'trivaltech',
    href: 'https://topsellersreview.com/',
    text: 'TopSellersReview'
  },
  {
    name: 'bellwether-capital',
    href: 'https://esquireclientsolutions.com/west-palm-beach-seo/',
    text: 'West Palm Beach SEO'
  },
  {
    name: 'reviewedpapa',
    href: 'https://reviewedpapa.com/',
    text: 'reviewedpapa.com'
  },
  {
    name: 'bestekredittkort',
    href: 'https://www.bestekredittkortet.com/',
    text: 'bestekredittkortet.com'
  },
  {
    name: 'all-time-list',
    href: 'https://alltimelist.com',
    text: 'alltimelist.com'
  },
  {
    name: 'forbrukslan',
    href: 'https://www.forbrukslån.com/',
    text: 'forbrukslån.com'
  },
  {
    name: 'portablebeasts',
    href: 'https://portablebeasts.com/',
    text: 'PortableBeasts'
  },
  {
    name: 'thebeastreviews',
    href: 'https://thebeastreviews.com/',
    text: 'TheBeastReviews'
  },
  {
    name: 'forexnews-world',
    href: 'https://www.forexnews.world/forex-brokers/',
    text: 'Forex Brokers'
  },
  {
    name: 'nopeustesti-fi',
    href: 'https://www.nopeustesti.fi',
    text: 'nopeustesti.fi'
  },
  {
    name: 'vpnalert',
    href: 'https://vpnalert.com',
    text: 'vpnAlert'
  },
  {
    name: 'infatica',
    href: 'https://infatica.io',
    text: 'Infatica'
  },
  {
    name: 'seed-cash-advance1',
    href: 'https://useed.net',
    text: 'Seed Cash Advance'
  },
  {
    name: 'reach-digital-agency',
    href: 'https://www.reachdigital.nl/',
    text: 'Reach Digital agency'
  },
  {
    name: 'bestvpnco',
    href: 'https://www.bestvpn.co',
    text: 'BestVPN.co'
  },
  {
    name: 'loginlockdown',
    href: 'https://loginlockdown.com/',
    text: 'Login Lockdown'
  },
  {
    name: 'chwilowki-online-1587473460664',
    href: 'https://chwilowkiok.pl',
    text: 'chwilówki online'
  },
  {
    name: 'vpn_fastest',
    href: 'https://fastestvpn.com/',
    text: 'Fastest VPN'
  },
  {
    name: 'topvpnservice',
    href: 'https://www.topvpnservice.com/',
    text: 'Top VPN Service'
  },
  {
    name: 'laina-org',
    href: 'https://www.laina.org/',
    text: 'Laina.org'
  },
  {
    name: 'vpnranks',
    href: 'https://www.vpnranks.com/',
    text: 'VPNRanks'
  },
  {
    name: 'forbrugslan',
    href: 'https://xn--billigeforbrugsln-orb.dk/',
    text: 'Forbrugslån'
  },
  {
    name: 'overhemden-com-overhemden-online',
    href: 'https://overhemden.com/',
    text: 'overhemden.com'
  },
  {
    name: 'manwoman',
    href: 'https://manwoman.co/pl/search/sukienki',
    text: 'sukienki'
  },
  {
    name: 'seowebsitetraffic-net',
    href: 'https://seowebsitetraffic.net/',
    text: 'SEO Website Traffic'
  },
  {
    name: 'intlum',
    href: 'https://www.intlum.com/',
    text: 'Intlum Technology'
  },
  {
    name: 'lendme',
    href: 'https://lendme.dk',
    text: 'LendMe'
  },
  {
    name: 'spartan-pest-control',
    href: 'https://spartanpestcontrol.com/',
    text: 'Spartan Pest Control'
  },
  {
    name: 'allan-stolc',
    href: 'https://nanofinans.no/',
    text: 'Forbrukslån'
  },
  {
    name: 'timesofcasino',
    href: 'https://www.coinnewsspan.com/',
    text: 'coinnewsspan'
  },
  {
    name: 'unitconverter',
    href: 'https://converter.net',
    text: 'Unit Converter'
  },
  {
    name: 'crossword-king',
    href: 'https://crosswordking.com',
    text: 'Crossword King'
  },
  {
    name: 'snabblan',
    href: 'https://fair-laan.se/',
    text: 'Snabblån'
  },
  {
    name: 'lan-penge1',
    href: 'https://superkredit.net/',
    text: 'Lån penge'
  },
  {
    name: 'lan',
    href: 'https://fair-laan.dk/laan-penge/',
    text: 'Lån'
  },
  {
    name: 'moneylender-dk-lan-penge',
    href: 'https://moneylender.dk/',
    text: 'Moneylender.dk - Lån penge'
  },
  {
    name: 'withnellcarsales',
    href: 'https://www.withnellcarsales.com',
    text: 'Withnell Car Sales',
  },
  {
    name: 'partition-wizard',
    href: 'https://www.partitionwizard.com',
    text: 'Partition Wizard'
  },
  {
    name: 'vpn-black-friday',
    href: 'https://vpnblackfriday.com/',
    text: 'VPN Black Friday'
  },
  {
    name: 'antoine-reveillon',
    href: 'https://opencollective.com/antoine-reveillon',
    text: 'Antoine Réveillon'
  },
  {
    name: 'pinkelephant',
    href: 'https://akasse-fagforening.dk/',
    text: 'a-kasse'
  },
  {
    name: 'varlam-ahekian',
    href: 'https://opencollective.com/varlam-ahekian',
    text: 'Varlam Ahekian'
  },
  {
    name: 'theme-divi',
    href: 'http://wptheme.fr/theme-wordpress-divi/',
    text: 'Theme Divi'
  },
  {
    name: 'top-web-design-agencies',
    href: 'https://medium.com/@niksundin/best-web-design-companies-1872e445775f',
    text: 'Top Web Design Agencies'
  },
  {
    name: 'sokbillan-no',
    href: 'https://xn--skbilln-jxa9n.no/',
    text: 'Søkbillån.no'
  },
  {
    name: 'billigproteinpulver-com',
    href: 'https://billigproteinpulver.com/',
    text: 'Billigproteinpulver'
  },
  {
    name: 'moneypug',
    href: 'https://moneypug.co.uk/',
    text: 'Money Pug'
  },
  {
    name: 'worthwagon',
    href: 'https://www.worthwagon.com/',
    text: 'worthwagon'
  },
  {
    name: 'folkelaanetdk',
    href: 'https://folkelaanet.dk/',
    text: 'folkelaanet.dk'
  },
  {
    name: 'fire-stick-how',
    href: 'https://www.firestickhow.com/',
    text: 'Fire Stick How'
  },
  {
    name: 'finance-media-aps',
    href: 'https://kikster.com/',
    text: 'Kikster'
  },
  {
    name: 'your-online-presence',
    href: 'https://www.youronlinepresence.co.uk/',
    text: 'Your Online Presence'
  },
  {
    name: 'cryptonewsz',
    href: 'https://www.cryptonewsz.com',
    text: 'CryptoNewsZ'
  },
  {
    name: 'gorilla-sports-as',
    href: 'https://gorillasports.no/',
    text: 'Gorilla Sports'
  },
  {
    name: 'kredittkrt-no',
    href: 'https://kredittkrt.no/',
    text: 'Kredittkrt'
  },
  {
    name: 'brillz',
    href: 'https://brillz.no/',
    text: 'Brillz'
  },
  {
    name: 'dirgeobiz',
    href: 'https://swiindex.com/',
    text: 'swiindex.com'
  },
  {
    name: 'kassekredittendk',
    href: 'https://kassekreditten.dk/',
    text: 'Kassekreditten'
  },
  {
    name: 'canada1',
    href: 'https://www.canadadrugsdirect.com',
    text: 'Canadadrugsdirect'
  },
  {
    name: 'kryptoportal',
    href: 'https://www.kryptoportal.pl',
    text: 'KryptoPortal.pl'
  },
  {
    name: 'minitool-software-ltd',
    href: 'https://www.minitool.com',
    text: 'MiniTool'
  },
  {
    name: 'dawid-seo',
    href: 'https://ktmh.pl',
    text: 'KTMH'
  },
  {
    name: 'dcsl-software',
    href: 'https://www.dcslsoftware.com/',
    text: 'DCSL software'
  },
  {
    name: 'nenciu-valentin-vmn-marketing-srl',
    href: 'https://handyortenapp.de/', // ???
    text: 'handyortenapp.de'
  },
  {
    name: 'ip2location',
    href: 'https://www.ip2location.com',
    text: 'IP2Location'
  },
  {
    name: 'upendra-rathore',
    href: 'https://www.parc-canberra.com.sg/',
    text: 'Parc Canberra'
  },
  {
    name: 'upendra-rathore',
    href: 'https://spartanpestcontrol.com/',
    text: 'Calgary Pest Control'
  },
  {
    name: 'switchvpn',
    href: 'https://switchvpn.net',
    text: 'SwitchVPN'
  },
  {
    name: 'best-shark-tank-products',
    href: 'https://www.bestsharktankproducts.com',
    text: 'Best Shark Tank Products'
  },
  {
    name: 'piratebay',
    href: 'https://piratebay.ink',
    text: 'Pirate Bay Proxy List'
  },
  {
    name: 'coffee-corner',
    href: 'https://coffeecorner.com',
    text: 'Coffee Corner'
  },
  {
    name: 'baby-jumper-hub',
    href: 'https://www.bestbabyjumperhub.com/',
    text: 'Best Baby Jumper Hub'
  },
  {
    name: 'moneezy',
    href: 'https://moneezy.com/',
    text: 'Moneezy'
  },
  {
    name: 'steffen-boskma',
    href: 'https://www.energie-vergelijken.net/',
    text: 'Energie vergelijken'
  },
  {
    name: 'lan-penge',
    href: 'https://moneybanker.dk/laan-penge/',
    text: 'Lån penge'
  },
  {
    name: 'geraldine-oxenham',
    href: 'https://opencollective.com/geraldine-oxenham',
    text: 'Geraldine Oxenham'
  },
  {
    name: 'hypnoswellbeing',
    href: 'https://www.hypnoswellbeing.com/',
    text: 'Hypnos Wellbeing'
  },
  {
    name: 'collectiveray',
    href: 'https://www.collectiveray.com',
    text: 'CollectiveRay'
  },
  {
    name: 'banksecrets',
    href: 'https://www.banksecrets.eu/da/laan-penge/kviklaan/',
    text: 'Kviklån'
  },
  {
    name: 'moneyarcher',
    href: 'https://moneyarcher.com/de/',
    text: 'Money Archer'
  },
  {
    name: 'writersperhour',
    href: "https://writersperhour.com/",
    text: "Writers per Hour"
  },
  {
    name: 'namecoinnews',
    href: 'https://www.namecoinnews.com/',
    text: "NameCoinNews"
  },
  {
    name: 'link-directory',
    href: 'https://www.directory.net',
    text: 'Link Directory'
  },
  {
    name: 'himanshu-ojha',
    href: 'https://opencollective.com/himanshu-ojha',
    text: 'Himanshu Ojha'
  },
  {
    name: 'purvik-shah',
    href: 'https://opencollective.com/purvik-shah',
    text: 'Purvik Shah'
  },
  {
    name: 'instalguru',
    href: 'https://instalguru.com/pl',
    text: 'Instalguru'
  },
  {
    name: 'divi-theme',
    href: 'http://wptheme.fr/theme-wordpress-divi/',
    text: 'Divi'
  },
  {
    name: 'alex-owner',
    href: 'https://www.w5recruitment.co.uk',
    text: 'W5Recruitment.co.uk'
  },
  {
    name: 'thepiratebay',
    href: 'https://thepiratebayproxylist.se',
    text: 'The Pirate Bay Proxy List',
  },
  {
    name: 'best-guitar-under',
    text: 'Best Guitar Under',
    href: 'https://bestguitarunder.com/'
  },
  {
    name: 'kviklaan-nu',
    text: 'kviklån',
    href: 'https://kviklaan.nu/kviklaan/'
  },
  {
    name: 'dinero_no',
    href: 'https://dinero.no/forbrukslan/',
    text: 'Dinero Forbrukslån'
  },
  {
    name: 'incognito-2aad9379',
    href: 'https://www.sahkotyotespoo.fi',
    text: 'Sähkömies Espoo'
  },
  {
    name: 'sammenlignforbrukslan-no',
    href: 'https://xn--sammenlignforbruksln-f0b.no/',
    text: 'Sammenlign Forbrukslån'
  },
  {
    name: 'zipcodes',
    href: 'https://zipcodes.org',
    text: 'ZipCodes.org'
  },
  {
    name: 'proven1',
    href: 'https://apnews.com/press-release/wired-release/2b9faf69b5bab5132d4f1f34a503e6f4',
    text: 'ProVen'
  }
]

const data = [
  {
    name: 'bank-finans',
    href: 'https://bankfinans.se/',
    src: 'https://i.imgur.com/VtnZTO7.png',
    alt: 'Bank Finans'
  },
  {
    name: 'proven',
    href: 'https://www.discovermagazine.com/sponsored/proven-reviews-nutravesta-proven-weight-loss-pills-really-work',
    src: 'https://i.imgur.com/W70tuoL.png',
    alt: 'ProVen'
  },
  {
    name: 'aandelen-kopen1',
    href: 'https://www.aandelenkopen.com/',
    src: 'https://i.imgur.com/tB0Kg9v.png',
    alt: 'Aandelen kopen tips'
  },
  {
    name: 'buycheaprdp',
    href: 'https://buycheaprdp.com/',
    src: 'https://i.imgur.com/mQkLkbs.png',
    alt: 'Buy Cheap Remote Desktop Services'
  },
  {
    name: 'faveable',
    href: 'https://faveable.com/',
    src: 'https://i.imgur.com/PMqdGyT.png',
    alt: 'Faveable'
  },
  {
    name: 'buy-fineproxy-org',
    href: 'https://buy.fineproxy.org/eng/',
    src: 'https://i.imgur.com/MCMrOiw.png',
    alt: 'FinePROXY'
  },
  {
    name: 'masterbundles',
    href: 'https://masterbundles.com/',
    src: 'https://i.imgur.com/FS7VYwp.png',
    text: 'masterbundles.com'
  },
  {
    name: 'zenscrape',
    href: 'https://zenscrape.com/',
    src: 'https://i.imgur.com/WQf4Lxi.png',
    text: 'Zenscrape - Web Scraping API'
  },
  {
    name: 'zenserp',
    href: 'https://zenserp.com',
    src: 'https://i.imgur.com/mj9YocC.png',
    alt: 'Zenserp - Google Search API'
  },
  {
    name: 'blufvpn',
    href: 'https://blufvpn.com',
    src: 'https://i.imgur.com/kHYrANI.png',
    alt: 'BlufVPN - Supercharged Privacy'
  },
  {
    name: 'netflix-vpn',
    href: 'https://vpn-review.com/netflix-vpn',
    src: 'https://i.imgur.com/nfew8Na.png',
    alt: 'Best Netflix VPN'
  },
  {
    name: 'clipartlove',
    href: 'https://www.clipartlove.com/',
    src: 'https://i.imgur.com/W37UlyE.png',
    alt: 'Clipartlove'
  },
  {
    name: 'mosttrust-com',
    href: 'https://mosttrust.com/',
    src: 'https://i.imgur.com/TGzM7H2.png',
    alt: 'MostTrust.com'
  },
  {
    name: "varmalaina-fi",
    href: "https://www.varmalaina.fi/",
    src: "https://i.imgur.com/lbkpxKf.png",
    alt: "VarmaLaina.fi"
  },
  {
    name: 'top-web-design-agencies',
    src: 'https://i.imgur.com/oQYK4B9.png',
    href: 'https://medium.com/@niksundin/best-web-design-companies-1872e445775f',
    alt: 'Top Web Design Agencies'
  },
  {
    name: 'zadluzenia-com',
    href: 'https://www.zadluzenia.com/',
    src: 'https://i.imgur.com/NLC1TOn.png',
    alt: 'zadluzenia.com'
  },
  {
    name: 'thebigphonestore',
    src: 'https://i.imgur.com/2NBJr2b.png',
    href: 'https://www.thebigphonestore.co.uk/',
    alt: 'The Big Phone Store'
  },
  {
    name: 'instapromote1',
    src: 'https://i.imgur.com/BRNfVvM.png',
    href: 'https://instapromote.me/',
    alt: 'instapromote.me'
  },
  {
    name: 'vpncompare',
    src: 'https://i.imgur.com/Z3gcqKZ.jpg',
    href: 'https://www.vpncompare.co.uk',
    alt: 'vpncompare.co.uk'
  },
  {
    name: 'betacalendars',
    src: 'https://i.imgur.com/wBKloLa.png',
    href: 'https://www.betacalendars.com/',
    alt: 'Beta Calendars'
  },
  {
    name: 'best-vpn-services',
    src: 'https://i.imgur.com/wL2Xdpg.png',
    href: 'https://www.bestvpnrating.com/',
    alt: 'Best VPN Services'
  },
  {
    name: 'vpnyhteys',
    href: 'https://www.vpnyhteys.fi/',
    src: 'https://i.imgur.com/bmkNZfZ.png',
    alt: 'vpnyhteys.fi'
  },
  {
    name: 'nopeustesti-fi',
    src: 'https://i.imgur.com/Bb3PdNj.png',
    href: 'https://www.nopeustesti.fi',
    alt: 'Nopeustesti.fi'
  },
  {
    name: 'best-vpn-for-kodi',
    src: 'https://i.imgur.com/hn5rbtL.png',
    href: 'https://cooltechzone.com/vpn-for-kodi',
    alt: 'Best vpn for Kodi'
  },
  {
    name: 'nitrovpn',
    src: 'https://i.imgur.com/pGnlGOV.png',
    href: 'https://nitrovpn.com/',
    alt: 'nitrovpn.com'
  },
  {
    name: 'lainahakemus',
    src: 'https://i.imgur.com/Mqb22QZ.png',
    href: 'https://www.lainahakemus.fi/',
    alt: 'lainahakemus.fi'
  },
  {
    name: 'credimaxx-r-gmbh',
    src: 'https://i.imgur.com/sf5e7KT.png',
    alt: 'credimaxx.de',
    href: 'https://www.credimaxx.de/'
  },
  {
    name: 'fastwordunscrambler',
    src: 'https://i.imgur.com/yj8EnMP.png',
    alt: 'FastWordUnscrambler.com',
    href: 'https://fastwordunscrambler.com/',
  },
  {
    name: 'unscramblex',
    href: 'https://unscramblex.com/',
    alt: 'unscramblex.com',
    src: 'https://i.imgur.com/uiFa9h5.png'
  },
  {
    name: 'searchpromocodes',
    href: 'https://searchpromocodes.com',
    src: 'https://i.imgur.com/P095N2M.png',
    alt: 'Search Promo Codes',
  },
  {
    name: 'emailmarketingservices-io',
    href: 'https://emailmarketingservices.io',
    alt: 'Email Marketing Services',
    src: 'https://i.imgur.com/IRd8oHi.png'
  },
  {
    src: 'https://i.imgur.com/NvN22Eu.png',
    href: 'https://kvintblendex.no/',
    alt: 'Kvint | Blendex',
    name: 'kvintblendex'
  },
  {
    name: 'web-impact',
    href: 'https://unscramblex.com/',
    alt: 'unscramblex.com',
    src: 'https://i.imgur.com/uiFa9h5.png'
  },
  {
    name: 'justremoteco',
    src: 'https://i.imgur.com/kn4uWKL.png',
    href: 'https://justremote.co/',
    alt: 'justremote.co'
  },
  {
    name: 'mobilunity',
    href: 'https://mobilunity.com/',
    src: 'https://i.imgur.com/BqDzi36.png',
    alt: 'mobilunity.com'
  },
  {
    name: 'luottopalvelut',
    src: 'https://i.imgur.com/1jaPeJk.png',
    href: 'https://luottopalvelut.fi/',
    alt: 'Luottopalvelut'
  },
  {
    name: '420couponcodes',
    src: 'https://i.imgur.com/IbhCD2k.png',
    href: 'https://420couponcodes.com/',
    alt: '420couponcodes.com'
  },
  {
    name: 'exporthub',
    src: 'https://i.imgur.com/nDXLYzE.png',
    href: 'https://www.exporthub.com/',
    alt: 'www.exporthub.com'
  },
  {
    name: 'forbrugermagasinet',
    src: 'https://i.imgur.com/6iKoQjf.jpg',
    href: 'https://www.forbrugermagasinet.dk/',
    alt: 'forbrugermagasinet'
  },
  {
    name: 'tradie-training',
    src: 'https://i.imgur.com/fj0szKk.png',
    href: 'https://tt.edu.au/',
    alt: 'tt.edu.au'
  },
  {
    name: '10-reviews',
    href: 'https://www.10reviews.com/review/10-vpns/',
    src: 'https://i.imgur.com/ep5ANQ5.png',
    alt: '10reviews.com'
  },
  {
    name: 'digital-bank-guide',
    src: 'https://i.imgur.com/fdzFdru.png',
    href: 'https://digitalbankguide.com/',
    alt: 'digitalbankguide.com'
  },
  {
    name: 'top5credits-com-fi',
    src: 'https://i.imgur.com/K2EU3HD.png',
    href: 'https://www.top5credits.com/',
    alt: 'top5credits.com'
  },
  {
    name: 'vertaalainaa-fi',
    href: 'https://www.vertaalainaa.fi/',
    src: 'https://i.imgur.com/IAtsRZ9.png',
    alt: 'VertaaLainaa.fi'
  },
  {
    name: 'calgary-pest-control',
    href: 'https://spartanpestcontrol.com/',
    src: 'https://i.imgur.com/obikCqJ.png',
    alt: 'CALGARY PEST CONTROL'
  },
  {
    name: 'jesper-jensen',
    href: 'https://www.xn--ln-yia.dk/',
    src: 'https://i.imgur.com/ijP6bcQ.png',
    alt: 'lån.dk'
  },
  {
    name: 'virtual-receptionist-london',
    href: 'http://www.virtualreceptionist.london/',
    src: 'https://i.imgur.com/pR2FWUY.png',
    alt: 'virtualreceptionist.london'
  },
  {
    name: 'matchbanker-fi1',
    href: 'https://matchbanker.fi/',
    src: 'https://i.imgur.com/PFH9D9k.png',
    alt: 'matchbanker.fi'
  },
  {
    name: 'matchbanker-pl',
    href: 'https://matchbanker.pl/',
    src: 'https://i.imgur.com/PFH9D9k.png',
    alt: 'matchbanker.pl'
  },
  {
    name: '1gbits',
    src: 'https://i.imgur.com/KvKV1Tj.png',
    alt: '1gbits',
    href: 'https://1gbits.com/',
    second: [
      {
        name: 'monovm',
        href: 'https://monovm.com',
        src: 'https://i.imgur.com/v9RLvQ7.jpg',
        alt: 'vps hosting'
      }
    ]
  },
  {
    name: 'wpsetup',
    src: 'https://i.imgur.com/7wlB7Uv.jpg',
    href: 'https://wpsetup.org',
    alt: 'wpsetup.org'
  },
  {
    name: 'fair-laan-se',
    href: 'http://fair-laan.se',
    alt: 'fair-laan.se',
    src: 'https://i.imgur.com/8mczs3O.png'
  },
  {
    name: 'fair-laan-dk',
    href: 'http://fair-laan.dk',
    alt: 'fair-laan.dk',
    src: 'https://i.imgur.com/8mczs3O.png'
  },
  {
    name: 'nordic-meal-company',
    src: 'https://i.imgur.com/wbNaael.png',
    href: 'https://maaltidskasser-online.dk/',
    alt: 'maaltidskasser-online.dk'
  },
  {
    name: 'icons8',
    href: 'https://icons8.com/web-app/category/all/Very-Basic',
    src: 'https://i.imgur.com/QlUE6Wj.png',
    alt: 'Icons8'
  },
  {
    name: 'clayglobal',
    href: 'https://clay.global',
    src: 'https://i.imgur.com/CFT6Rdk.png',
    alt: 'Clay Global'
  },
  {
    name: 'codeinwp',
    href: 'https://www.codeinwp.com',
    src: 'https://i.imgur.com/89wdDCY.png',
    alt: 'Code in WP'
  },
  {
    name: 'dontpayfull',
    href: 'https://www.dontpayfull.com/',
    src: 'https://i.imgur.com/LzILKuJ.png',
    alt: 'Don\'t Pay Full'
  },
  {
    name: 'vpsservercom',
    href: 'https://www.vpsserver.com',
    src: 'https://i.imgur.com/uybwrjU.png',
    alt: 'VPS Server'
  },
  {
    name: 'hostednl',
    href: 'https://www.hosted.nl/',
    src: 'https://i.imgur.com/aoQg0N6.png',
    alt: 'Hosted.nl'
  },
  {
    name: 'givemedeals',
    href: 'https://www.givemedeals.com/',
    src: 'https://i.imgur.com/oGv5LbE.png',
    alt: 'GiveMe Deals'
  },
  {
    name: 'hrank-com',
    href: 'https://www.hrank.com/',
    src: 'https://i.imgur.com/o9e8PNU.png',
    alt: 'HRank'
  },
  {
    name: 'casino-topp',
    href: 'https://www.finanstopp.no/forbrukslan/',
    src: 'https://i.imgur.com/KHJPgDx.png',
    alt: 'FinansTopp'
  },
  {
    name: 'truevendor',
    href: 'https://www.ramotion.com/agency/web-design/',
    src: 'https://i.imgur.com/mQxmvRm.png',
    alt: 'web design agency'
  },
  {
    name: 'smalanutensikkerhet',
    href: 'http://xn--smlnutensikkerhet-9qbb.com/',
    src: 'https://i.imgur.com/9Qxie3r.png',
    alt: 'Lån på dagen'
  },
  {
    name: 'datantify',
    href: 'https://datantify.com/',
    src: 'https://i.imgur.com/kra4tLm.png',
    alt: 'Datantify'
  },
  {
    name: 'promocodewatch1',
    href: 'https://www.promocodewatch.com',
    src: 'https://i.imgur.com/nL7VBDB.png',
    alt: 'Promo Code Watch'
  },
  {
    name: 'my-true-media',
    href: 'https://mytruemedia.com',
    src: 'https://i.imgur.com/32E5LWt.png',
    alt: 'My True Media'
  },
  {
    name: 'plan-b-services-llc',
    href: 'https://edubirdie.com/buy-an-essay-online',
    src: 'https://i.imgur.com/pQvStzD.png',
    alt: 'buy essay from Edubirdie'
  },
  {
    name: 'kredit',
    href: 'https://www.privatkreditsofort.ch/',
    src: 'https://i.imgur.com/PFHQKo4.png',
    alt: 'Privatkredit sofort - Der Kleinkredit Vergleich für die Schweiz'
  },
  {
    name: 'gameserverkings',
    href: 'https://www.gameserverkings.com',
    src: 'https://i.imgur.com/mayBUnu.png',
    alt: 'Gameserverkings'
  },
  {
    name: 'webton-bv',
    href: 'https://www.webton.nl/',
    src: 'https://i.imgur.com/xvWHTAU.png',
    alt: 'Webton'
  },
  {
    name: 'monovm',
    href: 'https://monovm.com/buy-rdp/',
    src: 'https://i.imgur.com/v9RLvQ7.jpg',
    alt: 'buy rdp'
  },
  {
    name: 'stk-finans',
    href: 'https://www.xn--forbruksln-95a.com/',
    src: 'https://i.imgur.com/cxkV6Ve.png',
    alt: 'Forbrukslån'
  },
  {
    name: 'best-shark-tank-products',
    href: 'https://www.bestsharktankproducts.com',
    alt: 'Best Shark Tank Products',
    src: 'https://i.imgur.com/XSaZ4Hy.jpg'
  },
  {
    name: 'jonas-cederholm',
    href: 'https://www.lainat.fi',
    alt: 'lainat.fi',
    src: 'https://i.imgur.com/5ObBbYs.png'
  },
  {
    name: 'meubelpartner',
    href: 'https://www.meubelpartner.nl/tafels/eettafels.html',
    alt: 'Dining room table - Meubelpartner logo - proud Bower sponsor',
    src: 'https://i.imgur.com/ubhPYsn.png'
  },
  {
    name: 'lead-supply',
    href: 'https://lainaa-helposti.fi/',
    alt: 'Lainaa Helposti',
    src: 'https://i.imgur.com/Pl628R5.png',
    second: [
      {
        href: 'https://superkredit.net/',
        alt: 'superkredit.net',
        src: 'https://i.imgur.com/5KivATo.jpg',
        since: '2019-10-10'
      },
      {
        href: 'https://loanscouter.com/',
        alt: 'LoanScouter',
        src: 'https://i.imgur.com/jqRy0WW.jpg',
        since: '2019-10-14'
      }
    ]
  },
  {
    name: 'customessaymeister-com',
    src: 'https://i.imgur.com/Id7g8vY.png',
    alt: 'Custom Essay Eister',
    href: 'https://www.customessaymeister.com/',
  },
  {
    name: 'bloktprivacy',
    src: 'https://i.imgur.com/eD0j2VN.png',
    href: 'https://blokt.com/guides/best-vpn',
    alt: 'The Best VPN Services 2019'
  },
  {
    name: 'usave',
    src: 'https://i.imgur.com/u82oGMc.png',
    href: 'https://usave.co.uk/utilities/broadband/',
    alt: 'Compare broadband deals with usave.co.uk'
  },
  {
    name: 'fire-stick-tricks',
    src: 'https://i.imgur.com/d6J9fq1.png',
    href: 'https://www.firesticktricks.com/',
    alt: 'Fire Stick Tricks'
  },
  {
    name: 'tekhattan',
    src: 'https://i.imgur.com/ng10vwa.png',
    href: 'https://tekhattan.com/',
    alt: 'IT SUPPORT, MANAGED SERVICES, AND TECH SUPPORT'
  },
  {
    name: 'devilsblood2',
    href: "https://www.onecompare.com/apple/iphone-deals",
    src: "https://i.imgur.com/053ayaj.png",
    alt: "OneCompare"
  },
  {
    name: 'utilitysavingexpert',
    src: 'https://i.imgur.com/Hwa8g6o.png',
    href: 'https://www.utilitysavingexpert.com/car-insurance/',
    alt: 'car insurance'
  },
  {
    name: 'codefirst',
    src: 'https://images.opencollective.com/proxy/images?src=https%3A%2F%2Fopencollective-production.s3-us-west-1.amazonaws.com%2Fdde88120-e914-11e8-a662-278259d35390.png&height=100',
    href: 'https://www.codefirst.co.uk/',
    alt: 'Code First'
  },
  {
    name: 'routerhosting',
    src: 'https://i.imgur.com/yccgOkJ.png',
    href: 'https://www.routerhosting.com/',
    alt: 'Router Hosting'
  },
  {
    name: 'vpn-review-com',
    src: 'https://i.imgur.com/INf1G7H.png',
    href: 'https://vpn-review.com/',
    alt: 'VPN reviews 2019'
  },
  {
    name: 'traders-insurance-com',
    src: 'https://i.imgur.com/xlkR3fb.png',
    href: 'https://www.traders-insurance.com',
    alt: 'Traders Insurance'
  },
  {
    name: 'asoboofficial',
    href: 'https://asobo-design.com/nex/',
    alt: 'デザイン作成のASOBO DESIGN',
    src: 'https://i.imgur.com/kIU9679.png'
  },
  {
    name: 'lemon-law',
    src: 'https://i.imgur.com/vJUzTyq.png',
    alt: 'Lemon Law.site',
    href: 'https://lemonlaw.site/'
  },
  {
    name: 'loadview',
    href: 'https://www.loadview-testing.com/',
    alt: 'LoadView-Testing',
    src: 'https://i.imgur.com/iHdPKSV.png'
  },
  {
    name: 'ui-ux-design-agencies',
    href: 'https://uxplanet.org/top-ui-ux-design-agencies-user-experience-firms-8c54697e290',
    src: 'https://i.imgur.com/H1PtPJh.png',
    alt: 'UX Planet'
  },
  {
    name: 'bonuslan',
    href: 'https://bonuslaan.dk/',
    src: 'https://i.imgur.com/GSRW8gK.png',
    alt: 'Bonuslån'
  },
  {
    name: 'official-top-5-review',
    href: 'https://www.officialtop5review.com',
    src: 'https://i.imgur.com/A4YRujZ.png',
    alt: 'The best reviews'
  },
  {
    name: 'vpngorilla-com',
    href: 'https://vpngorilla.com',
    src: 'https://i.imgur.com/y1gF5dl.png',
    alt: 'VPN Gorilla'
  },
  {
    name: 'yiannakis-ttafounas-ttafounas',
    href: 'https://bid4papers.com/write-my-essay.html',
    src: 'https://i.imgur.com/hVE7Ea3.png',
    alt: 'Bid4Papers'
  },
  {
    name: "writersperhour",
    href: "https://writersperhour.com/",
    src: "https://i.imgur.com/L8fWitE.png",
    alt: "Writers per Hour"
  },
  {
    name: "mind-doodle-ltd",
    href: "https://www.minddoodle.com/",
    src: "https://i.imgur.com/QzdhhSJ.png",
    alt: "Mind Doodle",
  },
  // soloaff
  {
    name: "ruffhero1",
    href: "https://www.ruffhero.com",
    src: "https://i.imgur.com/GEaYK3g.png",
    alt: "Ruff Hero"
  },
  {
    name: 'digital-logic',
    src: 'https://i.imgur.com/4HmKudj.jpg',
    href: 'https://www.digitallogic.co',
    alt: 'Digital Logic'
  },
  {
    name: 'crosswordsolver',
    src: 'https://i.imgur.com/JfmcXNf.png',
    href: 'https://www.crosswordsolver.com',
    alt: 'crosswordsolver.com'
  }
]

let total = 0
var d = new Date(); d.setMonth(d.getMonth() - 1);

let totalmonth = d.toISOString().slice(0, 7)

async function main() {
  const result = await Promise.all([
    query(1),
    query(2),
    query(3),
    query(4),
    query(5),
    query(6),
    query(7),
    query(8),
    query(9),
    query(10),
    query(11),
    query(12),
    query(13),
    query(14),
    query(15),
    query(16),
    query(17),
    query(18),
    query(19),
    query(20),
    query(21),
    query(22),
    query(23),
    query(24),
    query(25),
    query(26)
  ])

  let allTransactions = [].concat(...result).reverse()
  allTransactions = allTransactions.filter(t => {
    return t.fromAccount && t.toAccount
  })
  const transactions = allTransactions.filter(t => {
    return (+new Date() - +Date.parse(t.createdAt))/3600000/24 < 30 && t.amount.value
  })

  const sponsors = {}
  const supporters = {}

  for (const name in forcedsponsors) {
    const months = Math.ceil((new Date() - new Date(forcedsponsors[name].date)) / 1000 / 3600 / 24 / 30)
    const virtualtotal = months * forcedsponsors[name].price
    const transaction = {
      type: 'CREDIT',
      kind: 'VIRTUAL',
      createdAt: forcedsponsors[name].date,
      amount: {
        value: virtualtotal,
        currency: 'USD'
      },
      fromAccount: {
        slug: name,
        name: name
      },
      toAccount: {
        slug: 'bower',
        name: 'Bower'
      }
    }
    transactions.push(transaction)
    allTransactions.push(transaction)
  }

  allTransactions.forEach(t => { if (t.type === 'DEBIT') { t.fromAccount = t.toAccount } })
  transactions.forEach(t => { if (t.type === 'DEBIT') { t.fromAccount = t.toAccount } })

  allTransactions.forEach(t => {
    if (ignoredsupporters.includes(t.fromAccount.slug)) {
      return
    }
    if (t.amount.value > 0) {
      if (t.createdAt.slice(0, 7) == totalmonth && t.kind !== 'VIRTUAL') {
        total += t.amount.value
      }
      if (t.amount.value >= 100 && !forcedsupporters.includes(t.fromAccount.slug)) {
        sponsors[t.fromAccount.slug] = Math.max(
          sponsors[t.fromAccount.slug] || 0,
          Date.parse(t.createdAt) + Math.floor(t.amount.value / 100) * 1000 * 3600 * 24 * 31
        )
      } else if (t.amount.value >= 50) {
        supporters[t.fromAccount.slug] = Math.max(
          supporters[t.fromAccount.slug] || 0,
          Date.parse(t.createdAt) + Math.floor(t.amount.value / 50) * 1000 * 3600 * 24 * 31
        )
      }
    } else {
      if (sponsors[t.fromAccount.slug]) {
        if (sponsors[t.fromAccount.slug] > 0) {
          console.log('Refund from sponsor ' + t.fromAccount.slug + ": " + t.amount.value)
          if (t.createdAt.slice(0, 7) == totalmonth && t.kind !== 'VIRTUAL') {
            total += t.amount.value
          }
        }
        sponsors[t.fromAccount.slug] -= Math.floor(Math.abs(t.amount.value) / 100) * 1000 * 3600 * 24 * 31
      }

      if (supporters[t.fromAccount.slug]) {
        if (supporters[t.fromAccount.slug] > 0) {
          console.log('Refund from supporter ' + t.fromAccount.slug + ": " + t.amount.value)
        }
        supporters[t.fromAccount.slug] -= Math.floor(Math.abs(t.amount.value) / 100) * 1000 * 3600 * 24 * 31
      }
    }
  })

  sponsors['top5credits-com-fi'] += 1000 * 3600 * 24 * 31
  sponsors['vpn-review-com'] += 1000 * 3600 * 24 * 31
  sponsors['faveable'] += 1000 * 3600 * 24 * 7

  Object.keys(sponsors).forEach(k => {
    if (sponsors[k]+1000*3600*24*16 < Date.now() && !exceptions.includes(k)) {
      const lastTransaction = allTransactions.reverse().find(t => t.fromAccount.slug === k).createdAt
      if (lastTransaction >= '2019-10') {
        console.log('Expired sponsor: ' + k + ' at ' + new Date(sponsors[k]).toString().slice(4, 16) + ' ' + lastTransaction.slice(0, 10) )
      }
      delete sponsors[k]
    }
  })

  console.log('')
  Object.keys(supporters).forEach(k => {
    if (supporters[k]+1000*3600*24*16 < Date.now() && !exceptions.includes(k)) {
      const lastTransaction = allTransactions.reverse().find(t => t.fromAccount.slug === k).createdAt
      if (lastTransaction >= '2019-10') {
        console.log('Expired supporter: ' + k + ' at ' + new Date(supporters[k]).toString().slice(4, 16) + ' ' + lastTransaction.slice(0, 10) )
      }
      delete supporters[k]
    }
  })


  Object.keys(sponsors).map(t => ({
    name: t,
    total: allTransactions.filter(t2 => t2.fromAccount.slug == t).reduce((sum, t) => sum += t.amount.value, 0)
  })).sort((a, b) => b.total - a.total).forEach(t => {
    const sponsor = data.find(d => d.name === t.name)
    if (!sponsor) {
      if (['meubelpartner'].includes(t.name)) {
        return
      } else {
        throw new Error('Unknown sponsor: ' + t.name)
      }
    }
    SPONSORS += `<a href="${sponsor.href}"><img class="sidebar-logo" src="${sponsor.src}" alt="${sponsor.alt}" /></a>\n`
    if (sponsor.second) {
      for (const s of sponsor.second) {
        if (sponsor.href) {
          SPONSORS += `<a href="${s.href}"><img class="sidebar-logo" src="${s.src}" alt="${s.alt}" /></a>\n`
        }
      }
    }
  })

  console.log("\nSUPPORTERS\n")
  Object.keys(supporters).map(t => ({
    name: t,
    total: allTransactions.filter(t2 => t2.fromAccount.slug == t).reduce((sum, t) => sum += t.amount.value, 0)
  })).sort((a, b) => [b.total - a.total, a.text,b.text]).forEach(t => {
    const sups = datasup.filter(d => d.name === t.name)
    if (!sups.length) {
      throw new Error('Unknown supporter: ' + t.name)
    }
    sups.forEach(sup => {
      if (sup.href) {
        SUPPORTERS += `<a href="${sup.href}">${sup.text}</a> |\n`
      }
      if (sup.second) {
        for (const s of sup.second) {
          if (s.href) {
            SUPPORTERS += `<a href="${s.href}">${s.text}</a> |\n`
          }
        }
      }
    })
  })

  SUPPORTERS = SUPPORTERS.slice(0, -3)

  let tmpl = fs.readFileSync('_layouts/docs.template.html', 'utf-8')
  tmpl = tmpl.replace('<Sponsors>', SPONSORS)
  tmpl = tmpl.replace('<Supporters>', SUPPORTERS)
  fs.writeFileSync('_layouts/docs.html', tmpl)

  // transactions.filter(t => t.amount.value >= 100).map(t => ({
  //   name: t.fromAccount.slug,
  //   total: allTransactions.filter(t2 => t2.fromAccount.slug == t.fromAccount.slug).reduce((sum, t) => sum += t.amount.value, 0)
  // })).sort((a, b) => b.total - a.total)
  //
  // transactions.filter(t => t.amount.value < 100 && t.amount.value >= 50).map(t => ({
  //   name: t.fromAccount.slug,
  //   total: allTransactions.filter(t2 => t2.fromAccount.slug == t.fromAccount.slug).reduce((sum, t) => sum += t.amount.value, 0)
  // })).sort((a, b) => b.total - a.total)
  console.log('TOTAL this month: ' + total)
}

main()
