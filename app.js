// ============ USER & AUTH SYSTEM ============
const ROLE_LABELS={staff:{vn:'Nhân viên',cn:'員工'},accountant:{vn:'KT Bộ phận',cn:'部門會計'},manager:{vn:'Quản lý',cn:'管理'},boss:{vn:'Boss',cn:'老闆'},chief_accountant:{vn:'KT Trưởng',cn:'總會計'},cashier:{vn:'Thủ quỹ',cn:'出納'}};
const DEFAULT_USERS=[
  {username:'nv01',password:'loho2026',role:'staff',name:'Nhân viên 1',staffCode:''},
  {username:'ketoan_bp',password:'loho2026',role:'accountant',name:'KT Bộ phận',staffCode:''},
  {username:'quanly',password:'loho2026',role:'manager',name:'Quản lý',staffCode:''},
  {username:'boss',password:'boss2026',role:'boss',name:'Boss',staffCode:''},
  {username:'ketoan_truong',password:'loho2026',role:'chief_accountant',name:'KT Trưởng',staffCode:''},
  {username:'thu_quy',password:'loho2026',role:'cashier',name:'Thủ quỹ',staffCode:''},
  {username:'mai.dtt',password:'loho2026',role:'staff',name:'Đỗ Thị Tuyết Mai',staffCode:'VP001'},
  {username:'hoa.nnh',password:'loho2026',role:'staff',name:'Nguyễn Ngọc Huyền Hòa',staffCode:'VP003'},
  {username:'luan.dt',password:'loho2026',role:'staff',name:'Đào Thành Luân',staffCode:'VP006'},
  {username:'phuc.hm',password:'loho2026',role:'staff',name:'Hoàng Minh Phúc',staffCode:'VP008'},
  {username:'nhung.ntt',password:'loho2026',role:'staff',name:'Nguyễn Thị Tuyết Nhung',staffCode:'VP009'},
  {username:'teo.tv',password:'loho2026',role:'staff',name:'Thạch Văn Tèo',staffCode:'ĐG004'},
  {username:'tung.dt',password:'loho2026',role:'staff',name:'Dương Thanh Tùng',staffCode:'ĐG006'},
  {username:'thuy.vht',password:'loho2026',role:'staff',name:'Vũ Huỳnh Thanh Thúy',staffCode:'VP012'},
  {username:'thao.htt',password:'loho2026',role:'staff',name:'Hà Thị Thanh Thảo',staffCode:'VP014'},
  {username:'binh.htn',password:'loho2026',role:'staff',name:'Hoàng Thị Ngọc Bình',staffCode:'VP015'},
  {username:'hoa.dt',password:'loho2026',role:'staff',name:'Đặng Thành Hòa',staffCode:'ĐG007'}
];
let USERS=(function(){
  try{
    const saved=JSON.parse(localStorage.getItem('loho_users'));
    if(saved&&Array.isArray(saved)&&saved.length>0&&saved[0].username)return saved;
  }catch(e){}
  return JSON.parse(JSON.stringify(DEFAULT_USERS));
})();
let currentUser=null;
let currentRole='staff';

const CATS=[
{no:1,vn:'Lương nhân viên',cn:'薪資支出'},{no:2,vn:'Thưởng',cn:'工作獎金'},{no:3,vn:'Nhân sự ngoài',cn:'外面人事費'},
{no:4,vn:'Vật dụng văn phòng',cn:'辦公费用'},{no:5,vn:'Thiết bị văn phòng',cn:'辦公設備'},
{no:6,vn:'In ấn',cn:'印刷費'},{no:7,vn:'Phí vận chuyển',cn:'運費'},{no:8,vn:'Phí gửi hàng',cn:'快遞費'},
{no:9,vn:'Phí truyền thông & QC',cn:'行銷費'},{no:10,vn:'Phí quà tặng quảng bá',cn:'贈品費'},
{no:11,vn:'Phí quay phim',cn:'拍攝費'},{no:12,vn:'Thiết bị quay phim',cn:'拍設備'},
{no:13,vn:'Nhập hàng bán',cn:'進貨'},{no:14,vn:'Chi phí sản xuất',cn:'生產費'},{no:15,vn:'Thiết bị sản xuất',cn:'廠務設備'},
{no:16,vn:'Sửa chửa chung',cn:'職工設修'},{no:17,vn:'Sửa chửa xưởng',cn:'廠房設修'},
{no:18,vn:'SC bảo trì TB VP',cn:'辦公設備維修'},{no:19,vn:'SC bảo trì TB xưởng',cn:'廠房設備維修'},
{no:20,vn:'Thực phẩm',cn:'伙食費'},{no:21,vn:'Thờ cúng',cn:'貢品費'},
{no:22,vn:'Phí giao tiếp',cn:'交際費'},{no:23,vn:'Phí phúc lợi NV',cn:'員工福利費'},
{no:24,vn:'Phí đi lại',cn:'車馬費'},{no:25,vn:'Phí công tác',cn:'出差費'},
{no:26,vn:'Phí dịch vụ',cn:'平台費'},{no:27,vn:'Phí CNTT',cn:'軟體費'},
{no:28,vn:'Phí pháp lý',cn:'法務費'},{no:29,vn:'Phí phát triển SP mới',cn:'研發費'},
{no:30,vn:'Vệ sinh',cn:'清潔費'},{no:31,vn:'Phí PCCC, TTXH',cn:'社會安全費'},
{no:32,vn:'Chi phí MTH',cn:'MTH费用'},{no:33,vn:'Khác',cn:'其他'}
];

const STAFF=[
{code:'VP001',name:'Đỗ Thị Tuyết Mai',cn:'杜氏雪梅',dept:'Marketing'},
{code:'VP003',name:'Nguyễn Ngọc Huyền Hòa',cn:'阮玉玄和',dept:'Marketing'},
{code:'VP006',name:'Đào Thành Luân',cn:'逃成輪',dept:'Marketing'},
{code:'VP008',name:'Hoàng Minh Phúc',cn:'黃明福',dept:'Nhân viên'},
{code:'VP009',name:'Nguyễn Thị Tuyết Nhung',cn:'阮氏雪絨',dept:'Mua hàng'},
{code:'ĐG004',name:'Thạch Văn Tèo',cn:'石文小',dept:'Đóng gói'},
{code:'ĐG006',name:'Dương Thanh Tùng',cn:'楊青松',dept:'Đóng gói'},
{code:'VP012',name:'Vũ Huỳnh Thanh Thúy',cn:'武黃青翠',dept:'Media'},
{code:'VP014',name:'Hà Thị Thanh Thảo',cn:'何氏青草',dept:'Kinh doanh'},
{code:'VP015',name:'Hoàng Thị Ngọc Bình',cn:'黃氏玉平',dept:'Văn phòng'},
{code:'ĐG007',name:'Đặng Thành Hòa',cn:'鄧成和',dept:'Đóng gói'}
];

const PAYERS=['Lập Nguyên','He Huan Shan','Kế Toán','NV tạm ứng'];
const STATUS={draft:{l:'Nháp',c:'st-draft'},pending:{l:'Chờ duyệt',c:'st-pending'},approved:{l:'Đã duyệt',c:'st-approved'},voucher:{l:'Đã nộp CT',c:'st-voucher'},boss_approved:{l:'Boss duyệt ✓',c:'st-boss'},paid:{l:'Hoàn tất',c:'st-paid'},rejected:{l:'Từ chối',c:'st-rejected'},returned:{l:'Đã hoàn trả',c:'st-paid'},recall_pending:{l:'Chờ thu hồi',c:'st-recall'},cashier_review:{l:'Thủ quỹ kiểm tra',c:'st-cashier'},cash_disbursed:{l:'Đã chi TM',c:'st-cash-disbursed'},cash_confirmed:{l:'Đã nhận tiền ✓',c:'st-cash-confirmed'}};
const COLORS=['#3b82f6','#10b981','#f59e0b','#ec4899','#8b5cf6','#14b8a6','#f97316','#ef4444','#06b6d4','#84cc16','#a855f7','#e11d48','#0ea5e9','#65a30d','#d946ef','#f43f5e','#0891b2','#ca8a04','#7c3aed','#dc2626','#059669','#2563eb','#c026d3','#e879f9','#facc15','#4ade80','#fb923c','#38bdf8','#a3e635','#f472b6','#818cf8','#34d399','#fbbf24'];
const MS=['01','02','03','04','05','06','07','08','09','10','11','12'];
const ML=['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];

let items=[],budgets={},nextId=1,charts={},advances=[],advNextId=1,cashBatches=[],cashBatchNextId=1;

// ============ AUTH & ROLE SYSTEM ============
function togglePwVis(){const p=document.getElementById('loginPass');const b=document.getElementById('pwToggleBtn');if(p.type==='password'){p.type='text';b.textContent='🙈';}else{p.type='password';b.textContent='👁';}}
function doLogin(){
  const u=document.getElementById('loginUser').value.trim();
  const p=document.getElementById('loginPass').value;
  console.log('[LOHO] Login attempt:',u,'| Users loaded:',USERS.length);
  if(!u||!p){toast('Nhập tài khoản và mật khẩu');return;}
  const user=USERS.find(x=>x.username===u&&x.password===p);
  if(!user){console.log('[LOHO] Login failed for:',u);document.getElementById('pwErr').style.display='block';return;}
  console.log('[LOHO] Login success:',user.name,'role:',user.role);
  document.getElementById('pwErr').style.display='none';
  currentUser=user;
  currentRole=user.role;
  localStorage.setItem('loho_session',JSON.stringify({username:user.username}));
  // Ghi nhớ đăng nhập
  if(document.getElementById('rememberMe').checked){
    localStorage.setItem('loho_remember',JSON.stringify({username:u}));
  }else{
    localStorage.removeItem('loho_remember');
  }
  enterApp();
}
async function enterApp(){
  document.getElementById('roleGate').classList.add('hide');
  document.getElementById('mainApp').style.display='';
  document.getElementById('mainWrap').style.display='';
  const rl=document.getElementById('roleLabel');
  const rLabel=ROLE_LABELS[currentRole]||{vn:currentRole,cn:''};
  rl.textContent=rLabel.vn+' '+rLabel.cn;
  rl.className='role-indicator '+(isStaff()?'staff':'manager');
  const und=document.getElementById('userNameDisplay');
  if(und)und.textContent=currentUser?('👤 '+currentUser.name):'';
  // Hide export/backup buttons for staff
  setTimeout(()=>{
    const ctrls=document.querySelector('.ctrls');
    if(ctrls&&isStaff()){
      ctrls.querySelectorAll('button').forEach(b=>{
        if(b.textContent.includes('CSV')||b.textContent.includes('Backup')||b.textContent.includes('Khôi phục'))b.style.display='none';
      });
    }
  },0);
  // AWAIT loadData để đảm bảo Sheets data loaded trước khi user thao tác
  await loadData();
  cleanTestData();
  rebuildTabs();
}
function openChangePw(){
  document.getElementById('pwOld').value='';
  document.getElementById('pwNew').value='';
  document.getElementById('pwConfirm').value='';
  document.getElementById('pwError').style.display='none';
  document.getElementById('pwModal').classList.add('show');
}
function doChangePw(){
  const old=document.getElementById('pwOld').value;
  const nw=document.getElementById('pwNew').value;
  const cf=document.getElementById('pwConfirm').value;
  const errEl=document.getElementById('pwError');
  if(!old){errEl.textContent='Vui lòng nhập mật khẩu hiện tại';errEl.style.display='';return;}
  if(!currentUser||old!==currentUser.password){errEl.textContent='Mật khẩu hiện tại không đúng';errEl.style.display='';return;}
  if(nw.length<6){errEl.textContent='Mật khẩu mới phải tối thiểu 6 ký tự';errEl.style.display='';return;}
  if(nw!==cf){errEl.textContent='Xác nhận mật khẩu không khớp';errEl.style.display='';return;}
  if(nw===old){errEl.textContent='Mật khẩu mới phải khác mật khẩu cũ';errEl.style.display='';return;}
  // Update password
  currentUser.password=nw;
  const idx=USERS.findIndex(u=>u.username===currentUser.username);
  if(idx>=0)USERS[idx].password=nw;
  localStorage.setItem('loho_users',JSON.stringify(USERS));
  closeM('pwModal');toast('Đổi mật khẩu thành công ✓');
}
function doLogout(){
  localStorage.removeItem('loho_session');
  currentUser=null;currentRole='staff';
  document.getElementById('roleGate').classList.remove('hide');
  document.getElementById('mainApp').style.display='none';
  document.getElementById('mainWrap').style.display='none';
  // Nếu có ghi nhớ → điền sẵn, không xóa remember
  const rem=JSON.parse(localStorage.getItem('loho_remember')||'null');
  if(rem&&rem.username){
    document.getElementById('loginUser').value=rem.username;
    document.getElementById('rememberMe').checked=true;
  }else{
    document.getElementById('loginUser').value='';
    document.getElementById('loginPass').value='';
    document.getElementById('rememberMe').checked=false;
  }
  document.getElementById('pwErr').style.display='none';
}
function tryAutoLogin(){
  const sess=JSON.parse(localStorage.getItem('loho_session')||'null');
  if(sess&&sess.username){
    const user=USERS.find(x=>x.username===sess.username);
    if(user){currentUser=user;currentRole=user.role;enterApp();return true;}
  }
  // No active session — pre-fill from remembered credentials if available
  const rem=JSON.parse(localStorage.getItem('loho_remember')||'null');
  if(rem&&rem.username){
    const lu=document.getElementById('loginUser');
    const lp=document.getElementById('loginPass');
    const rc=document.getElementById('rememberMe');
    if(lu)lu.value=rem.username;
    if(rc)rc.checked=true;
  }
  return false;
}
// Role checks
function hasRole(r){return currentUser&&currentUser.role===r}
function isStaff(){return hasRole('staff')}
function isAccountant(){return hasRole('accountant')}
function isManager(){return hasRole('manager')}
function isBoss(){return hasRole('boss')}
function isChiefAccountant(){return hasRole('chief_accountant')}
function canApprove(){return isManager()||isBoss()}
function canManageVoucher(){return isManager()||isBoss()}
function canBossApprove(){return isBoss()}
function canPayment(){return isChiefAccountant()}
function canCashPay(){return isCashier()}
function isCashier(){return hasRole('cashier')}
function canManageUsers(){return isBoss()||isManager()}
function canSeeAll(){return !isStaff()}
function canSeeWorkflow(){return isChiefAccountant()||isCashier()||isBoss()||isManager()}
function colSubmitCT(){return isChiefAccountant()||isCashier()}
function colBossApproval(){return isChiefAccountant()||isCashier()||isBoss()}
function colPayDone(){return isChiefAccountant()||isCashier()}
function canExport(){return !isStaff()}
function isMgr(){return isManager()||isBoss()}
// Role-based visibility filter: each role only sees items at their relevant workflow stage
function applyRoleFilter(arr){
  if(isStaff()){
    if(currentUser.staffCode)return arr.filter(e=>e.staffCode===currentUser.staffCode);
    return [];
  }
  if(isAccountant()){
    // KT Bộ phận: thấy đơn đã gửi duyệt + đơn draft do chính mình tạo, KHÔNG thấy đơn do manager/boss tạo, KHÔNG thấy đơn bị ẩn
    return arr.filter(e=>{
      if(e.hidden)return false;
      if(e.createdByManager)return false;
      if(e.status==='draft')return !!e.createdByAccountant;
      return true;
    });
  }
  if(isManager()){
    // Quản lý: thấy đơn đã gửi duyệt + đơn của chính mình (kể cả draft)
    return arr.filter(e=>e.status!=='draft'||(e.createdByManager&&e.staffCode===currentUser.staffCode));
  }
  if(isBoss())return arr.filter(e=>['voucher','boss_approved','paid','rejected','cashier_review','cash_disbursed','cash_confirmed','recall_pending'].includes(e.status));
  if(isCashier())return arr.filter(e=>e.method==='Tiền mặt'&&['cashier_review','cash_disbursed','cash_confirmed','paid','rejected'].includes(e.status));
  if(isChiefAccountant())return arr.filter(e=>e.method!=='Tiền mặt'&&['boss_approved','paid','rejected'].includes(e.status));
  return arr;
}

// Status filter options per role
function getStatusFilterOpts(){
  const all=[
    {v:'draft',l:'Nháp'},{v:'pending',l:'Chờ duyệt'},{v:'approved',l:'Đã duyệt'},
    {v:'voucher',l:'Đã nộp CT'},{v:'boss_approved',l:'Boss duyệt'},{v:'paid',l:'Hoàn tất'},
    {v:'rejected',l:'Từ chối'},{v:'recall_pending',l:'Chờ thu hồi'},
    {v:'cashier_review',l:'Thủ quỹ KT'},{v:'cash_disbursed',l:'Đã chi TM'}
  ];
  let visible=all;
  if(isStaff())visible=all.filter(s=>['draft','pending','rejected','recall_pending'].includes(s.v)||['approved','voucher','boss_approved','paid','cashier_review','cash_disbursed'].includes(s.v));
  else if(isAccountant())visible=all;
  else if(isManager())visible=all;
  else if(isBoss())visible=all.filter(s=>['voucher','boss_approved','paid','rejected','cashier_review','cash_disbursed','recall_pending'].includes(s.v));
  else if(isCashier())visible=all.filter(s=>['cashier_review','cash_disbursed','paid','rejected'].includes(s.v));
  else if(isChiefAccountant())visible=all.filter(s=>['boss_approved','paid','rejected'].includes(s.v));
  return visible.map(s=>`<option value="${s.v}">${s.l}</option>`).join('');
}

// ============ FILE UTILS ============
function readFileAsDataURL(file){
  return new Promise((resolve)=>{
    const reader=new FileReader();
    reader.onload=()=>resolve({name:file.name,url:reader.result,size:file.size,type:file.type});
    reader.onerror=()=>resolve({name:file.name,url:'',size:file.size,type:file.type});
    reader.readAsDataURL(file);
  });
}
async function readAllFiles(fileInput){
  if(!fileInput||!fileInput.files||!fileInput.files.length)return [];
  const promises=[];
  for(const f of fileInput.files){
    if(f.size>3*1024*1024){toast('File "'+f.name+'" quá lớn (>3MB), bỏ qua. Nén file trước khi upload.');continue;}
    promises.push(readFileAsDataURL(f));
  }
  return Promise.all(promises);
}

// ============ FILE PREVIEW ============
let _fpFiles=[];let _fpIdx=0;
function openFilePreview(files,startIdx){
  if(!files||!files.length){toast('Không có file đính kèm');return;}
  _fpFiles=files.filter(f=>f.url&&!f.url.startsWith('blob:'));
  if(!_fpFiles.length){toast('File đính kèm đã hết hạn, cần upload lại');return;}
  _fpIdx=startIdx||0;
  if(_fpIdx>=_fpFiles.length)_fpIdx=0;
  document.getElementById('filePreviewOverlay').classList.add('show');
  fpRender();
  document.addEventListener('keydown',fpKeyHandler);
}
function closeFilePreview(){
  document.getElementById('filePreviewOverlay').classList.remove('show');
  document.getElementById('fpBody').innerHTML='';
  document.removeEventListener('keydown',fpKeyHandler);
}
function fpKeyHandler(ev){
  if(ev.key==='Escape')closeFilePreview();
  else if(ev.key==='ArrowLeft')fpNavigate(-1);
  else if(ev.key==='ArrowRight')fpNavigate(1);
}
function fpNavigate(dir){
  _fpIdx+=dir;
  if(_fpIdx<0)_fpIdx=_fpFiles.length-1;
  if(_fpIdx>=_fpFiles.length)_fpIdx=0;
  fpRender();
}
function fpRender(){
  const f=_fpFiles[_fpIdx];if(!f)return;
  document.getElementById('fpFileName').textContent=f.name||'File';
  document.getElementById('fpCounter').textContent=_fpFiles.length>1?(_fpIdx+1)+'/'+_fpFiles.length:'';
  document.getElementById('fpPrev').style.display=_fpFiles.length>1?'':'none';
  document.getElementById('fpNext').style.display=_fpFiles.length>1?'':'none';
  const body=document.getElementById('fpBody');
  const ext=(f.name||'').split('.').pop().toLowerCase();
  const isImg=ext.match(/^(jpg|jpeg|png|gif|bmp|webp|svg)$/)||(f.url&&f.url.startsWith('data:image'));
  const isPdf=ext==='pdf'||(f.url&&f.url.startsWith('data:application/pdf'));
  if(isImg){
    body.innerHTML='<img src="'+f.url+'" alt="'+f.name+'" onclick="this.style.maxWidth=this.style.maxWidth===\'none\'?\'95%\':\'none\';this.style.cursor=this.style.maxWidth===\'none\'?\'zoom-out\':\'zoom-in\'" style="cursor:zoom-in"/>';
  }else if(isPdf){
    body.innerHTML='<iframe src="'+f.url+'"></iframe>';
  }else{
    body.innerHTML='<div class="fp-unsupported"><div style="font-size:48px;margin-bottom:12px">📄</div><div style="font-weight:600;margin-bottom:4px">'+f.name+'</div><div>Không thể xem trước loại file này</div><button class="btn btn-p" style="margin-top:12px" onclick="fpDownload()">💾 Tải về để xem</button></div>';
  }
}
function fpPrint(){
  const f=_fpFiles[_fpIdx];if(!f)return;
  const ext=(f.name||'').split('.').pop().toLowerCase();
  const isImg=ext.match(/^(jpg|jpeg|png|gif|bmp|webp|svg)$/)||(f.url&&f.url.startsWith('data:image'));
  const w=window.open('','_blank','width=900,height=700');
  if(!w){toast('Không thể mở cửa sổ in. Cho phép popup.');return;}
  if(isImg){
    w.document.write('<html><head><title>In: '+f.name+'</title><style>body{margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f8fafc}img{max-width:100%;max-height:95vh}@media print{body{background:#fff}}</style></head><body><img src="'+f.url+'" onload="setTimeout(()=>{window.print();},300)"/></body></html>');
  }else{
    w.document.write('<html><head><title>In: '+f.name+'</title></head><body><iframe src="'+f.url+'" style="width:100%;height:100vh;border:none" onload="setTimeout(()=>{window.print();},500)"></iframe></body></html>');
  }
  w.document.close();
}
function fpDownload(){
  const f=_fpFiles[_fpIdx];if(!f)return;
  const a=document.createElement('a');a.href=f.url;a.download=f.name||'file';a.click();
}
function previewAttachments(id){
  const e=items.find(x=>x.id===id);
  if(!e||!e.attachments||!e.attachments.length){toast('Không có file đính kèm');return;}
  openFilePreview(e.attachments,0);
}

// ============ TRANSLATE ============
let transTimer=null;
async function gTranslate(text){
  if(!text||text.trim().length<2)return '';
  const url='https://translate.googleapis.com/translate_a/single?client=gtx&sl=vi&tl=zh-TW&dt=t&q='+encodeURIComponent(text);
  try{
    const r=await fetch(url);
    if(!r.ok)throw new Error('HTTP '+r.status);
    const d=await r.json();
    return d[0].map(s=>s[0]).join('');
  }catch(e){
    console.warn('Translate failed:',e.message);
    // Fallback: try with mode no-cors won't give response, so try alternative endpoint
    try{
      const r2=await fetch('https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=vi&tl=zh-TW&q='+encodeURIComponent(text));
      const d2=await r2.json();
      if(Array.isArray(d2)&&d2[0]&&typeof d2[0]==='string')return d2[0];
      if(d2.sentences)return d2.sentences.map(s=>s.trans).join('');
      return '';
    }catch(e2){console.warn('Translate fallback failed:',e2.message);return '';}
  }
}
function schedTrans(m){clearTimeout(transTimer);transTimer=setTimeout(async()=>{const srcId=m==='adv'?'advNote':m==='edit'?'eNote':'fNote_'+m;const tgtId=m==='adv'?'advNoteCn':m==='edit'?'eNoteCn':'fNoteCn_'+m;const n=document.getElementById(srcId)?.value;if(n&&n.trim().length>=2){const tgt=document.getElementById(tgtId);if(tgt)tgt.placeholder='Đang dịch...';const cn=await gTranslate(n);const el=document.getElementById(tgtId);if(el){el.value=cn;el.placeholder=cn?'(Google Translate)':'Dịch thất bại - nhập thủ công';}}},600);}

// ============ INIT ============
(function(){
  const yr=document.getElementById('selYear');
  for(let y=2024;y<=2030;y++)yr.innerHTML+=`<option value="${y}" ${y===2026?'selected':''}>${y}</option>`;
  yr.addEventListener('change',rebuildTabs);

  // Edit modal payer toggle
  document.getElementById('ePayer').addEventListener('change',function(){
    document.getElementById('eAdvRow').style.display=this.value==='NV tạm ứng'?'':'none';
    document.getElementById('eAdvAmtRow').style.display=this.value==='NV tạm ứng'?'':'none';
  });
  document.getElementById('eVat').addEventListener('change',function(){document.getElementById('eVatNumRow').style.display=this.value==='Có'?'':'none';});
})();

function rebuildTabs(){
  const year=getYear();document.getElementById('ovYear').textContent=year;
  const tabs=document.getElementById('mainTabs');
  tabs.querySelectorAll('.tab[data-tab^="m"]').forEach(t=>t.remove());
  tabs.querySelectorAll('.tab[data-tab="advance"]').forEach(t=>t.remove());
  tabs.querySelectorAll('.tab[data-tab="users"]').forEach(t=>t.remove());
  document.querySelectorAll('.pnl[id^="pnl-m"]').forEach(p=>p.remove());
  document.querySelectorAll('.pnl[id^="pnl-advance"]').forEach(p=>p.remove());
  document.querySelectorAll('.pnl[id^="pnl-users"]').forEach(p=>p.remove());
  // Hide/show overview tab for staff
  const ovTab=tabs.querySelector('.tab[data-tab="overview"]');
  if(ovTab)ovTab.style.display=isStaff()?'none':'';
  // Staff: determine current month key (e.g. '01','02'...'12')
  const _now=new Date();
  const _curMonthIdx=_now.getMonth(); // 0-based
  const _curYear=String(_now.getFullYear());
  const _selYear=getYear();
  // Disable year selector for staff
  if(isStaff()){document.getElementById('selYear').disabled=true;document.getElementById('selYear').style.cssText='opacity:.5;cursor:not-allowed;pointer-events:none';}
  else{document.getElementById('selYear').disabled=false;document.getElementById('selYear').style.cssText='';}
  MS.forEach((m,i)=>{
    const t=document.createElement('div');t.className='tab';t.dataset.tab='m'+m;
    t.textContent=`T${i+1}`;
    // Staff: only current month of current year is clickable
    if(isStaff()&&(_selYear!==_curYear||i!==_curMonthIdx)){
      t.classList.add('disabled');t.title='Chỉ được thao tác tháng hiện tại';
    }else{
      t.onclick=()=>switchMain('m'+m);
    }
    tabs.appendChild(t);
    const p=document.createElement('div');p.className='pnl';p.id='pnl-m'+m;
    p.innerHTML=buildMonth(m,year);document.getElementById('mainWrap').appendChild(p);
    setTimeout(()=>{
      const ps=document.getElementById('fPayer_'+m);
      if(ps)ps.addEventListener('change',function(){
        document.getElementById('fAdvRow_'+m).style.display=this.value==='NV tạm ứng'?'':'none';
        document.getElementById('fAdvAmtRow_'+m).style.display=this.value==='NV tạm ứng'?'':'none';
      });
      const vs=document.getElementById('fVat_'+m);
      if(vs)vs.addEventListener('change',function(){document.getElementById('fVatNumRow_'+m).style.display=this.value==='Có'?'':'none';});
      // Staff: auto-set and lock "Người lập phiếu" to their staffCode
      if(isStaff()&&currentUser.staffCode){
        const fs=document.getElementById('fStaff_'+m);
        if(fs&&fs.tagName==='SELECT'){fs.value=currentUser.staffCode;fs.disabled=true;fs.style.background='var(--g100)';}
      }
    },0);
  });
  const at=document.createElement('div');at.className='tab';at.dataset.tab='advance';
  at.textContent='Tạm ứng 預支';at.onclick=()=>switchMain('advance');tabs.appendChild(at);
  const ap=document.createElement('div');ap.className='pnl';ap.id='pnl-advance';
  ap.innerHTML=buildAdvances();document.getElementById('mainWrap').appendChild(ap);
  // User management tab (Boss only)
  if(canManageUsers()){
    const ut=document.createElement('div');ut.className='tab';ut.dataset.tab='users';
    ut.textContent='Quản lý TK 帳號管理';ut.onclick=()=>switchMain('users');tabs.appendChild(ut);
    const up=document.createElement('div');up.className='pnl';up.id='pnl-users';
    up.innerHTML=buildUserMgmt();document.getElementById('mainWrap').appendChild(up);
  }
  switchMain(isStaff()?'m'+MS[new Date().getMonth()]:'overview');
}

function getYear(){return document.getElementById('selYear').value}
function parseAmt(s){return parseInt(String(s).replace(/[^\d]/g,''),10)||0}
function fmtV(n){return n.toLocaleString('vi-VN')+' đ'}
function fmtDate(s,fmt){if(!s)return '--';if(typeof s!=='string')s=String(s);if(s.length<8)return '--';const d=new Date(s.slice(0,10)+'T00:00:00');if(isNaN(d.getTime()))return s.slice(0,10);return d.toLocaleDateString('vi-VN',fmt||{day:'2-digit',month:'2-digit'});}
function fmtIn(el){let r=el.value.replace(/[^\d]/g,'');if(r)el.value=parseInt(r,10).toLocaleString('vi-VN')}
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500)}
function closeM(id){document.getElementById(id).classList.remove('show')}

function catOpts(){return CATS.map(c=>`<option value="${c.vn}">${c.vn} ${c.cn}</option>`).join('')}
function staffOpts(){return STAFF.map(s=>`<option value="${s.code}">${s.name} ${s.cn} (${s.code})</option>`).join('')}
function payerOpts(){return PAYERS.map(p=>`<option value="${p}">${p}</option>`).join('')}

function staffDisplayName(code){const s=STAFF.find(x=>x.code===code);return s?(s.name+' '+s.cn+' ('+s.code+')'):(code||'');}
function genCode(m){const ym=getYear()+'-'+m;const cnt=items.filter(e=>e.date.startsWith(ym)).length+1;return 'LN'+getYear().slice(2)+m+String(cnt).padStart(2,'0');}

