import { DoctorList } from './../src/doctor-list.js';
import { Meta } from './../src/meta.js';

describe('DoctorList', function() {
  let testDoctors;
  let meta;
  beforeEach(function() {
    meta = new Meta('acne');
    testDoctors = new DoctorList(meta);
  });

  describe('getDoctors()', function() {
    it('should call the BetterDoctor API to generate a list of doctors within a given query parametere, and set the this.doctors array to this new list of doctors.', function() {
      let getDoctorsTest = new DoctorList();
      expect(getDoctorsTest.doctors.length).toEqual(0);
      getDoctorsTest.getDoctors(meta);
      expect(getDoctorsTest.doctors.length).toBeGreaterThan(0);
    });
  });

});
