import planReducer, {
  setDob,
  setGender,
  setPaymentFrequency,
  setPlan,
  setPremiumPerYear,
  setSaPerYear,
} from "./planSlice";

describe("plan reducer", () => {
  it("should handle initial state", () => {
    expect(planReducer(undefined, { type: "unknown" })).toEqual({
      data: null,
      gender: "MALE",
      plan: "T11A20",
      premiumPerYear: 30000,
      paymentFrequency: "YEARLY",
      dob: null,
      saPerYear: 0,
      status: "idle",
      error: false,
    });
  });

  it("should handle setGender", () => {
    const plan = planReducer(undefined, setGender("FEMALE"));
    expect(plan.gender).toEqual("FEMALE");
  });

  it("should handle setDob", () => {
    const plan = planReducer(undefined, setDob("04/11/1995"));
    expect(plan.dob).toEqual("04/11/1995");
  });

  it("should handle setPlan", () => {
    const plan = planReducer(undefined, setPlan("T11A50"));
    expect(plan.plan).toEqual("T11A50");
  });

  it("should handle setPremiumPerYear", () => {
    const plan = planReducer(undefined, setPremiumPerYear(10000));
    expect(plan.premiumPerYear).toEqual(10000);
  });

  it("should handle setPaymentFrequency", () => {
    const plan = planReducer(undefined, setPaymentFrequency("MONTHLY"));
    expect(plan.paymentFrequency).toEqual("MONTHLY");
  });

  it("should handle setSaPerYear", () => {
    const plan = planReducer(undefined, setSaPerYear(500000));
    expect(plan.saPerYear).toEqual(500000);
  });
});
