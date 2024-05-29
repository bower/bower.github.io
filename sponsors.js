const fetch = require('cross-fetch')
const fs = require('fs')
const { groupBy } = require('lodash')

let SPONSORS = ''
let SUPPORTERS = ''

if (process.env.API_KEY == null) {
  throw new Error('API_KEY for opencollective must be set');
}

async function query(query) {
  const url = 'https://api.opencollective.com/graphql/v2/' + process.env.API_KEY
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `{ ${query} }`
    })
  })

  const json = await response.json()

  return json.data
}

async function transactions(page) {
  return (await query(`
    account(slug: "bower") {
      transactions(limit: 100, offset: ${100 * (page - 1)}) {
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
  `)).account.transactions.nodes
}

async function account(slug) {
  return (await query(`
    account(slug: "${slug}") {
      name
      website
      description
    }
  `)).account
}

async function unknown(type, name) {
  const accountData = await account(name)
  if (type === "sponsor") {
    console.log({
      name: name,
      alt: accountData.name,
      href: accountData.website,
      src: ''
    })
  } else {
    console.log({
      name: name,
      href: accountData.website,
      text: accountData.name
    })
  }
  throw new Error(`Unknown ${type}: ${name}`)
}

const forcedsponsors = {}

const forcedsupporters = ['royal-tech-ab', 'rekt-eddies-gummies']
const ignoredsupporters = ['rocketpayz', 'webton-bv', 'casinotop-com', 'upendra-rathore', 'world-of-the-casinos', 'baocasino', 'hollandsegokken-nl', 'nettcasinobonus-com1', 'bellwether-capital', 'esquire-client-solutions', 'college-paper-world', 'yevgen-yanovskyy', 'twojtyp', 'goread_io', 'nettmoro-com', 'megetnyttig-com', 'casinogaroocom', 'followerspromotion-com', 'instapromote1', 'leo-boost1', 'zenscrape', 'jean-mir', 'siwagorn', 'your-online-presence', 'guest-901a02a2', 'king10', 'riversweeps', 'igrovye-avtomaty', 'stayatcasinos', 'negativeseoexpert', 'king-billy-slots', 'vpsservercom', 'onlinecasinoua', 'probukmacher', 'kingbilly', 'cryptocasinos360-com', '888starz', 'tiktok18', 'aviator-gamer']
const exceptions = ['digital-bank-guide', 'alex-owner']

