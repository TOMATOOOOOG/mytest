# WeChat Mini Program Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a native WeChat Mini Program version of the Songjing Psychology website with five tabs, no booking form, and direct contact via WeChat customer service, phone, and map navigation.

**Architecture:** Keep the existing static website intact and add a new `miniprogram/` project beside it. The mini program uses local JS data modules for content, native WXML/WXSS pages for rendering, and WeChat APIs for contact actions.

**Tech Stack:** Native WeChat Mini Program, WXML, WXSS, JavaScript, WeChat Developer Tools, local image assets.

---

## File Structure

Create the mini program under `miniprogram/`:

```text
miniprogram/
  app.js
  app.json
  app.wxss
  project.config.json
  sitemap.json
  assets/
    images/
      contact-qr.png
      collage-calm.svg
      collage-conversation.svg
      collage-room.svg
      counselors/
  data/
    content.js
    contact.js
    counselors.js
  pages/
    home/
      home.js
      home.json
      home.wxml
      home.wxss
    services/
      services.js
      services.json
      services.wxml
      services.wxss
    team/
      team.js
      team.json
      team.wxml
      team.wxss
    about/
      about.js
      about.json
      about.wxml
      about.wxss
    contact/
      contact.js
      contact.json
      contact.wxml
      contact.wxss
```

Responsibilities:

- `app.json`: global page registration, tabBar, window theme.
- `app.wxss`: global tokens, cards, buttons, spacing, typography.
- `data/contact.js`: phone, email, address, hours, map coordinates, QR image path.
- `data/content.js`: home, service, about, FAQ, achievements content.
- `data/counselors.js`: counselor list and image paths.
- `pages/home`: compact landing page and primary contact entry.
- `pages/services`: counseling directions, process, formats, notices, FAQ.
- `pages/team`: founder and counselor cards.
- `pages/about`: philosophy, features, achievements, reviews, partners.
- `pages/contact`: WeChat contact, phone call, map navigation, QR, address.

## Task 1: Scaffold Native Mini Program

**Files:**
- Create: `miniprogram/app.js`
- Create: `miniprogram/app.json`
- Create: `miniprogram/app.wxss`
- Create: `miniprogram/project.config.json`
- Create: `miniprogram/sitemap.json`
- Create: `miniprogram/pages/home/home.json`
- Create: `miniprogram/pages/services/services.json`
- Create: `miniprogram/pages/team/team.json`
- Create: `miniprogram/pages/about/about.json`
- Create: `miniprogram/pages/contact/contact.json`

- [ ] **Step 1: Create the mini program root files**

Create `miniprogram/app.js`:

```js
App({
  globalData: {
    brandName: '松境心理'
  }
})
```

Create `miniprogram/app.json`:

```json
{
  "pages": [
    "pages/home/home",
    "pages/services/services",
    "pages/team/team",
    "pages/about/about",
    "pages/contact/contact"
  ],
  "window": {
    "navigationBarTitleText": "松境心理",
    "navigationBarBackgroundColor": "#F8F4EC",
    "navigationBarTextStyle": "black",
    "backgroundColor": "#F8F4EC"
  },
  "tabBar": {
    "color": "#766F65",
    "selectedColor": "#6D8B74",
    "backgroundColor": "#FFFDF8",
    "borderStyle": "white",
    "list": [
      { "pagePath": "pages/home/home", "text": "首页" },
      { "pagePath": "pages/services/services", "text": "服务" },
      { "pagePath": "pages/team/team", "text": "团队" },
      { "pagePath": "pages/about/about", "text": "关于" },
      { "pagePath": "pages/contact/contact", "text": "联系" }
    ]
  },
  "style": "v2",
  "sitemapLocation": "sitemap.json"
}
```

Create `miniprogram/project.config.json`:

```json
{
  "description": "松境心理微信小程序",
  "packOptions": {
    "ignore": []
  },
  "setting": {
    "urlCheck": true,
    "es6": true,
    "enhance": true,
    "postcss": true,
    "minified": true
  },
  "compileType": "miniprogram",
  "libVersion": "latest",
  "appid": "touristappid",
  "projectname": "songjing-miniprogram",
  "condition": {}
}
```

Create `miniprogram/sitemap.json`:

```json
{
  "rules": [
    {
      "action": "allow",
      "page": "*"
    }
  ]
}
```

- [ ] **Step 2: Create global WXSS**

Create `miniprogram/app.wxss`:

