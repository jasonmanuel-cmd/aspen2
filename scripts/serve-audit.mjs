// Production-like static server: compression and caching, as used by Vercel CDN.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {brotliCompressSync, gzipSync, constants} from 'node:zlib';
const root=process.cwd();
const port=Number(process.env.PORT || 3002);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.webp':'image/webp','.woff2':'font/woff2','.png':'image/png','.jpg':'image/jpeg','.pdf':'application/pdf'};
const cache=new Map();
async function asset(file) {
  const stat=await fs.stat(file), old=cache.get(file);
  if(old && old.modified===stat.mtimeMs) return old;
  const data=await fs.readFile(file), ext=path.extname(file);
  const compress=['.html','.css','.js','.json','.xml','.txt'].includes(ext);
  const result={modified:stat.mtimeMs,data,type:types[ext] || 'application/octet-stream'};
  if(compress){result.br=brotliCompressSync(data,{params:{[constants.BROTLI_PARAM_QUALITY]:4}});result.gzip=gzipSync(data);}
  cache.set(file,result);return result;
}
// Warm the text cache before Lighthouse starts; do not include compression CPU in a request.
for(const name of ['index.html','floor-plans.html','financing.html','contact.html','thank-you.html','signin-log.html','styles.css','fonts.css','main.js','robots.txt','sitemap.xml','llms.txt']) await asset(path.join(root,name));
http.createServer(async(req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
    if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
    if(!path.extname(file))file+='.html';
    const a=await asset(file);
    const encoding=req.headers['accept-encoding'] || '';
    const compressed=encoding.includes('br') && a.br?'br':encoding.includes('gzip') && a.gzip?'gzip':null;
    const payload=compressed?a[compressed]:a.data;
    const headers={'Content-Type':a.type,'Content-Length':payload.length,'Vary':'Accept-Encoding','X-Content-Type-Options':'nosniff','Cache-Control':pathname.startsWith('/assets/')?'public, max-age=31536000, immutable':'public, max-age=0, must-revalidate'};
    if(compressed)headers['Content-Encoding']=compressed;
    res.writeHead(200,headers);res.end(req.method==='HEAD'?undefined:payload);
  }catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}
}).listen(port,()=>console.log(`Production-like audit server: http://localhost:${port}`));
