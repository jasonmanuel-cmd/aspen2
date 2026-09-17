from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote,urlsplit
import json, re, collections
ROOT=Path(__file__).resolve().parent.parent
PAGES=['index','floor-plans','financing','contact','thank-you','signin-log']
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__(convert_charrefs=True);self.nodes=[];self.scripts=[];self.in_schema=False;self.schema='';self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs);self.nodes.append((tag,a))
  if tag=='script' and a.get('type')=='application/ld+json':self.in_schema=True;self.schema=''
 def handle_data(self,data):
  if self.in_schema:self.schema+=data
 def handle_endtag(self,tag):
  if tag=='script' and self.in_schema:self.scripts.append(json.loads(self.schema));self.in_schema=False
parsed={name:Page((ROOT/(name+'.html')).read_text(encoding='utf-8')) for name in PAGES}
issues=[];results=[]
for name,p in parsed.items():
 ids=[a['id'] for _,a in p.nodes if 'id' in a]
 for ident,count in collections.Counter(ids).items():
  if count>1:issues.append(f'{name}: duplicate id {ident}')
 if len([t for t,a in p.nodes if t=='h1'])!=1:issues.append(f'{name}: expected exactly one h1')
 if len([t for t,a in p.nodes if t=='main'])!=1:issues.append(f'{name}: expected exactly one main landmark')
 for tag,a in p.nodes:
  if tag=='img' and 'alt' not in a:issues.append(f'{name}: image missing alt')
  for field in ['href','src','data-src','data-opening-src','poster']:
   value=a.get(field,'');url=urlsplit(value)
   if not value or url.scheme or url.netloc:continue
   path=unquote(url.path);target=name if not path else Path(path).stem
   if not path and not url.fragment:continue
   file=ROOT/path if path else ROOT/(name+'.html')
   if path and not file.is_file():issues.append(f'{name}: missing {field} {value}')
   if url.fragment and target in parsed and url.fragment not in [x.get('id') for _,x in parsed[target].nodes]:issues.append(f'{name}: missing anchor {value}')
 robots=[a.get('content') for t,a in p.nodes if t=='meta' and a.get('name')=='robots']
 canonical=[a.get('href') for t,a in p.nodes if t=='link' and a.get('rel')=='canonical']
 if name in PAGES[:4] and len(canonical)!=1:issues.append(f'{name}: expected one canonical')
 if name in PAGES[4:] and not any('noindex' in x for x in robots):issues.append(f'{name}: utility needs noindex')
 graph=[g for script in p.scripts for g in script.get('@graph',[script])]
 results.append({'page':name,'h1':1,'canonical':canonical,'robots':robots,'schemaTypes':[x.get('@type') for x in graph]})
report={'pages':results,'issues':issues,'scope':'Static assets, anchors, image alternatives, IDs, primary headings, canonical presence, utility noindex, and JSON-LD syntax. This is not full accessibility or schema compliance certification.'}
output=ROOT/'reports'/'site-audit.json';output.parent.mkdir(exist_ok=True);output.write_text(json.dumps(report,indent=2),encoding='utf-8');print(json.dumps(report,indent=2));raise SystemExit(bool(issues))
