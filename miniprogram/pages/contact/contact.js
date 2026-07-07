const contact = require('../../data/contact')
const { tapFeedback } = require('../../utils/interaction')

Page({
  data: {
    contact
  },
  feedback() {
    tapFeedback()
  },
  callPhone() {
    tapFeedback('medium')
    wx.makePhoneCall({ phoneNumber: this.data.contact.phone })
  },
  openMap() {
    tapFeedback()
    wx.openLocation(this.data.contact.map)
  }
})