```css
page {
  background: #f8f4ec;
  color: #2f312d;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 30rpx;
  line-height: 1.7;
}

.page {
  min-height: 100vh;
  padding: 32rpx 28rpx 72rpx;
  box-sizing: border-box;
}

.section {
  margin-bottom: 44rpx;
}

.section-title {
  margin: 0 0 20rpx;
  color: #24352b;
  font-size: 40rpx;
  font-weight: 700;
  line-height: 1.28;
}

.section-lead {
  margin: 0 0 26rpx;
  color: #67645d;
  font-size: 28rpx;
}

.eyebrow {
  margin-bottom: 12rpx;
  color: #6d8b74;
  font-size: 24rpx;
  font-weight: 700;
  letter-spacing: 2rpx;
}

.card {
  padding: 30rpx;
  border: 1rpx solid rgba(109, 139, 116, 0.18);
  border-radius: 20rpx;
  background: #fffdf8;
  box-shadow: 0 14rpx 36rpx rgba(60, 50, 35, 0.06);
}

.card + .card {
  margin-top: 20rpx;
}

.card-title {
  margin: 0 0 10rpx;
  color: #24352b;
  font-size: 32rpx;
  font-weight: 700;
}

.card-text {
  margin: 0;
  color: #67645d;
  font-size: 27rpx;
}

.pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14rpx;
}

.pill {
  padding: 8rpx 18rpx;
  border-radius: 999rpx;
  background: rgba(109, 139, 116, 0.12);
  color: #496553;
  font-size: 24rpx;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14rpx;
}

.action-button,
.ghost-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 78rpx;
  padding: 0 18rpx;
  border: none;
  border-radius: 999rpx;
  box-sizing: border-box;
  font-size: 26rpx;
  line-height: 1.2;
}

.action-button {
  background: #6d8b74;
  color: #ffffff;
}

.ghost-button {
  border: 1rpx solid rgba(109, 139, 116, 0.28);
  background: #fffdf8;
  color: #496553;
}

.hero {
  overflow: hidden;
  margin: 0 0 34rpx;
  padding: 44rpx 34rpx;
  border-radius: 28rpx;
  background: linear-gradient(145deg, #fffdf8 0%, #edf3e8 100%);
}

.hero-title {
  margin: 0 0 18rpx;
  color: #24352b;
  font-size: 48rpx;
  font-weight: 700;
  line-height: 1.22;
}

.hero-text {
  margin: 0;
  color: #5f615a;
  font-size: 28rpx;
}
```

- [ ] **Step 3: Create page JSON files**

Create each page JSON with the exact title:

`miniprogram/pages/home/home.json`

```json
{ "navigationBarTitleText": "松境心理" }
```

`miniprogram/pages/services/services.json`

```json
{ "navigationBarTitleText": "我们的服务" }
```

`miniprogram/pages/team/team.json`

```json
{ "navigationBarTitleText": "咨询师团队" }
```

`miniprogram/pages/about/about.json`

```json
{ "navigationBarTitleText": "关于松境" }
```

`miniprogram/pages/contact/contact.json`

```json
{ "navigationBarTitleText": "联系我们" }
```

- [ ] **Step 4: Check scaffold can be imported**

Run no CLI build because WeChat Developer Tools is required. Check files exist:

```powershell
Test-Path miniprogram/app.json
Test-Path miniprogram/pages/home/home.json
```

Expected: both commands print `True`.

- [ ] **Step 5: Commit scaffold**

```bash
git add miniprogram/app.js miniprogram/app.json miniprogram/app.wxss miniprogram/project.config.json miniprogram/sitemap.json miniprogram/pages
git commit -m "feat: scaffold wechat mini program"
```

## Task 2: Add Shared Data Modules

**Files:**
- Create: `miniprogram/data/contact.js`
- Create: `miniprogram/data/content.js`
- Create: `miniprogram/data/counselors.js`

- [ ] **Step 1: Create contact data**

Create `miniprogram/data/contact.js`:

```js
const contact = {
  phone: '13221940530',
  email: 'consult@songjingpsy.com.cn',
  address: '海曙区高桥镇梁祝路12弄良库梧桐里D3-102号',
  hours: ['周一至周五 9:00 - 18:00', '周六 9:00 - 12:00'],
  map: {
    name: '松境心理',
    address: '海曙区高桥镇梁祝路12弄良库梧桐里D3-102号',
    latitude: 29.874556,
    longitude: 121.428148,
    scale: 18
  },
  qrImage: '/assets/images/contact-qr.png'
}

module.exports = contact
```

The coordinates are an implementation seed and must be verified on a real map before release. If the map opens to the wrong building, update only `latitude` and `longitude`.

- [ ] **Step 2: Create content data**

Create `miniprogram/data/content.js`:

