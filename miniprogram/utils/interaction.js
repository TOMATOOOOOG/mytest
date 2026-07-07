function tapFeedback(type = 'light') {
  if (typeof wx === 'undefined' || !wx.vibrateShort) {
    return
  }

  wx.vibrateShort({
    type,
    fail() {}
  })
}

module.exports = {
  tapFeedback
}