function resetForm(m,fileInput){
  document.getElementById('fDate_'+m).value='';
  document.getElementById('fType_'+m).selectedIndex=0;
  document.getElementById('fAmt_'+m).value='';
  document.getElementById('fPay_'+m).selectedIndex=0;
  // Staff: fStaff is hidden input (keep value), non-staff: fStaff is select
  const fs=document.getElementById('fStaff_'+m);
  if(fs&&fs.tagName==='SELECT')fs.selectedIndex=0;
  document.getElementById('fPayer_'+m).selectedIndex=0;
  document.getElementById('fAdvRow_'+m).style.display='none';
  document.getElementById('fAdvAmtRow_'+m).style.display='none';
  const advS=document.getElementById('fAdvStaff_'+m);if(advS)advS.selectedIndex=0;
  const advA=document.getElementById('fAdvAmt_'+m);if(advA)advA.value='';
  document.getElementById('fMethod_'+m).selectedIndex=0;
  document.getElementById('fVat_'+m).selectedIndex=0;
  document.getElementById('fVatNumRow_'+m).style.display='none';
  const vatN=document.getElementById('fVatNum_'+m);if(vatN)vatN.value='';
  document.getElementById('fNote_'+m).value='';
  document.getElementById('fNoteCn_'+m).value='';
  const rmk=document.getElementById('fRemark_'+m);if(rmk)rmk.value='';
  if(fileInput)fileInput.value='';
  else{const fi=document.getElementById('fFile_'+m);if(fi)fi.value='';}
  toast('Form đã reset — sẵn sàng nhập mới');
}

// ============ FORM CARD (collapsible) ============
function buildFormCard(m,mi){
  const staffField=isStaff()&&currentUser.staffCode?'<input type="text" id="fStaffDisplay_'+m+'" value="'+staffDisplayName(currentUser.staffCode)+'" readonly style="background:var(--g100);cursor:not-allowed;font-weight:600"/><input type="hidden" id="fStaff_'+m+'" value="'+currentUser.staffCode+'"/>':'<select id="fStaff_'+m+'"><option value="">-- Chọn --</option>'+staffOpts()+'</select>';
  return '<div class="cd" id="formCard_'+m+'"><div class="cd-h" style="cursor:pointer" onclick="toggleFormCard(\''+m+'\')"><h2>Thêm chi phí T'+mi+'<span class="cn"> 新增</span></h2><button class="btn btn-sm btn-o" id="formToggleBtn_'+m+'" type="button" style="pointer-events:none">\u25BC Ẩn</button></div><div class="cd-b" id="formBody_'+m+'">'+
    '<div class="frow">'+
      '<div class="fg"><label>Ngày chi<span class="cn"> 日期</span></label><input type="date" id="fDate_'+m+'"/></div>'+
      '<div class="fg"><label>Loại chi phí<span class="cn"> 類型</span></label><select id="fType_'+m+'">'+catOpts()+'</select></div>'+
      '<div class="fg"><label>Số tiền<span class="cn"> 金額</span></label><input type="text" id="fAmt_'+m+'" placeholder="1,500,000" oninput="fmtIn(this)"/></div>'+
      '<div class="fg"><label>TT thanh toán</label><select id="fPay_'+m+'"><option value="Chưa chi">Chưa chi</option><option value="Đã chi">Đã chi</option><option value="Đã cọc">Đã cọc</option></select></div>'+
    '</div>'+
    '<div class="frow">'+
      '<div class="fg"><label>Người lập phiếu<span class="cn"> 申請人</span></label>'+staffField+'</div>'+
      '<div class="fg"><label>Người chi trả<span class="cn"> 支付者</span></label><select id="fPayer_'+m+'">'+payerOpts()+'</select></div>'+
      '<div class="fg" id="fAdvRow_'+m+'" style="display:none"><label>NV tạm ứng<span class="cn"> 員工</span></label><select id="fAdvStaff_'+m+'"><option value="">-- Chọn --</option>'+staffOpts()+'</select></div>'+
      '<div class="fg" id="fAdvAmtRow_'+m+'" style="display:none"><label>Số tiền tạm ứng</label><input type="text" id="fAdvAmt_'+m+'" placeholder="Số tiền" oninput="fmtIn(this)"/></div>'+
    '</div>'+
    '<div class="frow">'+
      '<div class="fg"><label>Phương thức</label><select id="fMethod_'+m+'"><option value="Tiền mặt">Tiền mặt</option><option value="Chuyển khoản">Chuyển khoản</option></select></div>'+
      '<div class="fg"><label>Hóa đơn VAT<span class="cn"> 發票</span></label><select id="fVat_'+m+'"><option value="Không">Không</option><option value="Có">Có</option></select></div>'+
      '<div class="fg" id="fVatNumRow_'+m+'" style="display:none"><label>Số HĐ VAT</label><input type="text" id="fVatNum_'+m+'"/></div>'+
      '<div class="fg"><label>Đính kèm<span class="cn"> 附件</span></label><input type="file" id="fFile_'+m+'" multiple accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" style="font-size:11px"/></div>'+
    '</div>'+
    '<div class="frow" style="grid-template-columns:1fr 1fr">'+
      '<div class="fg"><label>Mô tả chi tiết<span class="cn"> 說明</span></label><textarea id="fNote_'+m+'" placeholder="Nhập tiếng Việt..." oninput="schedTrans(\''+m+'\')"></textarea></div>'+
      '<div class="fg"><label>Dịch tự động<span class="cn"> 中文翻譯</span></label><textarea id="fNoteCn_'+m+'" placeholder="(Google Translate)" style="background:var(--g50)"></textarea></div>'+
    '</div>'+
    '<div class="frow" style="grid-template-columns:1fr">'+
      '<div class="fg"><label>Ghi chú<span class="cn"> 備註</span></label><input type="text" id="fRemark_'+m+'" placeholder="Ghi chú thêm (nếu có)..." style="font-size:12px"/></div>'+
    '</div>'+
    '<button class="btn btn-p" style="margin-top:4px" onclick="addItem(\''+m+'\')">+ Thêm 新增</button>'+
  '</div></div>';
}

// ============ BUILD MONTH ============
function buildMonth(m,year){
  const mi=parseInt(m);
  const showBudgetBar=!isStaff()&&!isCashier()&&!isChiefAccountant();
  const showForm=!isCashier()&&!isChiefAccountant()&&!isBoss();
  const showPendingTable=isManager()||isBoss()||isCashier()||isChiefAccountant();
  const isTQorKTT=isCashier()||isChiefAccountant();
  return `
  ${showBudgetBar?`<div class="kgrid" style="grid-template-columns:repeat(3,1fr)">
    <div class="kpi" style="border-color:var(--p)"><div class="kl">Ngân sách tháng 月預算</div><div class="kv" style="color:var(--p)" id="kBudget_${m}">--</div><div class="bgt-ed" style="margin-top:4px"><input type="text" id="budIn_${m}" placeholder="NS" oninput="fmtIn(this)" style="width:100px;padding:4px 6px;border:1px solid var(--g200);border-radius:6px;font-size:10px;text-align:right"/><button class="btn btn-sm btn-p" onclick="setMBgt('${m}')" style="padding:4px 8px;font-size:9px">OK</button></div></div>
    <div class="kpi" style="border-color:var(--d)"><div class="kl">Tổng chi phí 總支出</div><div class="kv" style="color:var(--d)" id="kSpent_${m}">0 đ</div><div class="ks" id="kSpentCnt_${m}">0 khoản</div></div>
    <div class="kpi" style="border-color:var(--s)"><div class="kl">Còn lại 剩餘</div><div class="kv" style="color:var(--s)" id="kRemain_${m}">--</div><div class="ks"><div class="bbar" style="height:8px;margin-top:4px"><div class="bfill ok" id="bf_${m}" style="font-size:0">0%</div></div></div></div>
  </div>`:''}

  ${showForm?buildFormCard(m,mi):''}

  <!-- Manager: Tab bar for queue sections -->
  ${isManager()&&!isBoss()?`<div class="cd" style="border-left-color:var(--p);overflow:visible">
  <div style="display:flex;gap:0;border-bottom:2px solid var(--g200);background:var(--g50);border-radius:12px 12px 0 0;overflow-x:auto">
    <button id="qtab_draft_${m}" onclick="switchQTab('${m}','draft')" style="flex:1;padding:10px 6px;border:none;background:transparent;cursor:pointer;font-size:10px;font-weight:700;color:var(--g500);border-bottom:3px solid transparent;transition:all .2s;white-space:nowrap">📝 Nháp 草稿 <span id="mgrDraftCnt_${m}" style="font-size:9px;font-weight:800;background:rgba(100,116,139,.15);color:#64748b;padding:1px 5px;border-radius:8px">0</span></button>
    <button id="qtab_pend_${m}" onclick="switchQTab('${m}','pend')" style="flex:1;padding:10px 6px;border:none;background:rgba(99,102,241,.15);cursor:pointer;font-size:10px;font-weight:700;color:var(--p);border-bottom:3px solid var(--p);transition:all .2s;white-space:nowrap">⏳ Chờ xử lý 待處理 <span id="pendCnt_${m}" style="font-size:9px;font-weight:800;background:var(--dl);color:var(--d);padding:1px 5px;border-radius:8px">0</span></button>
    <button id="qtab_send_${m}" onclick="switchQTab('${m}','send')" style="flex:1;padding:10px 6px;border:none;background:transparent;cursor:pointer;font-size:10px;font-weight:700;color:var(--g500);border-bottom:3px solid transparent;transition:all .2s;white-space:nowrap">📤 Gửi CT 提交公司 <span id="qSendCnt_${m}" style="font-size:9px;font-weight:800;background:var(--dl);color:var(--d);padding:1px 5px;border-radius:8px">0</span></button>
    <button id="qtab_boss_${m}" onclick="switchQTab('${m}','boss')" style="flex:1;padding:10px 6px;border:none;background:transparent;cursor:pointer;font-size:10px;font-weight:700;color:var(--g500);border-bottom:3px solid transparent;transition:all .2s;white-space:nowrap">👔 Chờ Boss 待老闆批 <span id="qBossCnt_${m}" style="font-size:9px;font-weight:800;background:var(--dl);color:var(--d);padding:1px 5px;border-radius:8px">0</span></button>
    <button id="qtab_pay_${m}" onclick="switchQTab('${m}','pay')" style="flex:1;padding:10px 6px;border:none;background:transparent;cursor:pointer;font-size:10px;font-weight:700;color:var(--g500);border-bottom:3px solid transparent;transition:all .2s;white-space:nowrap">💳 Chờ chi trả 待付款 <span id="qPayCnt_${m}" style="font-size:9px;font-weight:800;background:var(--dl);color:var(--d);padding:1px 5px;border-radius:8px">0</span></button>
    <button id="qtab_cash_${m}" onclick="switchQTab('${m}','cash')" style="flex:1;padding:10px 6px;border:none;background:transparent;cursor:pointer;font-size:10px;font-weight:700;color:var(--g500);border-bottom:3px solid transparent;transition:all .2s;white-space:nowrap">💰 Đợt TM 現金批次 <span id="mgrCashBatchCnt_${m}" style="font-size:9px;font-weight:800;background:var(--dl);color:var(--d);padding:1px 5px;border-radius:8px">0</span></button>
  </div>

  <!-- Tab: Nháp (Manager) -->
  <div id="qpanel_draft_${m}" style="display:none">
    <div class="batch-hdr" data-m="${m}" data-q="mgrDraft"><span class="sel-count"></span>${buildBatchBtns(m)}</div>
    <div class="batch-title" data-m="${m}" data-q="mgrDraft" style="padding:8px 12px;display:flex;justify-content:space-between;align-items:center;background:linear-gradient(135deg,rgba(100,116,139,.05),transparent)">
      <h3 style="margin:0;font-size:12px;color:#64748b">Nháp 草稿 <span style="font-size:10px;font-weight:400">(chi phí do bạn tạo, chưa gửi duyệt)</span></h3>
      <input type="text" id="qSearch_mgrDraft_${m}" oninput="renderM('${m}')" placeholder="Tìm mã đơn..." style="padding:4px 8px;border:1px solid var(--g300);border-radius:6px;font-size:10px;width:120px"/>
    </div>
    <div style="overflow-x:auto;max-height:50vh;overflow-y:auto;position:relative">
      <table><thead><tr>
        <th style="width:28px"><input type="checkbox" onchange="toggleAllMgrDraft('${m}',this.checked)"/></th>
        <th>STT 序號</th><th>Mã số 編號</th><th>Ngày 日期</th><th>Loại 類型</th><th>Mô tả 說明</th>
        <th style="text-align:right">Số tiền 金額</th><th>PT 方式</th><th>Người lập 經辦人</th><th style="width:30px;text-align:center" title="Đính kèm 附件">📎</th><th>Trạng thái 狀態</th><th style="width:100px"></th>
      </tr></thead><tbody id="mgrDraftTb_${m}"></tbody></table>
    </div>
    <div id="mgrDraftTbEmpty_${m}" class="empty">Không có khoản nháp 沒有草稿</div>
    <div style="padding:8px 16px;border-top:2px solid var(--g200);display:flex;justify-content:space-between;background:var(--g50);font-size:11px">
      <span>Tổng: <b style="color:#64748b" id="mgrDraftTotal_${m}">0 đ</b></span><span id="mgrDraftFc_${m}">0 khoản</span>
    </div>
  </div>

  <!-- Tab: Chờ xử lý -->
  <div id="qpanel_pend_${m}">
    <div class="batch-hdr" data-m="${m}" data-q="pend"><span class="sel-count"></span>${buildBatchBtns(m)}</div>
    <div class="batch-title" data-m="${m}" data-q="pend" style="padding:8px 12px;display:flex;justify-content:space-between;align-items:center;background:linear-gradient(135deg,rgba(217,119,6,.05),transparent)">
      <h3 style="margin:0;font-size:12px;color:#b45309">Chờ xử lý 待處理</h3>
      <input type="text" id="qSearch_pend_${m}" oninput="renderM('${m}')" placeholder="Tìm mã đơn..." style="padding:4px 8px;border:1px solid var(--g300);border-radius:6px;font-size:10px;width:120px"/>
    </div>
    <div style="overflow-x:auto;max-height:50vh;overflow-y:auto;position:relative">
      <table><thead><tr>
        <th style="width:28px"><input type="checkbox" onchange="toggleAllPend('${m}',this.checked)"/></th>
        <th>STT 序號</th><th>Mã số 編號</th><th>Ngày 日期</th><th>Loại 類型</th><th>Mô tả 說明</th>
        <th style="text-align:right">Số tiền 金額</th><th>PT 方式</th><th>Người lập 經辦人</th><th style="width:30px;text-align:center" title="Đính kèm 附件">📎</th><th>Trạng thái 狀態</th><th style="width:56px"></th>
      </tr></thead><tbody id="pendTb_${m}"></tbody></table>
    </div>
    <div id="pendTbEmpty_${m}" class="empty" style="display:none">Không có khoản chờ xử lý</div>
    <div style="padding:8px 16px;border-top:2px solid var(--g200);display:flex;justify-content:space-between;background:var(--g50);font-size:11px">
      <span>Tổng: <b style="color:#b45309" id="pendTotal_${m}">0 đ</b></span><span id="pendFc_${m}">0 khoản</span>
    </div>
  </div>

  <!-- Tab: Gửi về CT -->
  <div id="qpanel_send_${m}" style="display:none">
    <div class="batch-hdr" data-m="${m}" data-q="send"><span class="sel-count"></span>${buildBatchBtns(m)}</div>
    <div class="batch-title" data-m="${m}" data-q="send" style="padding:8px 12px;display:flex;justify-content:space-between;align-items:center;background:linear-gradient(135deg,rgba(124,58,237,.05),transparent)">
      <h3 style="margin:0;font-size:12px;color:#7c3aed">Gửi về công ty 待提交公司</h3>
      <input type="text" id="qSearch_send_${m}" oninput="renderM('${m}')" placeholder="Tìm mã đơn..." style="padding:4px 8px;border:1px solid var(--g300);border-radius:6px;font-size:10px;width:120px"/>
    </div>
    <div style="overflow-x:auto;max-height:50vh;overflow-y:auto;position:relative">
      <table><thead><tr>
        <th style="width:28px"><input type="checkbox" onchange="toggleAllQSend('${m}',this.checked)"/></th>
        <th>STT 序號</th><th>Mã số 編號</th><th>Ngày 日期</th><th>Loại 類型</th><th>Mô tả 說明</th>
        <th style="text-align:right">Số tiền 金額</th><th>PT 方式</th><th>Người lập 經辦人</th><th style="width:30px;text-align:center" title="Đính kèm 附件">📎</th><th>Trạng thái 狀態</th><th style="width:56px"></th>
      </tr></thead><tbody id="qSendTb_${m}"></tbody></table>
    </div>
    <div id="qSendTbEmpty_${m}" class="empty" style="display:none">Không có khoản chờ gửi</div>
    <div style="padding:8px 16px;border-top:2px solid var(--g200);display:flex;justify-content:space-between;background:var(--g50);font-size:11px">
      <span>Tổng: <b style="color:#7c3aed" id="qSendTotal_${m}">0 đ</b></span><span id="qSendFc_${m}">0 khoản</span>
    </div>
  </div>

  <!-- Tab: Chờ Boss duyệt -->
  <div id="qpanel_boss_${m}" style="display:none">
    <div class="batch-hdr" data-m="${m}" data-q="boss"><span class="sel-count"></span>${buildBatchBtns(m)}</div>
    <div class="batch-title" data-m="${m}" data-q="boss" style="padding:8px 12px;display:flex;justify-content:space-between;align-items:center;background:linear-gradient(135deg,rgba(217,119,6,.05),transparent)">
      <h3 style="margin:0;font-size:12px;color:#b45309">Chờ Boss duyệt 待老闆審批</h3>
      <input type="text" id="qSearch_boss_${m}" oninput="renderM('${m}')" placeholder="Tìm mã đơn..." style="padding:4px 8px;border:1px solid var(--g300);border-radius:6px;font-size:10px;width:120px"/>
    </div>
    <div style="overflow-x:auto;max-height:50vh;overflow-y:auto;position:relative">
      <table><thead><tr>
        <th style="width:28px"><input type="checkbox" onchange="toggleAllQBoss('${m}',this.checked)"/></th>
        <th>STT 序號</th><th>Mã số 編號</th><th>Ngày 日期</th><th>Loại 類型</th><th>Mô tả 說明</th>
        <th style="text-align:right">Số tiền 金額</th><th>PT 方式</th><th>Người lập 經辦人</th><th style="width:30px;text-align:center" title="Đính kèm 附件">📎</th><th>Trạng thái 狀態</th><th style="width:56px"></th>
      </tr></thead><tbody id="qBossTb_${m}"></tbody></table>
    </div>
    <div id="qBossTbEmpty_${m}" class="empty" style="display:none">Không có khoản chờ Boss duyệt</div>
    <div style="padding:8px 16px;border-top:2px solid var(--g200);display:flex;justify-content:space-between;background:var(--g50);font-size:11px">
      <span>Tổng: <b style="color:#b45309" id="qBossTotal_${m}">0 đ</b></span><span id="qBossFc_${m}">0 khoản</span>
    </div>
  </div>

  <!-- Tab: Chờ chi trả -->
  <div id="qpanel_pay_${m}" style="display:none">
    <div class="batch-hdr" data-m="${m}" data-q="pay"><span class="sel-count"></span>${buildBatchBtns(m)}</div>
    <div class="batch-title" data-m="${m}" data-q="pay" style="padding:8px 12px;display:flex;justify-content:space-between;align-items:center;background:linear-gradient(135deg,rgba(13,148,136,.05),transparent)">
      <h3 style="margin:0;font-size:12px;color:#0d9488">Chờ chi trả 待付款</h3>
      <input type="text" id="qSearch_pay_${m}" oninput="renderM('${m}')" placeholder="Tìm mã đơn..." style="padding:4px 8px;border:1px solid var(--g300);border-radius:6px;font-size:10px;width:120px"/>
    </div>
    <div style="overflow-x:auto;max-height:50vh;overflow-y:auto;position:relative">
      <table><thead><tr>
        <th style="width:28px"><input type="checkbox" onchange="toggleAllQPay('${m}',this.checked)"/></th>
        <th>STT 序號</th><th>Mã số 編號</th><th>Ngày 日期</th><th>Loại 類型</th><th>Mô tả 說明</th>
        <th style="text-align:right">Số tiền 金額</th><th>PT 方式</th><th>Người lập 經辦人</th><th style="width:30px;text-align:center" title="Đính kèm 附件">📎</th><th>Trạng thái 狀態</th><th style="width:56px"></th>
      </tr></thead><tbody id="qPayTb_${m}"></tbody></table>
    </div>
    <div id="qPayTbEmpty_${m}" class="empty" style="display:none">Không có khoản chờ chi trả</div>
    <div style="padding:8px 16px;border-top:2px solid var(--g200);display:flex;justify-content:space-between;background:var(--g50);font-size:11px">
      <span>Tổng: <b style="color:#0d9488" id="qPayTotal_${m}">0 đ</b></span><span id="qPayFc_${m}">0 khoản</span>
    </div>
  </div>

  <!-- Tab: Đợt chi TM -->
  <div id="qpanel_cash_${m}" style="display:none">
    <div style="padding:8px 12px;background:linear-gradient(135deg,rgba(124,58,237,.05),transparent)">
      <h3 style="margin:0;font-size:12px;color:#7c3aed">Đợt chi tiền mặt 現金批次</h3>
    </div>
    <div id="mgrCashBatchCard_${m}">
      <div style="overflow-x:auto;max-height:60vh;overflow-y:auto;position:relative">
        <div id="mgrCashBatchSummary_${m}" style="padding:10px"></div>
      </div>
    </div>
  </div>
  </div>`:''}

  <!-- Accountant/Staff: Tab bar workflow (5 tabs) -->
  ${(isAccountant()||isStaff())?`<div class="cd" style="border-left-color:var(--p);overflow:visible">
  <div style="display:flex;gap:0;border-bottom:2px solid var(--g200);background:var(--g50);border-radius:12px 12px 0 0;overflow-x:auto">
    <button id="aqtab_draft_${m}" onclick="switchAQTab('${m}','draft')" style="flex:1;padding:10px 4px;border:none;background:rgba(100,116,139,.08);cursor:pointer;font-size:10px;font-weight:700;color:#64748b;border-bottom:3px solid #64748b;transition:all .2s;white-space:nowrap">📝 Nháp 草稿 <span id="acctDraftCnt_${m}" style="font-size:9px;font-weight:800;background:var(--g200);color:var(--g600);padding:1px 5px;border-radius:8px">0</span></button>
    <button id="aqtab_mgr_${m}" onclick="switchAQTab('${m}','mgr')" style="flex:1;padding:10px 4px;border:none;background:transparent;cursor:pointer;font-size:10px;font-weight:700;color:var(--g500);border-bottom:3px solid transparent;transition:all .2s;white-space:nowrap">⏳ Chờ QL 待審 <span id="acctMgrCnt_${m}" style="font-size:9px;font-weight:800;background:var(--dl);color:var(--d);padding:1px 5px;border-radius:8px">0</span></button>
    <button id="aqtab_boss_${m}" onclick="switchAQTab('${m}','boss')" style="flex:1;padding:10px 4px;border:none;background:transparent;cursor:pointer;font-size:10px;font-weight:700;color:var(--g500);border-bottom:3px solid transparent;transition:all .2s;white-space:nowrap">👔 Chờ Boss 待批 <span id="acctBossCnt_${m}" style="font-size:9px;font-weight:800;background:var(--dl);color:var(--d);padding:1px 5px;border-radius:8px">0</span></button>
    <button id="aqtab_ck_${m}" onclick="switchAQTab('${m}','ck')" style="flex:1;padding:10px 4px;border:none;background:transparent;cursor:pointer;font-size:10px;font-weight:700;color:var(--g500);border-bottom:3px solid transparent;transition:all .2s;white-space:nowrap">💳 Chờ CK 待轉帳 <span id="acctCkCnt_${m}" style="font-size:9px;font-weight:800;background:var(--dl);color:var(--d);padding:1px 5px;border-radius:8px">0</span></button>
    <button id="aqtab_cash_${m}" onclick="switchAQTab('${m}','cash')" style="flex:1;padding:10px 4px;border:none;background:transparent;cursor:pointer;font-size:10px;font-weight:700;color:var(--g500);border-bottom:3px solid transparent;transition:all .2s;white-space:nowrap">💰 Chờ TM 待現金 <span id="acctCashCnt_${m}" style="font-size:9px;font-weight:800;background:var(--dl);color:var(--d);padding:1px 5px;border-radius:8px">0</span></button>
  </div>

  <!-- Tab: Nháp (draft) -->
  <div id="aqpanel_draft_${m}">
    <div class="batch-hdr" data-m="${m}" data-q="acctDraft"><span class="sel-count"></span>${buildBatchBtns(m)}</div>
    <div style="overflow-x:auto;max-height:50vh;overflow-y:auto;position:relative">
      <table><thead><tr>
        <th style="width:28px"><input type="checkbox" onchange="toggleAllAcctQ('${m}','acctDraft',this.checked)"/></th>
        <th>STT 序號</th><th>Mã số 編號</th><th>Ngày 日期</th><th>Loại 類型</th><th>Mô tả 說明</th>
        <th style="text-align:right">Số tiền 金額</th><th>PT 方式</th><th>Người lập 經辦人</th><th style="width:30px;text-align:center" title="Đính kèm 附件">📎</th><th>Trạng thái 狀態</th><th style="width:56px"></th>
      </tr></thead><tbody id="acctDraftTb_${m}"></tbody></table>
    </div>
    <div id="acctDraftEmpty_${m}" class="empty" style="display:none">Không có khoản nháp</div>
    <div style="padding:8px 16px;border-top:2px solid var(--g200);display:flex;justify-content:space-between;background:var(--g50);font-size:11px">
      <span>Tổng: <b style="color:#64748b" id="acctDraftTotal_${m}">0 đ</b></span><span id="acctDraftFc_${m}">0 khoản</span>
    </div>
  </div>

  <!-- Tab: Chờ QL duyệt (pending + approved) -->
  <div id="aqpanel_mgr_${m}" style="display:none">
    <div style="overflow-x:auto;max-height:50vh;overflow-y:auto;position:relative">
      <table><thead><tr>
        <th>STT 序號</th><th>Mã số 編號</th><th>Ngày 日期</th><th>Loại 類型</th><th>Mô tả 說明</th>
        <th style="text-align:right">Số tiền 金額</th><th>PT 方式</th><th>Người lập 經辦人</th><th style="width:30px;text-align:center" title="Đính kèm 附件">📎</th><th>Trạng thái 狀態</th><th style="width:56px"></th>
      </tr></thead><tbody id="acctMgrTb_${m}"></tbody></table>
    </div>
    <div id="acctMgrEmpty_${m}" class="empty" style="display:none">Không có khoản chờ QL duyệt</div>
    <div style="padding:8px 16px;border-top:2px solid var(--g200);display:flex;justify-content:space-between;background:var(--g50);font-size:11px">
      <span>Tổng: <b style="color:#b45309" id="acctMgrTotal_${m}">0 đ</b></span><span id="acctMgrFc_${m}">0 khoản</span>
    </div>
  </div>

  <!-- Tab: Chờ Boss duyệt -->
  <div id="aqpanel_boss_${m}" style="display:none">
    <div style="overflow-x:auto;max-height:50vh;overflow-y:auto;position:relative">
      <table><thead><tr>
        <th>STT 序號</th><th>Mã số 編號</th><th>Ngày 日期</th><th>Loại 類型</th><th>Mô tả 說明</th>
        <th style="text-align:right">Số tiền 金額</th><th>PT 方式</th><th>Người lập 經辦人</th><th style="width:30px;text-align:center" title="Đính kèm 附件">📎</th><th>Trạng thái 狀態</th><th style="width:56px"></th>
      </tr></thead><tbody id="acctBossTb_${m}"></tbody></table>
    </div>
    <div id="acctBossEmpty_${m}" class="empty" style="display:none">Không có khoản chờ Boss duyệt</div>
    <div style="padding:8px 16px;border-top:2px solid var(--g200);display:flex;justify-content:space-between;background:var(--g50);font-size:11px">
      <span>Tổng: <b style="color:#7c3aed" id="acctBossTotal_${m}">0 đ</b></span><span id="acctBossFc_${m}">0 khoản</span>
    </div>
  </div>

  <!-- Tab: Chờ KT chuyển khoản -->
  <div id="aqpanel_ck_${m}" style="display:none">
    <div style="overflow-x:auto;max-height:50vh;overflow-y:auto;position:relative">
      <table><thead><tr>
        <th>STT 序號</th><th>Mã số 編號</th><th>Ngày 日期</th><th>Loại 類型</th><th>Mô tả 說明</th>
        <th style="text-align:right">Số tiền 金額</th><th>PT 方式</th><th>Người lập 經辦人</th><th style="width:30px;text-align:center" title="Đính kèm 附件">📎</th><th>Trạng thái 狀態</th><th style="width:56px"></th>
      </tr></thead><tbody id="acctCkTb_${m}"></tbody></table>
    </div>
    <div id="acctCkEmpty_${m}" class="empty" style="display:none">Không có khoản chờ chuyển khoản</div>
    <div style="padding:8px 16px;border-top:2px solid var(--g200);display:flex;justify-content:space-between;background:var(--g50);font-size:11px">
      <span>Tổng: <b style="color:#0d9488" id="acctCkTotal_${m}">0 đ</b></span><span id="acctCkFc_${m}">0 khoản</span>
    </div>
  </div>

  <!-- Tab: Chờ chi tiền mặt -->
  <div id="aqpanel_cash_${m}" style="display:none">
    <div style="overflow-x:auto;max-height:50vh;overflow-y:auto;position:relative">
      <table><thead><tr>
        <th>STT 序號</th><th>Mã số 編號</th><th>Ngày 日期</th><th>Loại 類型</th><th>Mô tả 說明</th>
        <th style="text-align:right">Số tiền 金額</th><th>PT 方式</th><th>Người lập 經辦人</th><th style="width:30px;text-align:center" title="Đính kèm 附件">📎</th><th>Trạng thái 狀態</th><th style="width:56px"></th>
      </tr></thead><tbody id="acctCashTb_${m}"></tbody></table>
    </div>
    <div id="acctCashEmpty_${m}" class="empty" style="display:none">Không có khoản chờ chi tiền mặt</div>
    <div style="padding:8px 16px;border-top:2px solid var(--g200);display:flex;justify-content:space-between;background:var(--g50);font-size:11px">
      <span>Tổng: <b style="color:#ea580c" id="acctCashTotal_${m}">0 đ</b></span><span id="acctCashFc_${m}">0 khoản</span>
    </div>
  </div>
  </div>`:''}

  <!-- Boss/TQ/KTT: pending table -->
  ${(isBoss()||isTQorKTT)?`<div class="cd" style="border-left-color:var(--w)">
  <div class="batch-hdr" data-m="${m}"><span class="sel-count"></span>${buildBatchBtns(m)}</div>
  <div class="cd-h batch-title" data-m="${m}" style="background:linear-gradient(135deg,rgba(217,119,6,.05),transparent)"><h2 style="color:#b45309">${isTQorKTT?'Chờ thanh toán 待付款':isBoss()?'Chờ duyệt 待審批':'Chờ xử lý 待處理'} <span id="pendCnt_${m}" style="font-size:11px;font-weight:800;color:var(--d);background:var(--dl);padding:2px 8px;border-radius:10px"></span></h2><input type="text" id="qSearch_pend_${m}" oninput="renderM('${m}')" placeholder="Tìm mã đơn..." style="padding:4px 8px;border:1px solid var(--g300);border-radius:6px;font-size:10px;width:120px"/></div>
  <div style="overflow-x:auto;max-height:50vh;overflow-y:auto;position:relative">
    <table><thead><tr>
      <th style="width:28px"><input type="checkbox" onchange="toggleAllPend('${m}',this.checked)"/></th>
      <th>STT 序號</th><th>Mã số 編號</th><th>Ngày 日期</th><th>Loại 類型</th><th>Mô tả 說明</th>
      <th style="text-align:right">Số tiền 金額</th><th>PT 方式</th><th>Người lập 經辦人</th><th style="width:30px;text-align:center" title="Đính kèm 附件">📎</th><th>Trạng thái 狀態</th><th style="width:56px"></th>
    </tr></thead><tbody id="pendTb_${m}"></tbody></table>
  </div>
  <div id="pendEmpty_${m}" class="empty" style="display:none">${isTQorKTT?'Không có khoản chờ thanh toán':'Không có khoản chờ xử lý'}</div>
  <div style="padding:8px 16px;border-top:2px solid var(--g200);display:flex;justify-content:space-between;background:var(--g50);font-size:11px">
    <span>Tổng: <b style="color:var(--w)" id="pendTotal_${m}">0 đ</b></span><span id="pendFc_${m}">0 khoản</span>
  </div></div>`:''}

  ${isCashier()?`<!-- Cash Batch Summary -->
  <div class="cd" style="border-left-color:#7c3aed"><div class="cd-h" style="background:linear-gradient(135deg,rgba(124,58,237,.04),transparent)"><h2 style="color:#7c3aed">Tổng hợp đợt chi tiền mặt 現金批次 <span id="cashBatchCnt_${m}" style="font-size:11px;font-weight:800;color:var(--d);background:var(--dl);padding:2px 8px;border-radius:10px"></span></h2></div>
  <div style="overflow-x:auto;max-height:50vh;overflow-y:auto;position:relative">
    <div id="cashBatchSummary_${m}" style="padding:10px"></div>
  </div>
  <div id="cashBatchEmpty_${m}" class="empty" style="display:none">Chưa có đợt thanh toán</div></div>`:''}

  ${isTQorKTT?`<!-- Rejected/Returned Table -->
  <div class="cd" style="border-left-color:var(--d)"><div class="cd-h" style="background:linear-gradient(135deg,rgba(220,38,38,.04),transparent)"><h2 style="color:var(--d)">Hạng mục bị trả lại 退回項目 <span id="rejCnt_${m}" style="font-size:11px;font-weight:800;color:var(--d);background:var(--dl);padding:2px 8px;border-radius:10px"></span></h2></div>
  <div style="overflow-x:auto;max-height:40vh;overflow-y:auto;position:relative">
    <table><thead><tr>
      <th>STT 序號</th><th>Mã số 編號</th><th>Ngày 日期</th><th>Loại 類型</th><th>Mô tả 說明</th>
      <th style="text-align:right">Số tiền 金額</th><th>PT 方式</th><th>Người lập 經辦人</th><th style="width:30px;text-align:center" title="Đính kèm 附件">📎</th><th>Lý do 原因</th>
    </tr></thead><tbody id="rejTb_${m}"></tbody></table>
  </div>
  <div id="rejEmpty_${m}" class="empty" style="display:none">Không có hạng mục bị trả lại</div></div>`:''}

  <!-- Table (main) -->
  <div class="cd">
  <div class="batch-hdr" data-m="${m}" id="batch_${m}"><span class="sel-count"></span>${buildBatchBtns(m,'main')}</div>
  <div class="cd-h batch-title" data-m="${m}" id="batchTitle_${m}">
    <div>
      <h2 style="margin-bottom:2px">Bảng tổng chi phí T${mi} 總費用表 <span id="cnt_${m}" style="font-size:10px;color:var(--g400)"></span></h2>
    </div>
    <div style="display:flex;gap:5px;flex-wrap:wrap;align-items:center">
      <button class="btn btn-sm btn-o" onclick="${isStaff()?'exportMyCSV':'exportMonthCSV'}('${m}')">📥 Xuất CSV 匯出</button>
      <button class="btn btn-sm btn-o" onclick="const b=document.getElementById('mainTbBody_${m}');b.style.display=b.style.display==='none'?'':'none';this.textContent=b.style.display==='none'?'▸ Mở':'▾ Thu'">▾ Thu</button>
    </div>
  </div>
  <!-- Filter bar -->
  <div style="padding:8px 12px;background:var(--g50);border-bottom:1px solid var(--g200);display:flex;gap:5px;flex-wrap:wrap;align-items:center">
    <input type="text" id="fltQ_${m}" oninput="renderM('${m}')" placeholder="🔍 Tìm mã đơn, mô tả..." style="padding:4px 8px;border:1px solid var(--g300);border-radius:6px;font-size:10px;width:150px"/>
    <input type="date" id="fltDateFrom_${m}" onchange="renderM('${m}')" title="Từ ngày" style="padding:3px 6px;border:1px solid var(--g300);border-radius:4px;font-size:10px;width:115px"/>
    <span style="font-size:10px;color:var(--g400)">→</span>
    <input type="date" id="fltDateTo_${m}" onchange="renderM('${m}')" title="Đến ngày" style="padding:3px 6px;border:1px solid var(--g300);border-radius:4px;font-size:10px;width:115px"/>
    <select id="fltType_${m}" onchange="renderM('${m}')" style="padding:3px 6px;border:1px solid var(--g300);border-radius:4px;font-size:10px"><option value="">Loại 類型</option>${catOpts()}</select>
    <select id="fltStaff_${m}" onchange="renderM('${m}')" style="padding:3px 6px;border:1px solid var(--g300);border-radius:4px;font-size:10px"><option value="">Người lập 經辦人</option>${staffOpts()}</select>
    <select id="fltPay_${m}" onchange="renderM('${m}')" style="padding:3px 6px;border:1px solid var(--g300);border-radius:4px;font-size:10px"><option value="">TT toán 付款狀態</option><option value="Chưa chi">Chưa chi</option><option value="Đã chi">Đã chi</option><option value="Đã cọc">Đã cọc</option></select>
    <select id="fltSt_${m}" onchange="renderM('${m}')" style="padding:3px 6px;border:1px solid var(--g300);border-radius:4px;font-size:10px"><option value="">Trạng thái 狀態</option>${getStatusFilterOpts()}</select>
    <select id="fltPayer_${m}" onchange="renderM('${m}')" style="padding:3px 6px;border:1px solid var(--g300);border-radius:4px;font-size:10px"><option value="">Người chi 付款人</option>${payerOpts()}</select>
    <select id="fltSub_${m}" onchange="renderM('${m}')" style="padding:3px 6px;border:1px solid var(--g300);border-radius:4px;font-size:10px"><option value="">Nộp phiếu 提交</option><option value="yes">Đã nộp</option><option value="no">Chưa nộp</option></select>
    <button class="btn btn-sm" style="background:rgba(220,38,38,.05);color:var(--d);font-size:9px;padding:3px 8px" onclick="clearFilters('${m}')">✕ Xóa lọc</button>
  </div>
  <div id="mainTbBody_${m}">
  <div style="overflow-x:auto;max-height:70vh;overflow-y:auto;position:relative">
    <table><thead><tr>
      <th style="width:28px"><input type="checkbox" onchange="toggleAll('${m}',this.checked)"/></th>
      <th>Mã số 編號</th><th>Ngày 日期</th><th>Loại 類型</th><th>Mô tả 說明</th>
      <th style="text-align:right">Số tiền 金額</th><th>TT toán 付款狀態</th><th>Người lập 經辦人</th><th style="width:30px;text-align:center" title="Đính kèm 附件">📎</th><th>Trạng thái 狀態</th>${colSubmitCT()?'<th>Nộp CT 提交</th>':''}${colBossApproval()?'<th>Boss duyệt 批令</th>':''}${colPayDone()?'<th>Hoàn tất 付款</th>':''}<th style="width:48px"></th>
    </tr></thead><tbody id="tb_${m}"></tbody></table>
  </div>
  <div id="empty_${m}" class="empty" style="display:none">Chưa có dữ liệu 無資料</div>
  <div style="padding:8px 16px;border-top:2px solid var(--g200);display:flex;justify-content:space-between;background:var(--g50);font-size:11px">
    <span>Tổng 合計: <b style="color:var(--p)" id="ft_${m}">0 đ</b></span><span id="fc_${m}">0</span>
  </div>
  </div></div>

  <!-- Tracker (compact, collapsible) -->
  ${!isBoss()?`<div class="cd" style="border-left-color:#b45309"><div class="cd-h" style="background:var(--wl);cursor:pointer" onclick="const b=document.getElementById('trkBody_'+this.dataset.m);b.style.display=b.style.display==='none'?'':'none';this.querySelector('.trkTgl').textContent=b.style.display==='none'?'▸':'▾'" data-m="${m}"><h2 style="color:#b45309"><span class="trkTgl">▾</span> Theo dõi 追蹤</h2></div>
  <div id="trkBody_${m}"><div id="trk_${m}" style="display:flex;flex-wrap:wrap;gap:6px;padding:10px"></div></div></div>`:''}

  <!-- Monthly Summary Table + Chart (at bottom, collapsed by default) -->
  <div class="cd" style="${isStaff()?'display:none':''}"><div class="cd-h" style="cursor:pointer" onclick="const b=document.getElementById('summBody_${m}');const wasHidden=b.style.display==='none';b.style.display=wasHidden?'':'none';this.querySelector('.secTgl').textContent=b.style.display==='none'?'▸':'▾';if(wasHidden){const ym=getYear()+'-'+'${m}';const mI=applyRoleFilter(items.filter(e=>e.date.startsWith(ym)));renderSummary('${m}',mI);}"><h2><span class="secTgl">▸</span> Tổng quan chi phí T${mi}<span class="cn"> 月度費用摘要</span></h2></div><div id="summBody_${m}" class="cd-b" style="padding:10px;display:none">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start">
      <div style="overflow-x:auto"><table class="summary-table" id="summ_${m}"></table></div>
      <div style="max-width:320px;margin:0 auto"><canvas id="mPie_${m}" height="280"></canvas></div>
    </div>
  </div></div>`;
}