```js
const home = {
  hero: {
    eyebrow: '专业心理咨询 · 温暖陪伴 · 持续成长',
    title: '在松境，慢慢找回内心的安定与力量',
    text: '松境心理为来访者提供情绪压力、亲密关系、青少年成长、家庭关系与个人探索等咨询支持。我们以稳定、尊重和真诚的方式，陪您把困扰说清楚，把力量找回来。'
  },
  trust: ['线上 / 线下面询', '团队匹配支持', '咨询伦理与隐私保护'],
  issues: [
    { title: '情绪与压力', text: '焦虑、低落、失眠、内耗、情绪失控，或总觉得自己停不下来、累得无法恢复。' },
    { title: '关系与家庭', text: '亲密关系、原生家庭、亲子沟通、人际边界与家庭冲突中的反复消耗。' },
    { title: '青少年成长', text: '厌学、社交压力、亲子冲突、情绪波动、自我认同与成长困惑。' },
    { title: '个人探索', text: '自我价值、生命意义、职业选择、长期困扰模式与内在力量的重新建立。' }
  ],
  services: [
    { title: '个人心理咨询', text: '支持情绪压力、人际关系、原生家庭、自我成长与生命意义探索。' },
    { title: '青少年与家庭支持', text: '帮助青少年和家庭理解问题背后的需求，建立更稳定的沟通方式。' },
    { title: '情感与关系咨询', text: '陪伴来访者理解亲密关系中的期待、伤痛、边界与选择。' }
  ],
  process: [
    { title: '初步沟通', text: '通过电话、微信或邮箱说明主要困扰、可咨询时间与偏好的咨询形式。' },
    { title: '咨询师匹配', text: '根据议题、期待和时间安排，协助匹配合适的咨询师。' },
    { title: '正式咨询', text: '在稳定、安全、保密的设置中开始咨询。' },
    { title: '持续跟进', text: '围绕咨询目标持续理解和调整，支持长期改变。' }
  ],
  teamPreview: ['陈新雅', '胡启璇', '任希蕊']
}

const services = {
  intro: '松境咨询以专业、稳定、真诚的方式陪伴来访者理解自身状态，改善生活质量与日常功能。',
  directions: [
    { title: '心理 / 情绪困扰', text: '为受到焦虑、低落、强迫等情绪和心理困扰影响的来访者提供支持。' },
    { title: '青少年成长', text: '支持青少年面对学习、人际、自我认同和亲子关系中的困扰。' },
    { title: '各类亲密关系', text: '理解亲密关系、婚恋关系和家庭关系中的期待、冲突与边界。' },
    { title: '职场', text: '支持职场压力、人际协作、职业选择与价值感探索。' },
    { title: '个人成长', text: '陪伴来访者理解长期困扰模式，探索更自由和稳定的生活方式。' }
  ],
  stages: ['缓解心理压抑', '初步化解恐惧', '看到深层控制', '恢复感知'],
  process: ['联系客服顾问', '初始评估', '选择咨询师', '签署咨询协议', '咨询', '持续关怀与回访'],
  formats: ['咨询 / Counseling', '直播课程 / Live Workshop', '成长营、沙龙 / Group Sharing', '访客长期支持计划 / Holistic Support Services', '咨询师培养 / Counselor Development'],
  notices: [
    '服务内容为心理咨询支持，不涉及医疗诊断或治疗。',
    '咨询需提前预约，若需改期请提前联系。',
    '咨询师严格遵守职业伦理，对个人信息与咨询内容承担保密义务，法律另有要求的情况除外。',
    '咨询一旦开始不支持退款；未开始服务如遇特殊情况可联系客服协商。',
    '正式咨询前需阅读并签署完整咨询协议。'
  ],
  faq: [
    {
      question: '心理咨询能替代医疗诊断和治疗吗？',
      answer: '不能。心理咨询可以帮助来访者理解困扰相关的感受、经历与生活影响，但不能替代必要的医疗诊断、药物治疗或急救支持。'
    },
    {
      question: '第一次联系需要准备什么？',
      answer: '可以先简单说明主要困扰、可咨询时间、希望线上或线下咨询，以及是否有偏好的咨询师。'
    },
    {
      question: '可以表达对咨询的不满意吗？',
      answer: '可以。咨询中的疑问、不满意和误解都值得被认真讨论，机构和咨询师会尽力回应合理诉求。'
    }
  ]
}

const about = {
  intro: '松境心理是一支以专业、真诚和稳定为核心的心理咨询团队。我们相信，许多痛苦都值得被认真理解和看见。',
  philosophy: [
    { title: '心的觉悟', text: '在理解中看见困扰背后的意义，也看见改变发生的可能。' },
    { title: '真心相伴', text: '用稳定、尊重和真诚陪伴来访者走过艰难阶段。' },
    { title: '大爱', text: '以人为本，珍惜每一个生命经验的独特性。' }
  ],
  features: ['心理困扰支持', '情感家庭问题', '青少年问题', '自我成长'],
  challenge: '我们关注那些反复发生、难以停止的内在困扰，帮助来访者探寻内心，理解困扰，逐步恢复感知和选择。',
  stats: [
    { number: '专业团队', label: '多位认证心理咨询师' },
    { number: '持续支持', label: '线上 / 线下面询' },
    { number: '伦理保护', label: '重视隐私与咨询边界' }
  ],
  reviews: [
    '在稳定的陪伴里，我开始能把自己的感受说清楚。',
    '咨询帮助我重新理解家庭关系中的许多反复。',
    '第一次联系前很紧张，但整个流程比想象中更温和。'
  ],
  partners: ['企业心理支持', '成长课程合作', '线下沙龙活动']
}

module.exports = {
  home,
  services,
  about
}
```

- [ ] **Step 3: Create counselor data**

Create `miniprogram/data/counselors.js`:

