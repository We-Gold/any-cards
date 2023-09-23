(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function l(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=l(o);fetch(o.href,n)}})();const p=(t,e,l,r)=>i(t,r).map(s=>s.join(e)).join(l),i=(t,e)=>e.length===0?t:t.map(l=>l.filter((r,o)=>e.includes(o)));if(import.meta.vitest){const{it:t,expect:e}=import.meta.vitest,l=[["hello","world"],["bye","world"]],r=[["hello","world",""],["bye","world",""],["okay","world",""]];t("filterColumns",()=>{e(i(l,[])).toEqual(l),e(i(l,[0])).toEqual([["hello"],["bye"]]),e(i(l,[0,1])).toEqual(l),e(i(r,[0,1])).toEqual([["hello","world"],["bye","world"],["okay","world"]]),e(i(r,[0,2])).toEqual([["hello",""],["bye",""],["okay",""]])}),t("delimitParsedFile",()=>{e(p(l,",",`
`,[]),`hello,world
bye,world`),e(p(r,",",`
`,[]),`hello,world,
bye,world,
okay,world,`)})}const d=(t,e=",",l=`
`)=>a(t,l).map(o=>c(o,e)),a=(t,e)=>t.split(e),c=(t,e)=>t.split(e);if(import.meta.vitest){const{it:t,expect:e}=import.meta.vitest;t("parseFileByDelimiter",()=>{const l=`hello,world
bye,world`,r=`hello,world,
bye,world
see,ya`,o="";e(d(l,",",`
`)).toEqual([["hello","world"],["bye","world"]]),e(d(r,",",`
`)).toEqual([["hello","world",""],["bye","world"],["see","ya"]]),e(d(o,",",`
`)).toEqual([[""]])}),t("splitFileByLine",()=>{const l=`hello,world
bye,world`,r="hello,world",o="";e(a(l,`
`)).toEqual(["hello,world","bye,world"]),e(a(r,`
`)).toEqual(["hello,world"]),e(a(o,`
`)).toEqual([""])}),t("splitFileLineByDelimiter",()=>{const l="hello,world",r="hello,world,",o="",n="hello	world";e(c(l,",")).toEqual(["hello","world"]),e(c(r,",")).toEqual(["hello","world",""]),e(c(o,",")).toEqual([""]),e(c(n,"	")).toEqual(["hello","world"])})}const u=(t,e)=>({delimiter:t,newLineDelimiter:e}),y={CSV:u(",",`
`),"OBSIDIAN-INLINE":u("::",`
`),"OBSIDIAN-MULTILINE":u(`
?
`,`

`)};const h=document.querySelector("#input"),L=document.querySelector("#output"),f=document.querySelector("#select-input"),m=document.querySelector("#select-output");document.addEventListener("DOMContentLoaded",()=>{let t="";for(const e of Object.keys(y))t+=`<option>${e}</option>`;f.innerHTML=t,m.innerHTML=t});const w=()=>{let t="";const e=y[f.value],l=y[m.value];try{const r=d(h.value,e.delimiter,e.newLineDelimiter);t=p(r,l.delimiter,l.newLineDelimiter,[])}catch(r){console.log(r)}L.value=t};h.addEventListener("input",w);f.addEventListener("change",w);m.addEventListener("change",w);
