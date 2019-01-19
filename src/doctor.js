class Doctor {
  constructor(dataSnippet) {
    this.practices = dataSnippet.practices;
    this.profile = dataSnippet.profile;
    this.educations = dataSnippet.educations;
    this.insurances = dataSnippet.insurances;
    this.ratings = dataSnippet.ratings;
    this.specialties = dataSnippet.specialties;
    this.licenses = dataSnippet.licenses;
    this.uid = dataSnippet.uid;
    this.npi = dataSnippet.npi;
  }
}

export { Doctor };