```js
const founder = {
  name: '边志瑜',
  title: '咨询理论创始人 · Founder of the Counseling Theory · Dr.Bian',
  image: '',
  summary: '松境心理创始人，带领团队以专业、稳定和真诚的方式支持来访者理解困扰并恢复内在力量。'
}

const counselors = [
  { name: '陈新雅', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/chen-xinya.jpg', tags: ['情绪压力', '人际关系', '个人成长'] },
  { name: '董晓童', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/dong-xiaotong.jpg', tags: ['青少年成长', '家庭关系', '自我探索'] },
  { name: '胡启璇', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/hu-qixuan.jpg', tags: ['情绪困扰', '关系议题', '成长支持'] },
  { name: '李双如', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/li-shuangru.jpg', tags: ['亲密关系', '个人成长', '压力支持'] },
  { name: '李思怡', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/default.jpg', tags: ['情绪压力', '自我探索', '关系支持'] },
  { name: '李彤', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/li-tong.jpg', tags: ['青少年成长', '家庭关系', '人际关系'] },
  { name: '林炳龙', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/lin-binglong.png', tags: ['情绪支持', '个人探索', '关系议题'] },
  { name: '鲁碧', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/lu-bi.jpg', tags: ['情绪压力', '关系困扰', '个人成长'] },
  { name: '任希蕊', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/ren-xirui.jpg', tags: ['强迫', '焦虑', '青少年成长'] },
  { name: '宋秋雨', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/song-qiuyu.jpg', tags: ['情绪困扰', '家庭关系', '自我成长'] },
  { name: '汪娜', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/wang-na.jpg', tags: ['关系支持', '情绪压力', '成长探索'] },
  { name: '王琪璐', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/wang-qilu.jpg', tags: ['青少年成长', '情绪支持', '人际关系'] },
  { name: '王杨', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/wang-yang.jpg', tags: ['个人成长', '职场压力', '关系议题'] },
  { name: '王颖', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/wang-ying.jpg', tags: ['情绪困扰', '亲密关系', '家庭关系'] },
  { name: '晓敏', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/default.jpg', tags: ['情绪压力', '自我探索', '关系支持'] },
  { name: '杨恩可', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/default.jpg', tags: ['青少年成长', '家庭关系', '情绪支持'] },
  { name: '张文', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/zhang-wen.jpg', tags: ['情绪压力', '人际关系', '个人成长'] },
  { name: '郑华新', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/zheng-huaxin.jpg', tags: ['关系困扰', '个人探索', '情绪支持'] },
  { name: '郑琦', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/zheng-qi.jpg', tags: ['青少年成长', '家庭关系', '个人成长'] },
  { name: '枝繁', title: '松境心理认证心理咨询师', image: '/assets/images/counselors/default.jpg', tags: ['情绪压力', '关系支持', '自我探索'] }
]

module.exports = {
  founder,
  counselors
}
```

- [ ] **Step 4: Verify data modules are syntactically valid**

Run:

```powershell
node -e "require('./miniprogram/data/contact.js'); require('./miniprogram/data/content.js'); require('./miniprogram/data/counselors.js'); console.log('data ok')"
```

Expected: prints `data ok`.

- [ ] **Step 5: Commit shared data**

```bash
git add miniprogram/data
git commit -m "feat: add mini program content data"
```

## Task 3: Implement Home, Services, and About Pages

**Files:**
- Create: `miniprogram/pages/home/home.js`
- Create: `miniprogram/pages/home/home.wxml`
- Create: `miniprogram/pages/home/home.wxss`
- Create: `miniprogram/pages/services/services.js`
- Create: `miniprogram/pages/services/services.wxml`
- Create: `miniprogram/pages/services/services.wxss`
- Create: `miniprogram/pages/about/about.js`
- Create: `miniprogram/pages/about/about.wxml`
- Create: `miniprogram/pages/about/about.wxss`

- [ ] **Step 1: Implement home page logic**

Create `miniprogram/pages/home/home.js`:

```js
const content = require('../../data/content')
const contact = require('../../data/contact')

Page({
  data: {
    home: content.home,
    contact
  },
  callPhone() {
    wx.makePhoneCall({ phoneNumber: this.data.contact.phone })
  },
  openMap() {
    wx.openLocation(this.data.contact.map)
  }
})
```

- [ ] **Step 2: Implement home page markup**

Create `miniprogram/pages/home/home.wxml`:

```xml
<view class="page">
  <view class="hero">
    <view class="eyebrow">{{home.hero.eyebrow}}</view>
    <view class="hero-title">{{home.hero.title}}</view>
    <view class="hero-text">{{home.hero.text}}</view>
  </view>

  <view class="section">
    <view class="action-grid">
      <button class="action-button" open-type="contact">微信咨询</button>
      <button class="ghost-button" bindtap="callPhone">拨打电话</button>
      <button class="ghost-button" bindtap="openMap">地图导航</button>
    </view>
  </view>

  <view class="section">
    <view class="section-title">当这些感受反复出现</view>
    <view class="card" wx:for="{{home.issues}}" wx:key="title">
      <view class="card-title">{{item.title}}</view>
      <view class="card-text">{{item.text}}</view>
    </view>
  </view>

  <view class="section">
    <view class="section-title">我们的服务</view>
    <view class="card" wx:for="{{home.services}}" wx:key="title">
      <view class="card-title">{{item.title}}</view>
      <view class="card-text">{{item.text}}</view>
    </view>
  </view>

  <view class="section">
    <view class="section-title">咨询流程清晰，第一次联系也不用紧张</view>
    <view class="card" wx:for="{{home.process}}" wx:key="title">
      <view class="card-title">{{index + 1}}. {{item.title}}</view>
      <view class="card-text">{{item.text}}</view>
    </view>
  </view>
</view>
```

