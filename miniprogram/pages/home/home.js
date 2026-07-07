const content = require('../../data/content')
const contact = require('../../data/contact')
const { tapFeedback } = require('../../utils/interaction')

Page({
  data: {
    home: content.home,
    contact
  },
  goServices() {
    tapFeedback()
    wx.switchTab({ url: '/pages/services/services' })
  },
  goTeam() {
    tapFeedback()
    wx.switchTab({ url: '/pages/team/team' })
  },
  goContact() {
    tapFeedback()
    wx.switchTab({ url: '/pages/contact/contact' })
  },
  feedback() {
    tapFeedback()
  },
  callPhone() {
    tapFeedback('medium')
    wx.makePhoneCall({ phoneNumber: this.data.contact.phone })
  }
})