// ============ ADVANCE PAYMENT ============
function buildAdvances(){
  return `
  <div class="cd"><div class="cd-h"><h2>Đề xuất tạm ứng<span class="cn"> 員工預支申請</span></h2></div><div class="cd-b">
    <div class="frow">
      <div class="fg"><label>Người nộp<span class="cn"> 申請人</span></label>${isStaff()&&currentUser.staffCode?'<input type="text" value="'+staffDisplayName(currentUser.staffCode)+'" readonly style="background:var(--g100);cursor:not-allowed;font-weight:600"/><input type="hidden" id="advStaff" value="'+currentUser.staffCode+'"/>':'<select id="advStaff"><option value="">-- Chọn --</option>'+staffOpts()+'</select>'}</div>
      <div class="fg"><label>Số tiền<span class="cn"> 金額</span></label><input type="text" id="advAmt" placeholder="1,500,000" oninput="fmtIn(this)"/></div>
      <div class="fg"><label>Ngày tạm ứng<span class="cn"> 申請日期</span></label><input type="date" id="advReqDate"/></div>
      <div class="fg"><label>Ngày dự kiến hoàn trả<span class="cn"> 預計歸還</span></label><input type="date" id="advRetDate"/></div>
    </div>
    <div class="frow" style="grid-template-columns:1fr">
      <div class="fg"><label>Nội dung tạm ứng<span class="cn"> 說明</span></label><textarea id="advNote" placeholder="Nhập tiếng Việt..." oninput="schedTrans('adv')"></textarea></div>
    </div>
    <div class="frow" style="grid-template-columns:1fr">
      <div class="fg"><label>Dịch tự động<span class="cn"> 中文翻譯</span></label><textarea id="advNoteCn" placeholder="(Google Translate)" style="background:var(--g50)"></textarea></div>
    </div>
    <div class="frow">
      <div class="fg"><label>Đính kèm<span class="cn"> 附件</span></label><input type="file" id="advFile" multiple accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" style="font-size:11px"/></div>
    </div>
    <button class="btn btn-p" style="margin-top:4px" onclick="addAdvance()">+ Nộp đơn 提交申請</button>
  </div></div>

  <div class="cd"><div class="cd-h"><h2>Danh sách tạm ứng<span class="cn"> 預支列表</span></h2></div>
  <div style="overflow-x:auto">
    <table><thead><tr>
      <th>STT 序號</th><th>Người nộp 申請人</th><th>Nội dung 說明</th><th style="text-align:right">Số tiền 金額</th><th>Ngày TƯ 申請日</th><th>Ngày hoàn trả 歸還日</th><th>Đính kèm 附件</th><th>Trạng thái 狀態</th><th>Thao tác 操作</th>
    </tr></thead><tbody id="advTb"></tbody></table>
  </div>
  <div id="advEmpty" class="empty" style="display:none">Chưa có đơn tạm ứng</div>
  <div style="padding:8px 16px;border-top:2px solid var(--g200);display:flex;justify-content:space-between;background:var(--g50);font-size:11px">
    <span>Tổng: <b style="color:var(--p)" id="advTotal">0 đ</b></span><span id="advCount">0</span>
  </div></div>

  <!-- Advance Tracker -->
  <div class="tracker"><div class="cd-h" style="background:var(--wl)"><h2 style="color:#b45309">Theo dõi tạm ứng 預支追蹤</h2></div>
  <div style="overflow-x:auto"><table id="advTracker"></table></div></div>`;
}

// ============ ADD ============
async function addItem(m){
  const year=getYear(),ym=year+'-'+m;
  const date=document.getElementById('fDate_'+m).value;
  if(!date||!date.startsWith(ym)){toast('Ngày phải trong tháng '+parseInt(m));return;}
  const type=document.getElementById('fType_'+m).value;
  const amount=parseAmt(document.getElementById('fAmt_'+m).value);
  if(!amount){toast('Nhập số tiền');return;}
  const payStatus=document.getElementById('fPay_'+m).value;
  const staffCode=document.getElementById('fStaff_'+m).value;
  if(!staffCode){toast('Chọn người lập phiếu');return;}
  const payer=document.getElementById('fPayer_'+m).value;
  const advStaff=payer==='NV tạm ứng'?document.getElementById('fAdvStaff_'+m).value:'';
  const advAmt=payer==='NV tạm ứng'?parseAmt(document.getElementById('fAdvAmt_'+m).value):0;
  if(payer==='NV tạm ứng'&&!advStaff){toast('Chọn NV tạm ứng');return;}
  const method=document.getElementById('fMethod_'+m).value;
  const note=document.getElementById('fNote_'+m).value.trim();
  const noteCn=document.getElementById('fNoteCn_'+m).value.trim();
  const vat=document.getElementById('fVat_'+m).value;
  const vatNum=vat==='Có'?(document.getElementById('fVatNum_'+m).value.trim()):'';
  const remark=(document.getElementById('fRemark_'+m)?.value||'').trim();
  const fileInput=document.getElementById('fFile_'+m);
  const att=await readAllFiles(fileInput);

  const cat=CATS.find(c=>c.vn===type);
  items.push({id:nextId++,date,code:genCode(m),type,typeCn:cat?cat.cn:'',amount,payStatus,staffCode,payer,advStaff,advAmt,advPaid:false,method,note,noteCn,vat,vatNum,remark,attachments:att,
    status:'draft',approvedDate:'',voucherDate:'',paidDate:'',rejectedReason:'',selected:false,submitted:false,submittedDate:'',
    createdByManager:isMgr()||false,createdByAccountant:isAccountant()||false,prepaid:false,prepaidBy:'',prepaidDate:'',hidden:false,locked:false,lockedBy:'',lockedDate:''});

  // RESET form completely
  resetForm(m,fileInput);

  saveLog('thêm-chi-phí',type+' '+fmtV(amount));renderM(m);toast('Đã thêm 已新增');
}

function deleteItem(id){
  const e=items.find(x=>x.id===id);if(!e)return;
  if(e.locked&&!isMgr()&&!isBoss()){toast('Đơn đã khóa 🔐 — không thể xoá');return;}
  if(isStaff()&&e.staffCode!==currentUser.staffCode){toast('Không có quyền');return;}
  if(!isMgr()&&e.status!=='draft'){toast('Chỉ xoá được khoản ở trạng thái Nháp. Dùng "Thu hồi" nếu cần chỉnh sửa');return;}
  if(!confirm('Xoá?'))return;
  items=items.filter(x=>x.id!==id);saveLog('xóa-chi-phí',e.code+' '+e.type);rerender();toast('Đã xoá');
}

// ============ BATCH ============
// ============ TRACKER DETAIL TOGGLE ============
function toggleTrkDetail(detId,m){
  // Close all other panels for this month, then toggle the clicked one
  const panels=document.querySelectorAll('.trkDetPanel_'+m);
  panels.forEach(p=>{if(p.id!==detId)p.style.display='none';});
  const el=document.getElementById(detId);
  if(el)el.style.display=el.style.display==='none'?'':'none';
}

// ============ QUEUE TAB SWITCHING (Manager) ============
const _activeQTab={};
function switchQTab(m,tab){
  _activeQTab[m]=tab;
  const tabs=['draft','pend','send','boss','pay','cash'];
  tabs.forEach(t=>{
    const panel=document.getElementById('qpanel_'+t+'_'+m);
    const btn=document.getElementById('qtab_'+t+'_'+m);
    if(panel)panel.style.display=(t===tab)?'':'none';
    if(btn){
      btn.style.borderBottomColor=(t===tab)?'var(--p)':'transparent';
      btn.style.color=(t===tab)?'var(--p)':'var(--g500)';
      btn.style.background=(t===tab)?'rgba(99,102,241,.06)':'transparent';
    }
  });
}
function _restoreQTab(m){
  const tab=_activeQTab[m]||'pend';
  switchQTab(m,tab);
}

// ============ ACCT/STAFF TAB SWITCHING (5 tabs) ============
const _activeAQTab={};
const _aqTabColors={draft:'#64748b',mgr:'#b45309',boss:'#7c3aed',ck:'#0d9488',cash:'#ea580c'};
function switchAQTab(m,tab){
  _activeAQTab[m]=tab;
  const tabs=['draft','mgr','boss','ck','cash'];
  tabs.forEach(t=>{
    const panel=document.getElementById('aqpanel_'+t+'_'+m);
    const btn=document.getElementById('aqtab_'+t+'_'+m);
    if(panel)panel.style.display=(t===tab)?'':'none';
    if(btn){
      const c=_aqTabColors[t];
      btn.style.borderBottomColor=(t===tab)?c:'transparent';
      btn.style.color=(t===tab)?c:'var(--g500)';
      btn.style.background=(t===tab)?'rgba(0,0,0,.04)':'transparent';
    }
  });
}
function _restoreAQTab(m){
  const tab=_activeAQTab[m]||'draft';
  switchAQTab(m,tab);
}

function clearOtherCtxSel(m,ctx){
  const ym=getYear()+'-'+m;
  items.filter(e=>e.date.startsWith(ym)&&e.selected&&e._selCtx!==ctx).forEach(e=>{e.selected=false;delete e._selCtx;});
}
function toggleAll(m,checked){
  const ym=getYear()+'-'+m;
  clearOtherCtxSel(m,'main');
  applyRoleFilter(items.filter(e=>e.date.startsWith(ym))).forEach(e=>{e.selected=checked;if(checked)e._selCtx='main';else delete e._selCtx;});renderM(m);
}
function toggleOne(id,ctx){
  const e=items.find(x=>x.id===id);
  if(!e)return;
  const m=e.date.slice(5,7);
  if(!e.selected){clearOtherCtxSel(m,ctx||'main');e.selected=true;e._selCtx=ctx||'main';}
  else{e.selected=false;delete e._selCtx;}
  renderM(m);
}
function getSel(m){const ym=getYear()+'-'+m;return applyRoleFilter(items.filter(e=>e.date.startsWith(ym)&&e.selected));}

function buildBatchBtns(m,ctx){
  let b='';
  if(!isCashier()&&!isChiefAccountant())b+='<button class="btn btn-sm btn-d" onclick="batchDelete(\''+m+'\')">Xoá 刪除</button>';
  if(isStaff()||isAccountant())b+='<button class="btn btn-sm btn-p" onclick="batchSend(\''+m+'\')">Gửi duyệt 送審</button>';
  b+='<button class="btn btn-sm btn-print" onclick="batchPrint(\''+m+'\')">🖨️ In 列印</button>';
  b+='<button class="btn btn-sm btn-o" onclick="'+(isStaff()?'exportMyCSV':'exportMonthCSV')+'(\''+m+'\')">📥 Xuất CSV 匯出</button>';
  // Queue-only buttons (not shown in main table which has completed items)
  if(ctx!=='main'){
    if(isManager()&&!isBoss())b+='<button class="btn btn-sm btn-s" onclick="batchApprove(\''+m+'\')">Duyệt 審批</button>';
    if(isManager()&&!isBoss())b+='<button class="btn btn-sm" style="background:var(--pp);color:#fff" onclick="batchVoucher(\''+m+'\')">Nộp CT 提交憑證</button>';
    if(isManager())b+='<button class="btn btn-sm" style="background:rgba(13,148,136,.08);color:#0d9488;border:1px solid rgba(13,148,136,.15)" onclick="batchPrepaid(\''+m+'\')">💵 Đã ứng 已預支</button>';
    if(isMgr()&&!isBoss())b+='<button class="btn btn-sm" style="background:rgba(22,163,74,.06);color:#15803d;border:1px solid rgba(22,163,74,.12)" onclick="batchConfirmCashReceived(\''+m+'\')">✓ Đã nhận 已收</button>';
    if(canBossApprove())b+='<button class="btn btn-sm btn-d" onclick="batchBossReturn(\''+m+'\')">↩ Trả về 退回</button><button class="btn btn-sm" style="background:rgba(217,119,6,.06);color:#b45309;border:1px solid rgba(217,119,6,.15)" onclick="batchBossApprove(\''+m+'\')">Duyệt lệnh 批令</button>';
    if(canPayment())b+='<button class="btn btn-sm btn-d" onclick="batchKttReturn(\''+m+'\')">↩ Trả lại 退回</button><button class="btn btn-sm btn-s" onclick="batchPaid(\''+m+'\')">Đã CK 已轉賬</button>';
    if(canCashPay())b+='<button class="btn btn-sm btn-d" onclick="batchCashierReject(\''+m+'\')">↩ Trả lại 退回</button><button class="btn btn-sm" style="background:rgba(124,58,237,.06);color:#7c3aed;border:1px solid rgba(124,58,237,.15)" onclick="batchCashierApprove(\''+m+'\')">💰 Chi TM 現金支付</button>';
  }
  if(isMgr())b+='<button class="btn btn-sm" style="background:rgba(100,116,139,.08);color:#64748b" onclick="batchToggleHidden(\''+m+'\',true)">🔒 Ẩn 隱藏</button><button class="btn btn-sm" style="background:rgba(100,116,139,.06);color:#64748b" onclick="batchToggleHidden(\''+m+'\',false)">🔓 Hiện 顯示</button>';
  if(!isCashier()&&!isChiefAccountant()&&!isBoss())b+='<button class="btn btn-sm" style="background:rgba(234,88,12,.08);color:#c2410c" onclick="batchRecall(\''+m+'\')">↩️ Thu hồi 撤回</button>';
  if(canApprove()&&!isBoss())b+='<button class="btn btn-sm" style="background:rgba(22,163,74,.06);color:#15803d" onclick="batchApproveRecall(\''+m+'\')">✓ Duyệt thu hồi 批准撤回</button>';
  // Main table only: payStatus + lock/unlock + CSV export
  if(ctx==='main'){
    b+='<button class="btn btn-sm" style="background:rgba(5,150,105,.06);color:#059669;border:1px solid rgba(5,150,105,.12)" onclick="batchChangePayStatus(\''+m+'\',\'Đã chi\')">💰 Đã chi 已付</button>';
    if(isAccountant()||isMgr()||isBoss())b+='<button class="btn btn-sm" style="background:rgba(15,23,42,.06);color:#1e293b;border:1px solid rgba(15,23,42,.12)" onclick="batchLock(\''+m+'\')">🔐 Khóa đơn 鎖定</button>';
    if(isMgr()||isBoss())b+='<button class="btn btn-sm" style="background:rgba(100,116,139,.06);color:#64748b;border:1px solid rgba(100,116,139,.12)" onclick="batchUnlock(\''+m+'\')">🔓 Mở khóa 解鎖</button>';
  }
  return b;
}

function updateBatchHdr(m){
  const ym=getYear()+'-'+m;
  const allSel=items.filter(e=>e.date.startsWith(ym)&&e.selected);
  // Main table batch-hdr (id=batch_${m}) — only count items with _selCtx='main'
  const mainCount=allSel.filter(e=>e._selCtx==='main').length;
  const mainEl=document.getElementById('batch_'+m);
  if(mainEl){
    if(mainCount>0){mainEl.classList.add('active');mainEl.querySelector('.sel-count').textContent=mainCount+' đã chọn 已選';}
    else mainEl.classList.remove('active');
  }
  const mainTitleEl=document.getElementById('batchTitle_'+m);
  if(mainTitleEl)mainTitleEl.style.display=mainCount>0?'none':'';
  // Other global batch-hdrs without data-q (Boss/TQ/KTT pending tables) — use 'pend' context
  const pendCount=allSel.filter(e=>e._selCtx==='pend').length;
  document.querySelectorAll('.batch-hdr[data-m="'+m+'"]:not([data-q]):not([id="batch_'+m+'"])').forEach(el=>{
    if(pendCount>0){el.classList.add('active');el.querySelector('.sel-count').textContent=pendCount+' đã chọn 已選';}
    else el.classList.remove('active');
  });
  document.querySelectorAll('.batch-title[data-m="'+m+'"]:not([data-q]):not([id="batchTitle_'+m+'"])').forEach(el=>{
    el.style.display=pendCount>0?'none':'';
  });
  // Queue-specific batch-hdrs (Manager tabs + Accountant panel 1)
  const qFilters={pend:['pending'],send:['approved'],boss:['voucher'],pay:['boss_approved','cashier_review','cash_disbursed'],
    acctDraft:['draft'],mgrDraft:['draft']};
  Object.keys(qFilters).forEach(q=>{
    const qSel=allSel.filter(e=>e._selCtx===q).length;
    document.querySelectorAll('.batch-hdr[data-m="'+m+'"][data-q="'+q+'"]').forEach(el=>{
      if(qSel>0){el.classList.add('active');el.querySelector('.sel-count').textContent=qSel+' đã chọn 已選';}
      else el.classList.remove('active');
    });
    document.querySelectorAll('.batch-title[data-m="'+m+'"][data-q="'+q+'"]').forEach(el=>{
      el.style.display=qSel>0?'none':'';
    });
  });
}

function batchDelete(m){
  const sel=getSel(m);if(!sel.length){toast('Chọn mục cần xoá');return;}
  // Only draft items can be deleted (non-manager)
  const deletable=isMgr()?sel:sel.filter(e=>e.status==='draft');
  const blocked=sel.length-deletable.length;
  if(!deletable.length){toast('Chỉ xoá được khoản ở trạng thái Nháp');return;}
  if(blocked>0&&!confirm(`${blocked}/${sel.length} khoản đã gửi duyệt — không thể xoá.\nXoá ${deletable.length} khoản nháp?`))return;
  else if(blocked===0&&!confirm(`Xoá ${deletable.length} khoản?`))return;
  const ids=new Set(deletable.map(e=>e.id));items=items.filter(e=>!ids.has(e.id));saveData();renderM(m);toast(`Đã xoá ${deletable.length} khoản`);
}
function batchSend(m){
  const sel=getSel(m).filter(e=>e.status==='draft');if(!sel.length){toast('Không có mục nháp nào được chọn');return;}
  if(!confirm(`Gửi duyệt ${sel.length} khoản?`))return;
  const today_s=new Date().toISOString().slice(0,10);
  sel.forEach(e=>{e.status='pending';e.submitted=true;e.submittedDate=today_s;e.paymentHistory=(e.paymentHistory||[]);e.paymentHistory.push({action:'sent',by:currentUser?currentUser.name:'',date:today_s,note:'Gửi duyệt (kèm nộp phiếu)'});e.selected=false;delete e._selCtx;});
  const fltEl=document.getElementById('fltSt_'+m);if(fltEl)fltEl.value='';
  saveLog('gửi-duyệt','Gửi duyệt '+sel.length+' khoản');renderM(m);toast(`Đã gửi duyệt ${sel.length} khoản`);
}
function batchApprove(m){
  if(!canApprove()){toast('Không có quyền duyệt');return;}
  const sel=getSel(m).filter(e=>e.status==='pending');if(!sel.length){toast('Không có mục chờ duyệt nào được chọn');return;}
  const today_a=new Date().toISOString().slice(0,10);
  sel.forEach(e=>{e.status='approved';e.approvedDate=today_a;e.paymentHistory=(e.paymentHistory||[]);e.paymentHistory.push({action:'approved',by:currentUser?currentUser.name:'',date:today_a,note:'QL duyệt chi phí'});e.selected=false;delete e._selCtx;});
  const fltEl=document.getElementById('fltSt_'+m);if(fltEl)fltEl.value='';
  saveData();renderM(m);toast(`Đã duyệt ${sel.length}`);
}
function batchVoucher(m){
  if(!canManageVoucher())return;
  const sel=getSel(m).filter(e=>e.status==='approved');if(!sel.length){toast('Chọn mục đã duyệt');return;}
  const d=prompt('Ngày lập phiếu:',new Date().toISOString().slice(0,10));if(!d)return;
  sel.forEach(e=>{e.status='voucher';e.voucherDate=d;e.paymentHistory=(e.paymentHistory||[]);e.paymentHistory.push({action:'voucher',by:currentUser?currentUser.name:'',date:d,note:'Nộp về công ty'});e.selected=false;delete e._selCtx;});saveData();renderM(m);toast(`Đã lập phiếu ${sel.length}`);
}
function batchPaid(m){
  if(!canPayment())return;
  const sel=getSel(m).filter(e=>e.status==='boss_approved');
  if(!sel.length){toast('Chọn mục Boss đã duyệt (CK)');return;}
  const today=new Date().toISOString().slice(0,10);
  sel.forEach(e=>{e.status='paid';e.paidDate=today;e.paidBy=currentUser?currentUser.name:'';e.paymentHistory=(e.paymentHistory||[]);e.paymentHistory.push({action:'ck_paid',by:currentUser?currentUser.name:'',date:today,note:'KT Trưởng chi tiền CK'});e.selected=false;delete e._selCtx;});saveData();renderM(m);toast(`Đã chi CK ${sel.length} khoản`);
}

