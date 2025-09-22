const mapping = {
  '1': 'e', '2': 'd', '3': 'c', '4': 'b', '5': 'a',
  '6': '9', '7': '8', '8': '7', '9': '6', '0': 'f',
  'a': '5', 'b': '4', 'c': '3', 'd': '2', 'e': '1', 'f': '0'
};

function transform(ssid) {
  if (!ssid) return '';

  let core = ssid;
  const low = core.toLowerCase();

  if (low.endsWith('_5g') || low.endsWith('_4g')) {
    core = core.slice(0, -3);
  }

  let prefix = '';
  if (low.startsWith('fh_')) {
    core = core.slice(3);
    prefix = 'wlan';
  }

  let result = '';
  for (const ch of core.toLowerCase()) {
    result += (mapping.hasOwnProperty(ch) ? mapping[ch] : ch);
  }
  return prefix + result;
}

const ssidInput = document.getElementById('ssid');
const goBtn = document.getElementById('go');
const resultEl = document.getElementById('result');
const copyBtn = document.getElementById('copy');

goBtn.addEventListener('click', () => {
  const val = ssidInput.value.trim();
  const out = transform(val);
  if (out) {
    resultEl.textContent = out;
    copyBtn.disabled = false;
  } else {
    resultEl.textContent = ' -> Hasil akan muncul disini <- ';
    copyBtn.disabled = true;
  }
});

copyBtn.addEventListener('click', async () => {
  try {
    const text = resultEl.textContent;
    if (!text || text.includes('Hasil akan muncul')) return;
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy', 1200);
  } catch (err) {
    alert('Gagal copy: ' + err);
  }
});

ssidInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') goBtn.click();
});
