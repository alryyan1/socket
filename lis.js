
import mysql from 'mysql';
import { SerialPort } from "serialport";
import fs from 'fs'

export const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'laravel_react_app'
});
 
connection.connect();
var cbc = '';


export const handleCbc = (cbc,connection)=>{

  const id = parseFloat(cbc.slice(11,23))
  const pda = cbc.slice(23,29)
  const type = cbc.slice(29,30)
  const wbc = parseFloat(cbc.slice(30,35).slice(0,3)+'.'+cbc.slice(30,35).slice(3))
  const rbc = parseFloat(cbc.slice(35,40).slice(0,2)+'.'+cbc.slice(35,40).slice(2))
  const hb = parseFloat(cbc.slice(40,45).slice(0,3)+'.'+cbc.slice(40,45).slice(3))
  const hct = parseFloat(cbc.slice(45,50).slice(0,3)+'.'+cbc.slice(45,50).slice(3))
  const mcv = parseFloat(cbc.slice(50,55).slice(0,3)+'.'+cbc.slice(50,55).slice(3))
  const mch = parseFloat(cbc.slice(55,60).slice(0,3)+'.'+cbc.slice(55,60).slice(3))
  const mchc = parseFloat(cbc.slice(60,65).slice(0,3)+'.'+cbc.slice(60,65).slice(0,3))
  const plt = parseFloat(cbc.slice(65,70).slice(0,4)+'.'+cbc.slice(65,70).slice(0,4))
  const lympPerc = parseFloat(cbc.slice(70,75).slice(0,3)+'.'+cbc.slice(70,75).slice(3))
  const mixPerc = parseFloat(cbc.slice(75,80).slice(0,3)+'.'+cbc.slice(75,80).slice(3))
  const neutroPerc = parseFloat(cbc.slice(80,85).slice(0,3)+'.'+cbc.slice(80,85).slice(3))
  const lyphAbs = parseFloat(cbc.slice(85,90).slice(0,3)+'.'+cbc.slice(85,90).slice(3))
  const mxdAbs = parseFloat(cbc.slice(90,95).slice(0,3)+'.'+cbc.slice(90,95).slice(3))
  const neutroAbs = parseFloat(cbc.slice(95,100).slice(0,3)+'.'+cbc.slice(95,100).slice(3))
  const rdwsd = parseFloat(cbc.slice(100,105).slice(0,3)+'.'+cbc.slice(100,105).slice(3))
  const pdw = parseFloat(cbc.slice(105,110).slice(0,3)+'.'+cbc.slice(105,110).slice(3))
  const mpv = parseFloat(cbc.slice(110,115).slice(0,3)+'.'+cbc.slice(110,115).slice(3))
  const plcr = parseFloat(cbc.slice(115,120).slice(0,3)+'.'+cbc.slice(115,120).slice(3))
  
  connection.query(`
    INSERT INTO sysmex (
      doctorvisit_id, WBC, RBC, HGB, HCT, MCV, MCH, MCHC, PLT, 
      lym_p, mxd_p, neut_p, lym_c, mxd_c, neut_c, 
      rdw_sd, rdw_cv, PDW, MPV, PLCR
    ) VALUES (
      '${id}', '${wbc}', '${rbc}', '${hb}', '${hct}', '${mcv}', '${mch}', '${mchc}', '${plt}', 
      '${lympPerc}', '${mixPerc}', '${neutroPerc}', '${lyphAbs}', '${mxdAbs}', '${neutroAbs}', 
      '${rdwsd}', '0', '${pdw}', '${mpv}', '${plcr}'
    )
  `, function (error, results, fields) {
    if (error) throw error;
    console.log('The affected rows is: ', results.affectedRows);
  });
  connection.end();

let data = `
sample id = ${id}
wbc = ${wbc}
rbc = ${rbc}
hb = ${hb}
hct = ${hct}
mcv = ${mcv}
mch = ${mch}
mchc = ${mchc}
plt = ${plt}
lyph% = ${lympPerc}
mxd% = ${mixPerc}
neutro% = ${neutroPerc}
lymphAbs = ${lyphAbs}
mxdAbs = ${mxdAbs}
neutroAbs = ${neutroAbs}
rdwsd = ${rdwsd}
pdw = ${pdw}
mpv = ${mpv}
plcr = ${plcr}

`

console.log(data)
  
}