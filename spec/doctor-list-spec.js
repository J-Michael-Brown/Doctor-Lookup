import { DoctorList } from './../src/doctor-list.js';

describe('DoctorList', function() {
  let testDoctors;
  beforeEach(function() {
    testDoctors = new DoctorList();
  });

  describe('getDoctors()', function() {
    it('should call the BetterDoctor API to generate a list of doctors within a given locations\' parameteres, and set the this.doctors array to this new list of doctors.', function() {
      let getDoctorsTest = new DoctorList('badParams');
      expect(getDoctorsTest.getDoctors('45.542863,-122.7944704,11').length).toEqual(10);
    });
  });

  describe('specialty(actorSting)', function() {
    it('should return a list of doctors matching a given actor.', function() {
      expect(testDoctors.specialty('Family Practitioner')[0].specialties.actor).toEqual('Family Practitioner');
    });
  });
});
