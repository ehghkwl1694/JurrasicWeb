const carnivoreAudio = new Audio('assets/육식.m4a');
carnivoreAudio.preload = 'auto';
carnivoreAudio.volume = 0.3;
const herbivoreAudio = new Audio('assets/초식.m4a');
herbivoreAudio.preload = 'auto';
herbivoreAudio.volume = 1.0;

const geologicalEvents = [
    {
        nameKo: "데칸 트랩 거대 화산 폭발",
        nameEn: "Deccan Traps Volcanism",
        timing: "약 6,630만 년 전 ~ 6,560만 년 전",
        desc: "현재 인도 남부 지역(데칸 트랩)에서 상상을 초월하는 규모의 용암과 유독가스가 수십만 년 동안 분출된 거대 화산 활동입니다.",
        impact: "대기 중으로 분출된 황화합물과 이산화탄소가 산성비와 기후 교란을 유발해 생태계를 파괴했으며, 이후 소행성 충돌과 결합해 K-Pg 대멸종을 촉발함.",
        peaks: [{ center: 66, range: 4 }]
    },
    {
        nameKo: "백악기 해수면 상승 및 내륙해 형성",
        nameEn: "Cretaceous Sea Level Rise & Interior Seaway",
        timing: "약 9,000만 년 전 ~ 8,000만 년 전",
        desc: "지구 역사의 대기온도가 최고조에 달해 극지방 빙하가 완전히 녹고 지각 운동으로 바다 밑바닥이 솟아올라 해수면이 현재보다 100~250m 상승한 사건입니다.",
        impact: "육지 면적이 줄어들었으나 따뜻하고 얕은 내륙해(예: 북미 서부 내륙해로)가 형성되어 모사사우루스 등 거대 해양 파충류의 전성기를 이룸.",
        peaks: [{ center: 85, range: 7 }]
    },
    {
        nameKo: "대양 무산소 이벤트",
        nameEn: "Ocean Anoxic Events (OAE)",
        timing: "약 1억 2,000만 년 전(OAE 1a) 및 약 9,400만 년 전(OAE 2)",
        desc: "활발한 심해 화산 활동과 지구 온난화로 인해 해류 순환이 멈추면서 바다 깊은 곳의 산소가 완전히 고갈된 대재앙입니다.",
        impact: "해양 생태계가 전멸에 가까운 타격을 입었으나, 이때 산소 부족으로 썩지 않고 쌓인 유기물 사체들이 인류가 사용하는 중동 석유의 기원이 됨.",
        peaks: [
            { center: 94, range: 4 },
            { center: 120, range: 5 }
        ]
    },
    {
        nameKo: "판게아 초대륙의 분열",
        nameEn: "Breakup of Pangaea",
        timing: "약 1억 8,000만 년 전 시작",
        desc: "지구의 모든 대륙이 하나로 뭉쳐 있던 초대륙 판게아가 지각 변동으로 인해 여러 대륙으로 갈라지기 시작한 사건입니다.",
        impact: "갈라진 틈으로 바닷물이 들어와 대서양이 탄생했으며, 대륙별로 고립된 공룡들이 각자 환경에 맞게 진화하면서 종의 다양성이 폭발함.",
        peaks: [{ center: 180, range: 10 }]
    },
    {
        nameKo: "카르니아 플루비알 이벤트",
        nameEn: "Carnian Pluvial Episode",
        timing: "약 2억 3,400만 년 전 ~ 2억 3,200만 년 전 (약 200만 년 지속)",
        desc: "거대한 화산 폭발로 인한 극심한 지구 온난화로 건조했던 지구에 약 100만~200만 년 동안 끊임없이 비가 내린 초장기 우기 사건입니다.",
        impact: "습한 기후에 잘 적응한 침엽수가 번성하고 기존 지배 생태계가 멸종하면서, 초기에 미약했던 공룡이 지구의 지배자로 번성하는 계기가 됌.",
        peaks: [{ center: 233, range: 6 }]
    }
];

function playHoverAudio(diet) {
    if (diet === '육식성') {
        carnivoreAudio.currentTime = 0;
        carnivoreAudio.play().catch(() => { });
    } else if (diet === '초식성' || diet === '잡식성') {
        herbivoreAudio.currentTime = 0;
        herbivoreAudio.play().catch(() => { });
    }
}

const translations = {
    // Eras
    'Cretaceous': '백악기',
    'Jurassic': '쥬라기',
    'Triassic': '트라이아스기',
    'Unknown': '미지의 시대',

    // Diet
    'herbivorous': '초식성',
    'carnivorous': '육식성',
    'omnivorous': '잡식성',

    // Types
    'sauropod': '용각류',
    'large theropod': '대형 수각류',
    'small theropod': '소형 수각류',
    'ceratopsian': '뿔공룡 (각룡류)',
    'euornithopod': '조각류',
    'armoured dinosaur': '갑옷공룡 (곡룡류)',

    // Countries/Locations (Common)
    'USA': '미국',
    'China': '중국',
    'Mongolia': '몽골',
    'Argentina': '아르헨티나',
    'United Kingdom': '영국',
    'South Africa': '남아프리카',
    'Egypt': '이집트',
    'Niger': '니제르',
    'Brazil': '브라질',
    'Canada': '캐나다',
    'India': '인도',
    'Germany': '독일'
};

function getBroadEra(era) {
    if (!era) return 'Unknown';
    const l = era.toLowerCase();
    if (l.includes('cretaceous')) return 'Cretaceous';
    if (l.includes('jurassic')) return 'Jurassic';
    if (l.includes('triassic')) return 'Triassic';
    return 'Unknown';
}