- [ ] **Step 3: Add home page local styles**

Create `miniprogram/pages/home/home.wxss`:

```css
.section:first-of-type {
  margin-top: -8rpx;
}
```

- [ ] **Step 4: Implement services page**

Create `miniprogram/pages/services/services.js`:

```js
const content = require('../../data/content')
const contact = require('../../data/contact')

Page({
  data: {
    services: content.services,
    contact,
    openFaqIndex: -1
  },
  toggleFaq(event) {
    const index = event.currentTarget.dataset.index
    this.setData({ openFaqIndex: this.data.openFaqIndex === index ? -1 : index })
  },
  callPhone() {
    wx.makePhoneCall({ phoneNumber: this.data.contact.phone })
  }
})
```

Create `miniprogram/pages/services/services.wxml`:

```xml
<view class="page">
  <view class="hero">
    <view class="eyebrow">Service</view>
    <view class="hero-title">我们的服务</view>
    <view class="hero-text">{{services.intro}}</view>
  </view>

  <view class="section">
    <view class="section-title">松境咨询能够为您解决什么</view>
    <view class="card" wx:for="{{services.directions}}" wx:key="title">
      <view class="card-title">{{item.title}}</view>
      <view class="card-text">{{item.text}}</view>
    </view>
  </view>

  <view class="section">
    <view class="section-title">了解咨询阶段</view>
    <view class="pill-row">
      <view class="pill" wx:for="{{services.stages}}" wx:key="*this">{{item}}</view>
    </view>
  </view>

  <view class="section">
    <view class="section-title">专业咨询流程</view>
    <view class="card" wx:for="{{services.process}}" wx:key="*this">
      <view class="card-title">{{index + 1}}. {{item}}</view>
    </view>
  </view>

  <view class="section">
    <view class="section-title">服务形式</view>
    <view class="card" wx:for="{{services.formats}}" wx:key="*this">
      <view class="card-title">{{item}}</view>
    </view>
  </view>

  <view class="section">
    <view class="section-title">咨询须知</view>
    <view class="notice" wx:for="{{services.notices}}" wx:key="*this">{{item}}</view>
  </view>

  <view class="section">
    <view class="section-title">常见问题</view>
    <view class="faq-card" wx:for="{{services.faq}}" wx:key="question">
      <view class="faq-question" data-index="{{index}}" bindtap="toggleFaq">{{item.question}}</view>
      <view class="faq-answer" wx:if="{{openFaqIndex === index}}">{{item.answer}}</view>
    </view>
  </view>

  <button class="action-button wide" bindtap="callPhone">联系咨询顾问</button>
</view>
```

Create `miniprogram/pages/services/services.wxss`:

```css
.notice {
  position: relative;
  margin-bottom: 16rpx;
  padding-left: 28rpx;
  color: #67645d;
  font-size: 27rpx;
}

.notice::before {
  content: "";
  position: absolute;
  left: 0;
  top: 18rpx;
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: #6d8b74;
}

.faq-card {
  overflow: hidden;
  margin-bottom: 16rpx;
  border-radius: 18rpx;
  background: #fffdf8;
  border: 1rpx solid rgba(109, 139, 116, 0.16);
}

.faq-question {
  padding: 24rpx 28rpx;
  color: #24352b;
  font-weight: 700;
}

.faq-answer {
  padding: 0 28rpx 26rpx;
  color: #67645d;
  font-size: 27rpx;
}

.wide {
  width: 100%;
}
```

- [ ] **Step 5: Implement about page**

Create `miniprogram/pages/about/about.js`:

```js
const content = require('../../data/content')

Page({
  data: {
    about: content.about
  }
})
```

Create `miniprogram/pages/about/about.wxml`:

```xml
<view class="page">
  <view class="hero">
    <view class="eyebrow">About Songjing</view>
    <view class="hero-title">关于松境</view>
    <view class="hero-text">{{about.intro}}</view>
  </view>

  <view class="section">
    <view class="section-title">松境理念</view>
    <view class="card" wx:for="{{about.philosophy}}" wx:key="title">
      <view class="card-title">{{item.title}}</view>
      <view class="card-text">{{item.text}}</view>
    </view>
  </view>

  <view class="section">
    <view class="section-title">咨询特色</view>
    <view class="pill-row">
      <view class="pill" wx:for="{{about.features}}" wx:key="*this">{{item}}</view>
    </view>
  </view>

  <view class="section">
    <view class="section-title">我们关注的核心难题</view>
    <view class="card">
      <view class="card-text">{{about.challenge}}</view>
    </view>
  </view>

  <view class="section">
    <view class="section-title">松境数据</view>
    <view class="card" wx:for="{{about.stats}}" wx:key="label">
      <view class="card-title">{{item.number}}</view>
      <view class="card-text">{{item.label}}</view>
    </view>
  </view>

  <view class="section">
    <view class="section-title">客户评价</view>
    <view class="card" wx:for="{{about.reviews}}" wx:key="*this">
      <view class="card-text">“{{item}}”</view>
    </view>
  </view>
</view>
```