// Boss batch approve (duyệt lệnh)
function batchBossApprove(m){
  if(!canBossApprove())return;
  const sel=getSel(m).filter(e=>e.status==='voucher');if(!sel.length){toast('Chọn mục đã nộp về CT');return;}
  const tmCount=sel.filter(e=>e.method==='Tiền mặt').length;
  const ckCount2=sel.length-tmCount;
  let confirmMsg='Duyệt lệnh '+sel.length+' khoản?\n';
  if(ckCount2)confirmMsg+='\n• '+ckCount2+' khoản CK → chuyển KT Trưởng thanh toán';
  if(tmCount)confirmMsg+='\n• '+tmCount+' khoản TM → chuyển Thủ quỹ chi tiền';
  if(!confirm(confirmMsg))return;
  const today=new Date().toISOString().slice(0,10);
  let cashCount=0,ckCount=0;
  sel.forEach(e=>{
    e.bossApprovedDate=today;e.selected=false;delete e._selCtx;
    if(e.method==='Tiền mặt'){e.status='cashier_review';cashCount++;}
    else{e.status='boss_approved';ckCount++;}
    e.paymentHistory=(e.paymentHistory||[]);e.paymentHistory.push({action:'boss_approve_order',by:currentUser?currentUser.name:'',date:today,note:'Boss duyệt lệnh'+(e.method==='Tiền mặt'?' → Thủ quỹ':' → KT Trưởng')});
  });
  saveData();renderM(m);
  let msg='Boss đã duyệt lệnh '+sel.length+' khoản';
  if(cashCount)msg+=' ('+cashCount+' TM → Thủ quỹ)';
  if(ckCount)msg+=' ('+ckCount+' CK → KT Trưởng)';
  toast(msg);
}

// Boss batch return (trả về với lý do)
function batchBossReturn(m){
  if(!canBossApprove())return;
  const sel=getSel(m).filter(e=>e.status==='voucher');
  if(!sel.length){toast('Chọn mục đã nộp về CT cần trả về');return;}
  const reason=prompt('Trả về '+sel.length+' khoản.\n\nLý do trả về:');
  if(!reason||!reason.trim())return;
  const today=new Date().toISOString().slice(0,10);
  sel.forEach(e=>{
    e.status='rejected';e.rejectedReason='[Boss trả về] '+reason.trim();
    e.paymentHistory=(e.paymentHistory||[]);
    e.paymentHistory.push({action:'boss_returned',by:currentUser?currentUser.name:'',date:today,note:'Boss trả về: '+reason.trim()});
    e.selected=false;delete e._selCtx;
  });
  saveData();renderM(m);toast('Boss đã trả về '+sel.length+' khoản');
}

// Manager: đánh dấu đã chi trả trước cho NV
function batchPrepaid(m){
  if(!isMgr())return;
  const sel=getSel(m).filter(e=>e.status==='pending'||e.status==='approved');
  if(!sel.length){toast('Chọn mục chờ duyệt hoặc đã duyệt');return;}
  const noteInput=prompt('💵 Chi trả trước '+sel.length+' khoản\n\nNgười chi: '+(currentUser?currentUser.name:'')+'\nNgày chi: '+new Date().toLocaleDateString('vi-VN')+'\n\nGhi chú (tùy chọn):','QL chi trả trước cho NV');
  if(noteInput===null)return;
  const today=new Date().toISOString().slice(0,10);
  sel.forEach(e=>{
    if(e.status==='pending'){e.status='approved';e.approvedDate=today;}
    e.prepaid=true;e.prepaidBy=currentUser?currentUser.name:'';e.prepaidDate=today;
    e.payStatus='Đã chi';
    e.paymentHistory=(e.paymentHistory||[]);
    e.paymentHistory.push({action:'prepaid',by:currentUser?currentUser.name:'',date:today,note:noteInput||'QL chi trả trước cho NV'});
    e.selected=false;delete e._selCtx;
  });
  saveData();renderM(m);toast('✓ Đã chi trả trước '+sel.length+' khoản — '+currentUser.name+' ('+fmtDate(today)+')');
}
function prepaidItem(id){
  if(!isMgr())return;
  const e=items.find(x=>x.id===id);if(!e)return;
  const noteInput=prompt('💵 Chi trả trước khoản: '+e.code+'\nSố tiền: '+fmtV(e.amount)+'\n\nNgười chi: '+(currentUser?currentUser.name:'')+'\nNgày chi: '+new Date().toLocaleDateString('vi-VN')+'\n\nGhi chú (tùy chọn):','QL chi trả trước cho NV');
  if(noteInput===null)return;
  if(e.status==='pending'){e.status='approved';e.approvedDate=new Date().toISOString().slice(0,10);}
  const today=new Date().toISOString().slice(0,10);
  e.prepaid=true;e.prepaidBy=currentUser?currentUser.name:'';e.prepaidDate=today;
  e.payStatus='Đã chi';
  e.paymentHistory=(e.paymentHistory||[]);
  e.paymentHistory.push({action:'prepaid',by:currentUser?currentUser.name:'',date:today,note:noteInput||'QL chi trả trước cho NV'});
  closeM('approveModal');saveData();rerender();toast('✓ Đã chi trả trước — '+currentUser.name+' ('+fmtDate(today)+')');
}

// Single item boss approve
function bossApproveItem(id){
  if(!canBossApprove())return;
  const e=items.find(x=>x.id===id);if(!e||e.status!=='voucher')return;
  const td=new Date().toISOString().slice(0,10);
  e.bossApprovedDate=td;
  if(e.method==='Tiền mặt'){e.status='cashier_review';}
  else{e.status='boss_approved';}
  e.paymentHistory=(e.paymentHistory||[]);e.paymentHistory.push({action:'boss_approve_order',by:currentUser?currentUser.name:'',date:td,note:'Boss duyệt lệnh'+(e.method==='Tiền mặt'?' → Thủ quỹ':' → KT Trưởng')});
  closeM('approveModal');saveData();rerender();toast(e.method==='Tiền mặt'?'Boss duyệt → chuyển Thủ quỹ':'Boss đã duyệt lệnh ✓');
}

// ============ MARK SUBMITTED ============
function markSubmitted(id){
  const e=items.find(x=>x.id===id);
  if(!e)return;
  const today=new Date().toISOString().slice(0,10);
  e.submitted=true;
  e.submittedDate=today;
  e.status='pending';
  e.paymentHistory=(e.paymentHistory||[]);
  e.paymentHistory.push({action:'submitted',by:currentUser?currentUser.name:'',date:today,note:'Nộp phiếu — chuyển sang chờ QL duyệt'});
  closeM('approveModal');saveLog('nộp-phiếu',e.code+' '+fmtV(e.amount));rerender();toast('Đã nộp phiếu — chuyển sang Chờ QL duyệt');
}

// ============ ADVANCE PAYMENT FUNCTIONS ============
async function addAdvance(){
  const staff=document.getElementById('advStaff').value;
  const amt=parseAmt(document.getElementById('advAmt').value);
  const reqDate=document.getElementById('advReqDate').value;
  const retDate=document.getElementById('advRetDate').value;
  const note=document.getElementById('advNote').value.trim();
  const noteCn=document.getElementById('advNoteCn').value.trim();
  const fileInput=document.getElementById('advFile');
  const att=await readAllFiles(fileInput);

  if(!staff){toast('Chọn người nộp');return;}
  if(!amt){toast('Nhập số tiền');return;}
  if(!reqDate){toast('Chọn ngày tạm ứng');return;}

  advances.push({id:advNextId++,staffCode:staff,note,noteCn,amount:amt,requestDate:reqDate,returnDate:retDate||'',attachments:att,
    status:'draft',approvedDate:'',returnedDate:'',rejectedReason:'',selected:false});

  document.getElementById('advStaff').value='';
  document.getElementById('advAmt').value='';
  document.getElementById('advReqDate').value='';
  document.getElementById('advRetDate').value='';
  document.getElementById('advNote').value='';
  document.getElementById('advNoteCn').value='';
  fileInput.value='';

  saveData();renderAdvances();toast('Đã nộp đơn tạm ứng');
}

function deleteAdvance(id){if(!confirm('Xoá đơn tạm ứng?'))return;advances=advances.filter(e=>e.id!==id);saveData();renderAdvances();toast('Đã xoá');}

function approveAdvance(id){
  if(!isMgr())return;
  const a=advances.find(x=>x.id===id);if(!a)return;
  a.status='approved';a.approvedDate=new Date().toISOString().slice(0,10);
  saveData();renderAdvances();toast('Đã duyệt');
}

function rejectAdvance(id){
  if(!isMgr())return;
  const a=advances.find(x=>x.id===id);if(!a)return;
  const reason=prompt('Lý do từ chối:');if(!reason)return;
  a.status='rejected';a.rejectedReason=reason;
  saveData();renderAdvances();toast('Đã từ chối');
}

function confirmReturned(id){
  if(!isMgr())return;
  const a=advances.find(x=>x.id===id);if(!a)return;
  if(!confirm('Xác nhận hoàn trả tạm ứng?'))return;
  a.status='returned';a.returnedDate=new Date().toISOString().slice(0,10);
  saveData();renderAdvances();toast('Đã xác nhận hoàn trả');
}

function submitAdvance(id){
  const a=advances.find(x=>x.id===id);if(!a)return;
  if(a.status!=='draft'){toast('Chỉ có thể nộp từ trạng thái nháp');return;}
  a.status='pending';
  saveData();renderAdvances();toast('Đã nộp đơn');
}

function renderAdvances(){
  const tbody=document.getElementById('advTb');
  const emptyEl=document.getElementById('advEmpty');
  // Staff filter
  let dispAdvances=advances;
  if(isStaff()&&currentUser&&currentUser.staffCode){
    dispAdvances=advances.filter(a=>a.staffCode===currentUser.staffCode);
  }

  if(!dispAdvances.length){
    if(tbody)tbody.innerHTML='';
    if(emptyEl)emptyEl.style.display='';
  }else{
    if(emptyEl)emptyEl.style.display='none';
    if(tbody){
      tbody.innerHTML=dispAdvances.map((a,i)=>{
        const staff=STAFF.find(s=>s.code===a.staffCode);
        const sn=staff?staff.name+' '+staff.cn:a.staffCode;
        const reqD=fmtDate(a.requestDate);
        const retD=a.returnDate?fmtDate(a.returnDate):'--';
        const st=STATUS[a.status]||{l:a.status,c:'st-draft'};
        return `<tr>
          <td style="text-align:center;color:var(--g400);font-size:10px">${i+1}</td>
          <td>${sn}</td>
          <td style="max-width:160px;overflow:hidden;text-overflow:ellipsis" title="${(a.note||'')+'\n'+(a.noteCn||'')}">${a.note?(a.note.length>25?a.note.slice(0,25)+'...':a.note):''}${a.noteCn?'<br><span style="font-size:9px;color:var(--g400)">'+(a.noteCn.length>15?a.noteCn.slice(0,15)+'...':a.noteCn)+'</span>':''}</td>
          <td class="amt">${fmtV(a.amount)}</td>
          <td style="font-size:10px">${reqD}</td>
          <td style="font-size:10px">${retD}</td>
          <td>${a.attachments&&a.attachments.length?a.attachments.map((f,fi)=>f.url&&f.url.startsWith('blob:')?'<span style="font-size:9px;color:var(--g400)">⚠️ '+f.name+'</span>':'<span onclick="(function(){const adv=advances.find(x=>x.id==='+a.id+');if(adv)openFilePreview(adv.attachments,'+fi+');else toast(\'File không tồn tại\');})()" style="font-size:9px;color:var(--p);cursor:pointer;text-decoration:underline">'+f.name+'</span>').join(', '):'--'}</td>
          <td><span class="st ${st.c}">${st.l}</span></td>
          <td>
            ${a.status==='draft'?`<button class="btn btn-sm btn-p" onclick="submitAdvance(${a.id})">Nộp 提交</button>`:isMgr()&&a.status==='pending'?`<button class="btn btn-sm btn-s" onclick="approveAdvance(${a.id})">Duyệt 批准</button><button class="btn btn-sm btn-d" onclick="rejectAdvance(${a.id})">Từ chối 退回</button>`:isMgr()&&a.status==='approved'?`<button class="btn btn-sm btn-s" onclick="confirmReturned(${a.id})">Xác nhận hoàn trả 確認歸還</button>`:a.status==='returned'?`<span style="font-size:9px;color:var(--s)">Hoàn trả ${a.returnedDate||''}</span>`:a.status==='rejected'?`<span style="font-size:9px;color:var(--d)" title="${a.rejectedReason||''}">Lý do: ${(a.rejectedReason||'').slice(0,20)}</span>`:''}
            ${!isMgr()&&a.status==='draft'?`<button class="btn btn-sm btn-d" onclick="deleteAdvance(${a.id})">Xoá</button>`:''}
          </td>
        </tr>`;
      }).join('');
    }
  }

  // Totals
  const totalAdv=dispAdvances.reduce((s,a)=>s+a.amount,0);
  if(document.getElementById('advTotal'))document.getElementById('advTotal').textContent=fmtV(totalAdv);
  if(document.getElementById('advCount'))document.getElementById('advCount').textContent=dispAdvances.length+' đơn';

  // Tracker
  const trk=document.getElementById('advTracker');
  if(trk){
    const g={pending:[],approved:[],returned:[],rejected:[]};
    advances.forEach(a=>{if(g[a.status])g[a.status].push(a);});
    const labels={pending:{l:'Chờ duyệt 待審批',cl:'#fbbf24'},approved:{l:'⚠ Đã duyệt, chưa hoàn trả 已批准未歸還',cl:'#f87171'},returned:{l:'Đã hoàn trả 已歸還 ✓',cl:'#34d399'},rejected:{l:'Từ chối 退回',cl:'#f87171'}};
    let h='<thead><tr><th style="text-align:left;width:220px">Trạng thái</th><th>SL</th><th style="text-align:right">Tổng tiền</th><th style="text-align:left">Chi tiết</th></tr></thead><tbody>';
    let hasData=false;
    for(const[k,arr]of Object.entries(g)){
      if(!arr.length)continue;hasData=true;
      const t=arr.reduce((s,a)=>s+a.amount,0);const lb=labels[k];
      const names=arr.slice(0,3).map(a=>{const s=STAFF.find(x=>x.code===a.staffCode);return s?s.name:a.staffCode;});
      h+=`<tr><td style="font-weight:600;color:${lb.cl}">${lb.l}</td><td style="text-align:center;font-weight:700;color:${lb.cl}">${arr.length}</td><td class="amt" style="color:${lb.cl}">${fmtV(t)}</td><td style="font-size:10px;color:var(--g500)">${names.join(', ')}${arr.length>3?' ...':''}</td></tr>`;
    }
    if(!hasData)h+='<tr><td colspan="4" style="text-align:center;color:var(--g400);padding:12px">Chưa có đơn tạm ứng</td></tr>';
    h+='</tbody>';trk.innerHTML=h;
  }
}

// ============ APPROVAL MODAL ============
function openApproval(id){
  const e=items.find(x=>x.id===id);if(!e){toast('Khoản chi phí không tồn tại');return;}
  const staff=STAFF.find(s=>s.code===e.staffCode);
  const sn=staff?staff.name+' '+staff.cn:e.staffCode;
  const advStaffObj=e.advStaff?STAFF.find(s=>s.code===e.advStaff):null;
  const st=STATUS[e.status]||STATUS.draft;

  let h=`<h3>${e.status==='pending'&&isMgr()?'Phê duyệt 審批':'Chi tiết 詳情'}</h3>`;
  h+=`<div style="font-size:12px;margin-bottom:10px">
    <div><b>Mã:</b> ${e.code} | <b>Ngày:</b> ${e.date}</div>
    <div><b>Người lập:</b> ${sn}</div>
    <div><b>Loại:</b> ${e.type} ${e.typeCn}</div>
    <div><b>Số tiền:</b> <span style="color:var(--p);font-size:15px;font-weight:700">${fmtV(e.amount)}</span></div>
    <div><b>Người chi trả:</b> ${e.payer||'--'}</div>`;
  if(e.payer==='NV tạm ứng'){
    h+=`<div class="adv-info"><b>NV tạm ứng:</b> ${advStaffObj?advStaffObj.name+' '+advStaffObj.cn:e.advStaff} | <b>Số tiền tạm ứng:</b> ${fmtV(e.advAmt||0)}`;
    if(e.advPaid) h+=` | <span style="color:var(--s);font-weight:600">Đã hoàn trả NV ✓</span>`;
    else h+=` | <span style="color:var(--w);font-weight:600">Chưa hoàn trả NV</span>`;
    h+=`</div>`;
  }
  h+=`<div><b>TT thanh toán:</b> ${e.payStatus} | <b>Phương thức:</b> ${e.method||'--'}${e.prepaid?' | <span style="background:rgba(5,150,105,.06);color:#059669;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700">💵 QL đã ứng trước ('+e.prepaidBy+' '+e.prepaidDate+')</span>':''}</div>
    <div><b>VAT:</b> ${e.vat||'Không'} ${e.vatNum?' | Số HĐ: '+e.vatNum:''}</div>
    <div><b>Nộp phiếu:</b> ${e.submitted?'✓ '+e.submittedDate:'Chưa nộp'}</div>
    <div style="margin-top:4px"><b>Mô tả:</b> ${e.note||'--'}</div>
    <div><b>中文:</b> ${e.noteCn||'--'}</div>
    ${e.remark?'<div style="margin-top:4px;color:var(--pp)"><b>📝 Ghi chú:</b> '+e.remark+'</div>':''}
    ${e.attachments&&e.attachments.length?'<div style="margin-top:8px"><b>Đính kèm:</b><div style="margin-top:4px;display:flex;flex-wrap:wrap;gap:6px">'+e.attachments.map((a,ai)=>{
      const isBlob=a.url&&a.url.startsWith('blob:');
      if(isBlob)return '<span style="font-size:10px;color:var(--g400);padding:4px 8px;background:var(--g100);border-radius:6px" title="File đã hết hạn - cần upload lại">⚠️ '+a.name+' (hết hạn)</span>';
      const isImg=a.url&&(a.url.startsWith('data:image')||(a.type&&a.type.startsWith('image/')));
      if(isImg)return '<span style="display:inline-block;cursor:pointer" onclick="previewAttachments('+e.id+')"><img src="'+a.url+'" style="max-width:80px;max-height:60px;border-radius:6px;border:1px solid var(--g200)" title="Bấm để xem: '+a.name+'"/></span>';
      return '<span onclick="previewAttachments('+e.id+')" style="font-size:10px;color:var(--p);padding:4px 8px;background:rgba(99,102,241,.06);border-radius:6px;cursor:pointer;border:1px solid rgba(99,102,241,.1)">📄 '+a.name+'</span>';
    }).join('')+'</div></div>':''}
  </div>`;

  // Flow
  h+='<div class="flow">';
  ((e)=>{const isCash=e.method==='Tiền mặt';return isCash?['draft','pending','approved','voucher','cashier_review','cash_disbursed','paid']:['draft','pending','approved','voucher','boss_approved','paid'];})(e).forEach((s,i,arr)=>{
    if(i>0)h+='<span class="flow-arr">→</span>';
    const ci=e.status==='rejected'?-1:arr.indexOf(e.status);
    let cls=i<ci?'done':i===ci?'active':'';
    if(e.status==='rejected'&&s==='pending')cls='fail';
    h+=`<span class="flow-step ${cls}">${{draft:'Nháp',pending:'Chờ duyệt',approved:'Đã duyệt',voucher:'Nộp về CT',boss_approved:'Boss duyệt',cashier_review:'Thủ quỹ KT',cash_disbursed:'Đã chi TM',paid:'Hoàn tất'}[s]}</span>`;
  });
  if(e.status==='rejected')h+='<span class="flow-arr">→</span><span class="flow-step fail">Từ chối</span>';
  h+='</div>';

  if(e.status==='rejected')h+=`<div style="background:rgba(220,38,38,.05);padding:6px 10px;border-radius:6px;font-size:11px;margin:6px 0;border-left:3px solid rgba(220,38,38,.3)"><b>Lý do:</b> ${e.rejectedReason||'--'}</div>`;
  if(e.status==='voucher')h+=`<div style="background:var(--ppl);padding:6px 10px;border-radius:6px;font-size:11px;margin:6px 0"><b>Ngày nộp về công ty:</b> ${e.voucherDate}</div>`;
  if(e.status==='paid')h+=`<div style="background:var(--sl);padding:6px 10px;border-radius:6px;font-size:11px;margin:6px 0"><b>Ngày chi tiền:</b> ${e.paidDate}</div>`;

  // Boss approved info
  if(e.status==='boss_approved')h+=`<div style="background:rgba(217,119,6,.05);padding:6px 10px;border-radius:6px;font-size:11px;margin:6px 0;border-left:3px solid rgba(217,119,6,.3)"><b>Boss duyệt lệnh:</b> ${e.bossApprovedDate||''}</div>`;

  // Payment history
  if(e.paymentHistory&&e.paymentHistory.length){
    h+='<div style="margin-top:8px;padding:8px 12px;background:var(--g50);border-radius:8px;font-size:11px"><b>📋 Lịch sử thao tác:</b><div style="margin-top:4px">';
    e.paymentHistory.forEach(ph=>{
      const labels={cash_disbursed:'💰 Chi TM',cash_confirmed:'✓ Nhận tiền',ck_paid:'🏦 Chi CK',cashier_rejected:'↩ Trả lại',prepaid:'💵 QL ứng trước',approved:'✅ Duyệt',voucher:'📋 Nộp CT',boss_approved:'⭐ Boss duyệt',sent:'📤 Gửi duyệt',boss_approve_order:'⭐ Boss duyệt lệnh',locked:'🔐 Khóa đơn',unlocked:'🔓 Mở khóa'};
      h+='<div style="padding:2px 0;border-bottom:1px solid var(--g200)"><span style="color:var(--p);font-weight:600">'+(labels[ph.action]||ph.action)+'</span> — '+ph.by+' ('+ph.date+')';
      if(ph.note)h+=' <span style="color:var(--g500)">'+ph.note+'</span>';
      h+='</div>';
    });
    h+='</div></div>';
  }
  // Cash batch info
  if(e.cashBatchId){
    const batch=cashBatches.find(b=>b.id===e.cashBatchId);
    if(batch){
      h+='<div style="margin-top:6px;padding:8px 12px;background:rgba(124,58,237,.04);border-radius:8px;font-size:11px;border-left:3px solid #7c3aed">';
      h+='<b>Đợt TT #'+batch.id+'</b> | Tổng: '+fmtV(batch.total)+' | Người nhận: '+staffDisplayName(batch.recipient);
      h+=' | TT: '+(batch.status==='confirmed'?'<span style="color:var(--s)">Đã nhận ✓</span>':'<span style="color:#ea580c">Chờ xác nhận</span>');
      h+='</div>';
    }
  }
  // Lock info
  if(e.locked)h+=`<div style="background:rgba(15,23,42,.06);padding:8px 12px;border-radius:8px;font-size:11px;margin:6px 0;border-left:3px solid #1e293b"><b>🔐 Đơn đã khóa 已鎖定</b> — ${e.lockedBy||''} (${fmtDate(e.lockedDate||'')})<br><span style="color:var(--g500)">Chỉ Quản lý hoặc Boss mới có thể mở khóa và chỉnh sửa</span></div>`;

  h+='<div class="mact">';
  h+=`<button class="btn btn-o" onclick="closeM('approveModal')">Đóng 關閉</button>`;
  // If locked and not manager/boss, no action buttons
  if(e.locked&&!isMgr()&&!isBoss()){h+='</div>';document.getElementById('amBody').innerHTML=h;document.getElementById('approveModal').classList.add('show');return;}
  // Draft: anyone can send for approval
  if(e.status==='draft')h+=`<button class="btn btn-p" onclick="chgSt(${id},'pending')">Gửi duyệt 送審</button>`;
  // Submit receipt
  // Nộp phiếu đã được tích hợp vào "Gửi duyệt" — không cần nút riêng
  // Pending: accountant/manager/boss can approve
  if(e.status==='pending'&&canApprove()){h+=`<button class="btn btn-d" onclick="rejectItem(${id})">Từ chối</button><button class="btn btn-s" onclick="chgSt(${id},'approved')">Phê duyệt 批准</button><button class="btn" style="background:rgba(5,150,105,.06);color:#0d9488;border:1px solid rgba(5,150,105,.15)" onclick="prepaidItem(${id})">💵 Duyệt + chi trả trước</button>`;}
  if(e.status==='pending'&&!canApprove())h+=`<span style="font-size:11px;color:var(--w);padding:4px 8px">Đang chờ duyệt...</span>`;
  // Approved: manager/boss can make voucher
  if(e.status==='approved'&&canManageVoucher()){h+=`<div class="fg" style="margin:0"><input type="date" id="vDateIn" value="${new Date().toISOString().slice(0,10)}" style="padding:5px;border:1px solid var(--g300);border-radius:5px;font-size:12px"/></div><button class="btn btn-p" onclick="makeVoucher(${id})">Nộp về công ty 提交公司</button>`;}
  // Voucher: Boss can approve order (duyệt lệnh)
  if(e.status==='voucher'&&canBossApprove()){h+=`<button class="btn btn-d" onclick="returnItem(${id})">Trả lại</button><button class="btn btn-w" style="background:rgba(217,119,6,.06);color:#b45309;border:1px solid rgba(217,119,6,.15)" onclick="bossApproveItem(${id})">Duyệt lệnh 批令</button>`;}
  if(e.status==='voucher'&&canManageVoucher()&&!canBossApprove()){h+=`<span style="font-size:11px;color:var(--w);padding:4px 8px">Chờ Boss duyệt lệnh...</span>`;}
  // Boss approved: KT Trưởng can pay
  if(e.status==='boss_approved'&&canPayment()){h+=`<button class="btn btn-d" onclick="kttReturnItem(${id})">↩ Trả lại đơn</button><button class="btn btn-s" onclick="completePay(${id})">Đã Chuyển khoản 已轉帳</button>`;}
  if(e.status==='boss_approved'&&!canPayment())h+=`<span style="font-size:11px;color:var(--w);padding:4px 8px">Chờ KT Trưởng chi tiền...</span>`;
  // Cashier review: thủ quỹ can approve or reject
  if(e.status==='cashier_review'&&canCashPay()){h+=`<button class="btn btn-d" onclick="cashierRejectItem(${id})">Trả lại đơn</button><button class="btn" style="background:rgba(124,58,237,.06);color:#7c3aed;border:1px solid rgba(124,58,237,.15)" onclick="cashierApproveItem(${id})">💰 Chi tiền mặt</button>`;}
  if(e.status==='cashier_review'&&!canCashPay()){h+=`<span style="font-size:11px;color:#7c3aed;padding:4px 8px">Đang chờ Thủ quỹ kiểm tra...</span>`;}
  // Cash disbursed: người nhận (quản lý) xác nhận đã nhận tiền
  if(e.status==='cash_disbursed'){
    h+=`<div style="background:rgba(5,150,105,.05);padding:8px 12px;border-radius:8px;font-size:11px;margin:6px 0;border-left:3px solid rgba(5,150,105,.3)"><b>Đã chi tiền mặt</b> bởi ${e.cashDisbursedBy||'--'} ngày ${e.cashDisbursedDate||'--'}</div>`;
    if(isMgr())h+=`<button class="btn btn-s" onclick="confirmCashReceived(${id})">✓ Xác nhận đã nhận tiền</button>`;
    else h+=`<span style="font-size:11px;color:#059669;padding:4px 8px">Chờ quản lý xác nhận nhận tiền...</span>`;
  }
  // Paid: manager/boss can confirm advance repayment
  if(e.status==='paid'&&e.payer==='NV tạm ứng'&&!e.advPaid&&isMgr()){h+=`<button class="btn btn-w" onclick="confirmAdvPaid(${id})">Xác nhận hoàn trả NV</button>`;}
  if(e.status==='rejected')h+=`<button class="btn btn-p" onclick="chgSt(${id},'draft')">Làm lại</button>`;
  // Thu hồi: anyone can request (except draft/paid/recall_pending)
  if(e.status!=='draft'&&e.status!=='paid'&&e.status!=='recall_pending')h+=`<button class="btn" style="background:rgba(234,88,12,.08);color:#c2410c;border:1px solid rgba(234,88,12,.12)" onclick="requestRecall(${id})">↩️ Thu hồi 撤回</button>`;
  // Lock/Unlock
  if(e.status==='paid'&&!e.locked&&(isAccountant()||isMgr()||isBoss()))h+=`<button class="btn" style="background:rgba(15,23,42,.06);color:#1e293b;border:1px solid rgba(15,23,42,.15)" onclick="lockItem(${id})">🔐 Khóa đơn 鎖定</button>`;
  if(e.locked&&(isMgr()||isBoss()))h+=`<button class="btn" style="background:rgba(100,116,139,.06);color:#64748b;border:1px solid rgba(100,116,139,.15)" onclick="unlockItem(${id})">🔓 Mở khóa 解鎖</button>`;
  // Recall pending: show info + approve/reject for manager
  if(e.status==='recall_pending'){
    h+=`<div style="background:rgba(234,88,12,.05);padding:8px 12px;border-radius:8px;font-size:11px;margin:6px 0;border-left:3px solid rgba(234,88,12,.3)"><b>Yêu cầu thu hồi</b><br>Lý do: ${e.recallReason||'--'}<br>Người yêu cầu: ${e.recallBy||'--'} | Ngày: ${e.recallDate||'--'}<br>Trạng thái trước: ${STATUS[e.recallPrevStatus]?STATUS[e.recallPrevStatus].l:(e.recallPrevStatus||'--')}</div>`;
    if(canApprove())h+=`<button class="btn btn-d" onclick="rejectRecall(${id})">Từ chối thu hồi</button><button class="btn btn-s" onclick="approveRecall(${id})">Duyệt thu hồi ✓</button>`;
    else h+=`<span style="font-size:11px;color:#ea580c;padding:4px 8px">Đang chờ quản lý duyệt thu hồi...</span>`;
  }
  h+='</div>';

  document.getElementById('amBody').innerHTML=h;
  document.getElementById('approveModal').classList.add('show');
}

