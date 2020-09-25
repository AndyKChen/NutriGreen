export const parseError = err => {
  if (err.isJoi) return err.details[0];
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
};

export const sessionizeUser = user => {
  return { userId: user.id, 
          username: user.username, 
          age: user.age,
          weight: user.weight, 
          height: user.height,
          gender: user.gender };
}