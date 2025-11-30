function transformTimeToFormattedString(date) {
    const pad = (num) => String(num).padStart(2, '0');
    
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); 
    const day = pad(date.getDate());
    const hours = pad(date.getHours()); 
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}:${month}:${day} ${hours}:${minutes}:${seconds}`;
}

export function formatTime(timestamp){
    const timestampObj = new Date(timestamp);
    const formattedTimestamp = transformTimeToFormattedString(timestampObj);
  return formattedTimestamp
}

export function getTitle(title){
  return title.substr(0, 27);
}

export function getCount(count){
  if (count >= 100000) return "100K";
  else if(count >= 10000) return "10K";
  else if(count >= 1000) return "1K";
  else return count;
}