function chgSt(id,ns){const e=items.find(x=>x.id===id);if(!e)return;if(e.locked&&!isMgr()&&!isBoss()){toast('Đơn đã khóa 🔐');return;}e.status=ns;const td=new Date().toISOString().slice(0,10);if(ns==='pending'){e.submitted=true;e.submittedDate=td;}if(ns==='approved')e.approvedDate=td;if(ns==='draft'){e.rejectedReason='';e.approvedDate='';e.voucherDate='';e.paidDate='';}e.paymentHistory=(e.paymentHistory||[]);const actMap={pending:'sent',approved:'approved',draft:'reset'};e.paymentHistory.push({action:actMap[ns]||ns,by:currentUser?currentUser.name:'',date:td,note:ns==='approved'?'Duyệt chi phí':ns==='pending'?'Gửi duyệt (kèm nộp phiếu)':'Trả về nháp'});closeM('approveModal');saveData();rerender();toast(ns==='draft'?'Đã trả về Nháp — chỉnh sửa rồi gửi duyệt lại':STATUS[ns].l);}
function rejectItem(id){const r=prompt('Lý do từ chối:');if(r===null)return;const e=items.find(x=>x.id===id);if(!e)return;e.status='rejected';e.rejectedReason=r;closeM('approveModal');saveLog('từ-chối',e.code+': '+r);rerender();toast('Đã từ chối');}
function makeVoucher(id){const d=document.getElementById('vDateIn')?.value;if(!d){toast('Chọn ngày');return;}const e=items.find(x=>x.id===id);if(!e)return;e.status='voucher';e.voucherDate=d;e.paymentHistory=(e.paymentHistory||[]);e.paymentHistory.push({action:'voucher',by:currentUser?currentUser.name:'',date:d,note:'Nộp về công ty'});closeM('approveModal');saveLog('lập-phiếu-chi',e.code+' '+fmtV(e.amount));rerender();toast('Đã lập phiếu');}
function completePay(id){const e=items.find(x=>x.id===id);if(!e)return;if(e.status!=='boss_approved'){toast('Chưa đủ điều kiện chi tiền');return;}e.status='paid';e.paidDate=new Date().toISOString().slice(0,10);e.paidBy=currentUser?currentUser.name:'';e.paymentHistory=(e.paymentHistory||[]);e.paymentHistory.push({action:'ck_paid',by:currentUser?currentUser.name:'',date:e.paidDate,note:'KT Trưởng đã chuyển khoản'});closeM('approveModal');saveData();rerender();toast('Đã chuyển khoản ✓');}
// KTT trả lại đơn (single)
function kttReturnItem(id){
  const r=prompt('Lý do trả lại đơn:');if(!r||!r.trim())return;
  const e=items.find(x=>x.id===id);if(!e)return;
  e.status='rejected';e.rejectedReason='[KTT trả lại] '+r.trim();
  e.paymentHistory=(e.paymentHistory||[]);
  e.paymentHistory.push({action:'ktt_returned',by:currentUser?currentUser.name:'',date:new Date().toISOString().slice(0,10),note:'KTT trả lại: '+r.trim()});
  closeM('approveModal');saveData();rerender();toast('KTT đã trả lại đơn');
}
// KTT batch trả lại đơn
function batchKttReturn(m){
  if(!canPayment())return;
  const sel=getSel(m).filter(e=>e.status==='boss_approved');
  if(!sel.length){toast('Chọn mục Boss đã duyệt cần trả lại');return;}
  const reason=prompt('Trả lại '+sel.length+' đơn.\n\nLý do trả lại:');
  if(!reason||!reason.trim())return;
  const today=new Date().toISOString().slice(0,10);
  sel.forEach(e=>{
    e.status='rejected';e.rejectedReason='[KTT trả lại] '+reason.trim();
    e.paymentHistory=(e.paymentHistory||[]);
    e.paymentHistory.push({action:'ktt_returned',by:currentUser?currentUser.name:'',date:today,note:'KTT trả lại: '+reason.trim()});
    e.selected=false;delete e._selCtx;
  });
  saveData();renderM(m);toast('KTT đã trả lại '+sel.length+' đơn');
}
function returnItem(id){const r=prompt('Lý do trả về:');if(!r||!r.trim())return;const e=items.find(x=>x.id===id);if(!e)return;e.status='rejected';e.rejectedReason='[Boss trả về] '+r.trim();e.paymentHistory=(e.paymentHistory||[]);e.paymentHistory.push({action:'boss_returned',by:currentUser?currentUser.name:'',date:new Date().toISOString().slice(0,10),note:'Boss trả về: '+r.trim()});closeM('approveModal');saveData();rerender();toast('Đã trả về');}
function confirmAdvPaid(id){if(!confirm('Xác nhận đã hoàn trả tiền tạm ứng cho nhân viên?'))return;const e=items.find(x=>x.id===id);if(!e)return;e.advPaid=true;closeM('approveModal');saveData();rerender();toast('Đã xác nhận hoàn trả');}

// ============ THU HỒI (Recall) ============
function requestRecall(id){
  const e=items.find(x=>x.id===id);if(!e)return;
  if(e.status==='draft'||e.status==='paid'||e.status==='recall_pending'){toast('Không thể thu hồi khoản này');return;}
  const reason=prompt('Lý do thu hồi:');if(!reason||!reason.trim())return;
  e.recallPrevStatus=e.status; // lưu trạng thái trước khi thu hồi
  e.status='recall_pending';
  e.recallReason=reason.trim();
  e.recallDate=new Date().toISOString().slice(0,10);
  e.recallBy=currentUser?currentUser.username:'';
  closeM('approveModal');saveData();rerender();toast('Đã gửi yêu cầu thu hồi — chờ quản lý duyệt');
}
function batchRecall(m){
  const sel=getSel(m).filter(e=>e.status!=='draft'&&e.status!=='paid'&&e.status!=='recall_pending');
  if(!sel.length){toast('Chọn mục cần thu hồi (không phải Nháp/Hoàn tất)');return;}
  const reason=prompt('Lý do thu hồi '+sel.length+' khoản:');if(!reason||!reason.trim())return;
  const today=new Date().toISOString().slice(0,10);
  sel.forEach(e=>{
    e.recallPrevStatus=e.status;e.status='recall_pending';e.recallReason=reason.trim();
    e.recallDate=today;e.recallBy=currentUser?currentUser.username:'';e.selected=false;delete e._selCtx;
  });
  saveData();renderM(m);toast('Đã gửi yêu cầu thu hồi '+sel.length+' khoản');
}
function approveRecall(id){
  if(!canApprove()){toast('Không có quyền duyệt thu hồi');return;}
  const e=items.find(x=>x.id===id);if(!e||e.status!=='recall_pending')return;
  e.status='draft';e.approvedDate='';e.voucherDate='';e.paidDate='';e.bossApprovedDate='';
  e.rejectedReason='';e.submitted=false;e.submittedDate='';
  closeM('approveModal');saveData();rerender();toast('Đã duyệt thu hồi — khoản trả về Nháp');
}
function rejectRecall(id){
  if(!canApprove()){toast('Không có quyền');return;}
  const e=items.find(x=>x.id===id);if(!e||e.status!=='recall_pending')return;
  e.status=e.recallPrevStatus||'pending'; // trả về trạng thái trước
  e.recallReason='';e.recallDate='';e.recallBy='';e.recallPrevStatus='';
  closeM('approveModal');saveData();rerender();toast('Đã từ chối thu hồi');
}
function batchApproveRecall(m){
  if(!canApprove()){toast('Không có quyền');return;}
  const sel=getSel(m).filter(e=>e.status==='recall_pending');
  if(!sel.length){toast('Chọn mục đang chờ thu hồi');return;}
  sel.forEach(e=>{
    e.status='draft';e.approvedDate='';e.voucherDate='';e.paidDate='';e.bossApprovedDate='';
    e.rejectedReason='';e.submitted=false;e.submittedDate='';e.selected=false;delete e._selCtx;
  });
  saveData();renderM(m);toast('Đã duyệt thu hồi '+sel.length+' khoản — trả về Nháp');
}


// ============ THỦ QUỸ (Cashier) ============
// Cashier: kiểm tra ok → chuyển sang cash_disbursed (đã chi tiền mặt)
function cashierApproveItem(id){
  if(!canCashPay()){toast('Không có quyền');return;}
  const e=items.find(x=>x.id===id);if(!e||e.status!=='cashier_review')return;
  e.status='cash_disbursed';e.cashDisbursedDate=new Date().toISOString().slice(0,10);
  e.cashDisbursedBy=currentUser?currentUser.name:'';
  e.paymentHistory=(e.paymentHistory||[]);
  e.paymentHistory.push({action:'cash_disbursed',by:currentUser?currentUser.name:'',date:new Date().toISOString().slice(0,10),note:'Thủ quỹ xác nhận chi tiền mặt'});
  closeM('approveModal');saveData();rerender();toast('Đã xác nhận chi tiền mặt ✓');
}
// Cashier: trả lại đơn → rejected with reason
function cashierRejectItem(id){
  if(!canCashPay()){toast('Không có quyền');return;}
  const reason=prompt('Lý do trả lại đơn:');if(!reason||!reason.trim())return;
  const e=items.find(x=>x.id===id);if(!e)return;
  e.status='rejected';e.rejectedReason='[Thủ quỹ trả lại] '+reason.trim();
  e.paymentHistory=(e.paymentHistory||[]);
  e.paymentHistory.push({action:'cashier_rejected',by:currentUser?currentUser.name:'',date:new Date().toISOString().slice(0,10),note:reason.trim()});
  closeM('approveModal');saveData();rerender();toast('Đã trả lại đơn');
}
// Batch cashier approve
function batchCashierApprove(m){
  if(!canCashPay())return;
  const sel=getSel(m).filter(e=>e.status==='cashier_review');
  if(!sel.length){toast('Chọn mục thủ quỹ cần duyệt');return;}
  const total=sel.reduce((s,e)=>s+e.amount,0);
  // Show recipient selection modal
  let h='<h3>💰 Tạo đợt thanh toán tiền mặt 建立現金支付批次</h3>';
  h+='<div style="font-size:12px;margin-bottom:12px">';
  h+='<div><b>Số phiếu:</b> '+sel.length+' khoản</div>';
  h+='<div><b>Tổng tiền:</b> <span style="color:var(--p);font-size:15px;font-weight:700">'+fmtV(total)+'</span></div>';
  h+='<div style="margin-top:8px"><b>Chi tiết:</b></div>';
  h+='<div style="max-height:150px;overflow-y:auto;font-size:10px;background:var(--g50);padding:6px;border-radius:6px;margin-top:4px">';
  sel.forEach(e=>{const s=STAFF.find(x=>x.code===e.staffCode);h+='<div>'+e.code+' | '+(s?s.name:e.staffCode)+' | '+e.type+' | '+fmtV(e.amount)+'</div>';});
  h+='</div></div>';
  h+='<div class="fg" style="margin-bottom:10px"><label>Người nhận tiền 收款人</label><select id="cashRecipient"><option value="">-- Chọn --</option>';
  // List managers and staff as possible recipients
  STAFF.forEach(s=>{h+='<option value="'+s.code+'">'+s.name+' '+s.cn+' ('+s.code+')</option>';});
  h+='</select></div>';
  h+='<div class="fg" style="margin-bottom:10px"><label>Ghi chú đợt thanh toán</label><input type="text" id="cashBatchNote" placeholder="Ghi chú (nếu có)"/></div>';
  h+='<div class="mact">';
  h+='<button class="btn btn-o" onclick="closeM(\'approveModal\')">Huỷ</button>';
  h+='<button class="btn" style="background:#7c3aed;color:#fff" onclick="createCashBatch(\''+m+'\')">💰 Xác nhận chi tiền</button>';
  h+='</div>';
  document.getElementById('amBody').innerHTML=h;
  document.getElementById('approveModal').classList.add('show');
}
function createCashBatch(m){
  const recipient=document.getElementById('cashRecipient').value;
  if(!recipient){toast('Chọn người nhận tiền');return;}
  const note=document.getElementById('cashBatchNote')?.value||'';
  const sel=getSel(m).filter(e=>e.status==='cashier_review');
  if(!sel.length){toast('Không có mục hợp lệ');return;}
  const today=new Date().toISOString().slice(0,10);
  const total=sel.reduce((s,e)=>s+e.amount,0);
  const batchId=cashBatchNextId++;
  const itemIds=sel.map(e=>e.id);
  // Create batch record
  cashBatches.push({
    id:batchId,date:today,itemIds:itemIds,total:total,
    recipient:recipient,note:note,
    disbursedBy:currentUser?currentUser.name:'',
    status:'disbursed', // disbursed → confirmed
    confirmedDate:'',confirmedBy:''
  });
  // Update items
  sel.forEach(e=>{
    e.status='cash_disbursed';e.cashDisbursedDate=today;
    e.cashDisbursedBy=currentUser?currentUser.name:'';
    e.cashBatchId=batchId;
    e.paymentHistory=(e.paymentHistory||[]);
    e.paymentHistory.push({action:'cash_disbursed',by:currentUser?currentUser.name:'',date:today,note:'Đợt TT #'+batchId+' → '+staffDisplayName(recipient)});
    e.selected=false;delete e._selCtx;
  });
  closeM('approveModal');saveData();renderM(m);
  toast('Đợt TT #'+batchId+': '+fmtV(total)+' → '+staffDisplayName(recipient));
}
// Batch cashier reject (trả lại đơn hàng loạt)
function batchCashierReject(m){
  if(!canCashPay())return;
  const sel=getSel(m).filter(e=>e.status==='cashier_review');
  if(!sel.length){toast('Chọn mục cần trả lại');return;}
  const reason=prompt('Trả lại '+sel.length+' đơn.\n\nLý do trả lại:');
  if(!reason||!reason.trim())return;
  const today=new Date().toISOString().slice(0,10);
  sel.forEach(e=>{
    e.status='rejected';e.rejectedReason='[Thủ quỹ trả lại] '+reason.trim();
    e.paymentHistory=(e.paymentHistory||[]);
    e.paymentHistory.push({action:'cashier_rejected',by:currentUser?currentUser.name:'',date:today,note:'TQ trả lại: '+reason.trim()});
    e.selected=false;delete e._selCtx;
  });
  saveData();renderM(m);toast('Đã trả lại '+sel.length+' đơn');
}

// Người nhận xác nhận đã nhận tiền mặt
function confirmCashReceived(id){
  const e=items.find(x=>x.id===id);if(!e||e.status!=='cash_disbursed')return;
  e.status='paid';e.paidDate=new Date().toISOString().slice(0,10);
  e.cashConfirmedBy=currentUser?currentUser.name:'';
  e.paymentHistory=(e.paymentHistory||[]);
  e.paymentHistory.push({action:'cash_confirmed',by:currentUser?currentUser.name:'',date:new Date().toISOString().slice(0,10),note:'Xác nhận đã nhận tiền mặt'});
  closeM('approveModal');saveData();rerender();toast('Đã xác nhận nhận tiền ✓');
}
// Confirm all items in a cash batch (Manager clicks "Đã nhận tiền" on batch card)
function confirmBatchReceived(batchId,m){
  const batch=cashBatches.find(b=>b.id===batchId);
  if(!batch){toast('Không tìm thấy đợt TT');return;}
  const bItems=batch.itemIds.map(id=>items.find(x=>x.id===id)).filter(Boolean);
  const pending=bItems.filter(it=>it.status==='cash_disbursed');
  if(!pending.length){toast('Đợt này đã được xác nhận');return;}
  if(!confirm('Xác nhận đã nhận '+pending.length+' khoản tiền mặt từ Đợt TT #'+batchId+'?\n\nTổng: '+fmtV(batch.total)))return;
  const today=new Date().toISOString().slice(0,10);
  pending.forEach(e=>{
    e.status='paid';e.paidDate=today;e.cashConfirmedBy=currentUser?currentUser.name:'';
    e.paymentHistory=(e.paymentHistory||[]);
    e.paymentHistory.push({action:'cash_confirmed',by:currentUser?currentUser.name:'',date:today,note:'Xác nhận nhận tiền Đợt #'+batchId});
  });
  // Update batch record
  const allConfirmed=batch.itemIds.every(id=>{const it=items.find(x=>x.id===id);return it&&it.status==='paid';});
  if(allConfirmed){batch.status='confirmed';batch.confirmedDate=today;batch.confirmedBy=currentUser?currentUser.name:'';}
  saveData();renderM(m);toast('Đã xác nhận nhận tiền Đợt #'+batchId+' ✓');
}
function batchConfirmCashReceived(m){
  const sel=getSel(m).filter(e=>e.status==='cash_disbursed');
  if(!sel.length){toast('Chọn mục cần xác nhận nhận tiền');return;}
  if(!confirm('Xác nhận đã nhận '+sel.length+' khoản tiền mặt?'))return;
  const today=new Date().toISOString().slice(0,10);
  const batchIds=new Set();
  sel.forEach(e=>{
    e.status='paid';e.paidDate=today;e.cashConfirmedBy=currentUser?currentUser.name:'';
    e.paymentHistory=(e.paymentHistory||[]);
    e.paymentHistory.push({action:'cash_confirmed',by:currentUser?currentUser.name:'',date:today,note:'Xác nhận đã nhận tiền mặt'});
    e.selected=false;delete e._selCtx;
    if(e.cashBatchId)batchIds.add(e.cashBatchId);
  });
  // Update batch records
  batchIds.forEach(bid=>{
    const batch=cashBatches.find(b=>b.id===bid);
    if(batch){
      // Check if all items in this batch are confirmed
      const allConfirmed=batch.itemIds.every(id=>{const it=items.find(x=>x.id===id);return it&&it.status==='paid';});
      if(allConfirmed){batch.status='confirmed';batch.confirmedDate=today;batch.confirmedBy=currentUser?currentUser.name:'';}
    }
  });
  saveData();renderM(m);toast('Đã xác nhận nhận '+sel.length+' khoản');
}

// ============ EDIT ============
function openEdit(id){
  const e=items.find(x=>x.id===id);if(!e)return;
  if(e.locked&&!isMgr()&&!isBoss()){toast('Đơn đã khóa 🔐 — chỉ QL/Boss mới chỉnh sửa được');return;}
  if(isStaff()&&e.staffCode!==currentUser.staffCode){toast('Không có quyền');return;}
  if(!isMgr()&&e.status!=='draft'){toast('Chỉ sửa được khoản ở trạng thái Nháp. Dùng "Thu hồi" nếu cần chỉnh sửa');return;}
  document.getElementById('eId').value=id;
  document.getElementById('eDate').value=e.date;
  document.getElementById('eType').innerHTML=catOpts();document.getElementById('eType').value=e.type;
  document.getElementById('eAmt').value=e.amount.toLocaleString('vi-VN');
  document.getElementById('ePaySt').value=e.payStatus||'Chưa chi';
  document.getElementById('ePerson').innerHTML=staffOpts();document.getElementById('ePerson').value=e.staffCode;
  document.getElementById('ePayer').value=e.payer||'Lập Nguyên';
  document.getElementById('eAdvRow').style.display=e.payer==='NV tạm ứng'?'':'none';
  document.getElementById('eAdvAmtRow').style.display=e.payer==='NV tạm ứng'?'':'none';
  document.getElementById('eAdvStaff').innerHTML=staffOpts();document.getElementById('eAdvStaff').value=e.advStaff||'';
  document.getElementById('eAdvAmt').value=e.advAmt?e.advAmt.toLocaleString('vi-VN'):'';
  document.getElementById('eMethod').value=e.method||'Tiền mặt';
  document.getElementById('eVat').value=e.vat||'Không';
  document.getElementById('eVatNumRow').style.display=e.vat==='Có'?'':'none';
  document.getElementById('eVatNum').value=e.vatNum||'';
  document.getElementById('eNote').value=e.note||'';
  document.getElementById('eNoteCn').value=e.noteCn||'';
  document.getElementById('eRemark').value=e.remark||'';
  document.getElementById('editModal').classList.add('show');
}
function saveEdit(){
  const id=parseInt(document.getElementById('eId').value);const e=items.find(x=>x.id===id);if(!e)return;
  e.date=document.getElementById('eDate').value;e.type=document.getElementById('eType').value;
  const cat=CATS.find(c=>c.vn===e.type);e.typeCn=cat?cat.cn:'';
  e.amount=parseAmt(document.getElementById('eAmt').value);e.payStatus=document.getElementById('ePaySt').value;
  e.staffCode=document.getElementById('ePerson').value;e.payer=document.getElementById('ePayer').value;
  e.advStaff=e.payer==='NV tạm ứng'?document.getElementById('eAdvStaff').value:'';
  e.advAmt=e.payer==='NV tạm ứng'?parseAmt(document.getElementById('eAdvAmt').value):0;
  e.method=document.getElementById('eMethod').value;e.vat=document.getElementById('eVat').value;
  e.vatNum=e.vat==='Có'?document.getElementById('eVatNum').value.trim():'';
  e.note=document.getElementById('eNote').value.trim();e.noteCn=document.getElementById('eNoteCn').value.trim();e.remark=(document.getElementById('eRemark').value||'').trim();
  closeM('editModal');saveLog('sửa-chi-phí',e.code+' '+e.type);rerender();toast('Đã cập nhật');
}

function rerender(){const at=document.querySelector('.tab.on');if(!at)return;if(at.dataset.tab==='overview')renderOverview();else if(at.dataset.tab.startsWith('m'))renderM(at.dataset.tab.slice(1));}

// ============ RENDER MONTH ============
// Toggle form card visibility
function toggleFormCard(m){
  const body=document.getElementById('formBody_'+m);
  const btn=document.getElementById('formToggleBtn_'+m);
  if(!body)return;
  if(body.style.display==='none'){body.style.display='';btn.textContent='\u25BC Ẩn';}
  else{body.style.display='none';btn.textContent='\u25B2 Mở';}
}
// Toggle hidden flag on an item (manager only)
function toggleHidden(id){
  if(!isMgr()){toast('Không có quyền');return;}
  const e=items.find(x=>x.id===id);if(!e)return;
  e.hidden=!e.hidden;
  saveData();rerender();
  toast(e.hidden?'Đã ẩn khỏi KT nội bộ':'Đã hiện cho KT nội bộ');
}
function batchToggleHidden(m,hide){
  if(!isMgr())return;
  const sel=getSel(m);if(!sel.length){toast('Chọn mục cần '+(hide?'ẩn':'hiện'));return;}
  sel.forEach(e=>{e.hidden=hide;e.selected=false;delete e._selCtx;});
  saveData();renderM(m);toast((hide?'Đã ẩn ':'Đã hiện ')+sel.length+' khoản');
}
// Toggle pending table checkboxes
function toggleAllMgrDraft(m,checked){
  const ym=getYear()+'-'+m;
  clearOtherCtxSel(m,'mgrDraft');
  items.filter(e=>e.date.startsWith(ym)&&e.status==='draft').forEach(e=>{e.selected=checked;if(checked)e._selCtx='mgrDraft';else delete e._selCtx;});
  renderM(m);
}
function toggleAllPend(m,checked){
  const ym=getYear()+'-'+m;
  clearOtherCtxSel(m,'pend');
  const pendStatuses=getPendingStatuses();
  applyRoleFilter(items.filter(e=>e.date.startsWith(ym)&&pendStatuses.includes(e.status))).forEach(e=>{e.selected=checked;if(checked)e._selCtx='pend';else delete e._selCtx;});
  renderM(m);
}
function toggleAllQSend(m,checked){
  const ym=getYear()+'-'+m;
  clearOtherCtxSel(m,'send');
  applyRoleFilter(items.filter(e=>e.date.startsWith(ym)&&e.status==='approved')).forEach(e=>{e.selected=checked;if(checked)e._selCtx='send';else delete e._selCtx;});
  renderM(m);
}
function toggleAllQBoss(m,checked){
  const ym=getYear()+'-'+m;
  clearOtherCtxSel(m,'boss');
  applyRoleFilter(items.filter(e=>e.date.startsWith(ym)&&e.status==='voucher')).forEach(e=>{e.selected=checked;if(checked)e._selCtx='boss';else delete e._selCtx;});
  renderM(m);
}
function toggleAllQPay(m,checked){
  const ym=getYear()+'-'+m;
  clearOtherCtxSel(m,'pay');
  applyRoleFilter(items.filter(e=>e.date.startsWith(ym)&&['boss_approved','cashier_review','cash_disbursed'].includes(e.status))).forEach(e=>{e.selected=checked;if(checked)e._selCtx='pay';else delete e._selCtx;});
  renderM(m);
}
function toggleAllQConfirm(m,checked){
  const ym=getYear()+'-'+m;
  clearOtherCtxSel(m,'confirm');
  applyRoleFilter(items.filter(e=>e.date.startsWith(ym)&&e.status==='cash_disbursed'&&e.method==='Tiền mặt')).forEach(e=>{e.selected=checked;if(checked)e._selCtx='confirm';else delete e._selCtx;});
  renderM(m);
}
// Accountant/Staff: toggle all in a specific queue panel
function toggleAllAcctQ(m,queue,checked){
  const ym=getYear()+'-'+m;
  const allM=isStaff()
    ?items.filter(e=>e.date.startsWith(ym)&&e.staffCode===currentUser.staffCode)
    :items.filter(e=>e.date.startsWith(ym)&&!e.hidden&&!e.createdByManager);
  let filtered=[];
  if(queue==='acctDraft')filtered=allM.filter(e=>e.status==='draft');
  else if(queue==='acctPend')filtered=allM.filter(e=>['draft','pending','approved'].includes(e.status));
  else if(queue==='acctBoss')filtered=allM.filter(e=>e.status==='voucher');
  else if(queue==='acctCk')filtered=allM.filter(e=>e.status==='boss_approved'&&e.method!=='Tiền mặt');
  else if(queue==='acctCash')filtered=allM.filter(e=>['cashier_review','cash_disbursed'].includes(e.status)||(e.status==='boss_approved'&&e.method==='Tiền mặt'));
  clearOtherCtxSel(m,queue);
  filtered.forEach(e=>{e.selected=checked;if(checked)e._selCtx=queue;else delete e._selCtx;});
  renderM(m);
}
function getPendingStatuses(){
  if(isManager()&&!isBoss())return ['pending'];
  if(isBoss())return ['voucher'];
  if(isCashier())return ['cashier_review'];
  if(isChiefAccountant())return ['boss_approved'];
  return [];
}

