class Meta {
  constructor(data, url = 'https://api.betterdoctor.com/2016-03-01/doctors?') {
    this.url = url;
    data.user_key = process.env.exports.apiKey;
    this.data = data;
  }
}

export { Meta };
