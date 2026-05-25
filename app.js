/**
 * MOHAN DUAL-VISUALIZER PORTFOLIO APPLICATION ENGINE
 * ----------------------------------------------------
 * Pure Vanilla JavaScript implementing both case study visualizers:
 * - Case Study 01: Interactive Kitchen Slab & Tile Visualizer (Marble)
 * - Case Study 02: Aurelia Fine Jewelry Customizer & Branding Suite (Jewelry)
 * Includes live on-page code inspection libraries and booking funnels.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. STICKY NAV HEADER & MOBILE NAVIGATION
  // ==========================================
  const header = document.getElementById('mainHeader');
  const menuToggle = document.getElementById('menuToggle');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navbar.classList.toggle('active');
    });

    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navbar.classList.remove('active');
      });
    });
  }

  // Active navigation highlight on scroll
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('nav ul li a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').slice(1) === current) {
        item.classList.add('active');
      }
    });
  });


  // ==========================================
  // 2. CASE STUDY 01: KITCHEN SLAB & TILE VISUALIZER
  // ==========================================
  
  // Customizer state
  let visualizerState = {
    stone: 'carrara',
    finish: 'polished',
    backsplash: 'slab'
  };

  // Quarry fabrication pricing parameters
  const STONE_PRICES = {
    carrara: 85,    // $85 per fabricated sqft
    nero: 98,       // $98 per sqft
    emerald: 145    // $145 per sqft
  };

  const FINISH_SURCHARGES = {
    polished: 15,   // Specular polishing adds $15/sqft
    honed: 0        // Honed matte adds $0/sqft
  };

  const CONFIG_SURCHARGES = {
    slab: 35,       // Solid slab match backsplash
    chevron: 18,    // Mosaic cuts cost
    grid: 0         // Standard tiles cost
  };

  // DOM Controls
  const stoneBtns = document.querySelectorAll('.metal-btn');
  const finishBtns = document.querySelectorAll('.finish-btn');
  const tileBtns = document.querySelectorAll('.tile-btn');
  const customizerPrice = document.getElementById('customizerPrice');
  const customizerInquireBtn = document.getElementById('customizerInquireBtn');
  
  const glossShader = document.getElementById('glossShader');
  const veinGlow = document.getElementById('veinGlow');

  // SVG Elements mapping
  const svgElements = {
    backsplashBase: document.getElementById('backsplashSlabBase'),
    backsplashVeins: document.getElementById('backsplashSlabVeins'),
    countertopBase: document.getElementById('countertopBase'),
    countertopVeins: document.getElementById('countertopVeins'),
    waterfallLeftBase: document.getElementById('waterfallLeftBase'),
    waterfallLeftVeins: document.getElementById('waterfallLeftVeins'),
    waterfallRightBase: document.getElementById('waterfallRightBase'),
    waterfallRightVeins: document.getElementById('waterfallRightVeins'),
    edgeBase: document.getElementById('edgeBase'),
    edgeVeins: document.getElementById('edgeVeins')
  };

  const backsplashChevron = document.getElementById('backsplashChevron');
  const backsplashGrid = document.getElementById('backsplashGrid');

  // Stone Quarry Selection Listeners
  stoneBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const stone = e.currentTarget.getAttribute('data-stone');
      visualizerState.stone = stone;
      
      stoneBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      
      applyVisualizerChanges();
      triggerVeinGlowEffect();
    });
  });

  // Finish Choice (Polished Gloss vs Honed Matte)
  finishBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const finish = e.currentTarget.getAttribute('data-finish');
      visualizerState.finish = finish;
      
      finishBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      
      applyVisualizerChanges();
    });
  });

  // Backsplash Layout configuration
  tileBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const configuration = e.currentTarget.getAttribute('data-tile');
      visualizerState.backsplash = configuration;
      
      tileBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      
      applyVisualizerChanges();
    });
  });

  // Core visual updates for Kitchen visualizer
  function applyVisualizerChanges() {
    const { stone, finish, backsplash } = visualizerState;

    const baseGradientMap = {
      carrara: 'url(#carraraBase)',
      nero: 'url(#neroBase)',
      emerald: 'url(#emeraldBase)'
    };

    const veinPatternMap = {
      carrara: 'url(#carraraVeinPattern)',
      nero: 'url(#neroVeinPattern)',
      emerald: 'url(#emeraldVeinPattern)'
    };

    const targetBase = baseGradientMap[stone];
    const targetVeins = veinPatternMap[stone];

    // Apply base fills
    if (svgElements.backsplashBase) svgElements.backsplashBase.setAttribute('fill', targetBase);
    if (svgElements.countertopBase) svgElements.countertopBase.setAttribute('fill', targetBase);
    if (svgElements.waterfallLeftBase) svgElements.waterfallLeftBase.setAttribute('fill', targetBase);
    if (svgElements.waterfallRightBase) svgElements.waterfallRightBase.setAttribute('fill', targetBase);
    if (svgElements.edgeBase) svgElements.edgeBase.setAttribute('fill', targetBase);

    // Apply veining fills
    if (svgElements.backsplashVeins) svgElements.backsplashVeins.setAttribute('fill', targetVeins);
    if (svgElements.countertopVeins) svgElements.countertopVeins.setAttribute('fill', targetVeins);
    if (svgElements.waterfallLeftVeins) svgElements.waterfallLeftVeins.setAttribute('fill', targetVeins);
    if (svgElements.waterfallRightVeins) svgElements.waterfallRightVeins.setAttribute('fill', targetVeins);
    if (svgElements.edgeVeins) svgElements.edgeVeins.setAttribute('fill', targetVeins);

    // Backsplash Line Configuration
    if (backsplash === 'slab') {
      if (backsplashChevron) backsplashChevron.style.opacity = '0';
      if (backsplashGrid) backsplashGrid.style.opacity = '0';
    } 
    else if (backsplash === 'chevron') {
      if (backsplashChevron) backsplashChevron.style.opacity = '1';
      if (backsplashGrid) backsplashGrid.style.opacity = '0';
    } 
    else if (backsplash === 'grid') {
      if (backsplashChevron) backsplashChevron.style.opacity = '0';
      if (backsplashGrid) backsplashGrid.style.opacity = '1';
    }

    // Mirror Glare Shader
    if (finish === 'polished') {
      if (glossShader) glossShader.classList.add('active');
    } else {
      if (glossShader) glossShader.classList.remove('active');
    }

    // Dynamic Price Calculation
    const baseStoneCost = STONE_PRICES[stone];
    const finishSurcharge = FINISH_SURCHARGES[finish];
    const configSurcharge = CONFIG_SURCHARGES[backsplash];
    const finalPrice = baseStoneCost + finishSurcharge + configSurcharge;
    
    if (customizerPrice) {
      customizerPrice.textContent = '$' + finalPrice + ' / sqft';
    }
  }

  // Pulsing reflection vein animation
  function triggerVeinGlowEffect() {
    if (!veinGlow) return;
    veinGlow.classList.add('active');
    setTimeout(() => {
      veinGlow.classList.remove('active');
    }, 1200);
  }

  // Auto-fill Bespoke booking form with visualizer choices
  if (customizerInquireBtn) {
    customizerInquireBtn.addEventListener('click', () => {
      const { stone, finish, backsplash } = visualizerState;
      const stoneNames = { carrara: 'Calacatta Gold', nero: 'Nero Marquina', emerald: 'Emerald Quartzite' };
      const finishNames = { polished: 'Polished High-Gloss', honed: 'Honed Matte Satin' };
      const configNames = { slab: 'Solid Slab Backsplash', chevron: 'Chevron Mosaic back', grid: 'Grid Block tiles' };
      
      const selectionString = `Slab Visualizer Quote: ${stoneNames[stone]} (${finishNames[finish]}) with ${configNames[backsplash]}`;
      
      const interestInput = document.getElementById('custInterest');
      if (interestInput) {
        interestInput.value = selectionString;
        interestInput.dispatchEvent(new Event('input'));
      }
      
      const inquireSec = document.getElementById('inquire');
      if (inquireSec) {
        inquireSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const nameInput = document.getElementById('custName');
          if (nameInput) nameInput.focus();
        }, 800);
      }
    });
  }


  // ==========================================
  // 3. CASE STUDY 02: AURELIA JEWELRY VISUALIZER (PAST WORK)
  // ==========================================

  // Jewelry visualizer state
  let customizerState = {
    metal: 'gold',
    gemstone: 'diamond',
    carat: 1.5
  };

  const JEWELRY_METAL_PRICES = {
    gold: 2400,
    rose: 2500,
    platinum: 2900
  };

  const JEWELRY_GEM_PRICES = {
    diamond: 2000,
    emerald: 1600,
    sapphire: 1400,
    ruby: 1800
  };

  // DOM Controls for Jewelry Customizer
  const jewelryMetalBtns = document.querySelectorAll('.jewelry-metal-btn');
  const jewelryGemBtns = document.querySelectorAll('.jewelry-gem-btn');
  const caratSliderJewelry = document.getElementById('caratSliderJewelry');
  const caratValJewelry = document.getElementById('caratValJewelry');
  const customizerPriceJewelry = document.getElementById('customizerPriceJewelry');
  const jewelryInquireBtn = document.getElementById('jewelryInquireBtn');

  // SVG Elements for Jewelry
  const ringBandJewelry = document.getElementById('ringBandJewelry');
  const ringBackBandJewelry = document.getElementById('ringBackBandJewelry');
  const ringProngsJewelry = document.getElementById('ringProngsJewelry');
  const ringColletJewelry = document.getElementById('ringColletJewelry');
  const gemstoneGroupJewelry = document.getElementById('gemstoneGroupJewelry');
  const gemMainJewelry = document.getElementById('gemMainJewelry');
  const gemTableJewelry = document.getElementById('gemTableJewelry');
  const ringSparkleJewelry = document.getElementById('ringSparkleJewelry');

  // Metal Selection triggers
  jewelryMetalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const metal = e.currentTarget.getAttribute('data-metal');
      customizerState.metal = metal;
      
      jewelryMetalBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      
      applyJewelryChanges();
    });
  });

  // Gem Selection triggers
  jewelryGemBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const gem = e.currentTarget.getAttribute('data-gem');
      customizerState.gemstone = gem;
      
      jewelryGemBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      
      applyJewelryChanges();
      triggerJewelrySparkle();
    });
  });

  // Carat Slider triggers
  if (caratSliderJewelry && caratValJewelry) {
    caratSliderJewelry.addEventListener('input', (e) => {
      const carat = parseFloat(e.target.value);
      customizerState.carat = carat;
      caratValJewelry.textContent = carat.toFixed(2) + ' ct';
      
      applyJewelryChanges();
    });

    caratSliderJewelry.addEventListener('change', () => {
      triggerJewelrySparkle();
    });
  }

  // Update Ring SVG and Dynamic Pricing
  function applyJewelryChanges() {
    const { metal, gemstone, carat } = customizerState;

    // 1. Metal Gradient fills
    const metalGradientMap = {
      gold: 'url(#goldGradientJewelry)',
      rose: 'url(#roseGradientJewelry)',
      platinum: 'url(#platinumGradientJewelry)'
    };
    const metalGradient = metalGradientMap[metal];

    if (ringBandJewelry) ringBandJewelry.setAttribute('stroke', metalGradient);
    if (ringBackBandJewelry) ringBackBandJewelry.setAttribute('stroke', metalGradient);
    if (ringProngsJewelry) ringProngsJewelry.setAttribute('stroke', metalGradient);
    if (ringColletJewelry) ringColletJewelry.setAttribute('stroke', metalGradient);

    // 2. Gem Gradient fills
    const gemGradientMap = {
      diamond: 'url(#gemDiamondJewelry)',
      emerald: 'url(#gemEmeraldJewelry)',
      sapphire: 'url(#gemSapphireJewelry)',
      ruby: 'url(#gemRubyJewelry)'
    };
    const gemGradient = gemGradientMap[gemstone];

    if (gemMainJewelry) gemMainJewelry.setAttribute('fill', gemGradient);
    if (gemTableJewelry) gemTableJewelry.setAttribute('fill', gemGradient);

    // 3. Gemstone Vector scaling based on carats
    const baseScale = 0.5;
    const scaleFactor = baseScale + (carat * 0.22);
    if (gemstoneGroupJewelry) {
      gemstoneGroupJewelry.setAttribute('transform', `translate(200, 105) scale(${scaleFactor.toFixed(3)})`);
    }

    // 4. Calculate ring price
    const baseMetalCost = JEWELRY_METAL_PRICES[metal];
    const gemPerCaratCost = JEWELRY_GEM_PRICES[gemstone];
    const finalPrice = baseMetalCost + Math.round(gemPerCaratCost * carat);

    if (customizerPriceJewelry) {
      customizerPriceJewelry.textContent = '$' + finalPrice.toLocaleString();
    }
  }

  // Sparkle animation
  function triggerJewelrySparkle() {
    if (!ringSparkleJewelry) return;

    ringSparkleJewelry.classList.remove('animate');
    void ringSparkleJewelry.offsetWidth; // Force CSS reflow

    const card = document.getElementById('visualizerCardJewelry');
    const ringElement = document.getElementById('svgContainerJewelry');

    if (card && ringElement) {
      const cardRect = card.getBoundingClientRect();
      const ringRect = ringElement.getBoundingClientRect();

      const x = (ringRect.left - cardRect.left) + (ringRect.width / 2) + (Math.random() * 20 - 10);
      const y = (ringRect.top - cardRect.top) + (ringRect.height * 0.28) + (Math.random() * 8 - 4);

      ringSparkleJewelry.style.left = `${x}px`;
      ringSparkleJewelry.style.top = `${y}px`;

      ringSparkleJewelry.classList.add('animate');
    }
  }

  // Auto-fill booking form based on Jewelry selection
  if (jewelryInquireBtn) {
    jewelryInquireBtn.addEventListener('click', () => {
      const { metal, gemstone, carat } = customizerState;
      const metalNames = { gold: '18K Yellow Gold', rose: '18K Rose Gold', platinum: 'Platinum' };
      const gemNames = { diamond: 'Brilliant Diamond', emerald: 'Natural Emerald', sapphire: 'Royal Sapphire', ruby: 'Blood Ruby' };
      
      const selectionString = `Jewelry Customizer Quote: ${carat.toFixed(2)}ct ${gemNames[gemstone]} in ${metalNames[metal]}`;
      
      const interestInput = document.getElementById('custInterest');
      if (interestInput) {
        interestInput.value = selectionString;
        interestInput.dispatchEvent(new Event('input'));
      }
      
      const inquireSec = document.getElementById('inquire');
      if (inquireSec) {
        inquireSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const nameInput = document.getElementById('custName');
          if (nameInput) nameInput.focus();
        }, 800);
      }
    });
  }


  // ==========================================
  // 4. PORTFOLIO SHOWCASE GALLERY FILTERING
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');

      const filter = e.currentTarget.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  // ==========================================
  // 5. INTERACTIVE ON-PAGE CODE LABORATORY (INSPECTOR)
  // ==========================================
  const codeSelector = document.getElementById('codeSelector');
  const codeViewport = document.getElementById('codeViewport');

  // Unified code database for both featured projects
  const CODE_BLUEPRINTS = {
    'customizer-js': `// Pure Vanilla JS - Slab State & Backsplash Switcher
function applyVisualizerChanges() {
  const { stone, finish, backsplash } = visualizerState;
  
  const baseGradient = baseGradientMap[stone];
  const veinPattern = veinPatternMap[stone];
  
  svgElements.countertopBase.setAttribute('fill', baseGradient);
  svgElements.countertopVeins.setAttribute('fill', veinPattern);
  
  // Adjust Backsplash grout tile config
  if (backsplash === 'chevron') {
    backsplashChevron.style.opacity = '1';
    backsplashGrid.style.opacity = '0';
  }
}`,
    'waterfall-svg': `<!-- 3D Perspective Vector Kitchen Countertop SVG Structure -->
<polygon points="160,270 440,270 480,355 120,355" id="countertopBase" />
<!-- Veining mask pattern layer overlays base -->
<polygon points="160,270 440,270 480,355 120,355" id="countertopVeins" />

<!-- 3D Waterfall Edge side slabs -->
<polygon points="120,380 160,290 160,270 120,355" id="waterfallLeftBase" />
<polygon points="440,290 480,380 480,355 440,270" id="waterfallRightBase" />

<!-- Polished Reflection Highlights -->
<line x1="120" y1="355" x2="480" y2="355" stroke="#FFF" stroke-width="1.2" />`,
    'gloss-shader-css': `/* CSS Specular Gloss Glare mask shader overlay */
