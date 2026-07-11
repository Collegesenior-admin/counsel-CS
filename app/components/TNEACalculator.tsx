'use client';
import { useState, useEffect, useMemo } from 'react';
import { ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

interface ResultData {
  cutoff: number;
  rank: string;
  tier: string;
}

// College Banner Images
const banners = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1591115765373-5207767f024d?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=400&fit=crop",
];


// Expanded with space for all 430 parsed data rows from the PDF link
const ALL_COLLEGES = [{ "code": "1", "name": "University Departments of Anna University Chennai - CEG Campus Sardar Patel Road Guindy Chennai 600 025" },
{ "code": "2", "name": "University Departments of Anna University Chennai - ACT Campus Sardar Patel Road Guindy Chennai 600 025" },
{ "code": "4", "name": "University Departments of Anna University Chennai - MIT Campus Chrompet Tambaram Taluk Chengalpattu District 600 044" },
{ "code": "5", "name": "Annamalai University Faculty of Engineering and Technology Annamalai nagar Cuddalore" },
{ "code": "1013", "name": "University College of Engineering Villupuram Kakuppam Villupuram District 605103" },
{ "code": "1014", "name": "University College of Engineering Tindivanam Melpakkam Tindivanam Villupuram District 604001" },
{ "code": "1015", "name": "University College of Engineering Arni Arni to Devikapuram Road Thatchur Arni Thiruvannamalai District 632326" },
{ "code": "1026", "name": "University College of Engineering Kancheepuram Ponnerikarai Campus NH4 Chennai-Bangalore Highway Karaipettai Village & Post Kancheepuram District 631552" },
{ "code": "1101", "name": "Aalim Muhammed Salegh College of Engineering, Nizara Educational Campus Muthapudupet, Avadi - IAF, Chennai-600055." },
{ "code": "1102", "name": "Bhajarang Engineering College, Ayathur Village, Veppampattu (R.S), Thiruvallur dist-602024." },
{ "code": "1106", "name": "Jaya Engineering College, Prakash Nagar, Thiruninravur, Thiruvallur District, Chennai-602024." },
{ "code": "1107", "name": "Jaya Institute of Technology, Kanchipadi, Thiruvallur-Thiruthani NH Road, Thiruvallur Taluk & District-631204." },
{ "code": "1110", "name": "Prathyusha Engineering College (Autonomous), Poonamallee-Tiruvallur High Road, Aranvoyalkuppam, Tiruvallur-602025." },
{ "code": "1112", "name": "R.M.D. Engineering College (Autonomous), R.S.M. Nagar, Gummidipoondi Taluk, Kavaraipettai, Thiruvallur-601206." },
{ "code": "1113", "name": "R.M.K. Engineering College (Autonomous), R.S.M. Nagar, Kavaraipettai, Gummidipoondi Taluk, Thiruvallur-601206." },
{ "code": "1114", "name": "S.A. Engineering College (Autonomous), Poonamallee- Avadi Road, Thiruverkadu Post, Tiruvallur, Chennai-600077." },
{ "code": "1115", "name": "SriRam Engineering College, Perumalpattu, Veppampattu R.S., Tiruvallur District, Chennai-602024." },
{ "code": "1116", "name": "Sri Venkateswara College of Engineering and Technology, Thirupachur, Thiruvallur Taluk & District-631203." },
{ "code": "1118", "name": "Vel Tech Multi Tech Dr Rangarajan Dr Sakunthala Engineering College (Autonomous), 42, Veltech Road, Avadi, Morai, Thiruvallur- 600062." },
{ "code": "1120", "name": "Velammal Engineering College (Autonomous), Velammal Nagar, Ambattur-Redhills Road, Surapet, Thiruvallur, Chennai-600066." },
{ "code": "1121", "name": "Sri Venkateswara Institute of Science and Technology, Kolundhalur, Thiruvallur Taluk & District-631203." },
{ "code": "1122", "name": "Vel Tech High Tech Dr.Rangarajan Dr.Sakunthala Engineering College (Autonomous), No. 60, Veltech Road, Avadi, Morai, Thiruvallur-600062." },
{ "code": "1123", "name": "Gojan School of Business and Technology, 80-Feet Road, Edapalayam, Red Hills, Thiruvallur, Chennai-600052." },
{ "code": "1124", "name": "SAMS College of Engineering and Technology, 82,Panapakkam, Tirupathi Road, Uthukottai Taluk, Thiruvallur District-601102." },
{ "code": "1126", "name": "JNN Institute of Engineering (Autonomous), Ushaa Garden, 90, Kannigaipair Village, Uthukottai Taluk, Thiruvallur-601102." },
{ "code": "1127", "name": "St. Peter's College of Engineering and Technology, College Road, Avadi Taluk, Thiruvallur District, Chennai-600054." },
{ "code": "1128", "name": "R.M.K. College of Engineering and Technology (Autonomous), R.S.M. Nagar, Puduvoyal, Gummidipoondi Taluk, Thiruvallur District 601206." },
{ "code": "1133", "name": "Annai Veilankannis College of Engineering, 33 Gandhi Road, Nedungundram, Chennai-600048." },
{ "code": "1137", "name": "Annai Mira College of Engineering and Technology, Arappakkam Village, Arcot Road, Walaja Taluk, Vellore District-632517." },
{ "code": "1140", "name": "Jeppiaar Institute of Technology (Autonomous), Jeppiaar Nagar, Kunnam Village,Sriperumbudur Taluk, Kanchipuram-631604." },
{ "code": "1149", "name": "St. Joseph's Institute of Technology (Autonomous), Jeppiaar Nagar, Old Mamallapuram Road, Kanchipuram, Chennai-600119." },
{ "code": "1150", "name": "Sri Jayaram Institute of Engineering and Technology, 51 N,Elavur, 58 N Natham Village,Gumudipoondi Taluk, Thiruvallur District- 601201." },
{ "code": "1202", "name": "DMI College of Engineering (Autonomous), St.Joseph's Town,Mevalurkuppam B Village, Nazarethpet Post, Palanchur, Kanchipuram, Chennai-600123." },
{ "code": "1207", "name": "Kings Engineering College, Irungattukottai, Opp. Hyundai Car Company, Sriperumbudur, Kanchipuram-602117." },
{ "code": "1209", "name": "Pallavan College of Engineering, Thimmasamudram, Kanchipuram -631502." },
{ "code": "1210", "name": "Panimalar Engineering College (Autonomous), Bangalore Trunk Road, NazarathPet, Varadharajapuram, Poonamallee, Thiruvallur (DT), Chennai-600123." },
{ "code": "1211", "name": "Rajalakshmi Engineering College (Autonomous), Rajalakshmi Nagar, Thandalam, Kanchipuram, Chennai-602105." },
{ "code": "1212", "name": "Rajiv Gandhi College of Engineering, Nemili Village, Sriperumbudur, Kanchipuram-602105." },
{ "code": "1216", "name": "Saveetha Engineering College (Autonomous), Saveetha Nagar, Thandalam Post, Sriperumbudur Taluk, Kancheepuram District- 602105." },
{ "code": "1217", "name": "Sree Sastha Institute of Engineering and Technology, Chennai-Bangalore Highway, Chembarambakkam, Thiruvallur District, Chennai-600123." },
{ "code": "1218", "name": "Sri Muthukumaran Institute of Technology, Chikkarayapuram Near Mangadu, Kanchipuram, Chennai-600069." },
{ "code": "1219", "name": "Sri Venkateswara College of Engineering (Autonomous), Post Bag No.3, Pennalur, Sriperumbudur, Kanchipuram-602105." },
{ "code": "1221", "name": "Jaya College of Engineering and Technology, Poonamallee By Pass Road, Parivakkam, Chennai, Thiruvallur-600056." },
{ "code": "1222", "name": "P.B. College of Engineering, Chennai-Bangalore High Way, Irungkattukottai, Sriperumbudur Taluk, Kancheepuram District, Chennai -602117." },
{ "code": "1225", "name": "Loyola Institute of Technology, Palanchur, Mevalurkuppam, B village, Nazarathpet Post, Sriperumpudur Taluk, Kanchipuram District, Chennai-600123." },
{ "code": "1226", "name": "P.T.Lee Chengalvaraya Naicker College of Engineering and Technology, Oovery, Veliyur Post, Kanchipuram District-631502." },
{ "code": "1228", "name": "Alpha College of Engineering, No.34, Udayavar Kovil Street, Thirumazhisai, Chennai-600124." },
{ "code": "1229", "name": "Indira Institute of Engineering and Technology, No.1, V.G.R Nagar, V.G.R Gardens, Pandur, Thiruvallur -631203." },
{ "code": "1230", "name": "Apollo Engineering College, Mevaloorkuppam Valarpuram Post, Sriperumbudur Taluk, Kanchipuram District-602105." },
{ "code": "1232", "name": "ARM College of Engineering and Technology, Sattamangalam,Maraimalainagar Post, Chengalpattu Taluk, Kanchipuram Dist- 603209." },
{ "code": "1233", "name": "Adhi College of Engineering and Technology, No. 6, Munu Adhi Nagar, Sankarapuram, Puliambakkam Post, Near Wallajabad Kancheepuram-631605." },
{ "code": "1235", "name": "Jei Mathaajee College of Engineering, No.124, Vishakandikuppam Village, Siruvakkam Post, Kanchipuram-631552." },
{ "code": "1237", "name": "Velammal Institute of Technology, Chennai - Kolkatta Highway, Pancheeti Village, Ponneri Taluk, Thiruvallur District-601204." },
{ "code": "1238", "name": "GRT Institute of Engineering and Technology, GRT Mahalakshmi Nagar, Chennai-Tirupathi Highway, Tiruttani, Thiruvallur-631209." },
{ "code": "1241", "name": "T.J.S. Engineering College, Peruvoyal, Near Kavaraipettai,Gummidipoondi Taluk,Thiruvallur District-601206." },
{ "code": "1243", "name": "Madha Institute of Engineering and Technology, Irandaam Kattalai, Sadhananthapuram, Thandalam post, Chennai-600122." },
{ "code": "1301", "name": "Mohamed Sathak A J College of Engineering (Autonomous), #34, Rajiv Gandhi Road(OMR), IT Highway, Siruseri, Egattur, Chennai- 603103." },
{ "code": "1303", "name": "Anand Institute of Higher Technology, Kalasalingam Nagar, Old Mahabalipuram Road, Kazhipattur Village, Chengalpattu Taluk, Kancheepuram District603103." },
{ "code": "1304", "name": "Easwari Engineering College (Autonomous), Bharathi Salai, Ramapuram, Chennai-600089." },
{ "code": "1306", "name": "Jeppiaar Engineering College, Jeppiaar Nagar, Old Mammallapuram Road, Kanchipuram, Chennai-600119." },
{ "code": "1307", "name": "Jerusalem College of Engineering (Autonomous), Velachery-Tambaram Main Road,Narayanapuram, Pallikkaranai,Chennai- 600100." },
{ "code": "1309", "name": "Meenakshi Sundararajan Engineering College (Autonomous), C/O I.I.E.T Society No.363, Arcot Road, Kodambakkam, Chennai- 600024." },
{ "code": "1310", "name": "Misrimal Navajee Munoth Jain Engineering College, Guru Marudhar Kesari Building, Jyothi Nagar, Thorapakkam, Chennai-600097." },
{ "code": "1311", "name": "KCG college of Technology (Autonomous), Rajiv Gandhi Salai, Karapakkam, Chennai-600097." },
{ "code": "1315", "name": "Sri Sivasubramaniya Nadar College of Engineering (Autonomous), Rajiv Gandhi Salai (OMR), Kalavakkam,Kanchipuram District- 603110." },
{ "code": "1316", "name": "Agni College of Technology (Autonomous), Thalambur Off.Rajiv Gandhi Salai, Chengalpattu Taluk, Kancheepuram District-603103." },
{ "code": "1317", "name": "St. Joseph's College of Engineering (Autonomous), Jeppiaar Nagar, Old Mamallapuram Road, Kanchipuram, Chennai-600119." },
{ "code": "1318", "name": "T.J. Institute of Technology, Rajiv Gandhi Salai, Karapakkam, Chennai-600097." },
{ "code": "1319", "name": "Thangavelu Engineering College, Rajiv Gandhi Salai, Karapakkam, Chennai-600097." },
{ "code": "1321", "name": "Central Institute of Petrochemicals Engineering and Technology (Formerly Central Institute of Plastics Engineering and Technology) (CIPET) Guindy Chennai 600032" },
{ "code": "1322", "name": "Dhanalakshmi Srinivasan College of Engineering and Technology, ECR, Poonjeri, Mamallapuram, Kanchipuram-603104." },
{ "code": "1324", "name": "Sri Sai Ram Institute of Technology (Autonomous), Sai Leo Nagar, Dharkast Road, West Tambaram, Kanchipuram, Chennai- 600044." },
{ "code": "1325", "name": "St. Joseph College of Engineering, Trinity Campus, Nemili B Beemanthangal Village, Sriperumbudur, Kancheepuram District, Chennai-602105." },
{ "code": "1333", "name": "Shikshaa Institute of Advanced Technologies (formerly Vi Institute of Technology), No. 96 Sirunkundram Post,Chengalpattu Taluk,Kancheepuram District603108." },
{ "code": "1335", "name": "Sri Krishna Institute of Technology, Navaneedam Nagar, Panapakkam, Near Padappai, Kanchipuram-601301." },
{ "code": "1339", "name": "Mahalakshmi Tech Campus (formerly Mahalakshmi Engineering College), No.1 Bharathiyar Street, Prashanthi Nagar, Chromepet,Chennai-600044." },
{ "code": "1399", "name": "Chennai Institute of Technology (Autonomous) Puduper Village Nandambakkam Post Kundrathur Chennai 600069" },
{ "code": "1401", "name": "Adhiparasakthi Engineering College, Melmaruvathur, Cheyyur Taluk, Kancheepuram District-603319." },
{ "code": "1402", "name": "Annai Teresa College of Engineering, Thirunavalur, Ulundurpet Taluk, Villupuram District-607204." },
{ "code": "1405", "name": "Dhanalakshmi College of Engineering, Manimangalam Puducheri Road, Manimangalam, Manimangalam Post, Sriperumbudur Taluk, Kancheepuram District, Chennai-601301." },
{ "code": "1407", "name": "G K M College of Engineering and Technology, G K M Nagar, Alappakkam-Mappedu Road, New Perugalathur, Chennai-600063." },
{ "code": "1408", "name": "IFET College of Engineering (Autonomous), IFET Nagar, Gangarampalayam, Valavanur Post, Villupuram District-605108." },
{ "code": "1409", "name": "Karpaga Vinayaga College of Engineering and Technology, G.S.T. Road, Chinna Kolambakkam, Palayanoor Post, Madurantagam Taluk, Kancheepuram Dist-603308." },
{ "code": "1411", "name": "Madha Engineering College, Madha Nagar,Somangalam Road, Kundrathur, Kanchipuram, Chennai-600069." },
{ "code": "1412", "name": "Mailam Engineering College, Mailam, Tindivanam Taluk, Villupuram District-604304." },
{ "code": "1413", "name": "Sri Venkateswaraa College of Technology, Sirukulathur, Vadakal Village, Mathur Post, Sriperumbhudur, Kanchipuram-602105." },
{ "code": "1414", "name": "Prince Shri Venkateshwaraa Padmavathy Engineering College (Autonomous), Medavakkam - Mambakkam Road, Ponmar, Kanchipuram, Chennai600127." },
{ "code": "1415", "name": "T.S.M.Jain College of Technology, Melur,Kallakurichi Taluk,Villupuram District-606201." },
{ "code": "1416", "name": "Jaya Sakthi Engineering College, St.Mary's Nagar, Thiruninravur,(Near Avadi), Thiruvallur, Chennai-602024." },
{ "code": "1419", "name": "Sri Sai Ram Engineering College (Autonomous), Sai Leo Nagar, Poonthandalam Village, Dharkast Post, West Tambram, Kanchipuram, Chennai-600044." },
{ "code": "1420", "name": "Tagore Engineering College, Rathinamangalam, Vandalur, Kanchipuram, Chennai-600127." },
{ "code": "1421", "name": "V.R.S. College of Engineering and Technology, Arasur & Post, Ulundurpet Taluk, Villupuram District-607107." },
{ "code": "1422", "name": "SRM Valliammai Engineering College (Autonomous), S.R.M. Nagar, Kattankulathur, Chengalpattu, Kancheepuram, Chennai- 603203." },
{ "code": "1423", "name": "Asan Memorial College of Engineering and Technology, Asan Nagar, 9th kilometer, Chengalpattu - Mahabalipuram Highway, Post Box No.6, Chengalpattu-603001." },
{ "code": "1424", "name": "Dhaanish Ahmed College of Engineering, Dhaanish Nagar, Vanchuvancherry, Padappai(Near Tambaram), Sriperumbudur Taluk, Kancheepuram District601301." },
{ "code": "1426", "name": "Sri Ramanujar Engineering College, Vandalur, Kolapakkam, Kanchipuram, Chennai-600127." },
{ "code": "1427", "name": "Sri Krishna Engineering College, Panapakkam Near Padappai Via Tambaram, Kanchipuram, Chennai-601301." },
{ "code": "1428", "name": "E.S.College of Engineering and Technology, Chennai Trunk Road, Ayyankoilpattu, Villupuram-605602." },
{ "code": "1430", "name": "Maha Barathi Engineering College, A. Vasudevanur (post), Chinnasalem, Kallakurichi (Taluk), Villupuram-606201." },
{ "code": "1431", "name": "New Prince Shri Bhavani College of Engineering and Technology (Autonomous), Vengaivasal Main Road, Gowrivakkam, Chennai- 600073." },
{ "code": "1432", "name": "Rajalakshmi Institute of Technology (Autonomous), Bangalore Highway Road, Kuthambakkam, Chennai-600124." },
{ "code": "1434", "name": "Surya Group of Institutions, NH-45, GST Road, Vikiravandi, Villupuram-605652." },
{ "code": "1436", "name": "A.R.Engineering College, Vadakuchipalayam, Kappiyampuliyur post, Villupuram-605601." },
{ "code": "1437", "name": "Rrase College of Engineering, Vanjuvancherry, Padappai, Sriperumbadur, Kancheepuram -601301." },
{ "code": "1438", "name": "Sree Krishna College of Engineering, Anaicut Post, Unnai Village, Vellore-632101." },
{ "code": "1441", "name": "A.K.T.Memorial College of Engineering and Technology, Neelamangalam( Post ), Kallakurichi Taluk, Villupuram District-606202." },
{ "code": "1442", "name": "Prince Dr. K. Vasudevan College of Engineering and Technology, Medavakkam-Mambakkam Road, Ponmar, Chennai-600127." },
{ "code": "1444", "name": "R.M.Engineering College (formerly Chendu College of Engineering and Technology), Zamin Endathur Village, Madurantakam, Kanchipuram-603311." },
{ "code": "1445", "name": "Sri Rangapoopathi College of Engineering, Alampoondi Village & Post, Gingee Taluk, Villupuram District-604151." },
{ "code": "1449", "name": "Saraswathy College of Engineering and Technology, NH-45 Main Road, Olakkur, Tindivanam, Villupuram-604307." },
{ "code": "1450", "name": "Loyola-ICAM College of Engineering and Technology, Loyola College Campus, Chennai-600034." },
{ "code": "1452", "name": "PERI Institute of Technology (Autonomous), Mannivakkam,Tambaram, Kancheepuram, Chennai-600048." },
{ "code": "1501", "name": "Adhiparasakthi College of Engineering, G.B.Nagar, Kalavai, Arcot Taluk, Vellore District-632506." },
{ "code": "1503", "name": "Arulmigu Meenakshi Amman College of Engineering, Vadamavandal Village, Namandi Post,(Near Kanchipuram),Tiruvanamalai- 604410." },
{ "code": "1504", "name": "Arunai Engineering College, Chittor-Cuddalore Raod, Mathur, Tiruvannamalai-606603." },
{ "code": "1505", "name": "C.Abdul Hakeem College of Engineering and Technology, Hakeem Nagar, Melvisharam, Vellore -632509." },
{ "code": "1507", "name": "Ganadipathy Tulsi's Jain Engineering College, Chittoor-Cuddalore Road, Kaniyambadi, Vellore-632102." },
{ "code": "1509", "name": "Meenakshi College of Engineering, 12, Vembuli Amman Koil Street, West K K Nagar, Chennai-600078." },
{ "code": "1510", "name": "Priyadarshini Engineering College, Chettiyappanur Village & Post, Vaniyambadi, Vellore-635751." },
{ "code": "1511", "name": "RANIPPETTAI ENGINEERING COLLEGE, THENKADAPPANTHANGAL, VELLORE DISTRICT 632515" },
{ "code": "1511", "name": "RANIPPETTAI ENGINEERING COLLEGE, THENKADAPPANTHANGAL, VELLORE DISTRICT 632516" },
{ "code": "1511", "name": "RANIPPETTAI ENGINEERING COLLEGE, THENKADAPPANTHANGAL, VELLORE DISTRICT 632517" },
{ "code": "1511", "name": "RANIPPETTAI ENGINEERING COLLEGE, THENKADAPPANTHANGAL, VELLORE DISTRICT 632514" },
{ "code": "1511", "name": "RANIPPETTAI ENGINEERING COLLEGE, THENKADAPPANTHANGAL, VELLORE DISTRICT 632513" },
{ "code": "1512", "name": "S.K.P. Engineering College, Chinnkangiyanur, Somasipadi Post, Tiruvannamalai District-606611." },
{ "code": "1513", "name": "Sri Balaji Chockalingam Engineering College, Irumbedu, Arni Taluk,Tiruvannamalai District-632317." },
{ "code": "1516", "name": "Thanthai Periyar Government Institute of Technology Bagayam Vellore District 632002" },
{ "code": "1517", "name": "Thirumalai Engineering College, Kilambi, Krishnapuram Post, Kanchipuram-631551." },
{ "code": "1518", "name": "Thiruvalluvar College of Engineering and Technology, Arunachala City,Ponnur Hills, Vandavasi, Thiruvannamalai District-604505." },
{ "code": "1519", "name": "Bharathidasan Engineering College, K.Bandarapalli Post, Nattrampalli, Vellore District-635854." },
{ "code": "1520", "name": "Kingston Engineering College, Chittoor Main Road, Chiristianpet Village, Mettukulam Panchayat, Katpadi Taluk, Vellore District- 632059." },
{ "code": "1523", "name": "Global Institute of Engineering and Technology, 257/1, Bangalore-Chennai Highway,Melvisharam, Vellore-632509." },
{ "code": "1524", "name": "Annamalaiar College Of Engineering, Chetpet-Polur Road, Polur Taluk, Thiruvannamalai District-606902." },
{ "code": "1525", "name": "Podhigai College of Engineering and Technology, Salem Main Road, Adiyur Post, Tirupattur Taluk,Tirupattur, Vellore District.- 635601." },
{ "code": "1526", "name": "Sri Krishna College of Engineering, T.R.S. Campus, Sri Krishna Nagar, Tiruttani Road,Arakkonam, Vellore-631003." },
{ "code": "1529", "name": "Oxford College of Engineering, Venmani Village, Karaipoondi Post, Polur, Tiruvannamalai-606803." },
{ "code": "1605", "name": "Idhaya Engineering College for Women, Nainarpalayam Road,Chinna Salem, Villupuram District.-606201." },
{ "code": "2005", "name": "Government College of Technology (Autonomous) Thadagam Road Coimbatore District 641013" },
{ "code": "2006", "name": "PSG College of Technology (Autonomous) Peelamedu Coimbatore District 641004" },
{ "code": "2007", "name": "Coimbatore Institute of Technology (Autonomous) Civil Aerodrome Post Coimbatore District 641014" },
{ "code": "2025", "name": "Anna University Regional Campus - Coimbatore Maruthamalai Main Road Navavoor Bharathiyar University Post Somayampalayam Coimbatore District 641046" },
{ "code": "2302", "name": "Sri Shanmugha College of Engineering and Technology (Autonomous), Pullipalayam, Morur(PO), Sankari Taluk, Salem District- 637304." },
{ "code": "2327", "name": "N.S.N. College of Engineering and Technology, N.S.N, Kalvi Nagar, Karur - Madurai NH-7, Manalmedu, Karur-639003." },
{ "code": "2329", "name": "Rathinam Technical Campus (Autonomous), Rathinam Techzone Campus, Pollachi Road, Eachanari, Coimbatore-641021." },
{ "code": "2332", "name": "Aishwarya College of Engineering and Technology, Errattaikarad, Paruvachi (Post), Anthiyur, Bhavani (Taluk), Erode District- 638312." },
{ "code": "2338", "name": "Asian College of Engineering and Technology,294/2,Asian College Road, Kondayampalayam, Near Saravanampatti, Coimbatore- 641110." },
{ "code": "2341", "name": "Ganesh College of Engineering, Attur Main Road, Mettupatti, Salem-636111." },
{ "code": "2342", "name": "Sri Ranganathar Institute of Engineering and Technology(Autonomous), S.F No:162, Athipalayam village, Thudiyalur-kovilpalayam Road, Coimbatore641110." },
{ "code": "2343", "name": "Indian Institute of Handloom Technology Foulke's Compound Thillai Nagar Salem District 636001" },
{ "code": "2345", "name": "Dhirajlal Gandhi College of Technology, Sikkanampatty, Opposite to Airport,Omalur Taluk, Salem District-636309." },
{ "code": "2346", "name": "Shree Sathyam College of Engineering and Technology, Manjakkal Patti, Kuppanur Post, Sankari Taluk, Salem District-637301." },
{ "code": "2347", "name": "A V S College of Technology, Attur Main Road, Near AVS College of Arts & Science, Chinnagoundapuram, Salem-636106." },
{ "code": "2349", "name": "Dhaanish Ahmed Institute of Technology, Pitchanur Village, Coimbatore-641018." },
{ "code": "2350", "name": "Jairupaa College of Engineering, Thottiapalayam, Kathankanni-Po, Kangayam-Tk, Tiruppur-641604." },
{ "code": "2354", "name": "Pollachi Institute of Engineering and Technology, 107/1, Poosaripatti Village, Pollachi to Dharapuram road, Poosaripatti(post) Pollachi, Coimbatore642205." },
{ "code": "2356", "name": "Arulmurugan College of Engineering, Karvazhi Road, Thennilai, Aravakurichy Taluk, Karur-639206." },
{ "code": "2357", "name": "V.S.B. College of Engineering Technical Campus (Autonomous), S.F. No.91/2A,91/2B,252,253/1, Solavampalayam Village, Kinathukadavu, Pollachi Taluk, Coimbatore District-642109." },
{ "code": "2360", "name": "Suguna College of Engineering, Nehru Nagar (West), Kalapatti Road, Civil Aerodrome (Post), Coimbatore-641014." },
{ "code": "2367", "name": "Arjun College of Technology, 310/1B, Chettiyakkapalayam, Kinathukadavu, Coimbatore-642120." },
{ "code": "2368", "name": "Vishnu Lakshmi College of Engineering and Technology, 10/1,Kambar Street, Kanjikonampalayam, Vellalore(PO), Coimbatore- 641111." },
{ "code": "2369", "name": "Government College of Engineering Chettikkarai Post Dharmapuri District 635704" },
{ "code": "2377", "name": "PSG Institute of Technology and Applied Research, Avinashi Road,Neelambur, Sulur,Coimbatore -641062." },
{ "code": "2378", "name": "Cheran College of Technology, Cheran Nagar, Thittuparai, Kangeyam, Tiruppur-638701." },
{ "code": "2601", "name": "Adhiyamaan College of Engineering (Autonomous), Aeri Campus, Dr.M.G.R.Nagar, Hosur, Krishnagiri District-635109." },
{ "code": "2602", "name": "Annai Mathammal Sheela Engineering College, Erumapatty Post, Namakkal-637013." },
{ "code": "2603", "name": "Government College of Engineering (Autonomous) Bargur Krishnagiri District 635104" },
{ "code": "2607", "name": "K S Rangasamy College of Technology (Autonomous), K.S.R Kalvi Nagar, Thokkavadi, Tiruchengode Tk, Namakkal-637215." },
{ "code": "2608", "name": "M.Kumarasamy College of Engineering (Autonomous), Thalavapalayam Post,Punjai Thottakkurichi Village, Karur Tk, Karur- 639113." },
{ "code": "2609", "name": "Mahendra Engineering College (Autonomous), Mahendhirapuri, Mallasamudram West, Vadugapalayam Post,Tiruchengodu Taluk, Namakkal District637503." },
{ "code": "2610", "name": "Muthayammal Engineering College (Autonomous), Kakkaveri, Rasipuram (Tk), Namakkal District-637408." },
{ "code": "2611", "name": "Paavai Engineering College (Autonomous), NH-7, Paavai Nagar, Pachal, Namakkal-637018." },
{ "code": "2612", "name": "PGP College of Engineering and Technology, Namakkal-Paramathi NH 7 Road, Namakkal-637207." },
{ "code": "2613", "name": "K S R College of Engineering (Autonomous), K S R Kalvi Nagar, Thokkavadi, Tiruchengode, Namakkal Dist-637215." },
{ "code": "2614", "name": "SSM College of Engineering, NH-47 Salem Main Road, Komarapalayam, Namakkal District-638183." },
{ "code": "2615", "name": "Government College of Engineering (Autonomous) Karuppur Salem District 636011" },
{ "code": "2616", "name": "Sapthagiri College of Engineering, NH-7, Krishnagiri Main Road,Palacode Taluk Periyanahalli Village & Post Dharmapuri District- 635205." },
{ "code": "2617", "name": "Sengunthar Engineering College (Autonomous), Kosavampalayam, Kumaramangalam (Post),Tiruchengode (Taluk),Namakkal District-637205." },
{ "code": "2618", "name": "Sona College of Technology (Autonomous), Sona Nagar, Thiagarajar Polytechnic College Road, Suramangalam (P.O),Salem District- 636005." },
{ "code": "2620", "name": "Vivekanandha College of Engineering for Women (Autonomous), Sathiyanaickenpalayam Village, Elayampalayam, Tiruchengode, Namakkal District637205." },
{ "code": "2621", "name": "Er. Perumal Manimekalai College of Engineering (Autonomous), 17th Km Hosur - Krishnagiri NH7, Nallaganakothapalli, Near Koneripalli, Hosur Taluk, Krishnagiri District-635117." },
{ "code": "2622", "name": "V S B Engineering College (Autonomous), N.H.67, Covai Road, Karudayampalayam (Village & Post), Aravakurichi (TK), Karur- 639111." },
{ "code": "2623", "name": "Mahendra College of Engineering, 12th KM Attur Main Road, Minnampalli, Salem-636106." },
{ "code": "2624", "name": "Gnanamani College of Technology (Autonomous), NH-7, A.K. Samuthiram, Pachal Post, Namakkal District-637018." },
{ "code": "2625", "name": "The Kavery Engineering College, M. Kalipatti, Mecheri (Post), Mettur Taluk, Salem District-636453." },
{ "code": "2627", "name": "Selvam College of Technology (Autonomous), Salem Road NH-7, Pappinaickenpatti (Post), Ponnusamy Nagar, Namakkal (Tk & Dt)- 637003." },
{ "code": "2628", "name": "Paavai College of Engineering, Paavai Nagar, NH-7,Pachal, Namakkal-637018." },
{ "code": "2630", "name": "Chettinad College of Engineering and Technology, NH-67, Karur to Trichy Highways, Puliyur CF, Karur-639114." },
{ "code": "2632", "name": "Mahendra Institute of Technology (Autonomous), Mahendhirapuri, Mallasamudram West, Vadugapalayam Post, Tiruchengodu Taluk, Namakkal District637503." },
{ "code": "2633", "name": "Vidyaa Vikas College of Engineering and Technology, Varahoorampatti Village, Tiruchengode Taluk, Namakkal-637214." },
{ "code": "2634", "name": "Excel Engineering College (Autonomous), NH-47 Salem Main Road, Sankari West Post, Tiruchengode Taluk, Pallakapalayam, Namakkal District-637303." },
{ "code": "2635", "name": "CMS College of Engineering, CMS Nagar, Eranapuram Post, Namakkal-637003." },
{ "code": "2636", "name": "AVS Engineering College, Military Road, Ammapet, Salem-636003." },
{ "code": "2638", "name": "Mahendra Engineering College for Women, Komaramanagalam Post,Tiruchengode Taluk,Namakkal District-637205." },
{ "code": "2639", "name": "R P Sarathy Institute of Technology , Poosaripatty(PO), Omalur Taluk, Salem-636305." },
{ "code": "2640", "name": "Jayalakshmi Institute of Technology, Thoppur, Dharmapuri District-636352." },
{ "code": "2641", "name": "Varuvan Vadivelan Institute of Technology, NH 7, Krishnagiri Main Road, Gundalapatty, Dharmapuri-636703." },
{ "code": "2642", "name": "P.S.V.College of Engineering and Technology, Mittapalli, Balinayanapalli Post, Krishnagiri-635108." },
{ "code": "2643", "name": "Bharathiyar Institute of Engineering for Women, 43/3, Deviyakurichi, Attur Taluk,Salem District-636112." },
{ "code": "2646", "name": "Tagore Institute of Engineering and Technology, Salem-Chennai Bye Pass Road, Deviyakurichi (Po), Attur (Tk), Salem (Dt)-636112." },
{ "code": "2647", "name": "J.K.K.Nataraja College of Engineering and Technology, Sf No. 147/1,2,4 Komarapalayam Amani, Thattankuttai Panchayat, Tiruchengode, Namakkal638183." },
{ "code": "2648", "name": "Annapoorana Engineering College (Autonomous), Sankari Main Road (NH-47), Periyaseeragapadi, Salem-636308." },
{ "code": "2650", "name": "Christ The King Engineering College, Cecilia Gardens, Chikkarampalayam Village, Karamadai, Coimbatore-641104." },
{ "code": "2651", "name": "Jai Shriram Engineering College , Dharapuram Road, Tirupur-638660." },
{ "code": "2652", "name": "AL-Ameen Engineering College (Autonomous), Karundevanpalayam, Nanjai Uthukkuli Post, Erode District-638104." },
{ "code": "2653", "name": "Knowledge Institute of Technology (Autonomous), KIOT Campus, Kakapalayam (PO), Salem-637504." },
{ "code": "2656", "name": "Builders Engineering College (Autonomous), EBET Knowledge Park, Erode Road Nathakadaiyur, Kangeyam, Tiruppur-638108." },
{ "code": "2658", "name": "V S A Group of Institutions, NH-47 Main Road, Uthamasolapuram Post, Salem-636010." },
{ "code": "2659", "name": "Salem College of Engineering and Technology, NH-68 Salem-Attur Main Road, Mettupatty Perumapalayam, Salem-636111." },
{ "code": "2673", "name": "Sree Sakthi Engineering College (Autonomous), 899/1 & 898/2, Bettathapuram, Bilichi Village, Karamadai, Coimbatore-641104." },
{ "code": "2683", "name": "Shreenivasa Engineering College, B.Pallipatti, Bommidi, Pappireddipatti Taluk, Dharmapuri District-635301." },
{ "code": "2702", "name": "Bannari Amman Institute of Technology (Autonomous), Sathy-Bhavani Road, (State Highway), Alathukombai Post, Sathyamangalam (Taluk), Erode District-638401." },
{ "code": "2704", "name": "Coimbatore Institute of Engineering and Technology (Autonomous), Vellimalaipattinam, Narasipuram Post, Thondamuthur Via, Coimbatore-641109." },
{ "code": "2705", "name": "CSI College of Engineering, Ketti Valley, The Nilgiris-643215." },
{ "code": "2706", "name": "Dr Mahalingam College of Engineering and Technology (Autonomous), Mackkinaickenpatti Post, Udumalai Road, Pollachi, Coimbatore-642003." },
{ "code": "2707", "name": "Erode Sengunthar Engineering College (Autonomous), Thudupathi, Perundurai (Tk), Erode District-638057." },
{ "code": "2708", "name": "Hindusthan College of Engineering and Technology(Autonomous), Othakkalmandapam Village, Coimbatore South Taluk, Coimbatore District-641032." },
{ "code": "2709", "name": "Government College of Engineering (Formerly Institute of Road and Transport Technology) Vasavi College Post Erode District 638316" },
{ "code": "2710", "name": "Karpagam College of Engineering (Autonomous), S.F.No.758,759,760 Othakkal Mandapam, Coimbatore -641032." },
{ "code": "2711", "name": "Kongu Engineering College (Autonomous), Perundurai Railway Station Road,Thoppupalayam,Perundurai, Erode-638052." },
{ "code": "2712", "name": "Kumaraguru College of Technology (Autonomous), Chinnavedampatti, Coimbatore-641049." },
{ "code": "2713", "name": "M.P.Nachimuthu M.Jaganathan Engineering College, Chennimalai, Erode-638112." },
{ "code": "2715", "name": "Nandha Engineering College (Autonomous),28, Chennimalaipalayam Road, Pitchandampalayam Post, Erode-638052." },
{ "code": "2716", "name": "Park College of Engineering and Technology, Avinashi Road (NH-47), Kaniyur,Coimbatore-641659." },
{ "code": "2717", "name": "Sasurie College of Engineering, Vijayamangalam, Tirupur District-638056." },
{ "code": "2718", "name": "Sri Krishna College of Engineering and Technology (Autonomous), Sugunapuram, Kuniamuthur Post, Coimbatore-641008." },
{ "code": "2719", "name": "Sri Ramakrishna Engineering College (Autonomous), Vattamalaipalayam, NGGO Colony Post, Coimbatore-641022." },
{ "code": "2721", "name": "Tamilnadu College of Engineering, Palanisame Ravi Nagar, Karumathampatti Post, Coimbatore-641659." },
{ "code": "2722", "name": "Sri Krishna College of Technology (Autonomous), Kovaipudur Post, Coimbatore-641042." },
{ "code": "2723", "name": "Velalar College of Engineering and Technology (Autonomous), Perundurai Road Thindal Post, Erode-638012." },
{ "code": "2725", "name": "Sri Ramakrishna Institute of Technology (Autonomous), Pachapalayam, Perur Chettipalayam, Coimbatore-641010." },
{ "code": "2726", "name": "SNS College of Technology (Autonomous), Sathy Main Road, Vazhiyampalayam, Saravanampatti Post, Coimbatore-641035." },
{ "code": "2727", "name": "Sri Shakthi Institute of Engineering and Technology (Autonomous), Sri Shakthi Nagar, L & T By-pass Road, Chinniyampalayam Post, Coimbatore-641062." },
{ "code": "2729", "name": "Nehru Institute of Engineering and Technology (Autonomous), Nehru Gardens, Thirumalayampalayam (Post), Coimbatore- 641105." },
{ "code": "2731", "name": "RVS College of Engineering and Technology (Autonomous), Kumaran Kottam Campus, Kannampalayam Post, Coimbatore-641402." },
{ "code": "2732", "name": "Info Institute of Engineering, S F No.194-200, N.H.209, Sathy Road, Sarakarsamakulam, Kovilpalayam, Coimbatore-641107." },
{ "code": "2733", "name": "Angel College of Engineering and Technology, PK Palayam PO,Dharapuram Main Road, Ugayanur village, Tiruppur-641665." },
{ "code": "2734", "name": "SNS College of Engineering (Autonomous), Sathy Main Road, Kurumbapalayam Post, Coimbatore-641107." },
{ "code": "2735", "name": "Karpagam Institute of Technology (Autonomous), S.F. NO.247,248, L&T Bypass Road, Seerapalayam Village, Bodipalayam Post, Coimbatore-641105." },
{ "code": "2736", "name": "Dr N.G.P. Institute of Technology (Autonomous), Dr. N.G.P. Nagar, Kalapatti Road, Coimbatore-641048." },
{ "code": "2737", "name": "Sri Sai Ranganathan Engineering College , Viraliyur Post, Thondamuthur(via), Coimbatore-641109." },
{ "code": "2739", "name": "Sri Eshwar College of Engineering (Autonomous), Kondampatti Post, Vadasithur Via, Coimbatore-641202." },
{ "code": "2740", "name": "Hindusthan Institute of Technology (Autonomous), Othakkalmandapam Post, Coimbatore-641032." },
{ "code": "2741", "name": "P A College of Engineering and Technology (Autonomous), Palladam Road, Pollachi, Coimbatore Dt.-642002." },
{ "code": "2743", "name": "Dhanalakshmi Srinivasan College of Engineering (CBE), NH-47, Palakkad Main Road, Navakkarai Post, Coimbatore-641105." },
{ "code": "2744", "name": "Adithya Institute of Technology (Autonomous), S.F.No. 348/1,349/1, Kurumbapalayam, SS Kulam(PO), Coimbatore-641107." },
{ "code": "2745", "name": "Kathir College of Engineering (Autonomous), WISDOM TREE, Avinashi Road, Neelambur, Coimbatore-641062." },
{ "code": "2747", "name": "Shree Venkateshwara Hi-Tech Engineering College (Autonomous), Erode-Sathy Main Road,Sri Kalaivani Nagar, Othakuthirai,K, Mettupalayam (Po), Gobichettipalayam (Tk), Erode (Dt)-638455." },
{ "code": "2748", "name": "Surya Engineering College, Perundurai Road,Manalmedu, Mettukadai,Kathirampatti Post, Erode-638107." },
{ "code": "2749", "name": "Easa College of Engineering and Technology, NH-47, Palakkad main Road, Navakkarai Post, Coimbatore-641105." },
{ "code": "2750", "name": "KIT - Kalaignarkarunanidhi Institute of Technology (Autonomous), S.F.No.282,S.F.No.283 Kannampalayam Post, Coimbatore- 641402." },
{ "code": "2751", "name": "KGISL Institute of Technology, 365, KGISL Campus, Thudiyalur Road, Saravanampatti, Coimbatore-641035." },
{ "code": "2752", "name": "Nandha College of Technology,235, Chennimalaipalayam Road, Pitchandampalayam Post, Veppampalayam Village, Erode- 638052." },
{ "code": "2753", "name": "PPG Institute of Technology, Rathnagiri Road, Saravanampatti, Coimbatore-641035." },
{ "code": "2755", "name": "Nehru Institute of Technology (Autonomous), Jawahar Gardens, Kaliapuram, Thirumalayampalayam, Coimbatore-641105." },
{ "code": "2758", "name": "JKK Munirajah College of Technology (Autonomous), 377/1A, Punjai Thurayampalayam, Thookkanickenpalayam (Post), Thookkanickenpalayam, Gobi (Tk), Erode-638506." },
{ "code": "2761", "name": "United Institute of Technology (Autonomous), G.Koundampalayam, Periyanaickenpalayam, Coimbatore-641020." },
{ "code": "2762", "name": "Jansons Institute of Technology (Autonomous), SF.NO.443/1,2, 442/1A & 442/1B Karumathampatty, Coimbatore-641659." },
{ "code": "2763", "name": "Akshaya College of Engineering and Technology, SF No.112/1CPT,114/1,115/1,116/2C, Bagavathipalayam Road,Kinathukadavu, Coimbatore-642109." },
{ "code": "2764", "name": "KPR Institute of Engineering and Technology (Autonomous), SF:204/2 &204/4, Kollupalayam Village, Arasur Panchayat, Coimbatore-641407." },
{ "code": "2767", "name": "SRG Engineering College, SH-95,Mohanur Road, Aniyapuram, Namakkal-637017." },
{ "code": "2768", "name": "Park College of Technology, Prema Ravi Nagar, Karumathampatty, Coimbatore-641659." },
{ "code": "2769", "name": "JCT College of Engineering and Technology (Autonomous), Pichanur, Coimbatore South Taluk, Coimbatore-641105." },
{ "code": "2770", "name": "Studyworld College of Engineering, Alagu Nachiamman Koil Road, Palathurai Post, Coimbatore-641105." },
{ "code": "2772", "name": "C M S College of Engineering and Technology, Appachigoundapathy, Kumittipathy Post, Coimbatore-641032." },
{ "code": "2776", "name": "R V S Technical Campus Coimbatore, Kumaran Kottam Campus, Kannampalayam, Sulur, Coimbatore-641402." },
{ "code": "3011", "name": "University College of Engineering Tiruchirappalli (Bharathidasan Institute of Technology) Tiruchirappalli District 620024" },
{ "code": "3016", "name": "University College of Engineering Ariyalur Kathankudikadu Village Thelur Post Ariyalur District 621704" },
{ "code": "3018", "name": "University College of Engineering Thirukkuvalai Nagappattinam District 610204" },
{ "code": "3019", "name": "University College of Engineering Panruti Chennai-Kumbakonam Highway Panikkankuppam Panruti Cuddalore District 607106" },
{ "code": "3021", "name": "University College of Engineering Pattukkottai ECR Road Rajamadam Pattukkottai Taluk Thanjavur District 614701" },
{ "code": "3410", "name": "Krishnasamy College of Engineering and Technology, Nellikuppam Main Road, S.Kumarapuram, Cuddalore-607109." },
{ "code": "3425", "name": "C.K. College of Engineering & Technology, Jayaram Nagar, Chellangkuppam, Cuddalore-607003." },
{ "code": "3454", "name": "Sri Ramakrishna College of Engineering, Sri Saradha Nagar, NH - 45, Perambalur-621113." },
{ "code": "3456", "name": "KSK College of Engineering and Technology, Thanjavur Main Road, Ammapet (Village), Dharasuram Post, Kumbakonam Taluk, Thanjavur District612702." },
{ "code": "3460", "name": "Surya College of Engineering , Somu Nagar, Konalai, Tiruchirappalli-621132." },
{ "code": "3461", "name": "Arifa Institute of Technology, Esanoor, Keelaiyur Post, Tirukkuvalai Taluk, Nagapattinam District-611103." },
{ "code": "3464", "name": "Government College of Engineering Gandarvakottai Road Sengipatti Thanjavur District 613402" },
{ "code": "3465", "name": "Government College of Engineering Srirangam Sethurappatti Tiruchirappalli District 620012" },
{ "code": "3466", "name": "Nelliandavar Institute of Technology, Nerunjikorai Village, Pudhupalayam, Ariyalur Taluk & District-621704." },
{ "code": "3701", "name": "K Ramakrishnan College of Technology (Autonomous), Kariyamanickam Road, Mannachanallur Taluk, Tiruchirappalli-621112." },
{ "code": "3760", "name": "Sir Issac Newton College of Engineering and Technology, Andhanapeetai Post, Pappakoil, Nagapattinam-611102." },
{ "code": "3766", "name": "Star Lion College of Engineering and Technology, Main Road, Manankorai, Thanjavur-614206." },
{ "code": "3782", "name": "OASYS Institute of Technology, Tiruchirappalli-Thuraiyur Mani Road, Pulivalam P.O Musiri Taluk, Tiruchirappalli-621006." },
{ "code": "3786", "name": "M.A.M. School of Engineering (Autonomous), Trichy-Chennai Trunk Road, Siruganur, Tiruchirappalli-621105." },
{ "code": "3795", "name": "SRM TRP Engineering College Irungalur Manachanallur Taluk Tiruchirappalli District 621105" },
{ "code": "3801", "name": "A.V.C. College of Engineering, Mannampandal, Mayiladuthurai, Nagapattinam-609305." },
{ "code": "3803", "name": "Anjalai Ammal Mahalingam Engineering College, Kovilvenni, Thiruvarur-614403." },
{ "code": "3804", "name": "Arasu Engineering College, Chennai Main Road, Thiruvisanallur - Village, Thiruvidaimaruthur - Taluk, Kumbakonam,Thanjavur- 612501." },
{ "code": "3805", "name": "Dhanalakshmi Srinivasan Engineering College (Autonomous), Thuraiyur Road, Perambalur-621212." },
{ "code": "3806", "name": "E.G.S. Pillay Engineering College (Autonomous), Old Nagore Road, Nagore Post, Nagapattinam District-611002." },
{ "code": "3807", "name": "J.J. College of Engineering and Technology, Ammapettai, Poolankulathupatti Post, Tiruchirappalli-620009." },
{ "code": "3808", "name": "Jayaram College of Engineering and Technology, Karattampatty, Pagalavadi, Thuraiyur Taluk, Tiruchirappalli-621014." },
{ "code": "3810", "name": "M A M College of Engineering, Trichy-Chennai Trunk Road, Siruganur, Tiruchirappalli-621105." },
{ "code": "3811", "name": "M.I.E.T. Engineering College (Autonomous), Trichy - Pudukkottai Road, Gundur, Tiruchirappalli-620007." },
{ "code": "3812", "name": "Mookambigai College of Engineering, Srinivasa Nagar, Kalamavur (PO), Keeranur, Pudukkottai-622502." },
{ "code": "3813", "name": "Oxford Engineering College, Pirattiyur, Tiruchirappalli-620009." },
{ "code": "3815", "name": "Pavendar Bharathidasan College of Engineering and Technology, Thanjai Natarajan Nagar, Opp. to Bharathidasan University, Pudukkottai Main Raod, Mathur, Kulathur, Pudukkottai-622515." },
{ "code": "3817", "name": "Roever Engineering College, Elambalur (Post), Perambalur-621212." },
{ "code": "3819", "name": "Saranathan College of Engineering (Autonomous), Venkateswara Nagar, Edamalaipattipudur Post, Panjappur Village, Srirangam Taluk, Tiruchirappalli620012." },
{ "code": "3820", "name": "Trichy Engineering College, somu Nagr,Konalai, Tiruchirappalli-621132." },
{ "code": "3821", "name": "A.R.J College of Engineering and Technology, Thirumakkottai Main Road, Edayarnatham Village, Sundarakkottai (PO), Mannargudi Taluk, Thiruvarur614001." },
{ "code": "3822", "name": "Dr.Navalar Nedunchezhiyan College of Engineering, Raja Nagar, Vaithiyanathapuram, Tholudur, Cuddalore-606303." },
{ "code": "3825", "name": "St. Joseph's College of Engineering and Technology, A.S.Nagar, Ellupatti, Rawasapatti Post, Inathukanpatti Village, Thanjavur- 613403." },
{ "code": "3826", "name": "Kongunadu College of Engineering and Technology (Autonomous), Tholurpatti, Thottiam, Tiruchirappalli-621215." },
{ "code": "3829", "name": "M.A.M. College of Engineering and Technology, Trichy-Chennai Trunk Road, Siruganur, Manachanallur Taluk, Tiruchirappalli- 621105." },
{ "code": "3830", "name": "K. Ramakrishnan College of Engineering (Autonomous), Kariyamanickam Road, Samayapuram, Tiruchirappalli-621112." },
{ "code": "3831", "name": "Indra Ganesan College of Engineering, Madurai Main Road, Manikandam, Tiruchirappalli-620012." },
{ "code": "3833", "name": "Parisutham Institute of Technology and Science (Autonomous), NH 67 Ring Road, Nanjikottai, Thanjavur-613006." },
{ "code": "3841", "name": "CARE College of Engineering (Autonomous), No.27, Thayanoor village, Kuttapatti, Tiruchirappalli-620009." },
{ "code": "3843", "name": "MRK Institute of Technology, Nattarmangalam Post, Kattumannarkoil, Cuddalore-608301." },
{ "code": "3844", "name": "Shivani Engineering College, Poolangulathupatti (Post), Srirangam (Taluk), Tiruchirappalli-620009." },
{ "code": "3845", "name": "Imayam College of Engineering, Kannanur Post, Thuraiyur Taluk, Tiruchirappalli-621206." },
{ "code": "3846", "name": "Mother Terasa College of Engineering and Technology, Mettusalai, Illuppur (Post & Taluk), Pudukkottai District-622102." },
{ "code": "3848", "name": "Vandayar Engineering College, Pulavarnatham (Post), Mariammankovil (via), Nagai Main Road, Thanjavur-613501." },
{ "code": "3849", "name": "Annai College of Engineering and Technology, Anakudi Road, Kovilacheri, Kumbakonam, Thanjavur District-612503." },
{ "code": "3852", "name": "Sri Bharathi Engineering College for Women, Aranthangi Road, Kaikurichi, Alangudi Taluk, Pudukkottai-622303." },
{ "code": "3854", "name": "Mahath Amma Institute of Engineering and Technology, Ariyur, Mathiyanaloor-Post, Annavasal Road, Illupur Taluk, Pudukkottai- 622101." },
{ "code": "3855", "name": "As-Salam College of Engineering and Technology, Thirumangalakudi-Aduthurai, Thiruvidaimaruthur, Thanjavur-612102." },
{ "code": "3857", "name": "Meenakshi Ramaswamy Engineering College, M.R.Kalvi Nagar, Thathanur Post, Udayarpalayam Taluk, Ariyalur District-621804." },
{ "code": "3860", "name": "St.Anne's College of Engineering and Technology, Anguchettypalayam, Siruvathur Post, Panruti Taluk, Cuddalore District-607110." },
{ "code": "3905", "name": "Kings College of Engineering (Autonomous), Punalkulam Village, Gandarvakkottai Taluk, Pudukkottai District-613303." },
{ "code": "3908", "name": "Mount Zion College of Engineering and Technology, Lena vilakku, Pilivalam Post, Pudukkottai-622507." },
{ "code": "3918", "name": "Shanmuganathan Engineering College, Arasampatti, Pilivalam Post, Thirumayam Taluk, Pudukkottai District-622507." },
{ "code": "3920", "name": "Sudharsan Engineering College, Sathiyamangalam, Kulathur Taluk, Pudukkottai District-622501." },
{ "code": "3923", "name": "MNSK College of Engineering, Dhakshinapuram Village, Vallathirakottai (Post), Alangudi Taluk, Pudukkottai-622305." },
{ "code": "3926", "name": "Chendhuran College of Engineering and Technology, Madurai Main Road, Lena Vilakku, Pilivalam Post, Thirumayam Taluk, Pudukkottai District-622507." },
{ "code": "4020", "name": "Anna University Regional Campus - Tirunelveli Trivandrum Road Palayamkottai Tirunelveli District 627007" },
{ "code": "4023", "name": "University College of Engineering Nagercoil Nagercoil Industrial Estate Konam Kanyakumari District 629004" },
{ "code": "4024", "name": "University V.O.C. College of Engineering Thoothukudi Near V.O.C. College Millerpuram Thoothukudi District 628008" },
{ "code": "4669", "name": "Thamirabharani Engineering College, Ward - 1, Thatchanallur, Chattiram Puthukullam Village, Vepakullam - Chidhabra Nagar Road, Tirunelveli-627358." },
{ "code": "4670", "name": "Rohini College of Engineering and Technology (Autonomous), Palkumlam, Variyoor Post, Kanyakumari-629401." },
{ "code": "4672", "name": "Stella Mary's College of Engineering, Arunthenkanvilai, Azhikal, Kanyakumari-629202." },
{ "code": "4675", "name": "Universal College of Engineering and Technology, Anbagam Campus, Kadambankulam, Villakku, Radhapuram Road, Vallioor, Tirunelveli-627117." },
{ "code": "4676", "name": "Renganayagi Varatharaj College of Engineering, Salvarpatti Village & Post, Thayilpatti Via, Sivakasi Taluk, Virudhunagar-626128." },
{ "code": "4677", "name": "Arunachala Hitech Engineering College (formerly Lourdes Mount College of Engineering and Technology), Marthandam-Karungal Road, Chundavilai Mullanganavilai, Nattalam Post, Nattalam, Kanyakumari -629195." },
{ "code": "4678", "name": "RAMCO Institute of Technology, North Venganallur Village, Krishnapuram Panchayat, Rajapalayam, Virudhunagar-626117." },
{ "code": "4680", "name": "AAA College of Engineering and Technology, Amathur Village, Sivakasi, Virudhunagar-626123." },
{ "code": "4686", "name": "Good Shepherd College of Engineering and Technology, Maruthamparai, Kaliyal Village, Kaliyal, Kanyakumari-629151." },
{ "code": "4864", "name": "V V College of Engineering, V.V. Nagar, Arasur Village, Idaichivilai Post, Sathankulam Taluk, Tuticorin District, Tirunelveli-628656." },
{ "code": "4917", "name": "Sethu Institute of Technology (Autonomous), Pulloor, Kariapatti, Virudhunagar-626115." },
{ "code": "4925", "name": "Sun College of Engineering and Technology, Udaya Nagar, Ammandivilai & Post, Kadiyapattanam, Kanyakumari-629204." },
{ "code": "4927", "name": "Maria College of Engineering and Technology, Attoor Puliyamoodu Junction, Thiruvattar P.O, Attoor, Kanyakumari-629177." },
{ "code": "4928", "name": "Mar Ephraem College of Engineering and Technology, Malankara Hills, Elavuvillai, Kanyakumari-629171." },
{ "code": "4929", "name": "M.E.T. Engineering College, No.13/142A9/9,Mogals Garden, Chenbagaramanputhur, Thovalai Taluk, Kanyakumari district, Nagercoil-629304." },
{ "code": "4931", "name": "Grace College of Engineering , Chandy Nagar, Mullakkadu, Thoothukudi -628005." },
{ "code": "4932", "name": "Immanuel Arasar JJ College of Engineering, Edavilagam, Nattalam, Marthandam, Kanyakumari-629195." },
{ "code": "4933", "name": "St. Mother Theresa Engineering College, Vagaikulam, Mudivaithanendal Post, Tuticorin District-628102." },
{ "code": "4934", "name": "Holy Cross Engineering College, 7/131, Vagaikulam Srivaikuntam Express Road, Sri Mulakarai, Thannoothu Village, Srivaikuntam Taluk, Thoothukudi628851." },
{ "code": "4937", "name": "A.R College of Engineering and Technology, Kadayam - Alangulam Road, Near Railway Station, Kadayam, Therkkumadathur, Tirunelveli-627423." },
{ "code": "4938", "name": "Sivaji College of Engineering and Technology, Manivilai Post, Kanyakumari -629171." },
{ "code": "4941", "name": "Unnamalai Institute of Technology, Suba Nagar, Ayyaneri Post, Kovilpatti, Thoothukudi District-628502." },
{ "code": "4943", "name": "Satyam College of Engineering and Technology, Satyam Nagar, Kannappannalur, Aralvoimozhi, Kanyakumari District-629301." },
{ "code": "4944", "name": "Arunachala College of Engineering for Women, Thanka Gardens, Manavilai, Vellichanthai, Nagercoil, Kanyakumari District- 629203." },
{ "code": "4946", "name": "DMI Engineering College, Kumarapuram Road, Aralvaimozhi, Kanyakumari District-629301." },
{ "code": "4949", "name": "PSN Institute of Technology and Science, Melathediyoor, Palayamkottai Taluk, Tirunelveli-627152." },
{ "code": "4952", "name": "C.S.I. Institute of Technology, Thovalai & PO, Kanyakumari District, Nagercoil-629302." },
{ "code": "4953", "name": "Cape Institute of Technology, Rajakrishnapuram Post, Radhapuram Taluk, Levengipuram, Tirunelvei-627114." },
{ "code": "4954", "name": "Dr Sivanthi aditanar College of Engineering, Tirunelveli Road, Tiruchendur, Thoothukudi-628215." },
{ "code": "4955", "name": "Francis Xavier Engineering College (Autonomous), 103 G2, By Pass Road, Vannarpettai, Tirunelveli-627003." },
{ "code": "4956", "name": "Jayamatha Engineering College, Thirurajapuram Muppandal, Aralvaimozhi, Kanyakumari-629301." },
{ "code": "4957", "name": "Jayaraj Annapackiam CSI College of Engineering, Margoschis Nagar, Nazareth, Thoothukudi District-628617." },
{ "code": "4959", "name": "Kamaraj College of Engineering and Technology (Autonomous), S.P.G.C.Nagar Post Box12, K.Vellakulam, Virudhunagar-626001." },
{ "code": "4960", "name": "Mepco Schlenk Engineering College (Autonomous), Sivakasi,Mepco Engineering College Post,Virudhunagar District-626005." },
{ "code": "4961", "name": "Nellai College of Engineering , Maruthakulam P.O, Nanguneri Taluk, Tirunelveli-627151." },
{ "code": "4962", "name": "National Engineering College (Autonomous), K.R. Nagar, Nalattinputhur, Kovilpatti, Tuticorin District-628503." },
{ "code": "4964", "name": "PSN College of Engineering and Technology (Autonomous) Melathediyoor Tirunelveli-627 152" },
{ "code": "4965", "name": "P.S.R. Engineering College (Autonomous), Appayanaickenpatty, Sevalpatty, Sivakasi, Virudhunagar District -626140." },
{ "code": "4966", "name": "PET Engineering College, Thiruchendur Road, Vallioor, Tirunelveli -627117." },
{ "code": "4967", "name": "S. Veerasamy Chettiar College of Engineering and Technology, S.V.Nagar, Puliangudi (Post), Sivagiri (Taluk), Tirunelveli District- 627855." },
{ "code": "4968", "name": "Sardar Raja College of Engineering, Raja Nagar, Alangulam, Tirunelveli Distict-627808." },
{ "code": "4969", "name": "SCAD College of Engineering and Technology, Scad Nagar, Cheranmahadevi, Tirunelveli-627414." },
{ "code": "4970", "name": "Sree Sowdambika College of Engineering, Chettikurichi, Aruppukottai, Virudhunagar-626134." },
{ "code": "4971", "name": "St. Xavier's Catholic College of Engineering (Autonomous), Chunkankadai, Kanyakumari District, Nagercoil-629003." },
{ "code": "4974", "name": "Government College of Engineering Tirunelveli District 627007" },
{ "code": "4975", "name": "Dr G.U. Pope College of Engineering, Pope Nagar, Sawyerpuram, Thoothukudi-628251." },
{ "code": "4976", "name": "Infant Jesus College of Engineering, Kamarajar Nagar, Tirunelveli-Thoothukudi Highway (NH-7A), Keelavallanadu Village, Ellanayakkan Patti Post, Srivaikundam Taluk, Thoothukudi District-628851." },
{ "code": "4977", "name": "Narayanaguru College of Engineering, Chittadavu, Manjalumoodu, Vilavancode Taluk, Kuzhithurai, Kanyakumari District-629151." },
{ "code": "4978", "name": "Udaya School of Engineering, Udaya Nagar, Vellamadi Junction,Ammandivilai Post, Kanyakumarai District, Nagercoil-629204." },
{ "code": "4979", "name": "Arul Tharum VPMM College of Engineering and Technology, V.P.M. Nagar, Krishnankovil, Srivilliputur, Virudhunagar-626190." },
{ "code": "4980", "name": "Einstein College of Engineering, Sir.C.V.Raman Nagar, Seethaparpanallur, Tirunelveli-627012." },
{ "code": "4981", "name": "Ponjesly College of Engineering, Near Parvathipuram, Alamparai, Veturnimadam Post, Nagercoil-629003." },
{ "code": "4982", "name": "Vins Christian College of Engineering, Vins Nagar, Chunkankadai, Nagercoil, Kanyakumari-629807." },
{ "code": "4983", "name": "Lord Jegannath College of Engineering and Technology, PSN Nagar, Ramanathichanputhur, Marungoor, Kanyakumari District, Nagercoil-629402." },
{ "code": "4984", "name": "Marthandam College of Engineering and Technology, P.M.Village Road,Kuttakuzhi, Veeyannoor Post, Marthandam, Kanyakumari District-629177." },
{ "code": "4986", "name": "Noorul Islam College of Engineering and Technology, Punkarai, Thiruvithancode (PO), Kanyakumari-629174." },
{ "code": "4989", "name": "PSN Engineering College, Melathediyoor, Palayamkottai, Tirunelveli-627152." },
{ "code": "4992", "name": "Bethlahem Institute of Engineering, Nadutheri, Karungal, Kanyakumari-629157." },
{ "code": "4993", "name": "Loyola Institute of Technology and Science, P.Bo. No.2, Thovalai - Rajavoor Road, Loyola Nagar, Theroor Village, Thovalai, Kanyakumari District-629302." },
{ "code": "4994", "name": "J.P. College of Engineering, College Road, Ayikudy, Tenkasi Taluk, Tirunelveli District-627852." },
{ "code": "4995", "name": "P.S.R.R College of Engineering, Appayanaickenpatti, Sevalpatti, Sivakasi, Virudhunagar -626140." },
{ "code": "4996", "name": "Sri Vidya College of Engineering and Technology, Sivakasi Main Road, P.Kumaralingapuram, Virudhunagar-626005." },
{ "code": "4998", "name": "Mahakavi Bharathiyar College of Engineering and Technology, Kovil Nagar, Vasudevanallur, Sivagiri Taluk, Tirunelveli District - 627758." },
{ "code": "4999", "name": "Annai Vailankanni College of Engineering, AVK Nagar, Pothaiyadisalai Pottalkulam, Azhagappapuram PO, Kanyakumari District, Nagercoil-629401." },
{ "code": "5008", "name": "Thiagarajar College of Engineering (Autonomous) Tirupparankundram Madurai District 625015" },
{ "code": "5009", "name": "Government College of Engineering Melachokkanathapuram Bodinayakkanur Theni District 625582" },
{ "code": "5010", "name": "Anna University Regional Campus - Madurai Kanyakumari National Highway Keelakuilkudi Madurai District 625019" },
{ "code": "5012", "name": "Central Electrochemical Research Institute CECRI) Karaikudi Sivagangai District 630006" },
{ "code": "5017", "name": "University College of Engineering Ramanathapuram Pullangudi Ramanathapuram District 623513" },
{ "code": "5022", "name": "University College of Engineering Dindigul Mangarai Pirivu Reddiyarchathiram Dindigul District 624622" },
{ "code": "5502", "name": "Sri Raajaraajan College of Engineering and Technology, No.146/4B1, Amaravathi Village, Amaravathypudhur(Post), Karaikudi Taluk, Sivagangai District630301." },
{ "code": "5530", "name": "SSM Institute of Engineering and Technology, Kuttathupatti Village, Begambur Post, Dindigul Taluk & District-624002." },
{ "code": "5532", "name": "Vaigai College of Engineering, Therkutheru, Melur Taluk, Madurai-625122." },
{ "code": "5533", "name": "Karaikudi Institute of Technology & Karaikudi Institute of Management, Keeranipatti Village, Thalakkavur Panchayat, Karaikudi, Sivaganga-630307." },
{ "code": "5536", "name": "Mangayarkarasi College of Engineering, 7-1-139, 1st Street, Mangayarkarasi Nagar, Paravai, Madurai-625402." },
{ "code": "5537", "name": "Jainee College of Engineering and Technology, Dindigul-Theni Main Road, (NHB Extn.), Aathupattiprivu, Veerakkal B.P.O.N. Panjampatti Post, Dindigul624303." },
{ "code": "5703", "name": "Christian College of Engineering and Technology, Near Check Post, Oddanchatram, Dindigul-624619." },
{ "code": "5832", "name": "N.P.R College of Engineering and Technology (Autonomous), Punnappatti Village, Uluppakudi, Natham, Dindigul District-624401." },
{ "code": "5842", "name": "SRM Madurai College for Engineering and Technology, Pottapalayam Village, Manamadurai Taluk, Sivagangai District-630611." },
{ "code": "5851", "name": "Veerammal Engineering College, PVP Nagar, K.Singrakottai, Dindigul-624708." },
{ "code": "5862", "name": "R V S Educational Trust's Group of Institutions, RVS Nagar, N.Paraipatti Post, Dindigul-624005." },
{ "code": "5865", "name": "Nadar Saraswathi College of Engineering and Technology, Vadapudupatti, Annanji Post, Theni -625531." },
{ "code": "5901", "name": "Alagappa Chettair Government College of Engineering and Technology (Autonomous) Karaikudi Sivagangai District 630004" },
{ "code": "5902", "name": "Bharath Niketan Engineering College, Shri Gowri Nagar, Thimmarasanaickanoor, Aundipatti, Theni District-625536." },
{ "code": "5904", "name": "K.L.N.College of Engineering (Autonomous), Madurai - Nedunkulam Road, Pottapalayam, Sivagangai District-630611." },
{ "code": "5907", "name": "Mohamed Sathak Engineering College, Sathak Nagar, East Coast Road, Pudhu Mayakulam, Kilakarai, Ramanathapuram District- 623806." },
{ "code": "5910", "name": "PSNA College of Engineering and Technology (Autonomous), Kothandaraman Nagar, Muthanampatti (PO), Dindigul-624622." },
{ "code": "5911", "name": "P.T.R. College of Engineering and Technology, Thanapandiyan Nagar, Madurai - Tirumangalam Road, Madurai-625008." },
{ "code": "5912", "name": "Pandian Saraswathi Yadav Engineering College, Arasanoor Village, Thirumansolai Post, Sivaganagi District-630561." },
{ "code": "5913", "name": "R.V.S. College of Engineering, RVS Nagar, Karur Road, N.Paraipatti Post, Dindigul-624005." },
{ "code": "5914", "name": "Solamalai College of Engineering , S.V Raja Nagar, Veerapanjan, Madurai-625020." },
{ "code": "5915", "name": "SACS M.A.V.M.M. Engineering College, 446, Melur - Alagarkoil Road, Kidaripatti (PO), Alagarkoil Via, Melur Taluk, Madurai- 625301." },
{ "code": "5919", "name": "St. Michael College of Engineering and Technology, St. Santhiagaper Nagar, Kalayarkoil, Sivaganga District-630551." },
{ "code": "5921", "name": "Syed Ammal Engineering College (Autonomous), Dr. E.M.Abdullah Campus, Lanthai, Achunthanvayal Post, Ramanathapuram- 623502." },
{ "code": "5924", "name": "Ganapathy Chettiar College of Engineering and Technology, Melakavanur (PO), Paramakudi, Ramanathapuram District-623706." },
{ "code": "5930", "name": "SBM College of Engineering and Technology, SBM Nagar, Thamaraipadi(PO), Trichy Road, Dindigul-624005." },
{ "code": "5935", "name": "Fatima Michael College of Engineering and Technology, Senkottai Village, Kalimangalam Panchayat,Sivaganga Main Road, Madurai-625020." },
{ "code": "5942", "name": "Ultra College of Engineering and Technology , 69/1, Ultra Nagar, Kodikulam I Bit, Madurai - Chennai Highway, Madurai-625104." },
{ "code": "5986", "name": "Velammal College of Engineering and Technology (Autonomous), Velammal Nagar, Viraganoor, Madurai -625009." },
{ "code": "5988", "name": "Theni Kammavar Sangam College of Technology, Theni Main road, Koduvilarpatti (PO), Veerapandi(Via), Theni District-625534." },
{ "code": "5990", "name": "Latha Mathavan Engineering College, Latha Mathavan Nagar, Kidaripatti, Melur Taluk, Madurai-625301." }]