// ============ LOCK/UNLOCK ============
function lockItem(id){
  const e=items.find(x=>x.id===id);if(!e)return;
  if(e.locked){toast('Đơn đã khóa rồi');return;}
  e.locked=true;e.lockedBy=currentUser?currentUser.name:'';e.lockedDate=new Date().toISOString().slice(0,10);
  e.paymentHistory=(e.paymentHistory||[]);
  e.paymentHistory.push({action:'locked',by:currentUser?currentUser.name:'',date:e.lockedDate,note:'Khóa đơn'});
  closeM('approveModal');saveData();rerender();toast('Đã khóa đơn 🔐');
}
function unlockItem(id){
  if(!isMgr()&&!isBoss()){toast('Chỉ Quản lý hoặc Boss mới có thể mở khóa');return;}
  const e=items.find(x=>x.id===id);if(!e||!e.locked)return;
  e.locked=false;
  e.paymentHistory=(e.paymentHistory||[]);
  e.paymentHistory.push({action:'unlocked',by:currentUser?currentUser.name:'',date:new Date().toISOString().slice(0,10),note:'Mở khóa đơn'});
  closeM('approveModal');saveData();rerender();toast('Đã mở khóa đơn 🔓');
}
function batchLock(m){
  const sel=getSel(m).filter(e=>e.status==='paid'&&!e.locked);
  if(!sel.length){toast('Không có đơn hoàn tất chưa khóa nào được chọn');return;}
  if(!confirm('Khóa '+sel.length+' đơn? Sau khi khóa không thể chỉnh sửa'))return;
  const td=new Date().toISOString().slice(0,10);
  sel.forEach(e=>{e.locked=true;e.lockedBy=currentUser?currentUser.name:'';e.lockedDate=td;e.paymentHistory=(e.paymentHistory||[]);e.paymentHistory.push({action:'locked',by:currentUser?currentUser.name:'',date:td,note:'Khóa đơn (hàng loạt)'});e.selected=false;delete e._selCtx;});
  saveData();renderM(m);toast('Đã khóa '+sel.length+' đơn 🔐');
}
function batchUnlock(m){
  if(!isMgr()&&!isBoss()){toast('Chỉ QL/Boss mới mở khóa được');return;}
  const sel=getSel(m).filter(e=>e.locked);
  if(!sel.length){toast('Không có đơn đã khóa nào được chọn');return;}
  if(!confirm('Mở khóa '+sel.length+' đơn?'))return;
  const td=new Date().toISOString().slice(0,10);
  sel.forEach(e=>{e.locked=false;e.paymentHistory=(e.paymentHistory||[]);e.paymentHistory.push({action:'unlocked',by:currentUser?currentUser.name:'',date:td,note:'Mở khóa (hàng loạt)'});e.selected=false;delete e._selCtx;});
  saveData();renderM(m);toast('Đã mở khóa '+sel.length+' đơn 🔓');
}
// ============ CHANGE PAY STATUS ============
function changePayStatus(id,newStatus){
  const e=items.find(x=>x.id===id);if(!e)return;
  if(e.locked&&!isMgr()&&!isBoss()){toast('Đơn đã khóa, không thể thay đổi');return;}
  e.payStatus=newStatus;
  saveData();rerender();toast('Đã cập nhật TT thanh toán → '+newStatus);
}
function batchChangePayStatus(m,newStatus){
  const sel=getSel(m).filter(e=>e.payStatus==='Chưa chi'&&!e.locked);
  if(!sel.length){toast('Không có đơn "Chưa chi" nào được chọn');return;}
  if(!confirm('Đổi TT thanh toán '+sel.length+' đơn → '+newStatus+'?'))return;
  sel.forEach(e=>{e.payStatus=newStatus;e.selected=false;delete e._selCtx;});
  saveData();renderM(m);toast('Đã cập nhật '+sel.length+' đơn → '+newStatus);
}
function clearFilters(m){
  ['fltType_','fltSt_','fltPay_','fltPayer_','fltSub_','fltStaff_'].forEach(f=>{const el=document.getElementById(f+m);if(el)el.value='';});
  ['fltQ_','fltDateFrom_','fltDateTo_'].forEach(f=>{const el=document.getElementById(f+m);if(el)el.value='';});
  renderM(m);
}
function renderM(m){
  const year=getYear(),ym=year+'-'+m;
  let mI=applyRoleFilter(items.filter(e=>e.date.startsWith(ym)));

  // Budget KPI cards
  const budget=budgets[ym],total=mI.reduce((s,e)=>s+e.amount,0);
  const kBudget=document.getElementById('kBudget_'+m);
  const kSpent=document.getElementById('kSpent_'+m);
  const kRemain=document.getElementById('kRemain_'+m);
  const bf=document.getElementById('bf_'+m);
  if(kBudget){kBudget.textContent=budget?fmtV(budget):'--';}
  if(kSpent){kSpent.textContent=fmtV(total);}
  const kSpentCnt=document.getElementById('kSpentCnt_'+m);
  if(kSpentCnt)kSpentCnt.textContent=mI.length+' khoản';
  if(kRemain&&bf){
    if(budget){const r=budget-total;kRemain.textContent=fmtV(Math.abs(r))+(r<0?' (vượt!)':'');kRemain.style.color=r<0?'var(--d)':'var(--s)';const p=Math.min(total/budget*100,100);bf.style.width=p+'%';bf.className='bfill '+(total/budget<.7?'ok':total/budget<1?'wn':'ov');}
    else{kRemain.textContent='--';bf.style.width='0%';}
  }

  // === RENDER QUEUE TABLES ===
  const _isManagerOnly=isManager()&&!isBoss();
  let _currentQCtx='pend';
  const _queueRowFn=function(e,i){
    const ds=fmtDate(e.date);
    const staff=STAFF.find(s=>s.code===e.staffCode);
    let st=STATUS[e.status]||STATUS.draft;
    // Boss view: voucher → "Chờ duyệt"
    if(isBoss()&&e.status==='voucher')st={l:'Chờ duyệt',c:'st-pending'};
    // Manager view: cash_disbursed in queue → "TQ đã chi" tag
    if(_isManagerOnly&&e.status==='cash_disbursed')st={l:'TQ đã chi 💰',c:'st-cash-disbursed'};
    // Workflow date tag (ngày nộp/duyệt/lập phiếu)
    let wfDate='';
    if(e.submittedDate)wfDate='<div style="font-size:8px;color:#7c3aed;margin-top:1px">Nộp: '+fmtDate(e.submittedDate)+'</div>';
    if(e.approvedDate)wfDate+='<div style="font-size:8px;color:#059669;margin-top:1px">Duyệt: '+fmtDate(e.approvedDate)+'</div>';
    if(e.voucherDate)wfDate+='<div style="font-size:8px;color:#4f46e5;margin-top:1px">Nộp CT: '+fmtDate(e.voucherDate)+'</div>';
    if(e.paidDate)wfDate+='<div style="font-size:8px;color:#059669;margin-top:1px">Chi: '+fmtDate(e.paidDate)+'</div>';
    const prepaidTag=e.prepaid?'<div style="margin-top:3px;background:rgba(5,150,105,.06);color:#059669;padding:3px 8px;border-radius:6px;font-size:9px;font-weight:700;border:1px solid rgba(5,150,105,.15)">💵 QL đã ứng<br><span style="font-weight:500">'+e.prepaidBy+' — '+fmtDate(e.prepaidDate)+'</span></div>':'';
    const qAdvObj=e.payer==='NV tạm ứng'&&e.advStaff?STAFF.find(s=>s.code===e.advStaff):null;
    const qAdvTag=e.payer==='NV tạm ứng'?'<div style="margin-top:3px;background:'+(e.advPaid?'rgba(16,185,129,.15)':'rgba(251,191,36,.15)')+';color:'+(e.advPaid?'#34d399':'#fbbf24')+';padding:3px 8px;border-radius:6px;font-size:9px;font-weight:600;border:1px solid '+(e.advPaid?'rgba(110,231,183,.3)':'rgba(252,211,77,.3)')+'">💰 TƯ: '+(qAdvObj?qAdvObj.name:e.advStaff)+' | '+fmtV(e.advAmt||0)+(e.advPaid?' ✓':' ✗')+'</div>':'';
    return '<tr style="cursor:pointer" onclick="if(!event.target.closest(\'input,button,.bi,.st\')){openApproval('+e.id+')}">'+
      '<td><input type="checkbox" '+(e.selected&&e._selCtx===_currentQCtx?'checked':'')+' onchange="event.stopPropagation();toggleOne('+e.id+',\''+_currentQCtx+'\')"/></td>'+
      '<td style="text-align:center;color:var(--g400);font-size:10px">'+(i+1)+'</td>'+
      '<td style="font-size:10px;font-weight:500">'+(e.code||'')+'</td>'+
      '<td style="font-size:10px">'+ds+wfDate+'</td>'+
      '<td><span style="font-size:10px">'+e.type+'</span><br><span style="font-size:9px;color:var(--g400)">'+(e.typeCn||'')+'</span></td>'+
      '<td style="font-size:10px;max-width:200px;white-space:normal;word-break:break-word">'+(e.note||'')+prepaidTag+qAdvTag+'</td>'+
      '<td class="amt">'+fmtV(e.amount)+'</td>'+
      '<td style="font-size:9px"><span style="padding:1px 5px;border-radius:4px;background:'+(e.method==='Tiền mặt'?'rgba(217,119,6,.06)':'rgba(37,99,235,.08)')+';color:'+(e.method==='Tiền mặt'?'#b45309':'#2563eb')+'">'+(e.method==='Tiền mặt'?'TM':'CK')+'</span></td>'+
      '<td style="font-size:10px">'+(staff?staff.name:e.staffCode)+'</td>'+
      '<td style="text-align:center">'+(e.attachments&&e.attachments.length?'<span style="font-size:11px;cursor:pointer" title="'+e.attachments.length+' file đính kèm 附件" onclick="event.stopPropagation();previewAttachments('+e.id+')">📎<span style="font-size:8px;color:var(--p);font-weight:700">'+e.attachments.length+'</span></span>':'')+'</td>'+
      '<td><span class="st '+st.c+'" onclick="event.stopPropagation();openApproval('+e.id+')">'+st.l+'</span></td>'+
      '<td style="white-space:nowrap">'+(e.status==='draft'?'<button class="bi" title="Chỉnh sửa 編輯" onclick="event.stopPropagation();openEdit('+e.id+')">✏️</button><button class="bi" title="In phiếu chi 列印" onclick="event.stopPropagation();printItem('+e.id+')">🖨️</button>':'')+'<button class="bi" onclick="event.stopPropagation();openApproval('+e.id+')">👁</button></td></tr>';
  };
  const _readOnlyRowFn=function(e,i){
    const ds=fmtDate(e.date);
    const staff=STAFF.find(s=>s.code===e.staffCode);
    let st=STATUS[e.status]||STATUS.draft;
    // Workflow date tag
    let wfDate='';
    if(e.submittedDate)wfDate+='<div style="font-size:8px;color:#7c3aed;margin-top:1px">Nộp: '+fmtDate(e.submittedDate)+'</div>';
    if(e.approvedDate)wfDate+='<div style="font-size:8px;color:#059669;margin-top:1px">Duyệt: '+fmtDate(e.approvedDate)+'</div>';
    if(e.voucherDate)wfDate+='<div style="font-size:8px;color:#4f46e5;margin-top:1px">Nộp CT: '+fmtDate(e.voucherDate)+'</div>';
    const prepaidTag=e.prepaid?'<div style="margin-top:3px;background:rgba(5,150,105,.06);color:#059669;padding:3px 8px;border-radius:6px;font-size:9px;font-weight:700;border:1px solid rgba(5,150,105,.15)">💵 QL đã ứng<br><span style="font-weight:500">'+e.prepaidBy+' — '+fmtDate(e.prepaidDate)+'</span></div>':'';
    const qAdvObj=e.payer==='NV tạm ứng'&&e.advStaff?STAFF.find(s=>s.code===e.advStaff):null;
    const qAdvTag=e.payer==='NV tạm ứng'?'<div style="margin-top:3px;background:'+(e.advPaid?'rgba(16,185,129,.15)':'rgba(251,191,36,.15)')+';color:'+(e.advPaid?'#34d399':'#fbbf24')+';padding:3px 8px;border-radius:6px;font-size:9px;font-weight:600;border:1px solid '+(e.advPaid?'rgba(110,231,183,.3)':'rgba(252,211,77,.3)')+'">💰 TƯ: '+(qAdvObj?qAdvObj.name:e.advStaff)+' | '+fmtV(e.advAmt||0)+(e.advPaid?' ✓':' ✗')+'</div>':'';
    return '<tr style="cursor:pointer" onclick="openApproval('+e.id+')">'+
      '<td style="text-align:center;color:var(--g400);font-size:10px">'+(i+1)+'</td>'+
      '<td style="font-size:10px;font-weight:500">'+(e.code||'')+'</td>'+
      '<td style="font-size:10px">'+ds+wfDate+'</td>'+
      '<td><span style="font-size:10px">'+e.type+'</span><br><span style="font-size:9px;color:var(--g400)">'+(e.typeCn||'')+'</span></td>'+
      '<td style="font-size:10px;max-width:200px;white-space:normal;word-break:break-word">'+(e.note||'')+prepaidTag+qAdvTag+'</td>'+
      '<td class="amt">'+fmtV(e.amount)+'</td>'+
      '<td style="font-size:9px"><span style="padding:1px 5px;border-radius:4px;background:'+(e.method==='Tiền mặt'?'rgba(217,119,6,.06)':'rgba(37,99,235,.08)')+';color:'+(e.method==='Tiền mặt'?'#b45309':'#2563eb')+'">'+(e.method==='Tiền mặt'?'TM':'CK')+'</span></td>'+
      '<td style="font-size:10px">'+(staff?staff.name:e.staffCode)+'</td>'+
      '<td style="text-align:center">'+(e.attachments&&e.attachments.length?'<span style="font-size:11px;cursor:pointer" title="'+e.attachments.length+' file đính kèm 附件" onclick="event.stopPropagation();previewAttachments('+e.id+')">📎<span style="font-size:8px;color:var(--p);font-weight:700">'+e.attachments.length+'</span></span>':'')+'</td>'+
      '<td><span class="st '+st.c+'">'+st.l+'</span></td>'+
      '<td><button class="bi" onclick="event.stopPropagation();openApproval('+e.id+')">👁</button></td></tr>';
  };
  function _fillQueueTable(tbId,emptyId,cntId,totalId,fcId,arr,searchKey,readOnly){
    // Sort: newest first (by date desc, then id desc)
    arr=arr.slice().sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id);
    // Apply search filter if searchKey provided
    const sq=(document.getElementById('qSearch_'+searchKey+'_'+m)?.value||'').toLowerCase();
    if(sq)arr=arr.filter(e=>(e.code||'').toLowerCase().includes(sq)||(e.note||'').toLowerCase().includes(sq));
    const tb=document.getElementById(tbId+'_'+m);
    const em=document.getElementById(emptyId+'_'+m);
    const cnt=document.getElementById(cntId+'_'+m);
    if(cnt)cnt.textContent=arr.length?arr.length:'0';
    if(tb){
      if(!arr.length){tb.innerHTML='';if(em)em.style.display='';}
      else{if(em)em.style.display='none';_currentQCtx=searchKey;tb.innerHTML=arr.map(readOnly?_readOnlyRowFn:_queueRowFn).join('');}
    }
    const t=document.getElementById(totalId+'_'+m);if(t)t.textContent=fmtV(arr.reduce((s,e)=>s+e.amount,0));
    const f=document.getElementById(fcId+'_'+m);if(f)f.textContent=arr.length+' khoản';
  }

  // === ACCOUNTANT/STAFF: 5 workflow tabs ===
  if(isAccountant()||isStaff()){
    // Staff: only own items; Accountant: all items except hidden/manager-created
    const acctAll=isStaff()
      ?items.filter(e=>e.date.startsWith(ym)&&e.staffCode===currentUser.staffCode)
      :items.filter(e=>e.date.startsWith(ym)&&!e.hidden&&!e.createdByManager);
    // Tab 1: Nháp = draft only
    const acctDraft=acctAll.filter(e=>e.status==='draft');
    _fillQueueTable('acctDraftTb','acctDraftEmpty','acctDraftCnt','acctDraftTotal','acctDraftFc',acctDraft,'acctDraft');
    // Tab 2: Chờ QL duyệt = pending + approved
    const acctMgr=acctAll.filter(e=>['pending','approved'].includes(e.status));
    _fillQueueTable('acctMgrTb','acctMgrEmpty','acctMgrCnt','acctMgrTotal','acctMgrFc',acctMgr,'acctMgr',true);
    // Tab 3: Chờ Boss duyệt = voucher
    const acctBoss=acctAll.filter(e=>e.status==='voucher');
    _fillQueueTable('acctBossTb','acctBossEmpty','acctBossCnt','acctBossTotal','acctBossFc',acctBoss,'acctBoss',true);
    // Tab 4: Chờ KT chuyển khoản = boss_approved + method CK
    const acctCk=acctAll.filter(e=>e.status==='boss_approved'&&e.method!=='Tiền mặt');
    _fillQueueTable('acctCkTb','acctCkEmpty','acctCkCnt','acctCkTotal','acctCkFc',acctCk,'acctCk',true);
    // Tab 5: Chờ chi tiền mặt = cashier_review + cash_disbursed + boss_approved TM
    const acctCash=acctAll.filter(e=>['cashier_review','cash_disbursed'].includes(e.status)||(e.status==='boss_approved'&&e.method==='Tiền mặt'));
    _fillQueueTable('acctCashTb','acctCashEmpty','acctCashCnt','acctCashTotal','acctCashFc',acctCash,'acctCash',true);
    // Restore active tab
    _restoreAQTab(m);
  }

  if(_isManagerOnly){
    // Manager Tab 0: Nháp (draft) — chi phí do manager tạo, chưa gửi duyệt
    const mgrDrafts=mI.filter(e=>e.status==='draft');
    _fillQueueTable('mgrDraftTb','mgrDraftTbEmpty','mgrDraftCnt','mgrDraftTotal','mgrDraftFc',mgrDrafts,'mgrDraft');
    const mgrDraftCntEl=document.getElementById('mgrDraftCnt_'+m);if(mgrDraftCntEl)mgrDraftCntEl.textContent=mgrDrafts.length||'0';
    // Manager Tab 1: Chờ xử lý (pending)
    _fillQueueTable('pendTb','pendTbEmpty','pendCnt','pendTotal','pendFc',mI.filter(e=>e.status==='pending'),'pend');
    // Manager Tab 2: Gửi về công ty (approved)
    _fillQueueTable('qSendTb','qSendTbEmpty','qSendCnt','qSendTotal','qSendFc',mI.filter(e=>e.status==='approved'),'send');
    // Manager Tab 3: Chờ Boss duyệt (voucher)
    _fillQueueTable('qBossTb','qBossTbEmpty','qBossCnt','qBossTotal','qBossFc',mI.filter(e=>e.status==='voucher'),'boss');
    // Manager Tab 4: Chờ chi trả (boss_approved, cashier_review, cash_disbursed)
    _fillQueueTable('qPayTb','qPayTbEmpty','qPayCnt','qPayTotal','qPayFc',mI.filter(e=>['boss_approved','cashier_review','cash_disbursed'].includes(e.status)),'pay');
    // Manager: Cash batch summary (inside tab)
    const mgrCBDiv=document.getElementById('mgrCashBatchSummary_'+m);
    const mgrCBCnt=document.getElementById('mgrCashBatchCnt_'+m);
    if(mgrCBDiv){
      const mgrBatches=cashBatches.filter(b=>b.itemIds.some(id=>{const it=items.find(x=>x.id===id);return it&&it.date.startsWith(year+'-'+m);}));
      // Count only pending (unconfirmed) batches for tab badge
      const pendingBatches=mgrBatches.filter(b=>{const bIt=b.itemIds.map(id=>items.find(x=>x.id===id)).filter(Boolean);return !bIt.every(it=>it.status==='paid');});
      if(mgrCBCnt)mgrCBCnt.textContent=pendingBatches.length||'0';
      if(!mgrBatches.length){mgrCBDiv.innerHTML='<div class="empty">Chưa có đợt thanh toán tiền mặt</div>';}
      else{
        // Compact table with expandable detail rows
        let cbH='<table style="width:100%;font-size:11px"><thead><tr>'+
          '<th style="width:30px"></th><th>Đợt</th><th>Ngày</th><th>Người chi</th><th>Người nhận</th><th style="text-align:center">SL</th><th style="text-align:right">Tổng tiền</th><th style="text-align:center">Trạng thái</th><th style="width:100px"></th>'+
          '</tr></thead><tbody>';
        mgrBatches.forEach(b=>{
          const bItems=b.itemIds.map(id=>items.find(x=>x.id===id)).filter(Boolean);
          const allConfirmed=bItems.every(it=>it.status==='paid');
          const stTag=allConfirmed?'<span style="color:#059669;font-weight:700;font-size:10px">✓ Hoàn tất</span>':'<span style="color:#b45309;font-weight:700;font-size:10px">⏳ Chờ</span>';
          const confirmBtn=!allConfirmed?'<button class="btn btn-sm" style="background:rgba(5,150,105,.06);color:#059669;border:1px solid rgba(5,150,105,.15);font-size:9px;padding:3px 8px" onclick="event.stopPropagation();confirmBatchReceived('+b.id+',\''+m+'\')">✓ Đã nhận</button>':'';
          cbH+='<tr style="cursor:pointer;border-bottom:1px solid var(--g200)" onclick="const d=document.getElementById(\'cbDet_'+b.id+'_'+m+'\');d.style.display=d.style.display===\'none\'?\'table-row\':\'none\'">'+
            '<td style="color:#7c3aed;font-weight:800">▸</td>'+
            '<td style="font-weight:700;color:#7c3aed">#'+b.id+'</td>'+
            '<td>'+fmtDate(b.date)+'</td>'+
            '<td>'+(b.disbursedBy||'--')+'</td>'+
            '<td>'+staffDisplayName(b.recipient)+'</td>'+
            '<td style="text-align:center;font-weight:700">'+bItems.length+'</td>'+
            '<td class="amt" style="font-weight:800;color:#7c3aed">'+fmtV(b.total)+'</td>'+
            '<td style="text-align:center">'+stTag+'</td>'+
            '<td style="text-align:center">'+confirmBtn+'</td>'+
            '</tr>';
          // Expandable detail row
          cbH+='<tr id="cbDet_'+b.id+'_'+m+'" style="display:none"><td colspan="9" style="padding:8px 12px;background:rgba(124,58,237,.04)">'+
            '<div style="font-size:10px;margin-bottom:4px;color:#7c3aed">'+(b.note?'📝 '+b.note:'')+'</div>'+
            '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:4px">'+
            bItems.map(it=>{
              const itSt=it.status==='paid'?'✓':'⏳';
              return '<div style="background:rgba(124,58,237,.04);border:1px solid rgba(124,58,237,.12);border-radius:4px;padding:4px 6px;font-size:9px;display:flex;justify-content:space-between">'+
                '<span>'+(it.code||'')+' — '+(it.note||'').substring(0,25)+' '+itSt+'</span>'+
                '<b style="color:#7c3aed">'+fmtV(it.amount)+'</b></div>';
            }).join('')+
            '</div></td></tr>';
        });
        cbH+='</tbody></table>';
        mgrCBDiv.innerHTML=cbH;
      }
    }
    // Restore active tab
    _restoreQTab(m);
  } else {
    // Boss/TQ/KTT: single pending table
    const pendStatuses=getPendingStatuses();
    _fillQueueTable('pendTb','pendEmpty','pendCnt','pendTotal','pendFc',mI.filter(e=>pendStatuses.includes(e.status)),'pend');
  }

  // Render rejected table (TQ/KTT only)
  const rejTb=document.getElementById('rejTb_'+m);
  const rejEmpty=document.getElementById('rejEmpty_'+m);
  const rejCnt=document.getElementById('rejCnt_'+m);
  if(rejTb){
    const rejItems=mI.filter(e=>e.status==='rejected');
    if(rejCnt)rejCnt.textContent=rejItems.length?rejItems.length:'0';
    if(!rejItems.length){rejTb.innerHTML='';if(rejEmpty)rejEmpty.style.display='';}
    else{
      if(rejEmpty)rejEmpty.style.display='none';
      rejTb.innerHTML=rejItems.map((e,i)=>{
        const ds=fmtDate(e.date);
        const staff=STAFF.find(s=>s.code===e.staffCode);
        return '<tr style="cursor:pointer" onclick="openApproval('+e.id+')">'+
          '<td style="text-align:center;font-size:10px">'+(i+1)+'</td>'+
          '<td style="font-size:10px;font-weight:500">'+(e.code||'')+'</td>'+
          '<td style="font-size:10px">'+ds+'</td>'+
          '<td style="font-size:10px">'+e.type+'</td>'+
          '<td style="font-size:10px;max-width:200px;white-space:normal">'+( e.note||'')+'</td>'+
          '<td class="amt">'+fmtV(e.amount)+'</td>'+
          '<td style="font-size:9px"><span style="padding:1px 5px;border-radius:4px;background:'+(e.method==='Tiền mặt'?'rgba(217,119,6,.06)':'rgba(37,99,235,.08)')+';color:'+(e.method==='Tiền mặt'?'#b45309':'#2563eb')+'">'+(e.method==='Tiền mặt'?'TM':'CK')+'</span></td>'+
          '<td style="font-size:10px">'+(staff?staff.name:e.staffCode)+'</td>'+
          '<td style="text-align:center">'+(e.attachments&&e.attachments.length?'<span style="font-size:11px;cursor:pointer" title="'+e.attachments.length+' file đính kèm 附件" onclick="event.stopPropagation();previewAttachments('+e.id+')">📎<span style="font-size:8px;color:var(--p);font-weight:700">'+e.attachments.length+'</span></span>':'')+'</td>'+
          '<td style="font-size:10px;color:var(--d);max-width:150px;white-space:normal">'+(e.rejectedReason||'--')+'</td></tr>';
      }).join('');
    }
  }

  // Cash batch summary (TQ only)
  const cashBatchDiv=document.getElementById('cashBatchSummary_'+m);
  const cashBatchEmpty=document.getElementById('cashBatchEmpty_'+m);
  const cashBatchCnt=document.getElementById('cashBatchCnt_'+m);
  if(cashBatchDiv){
    const monthBatches=cashBatches.filter(b=>{
      // Filter batches that have items in this month
      return b.itemIds.some(id=>{const it=items.find(x=>x.id===id);return it&&it.date.startsWith(year+'-'+m);});
    });
    if(cashBatchCnt)cashBatchCnt.textContent=monthBatches.length||'0';
    if(!monthBatches.length){cashBatchDiv.innerHTML='';if(cashBatchEmpty)cashBatchEmpty.style.display='';}
    else{
      if(cashBatchEmpty)cashBatchEmpty.style.display='none';
      cashBatchDiv.innerHTML=monthBatches.map(b=>{
        const bItems=b.itemIds.map(id=>items.find(x=>x.id===id)).filter(Boolean);
        const allConfirmed=bItems.every(it=>it.status==='paid');
        const stLabel=allConfirmed?'<span style="color:#059669;font-weight:700">✓ Đã nhận</span>':'<span style="color:#b45309;font-weight:700">⏳ Chờ xác nhận</span>';
        return '<div style="background:rgba(124,58,237,.04);border:1px solid rgba(124,58,237,.15);border-radius:10px;padding:12px;margin-bottom:10px">'+
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">'+
          '<b style="color:#7c3aed;font-size:13px">💰 Đợt TT #'+b.id+'</b>'+stLabel+'</div>'+
          '<div style="font-size:11px;color:#7c3aed;margin-bottom:6px">'+
          '<div>📅 Ngày chi: <b>'+fmtDate(b.date)+'</b> | Người chi: <b>'+(b.disbursedBy||'--')+'</b></div>'+
          '<div>👤 Người nhận: <b>'+staffDisplayName(b.recipient)+'</b></div>'+
          (b.note?'<div>📝 Ghi chú: '+b.note+'</div>':'')+
          '</div>'+
          '<div style="background:#fff;border:1px solid rgba(124,58,237,.15);border-radius:6px;padding:6px 8px;font-size:10px;margin-bottom:6px">'+
          bItems.map(it=>'<div style="display:flex;justify-content:space-between;padding:2px 0;border-bottom:1px solid #f1f5f9">'+
            '<span>'+(it.code||'')+' — '+(it.note||'').substring(0,30)+'</span>'+
            '<span style="font-weight:600;color:#7c3aed">'+fmtV(it.amount)+'</span></div>').join('')+
          '</div>'+
          '<div style="text-align:right;font-size:14px;font-weight:800;color:#7c3aed">Tổng: '+fmtV(b.total)+'</div>'+
          '</div>';
      }).join('');
    }
  }

  // Batch header - inline banner in table header
  updateBatchHdr(m);

  // Filter
  const fltType=document.getElementById('fltType_'+m)?.value||'';
  const fltSt=document.getElementById('fltSt_'+m)?.value||'';
  const fltPay=document.getElementById('fltPay_'+m)?.value||'';
  const fltPayer=document.getElementById('fltPayer_'+m)?.value||'';
  const fltSub=document.getElementById('fltSub_'+m)?.value||'';
  const fltQ=(document.getElementById('fltQ_'+m)?.value||'').toLowerCase();
  const fltStaff=document.getElementById('fltStaff_'+m)?.value||'';
  const fltDateFrom=document.getElementById('fltDateFrom_'+m)?.value||'';
  const fltDateTo=document.getElementById('fltDateTo_'+m)?.value||'';
  // For Manager: main table shows drafts + completed; queue items in separate tables
  // For TQ/KTT: main table shows only completed items (paid)
  const isTQorKTT_r=isCashier()||isChiefAccountant();
  let filt=mI.filter(e=>{
    if(isChiefAccountant()&&e.status!=='paid')return false;
    if(isCashier()&&!['cash_disbursed','paid'].includes(e.status))return false;
    if(isBoss()&&!['boss_approved','cashier_review','cash_disbursed','cash_confirmed','paid','rejected'].includes(e.status))return false;
    if(_isManagerOnly&&['draft','pending','approved','voucher','boss_approved','cashier_review','cash_disbursed'].includes(e.status))return false;
    if(isAccountant()&&e.status!=='paid'&&!(e.status==='draft'&&e.createdByAccountant))return false;
    if(isStaff()&&e.status!=='paid')return false;
    if(fltType&&e.type!==fltType)return false;
    if(fltSt&&e.status!==fltSt)return false;
    if(fltPay&&e.payStatus!==fltPay)return false;
    if(fltPayer&&e.payer!==fltPayer)return false;
    if(fltStaff&&e.staffCode!==fltStaff)return false;
    if(fltDateFrom&&e.date<fltDateFrom)return false;
    if(fltDateTo&&e.date>fltDateTo)return false;
    if(fltSub==='yes'&&!e.submitted)return false;
    if(fltSub==='no'&&e.submitted)return false;
    if(fltQ&&!(e.type.toLowerCase().includes(fltQ)||e.note.toLowerCase().includes(fltQ)||(e.code||'').toLowerCase().includes(fltQ)||(STAFF.find(s=>s.code===e.staffCode)?.name||'').toLowerCase().includes(fltQ)))return false;
    return true;
  }).sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id);

  const tbody=document.getElementById('tb_'+m);
  const emptyEl=document.getElementById('empty_'+m);
  if(!filt.length){if(tbody)tbody.innerHTML='';if(emptyEl)emptyEl.style.display='';}
  else{
    if(emptyEl)emptyEl.style.display='none';
    if(tbody){tbody.innerHTML=filt.map((e,i)=>{
      const ds=fmtDate(e.date);
      const staff=STAFF.find(s=>s.code===e.staffCode);
      let st=STATUS[e.status]||STATUS.draft;
      // Staff view: simplify status display
      if(isStaff()&&(e.status==='approved'||e.status==='voucher'||e.status==='boss_approved'||e.status==='paid')){st={l:'Đang xử lý',c:'st-approved'};}
      // Boss view: simplify status display
      if(isBoss()&&['boss_approved','cashier_review','cash_disbursed','cash_confirmed'].includes(e.status)){st={l:'Đã duyệt',c:'st-approved'};}
      if(isBoss()&&e.status==='paid'){st={l:'Hoàn tất',c:'st-paid'};}
      if(isStaff()&&e.status==='paid'){st={l:'Hoàn tất',c:'st-paid'};}
      const hasAtt=e.attachments&&e.attachments.length>0;
      const noteFull=e.note||'';
      const cnFull=e.noteCn||'';
      const remarkStr=e.remark?'<br><span style="font-size:9px;color:var(--pp);font-style:italic">📝 '+e.remark+'</span>':'';
      const payerShort=e.payer==='NV tạm ứng'?'TƯ'+(e.advPaid?' ✓':''):e.payer==='Lập Nguyên'?'LN':e.payer==='He Huan Shan'?'HHS':e.payer==='Kế Toán'?'KT':e.payer||'';
      const advStaffObj2=e.payer==='NV tạm ứng'&&e.advStaff?STAFF.find(s=>s.code===e.advStaff):null;
      const advTag=e.payer==='NV tạm ứng'?'<div style="margin-top:2px;background:'+(e.advPaid?'rgba(5,150,105,.06)':'rgba(217,119,6,.06)')+';color:'+(e.advPaid?'#059669':'#b45309')+';padding:3px 5px;border-radius:4px;font-size:8px;font-weight:600;border:1px solid '+(e.advPaid?'rgba(5,150,105,.15)':'rgba(217,119,6,.15)')+';line-height:1.4">'+(advStaffObj2?advStaffObj2.name:e.advStaff)+'<br>'+fmtV(e.advAmt||0)+'<br>'+(e.advPaid?'<span style="color:#059669">✓ Đã hoàn trả</span>':'<span style="color:#dc2626">✗ Chưa hoàn trả</span>')+'</div>':'';
      const submittedStatus=e.submitted?`✓ ${e.submittedDate}`:'—';
      const voucherDateStr=e.voucherDate?fmtDate(e.voucherDate):'';
      const paidDateStr=e.paidDate?fmtDate(e.paidDate):'';
      const methodTag='<span style="font-size:8px;padding:1px 4px;border-radius:3px;background:'+(e.method==='Tiền mặt'?'rgba(217,119,6,.06)':'rgba(37,99,235,.06)')+';color:'+(e.method==='Tiền mặt'?'#b45309':'#2563eb')+';margin-left:3px">'+(e.method==='Tiền mặt'?'TM':'CK')+'</span>';
      const vatIcon=e.vat==='Có'?'<span style="font-size:8px;color:var(--s);margin-left:3px" title="Có VAT">VAT</span>':'';
      const attIcon=hasAtt?'<span style="font-size:9px;margin-left:3px" title="'+e.attachments.length+' file">📎'+e.attachments.length+'</span>':'';
      const payerInfo=payerShort?'<div style="font-size:8px;color:var(--g500);margin-top:1px">'+payerShort+'</div>':'';
      const subIcon=e.submitted?'<div style="font-size:8px;color:var(--s);margin-top:2px">✓ Đã nộp</div>':'';
      let mainWfDate='';
      if(e.submittedDate)mainWfDate+='<div style="font-size:8px;color:#7c3aed;margin-top:1px">Nộp: '+fmtDate(e.submittedDate)+'</div>';
      if(e.approvedDate)mainWfDate+='<div style="font-size:8px;color:#059669;margin-top:1px">Duyệt: '+fmtDate(e.approvedDate)+'</div>';
      if(e.voucherDate)mainWfDate+='<div style="font-size:8px;color:#4f46e5;margin-top:1px">Nộp CT: '+fmtDate(e.voucherDate)+'</div>';
      if(e.paidDate)mainWfDate+='<div style="font-size:8px;color:#059669;margin-top:1px">Chi: '+fmtDate(e.paidDate)+'</div>';
      return `<tr style="cursor:pointer" onclick="if(!event.target.closest('input,button,select,.bi,.st')){openApproval(${e.id})}">
        <td><input type="checkbox" ${e.selected&&e._selCtx==='main'?'checked':''} onchange="event.stopPropagation();toggleOne(${e.id},'main')"/></td>
        <td style="font-size:10px;font-weight:500">${e.code||''}${e.locked?'<br><span style="font-size:8px;color:#1e293b;font-weight:700" title="Đã khóa bởi '+(e.lockedBy||'')+' '+fmtDate(e.lockedDate||'')+'">🔐</span>':''}${e.hidden&&isMgr()?'<br><span style="font-size:8px;color:var(--d);font-weight:600">ẨN</span>':''}</td>
        <td style="font-size:10px">${ds}${mainWfDate}</td>
        <td><span style="font-size:10px">${e.type}</span><br><span style="font-size:9px;color:var(--g400)">${e.typeCn||''}</span></td>
        <td style="font-size:10px;max-width:280px;white-space:normal;word-break:break-word;line-height:1.4">${noteFull}${cnFull?'<br><span style="font-size:9px;color:var(--g400)">'+cnFull+'</span>':''}${remarkStr}${vatIcon}${payerInfo}${advTag}</td>
        <td class="amt">${fmtV(e.amount)}</td>
        <td style="font-size:9px">${!e.locked?'<select onchange="event.stopPropagation();changePayStatus('+e.id+',this.value)" style="padding:2px 4px;border:1px solid '+(e.payStatus==='Đã chi'?'rgba(5,150,105,.3)':e.payStatus==='Đã cọc'?'rgba(217,119,6,.3)':'var(--g300)')+';border-radius:4px;font-size:9px;background:'+(e.payStatus==='Đã chi'?'var(--sl)':e.payStatus==='Đã cọc'?'var(--wl)':'var(--g100)')+';color:'+(e.payStatus==='Đã chi'?'var(--s)':e.payStatus==='Đã cọc'?'var(--w)':'var(--g600)')+';cursor:pointer"><option value="Chưa chi"'+(e.payStatus==='Chưa chi'?' selected':'')+'>Chưa chi</option><option value="Đã chi"'+(e.payStatus==='Đã chi'?' selected':'')+'>Đã chi</option><option value="Đã cọc"'+(e.payStatus==='Đã cọc'?' selected':'')+'>Đã cọc</option></select>':'<span style="padding:1px 5px;border-radius:4px;background:'+(e.payStatus==='Đã chi'?'var(--sl)':e.payStatus==='Đã cọc'?'var(--wl)':'var(--g100)')+';color:'+(e.payStatus==='Đã chi'?'var(--s)':e.payStatus==='Đã cọc'?'var(--w)':'var(--g600)')+'">'+e.payStatus+' 🔐</span>'}${methodTag}${e.prepaid?'<div style="margin-top:2px;background:rgba(5,150,105,.06);color:#059669;padding:2px 5px;border-radius:4px;font-size:8px;font-weight:700;border:1px solid rgba(5,150,105,.15)">💵 QL ứng</div>':''}</td>
        <td style="font-size:10px">${staff?staff.name:e.staffCode}</td>
        <td style="text-align:center">${hasAtt?'<span style="font-size:11px;cursor:pointer" title="'+e.attachments.length+' file đính kèm 附件" onclick="event.stopPropagation();previewAttachments('+e.id+')">📎<span style="font-size:8px;color:var(--p);font-weight:700">'+e.attachments.length+'</span></span>':''}</td>
        <td><span class="st ${st.c}" style="cursor:pointer" onclick="event.stopPropagation();openApproval(${e.id})">${st.l}</span>${subIcon}</td>
        ${colSubmitCT()?`<td style="font-size:9px;color:var(--g500)">${(['voucher','boss_approved','paid'].includes(e.status))?voucherDateStr:''}</td>`:''}
        ${colBossApproval()?`<td style="font-size:9px;color:${e.status==='boss_approved'||e.status==='paid'?'var(--s)':'var(--g400)'}">${e.bossApprovedDate||''}</td>`:''}
        ${colPayDone()?`<td style="font-size:9px;color:var(--g500)">${e.status==='paid'?paidDateStr:''}</td>`:''}
        <td><button class="bi" title="In phiếu 列印" onclick="event.stopPropagation();printItem(${e.id})">🖨️</button>${(e.status==='draft'||isMgr())&&!(e.locked&&!isMgr()&&!isBoss())?'<button class="bi" onclick="event.stopPropagation();openEdit('+e.id+')">✏️</button><button class="bi" onclick="event.stopPropagation();deleteItem('+e.id+')">🗑</button>':''}${isMgr()?'<button class="bi" title="'+(e.hidden?'Hiện cho KT':'Ẩn khỏi KT')+'" onclick="event.stopPropagation();toggleHidden('+e.id+')" style="font-size:11px;color:'+(e.hidden?'var(--d)':'var(--g300)')+'">'+(e.hidden?'🔒':'🔓')+'</button>':''}${e.status!=='draft'&&e.status!=='recall_pending'&&e.status!=='paid'&&!isMgr()&&!e.locked?'<button class="bi" title="Thu hồi" onclick="event.stopPropagation();requestRecall('+e.id+')" style="color:#ea580c;font-size:13px">↩️</button>':''}${e.status==='recall_pending'?'<span style="font-size:9px;color:#ea580c;padding:2px 4px">Đang thu hồi...</span>':''}</td>
      </tr>`}).join('');}
  }

  const fTotal=filt.reduce((s,e)=>s+e.amount,0);
  if(document.getElementById('ft_'+m))document.getElementById('ft_'+m).textContent=fmtV(fTotal);
  if(document.getElementById('fc_'+m))document.getElementById('fc_'+m).textContent=filt.length+' khoản';
  if(document.getElementById('cnt_'+m))document.getElementById('cnt_'+m).textContent='('+mI.length+')';

  renderSummary(m,mI);
  renderTracker(m,mI);
}

