const RE2 = require('re2')
// const re1 = new RE2("(https://)(www.youtube.com|youtu.be)/((watch\?v=)(?<videoid>[a-zA-Z0-9_\-]{11}))")
const re1 = new RegExp("(https://)(www.youtube\.com|youtu\.be)/(watch\\?v=)?(?<videoid>[a-zA-Z0-9_\-]{11})")
// const re1 = new RE2("(https://)(www.youtube\.com|youtu\.be)/(watch\?v=?)")
const string = " kaflkajd lkalkcaldfjl aljf alkjldlfja ljakdfjlakdf lklakfadlkfj https://www.youtube.com/watch?v=NsY-9MCOIAQ akfjlan afjlaji afalkd "
const res = string.match(re1)
if (res !== null) {
  console.log(res.groups.videoid)
}