const DINO_SPRITE_CONFIG = {
    baseDir: 'assets/dinos/',
    minHeight: 120,   // 가장 작은 공룡의 시각적 높이 (px)
    maxHeight: 420,   // 가장 큰 공룡의 시각적 높이 (px)
    scalePercent: 100,
    // 각 공룡의 실제 파일명 리스트
    spriteFiles: [
        'pixellab-aardonyx-1780619253383.png',
        'pixellab-abelisaurus-1780620969022.png',
        'pixellab-achelousaurus-1780621150558.png',
        'pixellab-achillobator-1780621257265.png',
        'pixellab-acrocanthosaurus-1780621354528.png',
        'pixellab-aegyptosaurus-1780621541121.png',
        'pixellab-albertosaurus-1780621955085.png',
        'pixellab-alioramus-1781417461975.png',
        'pixellab-allosaurus-1781155032623.png',
        'pixellab-amargasaurus-1781418370645.png',
        'pixellab-ampelosaurus-1781159045163.png',
        'pixellab-anchiceratops-1781425298445.png',
        'pixellab-anchisaurus-1781425891167.png',
        'pixellab-ankylosaurus-1781154743251.png',
        'pixellab-apatosaurus-1781155269873.png',
        'pixellab-archaeopteryx-1781426574427.png',
        'pixellab-argentinosaurus-1781157824685.png',
        'pixellab-baryonyx-1781158851164.png',
        'pixellab-beipiaosaurus-1781422886287.png',
        'pixellab-brachiosaurus-1780621600002.png',
        'pixellab-camarasaurus-1781426928304.png',
        'pixellab-camptosaurus-1781420593931.png',
        'pixellab-carcharodontosaurus-1781155730827.png',
        'pixellab-carnotaurus-1781155384180.png',
        'pixellab-caudipteryx-1781162433068.png',
        'pixellab-centrosaurus-1781418782441.png',
        'pixellab-ceratosaurus-1781157470121.png',
        'pixellab-chasmosaurus-1781418867018.png',
        'pixellab-citipati-1781163353009.png',
        'pixellab-coelophysis-1781156834822.png',
        'pixellab-compsognathus-1781427007261.png',
        'pixellab-confuciusornis-1781422034692.png',
        'pixellab-corythosaurus-1781157174977.png',
        'pixellab-cryolophosaurus-1781418657156.png',
        'pixellab-deinocheirus-1780621600003.png',
        'pixellab-dilophosaurus-1781156936230.png',
        'pixellab-diplodocus-1781154853596.png',
        'pixellab-dromaeosaurus-1781421032832.png',
        'pixellab-dryosaurus-1781425247560.png',
        'pixellab-edmontonia-1781421252377.png',
        'pixellab-eoraptor-1781163658969.png',
        'pixellab-erketu-1780620472970.png',
        'pixellab-euoplocephalus-1781161091784.png',
        'pixellab-gallimimus-1781157052994.png',
        'pixellab-gasparinisaura-1781159549398.png',
        'pixellab-giganotosaurus-1781155644783.png',
        'pixellab-giraffatitan-1781421678183.png',
        'pixellab-gorgosaurus-1781161285138.png',
        'pixellab-guanlong-1781420731881.png',
        'pixellab-hadrosaurus-1781421314808.png',
        'pixellab-herrerasaurus-1781417311416.png',
        'pixellab-heterodontosaurus-1781417849229.png',
        'pixellab-hypacrosaurus-1781422634373.png',
        'pixellab-hypsilophodon-1781423970652.png',
        'pixellab-iguanodon-1781155491214.png',
        'pixellab-kentrosaurus-1781156006060.png',
        'pixellab-lambeosaurus-1781161553299.png',
        'pixellab-lesothosaurus-1781425728512.png',
        'pixellab-maiasaura-1781156680278.png',
        'pixellab-majungasaurus-1781419323472.png',
        'pixellab-mamenchisaurus-1781157608289.png',
        'pixellab-mapusaurus-1781163413627.png',
        'pixellab-massospondylus-1781422231244.png',
        'pixellab-megalosaurus-1781160414160.png',
        'pixellab-microraptor-1781156116610.png',
        'pixellab-minmi-1781159437911.png',
        'pixellab-mononykus-1781159703623.png',
        'pixellab-muttaburrasaurus-1781419643236.png',
        'pixellab-nigersaurus-1781418555278.png',
        'pixellab-omeisaurus-1781425516873.png',
        'pixellab-ornitholestes-1781424554886.png',
        'pixellab-ornithomimus-1781419219222.png',
        'pixellab-ouranosaurus-1781163227303.png',
        'pixellab-oviraptor-1781156295285.png',
        'pixellab-pachycephalosaurus-1780621600004.png',
        'pixellab-paralititan-1781423539595.png',
        'pixellab-parasaurolophus-1780621600005.png',
        'pixellab-pentaceratops-1781418961625.png',
        'pixellab-plateosaurus-1781161655547.png',
        'pixellab-protoceratops-1781156607776.png',
        'pixellab-psittacosaurus-1781161795058.png',
        'pixellab-saltasaurus-1781420234245.png',
        'pixellab-saurolophus-1781422748657.png',
        'pixellab-sauropelta-1781417938957.png',
        'pixellab-scelidosaurus-1781420421979.png',
        'pixellab-sinosauropteryx-1781421953402.png',
        'pixellab-sinraptor-1781421198614.png',
        'pixellab-spinosaurus-1780621600010.png',
        'pixellab-stegoceras-1781424878187.png',
        'pixellab-stegosaurus-1780621600006.png',
        'pixellab-struthiomimus-1781420541694.png',
        'pixellab-styracosaurus-1781157341707.png',
        'pixellab-suchomimus-1781162980780.png',
        'pixellab-supersaurus-1781161982880.png',
        'pixellab-tarbosaurus-1781418087809.png',
        'pixellab-tenontosaurus-1781420855188.png',
        'pixellab-therizinosaurus-1781156470422.png',
        'pixellab-torosaurus-1781163544399.png',
        'pixellab-torvosaurus-1781422387277.png',
        'pixellab-triceratops-1780621600007.png',
        'pixellab-troodon-1781155870044.png',
        'pixellab-tyrannosaurus-1780621600008.png',
        'pixellab-utahraptor-1781158532118.png',
        'pixellab-velociraptor-1780621600009.png',
        'pixellab-yangchuanosaurus-1781422515743.png',
        'pixellab-zuniceratops-1781159339992.png'
    ]
};