// ============ SUMMARY TABLE + MONTHLY CHART ============
function renderSummary(m,mI){
  const summEl=document.getElementById('summ_'+m);if(!summEl)return;
  const byType={};mI.forEach(e=>{byType[e.type]=(byType[e.type]||0)+e.amount;});
  const total=mI.reduce((s,e)=>s+e.amount,0);
  const sorted=Object.entries(byType).sort((a,b)=>b[1]-a[1]);

  let h='<thead><tr><th>Loại chi phí 費用類型</th><th style="text-align:right">Số tiền 金額</th><th style="text-align:right">Chiếm % 佔比</th></tr></thead><tbody>';
  sorted.forEach(([type,amt])=>{const cat=CATS.find(c=>c.vn===type);const cn=cat?cat.cn:'';const pct=total?((amt/total)*100).toFixed(1):'0.0';h+=`<tr><td>${type} <span style="color:var(--g400);font-size:9px">${cn}</span></td><td class="amt">${fmtV(amt)}</td><td class="amt">${pct}%</td></tr>`;});
  h+=`<tr><td><b>Tổng cộng 合計</b></td><td class="amt"><b>${fmtV(total)}</b></td><td class="amt"><b>100%</b></td></tr>`;
  h+='</tbody>';summEl.innerHTML=h;

  // Monthly doughnut chart
  const cvs=document.getElementById('mPie_'+m);
  if(cvs&&sorted.length){
    if(charts['mp_'+m])charts['mp_'+m].destroy();
    charts['mp_'+m]=new Chart(cvs,{type:'doughnut',data:{
      labels:sorted.map(([k])=>{const c=CATS.find(x=>x.vn===k);return k+(c?' '+c.cn:'');}),
      datasets:[{data:sorted.map(([,v])=>v),backgroundColor:sorted.map((_,i)=>COLORS[i%COLORS.length]),borderWidth:2,borderColor:'#fff'}]
    },options:{responsive:true,plugins:{legend:{position:'bottom',labels:{font:{size:9},padding:5}},title:{display:true,text:'Phân bổ chi phí 費用分佈',font:{size:11}}}}});
  }
}

// ============ TRACKER ============
function renderTracker(m,mI){
  const trk=document.getElementById('trk_'+m);if(!trk)return;
  const g={unpaid:[],deposit:[],notSubmitted:[],pending:[],voucher:[],boss_approved:[],cashier_review:[],cash_disbursed:[],rejected:[],recall_pending:[],advUnpaid:[]};
  mI.forEach(e=>{
    if(e.payStatus==='Chưa chi'&&e.status!=='recall_pending'&&e.status!=='paid')g.unpaid.push(e);
    if(e.payStatus==='Đã cọc')g.deposit.push(e);
    if(!e.submitted&&e.status!=='recall_pending'&&e.status!=='paid')g.notSubmitted.push(e);
    if(e.status==='pending')g.pending.push(e);
    if(e.status==='voucher')g.voucher.push(e);
    if(e.status==='boss_approved')g.boss_approved.push(e);
    if(e.status==='cashier_review')g.cashier_review.push(e);
    if(e.status==='cash_disbursed')g.cash_disbursed.push(e);
    if(e.status==='rejected')g.rejected.push(e);
    if(e.status==='recall_pending')g.recall_pending.push(e);
    if(e.payer==='NV tạm ứng'&&!e.advPaid)g.advUnpaid.push(e);
  });
  const labels={
    unpaid:{vn:'Chưa thanh toán',cn:'未付款',ic:'⚠',bg:'rgba(220,38,38,.05)',cl:'#dc2626',bd:'rgba(220,38,38,.15)'},
    deposit:{vn:'Đã đặt cọc',cn:'已付訂金',ic:'⚠',bg:'rgba(234,88,12,.05)',cl:'#c2410c',bd:'rgba(234,88,12,.12)'},
    notSubmitted:{vn:'Chưa nộp phiếu',cn:'未提交單據',ic:'📋',bg:'rgba(124,58,237,.05)',cl:'#7c3aed',bd:'rgba(124,58,237,.15)'},
    pending:{vn:'Chờ QL duyệt',cn:'待經理審批',ic:'⏳',bg:'rgba(217,119,6,.05)',cl:'#b45309',bd:'rgba(217,119,6,.15)'},
    voucher:{vn:'Chờ Boss duyệt',cn:'待老闆批令',ic:'📤',bg:'rgba(124,58,237,.05)',cl:'#7c3aed',bd:'rgba(124,58,237,.15)'},
    boss_approved:{vn:'Chờ chuyển khoản',cn:'待轉帳',ic:'💰',bg:'rgba(217,119,6,.05)',cl:'#b45309',bd:'rgba(217,119,6,.15)'},
    cashier_review:{vn:'Chờ CT chi TM',cn:'待公司付現',ic:'💰',bg:'rgba(124,58,237,.05)',cl:'#7c3aed',bd:'rgba(124,58,237,.15)'},
    cash_disbursed:{vn:'Chờ QL xác nhận',cn:'已付現待確認',ic:'💵',bg:'rgba(5,150,105,.05)',cl:'#059669',bd:'rgba(5,150,105,.15)'},
    rejected:{vn:'Từ chối / trả lại',cn:'被退回',ic:'✗',bg:'rgba(220,38,38,.05)',cl:'#dc2626',bd:'rgba(220,38,38,.15)'},
    recall_pending:{vn:'Đang thu hồi',cn:'撤回中',ic:'↩',bg:'rgba(234,88,12,.05)',cl:'#c2410c',bd:'rgba(234,88,12,.12)'},
    advUnpaid:{vn:'NV chưa hoàn trả',cn:'員工未還預支',ic:'👤',bg:'rgba(236,72,153,.05)',cl:'#db2777',bd:'rgba(236,72,153,.15)'}
  };
  const activeKeys=Object.keys(g).filter(k=>g[k].length>0);
  if(!activeKeys.length){trk.innerHTML='<div style="text-align:center;color:var(--s);padding:8px;font-size:12px">Tất cả đã hoàn tất ✓</div>';return;}

  // Pill cards in flex-wrap grid
  let h='';
  activeKeys.forEach(k=>{
    const arr=g[k];const t=arr.reduce((s,e)=>s+e.amount,0);const lb=labels[k];
    const detId='trkDet_'+k+'_'+m;
    h+=`<div style="background:rgba(255,255,255,.6);border:1px solid ${lb.bd};border-radius:8px;padding:6px 10px;min-width:110px;max-width:160px;flex:1;cursor:pointer;transition:box-shadow .2s" onclick="toggleTrkDetail('${detId}','${m}')" onmouseover="this.style.boxShadow='0 2px 8px rgba(0,0,0,.08)'" onmouseout="this.style.boxShadow='none'">
      <div style="font-size:10px;color:${lb.cl};font-weight:700;line-height:1.3">${lb.ic} ${lb.vn}</div>
      <div style="font-size:8px;color:${lb.cl};opacity:.6;margin-top:1px">${lb.cn}</div>
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-top:3px">
        <span style="font-size:16px;font-weight:800;color:${lb.cl}">${arr.length}</span>
        <span style="font-size:9px;color:${lb.cl}">${fmtV(t)}</span>
      </div>
    </div>`;
  });

  // Detail panels (only one visible at a time)
  let detH='';
  activeKeys.forEach(k=>{
    const arr=g[k];const lb=labels[k];const detId='trkDet_'+k+'_'+m;
    detH+=`<div id="${detId}" class="trkDetPanel_${m}" style="display:none;width:100%;background:${lb.bg};border:1px solid ${lb.bd};border-radius:8px;padding:8px 10px;margin-top:6px">
      <div style="font-size:10px;font-weight:700;color:${lb.cl};margin-bottom:4px">${lb.ic} ${lb.vn} <span style="font-size:8px;opacity:.6">${lb.cn}</span> — ${arr.length} khoản</div>
      <div style="display:flex;flex-wrap:wrap;gap:3px">
      ${arr.map(e=>`<span style="background:#fff;border:1px solid ${lb.bd};border-radius:4px;padding:2px 6px;font-size:9px;cursor:pointer;display:inline-flex;align-items:center;gap:3px" onclick="event.stopPropagation();openApproval(${e.id})" onmouseover="this.style.background='${lb.bd}'" onmouseout="this.style.background='#fff'"><b style="color:${lb.cl}">${e.code||'--'}</b><span style="color:#64748b">${fmtV(e.amount)}</span></span>`).join('')}
      </div>
    </div>`;
  });
  trk.innerHTML=h+detH;
}

// ============ OVERVIEW ============
function renderOverview(){
  if(isStaff())return; // Staff cannot see overview
  const year=getYear();const yI=applyRoleFilter(items.filter(e=>e.date.startsWith(year)));const totalY=yI.reduce((s,e)=>s+e.amount,0);
  let totalBgt=0;MS.forEach(m=>{totalBgt+=budgets[year+'-'+m]||0;});
  const ovf=document.getElementById('ovFill');document.getElementById('ovSpent').textContent=fmtV(totalY);
  if(totalBgt){const p=Math.min(totalY/totalBgt*100,100);ovf.style.width=p+'%';ovf.textContent=Math.round(totalY/totalBgt*100)+'%';ovf.className='bfill '+(totalY/totalBgt<.7?'ok':totalY/totalBgt<1?'wn':'ov');document.getElementById('ovBudget').textContent=fmtV(totalBgt);const r=totalBgt-totalY;document.getElementById('ovRemain').textContent=fmtV(Math.abs(r))+(r<0?' (vượt!)':'');document.getElementById('ovRemain').className=r<0?'neg':'';}
  else{ovf.style.width='0%';ovf.textContent='';document.getElementById('ovBudget').textContent='--';document.getElementById('ovRemain').textContent='--';}

  const md={};MS.forEach(m=>{md[m]={};});yI.forEach(e=>{const m=e.date.slice(5,7);md[m][e.type]=(md[m][e.type]||0)+e.amount;});
  const usedCats=[...new Set(yI.map(e=>e.type))];const catOrd=CATS.filter(c=>usedCats.includes(c.vn));

  let th='<thead><tr><th style="text-align:left">Loại 類型</th>';MS.forEach((_,i)=>th+=`<th>T${i+1}</th>`);th+='<th style="background:rgba(99,102,241,.08)">TỔNG</th></tr></thead><tbody>';
  catOrd.forEach(cat=>{th+=`<tr><td>${cat.vn} <span style="color:#94a3b8;font-size:9px">${cat.cn}</span></td>`;let rt=0;MS.forEach(m=>{const v=md[m][cat.vn]||0;rt+=v;th+=`<td class="amt">${v?fmtV(v):'-'}</td>`;});th+=`<td class="amt" style="font-weight:700;background:rgba(99,102,241,.05)">${fmtV(rt)}</td></tr>`;});
  th+='<tr><td><b>TỔNG</b></td>';let gt=0;MS.forEach(m=>{const mt=Object.values(md[m]).reduce((s,v)=>s+v,0);gt+=mt;th+=`<td class="amt">${mt?fmtV(mt):'-'}</td>`;});th+=`<td class="amt" style="background:rgba(37,99,235,.06)">${fmtV(gt)}</td></tr>`;
  th+='<tr style="background:rgba(217,119,6,.05)"><td><b>Ngân sách</b></td>';MS.forEach(m=>{const b=budgets[year+'-'+m];th+=`<td class="amt">${b?fmtV(b):'-'}</td>`;});th+=`<td class="amt">${totalBgt?fmtV(totalBgt):'-'}</td></tr>`;
  th+='<tr style="background:rgba(5,150,105,.05)"><td><b>Còn lại</b></td>';MS.forEach(m=>{const b=budgets[year+'-'+m]||0;const s=Object.values(md[m]).reduce((s,v)=>s+v,0);const r=b-s;th+=b?`<td class="amt" style="color:${r<0?'var(--d)':'var(--s)'}">${fmtV(r)}</td>`:'<td class="amt">-</td>';});const gr=totalBgt-gt;th+=`<td class="amt" style="color:${gr<0?'var(--d)':'var(--s)'}">${totalBgt?fmtV(gr):'-'}</td></tr></tbody>`;
  document.getElementById('yearTable').innerHTML=th;

  // Charts
  if(charts.trend)charts.trend.destroy();
  charts.trend=new Chart(document.getElementById('chTrend'),{type:'line',data:{labels:ML,datasets:[
    {label:'Chi phí',data:MS.map(m=>Object.values(md[m]).reduce((s,v)=>s+v,0)),borderColor:'#2563eb',backgroundColor:'rgba(37,99,235,.08)',fill:true,tension:.3,borderWidth:2,pointRadius:3},
    {label:'Ngân sách',data:MS.map(m=>budgets[year+'-'+m]||0),borderColor:'#b45309',borderDash:[5,3],borderWidth:2,pointRadius:0,fill:false}
  ]},options:{responsive:true,plugins:{legend:{position:'bottom',labels:{font:{size:10}}}},scales:{y:{ticks:{callback:v=>v>=1e6?(v/1e6)+'M':v>=1e3?(v/1e3)+'K':v},grid:{color:'#e2e8f0'}},x:{grid:{display:false}}}}});

  if(charts.pie)charts.pie.destroy();
  const bt={};yI.forEach(e=>{bt[e.type]=(bt[e.type]||0)+e.amount;});const pe=Object.entries(bt).sort((a,b)=>b[1]-a[1]);
  charts.pie=new Chart(document.getElementById('chPie'),{type:'doughnut',data:{labels:pe.map(([k])=>{const c=CATS.find(x=>x.vn===k);return k+(c?' '+c.cn:'');}),datasets:[{data:pe.map(([,v])=>v),backgroundColor:pe.map((_,i)=>COLORS[i%COLORS.length]),borderWidth:2,borderColor:'#fff'}]},options:{responsive:true,plugins:{legend:{position:'bottom',labels:{font:{size:9},padding:6}}}}});

  if(charts.stack)charts.stack.destroy();
  charts.stack=new Chart(document.getElementById('chStack'),{type:'bar',data:{labels:ML,datasets:catOrd.map((cat,i)=>({label:cat.vn,data:MS.map(m=>md[m][cat.vn]||0),backgroundColor:COLORS[i%COLORS.length],borderRadius:2}))},options:{responsive:true,plugins:{legend:{position:'bottom',labels:{font:{size:9},boxWidth:8,padding:6}}},scales:{x:{stacked:true,grid:{display:false}},y:{stacked:true,ticks:{callback:v=>v>=1e6?(v/1e6)+'M':v>=1e3?(v/1e3)+'K':v},grid:{color:'#e2e8f0'}}}}});
}

function switchMain(tab){
  // Staff guard: block switching to non-current month
  if(isStaff()&&tab.startsWith('m')){
    const mi=MS.indexOf(tab.slice(1));const now=new Date();
    if(getYear()!==String(now.getFullYear())||mi!==now.getMonth()){toast('Chỉ được thao tác tháng hiện tại');return;}
  }
  document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('on',t.dataset.tab===tab));
  document.querySelectorAll('.pnl').forEach(p=>p.classList.toggle('on',p.id==='pnl-'+tab));
  if(tab==='overview')renderOverview();else if(tab==='advance')renderAdvances();else if(tab==='users')renderUserMgmt();else if(tab.startsWith('m'))renderM(tab.slice(1));
}

function setMBgt(m){const v=parseAmt(document.getElementById('budIn_'+m).value);if(!v)return;budgets[getYear()+'-'+m]=v;document.getElementById('budIn_'+m).value='';saveData();renderM(m);toast('OK');}
function setYearBudget(){const v=parseAmt(document.getElementById('yearBudgetIn').value);if(!v)return;MS.forEach(m=>{budgets[getYear()+'-'+m]=v;});document.getElementById('yearBudgetIn').value='';saveData();renderOverview();toast('OK');}

function exportMyCSV(m){
  const year=getYear(),ym=year+'-'+m;
  let mI=applyRoleFilter(items.filter(e=>e.date.startsWith(ym)));
  // Apply current filters (same as exportMonthCSV)
  const fltType=document.getElementById('fltType_'+m)?.value||'';
  const fltSt=document.getElementById('fltSt_'+m)?.value||'';
  const fltPay=document.getElementById('fltPay_'+m)?.value||'';
  const fltPayer=document.getElementById('fltPayer_'+m)?.value||'';
  const fltSub=document.getElementById('fltSub_'+m)?.value||'';
  const fltQ=(document.getElementById('fltQ_'+m)?.value||'').toLowerCase();
  mI=mI.filter(e=>{
    if(fltType&&e.type!==fltType)return false;
    if(fltSt&&e.status!==fltSt)return false;
    if(fltPay&&e.payStatus!==fltPay)return false;
    if(fltPayer&&e.payer!==fltPayer)return false;
    if(fltSub==='yes'&&!e.submitted)return false;
    if(fltSub==='no'&&e.submitted)return false;
    if(fltQ&&!(e.type.toLowerCase().includes(fltQ)||e.note.toLowerCase().includes(fltQ)||(e.code||'').toLowerCase().includes(fltQ)))return false;
    return true;
  }).sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id);
  if(!mI.length){toast('Không có dữ liệu theo bộ lọc');return;}
  let csv='\uFEFFSTT,Mã,Ngày,Loại,Số tiền,TT toán,Trạng thái,Người chi,Mô tả,Ghi chú\n';
  mI.forEach((e,i)=>{
    csv+=`${i+1},"${e.code}",${e.date},"${e.type}",${e.amount},"${e.payStatus}","${STATUS[e.status]?.l||''}","${e.payer||''}","${(e.note||'').replace(/"/g,'""')}","${(e.remark||'').replace(/"/g,'""')}"\n`;
  });
  const staffName=currentUser?currentUser.name:'NV';
  const filterDesc=fltType||fltSt||fltPay||fltPayer||fltSub||fltQ?'_filtered':'';
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));
  a.download=`Chi_phi_T${parseInt(m)}_${year}_${staffName}${filterDesc}.csv`;a.click();toast(`Đã tải ${mI.length} khoản`);
}
function exportMonthCSV(m){
  const year=getYear(),ym=year+'-'+m;
  let mI=applyRoleFilter(items.filter(e=>e.date.startsWith(ym)));
  // Apply current filters
  const fltType=document.getElementById('fltType_'+m)?.value||'';
  const fltSt=document.getElementById('fltSt_'+m)?.value||'';
  const fltPay=document.getElementById('fltPay_'+m)?.value||'';
  const fltPayer=document.getElementById('fltPayer_'+m)?.value||'';
  const fltSub=document.getElementById('fltSub_'+m)?.value||'';
  const fltQ=(document.getElementById('fltQ_'+m)?.value||'').toLowerCase();
  mI=mI.filter(e=>{
    if(fltType&&e.type!==fltType)return false;
    if(fltSt&&e.status!==fltSt)return false;
    if(fltPay&&e.payStatus!==fltPay)return false;
    if(fltPayer&&e.payer!==fltPayer)return false;
    if(fltSub==='yes'&&!e.submitted)return false;
    if(fltSub==='no'&&e.submitted)return false;
    if(fltQ&&!(e.type.toLowerCase().includes(fltQ)||e.note.toLowerCase().includes(fltQ)||(e.code||'').toLowerCase().includes(fltQ)))return false;
    return true;
  }).sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id);
  if(!mI.length){toast('Không có dữ liệu theo bộ lọc');return;}
  let csv='\uFEFFSTT,Mã,Ngày,Loại,類型,Số tiền,TT toán,Duyệt,Người chi,VAT,Số HĐ,Người lập,Mã NV,PT,Nộp phiếu,Ngày nộp,Mô tả,中文,Ghi chú\n';
  mI.forEach((e,i)=>{const s=STAFF.find(x=>x.code===e.staffCode);
    csv+=`${i+1},"${e.code}",${e.date},"${e.type}","${e.typeCn}",${e.amount},"${e.payStatus}","${STATUS[e.status]?.l||''}","${e.payer||''}","${e.vat||''}","${e.vatNum||''}","${s?s.name:''}","${e.staffCode}","${e.method||''}","${e.submitted?'Có':'Không'}","${e.submittedDate||''}","${(e.note||'').replace(/"/g,'""')}","${(e.noteCn||'').replace(/"/g,'""')}","${(e.remark||'').replace(/"/g,'""')}"\n`;});
  const filterDesc=fltType||fltSt||fltPay||fltPayer||fltSub||fltQ?'_filtered':'';
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));a.download=`Chi_phi_T${parseInt(m)}_${year}${filterDesc}.csv`;a.click();toast(`Đã xuất ${mI.length} khoản`);
}

function exportCSV(){
  const year=getYear();const yI=applyRoleFilter(items.filter(e=>e.date.startsWith(year))).sort((a,b)=>b.date.localeCompare(a.date)||b.id-a.id);
  if(!yI.length){toast('Không có DL');return;}
  let csv='\uFEFFSTT,Mã,Ngày,Tháng,Loại,類型,Số tiền,TT toán,Duyệt,Người chi,NV tạm ứng,Tiền TƯ,VAT,Số HĐ,Người lập,Mã NV,PT,Nộp phiếu,Ngày nộp,Mô tả,中文,Ghi chú\n';
  yI.forEach((e,i)=>{const s=STAFF.find(x=>x.code===e.staffCode);const as=e.advStaff?STAFF.find(x=>x.code===e.advStaff):null;
    csv+=`${i+1},"${e.code}",${e.date},${e.date.slice(5,7)},"${e.type}","${e.typeCn}",${e.amount},"${e.payStatus}","${STATUS[e.status]?.l||''}","${e.payer||''}","${as?as.name:''}",${e.advAmt||0},"${e.vat||''}","${e.vatNum||''}","${s?s.name:''}","${e.staffCode}","${e.method||''}","${e.submitted?'Có':'Không'}","${e.submittedDate||''}","${(e.note||'').replace(/"/g,'""')}","${(e.noteCn||'').replace(/"/g,'""')}","${(e.remark||'').replace(/"/g,'""')}"\n`;});
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));a.download=`Chi_phi_Loho_${year}.csv`;a.click();toast('Đã xuất CSV');
}

