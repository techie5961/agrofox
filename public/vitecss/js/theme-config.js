const defaultTheme = {
  background: '#ffffff',
  primary: '#1b7e43',
  secondary: '#f47321'
};

const bgInput = document.getElementById('bgColor');
const primaryInput = document.getElementById('primaryColor');
const secondaryInput = document.getElementById('secondaryColor');
const applyButton = document.getElementById('applyButton');
const resetButton = document.getElementById('resetButton');
const saveButton = document.getElementById('saveButton');
const cssOutput = document.getElementById('cssOutput');
const bgSwatch = document.getElementById('bgSwatch');
const primarySwatch = document.getElementById('primarySwatch');
const secondarySwatch = document.getElementById('secondarySwatch');

function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function rgbToHsl({ r, g, b }) {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rNorm:
        h = ((gNorm - bNorm) / delta) % 6;
        break;
      case gNorm:
        h = (bNorm - rNorm) / delta + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / delta + 4;
        break;
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  return { h, s: +(s * 100).toFixed(1), l: +(l * 100).toFixed(1) };
}

function getContrastRgb({ r, g, b }) {
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 160 ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 };
}

function setRootVariable(name, value) {
  document.documentElement.style.setProperty(name, value);
}

function applyTheme(theme) {
  const bgRgb = hexToRgb(theme.background);
  const primaryRgb = hexToRgb(theme.primary);
  const secondaryRgb = hexToRgb(theme.secondary);
  const primaryHsl = rgbToHsl(primaryRgb);
  const secondaryHsl = rgbToHsl(secondaryRgb);
  const bgTextRgb = getContrastRgb(bgRgb);
  const primaryTextRgb = getContrastRgb(primaryRgb);
  const secondaryTextRgb = getContrastRgb(secondaryRgb);

  setRootVariable('--rgb', `${bgRgb.r}, ${bgRgb.g}, ${bgRgb.b}`);
  setRootVariable('--rgt', `${bgTextRgb.r}, ${bgTextRgb.g}, ${bgTextRgb.b}`);
  setRootVariable('--primary-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`);
  setRootVariable('--secondary-rgb', `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}`);
  setRootVariable('--primary-hsl', `${primaryHsl.h}`);
  setRootVariable('--secondary-hsl', `${secondaryHsl.h}`);
  setRootVariable('--primary-text-rgb', `${primaryTextRgb.r}, ${primaryTextRgb.g}, ${primaryTextRgb.b}`);
  setRootVariable('--secondary-text-rgb', `${secondaryTextRgb.r}, ${secondaryTextRgb.g}, ${secondaryTextRgb.b}`);

  updatePreview(theme, bgRgb, primaryRgb, secondaryRgb);
  saveTheme(theme);
}

function updatePreview(theme, bgRgb, primaryRgb, secondaryRgb) {
  bgSwatch.style.backgroundColor = theme.background;
  bgSwatch.textContent = `BG ${theme.background}`;
  primarySwatch.style.backgroundColor = theme.primary;
  primarySwatch.textContent = `Primary ${theme.primary}`;
  secondarySwatch.style.backgroundColor = theme.secondary;
  secondarySwatch.textContent = `Secondary ${theme.secondary}`;

  cssOutput.textContent = `:root {\n` +
    `  --rgb: ${bgRgb.r}, ${bgRgb.g}, ${bgRgb.b};\n` +
    `  --rgt: ${getContrastRgb(bgRgb).r}, ${getContrastRgb(bgRgb).g}, ${getContrastRgb(bgRgb).b};\n` +
    `  --primary-rgb: ${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b};\n` +
    `  --secondary-rgb: ${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b};\n` +
    `  --primary-hsl: ${rgbToHsl(primaryRgb).h};\n` +
    `  --secondary-hsl: ${rgbToHsl(secondaryRgb).h};\n` +
    `  --primary-text-rgb: ${getContrastRgb(primaryRgb).r}, ${getContrastRgb(primaryRgb).g}, ${getContrastRgb(primaryRgb).b};\n` +
    `  --secondary-text-rgb: ${getContrastRgb(secondaryRgb).r}, ${getContrastRgb(secondaryRgb).g}, ${getContrastRgb(secondaryRgb).b};\n` +
    `}`;
}

function saveTheme(theme) {
  try {
    localStorage.setItem('vitecss-theme-config', JSON.stringify(theme));
  } catch (_e) {
    // ignore storage failures
  }
}

function loadTheme() {
  try {
    return JSON.parse(localStorage.getItem('vitecss-theme-config')) || defaultTheme;
  } catch (_e) {
    return defaultTheme;
  }
}

function updateInputs(theme) {
  bgInput.value = theme.background;
  primaryInput.value = theme.primary;
  secondaryInput.value = theme.secondary;
}

function saveThemeToCss(theme) {
  fetch('http://localhost:3000/update-theme', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(theme)
  })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        alert('app.css updated successfully. Reload the theme page to see persisted values.');
      } else {
        alert(`Failed to save theme: ${data.error || 'Unknown error'}`);
      }
    })
    .catch(error => {
      alert(`Failed to connect to theme config server: ${error.message}`);
    });
}

function initThemeConfig() {
  const theme = loadTheme();
  updateInputs(theme);
  applyTheme(theme);
}

applyButton.addEventListener('click', () => {
  const theme = {
    background: bgInput.value,
    primary: primaryInput.value,
    secondary: secondaryInput.value
  };
  applyTheme(theme);
});

saveButton.addEventListener('click', () => {
  const theme = {
    background: bgInput.value,
    primary: primaryInput.value,
    secondary: secondaryInput.value
  };
  saveThemeToCss(theme);
});

resetButton.addEventListener('click', () => {
  updateInputs(defaultTheme);
  applyTheme(defaultTheme);
});

initThemeConfig();