// DINO_SPRITE_CONFIG.spriteFiles 배열에서 공룡 rawName과 일치하는 파일명을 검색하는 헬퍼 함수
function getSpriteFilename(rawName) {
    if (!rawName) return null;
    const cleanName = rawName.toLowerCase().trim();
    return DINO_SPRITE_CONFIG.spriteFiles.find(file => {
        // pixellab-[공룡이름]-[난수].png 포맷 매칭
        const match = file.match(/^pixellab-([a-z0-9-]+)-\d+\.png$/i);
        return match && match[1].toLowerCase() === cleanName;
    });
}

// Cache for sprite alpha masks to enable pixel-perfect hover
const spriteAlphaCache = {};

async function preloadSpriteAlpha(name) {
    if (spriteAlphaCache[name]) return;
    const filename = getSpriteFilename(name);
    if (!filename) return; // 이미지 파일이 존재하지 않는 경우 알파 캐싱 생략
    const url = `${DINO_SPRITE_CONFIG.baseDir}${filename}`;

    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight).data;

            // 알파 채널 + 자연 비율 저장 및 실제 캐릭터 바운딩 박스 계산
            let minX = img.naturalWidth;
            let maxX = 0;
            let minY = img.naturalHeight;
            let maxY = 0;
            let hasVisiblePixel = false;

            const alphas = new Uint8Array(img.naturalWidth * img.naturalHeight);
            for (let i = 0; i < imageData.length; i += 4) {
                const alpha = imageData[i + 3];
                const pixelIndex = i / 4;
                alphas[pixelIndex] = alpha;

                // 알파 값 10 초과를 유효 픽셀로 감지
                if (alpha > 10) {
                    const x = pixelIndex % img.naturalWidth;
                    const y = Math.floor(pixelIndex / img.naturalWidth);
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                    hasVisiblePixel = true;
                }
            }

            // 유효 픽셀이 없는 경우 이미지 크기 전체를 영역으로 폴백
            if (!hasVisiblePixel) {
                minX = 0;
                maxX = img.naturalWidth - 1;
                minY = 0;
                maxY = img.naturalHeight - 1;
            }

            const contentWidth = maxX - minX + 1;
            const contentHeight = maxY - minY + 1;

            spriteAlphaCache[name] = {
                width: img.naturalWidth,
                height: img.naturalHeight,
                aspectRatio: img.naturalWidth / img.naturalHeight,
                alphas,
                boundingBox: {
                    minX,
                    maxX,
                    minY,
                    maxY,
                    contentWidth,
                    contentHeight,
                    contentAspectRatio: contentWidth / contentHeight
                }
            };
            resolve();
        };
        img.onerror = resolve;
        img.src = url;
    });
}

let globalDinoData = [];

async function initDinoMap() {
    // Preload all available sprites alpha masks
    const dinoNamesWithSprites = DINO_SPRITE_CONFIG.spriteFiles.map(file => {
        const match = file.match(/^pixellab-([a-z0-9-]+)-\d+\.png$/i);
        return match ? match[1].toLowerCase() : null;
    }).filter(Boolean);
    await Promise.all(dinoNamesWithSprites.map(preloadSpriteAlpha));

    const response = await fetch('data.csv');
    const csvText = await response.text();
    const rows = csvText.split('\n').filter(r => r.trim() !== '').slice(1);

    globalDinoData = rows.map(row => {
        const cols = row.split(',');
        if (cols.length < 3) return null;

        const rawName = cols[0].toLowerCase();
        const diet = cols[1];
        const periodStr = cols[2];
        const livedIn = cols[3];
        const type = cols[4];
        const length = cols[5];

        const eraMatch = periodStr.match(/(Early|Middle|Late)?\s?(Cretaceous|Jurassic|Triassic)/i);
        let rawEra = eraMatch ? eraMatch[0].trim() : "Unknown";

        const myaMatches = periodStr.match(/\d+/g);
        let mya = 0;
        if (myaMatches) {
            const vals = myaMatches.map(Number);
            mya = Math.max(...vals);
        }

        if (rawName === 'pantydraco') {
            mya = 195;
        } else if (rawName === 'erketu') {
            mya = 120;
        } else if (rawName === 'hagryphus') {
            rawEra = 'Late Cretaceous';
            mya = 75;
        }

        const name = dinoNamesKr[rawName] || rawName;

        const myaValue = Math.floor(mya * 100).toLocaleString();

        let eraKr = rawEra
            .replace(/Late/i, '후기')
            .replace(/Early/i, '전기')
            .replace(/Middle/i, '중기')
            .replace(/Cretaceous/i, '백악기')
            .replace(/Jurassic/i, '쥬라기')
            .replace(/Triassic/i, '트라이아스기');

        let translatedPeriod = `${eraKr} (${myaValue}만 년 전)`;

        const taxonomy = cols[6] || "";

        return {
            name,
            rawName,
            diet: translations[diet] || diet,
            era: rawEra,
            period: translatedPeriod,
            livedIn: translations[livedIn] || livedIn,
            type: translations[type] || type,
            length,
            mya,
            taxonomy
        };
    }).filter(d => d !== null);

    // Calculate length range for scaling
    const lengths = globalDinoData.map(d => parseFloat(d.length) || 5);
    const minL = Math.min(...lengths);
    const maxL = Math.max(...lengths);

    globalDinoData.forEach(dino => {
        // Normalize length to 0-1 scale
        dino.sizeScale = (parseFloat(dino.length) || 5 - minL) / (maxL - minL || 1);
    });

    renderDinoMap(globalDinoData);
    initSearch();
}

