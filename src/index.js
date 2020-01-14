async function getUser() {
  try {
    const data = await fetch("/api/me");
    const json = await data.json();
    console.log("DATA", json);
    return json;
  } catch (error) {
    console.log("ERROR", error);
    throw error;
  }
}

export { getUser };
