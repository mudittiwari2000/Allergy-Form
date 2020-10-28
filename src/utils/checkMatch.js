const checkMatch = (currentValues, allergyArray) => {
  console.log('check')
  const allergyArrayTrimmed = currentValues
      .split(",")
      .map((allergy) => allergy.trim().toLowerCase());
  const input = allergyArrayTrimmed[allergyArrayTrimmed.length - 1];
  const inputLength = input.length;
  const allergyNames = allergyArray.map((allergy) => allergy.name);
  console.log(allergyNames);

  // Checks if the input already contains the match, and if the input matches any allergy names stored in the firestore
  const matches = allergyNames.filter(
    (allergy) =>
      allergy.slice(0, inputLength).trim().toLowerCase() === input &&
      !allergyArrayTrimmed.includes(allergy.trim().toLowerCase())
  );
  return matches;
};

export default checkMatch;