function initSearch() {
    const searchInput = document.getElementById('dino-search');
    const suggestionsBox = document.getElementById('search-suggestions');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (!query) {
            suggestionsBox.style.maxHeight = '0';
            suggestionsBox.style.borderWidth = '0px';
            return;
        }

        const matches = globalDinoData.filter(d =>
            d.name.includes(query) || d.rawName.includes(query)
        ).slice(0, 5);

        if (matches.length > 0) {
            suggestionsBox.innerHTML = matches.map(d => `
                <div class="px-4 py-2 hover:bg-white/10 cursor-pointer text-sm text-white/80 border-b border-white/5 last:border-0" onclick="scrollToDino('${d.name}')">
                    ${d.name} <span class="text-[10px] opacity-40 ml-2">${d.era}</span>
                </div>
            `).join('');
            suggestionsBox.style.maxHeight = '300px';
            suggestionsBox.style.borderWidth = '1px';
        } else {
            suggestionsBox.innerHTML = `<div class="px-4 py-2 text-xs text-white/40 italic">검색 결과가 없습니다.</div>`;
            suggestionsBox.style.maxHeight = '40px';
            suggestionsBox.style.borderWidth = '1px';
        }
    });

    // Close suggestions on click outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
            suggestionsBox.style.maxHeight = '0';
            suggestionsBox.style.borderWidth = '0px';
        }
    });
}

function scrollToDino(name) {
    const dino = globalDinoData.find(d => d.name === name);
    const container = document.getElementById('dino-map-container');
    if (dino && container) {
        container.scrollTo({
            left: dino.x - window.innerWidth / 2,
            behavior: 'smooth'
        });
        const suggestionsBox = document.getElementById('search-suggestions');
        suggestionsBox.style.maxHeight = '0';
        suggestionsBox.style.borderWidth = '0px';
        document.getElementById('dino-search').value = name;
    }
}

// Attach to window for onclick access
window.scrollToDino = scrollToDino;

let scrollMap = [];

