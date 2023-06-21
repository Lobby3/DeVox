import { fixDaohausUrl } from ".";

describe("daohaus", () => {
  it("should fix broken DAOhaus url", () => {
    // setup
    const brokenUrl =
      "https://admin.daohaus.fun/#/molochv3/5/0xe3ea73c5eee60ffa80fd9992e85bb671f60c771d";

    // act
    const fixedUrl = fixDaohausUrl(brokenUrl);

    // assert
    expect(fixedUrl).toBe(
      "https://admin.daohaus.club/#/molochv3/0x5/0xe3ea73c5eee60ffa80fd9992e85bb671f60c771d"
    );
  });
});
