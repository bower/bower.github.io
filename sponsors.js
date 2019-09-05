const fetch = require('cross-fetch')

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

const forcedsupporters = ['upendra-rathore']

const datasup = [
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
    href: 'https://superkredit.net/',
    text: 'SuperKredit'
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
    name: 'upendra-rathore',
    href: 'https://www.avenue-south-residence.com.sg/',
    text: 'Avenue South Residence'
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
  }
]

const data = [
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
    href: 'https://www.utilitysavingexpert.com/energy/',
    alt: 'energy comparison'
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
  }
]

async function main() {
  const response = await query()
  const allTransactions = (await response.json()).data.account.transactions.nodes.reverse()
  const transactions = allTransactions.filter(t => (+new Date() - +Date.parse(t.createdAt))/3600000/24 < 30 && t.amount.value)

  const sponsors = {}
  const supporters = {}

  allTransactions.forEach(t => { if (t.type === 'DEBIT') { t.fromAccount = t.toAccount } })
  transactions.forEach(t => { if (t.type === 'DEBIT') { t.fromAccount = t.toAccount } })

  allTransactions.forEach(t => {
    if (t.fromAccount.slug === 'upendra-rathore') {
      console.log(t)
    }
    if (t.amount.value > 0) {
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
      console.log('Refund from sponsor ' + t.fromAccount.slug)
      if (sponsors[t.fromAccount.slug]) {
        sponsors[t.fromAccount.slug] -= Math.floor(Math.abs(t.amount.value) / 100) * 1000 * 3600 * 24 * 31
      }

      if (supporters[t.fromAccount.slug]) {
        console.log('Refund from supporter ' + t.fromAccount.slug)
        supporters[t.fromAccount.slug] -= Math.floor(Math.abs(t.amount.value) / 100) * 1000 * 3600 * 24 * 31
      }
    }
  })

  sponsors['monovm'] += 1000 * 3600 * 24 * 31

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
    console.log(`<a href="${sponsor.href}"><img class="sidebar-logo" src="${sponsor.src}" alt="${sponsor.alt}" /></a>`)
  })

  console.log("\nSUPPORTERS\n")
  Object.keys(supporters).map(t => ({
    name: t,
    total: allTransactions.filter(t2 => t2.fromAccount.slug == t).reduce((sum, t) => sum += t.amount.value, 0)
  })).sort((a, b) => b.total - a.total).forEach(t => {
    const sups = datasup.filter(d => d.name === t.name)
    if (!sups.length) {
      throw new Error('Unknown supporter: ' + t.name)
    }
    sups.forEach(sup => {
      console.log(`<a href="${sup.href}">${sup.text}</a> | `)
    })
  })


  // transactions.filter(t => t.amount.value >= 100).map(t => ({
  //   name: t.fromAccount.slug,
  //   total: allTransactions.filter(t2 => t2.fromAccount.slug == t.fromAccount.slug).reduce((sum, t) => sum += t.amount.value, 0)
  // })).sort((a, b) => b.total - a.total)
  //
  // transactions.filter(t => t.amount.value < 100 && t.amount.value >= 50).map(t => ({
  //   name: t.fromAccount.slug,
  //   total: allTransactions.filter(t2 => t2.fromAccount.slug == t.fromAccount.slug).reduce((sum, t) => sum += t.amount.value, 0)
  // })).sort((a, b) => b.total - a.total)
}

main()