function renderDinoMap(data) {
    const main = document.querySelector('main');
    const aside = document.querySelector('aside');
    const eraContainer = aside.querySelector('.relative.w-full.h-\\[40px\\]');

    // Dynamically adjust DINO_SPRITE_CONFIG minHeight and maxHeight based on viewport height to prevent cutting off at the top
    const viewportHeight = window.innerHeight - 60; // Map height
    // Max height to avoid cutting off is ground height (55% * viewportHeight).
    // Use 52% of viewportHeight for safety. Cap at 1.3x of original maxHeight (420 * 1.3 = 546).
    const maxPossibleHeight = Math.floor(Math.min(viewportHeight * 0.52, 546));
    // Proportional minHeight based on original ratio (120/420 = 2/7)
    const minPossibleHeight = Math.floor(maxPossibleHeight * (120 / 420));

    DINO_SPRITE_CONFIG.maxHeight = maxPossibleHeight;
    DINO_SPRITE_CONFIG.minHeight = minPossibleHeight;

    main.innerHTML = '';
    eraContainer.innerHTML = '';

    // Sort by appearance date (larger MYA comes later in scroll if we scroll "deeper" into the past)
    // Wait, the user wants to scroll "down" to go "back in time".
    // So 0 MYA is top, 250 MYA is bottom.
    // Sorting by MYA ascending (0 -> 250)
    data.sort((a, b) => a.mya - b.mya);

    const eraData = {};
    data.forEach(d => {
        if (!eraData[d.era]) {
            eraData[d.era] = { min: d.mya, max: d.mya };
        }
        eraData[d.era].min = Math.min(eraData[d.era].min, d.mya);
        eraData[d.era].max = Math.max(eraData[d.era].max, d.mya);
    });

    const erasFound = Object.keys(eraData).sort((a, b) => eraData[a].min - eraData[b].min);

    const leftPadding = 800;
    const minGap = 600; // Increased to accommodate 500px sprites
    const myaToPxScale = 150; // Increased to spread them out more based on time

    let currentX = leftPadding;
    scrollMap = [{ x: 0, mya: 0 }];

    data.forEach((dino, i) => {
        if (i > 0) {
            const myaDiff = dino.mya - data[i - 1].mya;
            const gap = Math.min(myaDiff * myaToPxScale, 800) + minGap;
            currentX += gap;
        }

        // Horizontal position based on time
        dino.x = currentX + (Math.random() * 60 - 30);
        scrollMap.push({ x: dino.x, mya: dino.mya });
    });

    const totalWidth = currentX + 1500;
    main.style.width = `${totalWidth}px`;
    main.style.height = '100%';

    // Clear old ticks from the progress bar container
    const progressBarContainer = document.getElementById('progress-bar-container');
    if (progressBarContainer) {
        progressBarContainer.querySelectorAll('.progress-tick').forEach(t => t.remove());
    }

    // Render era transition ticks (Cretaceous / Jurassic / Triassic boundaries)
    const maxScroll = totalWidth - window.innerWidth;
    if (maxScroll > 0 && progressBarContainer) {
        const cretaceousDinos = data.filter(d => getBroadEra(d.era) === 'Cretaceous');
        const jurassicDinos = data.filter(d => getBroadEra(d.era) === 'Jurassic');
        const triassicDinos = data.filter(d => getBroadEra(d.era) === 'Triassic');

        let percent1 = 0;
        let percent2 = 0;
        let percent3 = 0;

        // 154 million years ago boundary calculation (Cretaceous / Jurassic boundary)
        let targetX1 = 0;
        for (let i = 1; i < scrollMap.length; i++) {
            if (154 <= scrollMap[i].mya) {
                const p = (154 - scrollMap[i - 1].mya) / (scrollMap[i].mya - scrollMap[i - 1].mya);
                targetX1 = scrollMap[i - 1].x + p * (scrollMap[i].x - scrollMap[i - 1].x);
                break;
            }
            targetX1 = scrollMap[scrollMap.length - 1].x;
        }
        if (targetX1 > 0) {
            const scrollLeft1 = targetX1 - window.innerWidth / 2;
            percent1 = Math.max(0, Math.min(100, (scrollLeft1 / maxScroll) * 100));
        }

        // 76 million years ago boundary calculation (Start of Late Jurassic display)
        let targetX3 = 0;
        for (let i = 1; i < scrollMap.length; i++) {
            if (76 <= scrollMap[i].mya) {
                const p = (76 - scrollMap[i - 1].mya) / (scrollMap[i].mya - scrollMap[i - 1].mya);
                targetX3 = scrollMap[i - 1].x + p * (scrollMap[i].x - scrollMap[i - 1].x);
                break;
            }
            targetX3 = scrollMap[scrollMap.length - 1].x;
        }
        if (targetX3 > 0) {
            const scrollLeft3 = targetX3 - window.innerWidth / 2;
            percent3 = Math.max(0, Math.min(100, (scrollLeft3 / maxScroll) * 100));
        }

        if (jurassicDinos.length > 0 && triassicDinos.length > 0) {
            const maxJurassicX = Math.max(...jurassicDinos.map(d => d.x));
            const minTriassicX = Math.min(...triassicDinos.map(d => d.x));
            const transX = (maxJurassicX + minTriassicX) / 2;
            const scrollLeft = transX - window.innerWidth / 2;
            percent2 = Math.max(0, Math.min(100, (scrollLeft / maxScroll) * 100));
        }

        progressBarContainer.dataset.percent1 = percent1;
        progressBarContainer.dataset.percent2 = percent2;
        progressBarContainer.dataset.percent3 = percent3;

        [percent1, percent3, percent2].forEach(percent => {
            if (percent > 0) {
                const tick = document.createElement('div');
                tick.className = 'progress-tick';
                tick.style.left = `${percent}%`;
                progressBarContainer.appendChild(tick);
            }
        });
    }

    erasFound.forEach((era) => {
        const div = document.createElement('div');
        const eraId = era.toLowerCase().replace(/\s+/g, '-');
        div.id = `era-${eraId}`;
        div.className = `absolute inset-x-0 flex items-center justify-center transition-all duration-500 opacity-0 pointer-events-none`;

        let translatedEra = era
            .replace(/Late/i, '후기')
            .replace(/Early/i, '전기')
            .replace(/Middle/i, '중기')
            .replace(/Cretaceous/i, '백악기')
            .replace(/Jurassic/i, '쥬라기')
            .replace(/Triassic/i, '트라이아스기');

        let eraColor = '#5AFF00'; // Default Green (Cretaceous)
        const eraLower = era.toLowerCase();
        if (eraLower.includes('triassic')) {
            eraColor = '#FF3333'; // Red
        } else if (eraLower.includes('early jurassic') || eraLower.includes('middle jurassic') || eraLower === 'jurassic') {
            eraColor = '#FF9900'; // Orange
        } else if (eraLower.includes('late jurassic')) {
            eraColor = '#FFE600'; // Yellow
        } else {
            eraColor = '#5AFF00'; // Green (Cretaceous)
        }

        div.innerHTML = `<span class="font-maruminya tracking-widest text-[30px] text-[${eraColor}] font-black whitespace-nowrap">${translatedEra}</span>`;
        eraContainer.appendChild(div);
    });

    data.forEach(dino => {
        const star = document.createElement('div');
        // className will be set conditionally below based on hasSprite to prevent default hover on sprite margins

        // 1. Calculate Habitat Position (y)
        const nameLower = dino.rawName.toLowerCase();
        const taxonomyLower = (dino.taxonomy || "").toLowerCase();
        let y;

        if (nameLower.includes('pteryx') || nameLower.includes('ornis') || nameLower.includes('microraptor') || taxonomyLower.includes('pterosaur')) {
            y = 15 + Math.random() * 25; // Sky (15% to 40% of container height)
        } else if (nameLower.includes('mosasaur') || nameLower.includes('plesiosaur') || nameLower.includes('ichthyo') ||
            nameLower.includes('liopleuro') || nameLower.includes('elasm') || nameLower.includes('shoni') ||
            nameLower === 'spinosaurus' || nameLower === 'baryonyx' || nameLower === 'suchomimus') {
            y = 68 + Math.random() * 17; // Sea (68% to 85% of container height)
        } else {
            y = 55; // Land (exactly on the Y: 55% ground line)
        }

        const lengthNum = parseFloat(dino.length) || 5;
        const spriteFilename = getSpriteFilename(dino.rawName);
        const hasSprite = !!spriteFilename;
        let finalSize = 0;   // 라벨 위치 계산용 (시각적 높이)
        let finalWidth = 0;
        let bodyRelativeX = 0.5; // X축 정렬용 (기본값 중앙)
        let footRelativeY = 1.0; // Y축 정렬용 (기본값 하단)
        let actualCharacterHalfWidth = 0;

        if (hasSprite) {
            star.className = 'dino-star absolute cursor-pointer transition-[transform,opacity] duration-150 ease-out';
            // 공룡 실제 크기에 비례한 시각적 높이 계산
            const targetH = (DINO_SPRITE_CONFIG.minHeight +
                (dino.sizeScale * (DINO_SPRITE_CONFIG.maxHeight - DINO_SPRITE_CONFIG.minHeight)))
                * (DINO_SPRITE_CONFIG.scalePercent / 100);

            // 캐시에서 자연 비율 조회 (캐시 없으면 1:1 fallback)
            const cache = spriteAlphaCache[dino.rawName];
            const aspectRatio = cache ? cache.aspectRatio : 1;

            if (cache && cache.boundingBox) {
                const bbox = cache.boundingBox;
                // 실제 캐릭터 높이(contentHeight)가 targetH가 되도록 전체 컨테이너 크기 스케일링
                finalSize = targetH * (cache.height / bbox.contentHeight);
                finalWidth = finalSize * aspectRatio;

                // 상대적인 발끝 및 몸통 중앙 위치 구함 (0~1 범위)
                footRelativeY = (bbox.maxY + 1) / cache.height;
                bodyRelativeX = ((bbox.minX + bbox.maxX) / 2) / cache.width;

                // 라벨 배치를 위한 실제 캐릭터의 절반 가로폭 계산
                const actualCharWidth = finalSize * (bbox.contentWidth / cache.height);
                actualCharacterHalfWidth = actualCharWidth / 2;
            } else {
                finalSize = targetH;
                finalWidth = targetH * aspectRatio;
                footRelativeY = 1.0;
                bodyRelativeX = 0.5;
                actualCharacterHalfWidth = finalWidth / 2;
            }

            const filename = spriteFilename;
            const blurSize = Math.max(6, Math.min(24, Math.floor(targetH * 0.10)));
            star.style.width = `${finalWidth}px`;
            star.style.height = `${finalSize}px`;
            star.style.backgroundImage = `url('${DINO_SPRITE_CONFIG.baseDir}${filename}')`;
            star.style.backgroundSize = '100% 100%';  // 컨테이너=이미지 비율 → 여백 없음
            star.style.backgroundRepeat = 'no-repeat';
            star.style.backgroundPosition = 'center';
            star.style.backgroundColor = 'transparent';
            star.style.boxShadow = 'none';
            star.style.borderRadius = '0';
            const defaultTransform = `translate(-${bodyRelativeX * 100}%, -${footRelativeY * 100}%)`;
            const defaultFilter = `drop-shadow(0 0 ${blurSize}px rgba(255, 255, 255, 0.45))`;
            star.style.transform = defaultTransform;
            star.style.filter = defaultFilter;
            star.style.willChange = 'transform';
            star.dataset.defaultTransform = defaultTransform;
            star.dataset.defaultFilter = defaultFilter;
        } else {
            star.className = 'dino-star absolute cursor-pointer rounded-full transition-all duration-300 hover:scale-[2.5] hover:z-50';
            finalSize = Math.max(4, Math.min(14, lengthNum * 0.8));
            finalWidth = finalSize;
            star.style.width = `${finalSize}px`;
            star.style.height = `${finalSize}px`;
            star.style.backgroundColor = '#fff';
            star.style.boxShadow = `0 0 ${finalSize * 2}px rgba(255,255,255,0.8)`;
            star.style.borderRadius = '50%';
            star.style.transform = 'translate(-50%, -50%)';
            actualCharacterHalfWidth = finalWidth / 2;
        }

        star.style.left = `${dino.x}px`;
        star.style.top = `calc(${y}% + 30px)`; // Shifted 5px down per request

        star.dataset.info = JSON.stringify(dino);

        // Pixel-perfect Interaction Logic
        const isAlphaHit = (e) => {
            if (!hasSprite) return true;
            const cache = spriteAlphaCache[dino.rawName];
            if (!cache) return true;

            const rect = star.getBoundingClientRect();
            const x = Math.floor(((e.clientX - rect.left) / rect.width) * cache.width);
            const y = Math.floor(((e.clientY - rect.top) / rect.height) * cache.height);

            if (x < 0 || x >= cache.width || y < 0 || y >= cache.height) return false;
            // Increased tolerance slightly (alpha > 10) to prevent flickering on semi-transparent edges
            return cache.alphas[y * cache.width + x] > 10;
        };

        star.addEventListener('mousemove', (e) => {
            const hit = isAlphaHit(e);
            const isCurrentlyHovered = star.dataset.isHovered === 'true';

            if (hit) {
                star.style.cursor = 'pointer';
                showTooltip(e);

                if (!isCurrentlyHovered) {
                    star.dataset.isHovered = 'true';
                    if (hasSprite) {
                        star.style.transform = `${star.dataset.defaultTransform} scale(1.15)`;
                        star.style.filter = 'drop-shadow(3px 0 0 #5AFF00) drop-shadow(-3px 0 0 #5AFF00) drop-shadow(0 3px 0 #5AFF00) drop-shadow(0 -3px 0 #5AFF00) drop-shadow(2.1px 2.1px 0 #5AFF00) drop-shadow(-2.1px -2.1px 0 #5AFF00) drop-shadow(2.1px -2.1px 0 #5AFF00) drop-shadow(-2.1px 2.1px 0 #5AFF00)';
                        star.style.zIndex = '50';
                    }
                    playHoverAudio(dino.diet);
                }
            } else {
                star.style.cursor = 'default';
                hideTooltip();

                if (isCurrentlyHovered) {
                    star.dataset.isHovered = 'false';
                    if (hasSprite) {
                        star.style.transform = `${star.dataset.defaultTransform} scale(1)`;
                        star.style.filter = star.dataset.defaultFilter;
                        star.style.zIndex = '';
                    }
                }
            }
        });

        star.addEventListener('mouseleave', (e) => {
            hideTooltip();
            const isCurrentlyHovered = star.dataset.isHovered === 'true';
            if (isCurrentlyHovered) {
                star.dataset.isHovered = 'false';
                if (hasSprite) {
                    star.style.transform = `${star.dataset.defaultTransform} scale(1)`;
                    star.style.filter = star.dataset.defaultFilter;
                    star.style.zIndex = '';
                }
            }
        });

        star.addEventListener('click', (e) => {
            if (isAlphaHit(e)) {
                showDetailPage(dino);
            }
        });

        main.appendChild(star);
    });

    // Detail Page Logic
    function showDetailPage(dino) {
        const detailName = document.getElementById('detail-name');
        const detailMeaning = document.getElementById('detail-meaning');
        const detailDiet = document.getElementById('detail-diet');
        const detailPeriod = document.getElementById('detail-period');
        const detailLocation = document.getElementById('detail-location');
        const detailSpecs = document.getElementById('detail-specs');
        const detailDescription = document.getElementById('detail-description');
        const detailTypeTag = document.getElementById('detail-type-tag');

        // 상세 데이터베이스에서 검색 (영문 이름을 키로 사용)
        const richData = window.DINO_DETAILS ? window.DINO_DETAILS[dino.rawName] : null;

        if (richData) {
            // 상세 데이터가 있는 경우 (예: 티라노사우루스)
            detailName.innerText = richData.nameKr;
            detailMeaning.innerText = richData.meaning;
            detailDiet.innerText = richData.dietKr;
            detailTypeTag.innerText = richData.typeKr || dino.type;
            detailPeriod.innerText = richData.periodKr;
            detailLocation.innerText = richData.locationKr;
            detailSpecs.innerText = `길이: ${richData.specs.length} | 무게: ${richData.specs.weight}`;

            detailDescription.innerHTML = richData.description.map(section => `
            <div class="mb-4">
                <h3 class="text-sm font-black text-[#5e432e] mb-1">${section.title}</h3>
                <p class="text-[#3c2a1e] font-bold">${section.content}</p>
            </div>
        `).join('');
        } else {
            // 일반 데이터만 있는 경우 (기존 로직 유지)
            detailName.innerText = dino.name;
            detailMeaning.innerText = `${dino.name}에 대한 기초 정보`;
            detailDiet.innerText = dino.diet || '알 수 없음';
            detailTypeTag.innerText = dino.type || '분류 정보 없음';
            detailPeriod.innerText = `${dino.period} (${dino.mya}백만 년 전)`;
            detailLocation.innerText = dino.livedIn || '정보 없음';
            detailSpecs.innerText = `몸길이: 약 ${dino.length}`;

            detailDescription.innerHTML = `<p>${dino.name}은(는) ${dino.period} 시대에 서식했던 공룡입니다. 현재 상세 생태 정보를 수집 중입니다.</p>`;
        }

        // 모달을 열기 전에 콘텐츠 영역의 스크롤 위치를 최상단으로 리셋
        const contentContainer = document.getElementById('detail-content-container');
        if (contentContainer) {
            contentContainer.scrollTop = 0;
        }

        document.body.classList.add('modal-open');
    }

    function closeDetailPage() {
        document.body.classList.remove('modal-open');
    }

    window.closeDetailPage = closeDetailPage;

    setupScrollLogic(eraData);
    initProgressBarDrag();
}

