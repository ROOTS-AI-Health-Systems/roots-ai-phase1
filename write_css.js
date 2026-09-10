const fs = require('fs');
const css = `/* app/page.module.css */
.main {
  background-color: var(--zd-warm-white);
}

.sectionContainer {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

@media (min-width: 768px) {
  .sectionContainer {
    padding: 0 24px;
  }
}

@media (min-width: 1024px) {
  .sectionContainer {
    padding: 0 40px;
  }
}

/* ============ HERO ============ */
.hero {
  background: var(--zd-navy);
  position: relative;
  overflow: visible;
}

.heroSection {
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 16px 72px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (min-width: 768px) {
  .heroSection {
    padding: 100px 24px 80px;
  }
}

@media (min-width: 1024px) {
  .heroSection {
    padding: 80px 40px;
    min-height: 580px;
    align-items: center;
  }
}

.heroInner {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  z-index: 2;
  flex: 1;
  width: 100%;
}

@media (min-width: 1024px) {
  .heroInner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.heroCopy {
  flex: 1;
  max-width: 600px;
}

@media (min-width: 1024px) {
  .heroCopy {
    max-width: 560px;
  }
}

.heroEyebrow {
  display: inline-block;
  color: var(--zd-gold);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.1px;
  text-transform: uppercase;
}

.heroTitle {
  font-size: 34px;
  font-weight: 700;
  color: var(--zd-white);
  line-height: 1.15;
  max-width: 600px;
}

@media (min-width: 768px) {
  .heroTitle {
    font-size: 44px;
  }
}

@media (min-width: 1024px) {
  .heroTitle {
    font-size: 52px;
  }
}

.heroDescription {
  font-size: 17px;
  color: var(--zd-white);
  line-height: 1.55;
  max-width: 560px;
}

@media (max-width: 639px) {
  .heroDescription {
    font-size: 16px;
  }
}

.heroButtons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
}

@media (min-width: 640px) {
  .heroButtons {
    flex-direction: row;
    align-items: center;
  }
}

.btnGold {
  display: inline-block;
  padding: 12px 28px;
  background: var(--zd-gold);
  color: var(--zd-navy);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: opacity 0.2s;
  text-align: center;
}

.btnGold:hover {
  opacity: 0.9;
}

.btnOutlineWhite {
  display: inline-block;
  padding: 12px 28px;
  background: transparent;
  color: var(--zd-white);
  border: 1px solid var(--zd-white);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s;
  text-align: center;
}

.btnOutlineWhite:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* LBIS hero canvas */
.lbisHero {
  display: none;
}

@media (min-width: 1024px) {
  .lbisHero {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
    width: 520px;
    height: 520px;
    pointer-events: none;
    z-index: 1;
  }
}

.lbisCanvas {
  width: 520px;
  height: 520px;
  position: relative;
}

.lbisSvg {
  width: 100%;
  height: 100%;
  display: block;
}

/* Mobile LBIS */
.lbisMobile {
  display: block;
  margin: 24px auto 0;
  max-width: 360px;
}

@media (min-width: 1024px) {
  .lbisMobile {
    display: none;
  }
}
`;
fs.writeFileSync('d:/SahilThakur/Drholly/my-nextjs-app/app/page.module.css', css);
console.log('CSS written');
