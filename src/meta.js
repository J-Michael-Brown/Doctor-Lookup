class Meta {
  constructor(query, url = 'https://api.betterdoctor.com/2016-03-01/doctors?', skip = 0) {
    this.query = query;
    this.url = url;
    this.skip = skip;
  }
}

export { Meta };
