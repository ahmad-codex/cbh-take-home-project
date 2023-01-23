const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  let candidate;

  if (!event)
    return TRIVIAL_PARTITION_KEY;

  if (event.partitionKey) {
    candidate = checkForString(event.partitionKey);
    candidate = checkForLength(candidate);
  } else {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }
  return candidate;
};

const checkForString = (input) => {
  if (typeof input !== "string") {
    input = JSON.stringify(input);
  }
  return input;
}

const checkForLength = (input) => {
  if (input.length > MAX_PARTITION_KEY_LENGTH) {
    input = crypto.createHash("sha3-512").update(input).digest("hex");
  }
  return input;
}

// exports.deterministicPartitionKey = (event) => {
//   const TRIVIAL_PARTITION_KEY = "0";
//   const MAX_PARTITION_KEY_LENGTH = 256;
//   let candidate;

//   if (event) {
//     if (event.partitionKey) {
//       candidate = event.partitionKey;
//     } else {
//       const data = JSON.stringify(event);
//       candidate = crypto.createHash("sha3-512").update(data).digest("hex");
//     }
//   }

//   if (candidate) {
//     if (typeof candidate !== "string") {
//       candidate = JSON.stringify(candidate);
//     }
//   } else {
//     candidate = TRIVIAL_PARTITION_KEY;
//   }
//   if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
//     candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
//   }
//   return candidate;
// };