function initProgressBarDrag() {
    const container = document.getElementById('progress-bar-container');
    const dot = document.getElementById('progress-dot');
    const mapContainer = document.getElementById('dino-map-container');

    if (!container || !dot || !mapContainer) return;

    let isDragging = false;

    const handleMove = (e) => {
        if (!isDragging) return;

        const rect = container.getBoundingClientRect();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        let x = clientX - rect.left;

        // Clamp x between 0 and rect.width
        x = Math.max(0, Math.min(x, rect.width));

        const percent = x / rect.width;

        // Scroll the map
        mapContainer.scrollLeft = percent * (mapContainer.scrollWidth - mapContainer.clientWidth);
    };

    const startDrag = (e) => {
        isDragging = true;
        document.body.style.userSelect = 'none'; // Prevent text selection
        handleMove(e); // Allow jump on click
    };

    const stopDrag = () => {
        isDragging = false;
        document.body.style.userSelect = '';
    };

    container.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', stopDrag);

    // Support touch devices
    container.addEventListener('touchstart', startDrag);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', stopDrag);
}

function setupScrollLogic(eraData) {
    const counterEl = document.getElementById('depth-counter');
    const container = document.getElementById('dino-map-container');
    const eras = Object.keys(eraData);

    if (!container) return;

    // Convert vertical wheel to horizontal scroll
    container.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    const updateScroll = () => {
        const scrollPos = container.scrollLeft + window.innerWidth / 2;

        // Update Top Progress Bar
        const scrollPercent = container.scrollLeft / (container.scrollWidth - container.clientWidth);
        const progressFill = document.getElementById('progress-bar-fill');
        const progressDot = document.getElementById('progress-dot');
        const progressBarContainer = document.getElementById('progress-bar-container');

        const percent1 = parseFloat(progressBarContainer ? progressBarContainer.dataset.percent1 || 0 : 0);
        const percent2 = parseFloat(progressBarContainer ? progressBarContainer.dataset.percent2 || 0 : 0);
        const percent3 = parseFloat(progressBarContainer ? progressBarContainer.dataset.percent3 || 0 : 0);

        if (progressFill && progressBarContainer) {
            progressFill.style.width = `${scrollPercent * 100}%`;

            const containerWidth = progressBarContainer.clientWidth;

            progressFill.style.backgroundColor = 'transparent';
            progressFill.style.backgroundImage = `
                repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 16px,
                    rgba(0, 0, 0, 0.4) 16px,
                    rgba(0, 0, 0, 0.4) 20px
                ),
                linear-gradient(
                    to right,
                    #5AFF00 0%,
                    #5AFF00 ${percent3}%,
                    #FFE600 ${percent3}%,
                    #FFE600 ${percent1}%,
                    #FF9900 ${percent1}%,
                    #FF9900 ${percent2}%,
                    #FF3333 ${percent2}%,
                    #FF3333 100%
                )
            `;
            progressFill.style.backgroundSize = `auto, ${containerWidth}px 100%`;
        }
        if (progressDot) progressDot.style.left = `${scrollPercent * 100}%`;

        let currentMYA = 0;
        for (let i = 1; i < scrollMap.length; i++) {
            if (scrollPos <= scrollMap[i].x) {
                const p = (scrollPos - scrollMap[i - 1].x) / (scrollMap[i].x - scrollMap[i - 1].x);
                currentMYA = scrollMap[i - 1].mya + p * (scrollMap[i].mya - scrollMap[i - 1].mya);
                break;
            }
            currentMYA = scrollMap[scrollMap.length - 1].mya;
        }

        const tenThousandYears = Math.floor(currentMYA * 100);
        let yearText = "";
        if (tenThousandYears === 0) {
            yearText = "0만";
        } else {
            const ok = Math.floor(tenThousandYears / 10000);
            const man = tenThousandYears % 10000;
            if (ok > 0) {
                yearText += `${ok}억`;
            }
            if (man > 0) {
                if (ok > 0) {
                    yearText += ` ${man.toLocaleString()}만`;
                } else {
                    yearText += `${man.toLocaleString()}만`;
                }
            }
        }
        counterEl.innerText = yearText;

        // Update Geological Events Overlay
        const geoOverlay = document.getElementById('geological-event-overlay');
        const geoLabel = document.getElementById('geological-event-label');
        if (geoOverlay) {
            let activeEvent = null;
            let maxOpacity = 0;

            geologicalEvents.forEach(event => {
                event.peaks.forEach(peak => {
                    const dist = Math.abs(currentMYA - peak.center);
                    if (dist < peak.range) {
                        const opacity = 1 - (dist / peak.range);
                        if (opacity > maxOpacity) {
                            maxOpacity = opacity;
                            activeEvent = event;
                        }
                    }
                });
            });

            if (maxOpacity > 0 && activeEvent) {
                document.getElementById('geo-event-title-ko').innerText = activeEvent.nameKo;
                document.getElementById('geo-event-desc').innerText = activeEvent.desc;
                document.getElementById('geo-event-impact').innerText = `영향: ${activeEvent.impact}`;

                geoOverlay.style.opacity = maxOpacity;
                if (geoLabel) geoLabel.style.opacity = maxOpacity;
            } else {
                geoOverlay.style.opacity = 0;
                if (geoLabel) geoLabel.style.opacity = 0;
            }
        }

        let bestEra = null;
        if (currentMYA < 76) {
            bestEra = "Late Cretaceous";
        } else {
            eras.forEach(era => {
                // Era display logic based on appearance range
                if (currentMYA >= eraData[era].min - 3 && currentMYA <= eraData[era].max + 3) {
                    bestEra = era;
                }
            });

            // Ensure we always have a bestEra for display fallback
            if (!bestEra && eras.length > 0) {
                let minDist = Infinity;
                eras.forEach(era => {
                    const dist = Math.min(
                        Math.abs(currentMYA - eraData[era].min),
                        Math.abs(currentMYA - eraData[era].max)
                    );
                    if (dist < minDist) {
                        minDist = dist;
                        bestEra = era;
                    }
                });
            }
        }

        const scrollPct = scrollPercent * 100;
        let activeEraColor = '#5AFF00';
        if (scrollPct >= percent2) {
            activeEraColor = '#FF3333'; // Red
        } else if (scrollPct >= percent1) {
            activeEraColor = '#FF9900'; // Orange
        } else if (scrollPct >= percent3) {
            activeEraColor = '#FFE600'; // Yellow
        } else {
            activeEraColor = '#5AFF00'; // Green
        }

        eras.forEach(era => {
            const eraId = era.toLowerCase().replace(/\s+/g, '-');
            const el = document.getElementById(`era-${eraId}`);
            if (!el) return;
            if (era === bestEra) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                const span = el.querySelector('span');
                if (span) {
                    span.style.color = activeEraColor;
                }
            } else {
                el.style.opacity = '0';
                el.style.transform = 'translateY(10px)';
            }
        });
    };

    container.addEventListener('scroll', updateScroll);
    window.addEventListener('resize', updateScroll);
    updateScroll();
}

