const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/rv-scene-data.json', 'utf8'));

// Get the existing text layer to clone its shaders
const base = data.history.find(l => l.id === 'text1');

// -- Layer 1: IT'S TIME TO (white) --
base.textContent = "IT'S TIME TO";
base.fill = ['#FFFFFF'];
base.left = 0.5;
base.top = 0.22;
base.textAlign = 'center';
base.anchorPoint = 'center';
base.width = 1200;
base.widthMode = 'fixed';
base.fontSize = 67;
base.lineHeight = 91;
base.htmlRenderOrder = 0;
base.breakpoints = [
  { name: 'Desktop', max: null, min: 992, props: { left: 0.5, top: 0.22, fontSize: 67, lineHeight: 91 } },
  { name: 'Tablet',  max: 991,  min: 576, props: { left: 0.5, top: 0.22, fontSize: 44, lineHeight: 58 } },
  { name: 'Mobile',  max: 575,  min: 0,   props: { left: 0.5, top: 0.20, fontSize: 30, lineHeight: 38 } }
];

// -- Layer 2: EXPLORE (yellow) - clone base shaders --
const explore = JSON.parse(JSON.stringify(base));
explore.id = 'text2';
explore.textContent = 'EXPLORE';
explore.fill = ['#EA9B01'];
explore.left = 0.5;
explore.top = 0.32;
explore.fontSize = 67;
explore.lineHeight = 91;
explore.htmlRenderOrder = 1;
explore.breakpoints = [
  { name: 'Desktop', max: null, min: 992, props: { left: 0.5, top: 0.32, fontSize: 67, lineHeight: 91 } },
  { name: 'Tablet',  max: 991,  min: 576, props: { left: 0.5, top: 0.30, fontSize: 52, lineHeight: 68 } },
  { name: 'Mobile',  max: 575,  min: 0,   props: { left: 0.5, top: 0.30, fontSize: 37, lineHeight: 46 } }
];

// Remove original text1, add both layers
data.history = data.history.filter(l => l.id !== 'text1');
data.history.push(base);
data.history.push(explore);

fs.writeFileSync('public/rv-scene-data.json', JSON.stringify(data));
console.log('Layers:', data.history.map(l => l.id + '(' + (l.textContent || l.type || l.layerType) + ')'));