Create `miniprogram/pages/about/about.wxss`:

```css
.card-text {
  font-size: 28rpx;
}
```

- [ ] **Step 6: Verify pages reference data without syntax errors**

Run:

```powershell
node -e "require('./miniprogram/pages/home/home.js'); require('./miniprogram/pages/services/services.js'); require('./miniprogram/pages/about/about.js'); console.log('pages ok')"
```

Expected: prints `pages ok` if `Page` and `wx` are not executed during require. If Node reports `Page is not defined`, run this instead:

```powershell
node -e "global.Page = function() {}; require('./miniprogram/pages/home/home.js'); require('./miniprogram/pages/services/services.js'); require('./miniprogram/pages/about/about.js'); console.log('pages ok')"
```

Expected: prints `pages ok`.

- [ ] **Step 7: Commit pages**

```bash
git add miniprogram/pages/home miniprogram/pages/services miniprogram/pages/about
git commit -m "feat: add mini program content pages"
```

## Task 4: Implement Team and Contact Pages

**Files:**
- Create: `miniprogram/pages/team/team.js`
- Create: `miniprogram/pages/team/team.wxml`
- Create: `miniprogram/pages/team/team.wxss`
- Create: `miniprogram/pages/contact/contact.js`
- Create: `miniprogram/pages/contact/contact.wxml`
- Create: `miniprogram/pages/contact/contact.wxss`

- [ ] **Step 1: Implement team page**

Create `miniprogram/pages/team/team.js`:

```js
const team = require('../../data/counselors')

Page({
  data: {
    founder: team.founder,
    counselors: team.counselors
  }
})
```

Create `miniprogram/pages/team/team.wxml`:

```xml
<view class="page">
  <view class="hero">
    <view class="eyebrow">Team</view>
    <view class="hero-title">咨询师团队</view>
    <view class="hero-text">我们是一群志同道合的伙伴，希望以专业、真诚的心理咨询支持每一位正在经历困扰的人。</view>
  </view>

  <view class="section">
    <view class="section-title">创始人</view>
    <view class="card">
      <view class="card-title">{{founder.name}}</view>
      <view class="team-title">{{founder.title}}</view>
      <view class="card-text">{{founder.summary}}</view>
    </view>
  </view>

  <view class="section">
    <view class="section-title">咨询师介绍</view>
    <view class="counselor-card" wx:for="{{counselors}}" wx:key="name">
      <image class="counselor-image" src="{{item.image}}" mode="aspectFill"></image>
      <view class="counselor-body">
        <view class="card-title">{{item.name}}</view>
        <view class="team-title">{{item.title}}</view>
        <view class="pill-row">
          <view class="pill" wx:for="{{item.tags}}" wx:key="*this">{{item}}</view>
        </view>
      </view>
    </view>
  </view>

  <button class="action-button" open-type="contact">联系咨询顾问</button>
</view>
```

Create `miniprogram/pages/team/team.wxss`:

```css
.team-title {
  margin: 0 0 16rpx;
  color: #6d8b74;
  font-size: 24rpx;
  font-weight: 700;
}

.counselor-card {
  display: flex;
  overflow: hidden;
  margin-bottom: 20rpx;
  border-radius: 22rpx;
  background: #fffdf8;
  border: 1rpx solid rgba(109, 139, 116, 0.16);
}

.counselor-image {
  width: 180rpx;
  height: 220rpx;
  flex-shrink: 0;
  background: #edf3e8;
}

.counselor-body {
  flex: 1;
  padding: 24rpx;
}
```

- [ ] **Step 2: Implement contact page**

Create `miniprogram/pages/contact/contact.js`:

```js
const contact = require('../../data/contact')

Page({
  data: {
    contact
  },
  callPhone() {
    wx.makePhoneCall({ phoneNumber: this.data.contact.phone })
  },
  openMap() {
    wx.openLocation(this.data.contact.map)
  }
})
```

Create `miniprogram/pages/contact/contact.wxml`:

```xml
<view class="page">
  <view class="hero">
    <view class="eyebrow">Contact</view>
    <view class="hero-title">联系我们</view>
    <view class="hero-text">如果您正在犹豫，可以先从一次沟通开始。</view>
  </view>

  <view class="section">
    <view class="action-grid contact-actions">
      <button class="action-button" open-type="contact">微信咨询</button>
      <button class="ghost-button" bindtap="callPhone">拨打电话</button>
      <button class="ghost-button" bindtap="openMap">地图导航</button>
    </view>
  </view>

  <view class="section">
    <view class="card contact-card">
      <view class="card-title">电话</view>
      <view class="card-text">{{contact.phone}}</view>
    </view>
    <view class="card contact-card">
      <view class="card-title">邮箱</view>
      <view class="card-text">{{contact.email}}</view>
    </view>
    <view class="card contact-card">
      <view class="card-title">地址</view>
      <view class="card-text">{{contact.address}}</view>
    </view>
    <view class="card contact-card">
      <view class="card-title">工作时间</view>
      <view class="card-text" wx:for="{{contact.hours}}" wx:key="*this">{{item}}</view>
    </view>
  </view>

  <view class="section">
    <view class="section-title">微信咨询二维码</view>
    <view class="qr-card">
      <image class="qr-image" src="{{contact.qrImage}}" mode="aspectFit"></image>
      <view class="card-text">如客服按钮不可用，可扫码添加咨询顾问。</view>
    </view>
  </view>
</view>
```

