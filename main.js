// 天気コードに対応する絵文字を返す関数
function getWMO(w) {
    if (w==0) {
      return '☀️';
    } else if (w==1) {
      return '🌤';
    } else if (w==2) {
      return '⛅️';
    } else if (w==3) {
      return '☁️';
    } else if (w==45) {
      return '霧';
    } else if (w==48) {
      return '霧氷';
    } else if (w==51) {
      return '霧雨';
    } else if (w==53) {
      return '霧雨';
    } else if (w==55) {
      return '霧雨';
    } else if (w==56) {
      return '霧雨';
    } else if (w==57) {
      return '霧雨';
    } else if (w==61) {
      return '☔️';
    } else if (w==63) {
      return '☔️';
    } else if (w==65) {
      return '☔️';
    } else if (w==66) {
      return '氷雨';
    } else if (w==67) {
      return '氷雨';
    } else if (w==71) {
      return '❄️';
    } else if (w==73) {
      return '❄️';
    } else if (w==75) {
      return '❄️';
    } else if (w==77) {
      return '❄️';
    } else if (w==80) {
      return '☔️';
    } else if (w==81) {
      return '☔️';
    } else if (w==82) {
      return '☔️';
    } else if (w==85) {
      return '❄️';
    } else if (w==86) {
      return '❄️';
    } else if (w==95) {
      return '⚡️☔️';
    } else if (w==96) {
      return '⚡️☔️';
    } else if (w==99) {
      return '⚡️☔️';
    } else {
      return w;
    }
  }
  
  // 天気コードに対応する背景色を返す関数
  function getBackgroundColor(w) {
    if (w == 1 || w == 2) {
      return 'orange';
    } else if (w == 3) {
      return 'gray';
    } else if (w == 45 || w == 48 || w == 51 || w == 53 || w == 55 || w == 56 || w == 57) {
      return 'lightblue';
    } else if (w == 61 || w == 63 || w == 65 || w == 80 || w == 81 || w == 82) {
      return 'blue';
    } else if (w == 66 || w == 67 || w == 71 || w == 73 || w == 75 || w == 77 || w == 85 || w == 86) {
      return 'lightpurple';
    } else if (w == 95 || w == 96 || w == 99) {
      return 'yellow';
    } else {
      return 'white';
    }
  }
  
  function makePage(data) {
    setData('day0', dateFormat(data.daily.time[0]));
    setData('day1', dateFormat(data.daily.time[1]));
  
    const weatherCode0 = data.daily.weather_code[0];
    const weatherCode1 = data.daily.weather_code[1];
  
    setData('weathercode0', getWMO(weatherCode0));
    setData('weathercode1', getWMO(weatherCode1));
  
    setData('temperature_max0', data.daily.temperature_2m_max[0] + '°C');
    setData('temperature_max1', data.daily.temperature_2m_max[1] + '°C');
  
    setData('temperature_min0', data.daily.temperature_2m_min[0] + '°C');
    setData('temperature_min1', data.daily.temperature_2m_min[1] + '°C');
  
    setData('precipitation_sum0', data.daily.precipitation_sum[0] + 'mm');
    setData('precipitation_sum1', data.daily.precipitation_sum[1] + 'mm');
  
    // 天気に応じて背景色を設定
    document.body.style.backgroundColor = getBackgroundColor(weatherCode0);
  }
  
  function setData(id, data) {
    document.getElementById(id).innerHTML = data;
  }
  
  function add0(val) {
    return val < 10 ? '0' + val : val;
  }
  
  function dateFormat(date, mode) {
    let dateObject = new Date(date);
  
    const year = dateObject.getFullYear();
    const month = add0(dateObject.getMonth() + 1);
    const day = add0(dateObject.getDate());
  
    const hour = add0(dateObject.getHours());
    const minute = add0(dateObject.getMinutes());
    const second = add0(dateObject.getSeconds());
  
    if (mode == 1) {
      return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
    } else {
      return `${month}月${day}日`;
    }
  }
  
  function updateScreen() {
    setData('time', dateFormat(new Date(), 1));
  }
  
  window.onload = updateScreen;
  setInterval(updateScreen, 1000);
  
  // APIデータの取得とページの更新
  const api = 'https://api.open-meteo.com/v1/forecast?latitude=35.7&longitude=139.6875&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FTokyo';
  
  fetch(api)
    .then(response => response.json())
    .then(data => makePage(data));
  