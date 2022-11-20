function guardarConExpiracion(key, value) {
    const fecha = new Date();
    const data = { data : value, fecha : fecha.getTime() };
    localStorage.setItem(key, JSON.stringify(data))
}

function buscarConExpiracion(key) {
   const data = JSON.parse(localStorage.getItem(key));
   const fecha = new Date();
    if(data==null)return null;
   if (fecha.getTime() - data.fecha > (15*60 * 1000)) { 
    
    // un dia en ms
     localStorage.removeItem(key);
     return null;
   }
    else {
    return data.data
   }
}export {guardarConExpiracion,buscarConExpiracion};