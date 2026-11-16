const digits = {
    "0": ["2:0", "2:8", "0:2", "1:8", "3:8", "0:1", "1:0", "3:0", "4:1", "4:2", "4:3", "4:4", "4:5", "4:6", "4:7", "0:3", "0:4", "0:5", "0:6", "0:7"],
    "1": ["2:0", "2:1", "2:2", "2:3", "2:4", "2:5", "2:6", "2:7", "2:8", "0:2", "1:1", "0:8", "1:8", "3:8", "4:8"],
    "2": ["2:0", "2:8", "1:8", "3:8", "0:1", "1:0", "3:0", "4:1", "4:2", "4:3", "4:4", "0:8", "4:8", "1:7", "2:6", "3:5"],
    "3": ["2:0", "2:8", "1:8", "3:8", "1:0", "3:0", "0:0", "4:0", "0:7", "4:7", "4:5", "4:6", "0:4", "1:4", "2:4", "3:4", "3:1", "2:2", "1:3"],
    "4": ["4:7", "4:5", "4:6", "1:4", "2:4", "3:4", "0:4", "4:4", "4:8", "4:3", "4:2", "4:1", "4:0", "0:3", "0:2", "0:1", "0:0"],
    "5": ["4:7", "4:5", "4:6", "4:0", "0:3", "0:2", "0:1", "0:0", "1:0", "2:0", "3:0", "2:8", "3:8", "1:8", "0:7", "3:4", "2:4", "1:4", "0:4"],
    "6": ["4:7", "4:5", "4:6", "0:3", "0:2", "0:1", "1:0", "2:0", "3:0", "2:8", "3:8", "1:8", "0:7", "3:4", "2:4", "1:4", "0:4", "0:5", "0:6", "4:1"],
    "7": ["1:0", "2:0", "3:0", "4:1", "0:0", "4:0", "4:2", "3:3", "2:4", "1:5", "0:6", "0:7", "0:8"],
    "8": ["1:0", "2:0", "3:0", "4:1", "4:2", "0:6", "0:7", "1:8", "2:8", "3:8", "4:7", "4:6", "4:5", "3:4", "2:4", "1:4", "0:5", "0:3", "0:2", "0:1", "4:3"],
    "9": ["1:0", "2:0", "3:0", "4:1", "4:2", "0:7", "1:8", "2:8", "3:8", "4:7", "4:6", "4:5", "3:4", "2:4", "1:4", "0:3", "0:2", "0:1", "4:3", "4:4"],
}

const timezones = Intl.supportedValuesOf("timeZone");

const select = document.getElementById('timezone')
const add = document.getElementById('add')
const remove = document.getElementById('remove')
const clocks = document.getElementById('clocks')

timezones.forEach(tz => {
  const option = document.createElement('option')
  option.value = tz
  option.textContent = tz;
  select.appendChild(option)
})

let selectedtz = []

function showclocks(){
  clocks.innerHTML = '';

  selectedtz.forEach(tz => {
    const timeStr = new Date().toLocaleTimeString('ru-RU', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const rowContainer = document.createElement('div');
    rowContainer.style.display = 'flex';
    rowContainer.style.alignItems = 'center';
    rowContainer.style.marginBottom = '20px';

    for (let char of timeStr) {
      if (char === ':') {
        const colon = document.createElement('span');
        colon.textContent = ':';
        colon.style.fontSize = '24px';
        colon.style.fontWeight = 'bold';
        colon.style.margin = '0 6px';
        rowContainer.appendChild(colon);
      } else {
        const digitTable = createDigitTable(char);
        rowContainer.appendChild(digitTable);
      }
    }

    clocks.appendChild(rowContainer);
  })
}

function createDigitTable(digitChar) {
  const table = document.createElement('table');
  table.style.borderCollapse = 'collapse';
  table.style.display = 'inline-block';
  table.style.marginRight = '4px';

  const activePixels = digits[digitChar] || [];

  for (let y = 0; y < 9; y++) {
    const tr = document.createElement('tr');
    for (let x = 0; x < 5; x++) {
      const td = document.createElement('td');
      td.style.width = '8px';
      td.style.height = '8px';
      td.style.border = '1px solid #c4c4c4';
      if (activePixels.includes(`${x}:${y}`)) {
        td.style.backgroundColor = '#6d6d6d';
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}

add.addEventListener('click', () => {
  const tz = select.value;
    selectedtz.push(tz);
    showclocks();
})

remove.addEventListener('click', () => {
  selectedtz.pop();
  showclocks();
})

setInterval(showclocks, 1000);