const ITEMS_PER_PAGE = 15;

export default function TNEACalculator() {
  // --- Form & Banner States ---
  const [step, setStep] = useState(1);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [marks, setMarks] = useState({ maths: '', physics: '', chemistry: '' });
  const [student, setStudent] = useState({ name: '', phone: '', email: '' });
  const [preferences, setPreferences] = useState({ branch: '', location: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ResultData>({
    cutoff: 190,
    rank: '3001-8000',
    tier: 'Top Government Colleges (e.g., CEG, MIT, PSG)',
  });

  // --- College Search & Pagination States ---
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Auto slide banner every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToBanner = (index: number) => {
    setCurrentBanner(index);
  };

  const handleMarks = (field: string, value: string) => {
    setMarks((prev) => ({ ...prev, [field]: value }));
  };

  const handleStudent = (field: string, value: string) => {
    setStudent((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreferences = (field: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (
      marks.maths.trim() === '' ||
      marks.physics.trim() === '' ||
      marks.chemistry.trim() === ''
    ) {
      alert('Please enter all required marks');
      return;
    }
    setStep(2);
  };

  const calculateCutoff = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!student.name.trim()) {
      alert("Please Enter Student Name");
      return;
    }
    if (!/^\d{10}$/.test(student.phone)) {
      alert("Please Enter valid 10 digit Phone Number");
      return;
    }
    if (!emailRegex.test(student.email)) {
      alert("Please Enter valid email");
      return;
    }

    const maths = Number(marks.maths);
    const physics = Number(marks.physics);
    const chemistry = Number(marks.chemistry);

    if (marks.maths === '' || marks.physics === '' || marks.chemistry === '') {
      alert('Please Enter all Marks');
      return;
    }

    const cutoff = maths + physics / 2 + chemistry / 2;
    let rank = '30000+';
    let tier = 'Private Colleges';

    if (cutoff >= 190) {
      rank = '1-5000';
      tier = 'Top Government Colleges (e.g., CEG, MIT, PSG)';
    } else if (cutoff >= 175) {
      rank = '5001-15000';
      tier = 'Good Engineering Colleges';
    } else if (cutoff >= 160) {
      rank = '15001-30000';
      tier = 'Average Engineering Colleges';
    }

    const calculatedResult = {
      cutoff: Number(cutoff.toFixed(2)),
      rank,
      tier,
    };

    setResult(calculatedResult);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: student.name,
          phone: student.phone,
          email: student.email,
          marks,
          result: calculatedResult,
          preferences
        })
      });

      if (response.ok) {
        alert('Calculator results sent successfully! Check your email for detailed analysis.');
      } else {
        alert('Results calculated but email sending failed. Please contact support.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Results calculated but email sending failed. Please contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Filtering & Pagination Logic ---
  const filteredColleges = useMemo(() => {
    if (!searchQuery.trim()) return ALL_COLLEGES;

    const query = searchQuery.toLowerCase().trim();
    const isNumberSearch = /^\d+$/.test(query);

    return ALL_COLLEGES.filter((college) => {
      if (isNumberSearch) {
        return college.code.toLowerCase().includes(query);
      }

      return college.name.toLowerCase().includes(query);
    });
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredColleges.length / ITEMS_PER_PAGE);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;
    return filteredColleges.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredColleges]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-387 mx-auto p-4 md:px-6">
        {/* Banner Section */}
        <div className="relative bg-white py-8">
          <div className="relative h-60 rounded-2xl overflow-hidden shadow-md">
            <img
              src={banners[currentBanner]}
              alt={`College Banner ${currentBanner + 1}`}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-black/10" />

            <button
              onClick={prevBanner}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextBanner}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all z-10"
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToBanner(index)}
                  className={`w-3 h-3 rounded-full transition-all ${currentBanner === index ? 'bg-white scale-125' : 'bg-white/60'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Form area */}
        <div className="py-10">
          <h2 className="text-[28px] md:text-[55px] font-semibold text-[#1f2d5a]">TNEA Cutoff Calculator</h2>
          <div className="grid lg:grid-cols-12 gap-8">

            {/* Form Fields */}
            <div className="lg:col-span-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between md:gap-6 mt-2 mb-6">
                <div className="w-full md:w-3/5">
                  <p className="text-gray-400 font-medium text-md tracking-wider italic">
                    Calculate Your TNEA Cutoff Marks And Estimate Your Rank For Engineering Admissions In Tamil Nadu.
                  </p>
                </div>
                <div className="flex gap-3 mt-6 lg:mt-0 lg:w-2/5">
                  <button className="bg-blue-50 text-blue-600 px-8 py-2 rounded-xl font-semibold">TNEA 2026</button>
                  <button className="border border-gray-300 px-8 py-2 rounded-xl font-semibold text-gray-400">Admissions</button>
                </div>
              </div>

              {/* Step 1 UI */}
              {step === 1 && (
                <div className="bg-white border border-gray-100 rounded-lg p-4 md:p-6 shadow-lg">
                  <div className="mb-8">
                    <p className="text-blue-600 font-bold">Step 1/2</p>
                    <h2 className="text-blue-600 font-bold text-xl">Enter Your Marks</h2>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    <InputField label="Mathematics (out of 100)" placeholder="e.g. 90" value={marks.maths} onChange={(v) => handleMarks('maths', v)} type="number" />
                    <InputField label="Physics (out of 100)" placeholder="e.g. 90" value={marks.physics} onChange={(v) => handleMarks('physics', v)} type="number" />
                    <InputField label="Chemistry (out of 100)" placeholder="e.g. 90" value={marks.chemistry} onChange={(v) => handleMarks('chemistry', v)} type="number" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <SelectField label="Which branch do you want most?" placeholder="e.g. cse → ai & ds → ece" value={preferences.branch} onChange={(v) => handlePreferences('branch', v)} />
                    <SelectField label="Any preferred district/location? (optional)" placeholder="e.g. chennai, kanchipuram" value={preferences.location} onChange={(v) => handlePreferences('location', v)} />
                  </div>
                  <div className="flex justify-center md:justify-end mt-10">
                    <button onClick={validateStep1} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-12 py-2 rounded-lg text-lg">
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 UI */}
              {step === 2 && (
                <div className="bg-white border border-gray-100 rounded-lg p-4 md:p-6 shadow-lg">
                  <div className="mb-8">
                    <p className="text-blue-600 font-bold">Step 2/2</p>
                    <h2 className="text-blue-600 font-bold text-xl">Enter Your Information</h2>
                    <p className="font-semibold text-gray-600 mt-3 text-sm">
                      To get accurate results, enter your name and contact info.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <InputField label="Student Name" placeholder="Enter Student Name" value={student.name} onChange={(v) => handleStudent('name', v)} type="text" />
                    <div className="w-full flex items-end gap-3 pb-1">
                      <span className="text-blue-600 font-semibold mb-3">+91</span>
                      <div className="flex-1 w-full">
                        <InputField label="Contact Number" placeholder="Parent/Student Contact Number" value={student.phone} onChange={(v) => handleStudent('phone', v)} type="tel" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <InputField label="Email Address" placeholder="Student/Parent Email" value={student.email} onChange={(v) => handleStudent('email', v)} type="text" />
                  </div>
                  <div className="flex justify-center md:justify-end mt-10 gap-4">
                    <button onClick={() => setStep(1)} className="border border-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-lg text-lg hover:bg-gray-50">
                      Back
                    </button>
                    <button onClick={calculateCutoff} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-8 py-2 rounded-lg text-lg flex items-center gap-2">
                      {isSubmitting ? 'Sending...' : 'Calculate Cutoff'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Sidebar Performance Predictions */}
            <div className="lg:col-span-4">
              <div className="bg-[#1565f7] text-white rounded-xl p-6 lg:mt-20 sticky top-6 shadow-md">
                <h3 className="text-xl font-bold mb-3">Your Results</h3>
                <p className="opacity-90 text-xs leading-relaxed mb-6">
                  This is an estimated prediction based on previous year data. Ranks vary based on application volume.
                </p>
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-2">Your Cutoff</p>
                  <p className="text-4xl tracking-wider font-bold border-b border-blue-400 pb-2">{result.cutoff}/200</p>
                </div>
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-2">Estimated Rank Range</p>
                  <p className="text-4xl tracking-wider font-semibold border-b border-blue-400 pb-2">{result.rank}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2">College Tier</p>
                  <p className="text-md font-semibold border-b border-blue-400 pb-2">{result.tier}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Search & Paginated Tables */}
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-4">Search Colleges And Counseling Codes</h3>
            <div className="flex items-center px-4 rounded-lg max-w-[80%] mb-6 border border-gray-300">
              <Search className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search code or college name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 focus:outline-none text-gray-700 bg-transparent"
              />
            </div>
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="overflow-x-auto min-h-210">
                <table className="w-[95%] ">
                  <thead>
                    <tr className="border-b-2 border-gray-500 bg-gray-50">
                      <th className="text-left py-2 px-3 w-35 font-semibold">College Code</th>
                      <th className="text-left py-2 px-3 font-semibold">College Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentTableData.length > 0 ? (
                      currentTableData.map((college, index) => (
                        <tr key={`${college.code}-${index}`} className="border-b border-gray-300">
                          <td className="px-3 py-3">{college.code}</td>
                          <td className="px-3 py-3">{college.name}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="text-center py-8 text-gray-500">
                          No colleges found matching "{searchQuery}"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Dynamic Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
                  <div>
                    Showing <span className="font-semibold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
                    <span className="font-semibold">
                      {Math.min(currentPage * ITEMS_PER_PAGE, filteredColleges.length)}
                    </span>{' '}
                    of <span className="font-semibold">{filteredColleges.length}</span> results
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:hover:bg-white"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <span className="text-gray-700">
                      Page <span className="font-semibold">{currentPage}</span> of {totalPages}
                    </span>

                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:hover:bg-white"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}

/* Helper Reusable Layout Elements outside parent function scopes */
function InputField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b-2 border-blue-300 pb-3 outline-none focus:border-blue-600 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  );
}

function SelectField({ label, placeholder, value, onChange }: { label: string; placeholder: string; value?: string; onChange?: (v: string) => void }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full border-b-2 border-blue-300 pb-3 outline-none focus:border-blue-600 text-lg"
        />
        <ChevronDown className="absolute right-2 top-4 text-gray-400 pointer-events-none" size={20} />
      </div>
    </div>
  );
}