const datasup = [
{ name: 'bountii', href: 'https://bountii.coupons/', text: 'Bountii' },
{ name: 'earthweb1', href: 'https://earthweb.com/', text: 'EarthWeb' },
{
  name: 'socialfollowersuk',
  href: 'https://www.socialfollowers.uk/',
  text: 'Social followers'
},

{
  name: 'best-crypto-futures-trading-platforms',
  href: 'https://bestcryptofuturestradingplatform.com/',
  text: 'Crypto Futures Trading Platforms'
},
{
  name: 'private-flight',
  href: 'https://www.mercuryjets.com',
  text: 'Mercury Jets'
},
{
  name: 'minneapolis-towing',
  href: 'https://minneapolistowingmn.com/',
  text: 'Minneapolis Towing'
},
{ name: 'troupon', href: 'https://www.troupon.com', text: 'Troupon' },
{
  name: 'global-software-companies',
  href: 'https://www.globalsoftwarecompanies.com/',
  text: 'Global Software Companies'
},
{
  name: 'opensource',
  href: 'https://oscollective.org/',
  text: 'Open Source Collective'
},
{
  name: 'true-altitude',
  href: 'https://truealtitude.shop/',
  text: 'True Altitude'
},
{
  name: 'richard-habulan',
  href: 'https://github.com/brownman1',
  text: 'inflation'
},
{
  name: 'jamfor-forsakringar',
  href: 'https://jamforforsakringar.se/',
  text: 'Jämför försäkringar'
},
{ name: 'slex', href: 'https://slex.io/', text: 'SLEX' },
{ name: 'upgrow', href: 'https://www.upgrow.com/', text: 'UpGrow' },
{
  name: 'vibelovely',
  href: 'https://vibelovely.com/',
  text: 'VibeLovely'
},
{
  name: 'cloudsmith',
  href: 'https://cloudsmith.com',
  text: 'Cloudsmith'
},
{
  name: 'basement-flood-helpers',
  href: 'https://basementfloodhelpers.com',
  text: 'Basement Flood Helpers'
},
{
  name: 'fire-stick-tricks',
  href: 'https://www.firesticktricks.com',
  text: 'Fire Stick Tricks'
},
{ name: 'anony', href: 'https://iganony.net/', text: 'IgAnony' },
{
  name: 'ig-story-viewer',
  href: 'https://anonstories.com/',
  text: 'Instagram Story Viewer'
},
{
  name: 'rekt-eddies-gummies',
  href: 'https://rekteddies.com/',
  text: "Rekt Eddie's"
},
{
  name: 'swap-eth-usdt',
  href: 'https://slex.io/es/trade/ethusdt',
  text: 'ETH/USDT'
},
{
  name: 'crescitaly',
  href: 'https://crescitaly.com',
  text: 'Crescitaly'
},
{
  name: 'self-starters',
  href: 'https://self-starters.com/',
  text: 'Self-Starters'
},
{
  name: 'ozturkismak',
  href: 'https://www.ozturkismakinalari.com/en/komatsu/',
  text: 'Spare Parts'
},
{
  name: 'minneapolis-roofing-pros',
  href: 'https://www.minneapolisroofingpros.com',
  text: 'Minneapolis Roofing Contractor'
},
{
  name: 'ic-designs-ca',
  href: 'https://ic-designs.ca/windows-replacement-calgary/',
  text: 'IC-Designs Canada'
},
{ name: 'mobilennu', href: 'https://mobilen.nu/', text: 'Mobilen.nu' },
{ name: 'rantentcom', href: 'https://rantent.com/', text: 'Rantent' },
{
  name: 'easeus-sofware-german',
  href: 'https://www.easeus.de/',
  text: 'EaseUS Germany'
},
{
  name: 'james-roy',
  href: 'https://identor.com/',
  text: 'People Search'
},
{
  name: 'tank-coffee',
  href: 'https://www.tankcoffee.com',
  text: 'Tank Coffee'
},
{
  name: 'window-seal-west',
  href: 'https://windows-west.ca/',
  text: 'Window Seal West'
},
{
  name: 'technologypep',
  href: 'https://technologypep.com/',
  text: 'TechnologyPep'
},
{
  name: 'bestvpndeals2',
  href: 'https://bestvpndeals.com/',
  text: 'BestVPNDeals'
},
{ name: 'uclan', href: 'https://www.lanuc.se', text: 'UCLån' },
{ name: 'likvid', href: 'https://www.likvid.nu/', text: 'Likvid' },
{ name: 'telefonen', href: 'https://telefonen.nu/', text: 'Telefonen' },
{
  name: 'snabblanutanuc',
  href: 'https://www.snabblanutanuc.se/',
  text: 'SnabbLånUtanUC'
},
{
  name: 'bathroom-remodeling-westerville',
  href: 'https://www.bathroomremodelingwesterville.com',
  text: 'Bathroom Remodeling Westerville'
},
{
  name: 'digitbitz',
  href: 'https://digitbitz.com/',
  text: 'DigitBitz'
},
  { name: 'refermate-com', href: 'https://www.refermate.com', text: 'Refermate' },
{ name: 'seo-tips', href: 'https://seotips.nu', text: 'SEO Tips' },
{
  name: 'good-core',
  href: 'https://www.goodcore.co.uk/',
  text: 'Good Core Software'
},
  {
    name: 'lbmexico',
    href: 'https://linkbuildingmexico.com',
    text: 'lbmexico'
  },
  {
    name: 'tankpengedk',
    href: 'https://tankpenge.dk',
    text: 'Per Andersen'
  },
  { name: 'istartips', href: 'https://pillarwm.com/best-wealth-management-firms/', text: 'Best Wealth Management Firms' },
  { name: 'windowstips', href: 'https://windowstips.nu', text: 'Windowstips' },
  { name: 'pillarwm1', href: 'https://pillarwm.com/best-wealth-management-firms/', text: 'Best Wealth Management Firms' },
  { name: 'mister-auto', href: 'https://www.mister-auto.com/', text: 'Mister Auto' },
  { name: 'nfl', href: 'https://nfl.nu', text: 'NFL' },
  { name: 'awisee', href: 'https://awisee.com', text: 'AWISEE' },
  { name: 'awisee-agency', href: 'https://awisee.agency', text: 'AWISEE AGENCY' },
  { name: 'hesgoal', href: 'https://HesGoal.nu', text: 'HesGoal' },
  { name: 'fotbollen', href: 'https://fotbollen.nu', text: 'Fotbollen' },
  { name: 'nba', href: 'https://nba.nu', text: 'NBA' },
  { name: 'restipset', href: 'https://restips.nu', text: 'Restips' },
  { name: 'mightch', href: 'https://might.ch', text: 'Might' },
  { name: 'awise', href: 'https://awise.se', text: 'AWISE' },
  { name: 'seolegalbet', href: 'https://legalbet.uk/', text: 'Legalbet' },
  { name: 'digital-solomo', href: 'https://digitalsolomo.com/', text: 'Digital SoLoMo' },
  { name: 'dreamtechstore', href: 'https://dreamtechstore.com/', text: 'DreamTechStore' },
  { name: 'livingfeeds', href: 'https://livingfeeds.com', text: 'LivingFeeds' },
  { name: 'streamints', href: 'https://streamints.com/', text: 'Streamints' },
  { name: 'intexsoft-ecommerce-dev', href: 'https://intexsoft.com/ecommerce-development-services/', text: 'Intexsoft' },
  { name: 'ror-consulting', href: 'https://rubyroidlabs.com/services/consulting', text: 'Ruby on Rails Consulting: Rubyroidlabs' },
  { name: 'buglelab', href: 'https://buglelab.io', text: 'BugleLab' },
  { name: 'arkiraha', href: 'https://www.arkiraha.fi/', text: 'Arkiraha' },
  { name: 'christian-healthcare-ministries', href: 'https://sharehealthcare.com', text: 'Christian Healthcare Ministries' },
  { name: 'realspyapps', href: 'https://realspyapps.com/', text: 'RealSpyApps' },
  { name: 'matthew-chalk1', href: 'https://sprocketdigital.co.nz/', text: 'Sprocket Digital' },
  { name: 'central-va-insulation', href: 'https://www.centralvainsulation.com', text: 'Richmond Insulation' },
  { name: 'user-ff71c9b7', href: 'https://www.edwinsedibles.com', text: 'CBD Gummies' },
  { name: 'ibeesoftsoftware', href: 'https://www.ibeesoft.com/', text: 'iBeesoft' },
  { name: 'the-lock-pro', href: 'https://thelockpro.com/', text: 'The Lock Pro' },
  { name: 'jltlawandmediation', href: 'https://www.jltlawoffice.com/', text: 'Minnesota Child Protection Attorney' },
  { name: 'bestforandroid', href: 'https://bestforandroid.com/', text: 'BestForAndroid' },
  { name: '420-hubs', href: 'https://420hubs.com/', text: '420HUBS.COM' },
  { name: 'global-gsm-control', href: 'https://www.global-gsm-control.com/', text: 'Global GSM Control' },
  { name: 'iBoysoft', href: 'https://iboysoft.com/', text: 'iBoysoft' },
  { name: 'my-sports-injury-ltd', href: 'https://www.mysportsinjury.co.uk/', text: 'My Sports Injury Ltd' },
  { name: 'graphcommerce', href: 'https://www.graphcommerce.org/', text: 'GraphCommerce' },
  { name: 'kafidoff-vasy', href: 'https://kafidoff.com/', text: 'Vasyl Kafidov' },
  { name: 'fortnite-mod-apk', href: 'https://modapksource.com/game/fortnite-mod-apk/', text: 'Fortnite Mod Apk' },
  { name: 'drafthound-com', href: 'https://www.drafthound.com/', text: 'Drafthound.com' },
  { name: 'drafthound', href: 'https://www.drafthound.com/', text: 'Drafthound.com' },
  { name: 'shipthedeal', href: 'https://shipthedeal.com/', text: 'ShipTheDeal' },
  { name: 'guest-0b57b3c8', href: 'https://www.richmondconcretepros.com/', text: 'Richmond Concrete' },
  { name: 'leading-edge-marketing', text: 'Leading Edge Marketing', href: 'https://securitygladiators.com/' },
  { name: 'bejamas', text: 'Bejamas', href: 'https://bejamas.io/' },
  { name: 'qulixsystems', text: 'Qulix Systems', href: 'https://www.qulix.com/' },
  { name: 'quickbooks-error-codes', text: 'CFI Blog', href: 'https://cfi-blog.org' },
  { name: 'techbuy1', text: 'TechBuy', href: 'https://www.techbuy.in/' },
  { name: 'guest-2fbff284', text: 'Minnesota Child Protection Attorney', href: 'https://jltlawoffice.com/' },
  { name: 'glassesonweb', href: 'https://www.glassesonweb.com/', text: 'GlassesOnWeb.com' },
  { name: 'messaged', text: 'Messaged', href: 'https://messaged.com/' },
  { name: 'celltrackingapps', href: 'https://celltrackingapps.com/', text: 'celltrackingapps.com' },
  { name: 'door-design-lab', href: 'https://doordesignlab.com/', text: 'Door Design Lab' },
  { name: 'plumbing-news-and-more', href: 'https://www.plumbingnewsandmore.com/', text: 'Plumbing News and More' },
  { name: 'belldinni-inc', href: 'https://belldinni.com/', text: 'Belldinni Inc' },
  { name: 'jessica-shee', href: 'https://iboysoft.com/', text: 'iBoysoft' },
  { name: 'coupontoaster', href: 'https://coupontoaster.com/', text: 'Coupontoaster' },
  { name: 'qualityonesie', href: 'https://www.qualityonesie.com', text: 'Quality Onesie' },
  { name: 'java-burn', href: 'https://www.dallasobserver.com/storyhub/java-burn-reviews', text: 'java burn' },
  { name: 'quickbooks-file-doctor', href: 'https://quickbooksfiledoctor.co/', text: 'Quickbooks File Doctor' },
  { name: 'security-gladiators', href: 'https://securitygladiators.com/', text: 'Security Gladiators'  },
  { name: 'lifedigitalwiki', href: 'https://lifedigitalwiki.org/ja/vpn/', text: 'LifeDigital' },
  { name: 'veepn-vpn', href: 'https://veepn.com/vpn-apps/vpn-for-chrome/', text: 'VeePN VPN' },
  { name: 'nasrullah-amir-ali1', href: 'https://besturate.com/unblock-netflix-vpns/', text: 'Netflix VPN' },
  { name: 'fresno-landscapers', href: 'https://www.fresnolandscapers.org/', text: 'Fresno Landscapers' },
  { name: 'denis14', href: 'https://vpntesting.com', text: 'VPN Testing' },
  { name: 'ghostbed-reviews', href: 'https://apnews.com/article/business-furniture-and-home-furnishings-manufacturing-corporate-news-household-product-manufacturing-industrial-products-and-services-2177fc8237a457d51e6bc72bb76bb2f1', text: 'Ghostbed Reviews' },
  { name: 'webwhip', href: 'https://medium.com/webwhip/reliable-registrars-to-buy-domain-name-from-833dcda09df8', text: 'WebWhip' },
  { name: 'mohammad-ali1', href: 'https://hostnoc.com/', text: 'Cheap Dedicated Servers' },
  { name: 'martinijan-trajkovski', href: 'https://wordscapesmate.com/', text: 'Wordscapes Mate' },
  { name: 'emmanuel-orta', href: 'https://www.theworldwidedirectory.com/', text: 'The Worldwide Directory' },
  { name: 'joe-kizlauskas', href: 'https://www.wallaceperformance.co.uk/', text: 'Wallace Performance' },
  { name: 'cyberogism', href: 'https://cyberogism.com/', text: 'Cyberogism' },
  { name: 'bitvape', href: 'https://bitvape.com.au/', text: 'Bitvape' },
  { name: 'storiesdown', href: 'https://storiesdown.com/', text: 'StoriesDown' },
  { name: 'clouddevs', href: 'https://clouddevs.com', text: 'CloudDevs' },
  { name: 'delistproduct', href: 'https://delistproduct.com/', text: 'DeListProduct' },
  { name: 'howtohostingguide', href: 'https://howtohosting.guide/', text: 'HowToHostingGuide' },
  { name: 'privacy-end', href: 'https://www.privacyend.com/', text: 'Privacyend' },
  { name: 'firestick-blog', href: 'https://firestickblog.com/', text: 'Firestick blog' },
  { name: 'betacalendars', href: 'https://www.betacalendars.com/march-calendar.html', text: 'Beta Calendars' },
  { name: 'appdrawn', href: 'https://www.appdrawn.com/', text: 'AppDrawn' },
  { name: 'ann-arbor-carpet-and-floors', href: 'http://www.aacarpetandfloors.com/', text: 'Ann Arbor Carpet and Floors' },
  { name: 'awiseads', href: 'https://awisee.com/', text: 'Awisee' },
  { name: 'vpn-service3', href: 'https://www.vpnservice.com/free-vpn/', text: 'Best Free VPN' },
  { name: 'conexion-vpn', href: 'https://vpnconexion.es', text: 'Mejor VPN' },
  { name: 'vpn-connexion', href: 'https://vpnconnexion.fr', text: 'VPN Connexion' },
  { name: 'filmer', href: 'https://filmer.nu', text: 'Filmer.nu' },
  { name: 'boekonomi-se', href: 'https://boekonomi.se', text: 'boekonomi.se' },
  { name: 'pngio', href: 'https://pngio.com/png', text: 'PNGio' },
  { name: 'thevpnbyte', href: 'https://s3.amazonaws.com/nordvpn-3-year-deal-plan/index.html', text: 'NordVpn Coupon' },
  { name: 'fortunegames', href: 'https://fortunegames.com/', text: 'Fortune Games' },
  { name: 'quickbooks-tool-hub', href: 'https://quickbookstoolhub.com/', text: 'Quickbooks Tool Hub'  },
  { name: 'hurtiglaan-nu', text: 'Hurtig lån', href: 'https://hurtiglaan.nu/' },
  { name: 'eric-watson', href: 'https://thestandarddaily.com/', text: 'The Standard Daily' },
  { name: 'all-smart-surveillance-for-home-and-business', href: 'https://allsmartcam.com/', text: 'Smart Surveillance' },
  { name: 'florian-studio', href: 'https://www.ceodata.com', text: 'Florian Studio' },
  { name: 'reducer', href: 'http://reducer.co.uk/', text: 'Reducer' },
  { name: 'sammenlignforbrukslan-com', href: 'https://xn--sammenlignforbruksln-f0b.com/', text: 'Sammenlignforbrukslån.com' },
  { name: 'kredittkrt-com', href: 'https://kredittkrt.com', text: 'Kredittkrt.com' },
  { name: 'grammar-check', href: 'http://grammarcheck.biz/', text: 'Grammar Check' },
  { name: 'sokbillan-com', href: 'https://xn--skbilln-jxa9n.com/', text: 'Søkbillån.com' },
  { name: 'kapil-anand', href: 'https://www.discovermagazine.com/sponsored/top-best-dating-sites-of-2020-dating-sites-apps-are-best-way-to-find', text: 'Dating Sites' },
  { name: 'julegenser-no', href: 'https://julegenser.no/', text: 'julegenser.no' },
  { name: 'idgod', href: 'https://www.idgod.dev/', text: 'IDGOD' },
  { name: 'y-106fm', href: 'https://www.y-106.com/', text: 'Y-106FM' },
  { name: 'weight-loss-promotion-codes', href: 'https://www.weightlosspromotioncodes.com/', text: 'Weight Loss Promotion Codes' },
  { name: 'solcellepaneler-com', href: 'https://solcellepaneler.com/', text: 'Solcellepaneler.com' },
  { name: 'web-pundits', href: 'https://webpundits.in/', text: 'Buy RDP' },
  { name: 'thepiratebay-proxy-list', href: 'https://thepiratebayproxylist.se/', text: 'ThePirateBay Proxy List' },
  { name: 'coupons4printing', href: 'https://www.coupons4printing.com/', text: 'Coupons4Printing' },
  { name: 'steel-bite-pro6', href: 'https://www.globenewswire.com/news-release/2020/09/16/2094882/0/en/Steel-Bite-Pro-Reviews-Groundbreaking-New-Report-on-Oral-Health-Industry.html', text: 'steel bite pro' },
  { name: 'meticore3', href: 'https://www.discovermagazine.com/sponsored/meticore-reviews-does-meticore-supplement-really-work', text: 'meticore' },
  { name: 'real-time-communications-world', href: 'https://www.realtimecommunicationsworld.com', text: 'Real Time Communications World' },
  { name: 'dpcoupon', href: 'https://www.dpcoupon.com', text: 'DPCoupon.com' },
  { name: 'gjeldsproblemer-com', href: 'https://gjeldsproblemer.com/', text: 'Gjeldsproblemer' },
  { name: 'ministry-of-freedom', href: 'https://www.theministryoffreedomreview.com', text: 'Ministry Of Freedom' },
  { name: 'scalp-micropigmentation-clinics', href: 'https://www.scalpmicropigmentationclinics.com', text: 'Scalp Micropigmentation Clinics' },
  { name: 'tjek-dating-sider', href: 'https://www.tjekdatingsider.dk/', text: 'Tjek Dating Sider' },
  { name: 'current-bitcoin-news', href: 'https://currentbitcoinnews.com/', text: 'Current Bitcoin News' },
  { name: 'argeweb1', href: 'https://www.argeweb.nl/webhosting/', text: 'argeweb' },
  { name: '123calendars', href: 'https://www.123calendars.com/', text: '123Calendars' },
  { name: 'laina-pro', href: 'https://laina.pro/', text: 'Laina.pro' },
  { name: 'coinnewsspan', href: 'https://www.coinnewsspan.com', text: 'CoinNewsSpan' },
  { name: 'talousapu', href: 'https://talousapu.fi/', text: 'Talousapu.fi' },
  { name: 'ponfish', href: 'https://www.ponfish.com', text: 'PonFish' },
  { name: 'zenscrape', href: 'https://zenscrape.com/', text: 'Zenscrape - Web Scraping API' },
  { name: 'paraphrase-tool', href: 'https://paraphrasetools.com', text: 'Paraphrase tools' },
  { name: 'butikkene-no', href: 'https://www.butikkene.no/', text: 'Butikkene.no' },
  { name: 'tierlists', href: 'https://tierlists.com/', text: 'Free Tier List Maker' },
  { name: 'credit-cards-in-norway', href: 'https://scandinavia.life/credit-cards-norway/', text: 'Credit Cards in Norway' },
  { name: 'lazy-sg', href: 'https://www.lazy.com.sg/cleaning-services', text: 'Cleaning Services' },
  { name: 'mobil-paa-afbetaling', href: 'https://mobilafbetaling.dk/', text: 'Mobil på afbetaling' },
  { name: 'troniczone', text: 'circuit design', href: 'https://www.tronicszone.com/electronic-circuit-design/' },
  { name: 'wohnungsreinigung', href: 'https://wohnungsreinigung24.ch/', text: 'Wohnungsreinigung' },
  { name: 'five-guys-plumbing-dearborn', href: 'http://www.fiveguysplumbingdearborn.com', text: 'Five Guys Plumbing Dearborn' },
  { name: 'negativeseoexpert', href: 'https://negativeseoexpert.com/', text: 'Negative SEO SERVICES' },
  { name: 'lan-penger', href: 'https://låneport.no/', text: 'Lån Penger' },
  { name: 'couponupto-com', href: 'https://www.couponupto.com', text: 'CouponUpTo' },
  { name: 'cryptomoonpress', href: 'https://cryptomoonpress.com/', text: 'CryptoMoonPress' },
  { name: 'open-apk-file', href: 'https://openapkfilez.com/', text: 'Open APK File' },
  { name: 'esquire-client-solutions', href: 'https://esquireclientsolutions.com/west-palm-beach-seo/', text: 'West Palm Beach SEO' },
  { name: 'pillarwm', href: 'https://pillarwm.com', text: 'Pillar Wealth Management' },
  { name: 'sanyo-digital1', href: 'https://sanyodigital.com/', text: 'Sanyo Digital' },
  { name: 'capitalbaynews', href: 'https://www.capitalbay.news/', text: 'Capitalbay News' },
  { name: 'wongagames', href: 'https://wongagames.co.uk/', text: 'Wonga Games' },
  { name: "tankpenge-dk", href: "https://tankpenge.dk", text: "Tankpenge.dk - Lån penge" },
  { name: 'billigzonen-dk', href: 'https://billigzonen.dk', text: 'Billigzonen.dk' },
  { name: 'rahoitustalo', href: 'https://www.rahoitustalo.fi', text: 'rahoitustalo.fi' },
  { name: 'metro-detroit-review', text: 'metrodetroitreview.com', href: 'http://www.metrodetroitreview.com' },
  { name: 'outdooranalysis', href: 'https://www.outdooranalysis.com/', text: 'www.outdooranalysis.com' },
  { name: 'cool-things-to-buy', href: 'https://coolestthingstobuy.com/', text: 'coolestthingstobuy.com' },
  { name: 'allofvacuums1', href: 'https://allofvacuums.com/', text: 'allofvacuums.com' },
  { name: 'casinomatcher-com', href: 'https://www.xn--lnasmart-9za.com/', text: 'Lånasmart.com' },
  { name: 'nordic-creative-life', href: 'https://parenthood.dk/', text: 'parenthood.dk' },
  { name: 'evohostin', href: 'https://evolution-host.com/', text: 'evolution-host.com' },
  { name: 'nordic-meal-company', href: 'https://maaltidskasser-online.dk/', text: 'maaltidskasser-online.dk' },
  { name: 'norlan-no-refinansiering', href: 'https://www.xn--norln-pra.no/refinansiering/', text: 'Norlån.no' },
  { name: 'lemon-law', href: 'https://lemonlaw.site', text: 'Lemon Law.Site' },
  { name: 'royal-tech-ab', href: 'https://www.fundfirstcapital.com', text: 'FundFirst Capital', second: [ { href: 'https://settle4cash.com', text: 'Settle4Cash' }, { href: 'https://dieting.org', text: 'Dieting.org' } ] },
  { name: 'alvenda', href: 'https://alvenda.com', text: 'alvenda.com' },
  { name: 'grammar-gang', href: 'https://grammargang.com/', text: 'grammargang.com' },
  { name: 'trivaltech', href: 'https://topsellersreview.com/', text: 'TopSellersReview' },
  { name: 'bellwether-capital', href: 'https://esquireclientsolutions.com/west-palm-beach-seo/', text: 'West Palm Beach SEO' },
  { name: 'reviewedpapa', href: 'https://reviewedpapa.com/', text: 'reviewedpapa.com' },
  { name: 'bestekredittkort', href: 'https://www.bestekredittkortet.com/', text: 'bestekredittkortet.com' },
  { name: 'all-time-list', href: 'https://alltimelist.com', text: 'alltimelist.com' },
  { name: 'forbrukslan', href: 'https://www.forbrukslån.com/', text: 'forbrukslån.com' },
  { name: 'portablebeasts', href: 'https://portablebeasts.com/', text: 'PortableBeasts' },
  { name: 'thebeastreviews', href: 'https://thebeastreviews.com/', text: 'TheBeastReviews' },
  { name: 'forexnews-world', href: 'https://www.forexnews.world/forex-brokers/', text: 'Forex Brokers' },
  { name: 'nopeustesti-fi', href: 'https://www.nopeustesti.fi', text: 'nopeustesti.fi' },
  { name: 'vpnalert', href: 'https://vpnalert.com', text: 'vpnAlert' },
  { name: 'infatica', href: 'https://infatica.io', text: 'Infatica' },
  { name: 'seed-cash-advance1', href: 'https://useed.net', text: 'Seed Cash Advance' },
  { name: 'reach-digital-agency', href: 'https://www.reachdigital.nl/', text: 'Reach Digital agency' },
  { name: 'bestvpnco', href: 'https://www.bestvpn.co', text: 'BestVPN.co' },
  { name: 'loginlockdown', href: 'https://loginlockdown.com/', text: 'Login Lockdown' },
  { name: 'chwilowki-online-1587473460664', href: 'https://chwilowkiok.pl', text: 'chwilówki online' },
  { name: 'vpn_fastest', href: 'https://fastestvpn.com/', text: 'Fastest VPN' },
  { name: 'topvpnservice', href: 'https://www.topvpnservice.com/', text: 'Top VPN Service' },
  { name: 'laina-org', href: 'https://www.laina.org/', text: 'Laina.org' },
  { name: 'vpnranks', href: 'https://www.vpnranks.com/', text: 'VPNRanks' },
  { name: 'forbrugslan', href: 'https://xn--billigeforbrugsln-orb.dk/', text: 'Forbrugslån' },
  { name: 'overhemden-com-overhemden-online', href: 'https://overhemden.com/', text: 'overhemden.com' },
  { name: 'manwoman', href: 'https://manwoman.co/pl/search/sukienki', text: 'sukienki' },
  { name: 'seowebsitetraffic-net', href: 'https://seowebsitetraffic.net/', text: 'SEO Website Traffic' },
  { name: 'intlum', href: 'https://www.intlum.com/', text: 'Intlum Technology' },
  { name: 'lendme', href: 'https://lendme.dk', text: 'LendMe' },
  { name: 'spartan-pest-control', href: 'https://spartanpestcontrol.com/', text: 'Spartan Pest Control' },
  { name: 'allan-stolc', href: 'https://nanofinans.no/', text: 'Forbrukslån' },
  { name: 'timesofcasino', href: 'https://www.coinnewsspan.com/', text: 'coinnewsspan' },
  { name: 'unitconverter', href: 'https://converter.net', text: 'Unit Converter' },
  { name: 'crossword-king', href: 'https://crosswordking.com', text: 'Crossword King' },
  { name: 'snabblan', href: 'https://fair-laan.se/', text: 'Snabblån' },
  { name: 'lan-penge1', href: 'https://superkredit.net/', text: 'Lån penge' },
  { name: 'lan', href: 'https://fair-laan.dk/laan-penge/', text: 'Lån' },
  { name: 'moneylender-dk-lan-penge', href: 'https://moneylender.dk/', text: 'Moneylender.dk - Lån penge' },
  { name: 'withnellcarsales', href: 'https://www.withnellcarsales.com', text: 'Withnell Car Sales' },
  { name: 'partition-wizard', href: 'https://www.partitionwizard.com', text: 'Partition Wizard' },
  { name: 'vpn-black-friday', href: 'https://vpnblackfriday.com/', text: 'VPN Black Friday' },
  { name: 'antoine-reveillon', href: 'https://opencollective.com/antoine-reveillon', text: 'Antoine Réveillon' },
  { name: 'pinkelephant', href: 'https://akasse-fagforening.dk/', text: 'a-kasse' },
  { name: 'varlam-ahekian', href: 'https://opencollective.com/varlam-ahekian', text: 'Varlam Ahekian' },
  { name: 'theme-divi', href: 'http://wptheme.fr/theme-wordpress-divi/', text: 'Theme Divi' },
  { name: 'top-web-design-agencies', href: 'https://medium.com/@niksundin/best-web-design-companies-1872e445775f', text: 'Top Web Design Agencies' },
  { name: 'sokbillan-no', href: 'https://xn--skbilln-jxa9n.no/', text: 'Søkbillån.no' },
  { name: 'billigproteinpulver-com', href: 'https://billigproteinpulver.com/', text: 'Billigproteinpulver' },
  { name: 'moneypug', href: 'https://moneypug.co.uk/', text: 'Money Pug' },
  { name: 'worthwagon', href: 'https://www.worthwagon.com/', text: 'worthwagon' },
  { name: 'folkelaanetdk', href: 'https://folkelaanet.dk/', text: 'folkelaanet.dk' },
  { name: 'fire-stick-how', href: 'https://www.firestickhow.com/', text: 'Fire Stick How' },
  { name: 'finance-media-aps', href: 'https://kikster.com/', text: 'Kikster' },
  { name: 'cryptonewsz', href: 'https://www.cryptonewsz.com', text: 'CryptoNewsZ' },
  { name: 'gorilla-sports-as', href: 'https://gorillasports.no/', text: 'Gorilla Sports' },
  { name: 'kredittkrt-no', href: 'https://kredittkrt.no/', text: 'Kredittkrt' },
  { name: 'brillz', href: 'https://brillz.no/', text: 'Brillz' },
  { name: 'dirgeobiz', href: 'https://swiindex.com/', text: 'swiindex.com' },
  { name: 'kassekredittendk', href: 'https://kassekreditten.dk/', text: 'Kassekreditten' },
  { name: 'canada1', href: 'https://www.canadadrugsdirect.com', text: 'Canadadrugsdirect' },
  { name: 'kryptoportal', href: 'https://www.kryptoportal.pl', text: 'KryptoPortal.pl' },
  { name: 'minitool-software-ltd', href: 'https://www.minitool.com', text: 'MiniTool' },
  { name: 'dawid-seo', href: 'https://ktmh.pl', text: 'KTMH' },
  { name: 'dcsl-software', href: 'https://www.dcsl.com/', text: 'DCSL Guidesmiths' },
  { name: 'nenciu-valentin-vmn-marketing-srl', href: 'https://handyortenapp.de/', text: 'handyortenapp.de' },
  { name: 'ip2location', href: 'https://www.ip2location.com', text: 'IP2Location' },
  { name: 'upendra-rathore', href: 'https://www.parc-canberra.com.sg/', text: 'Parc Canberra' },
  { name: 'upendra-rathore', href: 'https://spartanpestcontrol.com/', text: 'Calgary Pest Control' },
  { name: 'switchvpn', href: 'https://switchvpn.net', text: 'SwitchVPN' },
  { name: 'best-shark-tank-products', href: 'https://www.bestsharktankproducts.com', text: 'Best Shark Tank Products' },
  { name: 'piratebay', href: 'https://piratebay.ink', text: 'Pirate Bay Proxy List' },
  { name: 'coffee-corner', href: 'https://coffeecorner.com', text: 'Coffee Corner' },
  { name: 'baby-jumper-hub', href: 'https://www.bestbabyjumperhub.com/', text: 'Best Baby Jumper Hub' },
  { name: 'moneezy', href: 'https://moneezy.com/', text: 'Moneezy' },
  { name: 'steffen-boskma', href: 'https://www.energie-vergelijken.net/', text: 'Energie vergelijken' },
  { name: 'lan-penge', href: 'https://moneybanker.dk/laan-penge/', text: 'Lån penge' },
  { name: 'geraldine-oxenham', href: 'https://opencollective.com/geraldine-oxenham', text: 'Geraldine Oxenham' },
  { name: 'hypnoswellbeing', href: 'https://www.hypnoswellbeing.com/', text: 'Hypnos Wellbeing' },
  { name: 'collectiveray', href: 'https://www.collectiveray.com', text: 'CollectiveRay' },
  { name: 'banksecrets', href: 'https://www.banksecrets.eu/da/laan-penge/kviklaan/', text: 'Kviklån' },
  { name: 'moneyarcher', href: 'https://moneyarcher.com/de/', text: 'Money Archer' },
  { name: 'writersperhour', href: "https://writersperhour.com/", text: "Writers per Hour" },
  { name: 'namecoinnews', href: 'https://www.namecoinnews.com/', text: "NameCoinNews" },
  { name: 'link-directory', href: 'https://www.directory.net', text: 'Link Directory' },
  { name: 'himanshu-ojha', href: 'https://opencollective.com/himanshu-ojha', text: 'Himanshu Ojha' },
  { name: 'purvik-shah', href: 'https://opencollective.com/purvik-shah', text: 'Purvik Shah' },
  { name: 'instalguru', href: 'https://instalguru.com/pl', text: 'Instalguru' },
  { name: 'divi-theme', href: 'http://wptheme.fr/theme-wordpress-divi/', text: 'Divi' },
  { name: 'alex-owner', href: 'https://www.w5recruitment.co.uk', text: 'W5Recruitment.co.uk' },
  { name: 'thepiratebay', href: 'https://thepiratebayproxylist.se', text: 'The Pirate Bay Proxy List' },
  { name: 'best-guitar-under', text: 'Best Guitar Under', href: 'https://bestguitarunder.com/' },
  { name: 'kviklaan-nu', text: 'kviklån', href: 'https://kviklaan.nu/kviklaan/' },
  { name: 'dinero_no', href: 'https://dinero.no/forbrukslan/', text: 'Dinero Forbrukslån' },
  { name: 'incognito-2aad9379', href: 'https://www.sahkotyotespoo.fi', text: 'Sähkömies Espoo' },
  { name: 'sammenlignforbrukslan-no', href: 'https://xn--sammenlignforbruksln-f0b.no/', text: 'Sammenlign Forbrukslån' },
  { name: 'zipcodes', href: 'https://zipcodes.org', text: 'ZipCodes.org' },
  { name: 'proven1', href: 'https://apnews.com/2b9faf69b5bab5132d4f1f34a503e6f4', text: 'ProVen' },
  { name: 'norske-kredittkort-com', href: 'https://norske-kredittkort.com/', text: 'Norske-kredittkort.com' },
  { name: 'solbriller-com', href: 'https://solbriller.com/', alt: 'Solbriller.com' },
  { name: 'kviseguiden-com', href: 'https://kviseguiden.com/', alt: 'Kviseguiden.com' }
]

