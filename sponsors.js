// TODO: lead supply is charged for 3x logos since Oct 2019

const fetch = require('cross-fetch')
const fs = require('fs')

let SPONSORS = ''
let SUPPORTERS = ''

async function query() {
  const url = 'https://api.opencollective.com/graphql/v2/' + process.env.API_KEY
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `
{
  account(slug: "bower") {
    transactions(limit: 2000) {
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
}

const forcedsponsors = {
  '1gbits': {
      price: 150,
      date: '2019-10-30'
  }
}

const forcedsupporters = ['upendra-rathore']
const ignoredsupporters = ['rocketpayz', 'webton-bv', 'casinotop-com']

const datasup = [
  {
    name: 'snabblan',
    href: 'https://fair-laan.se/',
    text: 'Fair Lån SE'
  },
  {
    name: 'lan-penge1',
    href: 'https://superkredit.net/',
    text: 'Super Kredit'
  },
  {
    name: 'lan',
    href: 'https://fair-laan.dk/laan-penge/',
    text: 'Fair Lån DK'
  },
  {
    name: 'moneylender-dk-lan-penge',
    href: 'https://moneylender.dk/',
    text: 'Moneylender.dk'
  },
  {
    name: 'withnellcarsales',
    href: 'https://www.withnellcarsales.com',
    text: 'Withnell Car Sales',
  },
  {
    name: 'ebook-digesters',
    href: 'http://www.ebdigest.org/',
    text: 'ebdigest.org'
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
    href: 'http://hillside-primary.co.uk',
    text: 'Hillside-Primary.co.uk'
  },
  {
    name: 'thepiratebay',
    href: 'https://thepiratebayproxylist.se',
    text: 'The Pirate Bay Proxy List',
  }
]

const data = [
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
    href: 'https://uiuxagencies.top',
    src: 'https://i.imgur.com/mQxmvRm.png',
    alt: 'ux design companies'
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
    href: 'https://www.digitallogic.co/blog/dental-marketing/',
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
let totalmonth = "2019-11"

async function main() {
  const response = await query()
  const allTransactions = (await response.json()).data.account.transactions.nodes.reverse()
  const transactions = allTransactions.filter(t => (+new Date() - +Date.parse(t.createdAt))/3600000/24 < 30 && t.amount.value)

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
  console.log(transactions)

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

  sponsors['monovm'] += 1000 * 3600 * 24 * 31
  sponsors['fire-stick-how'] += 1000 * 3600 * 24 * 31

  Object.keys(sponsors).forEach(k => {
    if (sponsors[k] < Date.now()) {
      console.log('Expired sponsor: ' + k + ' at ' + new Date(sponsors[k]).toString().slice(4, 16))
      delete sponsors[k]
    }
  })

  Object.keys(supporters).forEach(k => {
    if (supporters[k] < Date.now()) {
      console.log('Expired supporter: ' + k + ' at ' + new Date(supporters[k]).toString().slice(4, 16))
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
        SPONSORS += `<a href="${s.href}"><img class="sidebar-logo" src="${s.src}" alt="${s.alt}" /></a>\n`
      }
    }
  })

  console.log(sponsors)
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
      SUPPORTERS += `<a href="${sup.href}">${sup.text}</a> |\n`
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
