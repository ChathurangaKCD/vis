//cache: *default, no-cache, reload, force-cache, only-if-cached

export async function getData(url: string) {
  const res = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache"
  });
  if (!res.ok) throw Error("Request Failure");
  return await res.json();
}

export async function postData(url: string = "", data = {}, method = "POST") {
  const res = await fetch(url, {
    method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw Error("Request Failure");
  return true;
}

export async function deleteResource(url: string = "") {
  const res = await fetch(url, {
    method: "DELETE",
    mode: "cors"
  });
  if (!res.ok) throw Error("Request Failure");
  return true;
}