const data = [
{
  name: 'wekrypto',
  alt: 'WeKrypto',
  href: 'https://wekrypto.co',
  src: 'https://i.imgur.com/5I1aWa2.png'
},
{
  name: 'webpundits',
  alt: 'Buy RDP online from Web Pundits',
  href: 'https://webpundits.in',
  src: 'https://i.imgur.com/IVgnquz.png'
},
{
  name: 'kayakstore',
  alt: 'Kayakstore',
  href: 'https://kayakstore.se',
  src: 'https://i.imgur.com/KK5WCPt.png'
},
{
  name: 'cryptonewsz',
  alt: 'CryptoNewsZ',
  href: 'https://www.cryptonewsz.com/',
  src: 'https://i.imgur.com/sYNDuyj.png'
},
  { name: 'guest-5d8ab1af', href: 'https://bitlaunch.io/', alt: 'Bitcoin VPS', src: 'https://i.imgur.com/pJ8u9sq.png' },
  { name: 'seolegalbet', alt: 'Legalbet', href: 'https://legalbet.uk/', src: 'https://i.imgur.com/2qQ6Gxf.png' },
  { name: 'tradingwolf1', alt: 'Trading Wolf', href: 'https://www.tradingwolf.com', src: 'https://i.imgur.com/vsXnDlr.png' },
  { name: 'mindmappro', alt: 'Mind Map Pro', href: 'https://www.mindmappro.com', src: 'https://i.imgur.com/kHicc3h.png' },
  { name: 'slon-media', alt: 'SLON Media', href: 'https://slonmedia.com/', src: 'https://i.imgur.com/aTiT4xq.png' },
  { name: 'cloud-specialists-instinctools', alt: '*instinctools', href: 'https://www.instinctools.com/cloud-computing/', src: 'https://i.imgur.com/c56Di42.png' },
  { name: 'keepsolid', alt: 'VPN Unlimited', href: 'https://www.vpnunlimited.com', src: 'https://i.imgur.com/etMz9qy.png' },
  { name: 'xoonl', alt: 'Ketting met initialen', href: 'https://www.xoo.nl/collections/initialen-ketting', src: 'https://i.imgur.com/dfLFEdY.png' },
  { name: 'vpncheck', href: 'https://www.vpncheck.org/', src: 'https://i.imgur.com/pnCy0IK.png', alt: 'VPNcheck' },
  { name: 'primesound', href: 'https://primesound.org', src: 'https://i.imgur.com/nqZQvTP.png', alt: 'Prime Sound' },
  { name: 'mister-auto', href: 'https://www.mister-auto.com/', src: 'https://i.imgur.com/MMWQUZm.png', alt: 'Mister Auto' },
  { name: 'techreviewerco', alt: 'Top 100+ Software Development Companies in 2021', href: 'https://techreviewer.co/top-software-development-companies', src: 'https://i.imgur.com/rNWNm8Z.png' },
  { name: 'sumatosoft', alt: 'The SumatoSoft software development company delivers IT solutions and services.', href: 'https://sumatosoft.com/services', src: 'https://i.imgur.com/jVKAL9j.png' },
  { name: 'aapeli', alt: 'HTML5 Games Arcade', href: 'https://aapeli.net/', src: 'https://i.imgur.com/HJSI2c9.png' },
  { name: 'targeted-web-traffic1', href: 'https://www.targetedwebtraffic.com/', src: 'https://i.imgur.com/xmUd27v.png', alt: 'Targeted Web Traffic' },
  { name: 'relc', src: 'https://i.imgur.com/rQbUKwt.png', href: 'https://www.realestatelc.com/', alt: 'Real Estate Learning Center' },
  { name: 'carhpus2', src: 'https://i.imgur.com/OeRXcoh.png', alt: 'Carhp', href: 'https://www.carhp.com/' },
  { name: 'elternkompass', href: 'https://www.elternkompass.de/ratgeber/', src: 'https://i.imgur.com/zhFVB0V.png', alt: 'Elternkompass' },
  { name: 'troypoint', href: 'https://troypoint.com/', src: 'https://i.imgur.com/52h3YKS.png', alt: 'Cord-cutting tutorials & news' },
  { name: 'mobilen', href: 'https://mobilen.nu/', src: 'https://i.imgur.com/boZA1QE.png', alt: 'Mobilen' },
  { name: 'nbanu', href: 'https://nba.nu/', src: 'https://i.imgur.com/GGZGpTZ.png', alt: 'Följ NBA säsongen från Sverige. Vi ger dig allt du behöver för att uppleva NBA som svensk.' },
  { name: 'vpn-norge', href: 'https://www.vpntopp.no/', src: 'https://i.imgur.com/HFlTr5N.png', alt: 'VPNtopp.no is Norways biggest VPN information site' },
  { name: 'tmdesign', href: 'https://theymakedesign.com/best-web-design-companies-3ecc85b32071', alt: 'theymakedesign.com', src: 'https://i.imgur.com/kfA0vQE.png' },
  { name: 'softwaredevelopmentuk', href: 'https://www.softwaredevelopment.co.uk/', alt: 'SoftwareDevelopmentUK', src: 'https://i.imgur.com/HoU15ep.png' },
  { name: 'stored-enterprises-limited1', href: 'https://www.bystored.com/', alt: 'STORED Enterprises Limited', src: 'https://i.imgur.com/rcViSMc.png' },
  { name: 'nupepshrooms', href: 'https://nupepshrooms.com/', alt: 'Learn about Psilocybin, LSD, & DMT', src: 'https://i.imgur.com/Iyf1vDp.jpg' },
  { name: 'incognito-12674050', href: 'https://bitlaunch.io/', alt: 'Bitcoin VPS', src: 'https://i.imgur.com/pJ8u9sq.png' },
  { name: 'quarterless', href: 'https://quarterless.com/', alt: 'Quarterless', src: 'https://i.imgur.com/va4ERjc.png' },
  { name: 'filmen', href: 'https://filmen.nu/', alt: 'Filmen.nu', src: 'https://i.imgur.com/VNxKJd8.png' },
  { name: 'streamat', src: 'https://i.imgur.com/mgql2fW.png', href: 'https://streamat.se/', alt: 'Streamat.se' },
  { name: 'streamet', src: 'https://i.imgur.com/eNFurtn.png', href: 'https://streamet.dk/', alt: 'Streamet.dk' },
  { name: 'njsj1', href: 'https://njsportsjournal.com/', alt: 'NJ Sports Journal', src: 'https://i.imgur.com/r1AtvPe.png' },
  { name: 'nysj', href: 'https://nysportsjournal.com', alt: 'NY Sports Journal', src: 'https://i.imgur.com/n6dgqy8.png' },
  { name: 'forex-in-thai', href: 'https://twitter.com/forexinthai', alt: 'Forex in Thai', src: 'https://i.imgur.com/Va2Utqh.png' },
  { name: 'nfl-sunday', src: 'https://i.imgur.com/3QpWhNG.jpg', href: 'https://nfl-sunday.com', alt: 'NFL Sunday' },
  { name: 'nfl-thursday', src: 'https://i.imgur.com/Bikortt.png', href: 'https://nflthursday.com', alt: 'NFL Thursday' },
  { name: 'xoo', src: 'https://i.imgur.com/0hknMf1.png', href: 'https://www.xoo.nl', alt: 'Xoo.nl' },
  { name: 'halvin-laina', src: 'https://i.imgur.com/N5K50qT.png', href: 'https://www.halvinlaina.fi/', alt: 'Halvin Laina' },
  { name: 'knowing-spirit-portal', href: 'https://knowing-portal.com/', src: 'https://i.imgur.com/y1t4VKt.png', alt: 'Knowing Spirit Portal' },
  { name: 'solarplus', href: 'https://solarplus.es/', alt: 'solarplus.es', src: 'https://i.imgur.com/wfJLQHP.png' },
  { name: 'bank24-nu', src: 'https://i.imgur.com/2efEU47.png', href: 'https://www.bank24.nu/', alt: 'bank24.nu' },
  { name: 'bank-finans', href: 'https://bankfinans.se/', src: 'https://i.imgur.com/VtnZTO7.png', alt: 'Bank Finans' },
  { name: 'proven', href: 'https://www.discovermagazine.com/sponsored/proven-reviews-nutravesta-proven-weight-loss-pills-really-work', src: 'https://i.imgur.com/W70tuoL.png', alt: 'ProVen' },
  { name: 'aandelen-kopen1', href: 'https://www.aandelenkopen.com/', src: 'https://i.imgur.com/tB0Kg9v.png', alt: 'Aandelen kopen tips' },
  { name: 'buycheaprdp', href: 'https://buycheaprdp.com/', src: 'https://i.imgur.com/mQkLkbs.png', alt: 'Buy Cheap Remote Desktop Services' },
  { name: 'faveable', href: 'https://faveable.com/', src: 'https://i.imgur.com/PMqdGyT.png', alt: 'Faveable' },
  { name: 'buy-fineproxy-org', href: 'https://buy.fineproxy.org/eng/', src: 'https://i.imgur.com/MCMrOiw.png', alt: 'FinePROXY' },
  { name: 'masterbundles', href: 'https://masterbundles.com/', src: 'https://i.imgur.com/FS7VYwp.png', text: 'masterbundles.com' },
  { name: 'zenscrape', href: 'https://zenscrape.com/', src: 'https://i.imgur.com/WQf4Lxi.png', text: 'Zenscrape - Web Scraping API' },
  { name: 'zenserp', href: 'https://zenserp.com', src: 'https://i.imgur.com/mj9YocC.png', alt: 'Zenserp - Google Search API' },
  { name: 'blufvpn', href: 'https://blufvpn.com', src: 'https://i.imgur.com/kHYrANI.png', alt: 'BlufVPN - Supercharged Privacy' },
  { name: 'netflix-vpn', href: 'https://vpn-review.com/netflix-vpn', src: 'https://i.imgur.com/nfew8Na.png', alt: 'Best Netflix VPN' },
  { name: 'clipartlove', href: 'https://www.clipartlove.com/', src: 'https://i.imgur.com/W37UlyE.png', alt: 'Clipartlove' },
  { name: 'mosttrust-com', href: 'https://mosttrust.com/', src: 'https://i.imgur.com/TGzM7H2.png', alt: 'MostTrust.com' },
  { name: "varmalaina-fi", href: "https://www.varmalaina.fi/", src: "https://i.imgur.com/lbkpxKf.png", alt: "VarmaLaina.fi" },
  { name: 'top-web-design-agencies', src: 'https://i.imgur.com/oQYK4B9.png', href: 'https://medium.com/@niksundin/best-web-design-companies-1872e445775f', alt: 'Top Web Design Agencies' },
  { name: 'zadluzenia-com', href: 'https://www.zadluzenia.com/', src: 'https://i.imgur.com/NLC1TOn.png', alt: 'zadluzenia.com' },
  { name: 'thebigphonestore', src: 'https://i.imgur.com/2NBJr2b.png', href: 'https://www.thebigphonestore.co.uk/', alt: 'The Big Phone Store' },
  { name: 'instapromote1', src: 'https://i.imgur.com/BRNfVvM.png', href: 'https://instapromote.me/', alt: 'instapromote.me' },
  { name: 'vpncompare', src: 'https://i.imgur.com/Z3gcqKZ.jpg', href: 'https://www.vpncompare.co.uk', alt: 'vpncompare.co.uk' },
  { name: 'betacalendars', src: 'https://i.imgur.com/wBKloLa.png', href: 'https://www.betacalendars.com/', alt: 'Beta Calendars' },
  { name: 'best-vpn-services', src: 'https://i.imgur.com/wL2Xdpg.png', href: 'https://www.bestvpnrating.com/', alt: 'Best VPN Services' },
  { name: 'vpnyhteys', href: 'https://www.vpnyhteys.fi/', src: 'https://i.imgur.com/bmkNZfZ.png', alt: 'vpnyhteys.fi' },
  { name: 'nopeustesti-fi', src: 'https://i.imgur.com/Bb3PdNj.png', href: 'https://www.nopeustesti.fi', alt: 'Nopeustesti.fi' },
  { name: 'best-vpn-for-kodi', src: 'https://i.imgur.com/hn5rbtL.png', href: 'https://cooltechzone.com/vpn-for-kodi', alt: 'Best vpn for Kodi' },
  { name: 'nitrovpn', src: 'https://i.imgur.com/pGnlGOV.png', href: 'https://nitrovpn.com/', alt: 'nitrovpn.com' },
  { name: 'lainahakemus', src: 'https://i.imgur.com/Mqb22QZ.png', href: 'https://www.lainahakemus.fi/', alt: 'lainahakemus.fi' },
  { name: 'credimaxx-r-gmbh', src: 'https://i.imgur.com/sf5e7KT.png', alt: 'credimaxx.de', href: 'https://www.credimaxx.de/' },
  { name: 'fastwordunscrambler', src: 'https://i.imgur.com/yj8EnMP.png', alt: 'FastWordUnscrambler.com', href: 'https://fastwordunscrambler.com/' },
  { name: 'unscramblex', href: 'https://unscramblex.com/', alt: 'unscramblex.com', src: 'https://i.imgur.com/uiFa9h5.png' },
  { name: 'searchpromocodes', href: 'https://searchpromocodes.com', src: 'https://i.imgur.com/P095N2M.png', alt: 'Search Promo Codes' },
  { name: 'emailmarketingservices-io', href: 'https://emailmarketingservices.io', alt: 'Email Marketing Services', src: 'https://i.imgur.com/IRd8oHi.png' },
  { src: 'https://i.imgur.com/NvN22Eu.png', href: 'https://kvintblendex.no/', alt: 'Kvint | Blendex', name: 'kvintblendex' },
  { name: 'web-impact', href: 'https://unscramblex.com/', alt: 'unscramblex.com', src: 'https://i.imgur.com/uiFa9h5.png' },
  { name: 'justremoteco', src: 'https://i.imgur.com/kn4uWKL.png', href: 'https://justremote.co/', alt: 'justremote.co' },
  { name: 'mobilunity', href: 'https://mobilunity.com/', src: 'https://i.imgur.com/BqDzi36.png', alt: 'mobilunity.com' },
  { name: 'luottopalvelut', src: 'https://i.imgur.com/1jaPeJk.png', href: 'https://luottopalvelut.fi/', alt: 'Luottopalvelut' },
  { name: '420couponcodes', src: 'https://i.imgur.com/IbhCD2k.png', href: 'https://420couponcodes.com/', alt: '420couponcodes.com' },
  { name: 'exporthub', src: 'https://i.imgur.com/nDXLYzE.png', href: 'https://www.exporthub.com/', alt: 'www.exporthub.com' },
  { name: 'forbrugermagasinet', src: 'https://i.imgur.com/6iKoQjf.jpg', href: 'https://www.forbrugermagasinet.dk/', alt: 'forbrugermagasinet' },
  { name: 'tradie-training', src: 'https://i.imgur.com/fj0szKk.png', href: 'https://tt.edu.au/', alt: 'tt.edu.au' },
  { name: '10-reviews', href: 'https://www.10reviews.com/review/10-vpns/', src: 'https://i.imgur.com/ep5ANQ5.png', alt: '10reviews.com' },
  { name: 'digital-bank-guide', src: 'https://i.imgur.com/fdzFdru.png', href: 'https://digitalbankguide.com/', alt: 'digitalbankguide.com' },
  { name: 'top5credits-com-fi', src: 'https://i.imgur.com/K2EU3HD.png', href: 'https://www.top5credits.com/', alt: 'top5credits.com' },
  { name: 'vertaalainaa-fi', href: 'https://www.vertaalainaa.fi/', src: 'https://i.imgur.com/IAtsRZ9.png', alt: 'VertaaLainaa.fi' },
  { name: 'calgary-pest-control', href: 'https://spartanpestcontrol.com/', src: 'https://i.imgur.com/obikCqJ.png', alt: 'CALGARY PEST CONTROL' },
  { name: 'jesper-jensen', href: 'https://www.xn--ln-yia.dk/', src: 'https://i.imgur.com/ijP6bcQ.png', alt: 'lån.dk' },
  { name: 'virtual-receptionist-london', href: 'http://www.virtualreceptionist.london/', src: 'https://i.imgur.com/pR2FWUY.png', alt: 'virtualreceptionist.london' },
  { name: 'matchbanker-fi1', href: 'https://matchbanker.fi/', src: 'https://i.imgur.com/PFH9D9k.png', alt: 'matchbanker.fi' },
  { name: 'matchbanker-pl', href: 'https://matchbanker.pl/', src: 'https://i.imgur.com/PFH9D9k.png', alt: 'matchbanker.pl' },
  { name: '1gbits', src: 'https://i.imgur.com/KvKV1Tj.png', alt: '1gbits', href: 'https://1gbits.com/', second: [ { name: 'monovm', href: 'https://monovm.com', src: 'https://i.imgur.com/v9RLvQ7.jpg', alt: 'vps hosting' } ] },
  { name: 'wpsetup', src: 'https://i.imgur.com/7wlB7Uv.jpg', href: 'https://wpsetup.org', alt: 'wpsetup.org' },
  { name: 'fair-laan-se', href: 'http://fair-laan.se', alt: 'fair-laan.se', src: 'https://i.imgur.com/8mczs3O.png' },
  { name: 'fair-laan-dk', href: 'http://fair-laan.dk', alt: 'fair-laan.dk', src: 'https://i.imgur.com/8mczs3O.png' },
  { name: 'nordic-meal-company', src: 'https://i.imgur.com/wbNaael.png', href: 'https://maaltidskasser-online.dk/', alt: 'maaltidskasser-online.dk' },
  { name: 'icons8', href: 'https://icons8.com/web-app/category/all/Very-Basic', src: 'https://i.imgur.com/QlUE6Wj.png', alt: 'Icons8' },
  { name: 'clayglobal', href: 'https://clay.global', src: 'https://i.imgur.com/CFT6Rdk.png', alt: 'Clay Global' },
  { name: 'codeinwp', href: 'https://www.codeinwp.com', src: 'https://i.imgur.com/89wdDCY.png', alt: 'Code in WP' },
  { name: 'dontpayfull', href: 'https://www.dontpayfull.com/', src: 'https://i.imgur.com/LzILKuJ.png', alt: 'Don\'t Pay Full' },
  { name: 'vpsservercom', href: 'https://www.vpsserver.com', src: 'https://i.imgur.com/uybwrjU.png', alt: 'https://www.vpsserver.com' },
  { name: 'hostednl', href: 'https://www.hosted.nl/', src: 'https://i.imgur.com/aoQg0N6.png', alt: 'Hosted.nl' },
  { name: 'givemedeals', href: 'https://www.givemedeals.com/', src: 'https://i.imgur.com/oGv5LbE.png', alt: 'GiveMe Deals' },
  { name: 'hrank-com', href: 'https://www.hrank.com/', src: 'https://i.imgur.com/o9e8PNU.png', alt: 'HRank' },
  { name: 'casino-topp', href: 'https://www.finanstopp.no/forbrukslan/', src: 'https://i.imgur.com/KHJPgDx.png', alt: 'FinansTopp' },
  { name: 'truevendor', href: 'https://www.ramotion.com/agency/web-design/', src: 'https://i.imgur.com/mQxmvRm.png', alt: 'Ramotion' },
  { name: 'smalanutensikkerhet', href: 'http://xn--smlnutensikkerhet-9qbb.com/', src: 'https://i.imgur.com/9Qxie3r.png', alt: 'Lån på dagen' },
  { name: 'datantify', href: 'https://datantify.com/', src: 'https://i.imgur.com/kra4tLm.png', alt: 'Datantify' },
  { name: 'promocodewatch1', href: 'https://www.promocodewatch.com', src: 'https://i.imgur.com/nL7VBDB.png', alt: 'Promo Code Watch' },
  { name: 'my-true-media', href: 'https://mytruemedia.com', src: 'https://i.imgur.com/32E5LWt.png', alt: 'My True Media' },
  { name: 'plan-b-services-llc', href: 'https://edubirdie.com/buy-an-essay-online', src: 'https://i.imgur.com/pQvStzD.png', alt: 'buy essay from Edubirdie' },
  { name: 'kredit', href: 'https://www.privatkreditsofort.ch/', src: 'https://i.imgur.com/PFHQKo4.png', alt: 'Privatkredit sofort - Der Kleinkredit Vergleich für die Schweiz' },
  { name: 'gameserverkings', href: 'https://www.gameserverkings.com', src: 'https://i.imgur.com/mayBUnu.png', alt: 'Gameserverkings' },
  { name: 'webton-bv', href: 'https://www.webton.nl/', src: 'https://i.imgur.com/xvWHTAU.png', alt: 'Webton' },
  { name: 'monovm', href: 'https://monovm.com/buy-rdp/', src: 'https://i.imgur.com/v9RLvQ7.jpg', alt: 'buy rdp' },
  { name: 'stk-finans', href: 'https://www.xn--forbruksln-95a.com/', src: 'https://i.imgur.com/cxkV6Ve.png', alt: 'Forbrukslån' },
  { name: 'best-shark-tank-products', href: 'https://www.bestsharktankproducts.com', alt: 'Best Shark Tank Products', src: 'https://i.imgur.com/XSaZ4Hy.jpg' },
  { name: 'jonas-cederholm', href: 'https://www.lainat.fi', alt: 'lainat.fi', src: 'https://i.imgur.com/5ObBbYs.png' },
  { name: 'meubelpartner', href: 'https://www.meubelpartner.nl/tafels/eettafels.html', alt: 'Dining room table - Meubelpartner logo - proud Bower sponsor', src: 'https://i.imgur.com/ubhPYsn.png' },
  { name: 'lead-supply', href: 'https://lainaa-helposti.fi/', alt: 'Lainaa Helposti', src: 'https://i.imgur.com/Pl628R5.png', second: [ { href: 'https://superkredit.net/', alt: 'superkredit.net', src: 'https://i.imgur.com/5KivATo.jpg', since: '2019-10-10' }, { href: 'https://loanscouter.com/', alt: 'LoanScouter', src: 'https://i.imgur.com/jqRy0WW.jpg', since: '2019-10-14' } ] },
  { name: 'customessaymeister-com', src: 'https://i.imgur.com/Id7g8vY.png', alt: 'Custom Essay Eister', href: 'https://www.customessaymeister.com/' },
  { name: 'bloktprivacy', src: 'https://i.imgur.com/eD0j2VN.png', href: 'https://blokt.com/guides/best-vpn', alt: 'The Best VPN Services 2019' },
  { name: 'usave', src: 'https://i.imgur.com/u82oGMc.png', href: 'https://usave.co.uk/utilities/broadband/', alt: 'Compare broadband deals with usave.co.uk' },
  { name: 'fire-stick-tricks', src: 'https://i.imgur.com/d6J9fq1.png', href: 'https://www.firesticktricks.com/', alt: 'Fire Stick Tricks' },
  { name: 'tekhattan', src: 'https://i.imgur.com/ng10vwa.png', href: 'https://tekhattan.com/', alt: 'IT SUPPORT, MANAGED SERVICES, AND TECH SUPPORT' },
  { name: 'devilsblood2', href: "https://www.onecompare.com/apple/iphone-deals", src: "https://i.imgur.com/053ayaj.png", alt: "OneCompare" },
  { name: 'utilitysavingexpert', src: 'https://i.imgur.com/Hwa8g6o.png', href: 'https://www.utilitysavingexpert.com/car-insurance/', alt: 'car insurance' },
  { name: 'codefirst', src: 'https://images.opencollective.com/proxy/images?src=https%3A%2F%2Fopencollective-production.s3-us-west-1.amazonaws.com%2Fdde88120-e914-11e8-a662-278259d35390.png&height=100', href: 'https://www.codefirst.co.uk/', alt: 'Code First' },
  { name: 'routerhosting', src: 'https://i.imgur.com/yccgOkJ.png', href: 'https://www.routerhosting.com/', alt: 'Router Hosting' },
  { name: 'vpn-review-com', src: 'https://i.imgur.com/INf1G7H.png', href: 'https://vpn-review.com/', alt: 'VPN reviews 2019' },
  { name: 'traders-insurance-com', src: 'https://i.imgur.com/xlkR3fb.png', href: 'https://www.traders-insurance.com', alt: 'Traders Insurance' },
  { name: 'asoboofficial', href: 'https://asobo-design.com/nex/', alt: 'デザイン作成のASOBOAD', src: 'https://i.imgur.com/DVPV7Km.png' },
  { name: 'lemon-law', src: 'https://i.imgur.com/vJUzTyq.png', alt: 'Lemon Law.site', href: 'https://lemonlaw.site/' },
  { name: 'loadview', href: 'https://www.loadview-testing.com/', alt: 'LoadView-Testing', src: 'https://i.imgur.com/iHdPKSV.png' },
  { name: 'ui-ux-design-agencies', href: 'https://uxplanet.org/top-user-experience-ui-ux-design-agencies-3696f3daed4e', src: 'https://i.imgur.com/H1PtPJh.png', alt: 'UX Planet' },
  { name: 'bonuslan', href: 'https://bonuslaan.dk/', src: 'https://i.imgur.com/GSRW8gK.png', alt: 'Bonuslån' },
  { name: 'official-top-5-review', href: 'https://www.officialtop5review.com', src: 'https://i.imgur.com/A4YRujZ.png', alt: 'The best reviews' },
  { name: 'vpngorilla-com', href: 'https://vpngorilla.com', src: 'https://i.imgur.com/y1gF5dl.png', alt: 'VPN Gorilla' },
  { name: 'yiannakis-ttafounas-ttafounas', href: 'https://bid4papers.com/write-my-essay.html', src: 'https://i.imgur.com/hVE7Ea3.png', alt: 'Bid4Papers' },
  { name: "writersperhour", href: "https://writersperhour.com/", src: "https://i.imgur.com/L8fWitE.png", alt: "Writers per Hour" },
  { name: "mind-doodle-ltd", href: "https://www.minddoodle.com/", src: "https://i.imgur.com/QzdhhSJ.png", alt: "Mind Doodle" },
  { name: "ruffhero1", href: "https://www.ruffhero.com", src: "https://i.imgur.com/GEaYK3g.png", alt: "Ruff Hero" },
  { name: 'digital-logic', src: 'https://i.imgur.com/4HmKudj.jpg', href: 'https://www.digitallogic.co', alt: 'Digital Logic' },
  { name: 'crosswordsolver', src: 'https://i.imgur.com/JfmcXNf.png', href: 'https://www.crosswordsolver.com', alt: 'crosswordsolver.com' },
  { name: 'iboysoftsoftware', alt: 'iBoysoft', href: 'https://iboysoft.com', src: 'https://i.imgur.com/eOWcxUr.png' },
  { name: 'matthew-chalk1', alt: 'Matthew Chalk', href: 'https://sprocketdigital.co.nz/', src: 'https://i.imgur.com/koJsb0d.png' },
  { name: 'iBoysoft', alt: 'iBoysoft', href: 'https://iboysoft.com', src: 'https://i.imgur.com/eOWcxUr.png' }
]

