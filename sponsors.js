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
    transactions(limit: 2000, type: CREDIT) {
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
      }
    }
  }
}
      `
    })
  })
}

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
  }
]

async function main() {
  const response = await query()
  const allTransactions = (await response.json()).data.account.transactions.nodes
  const transactions = allTransactions.filter(t => (+new Date() - +Date.parse(t.createdAt))/3600000/24 < 30 && t.amount.value)

  const sponsors = {}
  const supporters = {}

  allTransactions.forEach(t => {
    if (t.amount.value >= 100) {
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
  })

  sponsors['monovm'] += 1000 * 3600 * 24 * 31

  Object.keys(sponsors).forEach(k => {
    if (sponsors[k] < Date.now()) {
      console.log('Expired sponsor: ' + k + ' at ' + new Date(sponsors[k]).toString().slice(4, 16))
      delete sponsors[k]
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
    console.log(`<a href="${sponsor.href}"><img width="200" class="sidebar-logo" src="${sponsor.src}" alt="${sponsor.alt}" /></a>`)
  })

  Object.keys(supporters).forEach(k => {
    if (supporters[k] < Date.now()) {
      console.log('Expired supporter: ' + k + ' at ' + new Date(supporters[k]).toString().slice(4, 16))
      delete supporters[k]
    } else {
      console.log('Supporting ' + k)
    }
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