.gloss-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(
    135deg, 
    rgba(255,255,255,0.25) 0%, 
    transparent 50%, 
    rgba(255,255,255,0.03) 70%, 
    transparent 100%
  );
  mix-blend-mode: overlay;
  pointer-events: none;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 4;
}

.gloss-overlay.active {
  opacity: 1; /* Polished Specular active */
}`,
    'jewelry-js': `// Pure Vanilla JS - Gemstone State & Sparkle Animation
function applyJewelryChanges() {
  const { metal, gemstone, carat } = customizerState;
  
  // 1. Swap linear gradient fills on prongs and bands
  const metalGradient = metalGradientMap[metal];
  ringBandJewelry.setAttribute('stroke', metalGradient);
  
  // 2. Swap fills on primary faceted gemstone shapes
  gemMainJewelry.setAttribute('fill', gemGradientMap[gemstone]);
  
  // 3. Perform dynamic mathematical vector scaling
  const scale = 0.5 + (carat * 0.22);
  gemstoneGroupJewelry.setAttribute('transform', \`scale(\${scale})\`);
}`,
    'ring-svg': `<!-- Brilliant Ring SVG structure -->
<!-- Back band depth -->
<ellipse cx="200" cy="230" rx="90" ry="85" id="ringBackBand" />

<!-- Detailed prongs holding crown collet -->
<path d="M 180,140 L 185,115 M 220,140 L 215,115" stroke-width="6" />

<!-- Gemstone pavilion and kite facets group -->
<polygon points="-30,0 -18,-18 18,-18 30,0 0,25" id="gemMain" />
<polygon points="-18,-18 18,-18 10,-30 -10,-30" id="gemTable" />`
  };

  if (codeSelector && codeViewport) {
    const updateCodeViewport = () => {
      const val = codeSelector.value;
      codeViewport.textContent = CODE_BLUEPRINTS[val] || 'Select a blueprint...';
    };
    
    codeSelector.addEventListener('change', updateCodeViewport);
    
    // Initialize default JavaScript display
    updateCodeViewport();
  }


  // ==========================================
  // 6. QUICK VIEW SPECIFICATION SHEET MODAL
  // ==========================================
  const quickViewModal = document.getElementById('quickViewModal');
  const modalClose = document.getElementById('modalClose');
  const quickViewBtns = document.querySelectorAll('.btn-quickview');
  
  const modalImg = document.getElementById('modalImg');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalDesc = document.getElementById('modalDesc');
  const modalMaterial = document.getElementById('modalMaterial');
  const modalGem = document.getElementById('modalGem');
  const modalInquireBtn = document.getElementById('modalInquireBtn');

  // Geological specifications database
  const STONE_SPEC_DETAILS = {
    'carrara-slab': {
      title: 'Calacatta Gold Extra',
      tag: 'Premium Italian Marble',
      price: '$85 / sqft',
      description: 'Mined directly in the Apuan Alps of Carrara, Italy. This legendary marble features a creamy white background accented by dramatic, bold gray veining with soft highlights of warm gold quartz. Extremely desirable for waterfall kitchen islands, bathroom vanities, and premium bookmatched fireplace surrounds.',
      material: 'Carrara, Tuscany, Italy',
      gem: '2cm / 3cm Slabs — High-Gloss Polished',
      image: 'assets/hero_marble.png'
    },
    'chevron-carrara': {
      title: 'Carrara Chevron Wall Tiles',
      tag: 'Bespoke Mosaic Array',
      price: '$28 / sqft',
      description: 'Precision waterjet chevron-cut Carrara white mosaic wall tiles. These elegant mesh-mounted interlocking tile sheets create a spectacular geometric pattern, highlighting natural gray vein variance. Prefect for master shower feature walls and kitchen backsplashes.',
      material: 'Masa Quarries, Italy',
      gem: '12" x 12" Interlocking Mosaic Sheets',
      image: 'assets/bathroom_tiles.png'
    },
    'nero-slab': {
      title: 'Nero Marquina Supreme',
      tag: 'Exclusive Spanish Marble',
      price: '$98 / sqft',
      description: 'Extracted from the Basque Country in Spain. Nero Marquina is a striking obsidian-black limestone slab featuring sharp, symmetric lightning-like white crystalline veins. Hand-polished to a high mirror-gloss. Favored by high-end architects for B2B commercial lobbies and minimalist feature walls.',
      material: 'Markina-Xemein, Spain',
      gem: '3cm Slabs — Bookmatched Face',
      image: 'assets/bookmatch_wall.png'
    }
  };

  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const prodKey = e.currentTarget.getAttribute('data-product');
      const data = STONE_SPEC_DETAILS[prodKey];

      if (data && quickViewModal) {
        modalImg.src = data.image;
        modalImg.alt = data.title;
        modalTag.textContent = data.tag;
        modalTitle.textContent = data.title;
        modalPrice.textContent = data.price;
        modalDesc.textContent = data.description;
        modalMaterial.textContent = data.material;
        modalGem.textContent = data.gem;

        modalInquireBtn.onclick = () => {
          closeModal();
          
          const interestInput = document.getElementById('custInterest');
          if (interestInput) {
            interestInput.value = `Quarry Sourcing Spec: ${data.title}`;
            interestInput.dispatchEvent(new Event('input'));
          }
          
          const inquireSec = document.getElementById('inquire');
          if (inquireSec) {
            inquireSec.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
              const nameInput = document.getElementById('custName');
              if (nameInput) nameInput.focus();
            }, 800);
          }
        };

        quickViewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (quickViewModal) {
      quickViewModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (quickViewModal) {
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) closeModal();
    });
  }

  const inlineInquireBtns = document.querySelectorAll('.btn-inquire');
  inlineInquireBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const prodName = e.currentTarget.getAttribute('data-product-name');
      const interestInput = document.getElementById('custInterest');
      
      if (interestInput) {
        interestInput.value = `Block Sourcing Inquiry: ${prodName}`;
        interestInput.dispatchEvent(new Event('input'));
      }
      
      const inquireSec = document.getElementById('inquire');
      if (inquireSec) {
        inquireSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const nameInput = document.getElementById('custName');
          if (nameInput) nameInput.focus();
        }, 800);
      }
    });
  });


  // ==========================================
  // 7. INQUIRY FORM SUCCESS STATE HANDLING (LIVE WEB3FORMS SUBMISSION)
  // ==========================================
  const inquiryForm = document.getElementById('inquiryForm');
  const successBanner = document.getElementById('successBanner');
  const formSubmitBtn = document.getElementById('formSubmitBtn');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (formSubmitBtn) {
        const originalText = formSubmitBtn.textContent;
        formSubmitBtn.textContent = 'Sending Message...';
        formSubmitBtn.disabled = true;
        
        // Prepare FormData from the live form
        const formData = new FormData(inquiryForm);
        
        // Add specific data mappings for Web3Forms template
        formData.append('name', document.getElementById('custName').value);
        formData.append('email', document.getElementById('custEmail').value);
        formData.append('project_interest', document.getElementById('custInterest').value);
        formData.append('demo_date', document.getElementById('custDate').value);
        formData.append('message', document.getElementById('custMsg').value);

        // Execute asynchronous fetch POST to Web3Forms API
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          formSubmitBtn.textContent = originalText;
          formSubmitBtn.disabled = false;
          
          if (data.success) {
            // Trigger beautiful glassmorphic success banner
            if (successBanner) {
              successBanner.classList.add('active');
              setTimeout(() => {
                successBanner.classList.remove('active');
              }, 4000);
            }
            
            // Reset the form
            inquiryForm.reset();
            
            // Force labels to slide back down
            const inputs = inquiryForm.querySelectorAll('.form-input');
            inputs.forEach(input => {
              input.dispatchEvent(new Event('blur'));
            });
          } else {
            alert('Submission failed: ' + (data.message || 'Unknown error.'));
          }
        })
        .catch(error => {
          formSubmitBtn.textContent = originalText;
          formSubmitBtn.disabled = false;
          alert('Submission error. Please check your network connection.');
          console.error('Error submitting form:', error);
        });
      }
    });
  }

  // Trigger initial setups for both visualizers
  applyVisualizerChanges();
  applyJewelryChanges();

});