let total = 0
var d = new Date(); d.setMonth(d.getMonth() - 1);

let totalmonth = d.toISOString().slice(0, 7)

let totals = {

}

async function main() {
  const result = await Promise.all([
    transactions(1),
    transactions(2),
    transactions(3),
    transactions(4),
    transactions(5),
    transactions(6),
    transactions(7),
    transactions(8),
    transactions(9),
    transactions(10),
    transactions(11),
    transactions(12),
    transactions(13),
    transactions(14),
    transactions(15),
    transactions(16),
    transactions(17),
    transactions(18),
    transactions(19),
    transactions(20),
    transactions(21),
    transactions(22),
    transactions(23),
    transactions(24),
    transactions(25),
    transactions(26),
    transactions(27),
    transactions(28),
    transactions(29),
    transactions(30)
  ])

  const debitAccounts = new Set()
  let allTransactions = [].concat(...result).reverse()
  allTransactions = allTransactions.filter(t => {
    return t.fromAccount && t.toAccount
  })
  const validTransactions = allTransactions.filter(t => {
    return (+new Date() - +Date.parse(t.createdAt)) / 3600000 / 24 < 30 && t.amount.value
  })

  let sponsors = {}
  let supporters = {}

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
    validTransactions.push(transaction)
    allTransactions.push(transaction)
  }

  allTransactions.forEach(t => { if (t.type === 'DEBIT') { t.fromAccount = t.toAccount } })
  validTransactions.forEach(t => { if (t.type === 'DEBIT') { t.fromAccount = t.toAccount } })

  allTransactions.forEach(t => {
    if (ignoredsupporters.includes(t.fromAccount.slug)) {
      return
    }
    if (t.amount.value > -500 && t.amount.value % 50 == 0) {
      let dateTotal = t.createdAt.slice(0, 7)
      if (!totals[dateTotal]) {
        totals[dateTotal] = 0
      }
      totals[dateTotal] += t.amount.value
      if (t.createdAt.slice(0, 7) == totalmonth && t.kind !== 'VIRTUAL') {
        total += t.amount.value
      }
    }
    if (t.amount.value > 0) {
      if (t.amount.value >= 100 && !forcedsupporters.includes(t.fromAccount.slug)) {
        sponsors[t.fromAccount.slug] = Math.max(
          sponsors[t.fromAccount.slug] || 0,
          Date.parse(t.createdAt) + Math.floor(t.amount.value / 100) * 1000 * 3600 * 24 * 31
        )
      } else {
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
  sponsors['iBoysoft'] += 1000 * 3600 * 24 * 31
  sponsors['matthew-chalk1'] += 1000 * 3600 * 24 * 7
  sponsors['primesound'] += 1000 * 3600 * 24 * 7
  sponsors['seolegalbet'] += 1000 * 3600 * 24 * 9
  sponsors['webpundits'] += 1000 * 3600 * 24 * 10
  supporters['rekt-eddies-gummies'] += 1000 * 3600 * 24 * 30
  supporters['minneapolis-towing'] += 1000 * 3600 * 24 * 30
  supporters['bountii'] += 1000 * 3600 * 24 * 30
  supporters['earthweb1'] += 1000 * 3600 * 24 * 30

  Object.keys(sponsors).forEach(k => {
    if (sponsors[k] + 1000 * 3600 * 24 * 16 < Date.now() && !exceptions.includes(k)) {
      const lastTransaction = allTransactions.reverse().find(t => t.fromAccount.slug === k).createdAt
      if (lastTransaction >= '2021-01') {
        console.log('Expired sponsor: ' + k + ' at ' + new Date(sponsors[k]).toString().slice(4, 16) + ' ' + lastTransaction.slice(0, 10))
      }
      delete sponsors[k]
    }
  })

  console.log('')
  Object.keys(supporters).forEach(k => {
    if (supporters[k] + 1000 * 3600 * 24 * 16 < Date.now() && !exceptions.includes(k)) {
      const lastTransaction = allTransactions.reverse().find(t => t.fromAccount.slug === k).createdAt
      if (lastTransaction >= '2021-01') {
        console.log('Expired supporter: ' + k + ' at ' + new Date(supporters[k]).toString().slice(4, 16) + ' ' + lastTransaction.slice(0, 10))
      }
      delete supporters[k]
    }
  })

  function reorder(records) {
    const byName = groupBy(records, r => r.name)
    const results = []

    for (let record of records) {
      if (!result.skip) {
        results.push(record)
      }
      if (record.group) {
        for (let related of record.group) {
          if (related in byName) {
            results.push(byName[related][0])
            byName[related][0].skip = true
          }
        }
      }
    }
    return results
  }


  reorder(Object.keys(sponsors).map(t => ({
    name: t,
    total: allTransactions.filter(t2 => t2.fromAccount.slug == t).reduce((sum, t) => sum += t.amount.value, 0)
  })).sort((a, b) => b.total - a.total).flatMap(t => {
    const sponsor = data.find(d => d.name === t.name)
    if (!sponsor) {
      if (['meubelpartner', 'rekt-eddies-gummies'].includes(t.name)) {
        return []
      } else {
        unknown('sponsor', t.name)
        return []
      }
    }
    return [sponsor]
  })).forEach(sponsor => {
    SPONSORS += `<a rel="sponsored" href="${sponsor.href}"><img class="sidebar-logo" src="${sponsor.src}" alt="${sponsor.alt}" /></a>\n`
    console.log(sponsor.href)
    if (sponsor.second) {
      for (const s of sponsor.second) {
        if (s.href) {
          console.log(s.href)
          SPONSORS += `<a rel="sponsored" href="${s.href}"><img class="sidebar-logo" src="${s.src}" alt="${s.alt}" /></a>\n`
        }
      }
    }
  })

  console.log("\nSUPPORTERS\n")
  reorder(Object.keys(supporters).map(t => ({
    name: t,
    total: allTransactions.filter(t2 => t2.fromAccount.slug == t).reduce((sum, t) => sum += t.amount.value, 0)
  })).sort((a, b) => [b.total - a.total, a.text, b.text]).flatMap(t => {
    const sups = datasup.filter(d => d.name === t.name)
    if (!sups.length) {
      unknown('supporter', t.name)
    }
    return sups
  })).forEach(sup => {
    if (sup.href) {
      SUPPORTERS += `<a rel="sponsored" href="${sup.href}">${sup.text}</a> |\n`
      console.log(sup.href)
    }
    if (sup.second) {
      for (const s of sup.second) {
        if (s.href) {
          SUPPORTERS += `<a href="${s.href}">${s.text}</a> |\n`
          console.log(s.href)
        }
      }
    }
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
  for (let month in totals) {
    if (month >= '2019-10') {
      process.stdout.write(totals[month] + '\t')
    }
  }
  console.log(totals)
}


main()
