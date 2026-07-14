const content = require('../../data/content')
const contact = require('../../data/contact')
const { tapFeedback } = require('../../utils/interaction')

Page({
  data: {
    services: content.services,
    contact,
    openFaqIndex: -1
  },
  toggleFaq(event) {
    tapFeedback()
    const index = event.currentTarget.dataset.index
    this.setData({ openFaqIndex: this.data.openFaqIndex === index ? -1 : index })
  },
  feedback() {
    tapFeedback()
  },
  goContact() {
    tapFeedback()
    wx.switchTab({ url: '/pages/contact/contact' })
  },
  callPhone() {
    tapFeedback('medium')
    wx.makePhoneCall({ phoneNumber: this.data.contact.phone })
  }
})