const tooltip = document.createElement('div');
tooltip.id = 'dino-tooltip';
tooltip.className = 'fixed pointer-events-none opacity-0 transition-opacity duration-300 z-50 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/20 text-white text-xs max-w-xs shadow-2xl';
document.body.appendChild(tooltip);

function showTooltip(e) {
    const dino = JSON.parse(e.target.dataset.info);
    tooltip.innerHTML = `
        <div class="space-y-2">
            <h3 class="text-lg font-black text-[#eebd8e] uppercase tracking-tighter">${dino.name}</h3>
            <div class="grid grid-cols-2 gap-2 opacity-80">
                <p><span class="text-[#bacda4]">식성:</span> ${dino.diet}</p>
                <p><span class="text-[#bacda4]">분류:</span> ${dino.type}</p>
                <p><span class="text-[#bacda4]">길이:</span> ${dino.length}</p>
                <p><span class="text-[#bacda4]">지역:</span> ${dino.livedIn}</p>
            </div>
            <p class="text-[10px] italic border-t border-white/10 pt-2 opacity-60">${dino.period}</p>
        </div>
    `;
    tooltip.style.left = `${e.clientX + 20}px`;
    tooltip.style.top = `${e.clientY + 20}px`;
    tooltip.classList.replace('opacity-0', 'opacity-100');
}

function hideTooltip() {
    tooltip.classList.replace('opacity-100', 'opacity-0');
}

document.addEventListener('DOMContentLoaded', initDinoMap);
