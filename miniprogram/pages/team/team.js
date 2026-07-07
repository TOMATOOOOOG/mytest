const team = require('../../data/counselors')
const { tapFeedback } = require('../../utils/interaction')

const filters = [
  { key: 'all', label: '全部' },
  { key: 'ningbo', label: '宁波面询' },
  { key: 'remote', label: '线上咨询' },
  { key: 'other', label: '异地面询' }
]

function matchFilter(counselor, filter) {
  if (filter === 'all') return true
  if (filter === 'ningbo') return counselor.formats.some((item) => item.indexOf('宁波') !== -1)
  if (filter === 'remote') return counselor.formats.some((item) => item.indexOf('线上') !== -1)
  return counselor.formats.some((item) => item.indexOf('面询') !== -1 && item.indexOf('宁波') === -1)
}

Page({
  data: {
    founder: team.founder,
    counselors: team.counselors,
    filters,
    activeFilter: 'all',
    visibleCount: 8,
    filteredCounselors: [],
    hasMore: false
  },
  onLoad() {
    this.updateCounselors()
  },
  feedback() {
    tapFeedback()
  },
  changeFilter(event) {
    tapFeedback()
    this.setData({
      activeFilter: event.currentTarget.dataset.filter,
      visibleCount: 8
    })
    this.updateCounselors()
  },
  loadMore() {
    tapFeedback()
    this.setData({ visibleCount: this.data.visibleCount + 8 })
    this.updateCounselors()
  },
  updateCounselors() {
    const matched = this.data.counselors.filter((item) => matchFilter(item, this.data.activeFilter))
    this.setData({
      filteredCounselors: matched.slice(0, this.data.visibleCount),
      hasMore: matched.length > this.data.visibleCount
    })
  }
})
