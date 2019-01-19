import { DoctorList } from './../src/doctor-list.js';
import { Meta } from './../src/meta.js';

describe('DoctorList', function() {
  let testDoctors;
  let meta;
  beforeEach(function() {
    meta = new Meta('acne');
    testDoctors = new DoctorList();
  });

  describe('getDoctors()', function() {
    it('should call the BetterDoctor API to generate a list of doctors within a given query parametere, and set the this.doctors array to this new list of doctors.', function() {
      expect(testDoctors.doctors.length).toEqual(0);
      testDoctors.getDoctors(meta);
      expect(testDoctors.doctors.length).toBeGreaterThan(0);

    });
  });

});
