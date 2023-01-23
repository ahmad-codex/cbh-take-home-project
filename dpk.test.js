const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

//case1: partitionKey not supplied
//case2: partitionKey supplied as string and <= 256 in length
//case3: partitionKey supplied as string and > 256 in length
//case4: partitionKey supplied as non-string and <= 256 in length
//case5: input is given without partitionKey
describe("deterministicPartitionKey", () => {
  //case1
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  //case2
  it("Returns same supplied partition key when it is given as string and <= 256 in length", () => {
    const givenKey = 'TEST_KEY';
    const result = deterministicPartitionKey({ partitionKey: givenKey });
    expect(result).toBe(givenKey);
  });

  //case3
  it("Returns new hash from the supplied partition key when it is given as string and > 256 in length", () => {
    const givenKey = 'x'.repeat(257);
    const result = deterministicPartitionKey({ partitionKey: givenKey });
    const expected = crypto.createHash("sha3-512").update(givenKey).digest("hex");
    expect(result).toBe(expected);
  });

  //case4
  it("Returns same supplied partition key as string when it is given as non-string and <= 256 in length", () => {
    const givenKey = 100;
    const result = deterministicPartitionKey({ partitionKey: givenKey });
    expect(result).toBe(JSON.stringify(givenKey));
  });

  //case5
  it("Returns new hash from the supplied input when input is given without partitionKey", () => {
    const input = { data: 'TEST_DATA' };
    const result = deterministicPartitionKey(input);
    const expected = crypto.createHash("sha3-512").update(JSON.stringify(input)).digest("hex");
    expect(result).toBe(expected);
  });  
});