Create `miniprogram/pages/contact/contact.wxss`:

```css
.contact-actions {
  grid-template-columns: 1fr;
}

.contact-card .card-text + .card-text {
  margin-top: 4rpx;
}

.qr-card {
  padding: 34rpx;
  text-align: center;
  border-radius: 22rpx;
  background: #fffdf8;
  border: 1rpx solid rgba(109, 139, 116, 0.16);
}

.qr-image {
  width: 320rpx;
  height: 320rpx;
  margin-bottom: 20rpx;
}
```

- [ ] **Step 3: Verify contact action code**

Run:

```powershell
node -e "global.Page = function(config) { if (!config.callPhone || !config.openMap) throw new Error('missing contact methods') }; require('./miniprogram/pages/contact/contact.js'); console.log('contact methods ok')"
```

Expected: prints `contact methods ok`.

- [ ] **Step 4: Commit team and contact pages**

```bash
git add miniprogram/pages/team miniprogram/pages/contact
git commit -m "feat: add team and contact mini program pages"
```

## Task 5: Copy and Optimize Assets

**Files:**
- Create: `miniprogram/assets/images/contact-qr.png`
- Create: `miniprogram/assets/images/collage-calm.svg`
- Create: `miniprogram/assets/images/collage-conversation.svg`
- Create: `miniprogram/assets/images/collage-room.svg`
- Create: `miniprogram/assets/images/counselors/*.jpg`
- Create: `miniprogram/assets/images/counselors/*.png`

- [ ] **Step 1: Create asset folders**

Run:

```powershell
New-Item -ItemType Directory -Force miniprogram/assets/images/counselors
```

Expected: folder exists.

- [ ] **Step 2: Copy small existing assets**

Run:

```powershell
Copy-Item file/code.png miniprogram/assets/images/contact-qr.png
Copy-Item assets/collage-calm.svg miniprogram/assets/images/collage-calm.svg
Copy-Item assets/collage-conversation.svg miniprogram/assets/images/collage-conversation.svg
Copy-Item assets/collage-room.svg miniprogram/assets/images/collage-room.svg
```

Expected: files exist in `miniprogram/assets/images/`.

- [ ] **Step 3: Create counselor image copies**

Run these copies first, preserving original source files:

```powershell
Copy-Item "file/202511咨询师简介/陈新雅.jpg" "miniprogram/assets/images/counselors/chen-xinya.jpg"
Copy-Item "file/202511咨询师简介/5555.jpg" "miniprogram/assets/images/counselors/default.jpg"
Copy-Item "file/202511咨询师简介/胡启璇.jpg" "miniprogram/assets/images/counselors/hu-qixuan.jpg"
Copy-Item "file/202511咨询师简介/李双如.jpg" "miniprogram/assets/images/counselors/li-shuangru.jpg"
Copy-Item "file/202511咨询师简介/李彤.jpg" "miniprogram/assets/images/counselors/li-tong.jpg"
Copy-Item "file/202511咨询师简介/林炳龙(1).png" "miniprogram/assets/images/counselors/lin-binglong.png"
Copy-Item "file/202511咨询师简介/鲁碧.jpg" "miniprogram/assets/images/counselors/lu-bi.jpg"
Copy-Item "file/202511咨询师简介/任希蕊.jpg" "miniprogram/assets/images/counselors/ren-xirui.jpg"
Copy-Item "file/202511咨询师简介/宋秋雨.jpg" "miniprogram/assets/images/counselors/song-qiuyu.jpg"
Copy-Item "file/202511咨询师简介/汪娜.jpg" "miniprogram/assets/images/counselors/wang-na.jpg"
Copy-Item "file/202511咨询师简介/王琪璐.jpg" "miniprogram/assets/images/counselors/wang-qilu.jpg"
Copy-Item "file/202511咨询师简介/王杨.jpg" "miniprogram/assets/images/counselors/wang-yang.jpg"
Copy-Item "file/202511咨询师简介/王颖.jpg" "miniprogram/assets/images/counselors/wang-ying.jpg"
Copy-Item "file/202511咨询师简介/张文.jpg" "miniprogram/assets/images/counselors/zhang-wen.jpg"
Copy-Item "file/202511咨询师简介/郑华新.jpg" "miniprogram/assets/images/counselors/zheng-huaxin.jpg"
Copy-Item "file/202511咨询师简介/郑琦.jpg" "miniprogram/assets/images/counselors/zheng-qi.jpg"
```