// ============ PRINT VOUCHER ============
const LN_LOGO='ln_logo.png';
function numToViWords(n){
if(n===0)return 'không đồng';
const ones=['','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];
const units=['','nghìn','triệu','tỷ'];
function readGroup(g,showZeroH){
  let h=Math.floor(g/100),t=Math.floor((g%100)/10),u=g%10,s='';
  if(h>0||showZeroH)s+=ones[h]+' trăm ';
  if(t>1)s+=ones[t]+' mươi ';
  else if(t===1)s+='mười ';
  else if(t===0&&h>0&&u>0)s+='lẻ ';
  if(t>1&&u===1)s+='mốt ';
  else if(t>=1&&u===5)s+='lăm ';
  else if(u>0)s+=ones[u]+' ';
  return s;
}
let result='',groups=[],tmp=n;
while(tmp>0){groups.push(tmp%1000);tmp=Math.floor(tmp/1000);}
for(let i=groups.length-1;i>=0;i--){
  if(groups[i]>0){result+=readGroup(groups[i],i<groups.length-1)+units[i]+' ';}
}
return (result.trim()+' đồng').replace(/\s+/g,' ');
}

function buildVoucherHTML(e){
const d=new Date(e.date+'T00:00:00');
const dy=d.getDate(),mo=d.getMonth()+1,yr=d.getFullYear();
const staff=STAFF.find(s=>s.code===e.staffCode);
const sName=staff?staff.name.toUpperCase():'';
const amt=e.amount;const aStr=String(amt);
const pad=aStr.padStart(10,'0');const len=aStr.length;
let digL='',digR='';
for(let i=0;i<10;i++){
const cls=i<10-len?'dc x':'dc';
const ch=i<10-len?'\u2500':pad[i];
digL+='<div class="'+cls+'">'+ch+'</div>';
digR+='<div class="'+cls+'">'+ch+'</div>';
}
const w=numToViWords(amt);
const nUp=(e.note||'').toUpperCase();
const nCn=e.noteCn||'';
return '<div class="pv-page">'+
'<img class="pvbg" src="voucher_bg.png">'+
'<div class="pf" style="left:80%;top:15.9%;font-size:12px;font-weight:700;width:10%;text-align:center">'+(e.code||'')+'</div>'+
'<div class="pf" style="left:10.3%;top:25.2%;font-size:11px;font-weight:600;width:7%;text-align:center">'+yr+'/'+mo+'/'+dy+'</div>'+
'<div class="pf" style="left:30.7%;top:29.7%"><div class="dig-row">'+digL+'</div></div>'+
'<div class="pf" style="left:56.2%;top:31.3%"><div class="dig-row">'+digR+'</div></div>'+
'<div class="pf" style="left:6.7%;top:33%;font-size:7.5px;font-weight:700;width:14%;text-align:center;line-height:1.3">'+sName+'</div>'+
'<div class="pf" style="left:22.3%;top:38.8%;font-size:9px;width:40%">'+w+'</div>'+
'<div class="pvline" style="left:21.5%;top:43%;height:53%"></div>'+
'<div class="pf" style="left:22.7%;top:50.4%;font-size:12px;width:52%;height:14%;line-height:1.5;overflow:hidden;word-wrap:break-word">'+nCn+'</div>'+
'<div class="pf" style="left:22.8%;top:76.4%;font-size:12px;font-weight:600;width:52%;height:14%;line-height:1.5;overflow:hidden;word-wrap:break-word">'+nUp+'</div>'+
'</div>';
}
function printItem(id){
const e=items.find(x=>x.id===id);if(!e)return;
document.getElementById('printPages').innerHTML=buildVoucherHTML(e);
document.getElementById('printBadge').textContent='1 phiếu';
document.getElementById('printOverlay').classList.add('show');
}

function batchPrint(m){
const sel=getSel(m);
if(!sel.length){toast('Chọn mục cần in');return;}
document.getElementById('printPages').innerHTML=sel.map(e=>buildVoucherHTML(e)).join('');
document.getElementById('printBadge').textContent=sel.length+' phiếu';
document.getElementById('printOverlay').classList.add('show');
}

function closePrintOverlay(){document.getElementById('printOverlay').classList.remove('show');}

// PERSISTENCE — localStorage + Google Sheets sync
const LS_KEY='loho_chiphi_data';
// *** QUAN TRỌNG: Thay URL n��y bằng URL Web App sau khi deploy Google Apps Script v2 ***
const GSHEET_API='https://script.google.com/macros/s/AKfycby1QVV0lxT8oFjIg994tGaIQz1soVzCuCg2kXGuLtla3_OBOFeOzpdOa08pwlg9OD7ZIA/exec';
// Polyfill AbortSignal.timeout cho trình duyệt cũ
if(typeof AbortSignal!=='undefined'&&!AbortSignal.timeout){AbortSignal.timeout=function(ms){const c=new AbortController();setTimeout(()=>c.abort(new DOMException('TimeoutError','TimeoutError')),ms);return c.signal;};}
let syncTimer=null;
let isSyncing=false;
let _lastSyncAction='auto-save';
let _lastSyncDetail='';
let _syncRetryCount=0;
const SYNC_MAX_RETRY=3;
let _pendingSyncData=null;
let _sheetsLoaded=false;
let _syncFailCount=0;

function updateSyncUI(status,msg){
  const el=document.getElementById('syncStatus');
  if(!el)return;
  const colors={ok:'#22c55e',warn:'#f59e0b',err:'#ef4444',sync:'#6366f1'};
  el.style.color=colors[status]||'#64748b';
  el.textContent=msg;
  // Thêm nút retry nếu lỗi
  if(status==='err'){
    _syncFailCount++;
    el.innerHTML=msg+' <button onclick="forceSync()" style="margin-left:6px;padding:2px 8px;font-size:10px;background:#ef4444;color:#fff;border:none;border-radius:4px;cursor:pointer">🔄 Thử lại</button>';
    if(_syncFailCount>=2){
      el.innerHTML+=' <span style="font-size:9px;color:#ef4444;display:block;margin-top:2px">⚠ Dữ liệu chưa đồng bộ! Bấm "Thử lại" hoặc Ctrl+Shift+R</span>';
    }
  }else if(status==='ok'){
    _syncFailCount=0;
  }
}

function forceSync(){
  _syncRetryCount=0;
  isSyncing=false;
  const data={items,budgets,nextId,advances,advNextId,cashBatches,cashBatchNextId,savedAt:new Date().toISOString()};
  syncToSheets(data);
}

function saveData(actionType,detail){
  try{
    if(actionType)_lastSyncAction=actionType;
    if(detail)_lastSyncDetail=detail;
    if(!actionType&&!_lastSyncAction){_lastSyncAction='auto-save';}
    items.forEach(e=>{delete e._selCtx;e.selected=false;});
    const data={items,budgets,nextId,advances,advNextId,cashBatches,cashBatchNextId,savedAt:new Date().toISOString()};
    const json=JSON.stringify(data);
    try{localStorage.setItem(LS_KEY,json);}catch(storageErr){
      console.error('localStorage full:',storageErr);
      toast('⚠️ Bộ nhớ đầy! Xóa bớt file đính kèm cũ hoặc backup dữ liệu.');
    }
    window._ld=json;
    // Auto sync to Google Sheets (debounce 3 giây)
    if(GSHEET_API){
      clearTimeout(syncTimer);
      // Nếu đang sync, queue lại (không bỏ qua)
      if(isSyncing){
        _pendingSyncData=data;
        console.log('[SYNC] Queued: đang sync, sẽ sync lại sau khi xong');
      }else{
        syncTimer=setTimeout(()=>syncToSheets(data),3000);
      }
    }
  }catch(e){console.error('saveData error:',e);}
}
// Helper: saveData với action log
function saveLog(action,detail){_lastSyncAction=action;_lastSyncDetail=detail||'';saveData();}

async function loadData(){
  try{
    // Ưu tiên: localStorage > window._ld > PRELOAD
    let raw=localStorage.getItem(LS_KEY)||window._ld;
    if(raw){
      const d=JSON.parse(raw);
      items=d.items||[];budgets=d.budgets||{};nextId=d.nextId||1;advances=d.advances||[];advNextId=d.advNextId||1;cashBatches=d.cashBatches||[];cashBatchNextId=d.cashBatchNextId||1;
      if(typeof PRELOAD!=='undefined'&&PRELOAD.length){
        const existIds=new Set(items.map(e=>e.id));
        PRELOAD.forEach(p=>{if(!existIds.has(p.id)){items.push(JSON.parse(JSON.stringify(p)));}});
        nextId=items.reduce((mx,e)=>Math.max(mx,e.id),0)+1;
      }
    }else if(typeof PRELOAD!=='undefined'&&PRELOAD.length){
      items=JSON.parse(JSON.stringify(PRELOAD));nextId=items.reduce((mx,e)=>Math.max(mx,e.id),0)+1;
    }
    // Merge DEFAULT_USERS mới vào USERS (thêm TK chưa có)
    if(typeof DEFAULT_USERS!=='undefined'){
      const existUsernames=new Set(USERS.map(u=>u.username));
      DEFAULT_USERS.forEach(du=>{if(!existUsernames.has(du.username)){USERS.push(JSON.parse(JSON.stringify(du)));}});
      try{localStorage.setItem('loho_users',JSON.stringify(USERS));}catch(e){}
    }
    items.forEach(e=>{if(!('submitted'in e))e.submitted=false;if(!('submittedDate'in e))e.submittedDate='';if(!('remark'in e))e.remark='';if(!('hidden'in e))e.hidden=((e.type==='Lương nhân viên'||e.type==='Thưởng')&&e.staffCode==='VP001');if(e.date&&typeof e.date==='string'&&e.date.length>10)e.date=e.date.slice(0,10);if(!('paymentHistory'in e))e.paymentHistory=[];});
    // Load from Google Sheets — AWAIT để đảm bảo data đầy đủ trước khi user thao tác
    if(GSHEET_API){
      updateSyncUI('sync','⏳ Đang tải dữ liệu...');
      await loadFromSheets();
    }
  }catch(e){console.error('loadData error:',e);}
}

// === AUTO-CLEAN TEST DATA (chạy 1 lần) ===
function cleanTestData(){
  if(localStorage.getItem('loho_test_cleaned_v3'))return;
  const before=items.length;
  const advBefore=advances.length;
  items=items.filter(e=>{
    const code=(e.code||'').toUpperCase();
    const note=(e.note||'').trim();
    const noteLower=(e.note||'').toLowerCase();
    const remark=(e.remark||'').toLowerCase();
    // Giữ lại "test livestream" — đây là dữ liệu thật
    if(noteLower.includes('test livestream')||noteLower.includes('test livetream'))return true;
    // Xóa items có code bắt đầu "TEST"
    if(code.startsWith('TEST'))return false;
    // Xóa items có note bắt đầu "[TEST]" hoặc mô tả chứa chữ TEST đứng riêng
    if(note.startsWith('[TEST]')||note.startsWith('[test]'))return false;
    // Xóa items có mô tả chỉ là "TEST" hoặc "test"
    if(noteLower.trim()==='test')return false;
    // Xóa items có remark chứa "dữ liệu test"
    if(remark.includes('dữ liệu test')||remark.includes('[test]'))return false;
    return true;
  });
  advances=advances.filter(a=>{
    const desc=(a.desc||a.description||a.purpose||a.note||'').trim();
    const isTest=desc.startsWith('[TEST]')||desc.startsWith('[test]')||desc.toLowerCase()==='test';
    return !isTest;
  });
  const removed=before-items.length;
  const advRemoved=advBefore-advances.length;
  if(removed||advRemoved){
    saveData();
    console.log(`[cleanTestData] Removed ${removed} expense items + ${advRemoved} advances with test data`);
  }
  localStorage.setItem('loho_test_cleaned_v3','1');
}

// Merge 2 mảng items theo id: local wins nếu cùng id (vì user vừa sửa), thêm items từ remote chưa có trong local
function mergeItems(localItems, remoteItems){
  const localMap=new Map(localItems.map(e=>[e.id,e]));
  // Thêm items từ remote mà local chưa có
  remoteItems.forEach(re=>{
    if(!localMap.has(re.id)){
      localMap.set(re.id,re);
    } else {
      // Cùng id: so sánh savedAt/submittedDate/approvedDate/paidDate — dùng bản mới hơn
      const le=localMap.get(re.id);
      const localTime=le.paidDate||le.approvedDate||le.submittedDate||le.date||'';
      const remoteTime=re.paidDate||re.approvedDate||re.submittedDate||re.date||'';
      // Nếu remote có trạng thái "tiến xa hơn" trong workflow → dùng remote
      const stOrder={draft:0,pending:1,approved:2,voucher:3,boss_approved:4,cashier_review:5,cash_disbursed:6,paid:7,rejected:1,recall_pending:1,returned:7,cash_confirmed:7};
      const lOrd=stOrder[le.status]||0;
      const rOrd=stOrder[re.status]||0;
      if(rOrd>lOrd){
        localMap.set(re.id,re); // Remote đã tiến xa hơn trong workflow
      }
    }
  });
  return Array.from(localMap.values());
}

// Merge advances
function mergeAdvances(localAdv, remoteAdv){
  const localMap=new Map(localAdv.map(a=>[a.id,a]));
  remoteAdv.forEach(ra=>{if(!localMap.has(ra.id))localMap.set(ra.id,ra);});
  return Array.from(localMap.values());
}

// Sync lên Google Sheets (v4: retry + queue + await loadFromSheets)
async function syncToSheets(data){
  if(isSyncing||!GSHEET_API)return;
  isSyncing=true;
  updateSyncUI('sync','⏳ Đang đồng bộ...');
  console.log('[SYNC] Start — items:',data.items.length,'user:',(currentUser?currentUser.username:'?'));
  try{
    // Bước 1: Load data hiện tại từ Sheets — BẮT BUỘC phải thành công
    let remoteItems=[],remoteAdvances=[],remoteBudgets={},remoteNextId=1,remoteAdvNextId=1;
    let preLoadOk=false;
    try{
      const loadRes=await fetch(GSHEET_API+'?action=load',{signal:AbortSignal.timeout(30000)});
      const lr=await loadRes.json();
      if(lr.ok){
        remoteItems=lr.items||[];
        remoteAdvances=lr.advances||[];
        remoteBudgets=lr.budgets||{};
        remoteNextId=lr.nextId||1;
        remoteAdvNextId=lr.advNextId||1;
        preLoadOk=true;
        console.log('[SYNC] Remote loaded:',remoteItems.length,'items');
      }else{
        console.warn('[SYNC] Remote load returned ok=false:',lr.error);
      }
    }catch(loadErr){console.warn('[SYNC] Pre-sync load error:',loadErr.message);}

    // *** CRITICAL FIX: Nếu pre-load FAIL và local có ÍT hơn remote (hoặc ko biết), DỪNG SYNC ***
    // Tránh ghi đè Sheets với data thiếu
    if(!preLoadOk){
      console.error('[SYNC] ABORTED: Cannot load remote data — refusing to POST to prevent data loss');
      updateSyncUI('err','⚠️ Không tải được dữ liệu server — chưa đồng bộ');
      _syncRetryCount++;
      if(_syncRetryCount<=SYNC_MAX_RETRY){
        const delay=5000*_syncRetryCount;
        console.log('[SYNC] Will retry in',delay/1000+'s...');
        updateSyncUI('warn','🔄 Thử lại lần '+_syncRetryCount+'...');
        isSyncing=false;
        setTimeout(()=>syncToSheets(data),delay);
        return;
      }
      isSyncing=false;
      updateSyncUI('err','⚠️ Không thể đồng bộ — kiểm tra kết nối mạng');
      return;
    }

    // Bước 2: Luôn dùng items HIỆN TẠI (không dùng snapshot cũ từ debounce)
    const currentData={items:[...items],budgets:{...budgets},nextId,advances:[...advances],advNextId,cashBatches:[...(cashBatches||[])],cashBatchNextId:cashBatchNextId||1};

    // Bước 3: Merge local + remote
    const mergedItems=mergeItems(currentData.items, remoteItems);
    const mergedAdvances=mergeAdvances(currentData.advances, remoteAdvances);
    const mergedNextId=Math.max(currentData.nextId||1, remoteNextId, mergedItems.reduce((mx,e)=>Math.max(mx,e.id),0)+1);
    const mergedAdvNextId=Math.max(currentData.advNextId||1, remoteAdvNextId, mergedAdvances.reduce((mx,a)=>Math.max(mx,a.id||0),0)+1);
    const mergedBudgets=Object.assign({},remoteBudgets,currentData.budgets||{});

    // Bước 4: Cập nhật local data với merged result
    items=mergedItems;
    nextId=mergedNextId;
    advances=mergedAdvances;
    advNextId=mergedAdvNextId;
    budgets=mergedBudgets;
    const mergedJson=JSON.stringify({items,budgets,nextId,advances,advNextId,cashBatches,cashBatchNextId,savedAt:new Date().toISOString()});
    try{localStorage.setItem(LS_KEY,mergedJson);}catch(se){}

    // Bước 5: POST merged data lên Sheets
    const merged={items:mergedItems,budgets:mergedBudgets,nextId:mergedNextId,advances:mergedAdvances,advNextId:mergedAdvNextId,
      cashBatches:currentData.cashBatches,cashBatchNextId:currentData.cashBatchNextId,savedAt:new Date().toISOString()};
    const syncUser=(typeof currentUser!=='undefined'&&currentUser)?currentUser.displayName||currentUser.username||currentRole:currentRole||'unknown';
    merged._syncUser=syncUser;
    merged._syncAction=_lastSyncAction||'auto-save';
    merged._syncDetail=_lastSyncDetail||'';
    _lastSyncAction='auto-save';_lastSyncDetail='';

    const bodyStr=JSON.stringify(merged);
    console.log('[SYNC] POST size:',bodyStr.length,'bytes, merged:',mergedItems.length,'items');
    const res=await fetch(GSHEET_API+'?action=save',{method:'POST',body:bodyStr,headers:{'Content-Type':'text/plain'},signal:AbortSignal.timeout(60000)});
    const r=await res.json();
    if(r.ok){
      console.log('[SYNC] SUCCESS:',r.savedAt,r.itemCount,'items');
      updateSyncUI('ok','☁️ Đã lưu '+new Date().toLocaleTimeString('vi-VN'));
      _syncRetryCount=0;
      if(mergedItems.length>currentData.items.length)rerender();
    }else{
      console.error('[SYNC] Server error:',r.error);
      updateSyncUI('err','⚠️ Lỗi: '+(r.error||'server error'));
      // Auto retry
      _syncRetryCount++;
      if(_syncRetryCount<=SYNC_MAX_RETRY){
        console.log('[SYNC] Auto retry',_syncRetryCount+'/'+SYNC_MAX_RETRY,'in 5s...');
        isSyncing=false;
        setTimeout(()=>syncToSheets(data),5000);
        return;
      }
    }
  }catch(e){
    console.error('[SYNC] FAILED:',e.message||e);
    updateSyncUI('err','⚠️ Lỗi kết nối: '+e.message);
    // Auto retry on network error
    _syncRetryCount++;
    if(_syncRetryCount<=SYNC_MAX_RETRY){
      const delay=5000*_syncRetryCount;
      console.log('[SYNC] Auto retry',_syncRetryCount+'/'+SYNC_MAX_RETRY,'in',delay/1000+'s...');
      updateSyncUI('warn','🔄 Thử lại lần '+_syncRetryCount+'...');
      isSyncing=false;
      setTimeout(()=>syncToSheets(data),delay);
      return;
    }
  }
  isSyncing=false;
  // Xử lý pending sync nếu có (data mới được tạo trong lúc đang sync)
  if(_pendingSyncData){
    const pd=_pendingSyncData;
    _pendingSyncData=null;
    console.log('[SYNC] Processing queued sync...');
    _syncRetryCount=0;
    setTimeout(()=>syncToSheets(pd),1000);
  }
}

// Load từ Google Sheets (khi mở trang) — v4: await + robust error handling
async function loadFromSheets(){
  if(!GSHEET_API)return;
  try{
    console.log('[LOAD] Fetching from Sheets...');
    const res=await fetch(GSHEET_API+'?action=load',{signal:AbortSignal.timeout(30000)});
    const r=await res.json();
    if(r.ok&&r.items&&r.items.length>0){
      const remoteItems=r.items||[];
      const remoteAdvances=r.advances||[];
      const remoteBudgets=r.budgets||{};
      const remoteNextId=r.nextId||1;
      const remoteAdvNextId=r.advNextId||1;

      const prevCount=items.length;
      items=mergeItems(items, remoteItems);
      advances=mergeAdvances(advances, remoteAdvances);
      nextId=Math.max(nextId, remoteNextId, items.reduce((mx,e)=>Math.max(mx,e.id),0)+1);
      advNextId=Math.max(advNextId, remoteAdvNextId, advances.reduce((mx,a)=>Math.max(mx,a.id||0),0)+1);
      budgets=Object.assign({},remoteBudgets,budgets);

      items.forEach(e=>{if(!('submitted'in e))e.submitted=false;if(!('submittedDate'in e))e.submittedDate='';if(!('remark'in e))e.remark='';});

      const json=JSON.stringify({items,budgets,nextId,advances,advNextId,cashBatches,cashBatchNextId,savedAt:new Date().toISOString()});
      try{localStorage.setItem(LS_KEY,json);}catch(se){}

      console.log('[LOAD] Merged: local='+prevCount+' remote='+remoteItems.length+' total='+items.length);
      _sheetsLoaded=true;
      rerender();
    }else{
      console.log('[LOAD] No items from Sheets or ok=false');
      _sheetsLoaded=true;
    }
    updateSyncUI('ok','☁️ Online');
  }catch(e){
    console.warn('[LOAD] Failed (offline):',e.message);
    updateSyncUI('warn','💾 Offline — dùng dữ liệu cục bộ');
    _sheetsLoaded=true; // Cho phép user thao tác dù offline
  }
}
// Backup: tải file JSON về máy
function backupData(){
  const data={items,budgets,nextId,advances,advNextId,cashBatches,cashBatchNextId,exportedAt:new Date().toISOString()};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='Loho_ChiPhi_Backup_'+new Date().toISOString().slice(0,10)+'.json';
  a.click();toast('Đã tải backup');
}
// Khôi phục từ file JSON backup
function restoreData(){
  const inp=document.createElement('input');inp.type='file';inp.accept='.json';
  inp.onchange=function(){
    const f=this.files[0];if(!f)return;
    const reader=new FileReader();
    reader.onload=function(){
      try{
        const d=JSON.parse(reader.result);
        if(!d.items||!Array.isArray(d.items)){toast('File không hợp lệ');return;}
        if(!confirm(`Khôi phục ${d.items.length} khoản chi phí từ backup ${d.exportedAt||''}?\nDữ liệu hiện tại sẽ bị thay thế.`))return;
        items=d.items;budgets=d.budgets||{};nextId=d.nextId||1;advances=d.advances||[];advNextId=d.advNextId||1;
        saveLog('khôi-phục-backup','Từ file '+f.name+' ('+d.items.length+' khoản)');rerender();toast(`Đã khôi phục ${items.length} khoản`);
      }catch(e){toast('Lỗi đọc file: '+e.message);}
    };reader.readAsText(f);
  };inp.click();
}
const PRELOAD=[];


// ============ USER MANAGEMENT (Boss only) ============
function buildUserMgmt(){
  return `
  <div class="cd"><div class="cd-h"><h2>Quản lý tài khoản<span class="cn"> 帳號管理</span></h2>
    <button class="btn btn-p" onclick="openAddUser()">+ Thêm tài khoản 新增帳號</button>
  </div>
  <div class="cd-b" style="overflow-x:auto">
    <table class="user-mgmt-table" id="userTable">
      <thead><tr><th>STT</th><th>Tài khoản 帳號</th><th>Tên hiển thị 顯示名</th><th>Vai trò 角色</th><th>Mã NV 員工代碼</th><th>Thao tác</th></tr></thead>
      <tbody id="userTbody"></tbody>
    </table>
  </div></div>`;
}

function canEditRole(role){
  if(isBoss())return true;
  if(isManager())return role==='staff'||role==='accountant';
  return false;
}
function renderUserMgmt(){
  const tbody=document.getElementById('userTbody');
  if(!tbody)return;
  const roleNames={staff:'Nhân viên 員工',accountant:'KT Bộ phận 部門會計',manager:'Quản lý 管理',boss:'Boss 老闆',chief_accountant:'KT Trưởng 總會計',cashier:'Thủ quỹ 出納'};
  const visibleUsers=isBoss()?USERS:USERS.filter(u=>u.role==='staff'||u.role==='accountant');
  tbody.innerHTML=visibleUsers.map(u=>{
    const realIdx=USERS.indexOf(u);
    const staffObj=u.staffCode?STAFF.find(s=>s.code===u.staffCode):null;
    const staffName=staffObj?staffObj.name+' ('+staffObj.code+')':'--';
    const isSelf=currentUser&&currentUser.username===u.username;
    const canEdit=canEditRole(u.role);
    return `<tr>
      <td>${realIdx+1}</td>
      <td style="font-weight:600">${u.username}</td>
      <td>${u.name}</td>
      <td><span class="role-tag ${u.role}">${roleNames[u.role]||u.role}</span></td>
      <td style="font-size:11px">${staffName}</td>
      <td>
        ${canEdit?`<button class="btn btn-sm btn-o" onclick="openEditUser(${realIdx})">Sửa 編輯</button>`:''}
        ${canEdit&&!isSelf?`<button class="btn btn-sm btn-w" onclick="resetUserPw(${realIdx})">🔑 Reset MK</button>`:''}
        ${canEdit&&!isSelf?`<button class="btn btn-sm btn-d" onclick="deleteUser(${realIdx})">Xoá 刪除</button>`:''}
        ${isSelf?'<span style="font-size:9px;color:var(--g400)">(bạn)</span>':''}
        ${!canEdit&&!isSelf?'<span style="font-size:9px;color:var(--g300)">—</span>':''}
      </td>
    </tr>`;
  }).join('');
}

function getRoleOptions(){
  const all=[
    {v:'staff',l:'Nhân viên 員工'},{v:'accountant',l:'KT Bộ phận 部門會計'},
    {v:'manager',l:'Quản lý 管理'},{v:'boss',l:'Boss 老闆'},
    {v:'chief_accountant',l:'KT Trưởng 總會計'},{v:'cashier',l:'Thủ quỹ 出納'}
  ];
  if(isBoss())return all;
  if(isManager())return all.filter(r=>r.v==='staff'||r.v==='accountant');
  return [];
}
function openAddUser(){
  document.getElementById('umTitle').textContent='Thêm tài khoản 新增帳號';
  document.getElementById('umIdx').value='-1';
  document.getElementById('umUsername').value='';
  document.getElementById('umPassword').value='';
  document.getElementById('umName').value='';
  const roleSelect=document.getElementById('umRole');
  roleSelect.innerHTML=getRoleOptions().map(r=>`<option value="${r.v}">${r.l}</option>`).join('');
  roleSelect.value='staff';
  const sel=document.getElementById('umStaffCode');
  sel.innerHTML='<option value="">-- Không --</option>'+STAFF.map(s=>`<option value="${s.code}">${s.name} ${s.cn} (${s.code})</option>`).join('');
  sel.value='';
  document.getElementById('userModal').classList.add('show');
}

function openEditUser(idx){
  const u=USERS[idx];if(!u)return;
  if(!canEditRole(u.role)){toast('Không có quyền sửa tài khoản này');return;}
  document.getElementById('umTitle').textContent='Sửa tài khoản 編輯帳號';
  document.getElementById('umIdx').value=idx;
  document.getElementById('umUsername').value=u.username;
  document.getElementById('umPassword').value=u.password;
  document.getElementById('umName').value=u.name;
  const roleSelect=document.getElementById('umRole');
  roleSelect.innerHTML=getRoleOptions().map(r=>`<option value="${r.v}">${r.l}</option>`).join('');
  roleSelect.value=u.role;
  const sel=document.getElementById('umStaffCode');
  sel.innerHTML='<option value="">-- Không --</option>'+STAFF.map(s=>`<option value="${s.code}">${s.name} ${s.cn} (${s.code})</option>`).join('');
  sel.value=u.staffCode||'';
  document.getElementById('userModal').classList.add('show');
}

function saveUser(){
  const idx=parseInt(document.getElementById('umIdx').value);
  const username=document.getElementById('umUsername').value.trim();
  const password=document.getElementById('umPassword').value;
  const name=document.getElementById('umName').value.trim();
  const role=document.getElementById('umRole').value;
  const staffCode=document.getElementById('umStaffCode').value;
  if(!username||!password||!name){toast('Điền đầy đủ thông tin');return;}
  // Manager guard: chỉ tạo/sửa staff và accountant
  if(isManager()&&!isBoss()&&role!=='staff'&&role!=='accountant'){toast('Bạn chỉ có quyền tạo TK Nhân viên hoặc KT Bộ phận');return;}
  if(isManager()&&!isBoss()&&idx!==-1&&!canEditRole(USERS[idx].role)){toast('Không có quyền sửa tài khoản này');return;}
  // Check duplicate username (except self when editing)
  const dup=USERS.findIndex(u=>u.username===username);
  if(dup!==-1&&dup!==idx){toast('Tài khoản đã tồn tại');return;}
  const userData={username,password,name,role,staffCode};
  if(idx===-1){USERS.push(userData);}
  else{USERS[idx]=userData;if(currentUser&&currentUser.username===username){currentUser=userData;currentRole=role;}}
  localStorage.setItem('loho_users',JSON.stringify(USERS));
  closeM('userModal');renderUserMgmt();toast('Đã lưu tài khoản');
}

function deleteUser(idx){
  const u=USERS[idx];if(!u)return;
  if(!canEditRole(u.role)){toast('Không có quyền xoá tài khoản này');return;}
  if(currentUser&&currentUser.username===u.username){toast('Không thể xoá tài khoản đang đăng nhập');return;}
  if(!confirm('Xoá tài khoản "'+u.username+'"?'))return;
  USERS.splice(idx,1);
  localStorage.setItem('loho_users',JSON.stringify(USERS));
  renderUserMgmt();toast('Đã xoá');
}

function showForgotPw(){
  document.getElementById('forgotPwModal').style.display='flex';
}

function resetUserPw(idx){
  const u=USERS[idx];if(!u)return;
  if(!canEditRole(u.role)){toast('Không có quyền reset mật khẩu tài khoản này');return;}
  const defaultPw=u.role==='boss'?'boss2026':'loho2026';
  if(!confirm('Reset mật khẩu tài khoản "'+u.username+'" về mặc định ('+defaultPw+')?\n重設帳號 "'+u.username+'" 的密碼為預設值？'))return;
  USERS[idx].password=defaultPw;
  if(currentUser&&currentUser.username===u.username)currentUser.password=defaultPw;
  localStorage.setItem('loho_users',JSON.stringify(USERS));
  renderUserMgmt();toast('Đã reset mật khẩu → '+defaultPw+' ✓');saveLog('reset-pw',u.username);
}







// ============ AUTO LOGIN ============
document.addEventListener('DOMContentLoaded',function(){tryAutoLogin();});
