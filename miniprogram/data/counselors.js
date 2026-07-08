const founder = {
  name: '边志瑜',
  title: '咨询理论创始人 · Founder of the Counseling Theory · Dr.Bian',
  stats: ['咨询理念：25年+', '案例时长：100,000h+', '督导时长：10,000h+'],
  summary: '长期关注心理困扰、情绪状态与个人成长，在多年的个案咨询与研究中探索早期经历、内在感受与现实生活之间的联系。'
}

const counselors = [
  { name: '陈新雅', image: '/assets/images/counselors/chen-xinya.jpg', formats: ['线上咨询', '宁波面询', '文字咨询'], expertise: '青少年成长、亲子咨询、家庭咨询、个人探索与成长、情感咨询', quote: '用温暖、真诚与理解陪伴访客面对受伤经历，逐步找回对生活的选择感。' },
  { name: '董晓童', image: '/assets/images/counselors/default.jpg', formats: ['线上咨询', '线下咨询', '文字咨询'], expertise: '青少年心理、留学生心理、进食障碍、两性情感、原生家庭、个人成长', quote: '帮助访客看见自己，理解自己，将创伤和痛苦转化为让自己幸福的经验。' },
  { name: '胡启璇', image: '/assets/images/counselors/hu-qixuan.jpg', formats: ['线上咨询', '北京面询', '文字咨询'], expertise: '青少年成长、亲子咨询、家庭咨询、个人探索与成长、情感咨询', quote: '愿以理解和支持陪伴你面对内心深处的受伤经历，并发现新的生活可能。' },
  { name: '李双如', image: '/assets/images/counselors/li-shuangru.jpg', formats: ['线上咨询', '临沂面询', '文字咨询'], expertise: '个人探索成长、原生家庭伤害、两性情感关系、学业工作压力', quote: '用心看到每一位来访者的美好，认真理解和支持每一位来访者。' },
  { name: '李思怡', image: '/assets/images/counselors/default.jpg', formats: ['线上咨询', '宁波面询', '文字咨询'], expertise: '青少年成长、个人探索与成长', quote: '走进一个人的内心，是很美好的过程。' },
  { name: '李彤', image: '/assets/images/counselors/li-tong.jpg', formats: ['线上咨询', '宁波面询', '文字咨询'], expertise: '青少年问题、个人成长、关系议题、焦虑抑郁、强迫症', quote: '咨询是一段不断看到创伤下真实内在自我的旅程。' },
  { name: '林炳龙', image: '/assets/images/counselors/lin-binglong.jpg', formats: ['线上咨询', '广深面询', '文字咨询'], expertise: '两性情感关系、青少年心理、亲子关系、职场困境', quote: '愿意用一颗善良真诚的心帮助访客一起成长，做真正的自己。' },
  { name: '鲁碧', image: '/assets/images/counselors/lu-bi.jpg', formats: ['线上咨询', '温州面询', '文字咨询'], expertise: '原生家庭问题、抑郁焦虑、个人探索与成长', quote: '希望耐心倾听并接纳你内心的痛苦，陪伴你梳理方向。' },
  { name: '任希蕊', image: '/assets/images/counselors/ren-xirui.jpg', formats: ['线上咨询', '宁波面询', '文字咨询'], expertise: '强迫、抑郁、焦虑、个人探索与成长、青少年成长、人际关系', quote: '帮助来访者看到自身的力量与可能性，重拾信心。' },
  { name: '宋秋雨', image: '/assets/images/counselors/song-qiuyu.jpg', formats: ['线上咨询', '宁波面询', '文字咨询'], expertise: '亲密关系、个人成长、职场心理健康、人际关系、情绪困扰', quote: '爱、理解和支持可以陪伴我们在探索中逐步成长。' },
  { name: '汪娜', image: '/assets/images/counselors/wang-na.jpg', formats: ['线上咨询', '宁波面询', '文字咨询'], expertise: '少儿成长、青少年成长、家庭咨询、两性情感、个人探索与成长', quote: '用纯粹的心、敏锐的察觉力、稳定的能量帮助访客恢复真实自我感受。' },
  { name: '王琪璐', image: '/assets/images/counselors/wang-qilu.jpg', formats: ['线上咨询', '宁波咨询', '文字咨询'], expertise: '个人成长、青少年咨询、情感咨询、亲子关系', quote: '还原访客的真实感受与所经历的真相，帮助访客找到自己的心。' },
  { name: '王杨', image: '/assets/images/counselors/wang-yang.jpg', formats: ['线上咨询', '芜湖面询', '文字咨询'], expertise: '深度自我探索及各类心理问题', quote: '对访客了解的过程，是心与心互相看见的过程。' },
  { name: '王颖', image: '/assets/images/counselors/wang-ying.jpg', formats: ['线上咨询', '苏州面询', '文字咨询'], expertise: '焦虑抑郁、强迫症、原生家庭、职场问题', quote: '生命最初的渴望就是能够做自己。愿我们在探索中看见爱与希望。' },
  { name: '晓敏', image: '/assets/images/counselors/default.jpg', formats: ['线上咨询', '青岛面询', '文字咨询'], expertise: '抑郁焦虑及躯体化症状、职场、两性情感、青少年亲子关系', quote: '用真实的看见与理解陪伴每个访客踏上生命回归之旅。' },
  { name: '杨恩可', image: '/assets/images/counselors/default.jpg', formats: ['线上咨询', '广州面询', '文字咨询'], expertise: '青少年成长、亲子咨询、家庭咨询、个人探索与成长、情感咨询', quote: '愿意在咨询中实践接纳、理解所带来的力量。' },
  { name: '张文', image: '/assets/images/counselors/zhang-wen.jpg', formats: ['线上咨询', '宁波面询', '文字咨询'], expertise: '青少年成长、亲子咨询、家庭咨询、个人探索与成长、情感咨询', quote: '关注个体受伤经历与当下困扰之间的联系。' },
  { name: '郑华新', image: '/assets/images/counselors/zheng-huaxin.jpg', formats: ['线上咨询', '宁波面询', '文字咨询'], expertise: '个人探索与成长、青少年成长、焦虑抑郁、强迫症、失眠', quote: '咨询不只是流派或话术，也需要咨询师真诚地理解和关心访客。' },
  { name: '郑琦', image: '/assets/images/counselors/zheng-qi.jpg', formats: ['线上咨询', '上海面询', '文字咨询'], expertise: '两性情感咨询、亲子关系咨询、职场压力、人际关系', quote: '理解自己的感受，逐步找回对生活的感知与力量。' },
  { name: '枝繁', image: '/assets/images/counselors/default.jpg', formats: ['线上咨询', '济南面询', '文字咨询'], expertise: '青少年成长、亲子咨询、家庭咨询、个人探索与成长、情感咨询', quote: '愿跟你一起走上一段成长之旅，发现爱，拥抱爱。' }
]

const counselorsWithAvatars = counselors.map((counselor) => ({
  ...counselor,
  avatarImage: counselor.image
    .replace('/assets/images/counselors/', '/assets/images/counselors/avatars/')
    .replace(/\.(jpg|jpeg|png)$/i, '.jpg')
}))

module.exports = {
  founder,
  counselors: counselorsWithAvatars
}