Expected: all referenced image paths from `data/counselors.js` exist.

- [ ] **Step 4: Compress oversized images if ImageMagick is installed**

Check:

```powershell
Get-Command magick -ErrorAction SilentlyContinue
```

If the command exists, run:

```powershell
Get-ChildItem miniprogram/assets/images/counselors -Include *.jpg,*.png -Recurse | ForEach-Object {
  magick $_.FullName -auto-orient -resize 720x720^> -quality 82 $_.FullName
}
```

Expected: images remain visually usable and total asset size is lower.

If `magick` is not installed, leave copied images as-is for now and verify mini program package size in WeChat Developer Tools. Oversized images can be compressed manually before upload.

- [ ] **Step 5: Verify image references**

Run:

```powershell
node -e "const fs=require('fs'); const {counselors}=require('./miniprogram/data/counselors'); const missing=counselors.map(c=>c.image.replace(/^\\//,'miniprogram/')).filter(p=>!fs.existsSync(p)); if(missing.length){ console.error(missing); process.exit(1)} console.log('images ok')"
```

Expected: prints `images ok`.

- [ ] **Step 6: Commit assets**

```bash
git add miniprogram/assets
git commit -m "feat: add mini program assets"
```

## Task 6: Validate Project and Prepare Handoff

**Files:**
- Modify: `README.md` if it exists
- Create: `miniprogram/README.md`

- [ ] **Step 1: Create mini program README**

Create `miniprogram/README.md`:

```markdown
# 松境心理微信小程序

这是松境心理官网的小程序版本。第一版为展示型小程序，包含首页、服务、团队、关于、联系五个 tab。

## 导入方式

1. 打开微信开发者工具。
2. 选择“导入项目”。
3. 项目目录选择本仓库的 `miniprogram/`。
4. 开发阶段可使用测试号；正式上传前将 `project.config.json` 中的 `appid` 改为真实小程序 AppID。

## 第一版功能

- 品牌与服务展示
- 咨询师团队展示
- 微信客服入口
- 电话拨打
- 微信内置地图导航
- 二维码展示

## 上线前检查

- 确认 `data/contact.js` 中的电话、地址、工作时间正确。
- 确认 `data/contact.js` 中地图坐标能打开到正确位置。
- 确认小程序客服能力已开通，或二维码可以作为备用联系入口。
- 在 iPhone 和 Android 真机预览。
- 检查心理咨询文案，避免医疗诊断、治疗、治愈承诺类表达。
```

- [ ] **Step 2: Run static validation**

Run:

```powershell
node -e "global.Page=function(){}; global.App=function(){}; require('./miniprogram/app.js'); require('./miniprogram/pages/home/home.js'); require('./miniprogram/pages/services/services.js'); require('./miniprogram/pages/team/team.js'); require('./miniprogram/pages/about/about.js'); require('./miniprogram/pages/contact/contact.js'); console.log('mini program js ok')"
```

Expected: prints `mini program js ok`.

- [ ] **Step 3: Check required files**

Run:

```powershell
$files = @(
  'miniprogram/app.json',
  'miniprogram/app.wxss',
  'miniprogram/pages/home/home.wxml',
  'miniprogram/pages/services/services.wxml',
  'miniprogram/pages/team/team.wxml',
  'miniprogram/pages/about/about.wxml',
  'miniprogram/pages/contact/contact.wxml',
  'miniprogram/data/contact.js',
  'miniprogram/data/content.js',
  'miniprogram/data/counselors.js'
)
$missing = $files | Where-Object { -not (Test-Path $_) }
if ($missing) { $missing; exit 1 } else { 'required files ok' }
```

Expected: prints `required files ok`.

- [ ] **Step 4: Check package size**

Run:

```powershell
$bytes = (Get-ChildItem miniprogram -Recurse -File | Measure-Object Length -Sum).Sum
"{0:N2} MB" -f ($bytes / 1MB)
```

Expected: ideally under 4 MB for the first upload package. If over 4 MB, compress counselor photos before importing into WeChat Developer Tools.

- [ ] **Step 5: Import into WeChat Developer Tools**

Manual verification:

1. Open WeChat Developer Tools.
2. Import `Z:\codex\mytest\miniprogram`.
3. Use test AppID or the real AppID.
4. Confirm all five tabs render.
5. Click `微信咨询`, `拨打电话`, and `地图导航` on a real device preview.

Expected: five tabs are usable; phone and map actions open native WeChat flows.

- [ ] **Step 6: Commit validation docs**

```bash
git add miniprogram/README.md
git commit -m "docs: add mini program handoff notes"
```

## Execution Notes

- Keep the existing website files unchanged unless a bug discovered during migration affects both website and mini program.
- Do not add a booking form in this version.
- Do not add login, payment, scheduling, cloud functions, or a backend in this version.
- Use `button open-type="contact"` for the first customer-service implementation. If the user provides an enterprise WeChat customer service link in a separate request, add it in a follow-up change.
- Before release, the user must replace `touristappid` with the real AppID and complete account registration, company authentication, filing, category selection, review submission, and publishing in the WeChat platform.
